import { Lock } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
        <div>
          <p className="font-display text-lg text-foreground">BBTito</p>
          <p className="text-xs text-muted-foreground">
            Reventa de marcas seleccionadas, 2026
          </p>
        </div>
        <a
          href="/admin/login"
          className="flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-primary"
        >
          <Lock className="h-3 w-3" />
          Admin
        </a>
      </div>
    </footer>
  )
}
