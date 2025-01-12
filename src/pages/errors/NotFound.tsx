import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";

export default function NotFound(e: unknown) {
	return (
		<div className="flex items-center h-screen flex-col justify-center gap-10">
			<em className="text-3xl">
				<strong>Ops...this page does not exists</strong>
			</em>
			<Button asChild>
				<NavLink autoFocus aria-label="Go to sign-in page" to="/auth/sign-in">
					Click here to go back to sign-in page
				</NavLink>
			</Button>
		</div>
	);
}
