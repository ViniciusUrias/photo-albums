import ENDPOINTS from "@/api/endpoints";
import { Albums } from "@/types/album";
import axiosInstance from "../axios";

export const getAlbums = async ({ userId }: { userId: number }) => {
	const response = await axiosInstance.get<Albums>(ENDPOINTS.ALBUMS.GET(userId));
	return response.data;
};
