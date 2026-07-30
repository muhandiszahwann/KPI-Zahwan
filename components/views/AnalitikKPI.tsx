"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

// Data Tren Kepatuhan per Kuartal sesuai gambar asli
const dataKepatuhanKuartal = [
  { kuartal: "Q1", target: 90, realisasi: 92 },
  { kuartal: "Q2", target: 90, realisasi: 94 },
  { kuartal: "Q3", target: 92, realisasi: 97 },
  { kuartal: "Q4", target: 92, realisasi: 95 },
]

export function AnalitikKPI() {
  return (
    <div className="space-y-6">
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
              <Bar dataKey="realisasi" fill="#2563eb" name="Realisasi Aktual" radius={[4, 4, 0, 0]} barSize={35} />
              <Bar dataKey="target" fill="#cbd5e1" name="Target Perusahaan" radius={[4, 4, 0, 0]} barSize={35} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
