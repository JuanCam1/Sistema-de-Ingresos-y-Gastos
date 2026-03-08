export interface UserFilters {
	name?: string;
	page?: number;
	perPage?: number;
	userId?: string;
}

export interface UserMeta {
	total: number;
	page: number;
	perPage: number;
	totalPages: number;
}

export interface UserResponse<T> {
	data: T[];
	meta: UserMeta;
}
