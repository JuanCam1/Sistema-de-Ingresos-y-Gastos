import prisma from "@/lib/prisma";

export const typeMovementRepository = {
	async getTypeMovements() {
		return prisma.typeMovement.findMany({
			select: {
				id: true,
				name: true,
			},
		});
	},
};
