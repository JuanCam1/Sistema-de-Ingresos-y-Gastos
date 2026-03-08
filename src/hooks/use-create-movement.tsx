import { fetchCreateMovement } from "@/fetchers/movement-fetcher";
import { notification } from "@/lib/notification";
import { CreateMovementModel } from "@/models/movement-model";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
	handleClose: () => void;
}

/**
 * Crea un movimiento y sincroniza la UI con side effects de exito/error.
 * @param params Parametros del hook.
 * @param params.handleClose Callback para cerrar el modal al finalizar.
 * @returns Mutacion de React Query para ejecutar la creacion del movimiento.
 */
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
