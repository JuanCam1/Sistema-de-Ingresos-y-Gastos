import { fetchCreateMovement } from "@/fetchers/movement-fetcher";
import { notification } from "@/lib/notification";
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
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["movements"] });
			notification("Movimiento creado satisfactoriamente", "success");
			setTimeout(() => {
				handleClose();
			}, 3000);
		},
		onError: () => {
			notification("Error al crear un nuevo movimiento", "error");
		},
	});
}
