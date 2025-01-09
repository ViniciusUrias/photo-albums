import ENDPOINTS from "@/api/endpoints";
import { Users } from "@/types/user";
import axiosInstance from "../axios";

export const getUsers = async () => {
	const response = await axiosInstance.get<Users>(ENDPOINTS.USERS.GET);
	return response.data;
};
