"use client"

import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Label,
} from "recharts"

const COLORS = {
  selesai: "#22c55e",
  proses: "#3b82f6",
  tindak: "#f59e0b",
  belum: "#ef4444",
}

const dataStatusTemuan = [
  {
    name: "Selesai",
    value: 79,
    color: COLORS.selesai,
  },
  {
    name: "Dalam Proses",
    value: 13,
    color: COLORS.proses,
  },
  {
    name: "Tindak Lanjut",
    value: 6,
    color: COLORS.tindak,
  },
  {
    name: "Belum Dimulai",
    value: 2,
    color: COLORS.belum,
  },
]

const dataBebanKerja = [
  {
    nama: "Audit Kepatuhan Operasional",
    penugasan: 10,
    persentase: 88,
    color: "bg-blue-600",
  },
  {
    nama: "Audit Keuangan",
    penugasan: 6,
    persentase: 82,
    color: "bg-blue-500",
  },
  {
    nama: "Audit Investigasi",
    penugasan: 4,
    persentase: 75,
    color: "bg-orange-500",
  },
]

export function AnalitikKPI() {
  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* ====================================================== */}
        {/* CARD KIRI */}
        {/* ====================================================== */}

        <Card className="border shadow-sm">

          <CardHeader className="pb-2">

            <CardTitle className="text-lg font-semibold">
              Tren Kinerja & Kepatuhan Bulanan
            </CardTitle>

            <CardDescription>
              Distribusi status penyelesaian temuan audit berdasarkan
              perkembangan tindak lanjut.
            </CardDescription>

          </CardHeader>

          <CardContent className="pt-2">

            <div className="mb-3 flex items-center justify-between">

              <span className="text-sm font-semibold text-slate-700">
                Status Penyelesaian Temuan Audit
              </span>

              <button
                type="button"
                className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16m-8 6h8"
                  />
                </svg>
              </button>

            </div>

            <div className="h-[320px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={dataStatusTemuan}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="46%"
                    innerRadius={74}
                    outerRadius={108}
                    paddingAngle={3}
                    strokeWidth={0}
                  >

                    {dataStatusTemuan.map((item, index) => (
                      <Cell
                        key={index}
                        fill={item.color}
                      />
                    ))}

                    <Label
                      position="center"
                      dy={-8}
                      className="fill-slate-900 text-[34px] font-bold"
                      value="91%"
                    />

                    <Label
                      position="center"
                      dy={18}
                      className="fill-slate-500 text-xs"
                      value="Selesai"
                    />

                  </Pie>

                  <Tooltip
                    formatter={(value: number) => [
                      `${value}%`,
                      "Persentase",
                    ]}
                  />

                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    iconSize={10}
                    wrapperStyle={{
                      paddingTop: 16,
                      fontSize: 12,
                    }}
                  />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </CardContent>

        </Card>

        {/* ====================================================== */}
        {/* CARD KANAN */}
        {/* ====================================================== */}

        <Card className="border shadow-sm">

          <CardHeader>

            <CardTitle className="text-lg font-semibold">
              Distribusi Beban Kerja Tim
            </CardTitle>

            <CardDescription>
              Persentase penyebaran penugasan audit pada masing-masing
              kategori pemeriksaan.
            </CardDescription>

          </CardHeader>

          <CardContent className="flex h-[320px] flex-col justify-center space-y-7">            
            {dataBebanKerja.map((item, index) => (
              <div
                key={index}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">

                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800">
                      {item.nama}
                    </span>

                    <span className="text-xs text-slate-500">
                      {item.penugasan} Penugasan
                    </span>
                  </div>

                  <span className="text-sm font-bold text-slate-700">
                    {item.persentase}%
                  </span>

                </div>

                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">

                  <div
                    className={`h-full rounded-full transition-all duration-700 ${item.color}`}
                    style={{
                      width: `${item.persentase}%`,
                    }}
                  />

                </div>

              </div>
            ))}

            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">

              <div className="mb-4 flex items-center justify-between">

                <span className="text-sm font-semibold text-slate-800">
                  Ringkasan Distribusi
                </span>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  Update Hari Ini
                </span>

              </div>

              <div className="grid grid-cols-3 gap-4">

                <div className="rounded-lg bg-white p-4 text-center shadow-sm">

                  <p className="text-2xl font-bold text-blue-600">
                    20
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Total Penugasan
                  </p>

                </div>

                <div className="rounded-lg bg-white p-4 text-center shadow-sm">

                  <p className="text-2xl font-bold text-green-600">
                    91%
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Progress
                  </p>

                </div>

                <div className="rounded-lg bg-white p-4 text-center shadow-sm">

                  <p className="text-2xl font-bold text-orange-500">
                    3
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Kategori Audit
                  </p>

                </div>

              </div>

            </div>

          </CardContent>

        </Card>

      </div>

    </div>
  )
}
