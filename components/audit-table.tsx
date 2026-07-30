"use client"

import { useRef, useState } from "react"
import {
  type AuditRow,
  type StatusAudit,
  type TabKey,
  STATUS_LIST,
  STATUS_STYLES,
} from "@/lib/audit-data"
import {
  Search,
  Plus,
  Upload,
  Download,
  FileText,
  Loader2,
  Pencil,
  ExternalLink,
  Trash2,
} from "lucide-react"

const MAX_BYTES = 1024 * 1024 // 1MB

function StatusBadge({
  status,
  onChange,
}: {
  status: StatusAudit
  onChange: (s: StatusAudit) => void
}) {
  const [editing, setEditing] = useState(false)
  if (editing) {
    return (
      <select
        autoFocus
        value={status}
        onChange={(e) => {
          onChange(e.target.value as StatusAudit)
          setEditing(false)
        }}
        onBlur={() => setEditing(false)}
        className="rounded-md border border-border bg-background px-2 py-1 text-xs font-medium outline-none focus:ring-2 focus:ring-ring"
      >
        {STATUS_LIST.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    )
  }
  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      className={`group inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[status].badge}`}
      title="Klik untuk mengubah status"
    >
      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_STYLES[status].dot}`} />
      {status}
      <Pencil className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-70" />
    </button>
  )
}

function ReportCell({
  row,
  onUpload,
}: {
  row: AuditRow
  onUpload: (id: string, file: { name: string; data: string } | null) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > MAX_BYTES) {
      window.alert(
        `Ukuran berkas "${file.name}" melebihi batas 1MB. Mohon unggah dokumen yang lebih ringan untuk mencegah kegagalan penyimpanan.`,
      )
      e.target.value = ""
      return
    }
    setLoading(true)
    const reader = new FileReader()
    reader.onload = () => {
      onUpload(row.id, { name: file.name, data: reader.result as string })
      setLoading(false)
    }
    reader.onerror = () => setLoading(false)
    reader.readAsDataURL(file)
    e.target.value = ""
  }

  const download = () => {
    if (row.berkas) {
      const a = document.createElement("a")
      a.href = row.berkas.data
      a.download = row.berkas.name
      a.click()
    } else if (row.laporan) {
      window.open(row.laporan, "_blank", "noopener,noreferrer")
    }
  }

  const hasFile = Boolean(row.berkas)
  const hasLink = Boolean(row.laporan)

  return (
    <div className="flex items-center gap-2">
      {loading ? (
        <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-1.5 text-xs text-muted-foreground">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Mengunggah…
        </span>
      ) : hasFile ? (
        <button
          type="button"
          onClick={download}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
          title={row.berkas?.name}
        >
          <Download className="h-3.5 w-3.5" />
          Unduh Laporan
        </button>
      ) : hasLink ? (
        <button
          type="button"
          onClick={download}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Unduh Laporan
        </button>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
        >
          <Upload className="h-3.5 w-3.5" />
          Unggah Berkas
        </button>
      )}
      {(hasFile || hasLink) && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-md p-1.5 text-muted-foreground hover:bg-muted"
          title="Ganti berkas"
        >
          <FileText className="h-3.5 w-3.5" />
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  )
}

export function AuditTable({
  rows,
  tab,
  onStatusChange,
  onUpload,
  onAdd,
  onDelete,
}: {
  rows: AuditRow[]
  tab: TabKey
  onStatusChange: (id: string, status: StatusAudit) => void
  onUpload: (id: string, file: { name: string; data: string } | null) => void
  onAdd: () => void
  onDelete: (id: string) => void
}) {
  const [q, setQ] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | StatusAudit>("all")

  const filtered = rows.filter((r) => {
    const matchQ = r.kegiatan.toLowerCase().includes(q.toLowerCase())
    const matchS = statusFilter === "all" || r.status === statusFilter
    return matchQ && matchS
  })

  const auditorLabel = tab === "jadwal" ? "Auditor" : "Tim"

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari kegiatan / area audit…"
              className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "all" | StatusAudit)
            }
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">Semua Status</option>
            {STATUS_LIST.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Tambah Kegiatan Baru
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-3 font-semibold">No</th>
              <th className="px-4 py-3 font-semibold">
                {tab === "jadwal" ? "Area Audit" : "Kegiatan"}
              </th>
              <th className="px-4 py-3 font-semibold">{auditorLabel}</th>
              <th className="px-4 py-3 font-semibold">Periode</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Keterangan</th>
              <th className="px-4 py-3 font-semibold">Laporan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-sm text-muted-foreground"
                >
                  Tidak ada data yang sesuai dengan kriteria penyaringan.
                </td>
              </tr>
            ) : (
              filtered.map((r, i) => (
                <tr key={r.id} className="align-top hover:bg-muted/30">
                  <td className="px-4 py-4 font-mono text-muted-foreground">
                    {i + 1}
                  </td>
                  <td className="px-4 py-4 font-medium text-foreground">
                    {r.kegiatan}
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">
                    {r.auditor}
                  </td>
                  <td className="px-4 py-4 font-mono text-xs text-muted-foreground">
                    <div>{r.tanggalMulai}</div>
                    <div className="text-muted-foreground/60">
                      s.d. {r.tanggalSelesai}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge
                      status={r.status}
                      onChange={(s) => onStatusChange(r.id, s)}
                    />
                  </td>
                  <td className="px-4 py-4 max-w-xs text-xs leading-relaxed text-muted-foreground">
                    {r.keterangan || "—"}
                  </td>
                  <td className="px-4 py-4">
                    <ReportCell row={r} onUpload={onUpload} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
