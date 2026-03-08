import { typeMovementRepository } from "../repositories/type-movement-repository";

export const typeMovementService = {
	/**
	 * Consulta tipos de movimiento disponibles.
	 * @returns Objeto con array de tipos de movimiento.
	 */
	async getTypeMovements() {
		const movements = await typeMovementRepository.getTypeMovements();

		return {
			movements,
		};
	},
};
