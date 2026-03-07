"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeaderMovement } from "./data-table-column-header-movement";
import { MovementModel } from "@/models/movement-model";

export const columnsMovement: ColumnDef<MovementModel>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeaderMovement column={column} title="ID" />
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
			console.log(row)
			return new Date(fecha).toLocaleDateString("es-CO");
		},
	},
	{
		accessorFn: (row) => row.type.name,
		id: "type",
		header: ({ column }) => (
			<DataTableColumnHeaderMovement column={column} title="Tipo Movimiento" />
		),
	}
];