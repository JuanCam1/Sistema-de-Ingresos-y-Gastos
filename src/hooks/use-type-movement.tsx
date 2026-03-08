import { useQuery } from "@tanstack/react-query";
import { fetchTypeMovements } from "@/fetchers/type-movement-fetcher";
import { RoleModel } from "@/models/role-model";

export function useTypeMovement() {
	return useQuery<RoleModel[]>({
		queryKey: ["types-movement"],
		queryFn: () => fetchTypeMovements(),
		placeholderData: (prev) => prev,
	});
}
