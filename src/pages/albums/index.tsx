import { getAlbums } from "@/api/services/albums";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router";

export default function Albums() {
	const { userId } = useParams();
	const { data: albums } = useQuery({ queryKey: ["albums", userId], queryFn: () => getAlbums({ userId }) });

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-3 ">
			{albums?.map((album) => {
				return (
					<NavLink
						className="hover:scale-105 transition-all focus:scale-105  focus:ring-2 outline-none"
						to={`/users/${userId}/albums/${album.id}/photos`}
					>
						<Card>
							<CardHeader>
								<CardTitle>{album.title}</CardTitle>
								<CardDescription>{album.id}</CardDescription>
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
	);
}
