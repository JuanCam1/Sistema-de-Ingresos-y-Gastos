import { NextApiRequest, NextApiResponse } from "next";
import { userService } from "../services/user-service";

export const userController = {
	async getUsers(req: NextApiRequest, res: NextApiResponse) {
		const filters = {
			name: req.query.name as string,
			page: parseInt((req.query.page as string) || "1", 10),
			perPage: parseInt((req.query.perPage as string) || "10", 10),
		};

		const result = await userService.getUsers(filters);
		res.status(200).json(result);
	},

	//   async createUser(req, res) {
	//     const user = await userService.createUser(req.body)
	//     res.status(201).json(user)
	//   },

	//   async getUser(req, res) {
	//     const { id } = req.query
	//     const user = await userService.getUser(id)
	//     res.json(user)
	//   },

	//   async updateUser(req, res) {
	//     const { id } = req.query
	//     const user = await userService.updateUser(id, req.body)
	//     res.json(user)
	//   },

	//   async deleteUser(req, res) {
	//     const { id } = req.query
	//     await userService.deleteUser(id)
	//     res.json({ message: "Usuario eliminado" })
	//   }
};
