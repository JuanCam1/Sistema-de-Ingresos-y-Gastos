"use client";

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
	SortingState,
	getSortedRowModel,
	ColumnFiltersState,
	getFilteredRowModel,
	PaginationState,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { UserResponse } from "@/models/user-response-model";
import { fetchUsers } from "@/services/user-services";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
}

export function DataTableUser<TData, TValue>({
	columns,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 5,
	});

	const page = pagination.pageIndex + 1;
	const perPage = pagination.pageSize;

	const nameFilter = useMemo(() => {
		return (columnFilters.find((c) => c.id === "name")?.value as string) ?? "";
	}, [columnFilters]);

	const emailFilter = useMemo(() => {
		return (columnFilters.find((c) => c.id === "email")?.value as string) ?? "";
	}, [columnFilters]);

	const { data, isLoading, error } = useQuery<UserResponse>({
		queryKey: [
			"users",
			{ page, perPage, name: nameFilter, email: emailFilter },
		],
		queryFn: () =>
			fetchUsers({
				page,
				perPage,
				name: nameFilter,
				email: emailFilter,
			}),
		placeholderData: (previousData) => previousData,
	});

	const users = data?.data ?? [];

	const meta = data?.meta ?? {
		total: 0,
		page: 1,
		perPage: 5,
		totalPages: 1,
	};

	const table = useReactTable({
		data: users as TData[],
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		manualPagination: true,
		pageCount: meta.totalPages,
		onPaginationChange: setPagination,
		state: {
			sorting,
			columnFilters,
			pagination,
		},
	});

	return (
		<div>
			<div className="flex items-center py-4">
				<Input
					placeholder="Filtrar por concepto..."
					value={
						(table.getColumn("concepto")?.getFilterValue() as string) ?? ""
					}
					onChange={(event) =>
						table.getColumn("concepto")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<Input
					placeholder="Filtrar por usuario..."
					value={
						(table.getColumn("nombreUsuario")?.getFilterValue() as string) ?? ""
					}
					onChange={(event) =>
						table.getColumn("nombreUsuario")?.setFilterValue(event.target.value)
					}
					className="max-w-sm ml-2"
				/>
			</div>
			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell
									colSpan={columns.length as number}
									className="h-24 text-center"
								>
									Cargando...
								</TableCell>
							</TableRow>
						) : users.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length as number}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<div className="flex items-center gap-2">
					<div>
						Page {meta.page} / {meta.totalPages}
					</div>
					<select
						value={perPage}
						onChange={(e) => {
							table.setPageSize(Number(e.target.value));
							setTimeout(() => table.setPageIndex(0), 0);
						}}
						className="border rounded px-2 py-1"
					>
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={20}>20</option>
					</select>
				</div>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>

			{error && <div className="text-red-600">Error cargando datos</div>}
		</div>
	);
}
