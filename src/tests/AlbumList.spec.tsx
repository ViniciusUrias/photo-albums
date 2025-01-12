import { useAlbums } from "@/hooks/useAlbums";
import { usePhotos } from "@/hooks/usePhotos";
import Profile from "@/pages/profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { fireEvent, render, renderHook, screen, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRoutesStub } from "react-router";
import { beforeEach, describe, test } from "vitest";

const USER_ID = 5;
const queryClient = new QueryClient();

const wrapper = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

const setupProfilePage = async (userId) => {
	const { result } = renderHook(() => useAlbums(userId), { wrapper });
	await waitFor(() => expect(result.current.albums).toBeDefined());

	const Stub = createRoutesStub([
		{
			path: "/users/profile",
			Component: () => (
				<QueryClientProvider client={queryClient}>
					<Profile userId={userId} />
				</QueryClientProvider>
			),
		},
	]);

	render(<Stub initialEntries={["/users/profile"]} />);

	return { result };
};

const getPhotos = async (albumId) => {
	const { result } = renderHook(() => usePhotos(albumId), { wrapper });
	await waitFor(() => expect(result.current.photos).toBeDefined());
	return result.current.photos;
};

const openAddAlbumModal = async () => {
	const user = userEvent.setup();
	const addAlbumButton = document.querySelector('[aria-haspopup="dialog"]');
	expect(addAlbumButton).toBeInTheDocument();
	await user.click(addAlbumButton);

	const inputTitleAlbum = document.querySelector('[name="title"]');
	expect(inputTitleAlbum).toBeInTheDocument();

	const dialog = screen.getByTestId("dialog-add-album");
	expect(dialog).toBeInTheDocument();

	return { user, inputTitleAlbum, dialog };
};

describe("albums page", () => {
	let file: File;

	beforeEach(() => {
		file = new File(["(⌐□_□)"], "photoTest.png", { type: "image/png" });
	});

	test("Open the add album modal, type the title, click submit, and close the modal", async () => {
		const { result } = await setupProfilePage(USER_ID);

		const masonry = document.querySelector(".masonry-grid");
		expect(masonry).toBeInTheDocument();
		expect(masonry?.childElementCount).toBe(result.current.albums?.length);

		const { user, inputTitleAlbum, dialog } = await openAddAlbumModal();

		const buttonSubmit = await screen.findByRole("button", { name: "Submit" });

		await user.click(inputTitleAlbum);
		await user.keyboard("Test title");
		expect(inputTitleAlbum).toHaveValue("Test title");

		await user.click(buttonSubmit);

		await waitFor(() => {
			expect(dialog).toHaveAttribute("data-state", "closed");
			expect(masonry?.childElementCount).toBe(result.current.albums?.length + 1);
		});
	});

	test("Try to create a new album without a title", async () => {
		const { result } = await setupProfilePage(USER_ID);

		const masonry = document.querySelector(".masonry-grid");
		expect(masonry).toBeInTheDocument();
		expect(masonry?.childElementCount).toBe(result.current.albums?.length);

		const { user, inputTitleAlbum, dialog } = await openAddAlbumModal();

		const buttonSubmit = await screen.findByRole("button", { name: "Submit" });

		expect(inputTitleAlbum).toHaveValue("");
		await user.click(buttonSubmit);

		await waitFor(() => {
			expect(dialog).toHaveAttribute("data-state", "open");
			expect(screen.getByText("Album title must be at least 2 characters.")).toBeInTheDocument();
			expect(masonry?.childElementCount).toBe(result.current.albums?.length);
		});
	});

	test("Open photo drawer, add a new photo", async () => {
		await setupProfilePage(USER_ID);

		const firstAlbum = document.querySelector(".masonry-grid")?.firstChild;
		expect(firstAlbum).toBeInTheDocument();

		const editButton = within(firstAlbum).getAllByRole("button")[1];
		const user = userEvent.setup();

		await user.click(editButton);

		const drawer = screen.getByTestId("drawer-edit-album");
		expect(drawer).toHaveAttribute("data-state", "open");

		const addPhotoButton = within(drawer).getByRole("button", {
			name: "Upload new photo",
		});
		expect(addPhotoButton).toHaveAttribute("aria-expanded", "false");

		await user.click(addPhotoButton);
		expect(addPhotoButton).toHaveAttribute("aria-expanded", "true");

		const masonry = screen.getByTestId("photos-gallery-grid");
		expect(masonry).toBeInTheDocument();

		const photos = await getPhotos(1);

		const uploadForm = screen.getByTestId("upload-photo-form");
		const inputTitleAlbum = document.querySelector('[name="photoTitle"]');
		const uploader = screen.getByTestId("photo-uploader");

		await waitFor(() =>
			fireEvent.change(uploader, {
				target: { files: [file] },
			})
		);

		await user.click(inputTitleAlbum);
		await user.keyboard("New Photo!");

		expect(uploader.files[0].name).toBe("photoTest.png");
		expect(uploader.files.length).toBe(1);

		const doneButton = await within(uploadForm).findByText("Done");
		await user.click(doneButton);

		await waitFor(() => {
			expect(addPhotoButton).toHaveAttribute("aria-expanded", "false");
			expect(masonry?.childElementCount).toBe(photos.length + 1);
		});
	});
});
