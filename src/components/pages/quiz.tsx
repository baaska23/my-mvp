"use client"

import { useState } from "react"
import ThisWeekContent from "./quiz/this-week"
import LastWeekContent from "./quiz/last-week"
import LeaderboardScreen from "./quiz/leaderboard"

const TABS = [
  { value: "this-week",   label: "Энэ 7 хоног"      },
  { value: "last-week",   label: "Өнгөрсөн 7 хоног" },
  { value: "leaderboard", label: "Тэргүүлэгчид"      },
]

const QuizContent = () => {
  const [activeTab, setActiveTab] = useState("this-week")
  const [started, setStarted]     = useState(false)

  if (!started) {
    return (
      <div className="flex flex-col flex-1 h-full justify-center items-center px-6" style={{ backgroundColor: "#0d1b2e" }}>
        <p className="text-white text-2xl font-bold mb-3 text-center">
          🎬 Movie Quiz-д тавтай морил
        </p>
        <p className="text-white/50 text-sm text-center mb-10 leading-5">
          Киноны мэдлэгээ шалгаж, бусадтай өрсөл!
        </p>
        <button
          onClick={() => setStarted(true)}
          className="px-12 py-3 rounded-xl text-white font-bold text-base transition-opacity hover:opacity-80"
          style={{ backgroundColor: "#00d084" }}
        >
          Эхлэх
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 h-full" style={{ backgroundColor: "#0d1b2e" }}>

      {/* ── Tab bar ── */}
      <div className="flex flex-row rounded-2xl mx-4 mt-4 mb-1" style={{ backgroundColor: "#131f2e" }}>
        {TABS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setActiveTab(value)}
            className="flex-1 py-2.5 text-xs font-semibold rounded-2xl transition-colors"
            style={{
              color: "white",
              backgroundColor: activeTab === value ? "rgba(255,255,255,0.1)" : "transparent",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {activeTab === "this-week"   && <ThisWeekContent />}
        {activeTab === "last-week"   && <LastWeekContent />}
        {activeTab === "leaderboard" && <LeaderboardScreen />}
      </div>

    </div>
  )
}

export default QuizContent