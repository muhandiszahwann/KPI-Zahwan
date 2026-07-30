"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ShieldCheck, Activity, AlertCircle, CheckCircle2, Clock, ArrowUpRight } from "lucide-react"

export function ExecutiveOverview() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 border-b pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Ringkasan Eksekutif</h1>
            <p className="text-sm text-muted-foreground">
              Pandangan tingkat tinggi atas status kesehatan audit, temuan risiko, dan aktivitas strategis perusahaan.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
              <ShieldCheck className="mr-1.5 h-3.5 w-3.5" /> Status: Normal & Terkendali
            </span>
          </div>
        </div>
      </div>

      {/* Ringkasan Kartu Eksekutif */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Audit Aktif</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 Penugasan</div>
            <p className="text-xs text-muted-foreground pt-1">Sedang berjalan di Q3</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Tingkat Kepatuhan</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.8%</div>
            <div className="flex items-center pt-1 text-xs text-emerald-600 font-medium">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+2.4% dari bulan lalu</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Temuan Kritis</CardTitle>
            <AlertCircle className="h-4 w-4 text-rose-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 Isu</div>
            <p className="text-xs text-rose-600 font-medium pt-1">Membutuhkan eskalasi</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Rata-rata Waktu Respon</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2 Hari</div>
            <p className="text-xs text-muted-foreground pt-1">Penyelesaian tindak lanjut</p>
          </CardContent>
        </Card>
      </div>

      {/* Bagian Bawah: Ringkasan Utama & Aktivitas Terbaru */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Pesan Utama & Rekomendasi</CardTitle>
            <CardDescription>Catatan penting dari Dewan Pengawas Audit untuk manajemen.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4 bg-muted/20">
              <h4 className="text-sm font-semibold mb-1">Peningkatan Pengendalian Internal</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Secara keseluruhan, efektivitas pengendalian internal menunjukkan tren positif. Namun, perhatian khusus perlu diberikan pada divisi pengadaan barang dan jasa untuk meminimalisir celah kepatuhan.
              </p>
            </div>
            <div className="rounded-lg border p-4 bg-muted/20">
              <h4 className="text-sm font-semibold mb-1">Optimalisasi Sumber Daya</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Alokasi auditor saat ini sudah merata, dengan tingkat penyelesaian penugasan mencapai target kuartal tepat waktu.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Aktivitas & Milestone Terbaru</CardTitle>
            <CardDescription>Jejak audit dan pembaruan status terkini.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm border-b pb-3">
                <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-emerald-500" />
                <div className="flex-1 space-y-1">
                  <p className="text-xs font-medium leading-none">Audit Keuangan Cabang Utama Selesai</p>
                  <p className="text-[11px] text-muted-foreground">Laporan akhir telah disetujui oleh Kepala Auditor.</p>
                </div>
                <span className="text-[10px] text-muted-foreground">2 jam lalu</span>
              </div>

              <div className="flex items-start gap-3 text-sm border-b pb-3">
                <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
                <div className="flex-1 space-y-1">
                  <p className="text-xs font-medium leading-none">Penugasan Ad-hoc Baru Ditambahkan</p>
                  <p className="text-[11px] text-muted-foreground">Investigasi khusus sistem logistik.</p>
                </div>
                <span className="text-[10px] text-muted-foreground">Kemarin</span>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-amber-500" />
                <div className="flex-1 space-y-1">
                  <p className="text-xs font-medium leading-none">Review Tindak Lanjut Temuan Q2</p>
                  <p className="text-[11px] text-muted-foreground">88% temuan telah ditutup secara resmi.</p>
                </div>
                <span className="text-[10px] text-muted-foreground">3 hari lalu</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
