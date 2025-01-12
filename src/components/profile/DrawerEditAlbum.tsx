import { usePhotos } from "@/hooks/usePhotos";
import { useSelector } from "@/store";
import { Photo, Photos } from "@/types/photo";
import { useQueryClient } from "@tanstack/react-query";
import { CloudUpload } from "lucide-react";
import React from "react";
import PhotoForm from "../PhotoForm";
import PhotoGrid from "../PhotoGrid";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "../ui/drawer";

export default function DrawerEditAlbum({ open, onClose, album }) {
	const snapPoints = [0.9];
	const [snap, setSnap] = React.useState<number | string | null>(snapPoints[0]);
	const [dialogOpen, setDialogOpen] = React.useState(false);
	const { addPhotoMutation, deletePhotoMutation, photos } = usePhotos(album?.id);
	const user = useSelector((s) => s.user);
	const queryClient = useQueryClient();
	async function onDeletePhoto(photo: Photo) {
		await deletePhotoMutation.mutateAsync(
			{ photoId: photo.id },
			{
				onSuccess() {
					queryClient.setQueryData(
						["photos", album?.id],
						queryClient.getQueryData<Photos>(["photos", album?.id])!.filter((p) => p.id !== photo.id)
					);
				},
			}
		);
	}
	async function onSubmitPhoto(values) {
		console.log(values);
		const objectUrl = URL.createObjectURL(values.picture);
		await addPhotoMutation.mutateAsync(
			{ title: values.photoTitle, albumId: album?.id, url: objectUrl },
			{
				onSuccess(data) {
					setDialogOpen(false);
					queryClient.setQueryData(["photos", album?.id], (oldData: Albums) => {
						return [data, ...oldData];
					});
				},
			}
		);
	}
	return (
		<Drawer
			autoFocus
			snapPoints={snapPoints}
			activeSnapPoint={snap}
			setActiveSnapPoint={setSnap}
			open={open}
			onOpenChange={onClose}
		>
			<DrawerContent className="p-4" data-testid="drawer-edit-album">
				<DrawerHeader>
					<DrawerTitle className="flex justify-between items-center">
						<span className="italic text-2xl">{album?.title} </span>
						<div className="justify-end flex">
							<Button size="icon" aria-label="Close album" onClick={onClose} variant="outline">
								X
							</Button>
						</div>
					</DrawerTitle>
					<DrawerDescription className="mt-6">
						<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
							<DialogTrigger asChild>
								<Button name="Upload new photo" aria-label="Upload new photo">
									<CloudUpload /> Upload new photo
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Upload photo</DialogTitle>
								</DialogHeader>

								<PhotoForm onSubmit={onSubmitPhoto} isSubmitting={addPhotoMutation.isPending} />
							</DialogContent>
						</Dialog>
					</DrawerDescription>
				</DrawerHeader>
				<div>
					<PhotoGrid backButton={false} expand={false} onDelete={onDeletePhoto} photos={photos} userId={user?.id} />
				</div>
			</DrawerContent>
		</Drawer>
	);
}
