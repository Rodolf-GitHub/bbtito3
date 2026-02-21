"use client"

import { useRouter, usePathname } from "next/navigation"
import { removeToken } from "@/lib/auth"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboard, Package, PlusCircle, Store, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Crear producto",
    href: "/admin/productos/nuevo",
    icon: PlusCircle,
  },
]

export function AdminSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  function handleLogout() {
    removeToken()
    router.push("/admin/login")
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
            <span className="font-display text-base font-bold text-primary">
              BB
            </span>
          </div>
          <div>
            <p className="font-display text-lg font-bold text-foreground leading-tight">
              BBTito
            </p>
            <p className="text-xs text-muted-foreground">Panel de admin</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Package className="mr-2 h-4 w-4" />
            Productos
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                  >
                    <a href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2 rounded-xl"
            asChild
          >
            <a href="/">
              <Store className="h-4 w-4" />
              Ver tienda
            </a>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 rounded-xl text-muted-foreground hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesion
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
