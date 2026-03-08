import { z } from "zod";

export const movementCreateSchema = z.object({
	amount: z
		.string()
		.nonempty("El monto es requerido")
		.refine((val) => !isNaN(Number(val)), {
			message: "El monto debe ser un número",
		})
		.refine((val) => Number(val) >= 0, {
			message: "El monto no puede ser menor que 0",
		})
		.refine((val) => Number(val) <= 100000000, {
			message: "El monto no puede ser mayor que 100000000",
		}),

	date: z.date().refine(Boolean, { message: "La fecha es requerida" }),

	concept: z.string().nonempty("El concepto es requerido"),
});
