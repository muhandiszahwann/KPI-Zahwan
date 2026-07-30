"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Settings, Shield, Bell, User, Database, Save } from "lucide-react"

export function Konfigurasi() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 border-b pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Konfigurasi Sistem</h1>
            <p className="text-sm text-muted-foreground">
              Kelola preferensi akun, pengaturan keamanan, parameter audit, dan integrasi sistem.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
          >
            <Save className="h-4 w-4" />
            Simpan Perubahan
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Pengaturan Profil */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Profil Pengguna</CardTitle>
            </div>
            <CardDescription>Informasi akun auditor yang sedang aktif saat ini.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Nama Lengkap</label>
              <input
                type="text"
                defaultValue="zahwanyaphar"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Peran / Jabatan</label>
              <input
                type="text"
                defaultValue="Auditor Internal"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Email Institusi</label>
              <input
                type="email"
                defaultValue="zahwan@audit-intelligence.internal"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </CardContent>
        </Card>

        {/* Pengaturan Notifikasi */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Notifikasi & Peringatan</CardTitle>
            </div>
            <CardDescription>Atur preferensi pengingat jadwal dan pemberitahuan temuan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Peringatan Jadwal Audit</p>
                <p className="text-xs text-muted-foreground">Kirim notifikasi H-3 sebelum jadwal lapangan dimulai.</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-primary" />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Laporan KPI Mingguan</p>
                <p className="text-xs text-muted-foreground">Ringkasan performa dikirim via email setiap Senin.</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-primary" />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Eskalasi Temuan Kritis</p>
                <p className="text-xs text-muted-foreground">Pemberitahuan instan jika ada isu tingkat risiko tinggi.</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-primary" />
            </div>
          </CardContent>
        </Card>

        {/* Keamanan Sistem */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Keamanan & Akses</CardTitle>
            </div>
            <CardDescription>Kelola enkripsi data lokal dan keamanan autentikasi.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Autentikasi Dua Faktor (2FA)</p>
                <p className="text-xs text-muted-foreground">Lapisan keamanan tambahan saat masuk sistem.</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">Aktif</span>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Enkripsi Log Audit</p>
                <p className="text-xs text-muted-foreground">Simpan jejak riwayat aktivitas dengan enkripsi AES-256.</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">Aktif</span>
            </div>
          </CardContent>
        </Card>

        {/* Manajemen Data */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Manajemen Data & Cache</CardTitle>
            </div>
            <CardDescription>Penyimpanan lokal dan pemeliharaan basis data.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Sinkronisasi Cloud</p>
                <p className="text-xs text-muted-foreground">Terakhir sinkron: Hari ini, 08:30 WIB</p>
              </div>
              <button type="button" className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-muted">
                Sinkronkan
              </button>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Bersihkan Cache Lokal</p>
                <p className="text-xs text-muted-foreground">Hapus data sementara untuk mengoptimalkan performa.</p>
              </div>
              <button type="button" className="rounded-md border px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50">
                Bersihkan
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
