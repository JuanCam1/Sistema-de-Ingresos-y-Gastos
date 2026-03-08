import { fetchRoleByIdUser } from "@/fetchers/role-fetcher";
import { RoleModel } from "@/models/role-model";
import { useQuery } from "@tanstack/react-query";

export function useRoleByIdUser({ userId }: { userId: string }) {
	return useQuery<RoleModel>({
		queryKey: ["role-user"],
		queryFn: () => fetchRoleByIdUser(userId),
		placeholderData: (prev) => prev,
	});
}
