import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import useUsers from "@/hooks/useUsers";
import { useSelector } from "@/store";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router";

export default function HomePage() {
	const { data: users, isError, isLoading, error, refetch } = useUsers();
	console.log(users);
	const user = useSelector((s) => s.user);
	console.log(error);
	console.log("user", user);
	if (isLoading) {
		return (
			<div className="masonry-grid ">
				{Array.from({ length: 12 }).map((_, i) => (
					<Skeleton key={i} className="h-40" />
				))}
			</div>
		);
	}
	if (isError) {
		return (
			<div className="flex h-[80vh] items-center justify-center flex-col gap-4">
				<p className="warning text-xl">{error?.message}</p>
				<Button size="lg" onClick={() => refetch()}>
					Retry
				</Button>
			</div>
		);
	}
	return (
		<ScrollArea className="w-full h-[75vh]  p-2 rounded-md border">
			<section className="masonry-grid ">
				{users?.map((user) => {
					const nameFallback = user?.name
						?.split(" ")
						.map((n) => n[0])
						.join("")
						.toUpperCase();
					return (
						<Card key={user.id}>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Avatar>
										<AvatarImage src={`https://avatar.iran.liara.run/public/${user.id}`} alt={user.name} />
										<AvatarFallback>{nameFallback}</AvatarFallback>
									</Avatar>
									<div>
										{user.name}
										<CardDescription>{user.email}</CardDescription>
									</div>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates voluptatum quibusdam facere
									praesentium officiis a consequatur architecto perspiciatis molestias itaque, adipisci quas ex?
									Expedita possimus adipisci eum vero saepe nobis!
								</p>
							</CardContent>
							<CardFooter className="justify-end">
								<Button asChild>
									<Link viewTransition key={user.id} to={`/users/${user.id}/albums`}>
										View albums
									</Link>
								</Button>
							</CardFooter>
						</Card>
					);
				})}
			</section>
		</ScrollArea>
	);
}
