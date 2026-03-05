"use client"

import { useState } from "react"

const BG   = "#0d1b2e"
const CARD = "#131f2e"
const MUTED = "rgba(255,255,255,0.45)"

const questions = [
  { question: "Зул сарын хамгийн алдартай кино юу вэ?",  answer: "Home Alone" },
  { question: "Home Alone киног хэн найруулав?",          answer: "Chris Columbus" },
  { question: "Elf киноны гол дүрийг хэн тоглосон бэ?",   answer: "Will Ferrell" },
  { question: "Die Hard нь Зул сарын кино мөн үү?",       answer: "Маргаантай, гэхдээ олон хүн тийм гэдэг 😄" },
  { question: "Home Alone хэдэн онд гарсан бэ?",          answer: "1990 он" },
]

const LastWeekContent = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <div className="flex flex-col flex-1 px-4 pt-5" style={{ backgroundColor: BG }}>
      <p className="text-white text-lg font-bold mb-4">Өнгөрсөн долоо хоног</p>

      {/* Banner image */}
      <img
        src="/xmas-banner.png"
        alt="Christmas banner"
        className="w-full h-40 rounded-2xl mb-4 object-cover"
      />

      <p className="text-white font-bold text-sm mb-3">
        Зул сарын кинонууд — Асуулт & Хариулт
      </p>

      {/* Accordion */}
      <div className="flex flex-col gap-2">
        {questions.map((q, i) => (
          <div key={i} className="rounded-xl overflow-hidden" style={{ backgroundColor: CARD }}>
            {/* Trigger */}
            <button
              onClick={() => toggle(i)}
              className="w-full flex flex-row justify-between items-center px-4 py-3 text-left"
            >
              <span className="text-white font-semibold text-sm flex-1">{q.question}</span>
              <span className="text-white/40 text-xs ml-2">
                {openIndex === i ? "▲" : "▼"}
              </span>
            </button>

            {/* Content */}
            {openIndex === i && (
              <div className="px-4 pb-3">
                <p className="text-sm" style={{ color: MUTED }}>{q.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default LastWeekContent