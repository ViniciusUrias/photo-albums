import MainLayout from "@/layouts/main";
import Albums from "@/pages/albums";
import HomePage from "@/pages/home";
import Photos from "@/pages/photos";
import { createBrowserRouter, RouterProvider } from "react-router";
const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				path: "users",
				children: [
					{ index: true, element: <HomePage /> }, // Matches "/users"
					{
						path: ":userId/albums",
						children: [
							{ index: true, element: <Albums /> }, // Matches "/users/:userId/albums"
							{ path: ":albumId/photos", element: <Photos /> }, // Matches "/users/:userId/albums/:albumId/photos"
						],
					},
				],
			},
		],
	},
]);
export default function Router() {
	return (
		<RouterProvider router={router} />
		// <Routes>
		// 	{/* <Route element={<AuthLayout />}>
		// 		<Route path="login" element={<Login />} />
		// 		<Route path="register" element={<Register />} />
		// 	</Route> */}

		// 	<Route element={<MainLayout />}>
		// 		<Route path="/users">
		// 			<Route index element={<HomePage />} />
		// 			<Route path="/users/:userId/albums" element={<Albums />}>
		// 				<Route path=":albumId/photos" element={<Photos />} />
		// 			</Route>
		// 		</Route>
		// 	</Route>
		// </Routes>
	);
}
