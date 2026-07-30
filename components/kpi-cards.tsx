"use client"

import type { AuditRow } from "@/lib/audit-data"
import { Briefcase, CheckCircle2, AlertTriangle, Users } from "lucide-react"

export function KpiCards({ rows }: { rows: AuditRow[] }) {
  const total = rows.length
  const selesai = rows.filter((r) => r.status === "Selesai").length
  const rate = total ? Math.round((selesai / total) * 100) : 0
  const kritis = rows.filter(
    (r) => r.status === "Tertunda" || r.status === "Belum Mulai",
  ).length
  const eksternal = rows.filter((r) =>
    r.auditor.toLowerCase().includes("ekstern"),
  ).length
  const internal = total - eksternal

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {/* Total */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            Total Penugasan Audit
          </p>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Briefcase className="h-4 w-4" />
          </span>
        </div>
        <p className="mt-3 font-serif text-3xl font-bold text-foreground">
          {total}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Jadwal utama & penugasan ad-hoc
        </p>
      </div>

      {/* Completion rate */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            Tingkat Penyelesaian
          </p>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
          </span>
        </div>
        <p className="mt-3 font-serif text-3xl font-bold text-foreground">
          {rate}
          <span className="text-lg text-muted-foreground">%</span>
        </p>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-700"
            style={{ width: `${rate}%` }}
          />
        </div>
      </div>

      {/* Critical */}
      <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-rose-700/80">
            Peringatan Kritis / Tertunda
          </p>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500/15 text-rose-600">
            <AlertTriangle className="h-4 w-4" />
          </span>
        </div>
        <p className="mt-3 font-serif text-3xl font-bold text-rose-700">
          {kritis}
        </p>
        <p className="mt-1 text-xs text-rose-600/80">
          Status tertunda atau belum dimulai
        </p>
      </div>

      {/* Utilization */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            Utilisasi Auditor
          </p>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/20 text-accent-foreground">
            <Users className="h-4 w-4" />
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-3">
          <p className="font-serif text-3xl font-bold text-foreground">
            {internal}
          </p>
          <span className="text-xs text-muted-foreground">Internal</span>
          <span className="text-muted-foreground">/</span>
          <p className="font-serif text-2xl font-semibold text-accent-foreground">
            {eksternal}
          </p>
          <span className="text-xs text-muted-foreground">Eksternal</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Distribusi sumber daya aktif
        </p>
      </div>
    </div>
  )
}
