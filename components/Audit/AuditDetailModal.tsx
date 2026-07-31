"use client"

import React from "react"

import {
    AuditRow,
    STATUS_STYLES,
} from "@/lib/audit-data"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"

import { Badge } from "@/components/ui/badge"

import { Button } from "@/components/ui/button"

import {

    CalendarDays,

    User,

    FileText,

    FolderOpen,

    CheckCircle2,

    Clock3,

    PauseCircle,

    CircleDashed,

    Pencil,

    Upload,

    ExternalLink,

} from "lucide-react"

interface AuditDetailModalProps {

    open: boolean

    row: AuditRow | null

    onClose: () => void

    onEdit: (row: AuditRow) => void

    onUpload: (row: AuditRow) => void

}

function getProgress(status: AuditRow["status"]) {

    switch (status) {

        case "Selesai":
            return 100

        case "Sedang Berjalan":
            return 65

        case "Tertunda":
            return 30

        case "Belum Mulai":
            return 0

        default:
            return 0

    }

}

function StatusIcon(status: AuditRow["status"]) {

    switch (status) {

        case "Selesai":
            return <CheckCircle2 className="h-4 w-4" />

        case "Sedang Berjalan":
            return <Clock3 className="h-4 w-4" />

        case "Tertunda":
            return <PauseCircle className="h-4 w-4" />

        default:
            return <CircleDashed className="h-4 w-4" />

    }

}

export function AuditDetailModal({

    open,

    row,

    onClose,

    onEdit,

    onUpload,

}: AuditDetailModalProps) {

    if (!row) return null

    const style = STATUS_STYLES[row.status]

    const progress = getProgress(row.status)

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

                {/* ================================================= */}

                {/* HEADER */}

                {/* ================================================= */}

                <div
                    className="
                        border-b
                        bg-slate-50
                        px-8
                        py-6
                    "
                >

                    <DialogHeader>

                        <div
                            className="
                                flex
                                items-start
                                justify-between
                                gap-6
                            "
                        >

                            <div
                                className="space-y-2"
                            >

                                <DialogTitle
                                    className="
                                        text-2xl
                                        font-bold
                                        leading-8
                                    "
                                >

                                    {row.kegiatan}

                                </DialogTitle>

                                <DialogDescription>

                                    Audit Nomor

                                    {" "}

                                    <span className="font-semibold">

                                        #{row.no}

                                    </span>

                                </DialogDescription>

                            </div>

                            <Badge
                                className={`
                                    ${style.badge}
                                    px-4
                                    py-2
                                    rounded-full
                                    text-sm
                                `}
                            >

                                <span className="mr-2">

                                    {StatusIcon(row.status)}

                                </span>

                                {row.status}

                            </Badge>

                        </div>

                    </DialogHeader>

                </div>

                {/* ================================================= */}

                {/* CONTENT */}

                {/* ================================================= */}

                <div
                    className="
                        p-8
                        space-y-8
                    "
                >
                                      {/* ================================================= */}

                    {/* INFORMASI AUDIT */}

                    {/* ================================================= */}

                    <div className="grid gap-6 md:grid-cols-2">

                        <div className="rounded-xl border bg-white p-5">

                            <div className="mb-4 flex items-center gap-2">

                                <CalendarDays className="h-5 w-5 text-primary" />

                                <h4 className="font-semibold">
                                    Informasi Audit
                                </h4>

                            </div>

                            <div className="space-y-4 text-sm">

                                <div className="flex justify-between">

                                    <span className="text-muted-foreground">
                                        Nomor Audit
                                    </span>

                                    <span className="font-medium">
                                        #{row.no}
                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span className="text-muted-foreground">
                                        Auditor
                                    </span>

                                    <span className="font-medium">
                                        {row.auditor}
                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span className="text-muted-foreground">
                                        Tanggal Mulai
                                    </span>

                                    <span className="font-medium">
                                        {row.tanggalMulai}
                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span className="text-muted-foreground">
                                        Tanggal Selesai
                                    </span>

                                    <span className="font-medium">
                                        {row.tanggalSelesai}
                                    </span>

                                </div>

                            </div>

                        </div>

                        <div className="rounded-xl border bg-white p-5">

                            <div className="mb-4 flex items-center gap-2">

                                <User className="h-5 w-5 text-primary" />

                                <h4 className="font-semibold">
                                    Progress Audit
                                </h4>

                            </div>

                            <div className="space-y-3">

                                <div className="flex items-center justify-between">

                                    <span className="text-sm text-muted-foreground">
                                        Penyelesaian
                                    </span>

                                    <span className="text-lg font-bold text-primary">
                                        {progress}%
                                    </span>

                                </div>

                                <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                                    <div
                                        className="h-full rounded-full bg-primary transition-all duration-700"
                                        style={{
                                            width: `${progress}%`,
                                        }}
                                    />

                                </div>

                                <p className="text-xs text-muted-foreground">

                                    Progress dihitung berdasarkan status audit
                                    saat ini.

                                </p>

                            </div>

                        </div>

                    </div>

                    {/* ================================================= */}

                    {/* KETERANGAN */}

                    {/* ================================================= */}

                    <div className="rounded-xl border bg-slate-50 p-6">

                        <div className="mb-4 flex items-center gap-2">

                            <FileText className="h-5 w-5 text-primary" />

                            <h4 className="font-semibold">

                                Keterangan Audit

                            </h4>

                        </div>

                        <p className="leading-7 text-muted-foreground">

                            {row.keterangan || "-"}

                        </p>

                    </div>

                    {/* ================================================= */}

                    {/* DOKUMEN */}

                    {/* ================================================= */}

                    <div className="rounded-xl border bg-white p-6">

                        <div className="mb-5 flex items-center gap-2">

                            <FolderOpen className="h-5 w-5 text-primary" />

                            <h4 className="font-semibold">

                                Dokumen Audit

                            </h4>

                        </div>

                        {row.berkas ? (

                            <div className="rounded-lg border bg-slate-50 p-4">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="font-medium">

                                            {row.berkas.name}

                                        </p>

                                        <p className="mt-1 text-sm text-muted-foreground">

                                            Dokumen berhasil diunggah.

                                        </p>

                                    </div>

                                    <Badge
                                        className="
                                            bg-emerald-50
                                            text-emerald-700
                                        "
                                    >
                                        Terlampir
                                    </Badge>

                                </div>

                            </div>

                        ) : (

                            <div className="rounded-lg border border-dashed p-6 text-center">

                                <Upload className="mx-auto mb-3 h-8 w-8 text-slate-400" />

                                <p className="font-medium">

                                    Belum ada dokumen yang diunggah

                                </p>

                                <p className="mt-1 text-sm text-muted-foreground">

                                    Upload laporan audit, KKA, evidence,
                                    ataupun dokumen pendukung.

                                </p>

                            </div>

                        )}

                        {row.laporan && (

                            <div className="mt-5">

                                <a
                                    href={row.laporan}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        text-sm
                                        font-medium
                                        text-primary
                                        hover:underline
                                    "
                                >

                                    <ExternalLink className="h-4 w-4" />

                                    Buka Link Laporan Audit

                                </a>

                            </div>

                        )}
                                          {/* ================================================= */}

                    {/* FOOTER ACTION */}

                    {/* ================================================= */}

                    <div className="flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between">

                        <div className="text-sm text-muted-foreground">

                            Terakhir diperbarui berdasarkan data audit yang
                            tersimpan pada sistem.

                        </div>

                        <div className="flex flex-wrap gap-3">

                            <Button
                                variant="outline"
                                onClick={() => onEdit(row)}
                                className="gap-2"
                            >
                                <Pencil className="h-4 w-4" />
                                Edit Audit
                            </Button>

                            <Button
                                onClick={() => onUpload(row)}
                                className="gap-2"
                            >
                                <Upload className="h-4 w-4" />
                                Upload Dokumen
                            </Button>

                            <Button
                                variant="secondary"
                                onClick={onClose}
                            >
                                Tutup
                            </Button>

                        </div>

                    </div>

                </div>

            </DialogContent>

        </Dialog>

    )

}
                  
