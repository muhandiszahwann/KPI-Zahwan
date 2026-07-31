"use client"

import React from "react"

import { AuditRow, STATUS_STYLES } from "@/lib/audit-data"

import {
    Card,
    CardContent,
} from "@/components/ui/card"

import {
    Badge
} from "@/components/ui/badge"

import {
    Button
} from "@/components/ui/button"

import {
    CalendarDays,
    User,
    FileText,
    Eye,
    Pencil,
    Upload,
    Trash2,
    CheckCircle2,
    Clock3,
    PauseCircle,
    CircleDashed,
} from "lucide-react"

interface AuditCardProps {
    row: AuditRow

    onDetail: (row: AuditRow) => void

    onEdit: (row: AuditRow) => void

    onUpload: (row: AuditRow) => void

    onDelete: (row: AuditRow) => void
}

function getProgress(status: AuditRow["status"]) {

    switch (status) {

        case "Selesai":
            return 100

        case "Sedang Berjalan":
            return 60

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
            return (
                <CheckCircle2 className="h-4 w-4" />
            )

        case "Sedang Berjalan":
            return (
                <Clock3 className="h-4 w-4" />
            )

        case "Tertunda":
            return (
                <PauseCircle className="h-4 w-4" />
            )

        default:
            return (
                <CircleDashed className="h-4 w-4" />
            )
    }

}

export function AuditCard({

    row,

    onDetail,

    onEdit,

    onUpload,

    onDelete,

}: AuditCardProps) {

    const style = STATUS_STYLES[row.status]

    const progress = getProgress(row.status)

    return (

        <Card
            className="
                rounded-2xl
                border
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
                hover:border-primary/40
            "
        >

            <CardContent className="p-6">

                {/* ================= HEADER ================= */}

                <div className="flex items-start justify-between gap-4">

                    <div className="space-y-2 flex-1">

                        <div className="flex items-center gap-2">

                            <div
                                className={`
                                    h-2.5
                                    w-2.5
                                    rounded-full
                                    ${style.dot}
                                `}
                            />

                            <span
                                className="
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-wider
                                    text-muted-foreground
                                "
                            >
                                Audit #{row.no}
                            </span>

                        </div>

                        <h3
                            className="
                                text-lg
                                font-semibold
                                leading-7
                                text-foreground
                            "
                        >
                            {row.kegiatan}
                        </h3>

                    </div>

                    <Badge
                        className={`
                            ${style.badge}
                            whitespace-nowrap
                            px-3
                            py-1
                            rounded-full
                            font-medium
                        `}
                    >

                        <span className="mr-1">
                            {StatusIcon(row.status)}
                        </span>

                        {row.status}

                    </Badge>

                </div>

                {/* ================= INFORMASI ================= */}

                <div className="mt-6 grid gap-4 md:grid-cols-2">

                    <div className="flex items-center gap-3">

                        <CalendarDays
                            className="
                                h-5
                                w-5
                                text-slate-500
                            "
                        />

                        <div>

                            <p
                                className="
                                    text-xs
                                    uppercase
                                    text-muted-foreground
                                "
                            >
                                Periode Audit
                            </p>

                            <p
                                className="
                                    text-sm
                                    font-medium
                                "
                            >
                                {row.tanggalMulai}
                                {"  "}
                                —
                                {"  "}
                                {row.tanggalSelesai}
                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        <User
                            className="
                                h-5
                                w-5
                                text-slate-500
                            "
                        />

                        <div>

                            <p
                                className="
                                    text-xs
                                    uppercase
                                    text-muted-foreground
                                "
                            >
                                Auditor
                            </p>

                            <p
                                className="
                                    text-sm
                                    font-medium
                                "
                            >
                                {row.auditor}
                            </p>

                        </div>

                    </div>

                </div>
                              {/* ================= PROGRESS ================= */}

                <div className="mt-6 space-y-3">

                    <div className="flex items-center justify-between">

                        <span
                            className="
                                text-sm
                                font-medium
                                text-slate-700
                            "
                        >
                            Progress Audit
                        </span>

                        <span
                            className="
                                text-sm
                                font-bold
                                text-primary
                            "
                        >
                            {progress}%
                        </span>

                    </div>

                    <div
                        className="
                            h-2.5
                            overflow-hidden
                            rounded-full
                            bg-slate-200
                        "
                    >

                        <div
                            className="
                                h-full
                                rounded-full
                                bg-primary
                                transition-all
                                duration-700
                            "
                            style={{
                                width: `${progress}%`,
                            }}
                        />

                    </div>

                </div>

                {/* ================= KETERANGAN ================= */}

                <div className="mt-6 rounded-xl border bg-slate-50 p-4">

                    <div className="mb-2 flex items-center gap-2">

                        <FileText
                            className="
                                h-4
                                w-4
                                text-slate-500
                            "
                        />

                        <span
                            className="
                                text-sm
                                font-semibold
                            "
                        >
                            Keterangan Audit
                        </span>

                    </div>

                    <p
                        className="
                            text-sm
                            leading-6
                            text-muted-foreground
                        "
                    >
                        {row.keterangan || "-"}
                    </p>

                </div>

                {/* ================= DOKUMEN ================= */}

                <div className="mt-6">

                    <div className="flex items-center justify-between">

                        <span
                            className="
                                text-sm
                                font-semibold
                            "
                        >
                            Dokumen Audit
                        </span>

                        {row.berkas ? (

                            <Badge
                                className="
                                    bg-emerald-50
                                    text-emerald-700
                                "
                            >
                                Berkas Terlampir
                            </Badge>

                        ) : (

                            <Badge
                                variant="secondary"
                            >
                                Belum Ada
                            </Badge>

                        )}

                    </div>

                    {row.berkas && (

                        <div
                            className="
                                mt-3
                                rounded-lg
                                border
                                bg-white
                                p-3
                            "
                        >

                            <p
                                className="
                                    text-sm
                                    font-medium
                                "
                            >
                                {row.berkas.name}
                            </p>

                        </div>

                    )}

                    {!row.berkas && row.laporan && (

                        <div
                            className="
                                mt-3
                                rounded-lg
                                border
                                bg-white
                                p-3
                            "
                        >

                            <a
                                href={row.laporan}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    text-sm
                                    text-primary
                                    underline
                                    underline-offset-2
                                "
                            >
                                Lihat Laporan Audit
                            </a>

                        </div>

                    )}

                </div>

                {/* ================= ACTION ================= */}

                <div
                    className="
                        mt-8
                        flex
                        flex-wrap
                        items-center
                        justify-end
                        gap-2
                        border-t
                        pt-5
                    "
                >
                                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDetail(row)}
                        className="
                            flex-1
                            min-w-[120px]
                            gap-2
                            rounded-lg
                        "
                    >
                        <Eye className="h-4 w-4" />
                        Detail
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(row)}
                        className="
                            flex-1
                            min-w-[120px]
                            gap-2
                            rounded-lg
                        "
                    >
                        <Pencil className="h-4 w-4" />
                        Edit
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpload(row)}
                        className="
                            flex-1
                            min-w-[120px]
                            gap-2
                            rounded-lg
                        "
                    >
                        <Upload className="h-4 w-4" />
                        Upload
                    </Button>

                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onDelete(row)}
                        className="
                            flex-1
                            min-w-[120px]
                            gap-2
                            rounded-lg
                        "
                    >
                        <Trash2 className="h-4 w-4" />
                        Hapus
                    </Button>

                </div>

            </CardContent>

        </Card>

    )

}
