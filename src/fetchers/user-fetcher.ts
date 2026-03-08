import { UserResponse } from "@/models/user-response-model";

interface FetchUsersParams {
	page: number;
	perPage: number;
	name?: string;
	roleId: number;
	userId?: string;
}

export const fetchUsers = async ({
	page,
	perPage,
	name,
	roleId,
	userId,
}: FetchUsersParams): Promise<UserResponse> => {
	const params = new URLSearchParams();
	params.set("page", String(page));
	params.set("perPage", String(perPage));
	params.set("roleId", String(roleId));

	if (name) params.set("name", String(name));
	if (userId) params.set("userId", String(userId));

	const res = await fetch(`/api/user?${params.toString()}`);
	if (!res.ok) throw new Error("Error fetching users");
	return res.json();
};
