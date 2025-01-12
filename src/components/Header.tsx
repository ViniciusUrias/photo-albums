import logo from "@/assets/logo.png";
import { useSelector } from "@/store";
import { MenuIcon, ShirtIcon } from "lucide-react";
import { Link, NavLink } from "react-router";
import { ModeToggle } from "./ModeToogle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
export default function Header() {
	const isActiveClassName = (isActive: boolean) => (isActive ? "border-b border-solid" : "");
	const { user, signOut } = useSelector((s) => s);
	return (
		<header className="bg-background sm:h-12 w-full flex  items-center shadow-md shadow-background p-4 justify-between">
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="sm:hidden">
						<MenuIcon className="h-6 w-6" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<Link to="#">
						<ShirtIcon className="h-6 w-6" />
						<span className="sr-only">ShadCN</span>
					</Link>
					<div className="grid gap-2 py-6">
						<NavLink
							viewTransition
							className={({ isActive }) => isActiveClassName(isActive)}
							aria-label="Go to home page"
							to="/users"
						>
							Home
						</NavLink>
						<NavLink viewTransition className={({ isActive }) => isActiveClassName(isActive)} to="/users/profile">
							My Profile
						</NavLink>
					</div>
				</SheetContent>
			</Sheet>
			<nav className="items-center gap-4 hidden sm:flex text-lg">
				<img className="aspect-square h-8 rounded-full hidden sm:block mr-2" src={logo} alt="Logo image" />
				<NavLink
					end
					viewTransition
					className={({ isActive }) => isActiveClassName(isActive)}
					aria-label="Go to home page"
					to="/users"
				>
					Home
				</NavLink>

				<NavLink end viewTransition className={({ isActive }) => isActiveClassName(isActive)} to="/users/profile">
					My Profile
				</NavLink>
			</nav>

			<div className="items-center flex gap-2">
				<h2>Hi, {user?.username}</h2>
				<Button onClick={() => signOut()} variant="outline">
					Logout
				</Button>
				<ModeToggle />
			</div>
		</header>
	);
}
