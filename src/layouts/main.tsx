import Header from "@/components/Header";
import { useSelector } from "@/store";
import { Navigate, Outlet } from "react-router";

export default function MainLayout() {
	const user = useSelector((s) => s.user);
	if (!user) {
		return <Navigate to="/auth/sign-in" replace />;
	}
	return (
		<div className="bg-primary-foreground h-screen w-screen">
			<Header />
			<main className="m-2 rounded-md flex flex-col  overflow-x-hidden sm:mx-20 p-4 ">
				<Outlet />
			</main>
		</div>
	);
}
