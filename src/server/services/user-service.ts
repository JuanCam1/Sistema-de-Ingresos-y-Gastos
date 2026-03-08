import { normalize } from "@/utils/normalize-text";
import { Prisma } from "../../../prisma/generated/prisma/browser";
import { userRepository } from "../repositories/user-repository";
import { UserFilters } from "../types/user-filter-type";

export const userService = {
	async getUsers(filters: UserFilters) {
		const page = filters.page ?? 1;
		const perPage = filters.perPage ?? 10;

		const where: Prisma.UserWhereInput = {};

		if (filters.name) {
			where.name = {
				contains: normalize(filters.name),
			};
		}

		const finalWhere = Object.keys(where).length ? where : undefined;

		const total = await userRepository.count(finalWhere);

		if (page === 0 && perPage === 0) {
			const users = await userRepository.getUsers(finalWhere);

			return {
				data: users,
				meta: {
					total,
					page: 0,
					perPage: total,
					totalPages: 1,
				},
			};
		}

		const validPage = Math.max(1, page);
		const validPerPage = Math.max(1, perPage);

		const users = await userRepository.getUsers(
			finalWhere,
			validPage,
			validPerPage,
		);

		const totalPages = Math.max(1, Math.ceil(total / validPerPage));

		return {
			data: users,
			meta: {
				total,
				page: validPage,
				perPage: validPerPage,
				totalPages,
			},
		};
	},

	// async getUsers(filters: UserFilters) {
	// 	const page = Math.max(1, filters.page || 1);
	// 	const perPage = Math.max(1, filters.perPage || 10);

	// 	const where: Prisma.UserWhereInput = {};

	// 	if (filters.name) {
	// 		where.name = {
	// 			contains: filters.name,
	// 		};
	// 	}

	// 	const finalWhere = Object.keys(where).length ? where : undefined;

	// 	const total = await userRepository.count(finalWhere);

	// 	const users = await userRepository.getUsers(finalWhere, page, perPage);

	// 	const totalPages = Math.max(1, Math.ceil(total / perPage));

	// 	return {
	// 		data: users,
	// 		meta: {
	// 			total,
	// 			page,
	// 			perPage,
	// 			totalPages,
	// 		},
	// 	};
	// },

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
