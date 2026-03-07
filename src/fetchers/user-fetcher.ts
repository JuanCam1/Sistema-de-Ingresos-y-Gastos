import { UserResponse } from "@/models/user-response-model";

interface FetchUsersParams {
	page: number;
	perPage: number;
	name?: string;
}

export const fetchUsers = async ({
	page,
	perPage,
	name,
}: FetchUsersParams): Promise<UserResponse> => {
	const params = new URLSearchParams();
	params.set("page", String(page));
	params.set("perPage", String(perPage));

	if (name) params.set("name", String(name));

	const res = await fetch(`/api/user?${params.toString()}`);
	if (!res.ok) throw new Error("Error fetching users");
	return res.json();
};
