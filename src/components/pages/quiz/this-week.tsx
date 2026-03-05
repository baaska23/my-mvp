"use client"

import { useState } from "react"

const GREEN = "#00d084"
const BG    = "#0d1b2e"
const CARD  = "#131f2e"
const MUTED = "rgba(255,255,255,0.45)"

const questions = [
  { question: "2023 онд шилдэг кино шагнал хэн авсан бэ?",  answers: ["Oppenheimer", "Barbie", "Avatar", "Dune"],               correct: 0 },
  { question: "Titanic киног хэн найруулсан бэ?",            answers: ["Жэймс Камерон", "Спилберг", "Нолан", "Скорсезе"],        correct: 0 },
  { question: "Joker дүр аль киноны гол дүр вэ?",            answers: ["Batman", "Superman", "Flash", "Thor"],                   correct: 0 },
  { question: "Formula 1-ийн тухай аль кино вэ?",            answers: ["Rush", "Cars", "Speed", "Drive"],                        correct: 0 },
  { question: "Оскарын цом ямар материалаар хийгдсэн бэ?",   answers: ["Алттай бүрсэн хүрэл", "Мөнгө", "Төмөр", "Ган"],         correct: 0 },
]

const infoItems = [
  { value: "rules", trigger: "🎯 Дүрэм",  content: "5 асуулт. Хамгийн өндөр оноо ялна." },
  { value: "prize", trigger: "🏆 Шагнал", content: "Кино үзэх эрхийн бэлгэ олгоно 🎬"  },
]

const movies = [
  { src: "/sinners.png", label: "Sinners"  },
  { src: "/formula.png", label: "Formula"  },
  { src: "/marty.png",   label: "Marty"    },
]

export default function ThisWeekContent() {
  const [screen, setScreen]   = useState<"main" | "info" | "quiz" | "result">("main")
  const [current, setCurrent] = useState(0)
  const [score, setScore]     = useState(0)
  const [chosen, setChosen]   = useState<number | null>(null)
  const [openInfo, setOpenInfo] = useState<string | null>(null)

  const handleAnswer = (i: number) => {
    if (chosen !== null) return
    setChosen(i)
    if (i === questions[current].correct) setScore(p => p + 1)
    setTimeout(() => {
      setChosen(null)
      if (current + 1 < questions.length) setCurrent(p => p + 1)
      else setScreen("result")
    }, 700)
  }

  const resetQuiz = () => { setCurrent(0); setScore(0); setChosen(null); setScreen("main") }

  // ── INFO ────────────────────────────────────────────────────────────────
  if (screen === "info") return (
    <div className="flex flex-col flex-1 px-4 pt-6" style={{ backgroundColor: BG }}>
      <p className="text-white text-lg font-bold mb-5">Movie Quiz — Мэдээлэл</p>

      <div className="flex flex-col gap-2 mb-8">
        {infoItems.map(item => (
          <div key={item.value} className="rounded-xl overflow-hidden" style={{ backgroundColor: CARD }}>
            <button
              onClick={() => setOpenInfo(openInfo === item.value ? null : item.value)}
              className="w-full flex justify-between items-center px-4 py-3 text-left"
            >
              <span className="text-white font-semibold">{item.trigger}</span>
              <span className="text-white/40 text-xs">{openInfo === item.value ? "▲" : "▼"}</span>
            </button>
            {openInfo === item.value && (
              <div className="px-4 pb-3">
                <p className="text-sm" style={{ color: MUTED }}>{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => setScreen("quiz")}
        className="w-full py-3.5 rounded-xl text-white font-bold text-sm mb-3 hover:opacity-80 transition-opacity"
        style={{ backgroundColor: GREEN }}
      >
        Quiz эхлүүлэх
      </button>
      <button
        onClick={() => setScreen("main")}
        className="w-full py-3 rounded-xl text-sm border border-white/20 hover:bg-white/5 transition-colors"
        style={{ color: "rgba(255,255,255,0.7)" }}
      >
        Буцах
      </button>
    </div>
  )

  // ── QUIZ ────────────────────────────────────────────────────────────────
  if (screen === "quiz") {
    const pct = ((current + 1) / questions.length) * 100

    return (
      <div className="flex flex-col flex-1 px-4 pt-6" style={{ backgroundColor: BG }}>
        {/* Progress */}
        <div className="w-full h-2 rounded-full mb-1 overflow-hidden" style={{ backgroundColor: CARD }}>
          <div className="h-2 rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, backgroundColor: GREEN }} />
        </div>
        <p className="text-right text-xs mb-6" style={{ color: MUTED }}>
          {current + 1} / {questions.length}
        </p>

        {/* Question */}
        <div className="rounded-2xl p-5 mb-6" style={{ backgroundColor: CARD }}>
          <p className="text-white text-base font-semibold text-center leading-6">
            {questions[current].question}
          </p>
        </div>

        {/* Answers */}
        <div className="flex flex-col gap-3">
          {questions[current].answers.map((ans, i) => {
            const isCorrect = i === questions[current].correct
            const isChosen  = i === chosen
            let bg = CARD
            if (chosen !== null && isCorrect) bg = GREEN
            if (isChosen && !isCorrect)       bg = "#c0392b"

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="w-full py-4 rounded-xl text-white font-semibold text-sm transition-colors"
                style={{ backgroundColor: bg }}
              >
                {ans}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // ── RESULT ──────────────────────────────────────────────────────────────
  if (screen === "result") {
    const pct = Math.round((score / questions.length) * 100)

    return (
      <div className="flex flex-col flex-1 justify-center items-center px-6" style={{ backgroundColor: BG }}>
        {/* Score ring */}
        <div
          className="w-36 h-36 rounded-full flex flex-col justify-center items-center mb-6 border-4"
          style={{ borderColor: GREEN, backgroundColor: CARD }}
        >
          <span className="text-white text-4xl font-bold">{score}/{questions.length}</span>
          <span className="text-xs mt-1" style={{ color: GREEN }}>{pct}%</span>
        </div>

        <p className="text-white text-xl font-bold mb-1">
          {pct >= 80 ? "Гайхалтай! 🎉" : pct >= 50 ? "Муу биш! 👍" : "Дахин оролдоорой 💪"}
        </p>
        <p className="text-sm mb-8 text-center" style={{ color: MUTED }}>
          {score} зөв хариулт өгсөн
        </p>

        <button
          className="px-10 py-3.5 rounded-xl text-white font-bold text-sm mb-3 hover:opacity-80 transition-opacity"
          style={{ backgroundColor: GREEN }}
        >
          Хуваалцах
        </button>
        <button
          onClick={resetQuiz}
          className="px-10 py-3.5 rounded-xl text-sm border border-white/20 hover:bg-white/5 transition-colors"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          Нүүр хуудас руу буцах
        </button>
      </div>
    )
  }

  // ── MAIN ────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col flex-1 px-4 pt-5" style={{ backgroundColor: BG }}>
      <p className="text-white font-bold text-base mb-3">Оскарын шагналт бүтээлүүд</p>

      {/* Banner */}
      <img
        src="/oscar-banner.png"
        alt="Oscar banner"
        className="w-full h-40 rounded-2xl mb-5 object-cover"
      />

      {/* Movie cards */}
      <div className="flex flex-row gap-3 mb-5">
        {movies.map((m, i) => (
          <div key={i} className="flex flex-col flex-1 rounded-2xl overflow-hidden" style={{ backgroundColor: CARD }}>
            <img src={m.src} alt={m.label} className="w-full h-24 object-cover" />
            <button className="mx-2 my-2 py-2 rounded-lg text-white text-xs font-semibold border border-white/25 hover:bg-white/5 transition-colors">
              Түрээслэх
            </button>
          </div>
        ))}
      </div>

      {/* CTA buttons */}
      <button
        onClick={() => setScreen("info")}
        className="w-full py-3.5 rounded-xl text-white text-sm font-semibold mb-3 border border-white/20 hover:bg-white/5 transition-colors"
      >
        Ерөнхий мэдээлэл
      </button>
      <button
        onClick={() => setScreen("quiz")}
        className="w-full py-3.5 rounded-xl text-white font-bold text-sm hover:opacity-80 transition-opacity"
        style={{ backgroundColor: GREEN }}
      >
        Quiz эхлүүлэх
      </button>
    </div>
  )
}