// hooks/useAlbums.ts
import { createAlbum, deleteAlbum, getAlbums } from "@/api/services/albums";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAlbums = (userId: number) => {
	const { data: albums } = useQuery({ queryKey: ["albums", userId], queryFn: () => getAlbums({ userId }) });

	const addAlbum = useMutation({
		mutationFn: ({ title }: { title: string }) => createAlbum({ title, userId }),
	});

	const deleteAlbumMt = useMutation({
		mutationFn: ({ albumId }: { albumId: number }) => deleteAlbum({ albumId }),
	});

	return { albums, addAlbum, deleteAlbumMt };
};
