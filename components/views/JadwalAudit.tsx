"use client"

import { useEffect, useMemo, useState } from "react"

import {
  Calendar,
  Clock,
  UserCheck,
  PlusCircle,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { AuditCard } from "@/components/audit/AuditCard"

import { AuditFormModal } from "@/components/audit/AuditFormModal"

import { AuditDetailModal } from "@/components/audit/AuditDetailModal"

import { UploadDocumentModal } from "@/components/audit/UploadDocumentModal"

import { DeleteAuditDialog } from "@/components/audit/DeleteAuditDialog"

import {
  AuditRow,
  AuditFile,
  loadYear,
  saveYear,
  newRowId,
} from "@/lib/audit-data"

export function JadwalAudit() {

  const YEAR = 2026

  const [rows, setRows] = useState<AuditRow[]>([])

  const [selected, setSelected] =
    useState<AuditRow | null>(null)

  const [openForm, setOpenForm] =
    useState(false)

  const [openDetail, setOpenDetail] =
    useState(false)

  const [openUpload, setOpenUpload] =
    useState(false)

  const [openDelete, setOpenDelete] =
    useState(false)

  useEffect(() => {

    const data = loadYear(YEAR)

    setRows(data.jadwal)

  }, [])

  function saveRows(next: AuditRow[]) {

    setRows(next)

    const data = loadYear(YEAR)

    data.jadwal = next

    saveYear(YEAR, data)

  }

  function handleAdd() {

    setSelected(null)

    setOpenForm(true)

  }

  function handleEdit(row: AuditRow) {

    setSelected(row)

    setOpenForm(true)

  }

  function handleDetail(row: AuditRow) {

    setSelected(row)

    setOpenDetail(true)

  }

  function handleUpload(row: AuditRow) {

    setSelected(row)

    setOpenUpload(true)

  }

  function handleDelete(row: AuditRow) {

    setSelected(row)

    setOpenDelete(true)

  }

  function handleSave(row: AuditRow) {

    if (selected) {

      saveRows(

        rows.map((item) =>

          item.id === row.id

            ? row

            : item,

        ),

      )

    } else {

      saveRows([

        ...rows,

        {

          ...row,

          id: newRowId(),

          no: rows.length + 1,

        },

      ])

    }

    setOpenForm(false)

  }

  function handleDeleteConfirm() {

    if (!selected) return

    saveRows(

      rows

        .filter(

          (r) =>

            r.id !== selected.id,

        )

        .map((r, i) => ({

          ...r,

          no: i + 1,

        })),

    )

    setOpenDelete(false)

  }

  function handleUploadSave(

    row: AuditRow,

    file: AuditFile,

  ) {

    saveRows(

      rows.map((item) =>

        item.id === row.id

          ? {

              ...item,

              berkas: file,

            }

          : item,

      ),

    )

  }

  const statistik = useMemo(() => {

    return {

      berjalan: rows.filter(

        (r) =>

          r.status ===

          "Sedang Berjalan",

      ).length,

      selesai: rows.filter(

        (r) =>

          r.status ===

          "Selesai",

      ).length,

      mendatang: rows.filter(

        (r) =>

          r.status ===

          "Belum Mulai",

      ).length,

    }

  }, [rows])

  return (

    <div className="space-y-6">
            {/* ====================================================== */}
      {/* HEADER */}
      {/* ====================================================== */}

      <div className="flex flex-col gap-4 border-b pb-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-3xl font-bold tracking-tight">

            Jadwal Audit

          </h1>

          <p className="mt-1 text-sm text-muted-foreground">

            Kelola seluruh agenda audit, penugasan, monitoring,
            dan dokumentasi audit internal perusahaan.

          </p>

        </div>

        <Button
          size="lg"
          onClick={handleAdd}
        >

          <PlusCircle className="mr-2 h-5 w-5" />

          Tambah Jadwal Audit

        </Button>

      </div>

      {/* ====================================================== */}
      {/* STATISTIK */}
      {/* ====================================================== */}

      <div className="grid gap-5 md:grid-cols-3">

        <Card className="border-0 shadow-md">

          <CardHeader className="flex flex-row items-center justify-between pb-2">

            <div>

              <CardTitle className="text-sm">

                Audit Berjalan

              </CardTitle>

              <CardDescription>

                Sedang dilaksanakan

              </CardDescription>

            </div>

            <Calendar className="h-6 w-6 text-blue-600" />

          </CardHeader>

          <CardContent>

            <p className="text-3xl font-bold">

              {statistik.berjalan}

            </p>

          </CardContent>

        </Card>

        <Card className="border-0 shadow-md">

          <CardHeader className="flex flex-row items-center justify-between pb-2">

            <div>

              <CardTitle className="text-sm">

                Agenda Mendatang

              </CardTitle>

              <CardDescription>

                Belum dimulai

              </CardDescription>

            </div>

            <Clock className="h-6 w-6 text-amber-500" />

          </CardHeader>

          <CardContent>

            <p className="text-3xl font-bold">

              {statistik.mendatang}

            </p>

          </CardContent>

        </Card>

        <Card className="border-0 shadow-md">

          <CardHeader className="flex flex-row items-center justify-between pb-2">

            <div>

              <CardTitle className="text-sm">

                Audit Selesai

              </CardTitle>

              <CardDescription>

                Laporan selesai

              </CardDescription>

            </div>

            <UserCheck className="h-6 w-6 text-emerald-600" />

          </CardHeader>

          <CardContent>

            <p className="text-3xl font-bold">

              {statistik.selesai}

            </p>

          </CardContent>

        </Card>

      </div>

      {/* ====================================================== */}
      {/* DAFTAR AUDIT */}
      {/* ====================================================== */}

      <Card className="shadow-md">

        <CardHeader>

          <CardTitle>

            Daftar Agenda Audit

          </CardTitle>

          <CardDescription>

            Klik salah satu audit untuk melihat detail,
            mengubah data, menghapus, maupun mengunggah dokumen.

          </CardDescription>

        </CardHeader>

        <CardContent>

          {rows.length === 0 ? (

            <div className="rounded-xl border border-dashed py-16 text-center">

              <Calendar className="mx-auto mb-4 h-12 w-12 text-slate-300" />

              <h3 className="text-lg font-semibold">

                Belum ada jadwal audit

              </h3>

              <p className="mt-2 text-sm text-muted-foreground">

                Klik tombol

                <span className="mx-1 font-semibold">

                  Tambah Jadwal Audit

                </span>

                untuk membuat agenda pertama.

              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {rows.map((row) => (

                <AuditCard

                  key={row.id}

                  row={row}

                  onDetail={() => handleDetail(row)}

                  onEdit={() => handleEdit(row)}

                  onUpload={() => handleUpload(row)}

                  onDelete={() => handleDelete(row)}

                />

              ))}

            </div>

          )}

        </CardContent>

      </Card>
            {/* ====================================================== */}
      {/* MODALS */}
      {/* ====================================================== */}

      <AuditFormModal
        open={openForm}
        row={selected}
        onClose={() => {
          setOpenForm(false)
          setSelected(null)
        }}
        onSave={handleSave}
      />

      <AuditDetailModal
        open={openDetail}
        row={selected}
        onClose={() => {
          setOpenDetail(false)
          setSelected(null)
        }}
        onEdit={() => {
          setOpenDetail(false)
          setOpenForm(true)
        }}
        onUpload={() => {
          setOpenDetail(false)
          setOpenUpload(true)
        }}
      />

      <UploadDocumentModal
        open={openUpload}
        row={selected}
        onClose={() => {
          setOpenUpload(false)
          setSelected(null)
        }}
        onSave={handleUploadSave}
      />

      <DeleteAuditDialog
        open={openDelete}
        row={selected}
        onClose={() => {
          setOpenDelete(false)
          setSelected(null)
        }}
        onConfirm={handleDeleteConfirm}
      />

    </div>

  )

}
