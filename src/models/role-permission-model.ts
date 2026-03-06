import { PermissionModel } from "./permission-model";
import { RoleModel } from "./role-model";

export interface RolePermissionModel {
	id: number;
	role: RoleModel;
	permission: PermissionModel;
}
