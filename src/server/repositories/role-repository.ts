import prisma from "@/lib/prisma";

export const roleRepository = {
	async getRoles() {
		return prisma.role.findMany({
			select: {
				id: true,
				name: true,
			},
		});
	},
};
