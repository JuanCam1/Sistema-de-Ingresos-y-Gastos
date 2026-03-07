"use client";

import { ColumnDef } from "@tanstack/react-table";
import { BanknoteArrowUp, FileChartPie, PencilLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTableColumnHeaderUser } from "./data-table-column-header-user";
import { UserModel } from "@/models/user-model";

export const columnsUser: ColumnDef<UserModel>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeaderUser column={column} title="Nombre" />
		),
	},
	{
		accessorKey: "email",
		header: "Correo",
	},
	{
		accessorKey: "telephone",
		header: "Teléfono",
	},

	{
		id: "movement",
		header: "Movimientos",
		cell: ({ row }) => {
			const user = row.original as UserModel;
			return (
				<div className="flex items-center justify-center">
					<Button onClick={() => console.log(user)} className="cursor-pointer">
						<BanknoteArrowUp />
					</Button>
				</div>
			);
		},
	},
	{
		id: "report",
		header: "Reporte",
		cell: ({ row }) => {
			const user = row.original as UserModel;
			return (
				<div className="flex items-center justify-center">
					<Button onClick={() => console.log(user)} className="cursor-pointer">
						<FileChartPie />
					</Button>
				</div>
			);
		},
	},
	{
		id: "actions",
		header: "Acción",
		cell: ({ row }) => {
			const user = row.original as UserModel;
			return (
				<div className="flex items-center justify-center">
					<Button onClick={() => console.log(user)} className="cursor-pointer">
						<PencilLine />
					</Button>
				</div>
			);
		},
	},
];
