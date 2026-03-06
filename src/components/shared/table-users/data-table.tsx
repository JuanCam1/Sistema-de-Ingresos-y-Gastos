"use client"

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
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import { useState, useMemo } from "react"
import { Input } from "./ui/input"
import { useQuery } from "@tanstack/react-query"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
}

export interface Movimiento {
  id: number
  concepto: string
  nombreUsuario: string
  monto: number
  fecha: string
  createdAt: string
}

export interface Meta {
  total: number
  page: number
  perPage: number
  totalPages: number
}

export interface MovimientosResponse {
  data: Movimiento[]
  meta: Meta
}

const fetchMovimientos = async ({ page, perPage, concepto, nombreUsuario }: any): Promise<MovimientosResponse> => {
  const params = new URLSearchParams()
  params.set('page', String(page))
  params.set('perPage', String(perPage))
  if (concepto) params.set('concepto', String(concepto))
  if (nombreUsuario) params.set('nombreUsuario', String(nombreUsuario))

  const res = await fetch(`/api/movimientos?${params.toString()}`)
  if (!res.ok) throw new Error('Error fetching movimientos')
  return res.json()
}

export function DataTable<TData, TValue>({ columns }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 })

  const page = pagination.pageIndex + 1
  const perPage = pagination.pageSize

  const conceptoFilter = useMemo(() => {
    return (columnFilters.find((c) => c.id === 'concepto')?.value as string) ?? ''
  }, [columnFilters])

  const usuarioFilter = useMemo(() => {
    return (columnFilters.find((c) => c.id === 'nombreUsuario')?.value as string) ?? ''
  }, [columnFilters])

  const { data, isLoading, error } = useQuery<MovimientosResponse>({
    queryKey: [
      'movimientos',
      { page, perPage, concepto: conceptoFilter, nombreUsuario: usuarioFilter },
    ],
    queryFn: () =>
      fetchMovimientos({
        page,
        perPage,
        concepto: conceptoFilter,
        nombreUsuario: usuarioFilter,
      }),
    placeholderData: (previousData) => previousData,
  })


  const movimientos = data?.data ?? []

  const meta = data?.meta ?? {
    total: 0,
    page: 1,
    perPage: 5,
    totalPages: 1,
  }

  const table = useReactTable({
    data: movimientos as TData[],
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
  })

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por concepto..."
          value={(table.getColumn('concepto')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('concepto')?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <Input
          placeholder="Filtrar por usuario..."
          value={(table.getColumn('nombreUsuario')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('nombreUsuario')?.setFilterValue(event.target.value)}
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
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length as number} className="h-24 text-center">Cargando...</TableCell>
              </TableRow>
            ) : movimientos.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length as number} className="h-24 text-center">No results.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
        <div className="flex items-center gap-2">
          <div>Page {meta.page} / {meta.totalPages}</div>
          <select value={perPage} onChange={(e) => { table.setPageSize(Number(e.target.value)); setTimeout(() => table.setPageIndex(0), 0) }} className="border rounded px-2 py-1">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
      </div>

      {error && <div className="text-red-600">Error cargando datos</div>}
    </div>
  )
}