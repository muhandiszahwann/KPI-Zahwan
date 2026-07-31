"use client"

import React, { useEffect, useMemo, useState } from "react"

import { AuditRow } from "@/lib/audit-data"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

import { Progress } from "@/components/ui/progress"

import {
  UploadCloud,
  FileText,
  FileArchive,
  FileSpreadsheet,
  FileImage,
  CheckCircle2,
  XCircle,
} from "lucide-react"

interface UploadDocumentModalProps {

  open: boolean

  row: AuditRow | null

  onClose: () => void

  onSave: (
    row: AuditRow,
    file: {
      name: string
      data: string
    },
  ) => void

}

const MAX_FILE_SIZE = 50 * 1024 * 1024

const ACCEPT = [
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".zip",
  ".jpg",
  ".jpeg",
  ".png",
]

export function UploadDocumentModal({

  open,

  row,

  onClose,

  onSave,

}: UploadDocumentModalProps) {

  const [dragging, setDragging] =
    useState(false)

  const [file, setFile] =
    useState<File | null>(null)

  const [progress, setProgress] =
    useState(0)

  const [error, setError] =
    useState("")

  useEffect(() => {

    if (!open) {

      setFile(null)

      setProgress(0)

      setDragging(false)

      setError("")

    }

  }, [open])

  const icon = useMemo(() => {

    if (!file)
      return (
        <UploadCloud className="h-16 w-16 text-slate-400" />
      )

    const ext =
      file.name.split(".").pop()?.toLowerCase()

    switch (ext) {

      case "pdf":
        return (
          <FileText className="h-16 w-16 text-red-500" />
        )

      case "doc":

      case "docx":
        return (
          <FileText className="h-16 w-16 text-blue-600" />
        )

      case "xls":

      case "xlsx":
        return (
          <FileSpreadsheet className="h-16 w-16 text-green-600" />
        )

      case "zip":
        return (
          <FileArchive className="h-16 w-16 text-amber-500" />
        )

      case "jpg":

      case "jpeg":

      case "png":
        return (
          <FileImage className="h-16 w-16 text-violet-500" />
        )

      default:
        return (
          <UploadCloud className="h-16 w-16 text-slate-400" />
        )

    }

  }, [file])

  function validate(f: File) {

    if (f.size > MAX_FILE_SIZE) {

      setError(
        "Ukuran file maksimal 50 MB."
      )

      return false

    }

    const ext =
      "." +
      f.name
        .split(".")
        .pop()
        ?.toLowerCase()

    if (!ACCEPT.includes(ext)) {

      setError(
        "Format file tidak didukung."
      )

      return false

    }

    setError("")

    return true

  }

  function choose(f: File) {

    if (!validate(f))
      return

    setFile(f)

    setProgress(0)

  }

  function drop(
    e: React.DragEvent<HTMLDivElement>,
  ) {

    e.preventDefault()

    setDragging(false)

    const f =
      e.dataTransfer.files?.[0]

    if (!f)
      return

    choose(f)

  }

  async function upload() {

    if (!row || !file)
      return

    const reader =
      new FileReader()

    reader.onload = () => {

      let p = 0

      const timer =
        window.setInterval(() => {

          p += 10

          setProgress(p)

          if (p >= 100) {

            clearInterval(timer)

            onSave(row, {
              name: file.name,
              data:
                reader.result as string,
            })

            onClose()

          }

        }, 40)

    }

    reader.readAsDataURL(file)

  }

  return (

    <Dialog
      open={open}
      onOpenChange={onClose}
    >

      <DialogContent
        className="
          max-w-2xl
          rounded-2xl
          p-0
          overflow-hidden
        "
      >

        {/* ================= HEADER ================= */}

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

              Upload Dokumen Audit

            </DialogTitle>

            <DialogDescription>

              Upload laporan audit,
              evidence, KKA,
              spreadsheet ataupun
              dokumen pendukung.

            </DialogDescription>

          </DialogHeader>

        </div>

        {/* ================= BODY ================= */}

        <div
          className="
            space-y-8
            p-8
          "
        >
                  {/* ====================================== */}
          {/* DRAG & DROP AREA */}
          {/* ====================================== */}

          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={drop}
            className={`
              rounded-2xl
              border-2
              border-dashed
              p-10
              transition-all
              duration-200
              text-center
              cursor-pointer
              ${
                dragging
                  ? "border-primary bg-primary/5"
                  : "border-slate-300 hover:border-primary hover:bg-slate-50"
              }
            `}
          >

            <div className="flex justify-center">
              {icon}
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              {file
                ? "File Siap Diunggah"
                : "Drag & Drop File di Sini"}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              atau klik tombol di bawah untuk memilih file
            </p>

            <input
              id="audit-upload"
              hidden
              type="file"
              accept={ACCEPT.join(",")}
              onChange={(e) => {

                const f =
                  e.target.files?.[0]

                if (!f) return

                choose(f)

              }}
            />

            <Button
              type="button"
              className="mt-6"
              variant="outline"
              onClick={() =>
                document
                  .getElementById("audit-upload")
                  ?.click()
              }
            >

              Pilih File

            </Button>

            <div className="mt-5 text-xs text-slate-500">

              PDF • DOCX • XLSX • ZIP • JPG • PNG

              <br />

              Maksimal 50 MB

            </div>

          </div>

          {/* ====================================== */}
          {/* ERROR */}
          {/* ====================================== */}

          {error && (

            <div
              className="
                rounded-xl
                border
                border-red-200
                bg-red-50
                p-4
              "
            >

              <div className="flex items-center gap-3">

                <XCircle
                  className="
                    h-5
                    w-5
                    text-red-500
                  "
                />

                <span className="text-sm font-medium text-red-700">

                  {error}

                </span>

              </div>

            </div>

          )}

          {/* ====================================== */}
          {/* PREVIEW FILE */}
          {/* ====================================== */}

          {file && (

            <div
              className="
                rounded-xl
                border
                bg-slate-50
                p-5
              "
            >

              <div className="flex items-center gap-4">

                {icon}

                <div className="flex-1">

                  <p className="font-semibold">

                    {file.name}

                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">

                    {(file.size / 1024 / 1024).toFixed(2)} MB

                  </p>

                </div>

                <CheckCircle2
                  className="
                    h-6
                    w-6
                    text-emerald-500
                  "
                />

              </div>

            </div>

          )}

          {/* ====================================== */}
          {/* PROGRESS */}
          {/* ====================================== */}

          {progress > 0 && (

            <div className="space-y-3">

              <div className="flex justify-between text-sm">

                <span>

                  Mengunggah...

                </span>

                <span>

                  {progress}%

                </span>

              </div>

              <Progress value={progress} />

            </div>

          )}
                    {/* ====================================== */}
          {/* ACTION BUTTON */}
          {/* ====================================== */}

          <div className="flex flex-col-reverse gap-3 border-t pt-6 md:flex-row md:items-center md:justify-between">

            <div className="text-xs text-slate-500">

              Dokumen akan dihubungkan dengan audit yang dipilih.
              Pastikan file yang diunggah merupakan versi final atau
              dokumen pendukung yang valid.

            </div>

            <div className="flex gap-3">

              <Button
                variant="outline"
                onClick={onClose}
              >
                Batal
              </Button>

              <Button
                disabled={!file}
                onClick={upload}
                className="min-w-[170px]"
              >
                <UploadCloud className="mr-2 h-4 w-4" />

                {progress > 0
                  ? "Mengunggah..."
                  : "Upload Dokumen"}

              </Button>

            </div>

          </div>

        </div>

      </DialogContent>

    </Dialog>

  )

}
