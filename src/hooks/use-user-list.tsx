import { fetchUsers } from "@/fetchers/user-fetcher";
import { UserResponse } from "@/models/user-response-model";
import { useQuery } from "@tanstack/react-query";

interface Props {
	roleId: number;
	userId?: string;
}
export function useUserList({ roleId, userId }: Props) {
	return useQuery<UserResponse>({
		queryKey: ["users-movements", { page: 0, perPage: 0, roleId, userId }],
		queryFn: () =>
			fetchUsers({
				page: 0,
				perPage: 0,
				roleId,
				userId,
			}),
		placeholderData: (prev) => prev,
	});
}
