import { Prisma } from "../../../prisma/generated/prisma/browser";
import { userRepository } from "../repositories/user-repository";
import { UserFilters } from "../types/user-filter-type";

export const userService = {
	async getUsers(filters: UserFilters) {
		const page = Math.max(1, filters.page || 1);
		const perPage = Math.max(1, filters.perPage || 10);

		const where: Prisma.UserWhereInput = {};

		if (filters.name) {
			where.name = {
				contains: filters.name,
			};
		}

		const finalWhere = Object.keys(where).length ? where : undefined;

		const total = await userRepository.count(finalWhere);

		const users = await userRepository.getUsers(finalWhere, page, perPage);

		const totalPages = Math.max(1, Math.ceil(total / perPage));

		return {
			data: users,
			meta: {
				total,
				page,
				perPage,
				totalPages,
			},
		};
	},

	//   async getUser(id: string) {
	//     return userRepository.getUserById(id)
	//   },

	//   async createUser(data: any) {
	//     return userRepository.createUser(data)
	//   },

	//   async updateUser(id: string, data: any) {
	//     return userRepository.updateUser(id, data)
	//   },

	//   async deleteUser(id: string) {
	//     return userRepository.deleteUser(id)
	//   }
};
