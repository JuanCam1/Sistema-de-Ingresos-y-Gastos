import prisma from "@/lib/prisma";
import { Prisma } from "../../../prisma/generated/prisma/browser";

export const userRepository = {
	async count(where?: Prisma.UserWhereInput) {
		return prisma.user.count({ where });
	},

	async getUsers(
		where?: Prisma.UserWhereInput,
		page?: number,
		perPage?: number,
	) {
		return prisma.user.findMany({
			where,
			orderBy: { createdAt: "desc" },

			...(page && perPage
				? {
						skip: (page - 1) * perPage,
						take: perPage,
					}
				: {}),

			select: {
				id: true,
				name: true,
				email: true,
				telephone: true,
				image: true,
				role: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});
	},

	async getRoleByIdUser(id: string) {
		return prisma.user.findFirst({
			where: { id },
			select: {
				role: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});
	},

	async updateUser(id: string, data: { name: string; roleId: number }) {
		return prisma.user.update({
			where: { id },
			data: {
				name: data.name,
				roleId: data.roleId,
			},
			select: {
				id: true,
				name: true,
				email: true,
				role: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});
	},
};
