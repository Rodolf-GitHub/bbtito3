const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export const API_ENDPOINTS = {
  listarTodos: `${API_BASE}/api/productos/listar_todos`,
  listarOfertas: `${API_BASE}/api/productos/listar_ofertas`,
  listarMujer: `${API_BASE}/api/productos/listar_para_mujer`,
  listarHombre: `${API_BASE}/api/productos/listar_para_hombre`,
  loMasActualizado: `${API_BASE}/api/productos/lo_mas_actualizado`,
  loMasBarato: `${API_BASE}/api/productos/lo_mas_barato`,
} as const

export { API_BASE }

export function buildImageUrl(imagePath: string | null): string {
  if (!imagePath) return ""
  if (imagePath.startsWith("http")) return imagePath
  return `${API_BASE}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`
}

export async function fetchProductos(endpoint: string, busqueda?: string) {
  const url = new URL(endpoint)
  if (busqueda) url.searchParams.set("busqueda", busqueda)
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error("Error al cargar productos")
  return res.json()
}
