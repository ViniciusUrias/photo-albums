import { getUsers } from "@/api/services/users";
import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
	const users = useQuery({ queryKey: ["users"], queryFn: getUsers });

	return users;
};

export default useUsers;
