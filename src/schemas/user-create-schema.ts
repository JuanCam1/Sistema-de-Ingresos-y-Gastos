import z from "zod";

export const userUpdateSchema = z.object({
	name: z.string().min(2).max(50),
	roleId: z.string({
		error: "Please select a valid role.",
	}),
});
