"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FolderKanban, Plus, Clock, AlertCircle, CheckCircle2, User } from "lucide-react"

export function PenugasanAdhoc() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 border-b pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Penugasan Ad-hoc</h1>
            <p className="text-sm text-muted-foreground">
              Manajemen dan pemantauan penugasan khusus, investigasi insiden, serta audit di luar agenda rutin.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Buat Penugasan Baru
          </button>
        </div>
      </div>

      {/* Ringkasan Metrik Ad-hoc */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Investigasi Aktif</CardTitle>
            <FolderKanban className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 Kasus</div>
            <p className="text-xs text-muted-foreground pt-1">Dalam tahap pengumpulan bukti</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Menunggu Review Manajemen</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 Kasus</div>
            <p className="text-xs text-muted-foreground pt-1">Laporan investigasi diserahkan</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Kasus Ditutup (YTD)</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8 Kasus</div>
            <p className="text-xs text-muted-foreground pt-1">Penyelesaian tuntas & tervalidasi</p>
          </CardContent>
        </Card>
      </div>

      {/* Daftar Penugasan Khusus */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Daftar Penugasan Ad-hoc Berjalan</CardTitle>
          <CardDescription>Detail investigasi khusus dan penugasan mendadak dari direksi atau komite.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between rounded-lg border p-4 gap-4 bg-card hover:bg-muted/30 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">Investigasi Khusus Anomali Transaksi Logistik</span>
                  <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-700 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> Prioritas Tinggi
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Analisis mendalam terhadap ketidaksesuaian data pengiriman barang kuartal ini.</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                  <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> PIC: Zahwan Yaphar</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Deadline: 10 Ags 2026</span>
                </div>
              </div>
              <div>
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                  Tahap Audit Lapangan
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between rounded-lg border p-4 gap-4 bg-card hover:bg-muted/30 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">Review Kepatuhan Keamanan Akses Sistem Server</span>
                  <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">
                    Prioritas Sedang
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Pemeriksaan log akses pengguna setelah adanya pembaruan infrastruktur cloud.</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                  <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> PIC: Tim IT Audit</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Deadline: 25 Ags 2026</span>
                </div>
              </div>
              <div>
                <span className="inline-flex items-center rounded-md bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                  Analisis Dokumen
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between rounded-lg border p-4 gap-4 bg-card hover:bg-muted/30 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">Verifikasi Dokumen Klaim Vendor Eksternal</span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                    Selesai
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Pemeriksaan keabsahan faktur dan tagihan vendor proyek konstruksi.</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                  <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> PIC: Auditor Keuangan</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Selesai: 20 Jul 2026</span>
                </div>
              </div>
              <div>
                <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                  Tutup Kasus
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
