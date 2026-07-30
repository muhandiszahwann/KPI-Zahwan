export type StatusAudit =
  | "Selesai"
  | "Tertunda"
  | "Sedang Berjalan"
  | "Belum Mulai"

export const STATUS_LIST: StatusAudit[] = [
  "Selesai",
  "Sedang Berjalan",
  "Tertunda",
  "Belum Mulai",
]

export type AuditRow = {
  id: string
  no: number
  kegiatan: string
  auditor: string
  tanggalMulai: string
  tanggalSelesai: string
  status: StatusAudit
  keterangan: string
  laporan: string // external URL
  berkas?: { name: string; data: string } | null // base64
}

export type YearData = {
  jadwal: AuditRow[]
  luar: AuditRow[]
}

export type TabKey = "jadwal" | "luar"

const rid = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`

export const STATUS_STYLES: Record<
  StatusAudit,
  { badge: string; ring: string; dot: string; hex: string }
> = {
  Selesai: {
    badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    ring: "text-emerald-500",
    dot: "bg-emerald-500",
    hex: "#10b981",
  },
  "Sedang Berjalan": {
    badge: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    ring: "text-amber-500",
    dot: "bg-amber-500",
    hex: "#f59e0b",
  },
  Tertunda: {
    badge: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
    ring: "text-rose-500",
    dot: "bg-rose-500",
    hex: "#f43f5e",
  },
  "Belum Mulai": {
    badge: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
    ring: "text-slate-400",
    dot: "bg-slate-400",
    hex: "#94a3b8",
  },
}

function seed2026(): YearData {
  return {
    jadwal: [
      {
        id: rid(),
        no: 1,
        kegiatan: "Audit Manajemen Risiko & GCG",
        auditor: "Tim Internal",
        tanggalMulai: "15/01/2026",
        tanggalSelesai: "10/02/2026",
        status: "Sedang Berjalan",
        keterangan: "Pemantauan area GCG triwulan pertama",
        laporan: "https://google.com",
      },
      {
        id: rid(),
        no: 2,
        kegiatan: "Audit Operasional Cabang Utama",
        auditor: "Tim Internal",
        tanggalMulai: "12/02/2026",
        tanggalSelesai: "28/02/2026",
        status: "Selesai",
        keterangan: "Evaluasi operasional dan efisiensi biaya",
        laporan: "https://google.com",
      },
      {
        id: rid(),
        no: 3,
        kegiatan: "Audit Kepatuhan Pajak & Regulasi",
        auditor: "Tim Internal",
        tanggalMulai: "-",
        tanggalSelesai: "-",
        status: "Tertunda",
        keterangan: "Menunggu konfirmasi jadwal otoritas pajak",
        laporan: "",
      },
      {
        id: rid(),
        no: 4,
        kegiatan: "Audit Teknologi Informasi & Keamanan Siber",
        auditor: "Tim Internal",
        tanggalMulai: "10/04/2026",
        tanggalSelesai: "25/04/2026",
        status: "Belum Mulai",
        keterangan: "Review infrastruktur server dan data privacy",
        laporan: "",
      },
    ],
    luar: [
      {
        id: rid(),
        no: 1,
        kegiatan: "Penyusunan Profil Risiko Finansial Korporat",
        auditor: "Tim Internal/Eksternal",
        tanggalMulai: "05/01/2026",
        tanggalSelesai: "20/01/2026",
        status: "Selesai",
        keterangan: "Review profil risiko atas fluktuasi pasar global",
        laporan: "https://google.com",
      },
      {
        id: rid(),
        no: 2,
        kegiatan: "Review Internal Control Sektor Pengadaan",
        auditor: "Tim Internal",
        tanggalMulai: "10/02/2026",
        tanggalSelesai: "25/02/2026",
        status: "Selesai",
        keterangan: "Pengujian substantif terhadap siklus purchase order",
        laporan: "https://google.com",
      },
      {
        id: rid(),
        no: 3,
        kegiatan: "Investigasi Fraud Pelanggaran Prosedur Kas",
        auditor: "Tim Internal",
        tanggalMulai: "01/03/2026",
        tanggalSelesai: "15/03/2026",
        status: "Selesai",
        keterangan: "Tindak lanjut laporan whistleblowing",
        laporan: "https://google.com",
      },
      {
        id: rid(),
        no: 4,
        kegiatan: "Evaluasi Manajemen Risiko Kerja Sama Operasi",
        auditor: "Tim Internal",
        tanggalMulai: "10/04/2026",
        tanggalSelesai: "30/04/2026",
        status: "Tertunda",
        keterangan: "Peninjauan ulang draf kerja sama joint venture",
        laporan: "",
      },
    ],
  }
}

// Variations for prior years so visuals render on any selection.
function seedVariation(year: number): YearData {
  const base = seed2026()
  const y = String(year)
  const statusesJ: StatusAudit[] =
    year === 2025
      ? ["Selesai", "Selesai", "Sedang Berjalan", "Selesai"]
      : ["Selesai", "Selesai", "Selesai", "Tertunda"]
  const statusesL: StatusAudit[] =
    year === 2025
      ? ["Selesai", "Tertunda", "Selesai", "Belum Mulai"]
      : ["Selesai", "Selesai", "Tertunda", "Selesai"]
  const remap = (rows: AuditRow[], st: StatusAudit[]): AuditRow[] =>
    rows.map((r, i) => ({
      ...r,
      id: rid(),
      status: st[i] ?? r.status,
      tanggalMulai: r.tanggalMulai.replace("2026", y),
      tanggalSelesai: r.tanggalSelesai.replace("2026", y),
    }))
  return {
    jadwal: remap(base.jadwal, statusesJ),
    luar: remap(base.luar, statusesL),
  }
}

export function seedForYear(year: number): YearData {
  return year === 2026 ? seed2026() : seedVariation(year)
}

const keyFor = (year: number) => `audit_data_${year}`

export function loadYear(year: number): YearData {
  if (typeof window === "undefined") return seedForYear(year)
  try {
    const raw = window.localStorage.getItem(keyFor(year))
    if (raw) return JSON.parse(raw) as YearData
  } catch {
    /* ignore parse errors */
  }
  const seeded = seedForYear(year)
  saveYear(year, seeded)
  return seeded
}

export function saveYear(year: number, data: YearData): boolean {
  if (typeof window === "undefined") return false
  try {
    window.localStorage.setItem(keyFor(year), JSON.stringify(data))
    return true
  } catch {
    return false
  }
}

export const newRowId = rid

// Membangun ringkasan teks dari data audit untuk konteks Asisten AI.
export function buildAuditContext(year: number, data: YearData): string {
  const fmtRows = (rows: AuditRow[]) =>
    rows.length === 0
      ? "  (tidak ada data)"
      : rows
          .map(
            (r) =>
              `  ${r.no}. ${r.kegiatan} | Auditor: ${r.auditor} | Mulai: ${
                r.tanggalMulai || "-"
              } | Selesai: ${r.tanggalSelesai || "-"} | Status: ${
                r.status
              } | Keterangan: ${r.keterangan || "-"} | Laporan: ${
                r.laporan ? "ada" : "belum ada"
              }${r.berkas ? ` | Berkas: ${r.berkas.name}` : ""}`,
          )
          .join("\n")

  const countBy = (rows: AuditRow[]) => {
    const c: Record<string, number> = {}
    for (const r of rows) c[r.status] = (c[r.status] ?? 0) + 1
    return Object.entries(c)
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ")
  }

  const all = [...data.jadwal, ...data.luar]

  return `Tahun periode: ${year}
Total kegiatan: ${all.length} (Jadwal Audit Utama: ${data.jadwal.length}, Pekerjaan di Luar Jadwal: ${data.luar.length})
Rekap status keseluruhan: ${countBy(all) || "-"}

[TABEL 1 — JADWAL AUDIT UTAMA]
${fmtRows(data.jadwal)}

[TABEL 2 — PEKERJAAN DI LUAR JADWAL]
${fmtRows(data.luar)}`
}

// Month index (0-11) from dd/mm/yyyy, or null.
export function monthOf(dateStr: string): number | null {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(dateStr?.trim() ?? "")
  if (!m) return null
  const mm = Number.parseInt(m[2], 10) - 1
  return mm >= 0 && mm <= 11 ? mm : null
}
