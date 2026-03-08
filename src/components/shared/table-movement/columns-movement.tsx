"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeaderMovement } from "./data-table-column-header-movement";
import { MovementModel } from "@/models/movement-model";
import { formatDate } from "@/utils/format-date";
import { Button } from "@/components/ui/button";
import { SquarePlus } from "lucide-react";

export const columnsMovement: ColumnDef<MovementModel>[] = [
	{
		accessorFn: (row) => row.type.name,
		id: "type",
		header: ({ column }) => (
			<DataTableColumnHeaderMovement column={column} title="Concepto" />
		),
	},
	{
		accessorKey: "monto",
		header: ({ column }) => (
			<DataTableColumnHeaderMovement column={column} title="Monto" />
		),
	},
	{
		accessorKey: "fecha",
		header: ({ column }) => (
			<DataTableColumnHeaderMovement column={column} title="Fecha" />
		),
		cell: ({ row }) => {
			const fecha = row.original.fecha;
			return formatDate(String(fecha));
		},
	},
	{
		accessorFn: (row) => row.user.name,
		id: "user",
		header: "Usuario",
	},
	{
		id: "actions",
		header: "Nuevo",
		cell: ({ row }) => {
			const movemente = row.original as MovementModel;
			return (
				<div className="flex items-center justify-center ">
					<Button
						variant="outline"
						size="lg"
						onClick={() => console.log(movemente)}
						className="group w-8 h-8 flex items-center justify-center	rounded-sm cursor-pointer bg-blue-500 dark:bg-blue-500 transition-colors duration-200 hover:bg-blue-600 dark:hover:bg-teal-800 border-none p-0"
					>
						<SquarePlus className="text-white size-5 transition-transform duration-300 ease-out" />
					</Button>
				</div>
			);
		},
	},
];
