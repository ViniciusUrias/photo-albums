import { createAlbum, deleteAlbum, getAlbums } from "@/api/services/albums";
import { createPhoto, deletePhoto, getPhotos } from "@/api/services/photos";
import AlbumList from "@/components/AlbumList";
import PhotoGrid from "@/components/PhotoGrid";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "@/store";
import { Album, Albums } from "@/types/album";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CloudUpload, Loader2, Plus } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	title: z.string().min(2, {
		message: "Album title must be at least 4 characters.",
	}),
});
const photoFormSchema = z.object({
	title: z.string().min(2, {
		message: "Album title must be at least 4 characters.",
	}),
	picture: z.any(),
});
export default function Profile() {
	const user = useSelector((s) => s.user!);
	const [dialogOpen, setDialogOpen] = React.useState(false);
	const [isEditing, setIsEditing] = React.useState(false);
	const [selectedAlbum, setSelectedAlbum] = React.useState<Album | null>(null);
	const handleEditAlbum = (album: Album) => {
		setIsEditing(true);
		setSelectedAlbum(album);
	};
	useEffect(() => {
		console.log("active element", document.activeElement);
	}, []);
	const { id } = user;
	const queryClient = useQueryClient();
	const addAlbum = useMutation({
		mutationFn: ({ title }: { title: string }) => createAlbum({ title, userId: id }),
	});
	const deleteAlbumMutation = useMutation({
		mutationFn: ({ albumId }: { albumId: number }) => deleteAlbum({ albumId }),
	});
	const addPhotoMutation = useMutation({
		mutationFn: (data: { title: string; albumId: number; url: string }) => createPhoto(data),
	});
	const deletePhotoMutation = useMutation({
		mutationFn: ({ photoId }: { photoId: number }) => deletePhoto({ photoId }),
	});

	const { data: albums } = useQuery({ queryKey: ["albums", id], queryFn: () => getAlbums({ userId: id }) });
	const { data: photos } = useQuery({
		queryKey: ["photos", selectedAlbum?.id],
		queryFn: () => getPhotos({ albumId: selectedAlbum?.id }),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
		},
		disabled: addAlbum.isPending,
	});

	const formPhoto = useForm<z.infer<typeof photoFormSchema>>({
		resolver: zodResolver(photoFormSchema),
		defaultValues: {
			title: "",
			picture: null,
		},
		disabled: addPhotoMutation.isPending,
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
		await addAlbum.mutateAsync(
			{ title: values.title },
			{
				onSuccess(data, variables, context) {
					setDialogOpen(false);
					queryClient.setQueryData(["albums", id], (oldData: Albums) => {
						return [...oldData, data];
					});
				},
			}
		);
	}
	async function onSubmitPhoto(values: z.infer<typeof photoFormSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
		const objectUrl = URL.createObjectURL(values.picture);
		await addPhotoMutation.mutateAsync(
			{ title: values.title, albumId: selectedAlbum?.id, url: objectUrl },
			{
				onSuccess(data) {
					setDialogOpen(false);
					queryClient.setQueryData(["photos", selectedAlbum?.id], (oldData: Albums) => {
						return [data, ...oldData];
					});
				},
				onError() {
					formPhoto.setError("picture", {
						message: "Something went wrong while uploading the photo, please try again later",
					});
				},
			}
		);
	}
	async function onDeleteAlbum(albumId: number) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		await deleteAlbumMutation.mutateAsync(
			{ albumId },
			{
				onSuccess(data, variables, context) {
					setDialogOpen(false);
					queryClient.setQueryData(["albums", id], (oldData: Albums) => {
						return oldData.filter((album) => album.id !== albumId);
					});
				},
			}
		);
	}
	async function onDeletePhoto(photo: number) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		await deletePhotoMutation.mutateAsync(
			{ photoId: photo.id },
			{
				onSuccess() {
					queryClient.setQueryData(
						["photos", selectedAlbum?.id],
						queryClient.getQueryData(["photos", selectedAlbum?.id]).filter((p) => p.id !== photo.id)
					);
				},
			}
		);
	}

	const snapPoints = [1];
	const [snap, setSnap] = React.useState<number | string | null>(snapPoints[0]);

	return (
		<>
			<div className="flex items-center py-4 justify-between">
				<h2 className="text-lg ">My albums</h2>
				<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
					<DialogTrigger>
						<Button>
							<Plus /> New
						</Button>
					</DialogTrigger>
					<DialogContent>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
								<DialogHeader>
									<DialogTitle>Album creation</DialogTitle>
									<DialogDescription>Choose a cool name for your brand-new album!</DialogDescription>
								</DialogHeader>
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Cool name</FormLabel>
											<FormControl>
												<Input aria-label="Title for the new album" placeholder="" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<DialogFooter>
									<Button aria-label="Create a new album " disabled={addAlbum.isPending} type="submit">
										{addAlbum.isPending ? <Loader2 className="animate-spin" /> : "Done"}
									</Button>
								</DialogFooter>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
				<Drawer
					autoFocus
					snapPoints={snapPoints}
					activeSnapPoint={snap}
					setActiveSnapPoint={setSnap}
					open={isEditing}
					onOpenChange={setIsEditing}
				>
					<DrawerContent id="album-photo" data-testid="#photos-drawer">
						<DrawerHeader>
							<DrawerTitle className="flex justify-between items-center">
								<span className="italic text-2xl">{selectedAlbum?.title} </span>
								<div className="justify-end flex">
									<Button size="icon" aria-label="Close album" onClick={() => setIsEditing(false)} variant="outline">
										X
									</Button>
								</div>
							</DrawerTitle>
							<DrawerDescription className="mt-6">
								<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
									<DialogTrigger>
										<Button>
											<CloudUpload /> Upload new photo
										</Button>
									</DialogTrigger>
									<DialogContent>
										<Form {...formPhoto}>
											<form onSubmit={formPhoto.handleSubmit(onSubmitPhoto)} className="space-y-2">
												<DialogHeader>
													<DialogTitle>Upload photo</DialogTitle>
												</DialogHeader>
												<FormField
													control={formPhoto.control}
													name="title"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Title</FormLabel>
															<FormControl>
																<Input
																	aria-label="Title for the new photo"
																	placeholder="Me, coding this project at 03:00 AM while enjoying a monster 🌚"
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<Label id="input-file-picture" aria-la>
													Picture
												</Label>
												<Input
													aria-labelledby="input-file-picture"
													aria-label="Select a picture"
													accept="image/png, image/jpeg"
													type="file"
													onChange={(f) => formPhoto.setValue("picture", f.target.files?.[0])}
												/>
												<span className="text-red-500">{formPhoto.formState.errors.picture?.message?.toString()}</span>
												<DialogFooter>
													<Button aria-label="Create a new album " disabled={addPhotoMutation.isPending} type="submit">
														{addPhotoMutation.isPending ? <Loader2 className="animate-spin" /> : "Done"}
													</Button>
												</DialogFooter>
											</form>
										</Form>
									</DialogContent>
								</Dialog>
							</DrawerDescription>
						</DrawerHeader>
						<div>
							<PhotoGrid onDelete={onDeletePhoto} photos={photos} userId={id} />
						</div>
					</DrawerContent>
				</Drawer>
			</div>
			<AlbumList albums={albums} userId={id} onDelete={onDeleteAlbum} onEdit={handleEditAlbum} />
		</>
	);
}
