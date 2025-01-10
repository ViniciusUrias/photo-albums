import Header from "@/components/Header";
import { Outlet } from "react-router";

export default function MainLayout() {
	return (
		<div className="bg-primary-foreground h-screen w-screen">
			<Header />
			<main className="m-2 rounded-md flex flex-col  overflow-x-hidden sm:mx-20 p-4 ">
				<Outlet />
			</main>
		</div>
	);
}
