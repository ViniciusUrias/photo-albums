import { getPhotos } from "@/api/services/photos";
import PhotoGrid from "@/components/PhotoGrid";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export default function Photos() {
	const { albumId } = useParams();
	console.log(albumId);
	const { data: photos } = useQuery({ queryKey: ["albums", albumId], queryFn: () => getPhotos({ albumId }) });

	return <PhotoGrid photos={photos} />;
}
