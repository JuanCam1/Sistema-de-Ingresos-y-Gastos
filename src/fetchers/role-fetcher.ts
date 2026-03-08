import { RoleModel } from "@/models/role-model";

/**
 * Obtiene todos los roles disponibles en el sistema.
 * @returns Promesa con array de roles.
 */
export const fetchRoles = async (): Promise<RoleModel[]> => {
	const res = await fetch(`/api/role`);
	if (!res.ok) throw new Error("Error fetching roles");
	const { roles } = await res.json();
	return roles;
};

/**
 * Obtiene el rol de un usuario especifico.
 * @param userId ID del usuario a consultar.
 * @returns Promesa con informacion del rol del usuario.
 */
export const fetchRoleByIdUser = async (userId: string): Promise<RoleModel> => {
	const res = await fetch(`/api/role/user/${userId}`);
	if (!res.ok) throw new Error("Error fetching user role");
	const { role } = await res.json();
	return role;
};
