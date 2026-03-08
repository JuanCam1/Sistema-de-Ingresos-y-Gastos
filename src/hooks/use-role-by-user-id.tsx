import { fetchRoleByIdUser } from "@/fetchers/role-fetcher";
import { RoleModel } from "@/models/role-model";
import { useQuery } from "@tanstack/react-query";

/**
 * Obtiene el rol de un usuario especifico por su ID.
 * @param params Parametros del hook.
 * @param params.userId ID del usuario a consultar.
 * @returns Resultado de React Query con informacion del rol del usuario.
 */
export function useRoleByIdUser({ userId }: { userId: string }) {
	return useQuery<RoleModel>({
		queryKey: ["role-user"],
		queryFn: () => fetchRoleByIdUser(userId),
		placeholderData: (prev) => prev,
	});
}
