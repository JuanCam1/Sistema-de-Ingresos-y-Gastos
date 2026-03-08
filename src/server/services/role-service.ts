import { roleRepository } from "../repositories/role-repository";

export const roleService = {
	/**
	 * Consulta todos los roles del sistema.
	 * @returns Objeto con array de roles.
	 */
	async getRoles() {
		const roles = await roleRepository.getRoles();

		return {
			roles,
		};
	},
};
