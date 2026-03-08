import { TypeMovementModel } from "./type-movement-model";
import { UserModel } from "./user-model";

type UserType = Omit<UserModel, "email" | "telephone" | "role" | "state">;

export interface MovementModel {
	id: number;
	monto: number;
	fecha: Date;
	type: TypeMovementModel;
	user: UserType;
}

export interface CreateMovementModel {
	userId: string;
	typeMovement: string;
	amount: string;
	fecha: string;
}
