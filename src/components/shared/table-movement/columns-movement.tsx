"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeaderMovement } from "./data-table-column-header-movement";
import { MovementModel } from "@/models/movement-model";
import { formatDate } from "@/utils/format-date";

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
];
