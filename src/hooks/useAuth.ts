import { useSelector } from "@/store";

export const useAuth = () => {
	const user = useSelector((s) => s.user);

	return user;
};
