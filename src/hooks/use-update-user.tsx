import { fetchUpdateUser } from "@/fetchers/user-fetcher";
import { notification } from "@/lib/notification";
import { UserUpdateModel } from "@/models/user-model";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
	handleClose: () => void;
}

/**
 * Actualiza datos de un usuario y sincroniza UI con side effects.
 * @param params Parametros del hook.
 * @param params.handleClose Callback para cerrar el modal despues de actualizar.
 * @returns Mutacion de React Query para ejecutar actualizacion del usuario.
 */
export function useUpdateUser({ handleClose }: Props) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: UserUpdateModel) => {
			return fetchUpdateUser(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			notification("Usuario actualizado satisfactoriamente", "success");
			setTimeout(() => {
				handleClose();
			}, 3000);
		},
		onError: () => {
			notification("Error al actualizar el usuario", "error");
		},
	});
}
