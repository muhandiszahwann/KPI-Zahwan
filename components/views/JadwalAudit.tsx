"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calendar, Clock, MapPin, UserCheck, PlusCircle } from "lucide-react"

export function JadwalAudit() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 border-b pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Jadwal Audit</h1>
            <p className="text-sm text-muted-foreground">
              Agenda penugasan lapangan, audit rutin, dan perencanaan tahunan tim internal.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
          >
            <PlusCircle className="h-4 w-4" />
            Tambah Jadwal
          </button>
        </div>
      </div>

      {/* Ringkasan Status Jadwal */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Audit Berjalan</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4 Agenda</div>
            <p className="text-xs text-muted-foreground pt-1">Fase pengumpulan data & interview</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Agenda Mendatang</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 Agenda</div>
            <p className="text-xs text-muted-foreground pt-1">Menunggu konfirmasi auditee</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Audit Selesai</CardTitle>
            <UserCheck className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 Agenda</div>
            <p className="text-xs text-muted-foreground pt-1">Laporan telah diserahkan</p>
          </CardContent>
        </Card>
      </div>

      {/* Daftar Tabel Jadwal Utama */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Daftar Agenda Audit Q3</CardTitle>
          <CardDescription>Jadwal operasional penugasan audit internal dan penanggung jawab.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between rounded-lg border p-4 gap-4 bg-card hover:bg-muted/30 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">Audit Kepatuhan Cabang Regional Barat</span>
                  <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">Berjalan</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> 10 Ags - 25 Ags 2026</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Kantor Cabang Surabaya</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs font-medium">Lead: Zahwan Yaphar</p>
                  <p className="text-[11px] text-muted-foreground">Tim Operasional</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between rounded-lg border p-4 gap-4 bg-card hover:bg-muted/30 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">Audit Pengadaan Infrastruktur IT</span>
                  <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">Mendatang</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> 01 Sep - 15 Sep 2026</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Kantor Pusat Lt. 12</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs font-medium">Lead: Tim IT Audit</p>
                  <p className="text-[11px] text-muted-foreground">Divisi Teknologi</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between rounded-lg border p-4 gap-4 bg-card hover:bg-muted/30 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">Evaluasi Keuangan & Perpajakan Q2</span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">Selesai</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> 01 Jul - 20 Jul 2026</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Secara Daring / Remote</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs font-medium">Lead: Auditor Keuangan</p>
                  <p className="text-[11px] text-muted-foreground">Divisi Keuangan</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
