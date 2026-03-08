import { fetchMovement } from "@/fetchers/movement-fetcher";
import { MovementResponse } from "@/models/movement-response-model";
import { useQuery } from "@tanstack/react-query";

interface Props {
	userId: string;
}
export function useMovementList({ userId }: Props) {
	return useQuery<MovementResponse>({
		queryKey: ["movement-report", { page: 0, perPage: 0 }],
		queryFn: () =>
			fetchMovement({
				userId,
				page: 0,
				perPage: 0,
			}),
		placeholderData: (prev) => prev,
	});
}
