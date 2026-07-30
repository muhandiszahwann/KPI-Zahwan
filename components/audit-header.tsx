"use client"

import { useEffect, useState } from "react"
import { Calendar, Clock, ChevronDown } from "lucide-react"

const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
const BULAN = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
]

function LiveClock() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const time = now
    ? now.toLocaleTimeString("en-GB", { hour12: false })
    : "--:--:--"
  const date = now
    ? `${HARI[now.getDay()]}, ${now.getDate()} ${BULAN[now.getMonth()]} ${now.getFullYear()}`
    : "Memuat tanggal…"

  return (
    <div className="flex items-center gap-4">
      <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4 text-accent" />
        <span className="font-medium text-foreground">{date}</span>
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 shadow-sm">
        <Clock className="h-4 w-4 text-accent" />
        <span
          className="font-mono text-base font-semibold tabular-nums tracking-wider text-foreground"
          aria-label="Waktu sistem saat ini"
        >
          {time}
        </span>
      </div>
    </div>
  )
}

export function AuditHeader({
  year,
  onYearChange,
  years,
}: {
  year: number
  onYearChange: (y: number) => void
  years: number[]
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
      <div className="flex flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground text-balance">
            Corporate Audit Intelligence & Performance Hub
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sistem Eksekutif Pemantauan KPI & Tata Kelola Jadwal Audit Internal
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <label className="sr-only" htmlFor="year-select">
              Periode Tahun
            </label>
            <select
              id="year-select"
              value={year}
              onChange={(e) => onYearChange(Number(e.target.value))}
              className="appearance-none rounded-lg border border-border bg-card py-2 pl-3 pr-9 text-sm font-medium text-foreground shadow-sm outline-none focus:ring-2 focus:ring-ring"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  Periode {y}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
          <LiveClock />
        </div>
      </div>
    </header>
  )
}
