// components/AlbumForm.tsx
import { useSelector } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const schema = z.object({
	username: z.string(),
	id: z.number(),
	name: z.string(),
	email: z.string(),
	address: z.object({
		street: z.string(),
		suite: z.string(),
		city: z.string(),
		zipcode: z.string(),
		geo: z.object({ lat: z.string(), lng: z.string() }),
	}),
	phone: z.string(),
	website: z.string(),
	company: z.object({
		name: z.string(),
		catchPhrase: z.string(),
		bs: z.string(),
	}),
});

export default function AccountForm() {
	const user = useSelector((s) => s.user!);
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: { ...user },
	});
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit((d) => console.log(d))} className="space-y-2 ">
				<section className="grid  grid-cols-3 gap-2">
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input aria-label="Username" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input aria-label="Email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Phone</FormLabel>
								<FormControl>
									<Input aria-label="Phone" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="website"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Website</FormLabel>
								<FormControl>
									<Input aria-label="Website" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="address.city"
						render={({ field }) => (
							<FormItem>
								<FormLabel>City</FormLabel>
								<FormControl>
									<Input aria-label="Address city" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="company.name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Company</FormLabel>
								<FormControl>
									<Input aria-label="Company name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</section>

				<Button aria-label="Create a new album " disabled={false} type="submit">
					Save
				</Button>
			</form>
		</Form>
	);
}
