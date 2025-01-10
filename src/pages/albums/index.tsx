import { getAlbums } from "@/api/services/albums";
import AlbumList from "@/components/AlbumList";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export default function Albums() {
	const { userId } = useParams();
	const { data: albums } = useQuery({ queryKey: ["albums", userId], queryFn: () => getAlbums({ userId }) });

	return <AlbumList albums={albums} userId={userId} />;
}
