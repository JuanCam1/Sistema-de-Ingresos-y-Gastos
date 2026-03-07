import { MovementResponse } from "@/models/movement-response-model";

interface FetchMovementParams {
    page: number;
    perPage: number;
    idUser?: string;
    typeMovement?: string;
}

export const fetchMovement = async ({
    idUser,
    typeMovement,
    perPage,
    page
}: FetchMovementParams): Promise<MovementResponse> => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("perPage", String(perPage));

    if (idUser) params.set("idUser", String(idUser));
    if (typeMovement) params.set("typeMovement", String(typeMovement));

    const res = await fetch(`/api/movement?${params.toString()}`);
    if (!res.ok) throw new Error("Error fetching movements");
    return res.json();
};
