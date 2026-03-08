import { typeMovementRepository } from "../repositories/type-movement-repository";

export const typeMovementService = {
	async getTypeMovements() {
		const movements = await typeMovementRepository.getTypeMovements();

		return {
			movements,
		};
	},
};
