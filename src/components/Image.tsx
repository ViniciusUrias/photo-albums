import fallbackImage from "@/assets/no-image-available.png";
import { cn } from "@/lib/utils";
import { useState } from "react";
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
