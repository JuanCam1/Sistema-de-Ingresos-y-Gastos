import { RoleModel } from "./role-model";
import { StateModel } from "./state-model";

export interface UserModel {
	id: number;
	name: string;
	email: string;
	telephone: string;
	image: string;
	role: RoleModel;
	state: StateModel;
}
