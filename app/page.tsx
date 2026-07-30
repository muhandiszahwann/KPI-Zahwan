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
import { KpiCards } from "@/components/kpi-cards"
import { AuditCharts } from "@/components/audit-charts"
import { AuditTable } from "@/components/audit-table"
import { AddActivityModal } from "@/components/add-activity-modal"
import { ClipboardList, FolderKanban } from "lucide-react"

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
          {/* =========================
              DASHBOARD / OVERVIEW
          ========================== */}
          {view === "overview" && (
            <>
              <KpiCards rows={allRows} />
              <AuditCharts rows={allRows} />

              <div className="rounded-xl border bg-card p-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold">
                    Aktivitas Audit Terbaru
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Menampilkan seluruh aktivitas audit pada tahun {year}.
                  </p>
                </div>

                <AuditTable
                  rows={allRows}
                  tab={tab}
                  onStatusChange={(id, status: StatusAudit) =>
                    updateRow(id, { status })
                  }
                  onUpload={(id, berkas) => updateRow(id, { berkas })}
                  onAdd={() => setModalOpen(true)}
                />
              </div>
            </>
          )}

          {/* =========================
              JADWAL AUDIT
          ========================== */}
          {view === "jadwal" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold">
                  Jadwal Audit
                </h2>
                <p className="text-muted-foreground">
                  Kelola seluruh audit berdasarkan Program Kerja Tahunan.
                </p>
              </div>

              <div className="inline-flex rounded-xl border border-border bg-card p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => setTab("jadwal")}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    tab === "jadwal"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ClipboardList className="h-4 w-4" />
                  Jadwal Audit Utama
                </button>

                <button
                  type="button"
                  onClick={() => setTab("luar")}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    tab === "luar"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <FolderKanban className="h-4 w-4" />
                  Pekerjaan di Luar Jadwal
                </button>
              </div>

              <AuditTable
                rows={activeRows}
                tab={tab}
                onStatusChange={(id, status: StatusAudit) =>
                  updateRow(id, { status })
                }
                onUpload={(id, berkas) => updateRow(id, { berkas })}
                onAdd={() => setModalOpen(true)}
              />
            </div>
          )}

          {/* =========================
              PENUGASAN AD-HOC
          ========================== */}
          {view === "luar" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold">
                  Penugasan Audit di Luar Jadwal
                </h2>
                <p className="text-muted-foreground">
                  Audit investigasi, permintaan pimpinan, monitoring, evaluasi,
                  dan penugasan khusus lainnya.
                </p>
              </div>

              <AuditTable
                rows={data.luar}
                tab="luar"
                onStatusChange={(id, status: StatusAudit) =>
                  updateRow(id, { status })
                }
                onUpload={(id, berkas) => updateRow(id, { berkas })}
                onAdd={() => setModalOpen(true)}
              />
            </div>
          )}

          {/* =========================
              ANALITIK KPI
          ========================== */}
          {view === "kpi" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">
                  Analitik KPI Audit Internal
                </h2>
                <p className="text-muted-foreground">
                  Analisis kinerja pelaksanaan audit tahun {year}.
                </p>
              </div>

              <KpiCards rows={allRows} />
              <AuditCharts rows={allRows} />

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl border bg-card p-6">
                  <h3 className="mb-4 text-lg font-semibold">
                    Efektivitas Pelaksanaan Audit
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Total Audit</span>
                      <span className="font-semibold">{allRows.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Selesai</span>
                      <span className="font-semibold">
                        {allRows.filter((r) => r.status === "Selesai").length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dalam Proses</span>
                      <span className="font-semibold">
                        {allRows.filter((r) => r.status === "Proses").length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Belum Dimulai</span>
                      <span className="font-semibold">
                        {allRows.filter((r) => r.status === "Belum").length}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border bg-card p-6">
                  <h3 className="mb-4 text-lg font-semibold">
                    Indikator Kinerja
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li>
                      • Tingkat penyelesaian audit:{" "}
                      <strong>
                        {Math.round(
                          (allRows.filter((r) => r.status === "Selesai").length /
                            allRows.length) *
                            100
                        ) || 0}
                        %
                      </strong>
                    </li>
                    <li>
                      • Total kegiatan audit: <strong>{allRows.length}</strong>
                    </li>
                    <li>
                      • Audit reguler: <strong>{data.jadwal.length}</strong>
                    </li>
                    <li>
                      • Penugasan ad-hoc: <strong>{data.luar.length}</strong>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-xl border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold">
                  Executive Summary
                </h3>
                <p className="leading-7 text-muted-foreground">
                  Berdasarkan data pelaksanaan audit tahun {year}, sebanyak{" "}
                  <strong>{allRows.length}</strong> kegiatan audit telah
                  direncanakan. Dari jumlah tersebut,{" "}
                  <strong>
                    {allRows.filter((r) => r.status === "Selesai").length}
                  </strong>{" "}
                  telah selesai dilaksanakan, sedangkan sisanya masih berada
                  pada tahap pelaksanaan maupun belum dimulai. Informasi ini dapat
                  digunakan pimpinan sebagai dasar evaluasi kinerja SPI dan
                  pengambilan keputusan.
                </p>
              </div>
            </div>
          )}

          {/* =========================
              KONFIGURASI
          ========================== */}
          {view === "config" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">
                  Konfigurasi Dashboard
                </h2>
                <p className="text-muted-foreground">
                  Pengaturan aplikasi akan ditempatkan pada halaman ini.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
                Halaman konfigurasi masih dalam tahap pengembangan.
              </div>
            </div>
          )}
        </main>

        <footer className="border-t border-border px-6 py-5">
          <p className="text-center text-xs text-muted-foreground">
            Dikembangkan oleh: Muhandis Zahwan, S.Akun.
          </p>
        </footer>
      </div>

      {(view === "jadwal" || view === "luar") && (
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
