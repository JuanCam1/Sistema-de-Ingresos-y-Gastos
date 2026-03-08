import prisma from "@/lib/prisma";
import { Prisma } from "../../../prisma/generated/prisma/browser";

export const movementRepository = {
	/**
	 * Cuenta movimientos segun condiciones.
	 * @param where Filtros de busqueda Prisma.
	 * @returns Cantidad de movimientos.
	 */
	async count(where?: Prisma.MovementWhereInput) {
		return prisma.movement.count({ where });
	},

	/**
	 * Consulta movimientos con paginacion y relaciones (type, user).
	 * @param where Filtros de busqueda Prisma.
	 * @param page Numero de pagina (opcional).
	 * @param perPage Registros por pagina (opcional).
	 * @returns Array de movimientos con type y user.
	 */
	async getMovements(
		where?: Prisma.MovementWhereInput | undefined,
		page?: number,
		perPage?: number,
	) {
		return prisma.movement.findMany({
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
				monto: true,
				fecha: true,
				type: {
					select: {
						id: true,
						name: true,
					},
				},
				user: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});
	},

	/**
	 * Crea un movimiento en base de datos.
	 * @param data Datos del movimiento (userId, typeMovement, amount, fecha).
	 * @returns Movimiento creado.
	 */
	async createMovement(data: {
		userId: string;
		typeMovement: string;
		amount: string;
		fecha: Date;
	}) {
		return prisma.movement.create({
			data: {
				monto: Number(data.amount),
				fecha: data.fecha,
				typeId: Number(data.typeMovement),
				userId: data.userId,
			},
		});
	},
};
``;
