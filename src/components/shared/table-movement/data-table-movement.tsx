"use client";

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
	getSortedRowModel,
	getFilteredRowModel,
} from "@tanstack/react-table";
import { useMovementTable } from "@/hooks/use-movement-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	userId: string;
}

export function DataTableMovement<TData, TValue>({
	columns,
}: DataTableProps<TData, TValue>) {
	const {
		movements,
		meta,
		query,
		sorting,
		setSorting,
		columnFilters,
		setColumnFilters,
		pagination,
		setPagination,
	} = useMovementTable();

	const table = useReactTable({
		data: movements as TData[],
		columns,
		pageCount: meta.totalPages,

		state: {
			sorting,
			columnFilters,
			pagination,
		},

		manualPagination: true,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onPaginationChange: setPagination,

		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	});

	const isLoading = query.isLoading;
	const error = query.error;

	return (
		<div>
			<div className="flex items-center py-4">
				<Input
					placeholder="Filtrar por movimiento"
					value={(table.getColumn("type")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("type")?.setFilterValue(event.target.value)
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
						) : movements.length ? (
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
