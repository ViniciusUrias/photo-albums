import { Albums } from "@/types/album";
import { Pencil, Trash2 } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

interface AlbumListProps {
	albums: Albums;
	userId: number;
	onDelete?: (id: number) => void;
	onEdit?: (id: number) => void;
}

export default function AlbumList({ albums, userId, onDelete, onEdit }: AlbumListProps) {
	return (
		<ScrollArea className="w-full h-[75vh]  p-2 rounded-md border">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-3 p-4 ">
				{albums?.map((album) => {
					return (
						<NavLink
							className="hover:scale-105 transition-all focus:scale-105  focus:ring-2 "
							to={`/users/${userId}/albums/${album.id}/photos`}
						>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between ">
									<CardTitle>{album.title}</CardTitle>
									{onDelete || onEdit ? (
										<div className="flex items-center gap-2">
											<Button
												id={`exclude-album-${album.title}-button`}
												aria-label={`Exclude album: ${album.title}`}
												onClick={async (e) => {
													console.log(e);
													e.preventDefault();
													e.stopPropagation();
													onDelete(album.id);
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
											<Button
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
										</div>
									) : null}
								</CardHeader>
								<CardContent>
									<p>Card Content</p>
								</CardContent>
								<CardFooter>
									<p>Card Footer</p>
								</CardFooter>
							</Card>
						</NavLink>
					);
				})}
			</div>
		</ScrollArea>
	);
}
