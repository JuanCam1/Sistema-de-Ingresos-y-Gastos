"use client"

import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from './ui/input'
import { Button } from './ui/button'

type Movimiento = {
  id: number
  concepto: string
  monto: number
  fecha: string
  nombreUsuario: string
}

async function fetchMovimientos({ page, perPage, concepto, nombreUsuario }: any) {
  const params = new URLSearchParams()
  if (page) params.set('page', String(page))
  if (perPage) params.set('perPage', String(perPage))
  if (concepto) params.set('concepto', String(concepto))
  if (nombreUsuario) params.set('nombreUsuario', String(nombreUsuario))

  const res = await fetch(`/api/movimientos?${params.toString()}`)
  if (!res.ok) throw new Error('Error fetching movimientos')
  return res.json()
}

export function MovimientosTable() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(5)
  const [concepto, setConcepto] = useState('')
  const [nombreUsuario, setNombreUsuario] = useState('')

  const queryKey = useMemo(() => ['movimientos', { page, perPage, concepto, nombreUsuario }], [page, perPage, concepto, nombreUsuario])

  const { data, isLoading, error } = useQuery(queryKey, () => fetchMovimientos({ page, perPage, concepto, nombreUsuario }), { keepPreviousData: true })

  const movimientos: Movimiento[] = data?.data ?? []
  const meta = data?.meta ?? { total: 0, totalPages: 1 }

  return (
    <div className="container mx-auto py-6">
      <div className="flex gap-2 mb-4">
        <Input placeholder="Filtrar por concepto" value={concepto} onChange={(e) => setConcepto(e.target.value)} />
        <Input placeholder="Filtrar por usuario" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} />
        <Button onClick={() => setPage(1)}>Buscar</Button>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Concepto</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Usuario</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">Cargando...</TableCell>
              </TableRow>
            ) : movimientos.length ? (
              movimientos.map((m) => (
                <TableRow key={String(m.id)}>
                  <TableCell>{m.concepto}</TableCell>
                  <TableCell>{m.monto}</TableCell>
                  <TableCell>{new Date(m.fecha).toLocaleDateString()}</TableCell>
                  <TableCell>{m.nombreUsuario}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">No hay resultados</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>Previous</Button>
        <div className="flex items-center gap-2">
          <div>Página {page} / {meta.totalPages}</div>
          <select value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1) }} className="border rounded px-2 py-1">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))} disabled={page >= meta.totalPages}>Next</Button>
      </div>

      {error && <div className="text-red-600">Error cargando movimientos</div>}
    </div>
  )
}
