"use client"

import { useRouter } from "next/navigation"
import { crearProducto } from "@/lib/admin-api"
import { ProductForm } from "@/components/admin/product-form"
import type { ProductoFormData } from "@/lib/types"

export default function NuevoProductoPage() {
  const router = useRouter()

  async function handleSubmit(data: ProductoFormData, imagen?: File) {
    await crearProducto(data, imagen)
    router.push("/admin")
  }

  return (
    <div className="mx-auto max-w-2xl flex flex-col gap-6 text-center">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Nuevo producto
        </h1>
        <p className="text-sm text-muted-foreground">
          Completa el formulario para agregar un producto al catalogo.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <ProductForm onSubmit={handleSubmit} submitLabel="Crear producto" />
      </div>
    </div>
  )
}
