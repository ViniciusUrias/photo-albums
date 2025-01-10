import { useSelector } from "@/store";
import { House } from "lucide-react";
import { NavLink } from "react-router";
import { ModeToggle } from "./ModeToogle";
import { Button } from "./ui/button";

export default function Header() {
	const user = useSelector((s) => s.user!);

	return (
		<header className="bg-background sm:h-12 w-full flex  items-center shadow-md shadow-secondary p-4 justify-between">
			<div className="flex items-center gap-2">
				<h1 className="text-xl font-bold">Welcome, {user.username}</h1>
				<NavLink aria-label="Go to home page" to="/users">
					<House size={16} />
				</NavLink>
			</div>
			<div className="flex items-center gap-2">
				<NavLink to="/users/profile">
					<Button variant="ghost">My Profile</Button>
				</NavLink>
				<ModeToggle />
			</div>
		</header>
	);
}
