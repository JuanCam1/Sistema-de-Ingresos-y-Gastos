"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
	SortingState,
	ColumnFiltersState,
	PaginationState,
} from "@tanstack/react-table";

import { fetchUsers } from "@/fetchers/user-fetcher";
import { UserResponse } from "@/models/user-response-model";

export function useUsersTable() {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const page = pagination.pageIndex + 1;
	const perPage = pagination.pageSize;

	const nameFilter = useMemo(() => {
		return (columnFilters.find((c) => c.id === "name")?.value as string) ?? "";
	}, [columnFilters]);

	const query = useQuery<UserResponse>({
		queryKey: ["users", { page, perPage, name: nameFilter }],
		queryFn: () =>
			fetchUsers({
				page,
				perPage,
				name: nameFilter,
				roleId: 2,
			}),
		placeholderData: (prev) => prev,
	});

	const users = query.data?.data ?? [];

	const meta = query.data?.meta ?? {
		total: 0,
		page: 1,
		perPage: 5,
		totalPages: 1,
	};

	return {
		users,
		meta,
		query,
		perPage,

		sorting,
		setSorting,

		columnFilters,
		setColumnFilters,

		pagination,
		setPagination,
	};
}
