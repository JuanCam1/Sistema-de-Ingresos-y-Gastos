import { CreateMovementModel } from "@/models/movement-model";
import { MovementResponse } from "@/models/movement-response-model";

interface FetchMovementParams {
	page: number;
	perPage: number;
	userId: string;
	typeMovement?: string;
}

/**
 * Obtiene movimientos desde la API con filtros y paginacion.
 * @param params Parametros de busqueda.
 * @param params.page Numero de pagina.
 * @param params.perPage Cantidad de registros por pagina.
 * @param params.userId ID del usuario para filtrar movimientos.
 * @param params.typeMovement Tipo de movimiento (opcional) para filtrar.
 * @returns Promesa con respuesta paginada de movimientos.
 */
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

/**
 * Crea un nuevo movimiento mediante la API.
 * @param data Datos del movimiento a crear (userId, typeMovement, amount, fecha).
 * @returns Promesa con el movimiento creado.
 */
export const fetchCreateMovement = async (data: CreateMovementModel) => {
	const res = await fetch(`/api/movement`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	if (!res.ok) throw new Error("Error creating movement");
	return res.json();
};
