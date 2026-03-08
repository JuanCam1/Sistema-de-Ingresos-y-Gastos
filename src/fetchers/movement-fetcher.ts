import { CreateMovementModel } from "@/models/movement-model";
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

export const fetchCreateMovement = async (data: CreateMovementModel) => {
	const res = await fetch(`/api/movement`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	if (!res.ok) throw new Error("Error creating movement");
	return res.json();
};
