import { NextApiRequest, NextApiResponse } from "next";
import { userService } from "../services/user-service";
import { UserFilters } from "../types/user-filter-type";

export const userController = {
	async getUsers(req: NextApiRequest, res: NextApiResponse) {
		const filters: UserFilters = {
			name: req.query.name as string,
			page: parseInt((req.query.page as string) || "1", 10),
			perPage: parseInt((req.query.perPage as string) || "10", 10),
		};

		if (req.query.roleId == "1") {
			if (!req.query.userId) {
				res.status(400).json({ message: "Missing userId query parameter" });
			}
			filters.userId = req.query.userId as string;
		}

		console.log(filters);

		try {
			const result = await userService.getUsers(filters);
			res.status(200).json(result);
		} catch (error) {
			res.status(500).json({ message: "Error creating movement", error });
		}
	},
};
