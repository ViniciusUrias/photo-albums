import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import UserList from "@/components/UserList";
import useUsers from "@/hooks/useUsers";

export default function HomePage() {
	const { data: users, isError, isLoading, error, refetch } = useUsers();
	console.log(users);

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
			<UserList users={users} />
		</ScrollArea>
	);
}
