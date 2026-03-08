import { fetchRoles } from "@/fetchers/role-fetcher";
import { RoleModel } from "@/models/role-model";
import { useQuery } from "@tanstack/react-query";

export function useRole() {
	return useQuery<RoleModel[]>({
		queryKey: ["roles"],
		queryFn: () => fetchRoles(),
		placeholderData: (prev) => prev,
	});
}
