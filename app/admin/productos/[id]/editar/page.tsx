// Para exportación estática, Next.js requiere esta función
export async function generateStaticParams() {
  // Obtener los IDs reales desde el backend
  const res = await fetch("https://api.bbtito.com/api/productos/listar_todos");
  if (!res.ok) return [];
  const data = await res.json();
  return (data.items || []).map((producto: { id: number }) => ({ id: String(producto.id) }));
}
import { ProductForm } from "@/components/admin/product-form"

export default async function EditarProductoPage({ params }: { params: { id: string } }) {
  // Aquí deberías obtener el producto por ID de forma estática
  // Ejemplo de producto estático:
  const producto = {
    nombre: "Producto ejemplo",
    precio: "100",
    para_mujer: true,
    en_oferta: false,
    imagen: null,
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
          submitLabel="Guardar cambios"
          isEditing
        />
      </div>
    </div>
  )
}
