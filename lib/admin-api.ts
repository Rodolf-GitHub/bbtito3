import { getToken } from "./auth"
import type { Producto, ProductoFormData } from "./types"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

function authHeaders(): HeadersInit {
  const token = getToken()
  return {
    Authorization: `Bearer ${token}`,
  }
}

export async function crearProducto(data: ProductoFormData, imagen?: File): Promise<Producto> {
  const formData = new FormData()
  formData.append("data", JSON.stringify(data))
  if (imagen) {
    formData.append("imagen", imagen)
  }

  const res = await fetch(`${API_BASE}/api/productos/crear`, {
    method: "POST",
    headers: authHeaders(),
    body: formData,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.detail || "Error al crear producto")
  }

  return res.json()
}

export async function actualizarProducto(
  id: number,
  data: ProductoFormData,
  imagen?: File
): Promise<Producto> {
  const formData = new FormData()
  formData.append("data", JSON.stringify(data))
  if (imagen) {
    formData.append("imagen", imagen)
  }

  const res = await fetch(`${API_BASE}/api/productos/actualizar/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: formData,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.detail || "Error al actualizar producto")
  }

  return res.json()
}

export async function eliminarProducto(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/productos/eliminar/${id}`, {
    method: "DELETE",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.detail || "Error al eliminar producto")
  }
}
