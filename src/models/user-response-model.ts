import { UserModel } from "./user-model";

export interface Meta {
	total: number;
	page: number;
	perPage: number;
	totalPages: number;
}

export interface UserResponse {
	data: UserModel[];
	meta: Meta;
}
