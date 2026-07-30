"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ShieldCheck, Activity, AlertCircle, CheckCircle2, Clock, ArrowUpRight } from "lucide-react"

export function ExecutiveOverview() {
  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Ringkasan Eksekutif</h2>
          <p className="text-sm text-muted-foreground">
            Pandangan tingkat tinggi atas status kesehatan audit, temuan risiko, dan aktivitas strategis perusahaan.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-200">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          Status: Normal & Terkendali
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Audit Aktif</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 Penugasan</div>
            <p className="text-xs text-muted-foreground mt-1">Sedang berjalan di Q3</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tingkat Kepatuhan</CardTitle>
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">96.8%</div>
            <p className="text-xs text-emerald-600 mt-1 font-medium">+2.4% dari bulan lalu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Temuan Kritis</CardTitle>
            <AlertCircle className="h-4 w-4 text-rose-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600">2 Isu</div>
            <p className="text-xs text-rose-600 mt-1">Membutuhkan eskalasi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Waktu Respon</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2 Hari</div>
            <p className="text-xs text-muted-foreground mt-1">Penyelesaian tindak lanjut</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pesan Utama & Rekomendasi */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pesan Utama & Rekomendasi</CardTitle>
            <CardDescription>Catatan penting dari Dewan Pengawas untuk manajemen.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
              <h4 className="font-semibold text-sm text-slate-900 mb-1">Peningkatan Pengendalian Internal</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Secara keseluruhan, efektivitas pengendalian internal menunjukkan tren positif. Namun, perhatian khusus perlu diberikan pada divisi pengadaan barang dan jasa untuk meminimalisir celah kepatuhan.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
              <h4 className="font-semibold text-sm text-slate-900 mb-1">Optimalisasi Sumber Daya</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Alokasi auditor saat ini sudah merata, dengan tingkat penyelesaian penugasan mencapai target kuartal tepat waktu.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Aktivitas & Milestone Terbaru */}
        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>Jejak audit dan pembaruan terkini.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 pb-3 border-b border-slate-100">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Audit Keuangan Cabang Utama Selesai</p>
                  <p className="text-xs text-muted-foreground">Laporan akhir telah disetujui Kepala Auditor.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 pb-3 border-b border-slate-100">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Penugasan Ad-hoc Baru Ditambahkan</p>
                  <p className="text-xs text-muted-foreground">Investigasi khusus sistem logistik.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <ArrowUpRight className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Review Tindak Lanjut Temuan Q2</p>
                  <p className="text-xs text-muted-foreground">88% temuan telah ditutup secara resmi.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
