"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "./data-table-column-header"

export type Movimiento = {
  id: number
  concepto: string
  monto: number
  fecha: string
  nombreUsuario: string
}

export const columns: ColumnDef<Movimiento>[] = [
  {
    accessorKey: "concepto",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Concepto" />,
  },
  {
    accessorKey: "monto",
    header: () => <div className="text-right">Monto</div>,
    cell: ({ row }) => {
      const amount = parseFloat(String(row.getValue("monto")))
      const formatted = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(amount)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "fecha",
    header: "Fecha",
    cell: ({ row }) => <div>{new Date(String(row.getValue("fecha"))).toLocaleDateString()}</div>,
  },
  {
    accessorKey: "nombreUsuario",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Usuario" />,
  },
  {
    id: "actions",
    header: "Acción",
    cell: ({ row }) => {
      const movimiento = row.original as Movimiento
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(String(movimiento.id))}>
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Ver detalles</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]