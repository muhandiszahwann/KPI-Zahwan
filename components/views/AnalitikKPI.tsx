"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart3, TrendingUp, Users, CheckCircle2, AlertTriangle, ArrowUpRight, Award } from "lucide-react"

export function AnalitikKPI() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 border-b pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Analitik KPI Audit Internal</h1>
            <p className="text-sm text-muted-foreground">
              Monitoring performa komprehensif, efisiensi penugasan, dan tindak lanjut temuan audit.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
              <Award className="mr-1.5 h-3.5 w-3.5" /> Target Tercapai (Q2)
            </span>
          </div>
        </div>
      </div>

      {/* Metrik Utama */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Penyelesaian Audit</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24 / 26</div>
            <div className="flex items-center pt-1 text-xs text-emerald-600 font-medium">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+12% dari periode sebelumnya</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Efisiensi Siklus Waktu</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              <span>Rata-rata 14 hari per penugasan</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Tindak Lanjut Temuan</CardTitle>
            <BarChart3 className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88.5%</div>
            <div className="flex items-center pt-1 text-xs text-indigo-600 font-medium">
              <span>Resolusi tepat waktu</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Risiko Teridentifikasi</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 Level Tinggi</div>
            <div className="flex items-center pt-1 text-xs text-amber-600 font-medium">
              <span>Dalam pengawasan khusus</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid Analitik Lanjutan */}
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle>Tren Kinerja & Kepatuhan Bulanan</CardTitle>
            <CardDescription>Perbandingan target penugasan vs realisasi aktual tahun berjalan.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] flex flex-col items-center justify-center border border-dashed rounded-lg bg-muted/30 text-muted-foreground text-sm">
              <BarChart3 className="h-8 w-8 mb-2 text-muted-foreground/50" />
              <span>Visualisasi Grafik Kinerja Bulanan</span>
              <span className="text-xs text-muted-foreground/70 mt-1">Modul chart terintegrasi dengan data real-time</span>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 shadow-sm">
          <CardHeader>
            <CardTitle>Distribusi Beban Kerja Tim</CardTitle>
            <CardDescription>Alokasi penugasan per auditor.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Zahwan Yaphar</span>
                  <span className="text-muted-foreground">8 Penugasan (95%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "95%" }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Tim Kepatuhan Operasional</span>
                  <span className="text-muted-foreground">10 Penugasan (88%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-blue-600" style={{ width: "88%" }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Tim Audit Keuangan</span>
                  <span className="text-muted-foreground">6 Penugasan (82%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-indigo-600" style={{ width: "82%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
