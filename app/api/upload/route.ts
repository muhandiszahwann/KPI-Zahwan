"use client"

import React, {
  useEffect,
  useMemo,
  useState,
} from "react"

import {
  AuditRow,
  AuditFile,
  formatFileSize,
} from "@/lib/audit-data"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
    file: AuditFile,
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

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState("")

  useEffect(() => {

    if (!open) {

      setDragging(false)

      setFile(null)

      setProgress(0)

      setLoading(false)

      setError("")

    }

  }, [open])

  const icon = useMemo(() => {

    if (!file)

      return (
        <UploadCloud
          className="
            h-16
            w-16
            text-slate-400
          "
        />

      )

    const ext = file.name
      .split(".")
      .pop()
      ?.toLowerCase()

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
          <FileArchive className="h-16 w-16 text-yellow-500" />
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

  function validate(file: File) {

    if (file.size > MAX_FILE_SIZE) {

      setError(
        "Ukuran file maksimal 50 MB."
      )

      return false

    }

    const ext =
      "." +
      file.name
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

  function choose(file: File) {

    if (!validate(file))
      return

    setFile(file)

    setProgress(0)

  }

  function drop(
    e: React.DragEvent<HTMLDivElement>,
  ) {

    e.preventDefault()

    setDragging(false)

    const file =
      e.dataTransfer.files?.[0]

    if (!file) return

    choose(file)

  }

  async function upload() {

    if (!row || !file) return

    try {

      setLoading(true)

      setProgress(10)

      const formData =
        new FormData()

      formData.append(
        "file",
        file,
      )

      const response =
        await fetch(
          "/api/upload",
          {
            method: "POST",
            body: formData,
          },
        )

      setProgress(70)

      if (!response.ok) {

        throw new Error(
          "Upload gagal",
        )

      }

      const uploaded =
        await response.json()

      setProgress(100)

      onSave(row, uploaded)

      setTimeout(() => {

        setLoading(false)

        setProgress(0)

        setFile(null)

        onClose()

      }, 300)

    } catch (err) {

      console.error(err)

      setLoading(false)

      setProgress(0)

      setError(
        "Gagal mengunggah file."
      )

    }

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
              evidence,
              spreadsheet,
              maupun dokumen pendukung.

            </DialogDescription>

          </DialogHeader>

        </div>

        <div className="space-y-8 p-8">
                  {/* ====================================== */}
        {/* DRAG & DROP */}
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

          <h3 className="mt-6 text-xl font-semibold">

            {file
              ? "File Siap Diunggah"
              : "Drag & Drop Dokumen Audit"}

          </h3>

          <p className="mt-2 text-sm text-slate-500">

            atau klik tombol di bawah untuk memilih file dari komputer

          </p>

          <input
            id="audit-file-input"
            hidden
            type="file"
            accept={ACCEPT.join(",")}
            onChange={(e) => {

              const selected =
                e.target.files?.[0]

              if (!selected) return

              choose(selected)

            }}
          />

          <Button
            type="button"
            variant="outline"
            className="mt-6"
            onClick={() =>
              document
                .getElementById("audit-file-input")
                ?.click()
            }
          >

            <UploadCloud className="mr-2 h-4 w-4" />

            Pilih File

          </Button>

          <div className="mt-5 text-xs text-slate-500">

            Format:

            PDF • DOC • DOCX • XLS • XLSX • ZIP • JPG • PNG

          </div>

          <div className="mt-1 text-xs text-slate-400">

            Maksimal ukuran file 50 MB

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

              <span className="text-sm text-red-700">

                {error}

              </span>

            </div>

          </div>

        )}

        {/* ====================================== */}
        {/* FILE PREVIEW */}
        {/* ====================================== */}

        {file && (

          <div
            className="
              rounded-2xl
              border
              bg-white
              p-5
              shadow-sm
            "
          >

            <div className="flex items-center gap-5">

              {icon}

              <div className="flex-1">

                <h4 className="font-semibold">

                  {file.name}

                </h4>

                <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">

                  <span>

                    Ukuran :

                    {" "}

                    {formatFileSize(file.size)}

                  </span>

                  <span>

                    Type :

                    {" "}

                    {file.type || "-"}

                  </span>

                  <span>

                    Terakhir diubah :

                    {" "}

                    {new Date(
                      file.lastModified,
                    ).toLocaleString("id-ID")}

                  </span>

                </div>

              </div>

              <CheckCircle2
                className="
                  h-7
                  w-7
                  text-green-600
                "
              />

            </div>

          </div>

        )}

        {/* ====================================== */}
        {/* PROGRESS */}
        {/* ====================================== */}

        {loading && (

          <div className="space-y-3">

            <div className="flex justify-between text-sm">

              <span>

                Uploading...

              </span>

              <span>

                {progress}%

              </span>

            </div>

            <Progress value={progress} />

          </div>

        )}
        {/* ====================================== */}
        {/* FOOTER */}
        {/* ====================================== */}

        <div className="border-t bg-slate-50 px-8 py-5">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div className="text-sm text-slate-500">

              {file
                ? "Dokumen akan disimpan pada server dan dihubungkan dengan data audit."
                : "Pilih dokumen terlebih dahulu untuk memulai proses upload."}

            </div>

            <div className="flex gap-3">

              <Button
                variant="outline"
                disabled={loading}
                onClick={onClose}
              >
                Batal
              </Button>

              <Button
                disabled={!file || loading}
                onClick={upload}
                className="min-w-[180px]"
              >

                <UploadCloud className="mr-2 h-4 w-4" />

                {loading
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
