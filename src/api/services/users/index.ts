import ENDPOINTS from "@/api/endpoints";
import { Users } from "@/types/user";
import axiosInstance from "../axios";

export const getUsers = async () => {
	try {
		const response = await axiosInstance.get<Users>(ENDPOINTS.USERS.GET);
		return response.data;
	} catch (error) {
		throw new Error("Something went wrong while fetching users");
	}
};
