import { Photos } from "@/types/photo";
import { Trash2 } from "lucide-react";
import { twMerge } from "tailwind-merge";
import Image from "./Image";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

interface AlbumListProps {
	photos: Photos;
	userId: number;
	onDelete?: (id: number) => void;
}

export default function PhotoGrid({ photos, userId, onDelete, author }: AlbumListProps) {
	return (
		<ScrollArea className="w-full h-[80vh]  p-2 rounded-md border">
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 grid-flow-row-dense gap-2 p-4">
				{photos?.map((photo, index) => {
					const randomSpan = Math.floor(Math.random() * 10);
					const idx = String(index);
					const colSpan = idx.includes(String(randomSpan)) ? "col-span-2 row-span-2 " : "col-span-1 row-span-1";

					return (
						<Card
							key={photo.id}
							className={twMerge("hover:scale-105 col-span-1  transition-all focus:scale-105  focus:ring-2", colSpan)}
						>
							<CardHeader className="flex flex-row items-center justify-between ">
								<CardTitle>{photo.title}</CardTitle>
								{onDelete ? (
									<div className="flex items-center gap-2">
										<Button
											id={`exclude-photo-${photo.title}-button`}
											aria-label={`Exclude photo: ${photo.title}`}
											onClick={async (e) => {
												console.log(e);
												e.preventDefault();
												e.stopPropagation();
												onDelete(photo);
												const liveRegion = document.getElementById("live-region");
												if (liveRegion) {
													liveRegion.textContent = `Photo ${photo.title} has been excluded.`;
												}
											}}
											size="icon"
											variant="ghost"
										>
											<Trash2 />
											<span className="sr-only">Exclude photo: {photo.title}</span>
										</Button>
									</div>
								) : null}
							</CardHeader>
							<CardContent>
								<Image alt={`Photo with title: ${photo.title}`} src={photo.url} />
							</CardContent>
							<CardFooter>
								<p>Card Footer</p>
							</CardFooter>
						</Card>
					);
				})}
			</div>
		</ScrollArea>
	);
}
