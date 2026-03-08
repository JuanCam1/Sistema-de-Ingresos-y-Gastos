import prisma from "@/lib/prisma";

export const typeMovementRepository = {
	/**
	 * Obtiene tipos de movimiento desde la base de datos.
	 * @returns Array de tipos de movimiento con id y name.
	 */
	async getTypeMovements() {
		return prisma.typeMovement.findMany({
			select: {
				id: true,
				name: true,
			},
		});
	},
};
