import { Photo, Photos } from "@/types/photo";
import { LucideExpand, Trash2 } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";
import Image from "./Image";
import NavigateBack from "./NavigateBack";
import PhotoModal from "./PhotoModal";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

interface AlbumListProps {
	photos: Photos;
	userId: number;
	onDelete?: (id: number) => void;
	expand?: boolean;
	backButton?: boolean;
}

const randomSpan = Math.floor(Math.random() * 10);
export default function PhotoGrid({ photos, onDelete, expand = true, backButton = true }: AlbumListProps) {
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [selectedPhoto, setSelectedPhoto] = React.useState<Photo | null>(null);
	const handleExpandPhoto = (photo: Photo) => {
		setSelectedPhoto(photo);
		setIsModalOpen(true);
	};
	return (
		<>
			{backButton ? (
				<div className="my-2">
					<NavigateBack />
				</div>
			) : null}

			<ScrollArea className="w-full h-[80vh]  p-2 rounded-md border">
				<PhotoModal
					onClose={() => {
						setIsModalOpen(false);
						setSelectedPhoto(null);
					}}
					open={isModalOpen}
					photo={selectedPhoto}
				/>
				<div
					data-testid="photos-gallery-grid"
					className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 grid-flow-row-dense gap-2 p-4"
				>
					{photos?.map((photo, index) => {
						const idx = String(index);
						const colSpan = idx.includes(String(randomSpan)) ? "col-span-2 row-span-2 " : "col-span-1 row-span-1";

						return (
							<Card
								key={photo.id}
								className={twMerge("hover:scale-105 col-span-1  transition-all focus:scale-105  focus:ring-2", colSpan)}
							>
								<CardHeader className="flex  flex-row items-center justify-between ">
									<CardTitle>{photo.title}</CardTitle>
									{expand ? (
										<Button
											onClick={() => handleExpandPhoto(photo)}
											aria-label="expand-image"
											variant="ghost"
											size="sm"
										>
											<LucideExpand />
										</Button>
									) : null}

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
							</Card>
						);
					})}
				</div>
			</ScrollArea>
		</>
	);
}
