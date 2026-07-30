"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Label } from "recharts"

// Data Distribusi Beban Kerja Tim dengan Donut Chart
const dataDistribusiTim = [
  { name: "Audit Kepatuhan Operasional", value: 45, color: "#2563eb" }, // Biru
  { name: "Audit Keuangan", value: 35, color: "#38bdf8" },              // Biru Muda
  { name: "Audit Investigasi", value: 20, color: "#f97316" },           // Orange
]

export function AnalitikKPI() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Donut Chart Utama: Distribusi Beban Kerja Tim */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Distribusi Beban Kerja Tim</CardTitle>
            <CardDescription>
              Identifikasi kategori pekerjaan audit berdasarkan jenis penugasan.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 0, right: 0, bottom: 20, left: 0 }}>
                <Pie
                  data={dataDistribusiTim}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={105}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {dataDistribusiTim.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                  
                  {/* Label Tengah */}
                  <Label
                    value="100%"
                    position="center"
                    className="fill-foreground text-3xl font-bold"
                    dy={-6}
                  />
                  <Label
                    value="Total Alokasi"
                    position="center"
                    dy={18}
                    className="fill-muted-foreground text-xs font-medium"
                  />
                </Pie>
                <Tooltip />
                <Legend 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ paddingTop: "15px" }}
                  formatter={(value) => <span className="text-xs text-slate-700 font-medium">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Anda bisa menambahkan card/chart lain di kolom kedua jika diperlukan */}
        <Card className="col-span-1 flex flex-col justify-center items-center p-6 text-center">
          <CardHeader>
            <CardTitle>Ringkasan Kategori Audit</CardTitle>
            <CardDescription>
              Informasi detail alokasi sumber daya internal auditor.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-left w-full text-sm">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="flex items-center gap-2 font-medium"><span className="w-3 h-3 rounded-full bg-blue-600"></span>Audit Kepatuhan Operasional</span>
              <span className="font-bold">45%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="flex items-center gap-2 font-medium"><span className="w-3 h-3 rounded-full bg-sky-400"></span>Audit Keuangan</span>
              <span className="font-bold">35%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="flex items-center gap-2 font-medium"><span className="w-3 h-3 rounded-full bg-orange-500"></span>Audit Investigasi</span>
              <span className="font-bold">20%</span>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
