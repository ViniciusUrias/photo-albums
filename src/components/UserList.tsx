import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "@/types/user";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router";

export default function UserList({ users }: { users: Users }) {
	return (
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
								praesentium officiis a consequatur architecto perspiciatis molestias itaque, adipisci quas ex? Expedita
								possimus adipisci eum vero saepe nobis!
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
	);
}
