import { MovementModel } from "./movement-model";

export interface Meta {
	total: number;
	page: number;
	perPage: number;
	totalPages: number;
}

export interface MovementResponse {
	data: MovementModel[];
	meta: Meta;
}
