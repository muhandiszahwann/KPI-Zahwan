"use client"

import {
  type AuditRow,
  STATUS_LIST,
  STATUS_STYLES,
  monthOf,
} from "@/lib/audit-data"
import { PieChart, TrendingUp } from "lucide-react"

const BULAN_SINGKAT = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Ags", "Sep", "Okt", "Nov", "Des",
]

function StatusDonut({ rows }: { rows: AuditRow[] }) {
  const total = rows.length || 1
  const counts = STATUS_LIST.map((s) => ({
    status: s,
    value: rows.filter((r) => r.status === s).length,
  }))

  // Build conic-gradient stops
  let acc = 0
  const stops = counts
    .map(({ status, value }) => {
      const start = (acc / total) * 100
      acc += value
      const end = (acc / total) * 100
      return `${STATUS_STYLES[status].hex} ${start}% ${end}%`
    })
    .join(", ")

  const selesai = counts.find((c) => c.status === "Selesai")?.value ?? 0
  const pct = Math.round((selesai / total) * 100)

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <PieChart className="h-4 w-4 text-accent" />
        <h2 className="font-serif text-lg font-semibold text-foreground">
          Distribusi Status
        </h2>
      </div>
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-around">
        <div className="relative h-44 w-44 shrink-0">
          <div
            className="h-full w-full rounded-full"
            style={{ background: `conic-gradient(${stops})` }}
            role="img"
            aria-label="Diagram distribusi status audit"
          />
          <div className="absolute inset-[18%] flex flex-col items-center justify-center rounded-full bg-card shadow-inner">
            <span className="font-serif text-3xl font-bold text-foreground">
              {pct}%
            </span>
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Selesai
            </span>
          </div>
        </div>
        <ul className="w-full max-w-[220px] space-y-2.5">
          {counts.map(({ status, value }) => (
            <li
              key={status}
              className="flex items-center justify-between rounded-lg border border-border/70 px-3 py-2"
            >
              <span className="flex items-center gap-2 text-sm text-foreground">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${STATUS_STYLES[status].dot}`}
                />
                {status}
              </span>
              <span className="font-mono text-sm font-semibold text-foreground">
                {value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function TimelineBars({ rows }: { rows: AuditRow[] }) {
  const perMonth = BULAN_SINGKAT.map((_, i) =>
    rows.filter((r) => monthOf(r.tanggalMulai) === i).length,
  )
  const max = Math.max(1, ...perMonth)

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-accent" />
        <h2 className="font-serif text-lg font-semibold text-foreground">
          Tren Lini Masa Audit
        </h2>
      </div>
      <div className="flex h-48 items-end justify-between gap-1.5">
        {perMonth.map((count, i) => (
          <div
            key={i}
            className="group flex flex-1 flex-col items-center justify-end gap-2"
          >
            <span className="text-[10px] font-medium text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
              {count}
            </span>
            <div
              className="w-full rounded-t-md bg-primary/85 transition-all duration-500 hover:bg-accent"
              style={{ height: `${(count / max) * 100}%`, minHeight: count ? 6 : 2 }}
              title={`${BULAN_SINGKAT[i]}: ${count} penugasan`}
            />
            <span className="text-[10px] text-muted-foreground">
              {BULAN_SINGKAT[i]}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
        Jumlah penugasan berdasarkan bulan tanggal mulai
      </p>
    </div>
  )
}

export function AuditCharts({ rows }: { rows: AuditRow[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <StatusDonut rows={rows} />
      <TimelineBars rows={rows} />
    </div>
  )
}
