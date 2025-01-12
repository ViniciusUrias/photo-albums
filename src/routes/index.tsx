import AuthLayout from "@/layouts/auth";
import MainLayout from "@/layouts/main";
import Albums from "@/pages/albums";
import LoginPage from "@/pages/auth/login";
import NotFound from "@/pages/errors/NotFound";
import HomePage from "@/pages/home";
import Photos from "@/pages/photos";
import Profile from "@/pages/profile";
import { createBrowserRouter, RouterProvider } from "react-router";
const router = createBrowserRouter([
	{
		path: "/auth",
		element: <AuthLayout />,
		ErrorBoundary: NotFound,
		children: [{ path: "sign-in", element: <LoginPage /> }],
	},
	{
		path: "/",
		element: <MainLayout />,
		ErrorBoundary: NotFound,

		children: [
			{
				path: "users",
				children: [
					{ index: true, element: <HomePage /> }, // Matches "/users"
					{ path: "profile", element: <Profile /> }, // Matches "/users"
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
	return <RouterProvider router={router} />;
}
