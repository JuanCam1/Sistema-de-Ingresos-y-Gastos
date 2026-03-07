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
		id: "actions",
		header: "Editar",
		cell: ({ row }) => {
			const user = row.original as UserModel;
			return (
				<div className="flex items-center justify-center ">
					<Button
						variant="outline"
						size="lg"
						onClick={() => console.log(user)}
						className="group size-10 flex items-center justify-center	rounded-sm cursor-pointer bg-teal-500 dark:bg-teal-600 transition-colors duration-200 hover:bg-teal-600 dark:hover:bg-teal-800 border-none"
					>
						<PencilLine className="text-white size-5 transition-transform duration-200	group-hover:-translate-y-1" />
					</Button>
				</div>
			);
		},
	},
];
