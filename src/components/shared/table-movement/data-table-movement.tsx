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
import { Input } from "@/components/ui/input";
import { Loading } from "../loading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Pagination } from "../pagination";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	userId: string;
}

export function DataTableMovement<TData, TValue>({
	columns,
	userId,
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
	} = useMovementTable({ userId });

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

	const rows = table.getRowModel().rows;
	const pageSize = pagination.pageSize;
	const emptyRows = pageSize - rows.length;
	console.log(emptyRows);

	return (
		<div className="w-full max-w-[1000px]">
			<div className="flex items-center justify-between py-4">
				<Input
					placeholder="Buscar por movimiento"
					value={(table.getColumn("type")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("type")?.setFilterValue(event.target.value)
					}
					className="max-w-sm ml-2"
				/>
			</div>
			<div className="overflow-hidden rounded-md border border-gray-200 min-h-[425px]">
				<Table className="w-full">
					<TableHeader className="bg-primary text-white">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											key={header.id}
											className="px-8 py-2 text-md font-semibold text-white"
										>
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
									className="h-[350px] text-center"
								>
									<Loading />
								</TableCell>
							</TableRow>
						) : movements.length ? (
							<>
								{rows.map((row) => (
									<TableRow
										key={row.id}
										className="border-b transition-colors bg-gray-50 dark:text-white dark:bg-zinc-700 hover:bg-[#e0e7ff] dark:hover:bg-zinc-800"
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id} className="px-8 text-md">
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										))}
									</TableRow>
								))}

								{Array.from({ length: emptyRows }).map((_, i) => (
									<TableRow key={`empty-${i}`} className="h-[50px]">
										<TableCell colSpan={columns.length}></TableCell>
									</TableRow>
								))}
							</>
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-[440px] text-center"
								>
									<div className="flex flex-col items-center justify-center gap-4">
										<Alert className="max-w-md py-4">
											<AlertTitle className="font-bold">
												No se encontraron movimientos
											</AlertTitle>
											<AlertDescription>
												No hay movimientos de este usuario.
											</AlertDescription>
										</Alert>
									</div>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<Pagination
				page={meta.page}
				totalPages={meta.totalPages}
				previousPage={() => table.previousPage()}
				nextPage={() => table.nextPage()}
				getCanPreviousPage={() => table.getCanPreviousPage()}
				getCanNextPage={() => table.getCanNextPage()}
			/>

			{error && <div className="text-red-600">Error cargando datos</div>}
		</div>
	);
}
