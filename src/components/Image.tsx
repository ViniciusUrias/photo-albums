import { cn } from "@/lib/utils";
import { useState } from "react";
import fallbackImage from "/public/no-image-available.png";
export default function Image({ src, className, ...rest }: React.HTMLProps<HTMLImageElement>) {
	const [error, setError] = useState(false);
	return (
		<img
			className={cn("w-full aspect-square", className)}
			src={error ? fallbackImage : src}
			loading="lazy"
			onError={() => setError(true)}
			{...rest}
		/>
	);
}
