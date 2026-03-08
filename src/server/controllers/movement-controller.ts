import { NextApiRequest, NextApiResponse } from "next";
import { movementService } from "../services/movement-service";
import { CreateMovementModel } from "@/models/movement-model";

export const movementController = {
	async getMovements(req: NextApiRequest, res: NextApiResponse) {
		const filters = {
			userId: req.query.userId as string,
			typeMovement: req.query.typeMovement as string,
		};

		try {
			const result = await movementService.getMovements(filters);

			res.status(200).json(result);
		} catch (error) {
			res.status(500).json({ message: "Error fetching movements", error });
		}
	},

	async createMovement(req: NextApiRequest, res: NextApiResponse) {
		const body: CreateMovementModel = req.body;
		const { userId, typeMovement, amount, fecha } = body;

		console.log({ userId, typeMovement, amount, fecha });

		if (!userId || !typeMovement || !amount || !fecha) {
			return res.status(400).json({ message: "Missing required fields" });
		}

		try {
			const result = await movementService.createMovement({
				userId,
				typeMovement,
				amount,
				fecha,
			});
			res.status(201).json(result);
		} catch (error) {
			res.status(500).json({ message: "Error creating movement", error });
		}
	},
};
