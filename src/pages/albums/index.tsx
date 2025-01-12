import { getAlbums } from "@/api/services/albums";
import AlbumList from "@/components/AlbumList";
import NavigateBack from "@/components/NavigateBack";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";

export default function Albums() {
	const { userId } = useParams();
	const { data: albums } = useQuery({ queryKey: ["albums", userId], queryFn: () => getAlbums({ userId }) });
	const queryClient = useQueryClient();
	const userInfo = queryClient.getQueryData(["users"]).find((user) => user.id === Number(userId));
	console.log(userId);
	console.log(userInfo);
	return (
		<>
			<div className="flex items-center gap-2 my-2">
				<NavigateBack />
				<span>{userInfo?.name} albums</span>
			</div>
			<AlbumList albums={albums} userId={userId} />
		</>
	);
}
