import { ModeToggle } from "./ModeToogle";

export default function Header() {
	return (
		<div className="bg-background h-12 w-full flex justify-center items-center shadow-md shadow-secondary">
			<h1 className="text-xl font-bold">Welcome</h1>
			<ModeToggle />
		</div>
	);
}
