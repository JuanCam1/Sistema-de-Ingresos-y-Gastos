import { useQuery } from "@tanstack/react-query";
import { fetchTypeMovements } from "@/fetchers/type-movement-fetcher";
import { TypeMovementModel } from "@/models/type-movement-model";

export function useTypeMovement() {
	return useQuery<TypeMovementModel[]>({
		queryKey: ["types-movement"],
		queryFn: () => fetchTypeMovements(),
		placeholderData: (prev) => prev,
	});
}
