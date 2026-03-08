import { useQuery } from "@tanstack/react-query";
import { fetchTypeMovements } from "@/fetchers/type-movement-fetcher";
import { TypeMovementModel } from "@/models/type-movement-model";

/**
 * Obtiene tipos de movimiento disponibles (Ingreso/Egreso).
 * @returns Resultado de React Query con listado de tipos de movimiento.
 */
export function useTypeMovement() {
	return useQuery<TypeMovementModel[]>({
		queryKey: ["types-movement"],
		queryFn: () => fetchTypeMovements(),
		placeholderData: (prev) => prev,
	});
}
