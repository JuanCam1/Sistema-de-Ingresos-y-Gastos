import { fetchMovement } from "@/fetchers/movement-fetcher";
import { MovementResponse } from "@/models/movement-response-model";
import { useQuery } from "@tanstack/react-query";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import { useMemo, useState } from "react";



export function useMovementTable() {
     const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const page = pagination.pageIndex + 1;
  const perPage = pagination.pageSize;

  const idFilter = useMemo(() => {
    return (columnFilters.find((c) => c.id === "idUser")?.value as string) ?? "";
  }, [columnFilters]);

  const typeMovementFilter = useMemo(() => {
    return (columnFilters.find((c) => c.id === "typeMovement")?.value as string) ?? "";
  }, [columnFilters]);

  const query = useQuery<MovementResponse>({
    queryKey: ["mvements", { page, perPage, idUser: idFilter, typeMovement: typeMovementFilter }],
    queryFn: () =>
      fetchMovement({
        page,
        perPage,
        idUser: idFilter,
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