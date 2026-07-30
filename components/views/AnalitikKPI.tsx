"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Label } from "recharts"

// 1. Data sesuai tampilan gambar
const dataStatusTemuan = [
  { name: "Selesai", value: 91, color: "#22c55e" },       // Hijau (91%)
  { name: "Dalam Proses", value: 13, color: "#3b82f6" },   // Biru (13%)
  { name: "Tindak Lanjut", value: 6, color: "#f97316" },   // Orange (6%)
  { name: "Belum Dimulai", value: 2, color: "#ef4444" },   // Merah (2%)
  { name: "Tim Audit", value: 0, color: "#a855f7" },       // Ungu (tidak terlihat di grafik, tapi ada di legend)
]

export function AnalitikKPI() {
  // Menghitung total untuk label tengah (opsional, jika ingin dinamis)
  // const totalValue = dataStatusTemuan.reduce((acc, entry) => acc + entry.value, 0);

  return (
    <div className="space-y-6">
      <Card className="col-span-1">
        <CardHeader>
          {/* Header teks sesuai gambar */}
          <CardTitle>Tren Kinerja & Kepatuhan Bulanan</CardTitle>
          <CardDescription>
            Distribusi status penemuan audit yang sedang berjalan.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[380px]">
          {/* Judul Grafik dan Ikon Menu */}
          <div className="flex items-center justify-center gap-2 mb-2 relative">
            <h4 className="text-sm font-semibold text-center text-muted-foreground">
              Status Penyelesaian Temuan Audit
            </h4>
            {/* Ikon Menu Palsu (seperti di gambar) */}
            <svg
              className="w-4 h-4 text-muted-foreground cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 0, right: 0, bottom: 30, left: 0 }}>
              <Pie
                data={dataStatusTemuan}
                cx="50%"
                cy="50%"
                innerRadius={70}  // Membuatnya menjadi Donut Chart
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
                // Label Persentase di luar grafik
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {/* Mewarnai setiap segmen */}
                {dataStatusTemuan.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
                
                {/* Label Besar di Tengah (91% Selesai) */}
                <Label
                  value="91%"
                  position="center"
                  className="fill-foreground text-4xl font-bold"
                />
                <Label
                  value="Selesai"
                  position="center"
                  dy={24}
                  className="fill-muted-foreground text-sm"
                />
              </Pie>
              
              {/* Legend di bagian bawah sesuai warna */}
              <Legend
                iconType="circle"
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value, entry) => (
                  <span className="text-xs text-muted-foreground ml-1">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
