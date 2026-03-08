import { TypeMovementModel } from "@/models/type-movement-model";

/**
 * Obtiene tipos de movimiento disponibles (Ingreso/Egreso).
 * @returns Promesa con array de tipos de movimiento.
 */
export const fetchTypeMovements = async (): Promise<TypeMovementModel[]> => {
	const res = await fetch(`/api/type-movement`);
	if (!res.ok) throw new Error("Error fetching type movements");
	const { movements } = await res.json();
	return movements;
};
