"use client"

import { useEffect, useRef, useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import {
  Bot,
  MessageSquare,
  Send,
  Sparkles,
  X,
  Loader2,
  User,
} from "lucide-react"

type Props = {
  auditContext: string
  year: number
}

const SUGGESTIONS = [
  "Ringkas status audit tahun ini",
  "Kegiatan mana yang berisiko terlambat?",
  "Berapa persen tingkat penyelesaian?",
  "Rekomendasikan prioritas tindak lanjut",
]

export function AiAssistant({ auditContext, year }: Props) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const busy = status === "submitted" || status === "streaming"

  // Auto-scroll ke pesan terbaru.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages, busy])

  const submit = (text: string) => {
    const value = text.trim()
    if (!value || busy) return
    sendMessage({ text: value }, { body: { auditContext } })
    setInput("")
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submit(input)
  }

  return (
    <>
      {/* Tombol mengambang */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Tutup Asisten AI" : "Buka Asisten AI"}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-1 ring-accent/40 transition-transform hover:scale-105 active:scale-95"
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent">
            <Sparkles className="h-2.5 w-2.5 text-accent-foreground" />
          </span>
        )}
      </button>

      {/* Panel chat */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[32rem] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border bg-primary px-4 py-3 text-primary-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Bot className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="font-serif text-sm font-semibold leading-tight">
                Asisten Audit AI
              </p>
              <p className="truncate text-xs text-primary-foreground/70">
                Analisis data periode {year}
              </p>
            </div>
            <span className="ml-auto flex items-center gap-1.5 text-xs text-primary-foreground/70">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Aktif
            </span>
          </div>

          {/* Pesan */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
          >
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="rounded-xl bg-secondary p-3 text-sm text-secondary-foreground">
                  Selamat datang. Saya dapat menganalisis data audit pada tabel
                  di atas. Silakan ajukan pertanyaan atau pilih saran di bawah.
                </div>
                <div className="flex flex-col gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => submit(s)}
                      className="rounded-lg border border-border bg-background px-3 py-2 text-left text-xs text-foreground transition-colors hover:border-accent hover:bg-accent/10"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) => {
              const isUser = m.role === "user"
              const text = m.parts
                .map((p) => (p.type === "text" ? p.text : ""))
                .join("")
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-2 ${
                    isUser ? "flex-row-reverse" : ""
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                      isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent text-accent-foreground"
                    }`}
                  >
                    {isUser ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </span>
                  <div
                    className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      isUser
                        ? "rounded-tr-sm bg-primary text-primary-foreground"
                        : "rounded-tl-sm bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {text || (
                      <span className="italic opacity-70">…</span>
                    )}
                  </div>
                </div>
              )
            })}

            {status === "submitted" && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Menganalisis data audit…
              </div>
            )}

            {error && (
              <div className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
                Terjadi kesalahan saat menghubungi layanan AI. Silakan coba
                lagi.
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={onSubmit}
            className="flex items-center gap-2 border-t border-border bg-card px-3 py-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya tentang data audit…"
              disabled={busy}
              className="min-w-0 flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/30 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Kirim pesan"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
            >
              {busy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </form>
        </div>
      )}
    </>
  )
}
