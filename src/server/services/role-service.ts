import { roleRepository } from "../repositories/role-repository";

export const roleService = {
	async getRoles() {
		const roles = await roleRepository.getRoles();

		return {
			roles,
		};
	},
};
