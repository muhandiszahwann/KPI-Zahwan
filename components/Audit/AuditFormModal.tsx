"use client"

import React, { useEffect, useState } from "react"

import {
  AuditRow,
  StatusAudit,
  STATUS_LIST,
  newRowId,
} from "@/lib/audit-data"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Textarea } from "@/components/ui/textarea"

import {
  CalendarDays,
  User,
  ClipboardList,
  BadgeInfo,
} from "lucide-react"

interface AuditFormModalProps {

  open: boolean

  editData?: AuditRow | null

  nextNo: number

  onClose: () => void

  onSave: (row: AuditRow) => void

}

const emptyForm = (
  nextNo: number,
): AuditRow => ({

  id: newRowId(),

  no: nextNo,

  kegiatan: "",

  auditor: "",

  tanggalMulai: "",

  tanggalSelesai: "",

  status: "Belum Mulai",

  keterangan: "",

  laporan: "",

  berkas: null,

})

export function AuditFormModal({

  open,

  editData,

  nextNo,

  onClose,

  onSave,

}: AuditFormModalProps) {

  const [form, setForm] = useState<AuditRow>(
    emptyForm(nextNo),
  )

  useEffect(() => {

    if (!open) return

    if (editData) {

      setForm(editData)

    } else {

      setForm(emptyForm(nextNo))

    }

  }, [
    open,
    editData,
    nextNo,
  ])

  function update<K extends keyof AuditRow>(
    key: K,
    value: AuditRow[K],
  ) {

    setForm((prev) => ({
      ...prev,
      [key]: value,
    }))

  }

  function handleSubmit() {

    if (!form.kegiatan.trim()) {

      alert("Nama kegiatan audit wajib diisi.")

      return

    }

    if (!form.auditor.trim()) {

      alert("Auditor wajib diisi.")

      return

    }

    onSave(form)

    onClose()

  }

  return (

    <Dialog
      open={open}
      onOpenChange={onClose}
    >

      <DialogContent
        className="
          max-w-4xl
          rounded-2xl
          p-0
          overflow-hidden
        "
      >

        {/* ====================================== */}

        {/* HEADER */}

        {/* ====================================== */}

        <div
          className="
            border-b
            bg-slate-50
            px-8
            py-6
          "
        >

          <DialogHeader>

            <DialogTitle
              className="
                text-2xl
                font-bold
              "
            >

              {editData
                ? "Edit Audit"
                : "Tambah Jadwal Audit"}

            </DialogTitle>

            <DialogDescription>

              Lengkapi informasi audit
              dengan benar sebelum
              disimpan.

            </DialogDescription>

          </DialogHeader>

        </div>

        {/* ====================================== */}

        {/* BODY */}

        {/* ====================================== */}

        <div
          className="
            p-8
            space-y-8
          "
        >
                    {/* ====================================== */}
          {/* INFORMASI UTAMA */}
          {/* ====================================== */}

          <div className="grid gap-6 md:grid-cols-2">

            {/* Nomor Audit */}

            <div className="space-y-2">

              <Label>
                Nomor Audit
              </Label>

              <Input
                value={form.no}
                disabled
              />

            </div>

            {/* Status */}

            <div className="space-y-2">

              <Label>
                Status Audit
              </Label>

              <Select
                value={form.status}
                onValueChange={(v) =>
                  update(
                    "status",
                    v as StatusAudit
                  )
                }
              >

                <SelectTrigger>

                  <SelectValue />

                </SelectTrigger>

                <SelectContent>

                  {STATUS_LIST.map((item) => (

                    <SelectItem
                      key={item}
                      value={item}
                    >

                      {item}

                    </SelectItem>

                  ))}

                </SelectContent>

              </Select>

            </div>

          </div>

          {/* ====================================== */}

          {/* NAMA KEGIATAN */}

          {/* ====================================== */}

          <div className="space-y-2">

            <Label>

              Nama Kegiatan Audit

            </Label>

            <div className="relative">

              <ClipboardList
                className="
                  absolute
                  left-3
                  top-3.5
                  h-4
                  w-4
                  text-slate-400
                "
              />

              <Input
                className="pl-10"
                placeholder="Contoh : Audit Operasional Cabang Utama"
                value={form.kegiatan}
                onChange={(e) =>
                  update(
                    "kegiatan",
                    e.target.value,
                  )
                }
              />

            </div>

          </div>

          {/* ====================================== */}

          {/* AUDITOR */}

          {/* ====================================== */}

          <div className="space-y-2">

            <Label>

              Auditor

            </Label>

            <div className="relative">

              <User
                className="
                  absolute
                  left-3
                  top-3.5
                  h-4
                  w-4
                  text-slate-400
                "
              />

              <Input
                className="pl-10"
                placeholder="Nama Auditor / Tim Audit"
                value={form.auditor}
                onChange={(e) =>
                  update(
                    "auditor",
                    e.target.value,
                  )
                }
              />

            </div>

          </div>

          {/* ====================================== */}

          {/* TANGGAL */}

          {/* ====================================== */}

          <div className="grid gap-6 md:grid-cols-2">

            <div className="space-y-2">

              <Label>

                Tanggal Mulai

              </Label>

              <div className="relative">

                <CalendarDays
                  className="
                    absolute
                    left-3
                    top-3.5
                    h-4
                    w-4
                    text-slate-400
                  "
                />

                <Input
                  className="pl-10"
                  placeholder="dd/mm/yyyy"
                  value={form.tanggalMulai}
                  onChange={(e) =>
                    update(
                      "tanggalMulai",
                      e.target.value,
                    )
                  }
                />

              </div>

            </div>

            <div className="space-y-2">

              <Label>

                Tanggal Selesai

              </Label>

              <div className="relative">

                <CalendarDays
                  className="
                    absolute
                    left-3
                    top-3.5
                    h-4
                    w-4
                    text-slate-400
                  "
                />

                <Input
                  className="pl-10"
                  placeholder="dd/mm/yyyy"
                  value={form.tanggalSelesai}
                  onChange={(e) =>
                    update(
                      "tanggalSelesai",
                      e.target.value,
                    )
                  }
                />

              </div>

            </div>

          </div>

          {/* ====================================== */}

          {/* LINK LAPORAN */}

          {/* ====================================== */}

          <div className="space-y-2">

            <Label>

              Link Laporan Audit

            </Label>

            <div className="relative">

              <BadgeInfo
                className="
                  absolute
                  left-3
                  top-3.5
                  h-4
                  w-4
                  text-slate-400
                "
              />

              <Input
                className="pl-10"
                placeholder="https://..."
                value={form.laporan}
                onChange={(e) =>
                  update(
                    "laporan",
                    e.target.value,
                  )
                }
              />

            </div>

          </div>

          {/* ====================================== */}

          {/* KETERANGAN */}

          {/* ====================================== */}

          <div className="space-y-2">

            <Label>

              Keterangan

            </Label>

            <Textarea
              rows={5}
              placeholder="Masukkan deskripsi, tujuan audit, ruang lingkup atau catatan lainnya..."
              value={form.keterangan}
              onChange={(e) =>
                update(
                  "keterangan",
                  e.target.value,
                )
              }
            />

          </div>
          {/* ====================================== */}
          {/* UPLOAD BERKAS */}
          {/* ====================================== */}

          <div className="space-y-3">

            <Label>
              Upload Dokumen Audit
            </Label>

            <Input
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.zip"
              onChange={async (e) => {

                const file = e.target.files?.[0]

                if (!file) return

                const reader = new FileReader()

                reader.onload = () => {

                  update("berkas", {
                    name: file.name,
                    data: reader.result as string,
                  })

                }

                reader.readAsDataURL(file)

              }}
            />

            {form.berkas && (

              <div className="rounded-lg border bg-slate-50 p-3">

                <p className="font-medium">

                  {form.berkas.name}

                </p>

                <p className="mt-1 text-xs text-muted-foreground">

                  Dokumen siap disimpan bersama data audit.

                </p>

              </div>

            )}

          </div>

          {/* ====================================== */}
          {/* FOOTER */}
          {/* ====================================== */}

          <div className="flex flex-col-reverse gap-3 border-t pt-6 md:flex-row md:justify-end">

            <Button
              variant="outline"
              onClick={onClose}
            >
              Batal
            </Button>

            <Button
              onClick={handleSubmit}
            >

              {editData
                ? "Simpan Perubahan"
                : "Tambah Audit"}

            </Button>

          </div>

        </div>

      </DialogContent>

    </Dialog>

  )

}
