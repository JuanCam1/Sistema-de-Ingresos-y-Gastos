import prisma from "@/lib/prisma";

export const roleRepository = {
	/**
	 * Obtiene todos los roles desde la base de datos.
	 * @returns Array de roles con id y name.
	 */
	async getRoles() {
		return prisma.role.findMany({
			select: {
				id: true,
				name: true,
			},
		});
	},
};
