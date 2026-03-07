import { fetchUsers } from "@/fetchers/user-fetcher";
import { UserResponse } from "@/models/user-response-model";
import { useQuery } from "@tanstack/react-query";

export default function useUserList() {
	return useQuery<UserResponse>({
		queryKey: ["users-movements", { page: 0, perPage: 0 }],
		queryFn: () =>
			fetchUsers({
				page: 0,
				perPage: 0,
			}),
		placeholderData: (prev) => prev,
	});
}
