import { fetchUsers } from "@/fetchers/user-fetcher";
import { UserResponse } from "@/models/user-response-model";
import { useQuery } from "@tanstack/react-query";

interface Props {
	roleId?: number;
	userId?: string;
}

/**
 * Consulta usuarios para modulos de movimientos/reportes segun rol y usuario.
 * @param params Parametros del hook.
 * @param params.roleId Rol del usuario autenticado para aplicar reglas de filtro.
 * @param params.userId ID del usuario cuando aplica filtro especifico.
 * @returns Resultado de React Query con data, estado de carga y error.
 */
export function useUserList({ roleId, userId }: Props) {
	return useQuery<UserResponse>({
		queryKey: ["users-movements", { page: 0, perPage: 0, roleId, userId }],
		queryFn: () => {
			if (roleId === undefined) {
				throw new Error("roleId is required");
			}

			return fetchUsers({
				page: 0,
				perPage: 0,
				roleId,
				userId,
			});
		},
		enabled: roleId !== undefined,
		placeholderData: (prev) => prev,
	});
}
