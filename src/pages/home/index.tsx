import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import useUsers from "@/hooks/useUsers";
import { useSelector } from "@/store";
import { NavLink } from "react-router";

export default function HomePage() {
	const { data: users, isError, isLoading } = useUsers();
	console.log(users);
	const user = useSelector((s) => s.user);
	console.log("user", user);
	return (
		<div className="grid grid-cols-3 gap-2">
			{users?.map((user) => {
				return (
					<NavLink to={`/users/${user.id}/albums`}>
						<Card>
							<CardHeader>
								<CardTitle>{user.name}</CardTitle>
								<CardDescription>{user.email}</CardDescription>
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
