import { TypeMovementModel } from "@/models/type-movement-model";

export const fetchTypeMovements = async (): Promise<TypeMovementModel[]> => {
	const res = await fetch(`/api/type-movement`);
	if (!res.ok) throw new Error("Error fetching type movements");
	return res.json();
};
