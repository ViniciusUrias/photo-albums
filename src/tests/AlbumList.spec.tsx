import { useAlbums } from "@/hooks/useAlbums";
import Profile from "@/pages/profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRoutesStub } from "react-router";
// beforeEach(() => {
// 	useSelector().getState().reset();
// });
const USER_ID = 5;
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
const wrapper = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

describe("albums page", async () => {
	test("Open the add album modal, type the title, click the submit button and then close the modal", async () => {
		const { result } = await setupProfilePage(USER_ID);

		const masonry = document.querySelector(".masonry-grid");
		expect(masonry).toBeInTheDocument();
		expect(masonry?.childElementCount).toBe(result.current.albums?.length);

		const { user, inputTitleAlbum, dialog } = await openAddAlbumModal();

		expect(dialog).toBeInTheDocument();
		const buttonSubmit = await screen.findByRole("button", { name: "Submit" });

		await user.click(inputTitleAlbum);
		await user.keyboard("Test title");
		expect(inputTitleAlbum).toHaveValue("Test title");
		await user.click(buttonSubmit);

		await waitFor(() => {
			expect(dialog).toHaveAttribute("data-state", "closed");
			expect(masonry?.childElementCount).toBe(result?.current?.albums?.length + 1);
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
});
