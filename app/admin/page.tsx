"use client"

import { useState } from "react"
import useSWR from "swr"
import { API_ENDPOINTS, fetchProductos } from "@/lib/api"
import type { PagedProductos } from "@/lib/types"
import { ProductTable } from "@/components/admin/product-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle, Search, Package, Tag, Loader2 } from "lucide-react"

const fetcher = (url: string) => fetchProductos(url)

export default function AdminDashboardPage() {
  const [busqueda, setBusqueda] = useState("")
  const {
    data,
    isLoading,
    error,
    mutate,
  } = useSWR<PagedProductos>(API_ENDPOINTS.listarTodos, fetcher)

  const allProductos = data?.items ?? []
  const filtered = busqueda
    ? allProductos.filter((p) =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase())
      )
    : allProductos

  const totalOfertas = allProductos.filter((p) => p.en_oferta).length
  const totalMujer = allProductos.filter((p) => p.para_mujer).length
  const totalHombre = allProductos.filter((p) => !p.para_mujer).length

  return (
    <div className="mx-auto max-w-5xl flex flex-col gap-6 text-center">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Productos
        </h1>
        <p className="text-sm text-muted-foreground">
          Gestiona tu catalogo de productos desde aqui.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          label="Total"
          value={data?.count ?? 0}
          icon={<Package className="h-4 w-4" />}
        />
        <StatCard
          label="Ofertas"
          value={totalOfertas}
          icon={<Tag className="h-4 w-4" />}
        />
        <StatCard
          label="Mujer"
          value={totalMujer}
          icon={<span className="text-xs font-bold">F</span>}
        />
        <StatCard
          label="Hombre"
          value={totalHombre}
          icon={<span className="text-xs font-bold">M</span>}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="h-10 rounded-xl pl-9"
          />
        </div>
        <Button asChild className="h-10 rounded-xl gap-2">
          <a href="/admin/productos/nuevo">
            <PlusCircle className="h-4 w-4" />
            Nuevo producto
          </a>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center">
          <p className="text-sm text-destructive">
            No se pudieron cargar los productos. Verifica que el servidor este activo.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4 rounded-xl"
            onClick={() => mutate()}
          >
            Reintentar
          </Button>
        </div>
      ) : (
        <ProductTable
          productos={filtered}
          onDeleted={() => mutate()}
        />
      )}
    </div>
  )
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string
  value: number
  icon: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-primary">
        {icon}
      </div>
      <div>
        <p className="text-lg font-bold text-foreground leading-tight">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}
