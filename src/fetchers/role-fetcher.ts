import { RoleModel } from "@/models/role-model";

export const fetchRoles = async (): Promise<RoleModel[]> => {
	const res = await fetch(`/api/role`);
	if (!res.ok) throw new Error("Error fetching roles");
	const { roles } = await res.json();
	return roles;
};
