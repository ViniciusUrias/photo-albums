import ENDPOINTS from "@/api/endpoints";
import { Photos } from "@/types/photo";
import axiosInstance from "../axios";

export const getPhotos = async ({ albumId }: { albumId: number }) => {
	const response = await axiosInstance.get<Photos>(ENDPOINTS.PHOTOS.GET(albumId));
	return response.data;
};
export const createPhoto = async (body: { title: string; albumId: number; url: string }) => {
	const response = await axiosInstance.post(ENDPOINTS.PHOTOS.POST(), body);
	return response.data;
};
export const deletePhoto = async ({ photoId }: { photoId: number }) => {
	const response = await axiosInstance.delete(ENDPOINTS.PHOTOS.DELETE(photoId));
	return response.data;
};
