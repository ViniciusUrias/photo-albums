import { Outlet } from "react-router";

export default function AuthLayout() {
	return (
		<div className="bg-primary-foreground h-screen w-screen">
			<main className="m-2 rounded-md flex flex-col  overflow-x-hidden mx-20 p-4 ">
				<Outlet />
			</main>
		</div>
	);
}
