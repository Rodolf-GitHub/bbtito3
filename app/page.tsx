"use client"

import { useState, useCallback } from "react"
import useSWR from "swr"
import { API_ENDPOINTS, fetchProductos } from "@/lib/api"
import type { PagedProductos, Producto } from "@/lib/types"
import { HeroHeader } from "@/components/hero-header"
import { ProductCard } from "@/components/product-card"
import { ContactSection } from "@/components/contact-section"
import { SiteFooter } from "@/components/site-footer"
import { ImageLightbox } from "@/components/image-lightbox"
import {
  WhatsappSelector,
  WhatsappFab,
} from "@/components/whatsapp-selector"
import {
  Sparkles,
  Loader2,
  ShoppingBag,
  Tag,
  Heart,
  User,
  Clock,
  ArrowDownNarrowWide,
  Search,
} from "lucide-react"

const FILTERS = [
  { key: "todos", label: "Todos", icon: ShoppingBag, endpoint: API_ENDPOINTS.listarTodos },
  { key: "ofertas", label: "Ofertas", icon: Tag, endpoint: API_ENDPOINTS.listarOfertas },
  { key: "mujer", label: "Mujer", icon: Heart, endpoint: API_ENDPOINTS.listarMujer },
  { key: "hombre", label: "Hombre", icon: User, endpoint: API_ENDPOINTS.listarHombre },
  { key: "recientes", label: "Recientes", icon: Clock, endpoint: API_ENDPOINTS.loMasActualizado },
  { key: "baratos", label: "Mas baratos", icon: ArrowDownNarrowWide, endpoint: API_ENDPOINTS.loMasBarato },
] as const

type FilterKey = (typeof FILTERS)[number]["key"]

const fetcher = (url: string) => fetchProductos(url)

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("todos")
  const [searchQuery, setSearchQuery] = useState("")
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const [whatsappOpen, setWhatsappOpen] = useState(false)
  const [productoConsulta, setProductoConsulta] = useState<Producto | undefined>()

  const currentFilter = FILTERS.find((f) => f.key === activeFilter)!
  const endpoint = searchQuery
    ? `${currentFilter.endpoint}?busqueda=${encodeURIComponent(searchQuery)}`
    : currentFilter.endpoint

  const { data, isLoading, error } = useSWR<PagedProductos>(endpoint, fetcher)

  // Fetch totals for hero stats
  const { data: mujerData } = useSWR<PagedProductos>(API_ENDPOINTS.listarMujer, fetcher)
  const { data: hombreData } = useSWR<PagedProductos>(API_ENDPOINTS.listarHombre, fetcher)

  const productos = data?.items ?? []

  const openLightbox = useCallback((src: string, alt: string) => {
    setLightbox({ src, alt })
  }, [])

  const closeLightbox = useCallback(() => {
    setLightbox(null)
  }, [])

  const openWhatsapp = useCallback((producto?: Producto) => {
    setProductoConsulta(producto)
    setWhatsappOpen(true)
  }, [])

  const closeWhatsapp = useCallback(() => {
    setWhatsappOpen(false)
    setProductoConsulta(undefined)
  }, [])

  const handleConsultar = useCallback(
    (producto: Producto) => {
      openWhatsapp(producto)
    },
    [openWhatsapp]
  )

  return (
    <div className="min-h-screen bg-background text-foreground text-center">
      <HeroHeader
        destacados={productos}
        totalMujer={mujerData?.count ?? 0}
        totalHombre={hombreData?.count ?? 0}
        onWhatsappClick={() => openWhatsapp()}
        onImageClick={openLightbox}
      />

      {/* Single Catalog Section */}
      <section id="catalogo" className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card/50 p-6 sm:p-8 text-center">
          {/* Section header */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="text-center w-full">
              <div className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-widest text-primary">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={1.8} />
                <p>Catalogo</p>
              </div>
              <h2 className="font-display text-2xl text-foreground sm:text-3xl text-balance text-center">
                Nuestros productos
              </h2>
              <p className="mt-1.5 max-w-xl mx-auto text-sm text-muted-foreground leading-relaxed text-center">
                Explora nuestro catalogo completo. Usa los filtros para encontrar exactamente lo que buscas.
              </p>
            </div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground whitespace-nowrap">
              {data?.count ?? 0} productos
            </p>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 pl-11 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => {
              const Icon = filter.icon
              const isActive = activeFilter === filter.key
              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActiveFilter(filter.key)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "border border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {filter.label}
                </button>
              )
            })}
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-7 w-7 animate-spin text-primary" />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-2xl border border-destructive/10 bg-destructive/5 p-8 text-center">
              <p className="text-sm text-destructive">
                No se pudieron cargar los productos. Verifica que el servidor este activo.
              </p>
            </div>
          )}

          {/* Empty */}
          {!isLoading && !error && productos.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border p-8 text-center">
              <p className="text-sm text-muted-foreground">
                {searchQuery
                  ? `No se encontraron productos para "${searchQuery}"`
                  : "No hay productos disponibles con este filtro."}
              </p>
            </div>
          )}

          {/* Products Grid */}
          {!isLoading && !error && productos.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {productos.map((producto) => (
                <ProductCard
                  key={producto.id}
                  producto={producto}
                  onImageClick={openLightbox}
                  onConsultar={handleConsultar}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <ContactSection />
      <SiteFooter />

      <WhatsappFab onClick={() => openWhatsapp()} />
      <WhatsappSelector
        isOpen={whatsappOpen}
        onClose={closeWhatsapp}
        producto={productoConsulta}
      />
      {lightbox && (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={closeLightbox}
        />
      )}
    </div>
  )
}
