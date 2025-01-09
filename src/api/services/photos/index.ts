import ENDPOINTS from "@/api/endpoints";
import { Photos } from "@/types/photo";
import axiosInstance from "../axios";

export const getPhotos = async ({ albumId }: { albumId: number }) => {
	const response = await axiosInstance.get<Photos>(ENDPOINTS.PHOTOS.GET(albumId));
	return response.data;
};
