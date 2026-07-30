"use client"

import { useState } from "react"
import {
  type AuditRow,
  type StatusAudit,
  type TabKey,
  STATUS_LIST,
  newRowId,
} from "@/lib/audit-data"
import { X } from "lucide-react"

export function AddActivityModal({
  open,
  onClose,
  onAdd,
  tab,
  nextNo,
}: {
  open: boolean
  onClose: () => void
  onAdd: (row: AuditRow) => void
  tab: TabKey
  nextNo: number
}) {
  const [form, setForm] = useState({
    kegiatan: "",
    auditor: "Tim Internal",
    tanggalMulai: "",
    tanggalSelesai: "",
    status: "Belum Mulai" as StatusAudit,
    keterangan: "",
    laporan: "",
  })

  if (!open) return null

  const auditorLabel = tab === "jadwal" ? "Auditor" : "Tim"

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.kegiatan.trim()) return
    onAdd({
      id: newRowId(),
      no: nextNo,
      kegiatan: form.kegiatan.trim(),
      auditor: form.auditor.trim() || "Tim Internal",
      tanggalMulai: form.tanggalMulai.trim() || "-",
      tanggalSelesai: form.tanggalSelesai.trim() || "-",
      status: form.status,
      keterangan: form.keterangan.trim(),
      laporan: form.laporan.trim(),
      berkas: null,
    })
    onClose()
  }

  const field =
    "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-serif text-lg font-semibold text-foreground">
            Tambah Kegiatan Baru
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:bg-muted"
            aria-label="Tutup"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={submit} className="max-h-[70vh] space-y-4 overflow-y-auto px-6 py-5">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              {tab === "jadwal" ? "Area Audit / Kegiatan" : "Kegiatan"}
            </label>
            <input
              className={field}
              value={form.kegiatan}
              onChange={(e) => setForm({ ...form, kegiatan: e.target.value })}
              placeholder="Contoh: Audit Kepatuhan Regulasi"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                {auditorLabel}
              </label>
              <input
                className={field}
                value={form.auditor}
                onChange={(e) => setForm({ ...form, auditor: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Status
              </label>
              <select
                className={field}
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value as StatusAudit })
                }
              >
                {STATUS_LIST.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Tanggal Mulai (dd/mm/yyyy)
              </label>
              <input
                className={field}
                value={form.tanggalMulai}
                onChange={(e) =>
                  setForm({ ...form, tanggalMulai: e.target.value })
                }
                placeholder="15/01/2026"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Tanggal Selesai (dd/mm/yyyy)
              </label>
              <input
                className={field}
                value={form.tanggalSelesai}
                onChange={(e) =>
                  setForm({ ...form, tanggalSelesai: e.target.value })
                }
                placeholder="10/02/2026"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Keterangan
            </label>
            <textarea
              className={`${field} min-h-[72px] resize-y`}
              value={form.keterangan}
              onChange={(e) => setForm({ ...form, keterangan: e.target.value })}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Tautan Laporan (opsional)
            </label>
            <input
              className={field}
              value={form.laporan}
              onChange={(e) => setForm({ ...form, laporan: e.target.value })}
              placeholder="https://…"
            />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              Batal
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Simpan Kegiatan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
