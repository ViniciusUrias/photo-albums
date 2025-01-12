import { LucideArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";

export default function NavigateBack() {
	const navigate = useNavigate();
	return (
		<Button size="icon" variant="outline" onClick={() => navigate(-1)}>
			<LucideArrowLeft />
		</Button>
	);
}
