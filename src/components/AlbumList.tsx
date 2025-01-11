import { cn } from "@/lib/utils";
import { Album, Albums } from "@/types/album";
import { Pencil, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
interface AlbumListProps {
	albums: Albums;
	userId: number;
	onDelete?: (id: number) => void;
	onEdit?: (album: Album) => void;
}
interface AlbumWithState extends Album {
	isRemoving?: boolean;
}
export default function AlbumList({ albums, userId, onDelete, onEdit }: AlbumListProps) {
	console.log(albums);
	const [visibleAlbums, setVisibleAlbums] = React.useState<AlbumWithState[]>(
		albums?.map((album) => ({ ...album, isRemoving: false }))
	);
	useEffect(() => {
		setVisibleAlbums(albums);
	}, [albums]);

	const handleDelete = (albumId: number) => {
		if (onDelete) {
			setVisibleAlbums((prev) => prev.map((album) => (album.id === albumId ? { ...album, isRemoving: true } : album)));
			setTimeout(() => {
				setVisibleAlbums((prev) => prev.filter((album) => album.id !== albumId));
				onDelete(albumId);
			}, 300);
		}
	};

	return (
		<ScrollArea className="w-full h-[75vh]  p-2 rounded-lg border">
			<div className="masonry-grid ">
				{visibleAlbums?.map((album) => {
					return (
						<NavLink
							key={album.id}
							viewTransition
							className=" hover:scale-105 transition-all  focus:scale-105  focus:ring-2 "
							to={`/users/${userId}/albums/${album.id}/photos`}
						>
							<Card className={cn(`transition-transform`, album.isRemoving ? "animate-fadeOut" : "animate-fadeIn")}>
								<CardHeader className="flex flex-row items-center justify-between ">
									<CardTitle aria-label={`Album title: ${album.title}`}>{album.title}</CardTitle>
									{onDelete || onEdit ? (
										<div className="flex items-center gap-2">
											{onDelete && (
												<Button
													role="button"
													id={`exclude-album-${album.title}-button`}
													aria-label={`Exclude album: ${album.title}`}
													onClick={async (e) => {
														console.log(e);
														e.preventDefault();
														e.stopPropagation();
														handleDelete(album.id);
														const liveRegion = document.getElementById("live-region");
														if (liveRegion) {
															liveRegion.textContent = `Album ${album.title} has been excluded.`;
														}
													}}
													size="icon"
													variant="ghost"
												>
													<Trash2 />
													<span className="sr-only">Exclude album: {album.title}</span>
												</Button>
											)}

											{onEdit && (
												<Button
													role="button"
													id={`edit-album-${album.title}-button`}
													aria-label={`Edit album: ${album.title}`}
													onClick={(e) => {
														e.preventDefault();
														e.stopPropagation();
														onEdit(album);
													}}
													size="icon"
													variant="ghost"
												>
													<Pencil />
													<span className="sr-only">Edit album: {album.title}</span>
												</Button>
											)}
										</div>
									) : null}
								</CardHeader>
								<CardContent>
									<p aria-label={`Description of album ${album.title}`}>
										Brief explanation of the job made in this album
									</p>
								</CardContent>
								<CardFooter>
									<p aria-label={`Categories of album ${album.title}`}>
										Category: <strong>landscape</strong>
									</p>
								</CardFooter>
							</Card>
						</NavLink>
					);
				})}
			</div>
		</ScrollArea>
	);
}
