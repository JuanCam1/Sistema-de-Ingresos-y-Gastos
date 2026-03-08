import { fetchRoles } from "@/fetchers/role-fetcher";
import { RoleModel } from "@/models/role-model";
import { useQuery } from "@tanstack/react-query";

/**
 * Obtiene todos los roles disponibles en el sistema.
 * @returns Resultado de React Query con listado de roles.
 */
export function useRole() {
	return useQuery<RoleModel[]>({
		queryKey: ["roles"],
		queryFn: () => fetchRoles(),
		placeholderData: (prev) => prev,
	});
}
