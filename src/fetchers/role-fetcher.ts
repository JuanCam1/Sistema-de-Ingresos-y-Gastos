import { RoleModel } from "@/models/role-model";

export const fetchRoles = async (): Promise<RoleModel[]> => {
	const res = await fetch(`/api/role`);
	if (!res.ok) throw new Error("Error fetching roles");
	const { roles } = await res.json();
	return roles;
};

export const fetchRoleByIdUser = async (userId: string): Promise<RoleModel> => {
	const res = await fetch(`/api/role/user/${userId}`);
	if (!res.ok) throw new Error("Error fetching user role");
	const { role } = await res.json();
	return role;
};
