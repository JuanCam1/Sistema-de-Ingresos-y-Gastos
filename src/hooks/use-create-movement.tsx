import { fetchCreateMovement } from "@/fetchers/movement-fetcher";
import { CreateMovementModel } from "@/models/movement-model";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
	handleClose: () => void;
}
export function useCreateMovement({ handleClose }: Props) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: CreateMovementModel) => {
			return fetchCreateMovement(data);
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["movements"] });
			handleClose();
		},
		onError: (error: any) => {
			console.error(
				"Error al crear movimiento:",
				error.response?.data || error.message,
			);
		},
	});
}
