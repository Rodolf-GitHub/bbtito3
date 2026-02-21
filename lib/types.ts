export type Producto = {
  id: number | null
  created_at: string
  updated_at: string
  nombre: string
  precio: string
  para_mujer: boolean
  imagen: string | null
  en_oferta: boolean
}

export type PagedProductos = {
  items: Producto[]
  count: number
}

export type LoginResponse = {
  token: string
}

export type ProductoFormData = {
  nombre: string
  precio: string
  para_mujer: boolean
  en_oferta: boolean
}
