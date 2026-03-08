import { useMemo, useState } from "react";
import {
	ColumnFiltersState,
	PaginationState,
	SortingState,
} from "@tanstack/react-table";
import { fetchMovement } from "@/fetchers/movement-fetcher";
import { MovementResponse } from "@/models/movement-response-model";
import { useQuery } from "@tanstack/react-query";

interface Props {
	userId: string;
}

/**
 * Hook para tabla de movimientos con paginacion, filtros y sorting.
 * @param params Parametros del hook.
 * @param params.userId ID del usuario para filtrar movimientos.
 * @returns Datos de movimientos, metadata, estado de tabla (sorting, filters, pagination) y setters.
 */
export function useMovementTable({ userId }: Props) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const page = pagination.pageIndex + 1;
	const perPage = pagination.pageSize;

	const typeMovementFilter = useMemo(() => {
		return (
			(columnFilters.find((c) => c.id === "typeMovement")?.value as string) ??
			""
		);
	}, [columnFilters]);

	const query = useQuery<MovementResponse>({
		queryKey: [
			"movements",
			{ page, perPage, idUser: userId, typeMovement: typeMovementFilter },
		],
		queryFn: () =>
			fetchMovement({
				page,
				perPage,
				userId: userId,
				typeMovement: typeMovementFilter,
			}),
		placeholderData: (prev) => prev,
	});

	const movements = query.data?.data ?? [];

	const meta = query.data?.meta ?? {
		total: 0,
		page: 1,
		perPage: 5,
		totalPages: 1,
	};

	return {
		movements,
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
