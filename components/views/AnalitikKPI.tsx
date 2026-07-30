"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts"

// Data Tren Kepatuhan per Kuartal
const dataKepatuhanKuartal = [
  { kuartal: "Q1", target: 90, realisasi: 92 },
  { kuartal: "Q2", target: 90, realisasi: 94 },
  { kuartal: "Q3", target: 92, realisasi: 97 },
  { kuartal: "Q4", target: 92, realisasi: 95 },
]

// Data Distribusi Beban Kerja Tim
const dataDistribusiTim = [
  { name: "Audit Kepatuhan Operasional", value: 45, color: "#2563eb" }, // Biru
  { name: "Audit Keuangan", value: 35, color: "#38bdf8" },              // Biru Muda
  { name: "Audit Investigasi", value: 20, color: "#f97316" },           // Orange
]

export function AnalitikKPI() {
  return (
    <div className="space-y-6">
      {/* Grid: 1 kolom di HP, 2 kolom berdampingan di Layar Besar (lg) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Kolom 1: Grafik Batang Kepatuhan */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Grafik Tren Tingkat Kepatuhan vs Target</CardTitle>
            <CardDescription>
              Perbandingan persentase kepatuhan aktual terhadap target perusahaan per kuartal.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataKepatuhanKuartal} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="kuartal" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis domain={[80, 100]} stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                />
                <Bar dataKey="realisasi" fill="#2563eb" name="Realisasi Aktual" radius={[4, 4, 0, 0]} barSize={25} />
                <Bar dataKey="target" fill="#cbd5e1" name="Target Perusahaan" radius={[4, 4, 0, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Kolom 2: Grafik Pie/Donut Distribusi Beban Kerja Tim */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Distribusi Beban Kerja Tim</CardTitle>
            <CardDescription>
              Alokasi penugasan berdasarkan kategori jenis audit.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataDistribusiTim}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {dataDistribusiTim.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  formatter={(value) => <span className="text-xs text-slate-700 font-medium">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
