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

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useUsersTable } from "@/hooks/use-user-table";
import { Loading } from "../loading";
import { Pagination } from "../pagination";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
}

export function DataTableUser<TData, TValue>({
	columns,
}: DataTableProps<TData, TValue>) {
	const {
		users,
		meta,
		query,
		sorting,
		setSorting,
		columnFilters,
		setColumnFilters,
		pagination,
		setPagination,
	} = useUsersTable();

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

	const isLoading = query.isLoading;
	const error = query.error;

	const rows = table.getRowModel().rows;
	const pageSize = pagination.pageSize;
	const emptyRows = pageSize - rows.length;

	return (
		<div className="w-full max-w-[1000px]">
			<div className="flex items-center justify-between py-4">
				<Input
					placeholder="Buscar por nombre..."
					className="w-[320px]"
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("name")?.setFilterValue(event.target.value)
					}
				/>
			</div>

			<div className="overflow-hidden rounded-md border border-gray-200 min-h-[542px]">
				<Table className="w-full">
					<TableHeader className="bg-primary text-white">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
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
								))}
							</TableRow>
						))}
					</TableHeader>

					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-[480px] text-center"
								>
									<Loading />
								</TableCell>
							</TableRow>
						) : users.length ? (
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
										<Alert className="max-w-md">
											<CheckCircle2Icon />
											<AlertTitle>No se encontraron usuarios</AlertTitle>
											<AlertDescription>
												No hay usuarios que coincidan con los criterios de
												búsqueda.
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

			{error && (
				<Alert variant="destructive" className="max-w-md">
					<AlertCircleIcon />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						Ha ocurrido un error al cargar los usuarios. Por favor, inténtalo de
						nuevo más tarde.
					</AlertDescription>
				</Alert>
			)}
		</div>
	);
}
