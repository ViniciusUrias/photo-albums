import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

export const albumFormSchema = z.object({
	title: z.string().min(2, "Album title must be at least 2 characters."),
});

export default function AlbumForm({
	onSubmit,
	isSubmitting,
}: {
	onSubmit: (data: any) => void;
	isSubmitting: boolean;
}) {
	const form = useForm({
		resolver: zodResolver(albumFormSchema),
		defaultValues: { title: "" },
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Album Title</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Enter album title" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="mt-4 flex justify-end">
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Submitting..." : "Submit"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
