import { getPhotos } from "@/api/services/photos";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export default function Photos() {
	const { albumId } = useParams();
	console.log(albumId);
	const { data: photos } = useQuery({ queryKey: ["albums", albumId], queryFn: () => getPhotos({ albumId }) });

	return (
		<div className="grid grid-cols-3 gap-2">
			{photos?.map((photo) => {
				return (
					<Card>
						<CardHeader>
							<CardTitle>{photo.title}</CardTitle>
							<CardDescription>{photo.email}</CardDescription>
						</CardHeader>
						<CardContent>
							<img className="w-24 h-24" alt="image" src={photo.url} loading="lazy" />
						</CardContent>
						<CardFooter>
							<p>Card Footer</p>
						</CardFooter>
					</Card>
				);
			})}
		</div>
	);
}
