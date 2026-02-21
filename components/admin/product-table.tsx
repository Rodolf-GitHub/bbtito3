"use client"

import { useState } from "react"
import { buildImageUrl } from "@/lib/api"
import { eliminarProducto } from "@/lib/admin-api"
import type { Producto } from "@/lib/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, ImageIcon } from "lucide-react"
import { DeleteDialog } from "./delete-dialog"

type ProductTableProps = {
  productos: Producto[]
  onDeleted: () => void
}

export function ProductTable({ productos, onDeleted }: ProductTableProps) {
  const [deleteTarget, setDeleteTarget] = useState<Producto | null>(null)
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    if (!deleteTarget?.id) return
    setDeleting(true)
    try {
      await eliminarProducto(deleteTarget.id)
      setDeleteTarget(null)
      onDeleted()
    } catch {
      // keep dialog open on error
    } finally {
      setDeleting(false)
    }
  }

  if (productos.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-secondary/30 p-12 text-center">
        <ImageIcon className="h-10 w-10 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          No hay productos todavia. Crea el primero.
        </p>
        <Button asChild size="sm" className="rounded-xl">
          <a href="/admin/productos/nuevo">Crear producto</a>
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/40 hover:bg-secondary/40">
              <TableHead className="w-14 text-center">ID</TableHead>
              <TableHead className="w-16">Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="w-24 text-right">Precio</TableHead>
              <TableHead className="w-24 text-center">Genero</TableHead>
              <TableHead className="w-24 text-center">Oferta</TableHead>
              <TableHead className="w-28 text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productos.map((p) => {
              const imgSrc = buildImageUrl(p.imagen)
              return (
                <TableRow key={p.id} className="group">
                  <TableCell className="text-center">
                    <span className="text-xs font-mono text-muted-foreground">#{p.id}</span>
                  </TableCell>
                  <TableCell>
                    {imgSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={imgSrc}
                        alt={p.nombre}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                        <ImageIcon className="h-4 w-4" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{p.nombre}</TableCell>
                  <TableCell className="text-right font-semibold text-primary">
                    ${p.precio}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="secondary"
                      className="rounded-full text-xs"
                    >
                      {p.para_mujer ? "Mujer" : "Hombre"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {p.en_oferta ? (
                      <Badge className="rounded-full bg-primary/10 text-xs text-primary hover:bg-primary/10">
                        Oferta
                      </Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">--</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg"
                        asChild
                      >
                        <a href={`/admin/productos/${p.id}/editar`}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar {p.nombre}</span>
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive"
                        onClick={() => setDeleteTarget(p)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Eliminar {p.nombre}</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <DeleteDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        productName={deleteTarget?.nombre ?? ""}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </>
  )
}
