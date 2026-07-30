"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { TrendingUp, Award, CheckCircle2, AlertTriangle } from "lucide-react"

const dataGrafik = [
  { kuartal: "Q1", kepatuhan: 92, target: 90 },
  { kuartal: "Q2", kepatuhan: 94, target: 90 },
  { kuartal: "Q3", kepatuhan: 96.8, target: 92 },
  { kuartal: "Q4 (Est)", kepatuhan: 95, target: 92 },
]

export function AnalitikKPI() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Analitik & KPI Audit</h2>
        <p className="text-sm text-muted-foreground">
          Evaluasi mendalam metrik kinerja, efisiensi operasional, dan target kepatuhan internal tahun 2026.
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Skor Kinerja Keseluruhan</CardTitle>
            <Award className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">A (Sangat Baik)</div>
            <p className="text-xs text-muted-foreground mt-1">Melampaui standar target tahunan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Temuan Selesai Ditindaklanjuti</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">42 dari 45</div>
            <p className="text-xs text-muted-foreground mt-1">93.3% tingkat penyelesaian</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Potensi Risiko Tinggi</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">3 Area</div>
            <p className="text-xs text-muted-foreground mt-1">Dalam pengawasan ketat</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <Card>
        <CardHeader>
          <CardTitle>Grafik Tren Tingkat Kepatuhan vs Target</CardTitle>
          <CardDescription>Perbandingan persentase kepatuhan aktual terhadap target perusahaan per kuartal.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[320px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataGrafik} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="kuartal" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} domain={[80, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "8px", fontSize: "12px" }} 
                />
                <Bar dataKey="kepatuhan" name="Kepatuhan Aktual (%)" fill="#2563eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" name="Target Minimum (%)" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
