import { Prisma } from "../../../prisma/generated/prisma/browser";
import { movementRepository } from "../repositories/movement-repository";
import { MovementFilters } from "../types/movement-filter-type";

export const movementService = {
	/**
	 * Consulta movimientos con filtros y metadatos de paginacion.
	 * @param filters Filtros de busqueda (`userId`, `typeMovement`, `page`, `perPage`).
	 * @returns Objeto con `data` y `meta` para la tabla/reportes.
	 */
	async getMovements(filters: MovementFilters) {
		const page = Math.max(1, filters.page || 1);
		const perPage = Math.max(1, filters.perPage || 10);

		const where: Prisma.MovementWhereInput = {};

		if (filters.typeMovement) {
			where.typeId = {
				equals: Number(filters.typeMovement),
			};
		}

		if (filters.userId) {
			where.userId = {
				equals: filters.userId,
			};
		}

		const finalWhere = Object.keys(where).length ? where : undefined;

		const total = await movementRepository.count(finalWhere);

		if (page === 0 && perPage === 0) {
			const users = await movementRepository.getMovements(finalWhere);

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

		const movements = await movementRepository.getMovements(
			finalWhere,
			validPage,
			validPerPage,
		);

		const totalPages = Math.max(1, Math.ceil(total / validPerPage));

		return {
			data: movements,
			meta: {
				total,
				page: validPage,
				perPage: validPerPage,
				totalPages,
			},
		};
	},

	/**
	 * Crea un movimiento nuevo en base de datos.
	 * @param data Datos del movimiento desde el cliente.
	 * @returns Movimiento creado por el repositorio.
	 */
	async createMovement(data: {
		userId: string;
		typeMovement: string;
		amount: string;
		fecha: string;
	}) {
		return await movementRepository.createMovement({
			userId: data.userId,
			typeMovement: data.typeMovement,
			amount: data.amount,
			fecha: new Date(data.fecha),
		});
	},
};
