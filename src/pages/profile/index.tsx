import AlbumForm, { albumFormSchema } from "@/components/AlbumForm";
import AlbumList from "@/components/AlbumList";
import AccountForm from "@/components/profile/AccountForm";
import DrawerEditAlbum from "@/components/profile/DrawerEditAlbum";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAlbums } from "@/hooks/useAlbums";
import { useSelector } from "@/store";
import { Album, Albums } from "@/types/album";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import React from "react";
import { z } from "zod";

export default function Profile() {
	const user = useSelector((s) => s.user!);
	const { id } = user;
	const [dialogOpen, setDialogOpen] = React.useState(false);
	const [isEditing, setIsEditing] = React.useState(false);
	const [selectedAlbum, setSelectedAlbum] = React.useState<Album | null>(null);
	const handleEditAlbum = (album: Album) => {
		setIsEditing(true);
		setSelectedAlbum(album);
	};

	const queryClient = useQueryClient();

	const { addAlbum, albums, deleteAlbumMt } = useAlbums(id);

	async function onSubmit(values: z.infer<typeof albumFormSchema>) {
		console.log(values);
		await addAlbum.mutateAsync(
			{ title: values.title },
			{
				onSuccess(data) {
					document.startViewTransition(() => {
						setDialogOpen(false);
						queryClient.setQueryData(["albums", id], (oldData: Albums) => {
							return [data, ...oldData];
						});
					});
				},
			}
		);
	}

	async function onDeleteAlbum(albumId: number) {
		await deleteAlbumMt.mutateAsync(
			{ albumId },
			{
				onSuccess() {
					queryClient.setQueryData(["albums", id], (oldData: Albums) => {
						return oldData.filter((album) => album.id !== albumId);
					});
				},
			}
		);
	}

	return (
		<>
			<Tabs defaultValue="albums">
				<TabsList>
					<TabsTrigger value="albums">Albums</TabsTrigger>
					<TabsTrigger value="account">Account</TabsTrigger>
				</TabsList>
				<TabsContent value="account">
					<div className="flex flex-col items-start py-4 justify-between">
						<h2 className="text-lg my-2 ">Manage your account</h2>
						<AccountForm />
					</div>
				</TabsContent>
				<TabsContent value="albums">
					<>
						<div className="flex items-center py-4 justify-between">
							<h2 className="text-lg ">Manage your albums</h2>
							<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
								<DialogTrigger>
									<Button>
										<Plus /> New
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogTitle>Create new album</DialogTitle>
									<AlbumForm onSubmit={onSubmit} isSubmitting={addAlbum.isPending} />
								</DialogContent>
							</Dialog>
							<DrawerEditAlbum album={selectedAlbum} open={isEditing} onClose={() => setIsEditing(false)} />
						</div>
						<AlbumList albums={albums || []} userId={id} onDelete={onDeleteAlbum} onEdit={handleEditAlbum} />
					</>
				</TabsContent>
			</Tabs>
		</>
	);
}
