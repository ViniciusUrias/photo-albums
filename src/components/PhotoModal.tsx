import { Photo } from "@/types/photo";
import Image from "./Image";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

interface PhotoModalProps {
	photo: Photo;
	open: boolean;
	onClose: () => void;
}
export default function PhotoModal({ photo, open, onClose }: PhotoModalProps) {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent autoFocus className="aspect-square w-full">
				<DialogTitle>{photo?.title}</DialogTitle>
				<Image alt={`Expanded photo with title : ${photo?.title}`} src={photo?.url} />
			</DialogContent>
		</Dialog>
	);
}
