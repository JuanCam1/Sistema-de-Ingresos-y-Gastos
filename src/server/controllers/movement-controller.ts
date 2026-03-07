import { NextApiRequest, NextApiResponse } from "next";
import { movementService } from "../services/movement-service";


export const movementController = {

    async getMovements(req: NextApiRequest, res: NextApiResponse) {
        const filters = {
            id: req.query.id as string,
            typeMovement: req.query.typeMovement as string
        }

        const result = await movementService.getMovements(filters);
        res.status(200).json(result);
    }
}