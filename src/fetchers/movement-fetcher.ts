import { MovementResponse } from "@/models/movement-response-model";

interface FetchMovementParams {
	page: number;
	perPage: number;
	userId: string;
	typeMovement?: string;
}

export const fetchMovement = async ({
	userId,
	typeMovement,
	perPage,
	page,
}: FetchMovementParams): Promise<MovementResponse> => {
	const params = new URLSearchParams();
	params.set("page", String(page));
	params.set("perPage", String(perPage));

	if (userId) params.set("userId", String(userId));
	if (typeMovement) params.set("typeMovement", String(typeMovement));

	const res = await fetch(`/api/movement?${params.toString()}`);
	if (!res.ok) throw new Error("Error fetching movements");
	return res.json();
};
