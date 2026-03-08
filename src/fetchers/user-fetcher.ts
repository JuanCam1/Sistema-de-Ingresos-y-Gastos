import { UserUpdateModel } from "@/models/user-model";
import { UserResponse } from "@/models/user-response-model";

interface FetchUsersParams {
	page: number;
	perPage: number;
	name?: string;
	roleId: number;
	userId?: string;
}

/**
 * Obtiene usuarios desde la API con filtros y paginacion.
 * @param params Parametros de busqueda.
 * @param params.page Numero de pagina.
 * @param params.perPage Cantidad de registros por pagina.
 * @param params.name Filtro por nombre (opcional).
 * @param params.roleId ID del rol para aplicar reglas de filtrado.
 * @param params.userId ID de usuario especifico (opcional).
 * @returns Promesa con respuesta paginada de usuarios.
 */
export const fetchUsers = async ({
	page,
	perPage,
	name,
	roleId,
	userId,
}: FetchUsersParams): Promise<UserResponse> => {
	const params = new URLSearchParams();
	params.set("page", String(page));
	params.set("perPage", String(perPage));
	params.set("roleId", String(roleId));

	if (name) params.set("name", String(name));
	if (userId) params.set("userId", String(userId));

	const res = await fetch(`/api/user?${params.toString()}`);
	if (!res.ok) throw new Error("Error fetching users");
	return res.json();
};

/**
 * Actualiza datos de un usuario mediante la API.
 * @param data Datos del usuario a actualizar (id, name, roleId).
 * @returns Promesa con el usuario actualizado.
 */
export const fetchUpdateUser = async (data: UserUpdateModel) => {
	const body = {
		name: data.name,
		roleId: data.roleId,
	};
	const res = await fetch(`/api/user/${data.id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});
	console.log(res);
	if (!res.ok) throw new Error("Error updating user");
	return res.json();
};
