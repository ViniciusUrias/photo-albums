import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const photoFormSchema = z.object({
	photoTitle: z.string().min(2, {
		message: "Photo title must be at least 4 characters.",
	}),
	picture: z.any(),
});

export default function PhotoForm({
	onSubmit,
	isSubmitting,
}: {
	onSubmit: (data: any) => void;
	isSubmitting: boolean;
}) {
	const form = useForm<z.infer<typeof photoFormSchema>>({
		resolver: zodResolver(photoFormSchema),
		defaultValues: { photoTitle: "", picture: null },
	});

	return (
		<Form {...form}>
			<form data-testid="upload-photo-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
				<FormField
					control={form.control}
					name="photoTitle"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input
									aria-label="Title for the new photo"
									placeholder="Me, coding this project at 03:00 AM while enjoying a monster 🌚"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Label id="input-file-picture-label" htmlFor="input-file-picture">
					Picture
				</Label>
				<Input
					id="input-file-picture"
					aria-labelledby="input-file-picture-label"
					aria-label="Select a picture"
					data-testid="photo-uploader"
					accept="image/png, image/jpeg"
					type="file"
					onChange={(f) => form.setValue("picture", f.target.files?.[0])}
				/>
				<span className="text-red-500">{form.formState.errors.picture?.message?.toString()}</span>
				<Button role="button" aria-label="Create a new album " disabled={isSubmitting} type="submit">
					{isSubmitting ? <Loader2 className="animate-spin" /> : "Done"}
				</Button>
			</form>
		</Form>
	);
}
