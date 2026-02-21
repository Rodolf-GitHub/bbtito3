"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import useSWR from "swr"
import { API_ENDPOINTS, fetchProductos } from "@/lib/api"
import { actualizarProducto } from "@/lib/admin-api"
import { ProductForm } from "@/components/admin/product-form"
import type { PagedProductos, ProductoFormData } from "@/lib/types"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const fetcher = (url: string) => fetchProductos(url)

export default function EditarProductoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()

  const { data, isLoading, error } = useSWR<PagedProductos>(
    API_ENDPOINTS.listarTodos,
    fetcher
  )

  const producto = data?.items.find((p) => String(p.id) === id)

  async function handleSubmit(formData: ProductoFormData, imagen?: File) {
    await actualizarProducto(Number(id), formData, imagen)
    router.push("/admin")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !producto) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center">
          <p className="text-sm text-destructive">
            {error
              ? "Error al cargar el producto."
              : "Producto no encontrado."}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4 rounded-xl"
            asChild
          >
            <a href="/admin">Volver al dashboard</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl flex flex-col gap-6 text-center">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Editar producto
        </h1>
        <p className="text-sm text-muted-foreground">
          Modifica los datos de{" "}
          <span className="font-medium text-foreground">{producto.nombre}</span>
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <ProductForm
          initialData={{
            nombre: producto.nombre,
            precio: producto.precio,
            para_mujer: producto.para_mujer,
            en_oferta: producto.en_oferta,
            imagenUrl: producto.imagen,
          }}
          onSubmit={handleSubmit}
          submitLabel="Guardar cambios"
          isEditing
        />
      </div>
    </div>
  )
}
