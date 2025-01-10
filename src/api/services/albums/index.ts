import ENDPOINTS from "@/api/endpoints";
import { Album, Albums } from "@/types/album";
import axiosInstance from "../axios";

export const getAlbums = async ({ userId }: { userId: number }) => {
	const response = await axiosInstance.get<Albums>(ENDPOINTS.ALBUMS.GET(userId));
	return response.data;
};
export const createAlbum = async ({ title, userId }: { title: string; userId: number }) => {
	const response = await axiosInstance.post<Album>(ENDPOINTS.ALBUMS.POST(userId), { title });
	return response.data;
};
export const deleteAlbum = async ({ albumId }: { albumId: number }) => {
	const response = await axiosInstance.delete<Albums>(ENDPOINTS.ALBUMS.DELETE(albumId));
	return response.data;
};
export const updateAlbum = async ({ title, userId }: { title: string; userId: number }) => {
	const response = await axiosInstance.put<Albums>(ENDPOINTS.ALBUMS.PUT(userId), { title });
	return response.data;
};
