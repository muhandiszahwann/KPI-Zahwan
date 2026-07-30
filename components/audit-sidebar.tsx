"use client"

import {
  ShieldCheck,
  LayoutDashboard,
  ClipboardList,
  FolderKanban,
  BarChart3,
  Settings2,
  LifeBuoy,
} from "lucide-react"

export type NavView = "overview" | "jadwal" | "luar" | "config"

const NAV: { icon: typeof LayoutDashboard; label: string; view: NavView }[] = [
  { icon: LayoutDashboard, label: "Ringkasan Eksekutif", view: "overview" },
  { icon: ClipboardList, label: "Jadwal Audit", view: "jadwal" },
  { icon: FolderKanban, label: "Penugasan Ad-hoc", view: "luar" },
  { icon: BarChart3, label: "Analitik KPI", view: "overview" },
  { icon: Settings2, label: "Konfigurasi", view: "config" },
]

export function AuditSidebar({
  active,
  onNavigate,
}: {
  active: string
  onNavigate: (label: string, view: NavView) => void
}) {
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div className="leading-tight">
          <p className="font-serif text-base font-semibold tracking-tight">
            Audit Intelligence
          </p>
          <p className="text-[11px] uppercase tracking-widest text-sidebar-primary">
            Performance Hub
          </p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/50">
          Navigasi
        </p>
        <ul className="space-y-1">
          {NAV.map((item) => {
            const isActive = active === item.label
            return (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => onNavigate(item.label, item.view)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground shadow-[inset_0_0_0_1px_var(--sidebar-border)] ring-1 ring-sidebar-primary/40"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                  }`}
                >
                  <item.icon
                    className={`h-4 w-4 ${
                      isActive
                        ? "text-sidebar-primary drop-shadow-[0_0_6px_var(--sidebar-primary)]"
                        : ""
                    }`}
                  />
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="px-3 pb-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/60"
        >
          <LifeBuoy className="h-4 w-4" />
          Bantuan & Dukungan
        </button>
      </div>

      <div className="border-t border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
            ZY
          </div>
          <div className="leading-tight">
            <p className="text-sm font-medium">zahwanyaphar</p>
            <p className="text-[11px] text-sidebar-foreground/50">
              Auditor Internal
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
