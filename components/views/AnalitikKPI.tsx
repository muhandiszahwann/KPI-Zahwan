"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Label } from "recharts"

// Data Donut Chart untuk Kiri (Tren Kinerja & Kepatuhan Bulanan)
const dataStatusTemuan = [
  { name: "Selesai", value: 79, color: "#22c55e" },       // Hijau
  { name: "Dalam Proses", value: 13, color: "#3b82f6" },   // Biru
  { name: "Tindak Lanjut", value: 6, color: "#f97316" },   // Orange
  { name: "Belum Dimulai", value: 2, color: "#ef4444" },   // Merah
]

// Data Non-Grafik (Progress Bar, Persentase, dan Jumlah Pengerjaan) untuk Kanan
const dataBebanKerja = [
  { nama: "Audit Kepatuhan Operasional", penugasan: "10 Penugasan", persentase: 88, color: "bg-blue-600" },
  { nama: "Audit Keuangan", penugasan: "6 Penugasan", persentase: 82, color: "bg-blue-500" },
  { nama: "Audit Investigasi", penugasan: "4 Penugasan", persentase: 75, color: "bg-orange-500" },
]

export function AnalitikKPI() {
  return (
    <div className="space-y-6">
      {/* Grid 2 Kolom Berdampingan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* KOTAK KIRI: Grafik Donut Kinerja & Kepatuhan */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Tren Kinerja & Kepatuhan Bulanan</CardTitle>
            <CardDescription className="text-xs">
              Distribusi status penemuan audit yang sedang berjalan.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[380px]">
            <div className="flex items-center justify-center gap-2 mb-1">
              <h4 className="text-sm font-semibold text-muted-foreground">
                Status Penyelesaian Temuan Audit
              </h4>
              <svg className="w-4 h-4 text-muted-foreground cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </div>

            <ResponsiveContainer width="100%" height="82%">
              <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Pie
                  data={dataStatusTemuan}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {dataStatusTemuan.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                  <Label
                    value="91%"
                    position="center"
                    className="fill-foreground text-3xl font-bold"
                    dy={-6}
                  />
                  <Label
                    value="Selesai"
                    position="center"
                    dy={16}
                    className="fill-muted-foreground text-xs font-medium"
                  />
                </Pie>
                <Tooltip />
                <Legend 
                  iconType="circle"
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ paddingTop: "10px" }}
                  formatter={(value) => <span className="text-xs text-slate-700 font-medium">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* KOTAK KANAN: Distribusi Beban Kerja Tim (Tanpa Grafik, Pakai Persentase & Jumlah Pengerjaan) */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Distribusi Beban Kerja Tim</CardTitle>
            <CardDescription className="text-xs">
              Alokasi penugasan per kategori audit.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 h-[380px] flex flex-col justify-center">
            {dataBebanKerja.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-slate-800">{item.nama}</span>
                  <span className="text-xs text-slate-600 font-semibold">{item.penugasan} ({item.persentase}%)</span>
                </div>
                {/* Progress Bar dengan Persentase & Jumlah Pengerjaan */}
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div 
                    className={`${item.color} h-full rounded-full transition-all duration-500`} 
                    style={{ width: `${item.persentase}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
