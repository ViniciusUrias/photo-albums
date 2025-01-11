import { useSelector } from "@/store";
import { NavLink } from "react-router";
import { ModeToggle } from "./ModeToogle";

export default function Header() {
	const user = useSelector((s) => s.user!);
	const isActiveClassName = (isActive: boolean) => (isActive ? "" : "");
	return (
		<header className="bg-background sm:h-12 w-full flex  items-center shadow-md shadow-secondary p-4 justify-between">
			<div className="flex items-center gap-2">
				<h1 className="text-xl font-bold">Welcome, {user.username}</h1>|
				<NavLink
					viewTransition
					className={({ isActive }) => isActiveClassName(isActive)}
					aria-label="Go to home page"
					to="/users"
				>
					Home
				</NavLink>
			</div>
			<div className="flex items-center gap-2">
				<NavLink viewTransition className={({ isActive }) => isActiveClassName(isActive)} to="/users/profile">
					My Profile
				</NavLink>

				<ModeToggle />
			</div>
		</header>
	);
}
