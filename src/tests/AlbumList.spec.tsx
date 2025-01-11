import { useAlbums } from "@/hooks/useAlbums";
import { usePhotos } from "@/hooks/usePhotos";
import Profile from "@/pages/profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { fireEvent, render, renderHook, screen, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { createRoutesStub } from "react-router";
// beforeEach(() => {
// 	useSelector().getState().reset();
// });

const USER_ID = 5;
const setupProfilePage = async (userId: number) => {
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
let file: File;
const getPhotos = async (albumId: number) => {
	const { result } = renderHook(() => usePhotos(albumId), { wrapper });
	await waitFor(() => expect(result.current.photos).toBeDefined());
	return result.current.photos;
};
const openAddAlbumModal = async () => {
	const user = userEvent.setup();
	const addAlbumButton = document.querySelector('[aria-haspopup="dialog"]');
	expect(addAlbumButton).toBeInTheDocument();
	await user.click(addAlbumButton!);

	const inputTitleAlbum = document.querySelector('[name="title"]');
	expect(inputTitleAlbum).toBeInTheDocument();

	const dialog = screen.getByTestId("dialog-add-album");
	expect(dialog).toBeInTheDocument();

	return { user, inputTitleAlbum, dialog };
};
const queryClient = new QueryClient();
// const handlers = [
// 	http.post("/api/albums", ({ request, res, ctx }) => {
// 		return HttpResponse.json({
// 			title: request?.body?.title,
// 			id: 101,
// 			userId: USER_ID,
// 		});
// 	}),
// 	http.get("/users/5/albums", ({ params, request }) => {
// 		return new HttpResponse("Ok", { status: 200 });
// 	}),
// ];
// const server = setupServer(...handlers);

// // Start MSW before tests and clean up after
// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());
const wrapper = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("albums page", async () => {
	test("Open the add album modal, type the title, click the submit button and then close the modal", async () => {
		const { result } = await setupProfilePage(USER_ID);

		const masonry = document.querySelector(".masonry-grid");
		expect(masonry).toBeInTheDocument();
		expect(masonry?.childElementCount).toBe(result.current.albums?.length);

		const { user, inputTitleAlbum, dialog } = await openAddAlbumModal();

		expect(dialog).toBeInTheDocument();
		const buttonSubmit = await screen.findByRole("button", { name: "Submit" });

		await user.click(inputTitleAlbum!);
		await user.keyboard("Test title");
		expect(inputTitleAlbum).toHaveValue("Test title");
		await user.click(buttonSubmit);

		await waitFor(() => {
			expect(dialog).toHaveAttribute("data-state", "closed");
			expect(masonry?.childElementCount).toBe(result?.current?.albums?.length! + 1);
		});
	});

	test('Try to create the new album without a value in the "title" input', async () => {
		const { result } = await setupProfilePage(USER_ID);
		const masonry = document.querySelector(".masonry-grid");
		expect(masonry).toBeInTheDocument();
		expect(masonry?.childElementCount).toBe(result.current.albums?.length);

		const { user, inputTitleAlbum, dialog } = await openAddAlbumModal();
		const buttonSubmit = await screen.findByRole("button", { name: "Submit" });

		// Do not enter any value in the title input
		expect(inputTitleAlbum).toHaveValue("");

		await user.click(buttonSubmit);

		// Check for validation feedback or that the dialog remains open
		await waitFor(() => {
			expect(dialog).toHaveAttribute("data-state", "open");
			expect(screen.getByText("Album title must be at least 2 characters.")).toBeInTheDocument(); // Adjust this message based on your app's validation
			expect(masonry?.childElementCount).toBe(result?.current?.albums?.length); // No change in the grid
		});
	});
	beforeEach(() => {
		file = new File(["(⌐□_□)"], "photoTest.png", { type: "image/png" });
	});
	test("Open photo drawer when click on the pencil icon of an album and add a new photo", async () => {
		await setupProfilePage(USER_ID);
		const firstAlbum = document.querySelector(".masonry-grid")?.firstChild;
		expect(firstAlbum).toBeInTheDocument();
		console.log("FIRST ALBUM", firstAlbum);
		const editButton = within(firstAlbum).getAllByRole("button")[1];
		console.log("EDIT BUTTON", editButton);
		const user = userEvent.setup();

		await user.click(editButton);
		const drawer = screen.getByTestId("drawer-edit-album");

		expect(drawer).toHaveAttribute("data-state", "open");
		const addPhotoButton = within(drawer).getByRole("button", {
			name(accessibleName, element) {
				return accessibleName === "Upload new photo";
			},
		});
		expect(addPhotoButton).toHaveAttribute("aria-expanded", "false");
		console.log("addphotobutton", addPhotoButton);
		await user.click(addPhotoButton);
		expect(addPhotoButton).toHaveAttribute("aria-expanded", "true");

		const masonry = screen.getByTestId("photos-gallery-grid");
		expect(masonry).toBeInTheDocument();

		const photos = await getPhotos(1);

		const uploadForm = screen.getByTestId("upload-photo-form");
		expect(uploadForm).toBeInTheDocument();

		const doneButton = await within(uploadForm).findByText("Done");
		const inputTitleAlbum = document.querySelector('[name="photoTitle"]');
		expect(inputTitleAlbum).toBeInTheDocument();
		// expect(screen.getByText("Photo title must be at least 4 characters.")).toBeInTheDocument();
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
		await user.click(doneButton);

		await waitFor(() => {
			expect(addPhotoButton).toHaveAttribute("aria-expanded", "false");
			expect(masonry?.childElementCount).toBe(photos?.length + 1);
		});
	});
});
