"use client"

import { useEffect, useMemo, useState } from "react"

import {
  type AuditRow,
  type StatusAudit,
  type TabKey,
  type YearData,
  type NavView,
  buildAuditContext,
  loadYear,
  saveYear,
} from "@/lib/audit-data"
import { AiAssistant } from "@/components/ai-assistant"
import { AuditSidebar } from "@/components/audit-sidebar"
import { AuditHeader } from "@/components/audit-header"
import { AddActivityModal } from "@/components/add-activity-modal"

// Impor komponen views modular yang baru dibuat
import { ExecutiveOverview } from "@/components/views/ExecutiveOverview"
import { JadwalAudit } from "@/components/views/JadwalAudit"
import { PenugasanAdhoc } from "@/components/views/PenugasanAdhoc"
import { AnalitikKPI } from "@/components/views/AnalitikKPI"
import { Konfigurasi } from "@/components/views/Konfigurasi"

// Menghasilkan daftar tahun secara dinamis (Tahun depan, tahun berjalan, dan 2 tahun ke belakang)
const currentYear = new Date().getFullYear()
const YEARS = [currentYear + 1, currentYear, currentYear - 1, currentYear - 2]

export default function Page() {
  const [year, setYear] = useState<number>(currentYear)
  const [data, setData] = useState<YearData | null>(null)
  const [tab, setTab] = useState<TabKey>("jadwal")
  const [modalOpen, setModalOpen] = useState(false)
  const [view, setView] = useState<NavView>("overview")

  useEffect(() => {
    if (view === "jadwal") {
      setTab("jadwal")
    }

    if (view === "luar") {
      setTab("luar")
    }
  }, [view])

  // Load whenever the year changes.
  useEffect(() => {
    setData(loadYear(year))
  }, [year])

  const persist = (next: YearData) => {
    setData(next)
    const ok = saveYear(year, next)
    if (!ok) {
      window.alert(
        "Penyimpanan lokal penuh. Perubahan tidak dapat disimpan permanen — mohon hapus sebagian berkas terlampir.",
      )
    }
  }

  const activeRows = data ? data[tab] : []
  const allRows = useMemo(
    () => (data ? [...data.jadwal, ...data.luar] : []),
    [data],
  )
  const auditContext = useMemo(
    () => (data ? buildAuditContext(year, data) : ""),
    [data, year],
  )

  const updateRow = (id: string, patch: Partial<AuditRow>) => {
    if (!data) return

    const next: YearData = {
      ...data,
      jadwal: data.jadwal.map((row) =>
        row.id === id ? { ...row, ...patch } : row
      ),
      luar: data.luar.map((row) =>
        row.id === id ? { ...row, ...patch } : row
      ),
    }

    persist(next)
  }

  const addRow = (row: AuditRow) => {
    if (!data) return
    persist({ ...data, [tab]: [...data[tab], row] })
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        Memuat data eksekutif…
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AuditSidebar active={view} onNavigate={setView} />

      <div className="flex min-w-0 flex-1 flex-col">
        <AuditHeader year={year} onYearChange={setYear} years={YEARS} />

        <main className="flex-1 space-y-6 px-6 py-6">
          {view === "overview" && (
            <ExecutiveOverview
              rows={allRows}
              year={year}
              tab={tab}
              onStatusChange={(id, status: StatusAudit) => updateRow(id, { status })}
              onUpload={(id, berkas) => updateRow(id, { berkas })}
              onAdd={() => setModalOpen(true)}
            />
          )}

          {view === "jadwal" && (
            <JadwalAudit
              rows={activeRows}
              tab={tab}
              onTabChange={setTab}
              onStatusChange={(id, status: StatusAudit) => updateRow(id, { status })}
              onUpload={(id, berkas) => updateRow(id, { berkas })}
              onAdd={() => setModalOpen(true)}
            />
          )}

          {view === "luar" && (
            <PenugasanAdhoc
              rows={data.luar}
              tab="luar"
              onStatusChange={(id, status: StatusAudit) => updateRow(id, { status })}
              onUpload={(id, berkas) => updateRow(id, { berkas })}
              onAdd={() => setModalOpen(true)}
            />
          )}

          {view === "kpi" && (
            <AnalitikKPI
              rows={allRows}
              year={year}
              data={data}
            />
          )}

          {view === "config" && (
            <Konfigurasi />
          )}
        </main>

        <footer className="border-t border-border px-6 py-5">
          <p className="text-center text-xs text-muted-foreground">
            Dikembangkan oleh: Muhandis Zahwan, S.Akun.
          </p>
        </footer>
      </div>

      {(view === "jadwal" || view === "luar" || view === "overview") && (
        <AddActivityModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onAdd={addRow}
          tab={tab}
          nextNo={
            view === "luar"
              ? data.luar.length + 1
              : data.jadwal.length + 1
          }
        />
      )}

      <AiAssistant auditContext={auditContext} year={year} />
    </div>
  )
}
