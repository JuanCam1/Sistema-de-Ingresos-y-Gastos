import { RoleModel } from "./role-model";
import { StateModel } from "./state-model";

export interface UserModel {
	id: string;
	name: string;
	email: string;
	telephone: string;
	image: string;
	role: RoleModel;
	state: StateModel;
}

export interface UserUpdateModel {
	id: string;
	name: string;
	roleId: string;
}
