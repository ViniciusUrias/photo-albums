// hooks/useAlbums.ts
import { createPhoto, deletePhoto, getPhotos } from "@/api/services/photos";
import { useMutation, useQuery } from "@tanstack/react-query";

export const usePhotos = (albumId: number) => {
	const { data: photos } = useQuery({
		queryKey: ["photos", albumId],
		queryFn: () => getPhotos({ albumId: albumId }),
	});
	const addPhotoMutation = useMutation({
		mutationFn: (data: { title: string; albumId: number; url: string }) => createPhoto(data),
	});

	const deletePhotoMutation = useMutation({
		mutationFn: ({ photoId }: { photoId: number }) => deletePhoto({ photoId }),
	});

	return { photos, addPhotoMutation, deletePhotoMutation };
};
