"use client"

import { useState } from "react"
import { Film, Package, Search, Gamepad2, User, Monitor } from "lucide-react"
import QuizContent from "@/src/components/pages/quiz"

const ACTIVE   = "#00d084"
const INACTIVE = "rgba(255,255,255,0.45)"
const NAV_BG   = "#131f2e"

const TABS = [
  { value: "home",     label: "Кино",  Icon: Film     },
  { value: "svod",     label: "Багц",  Icon: Package  },
  { value: "search",   label: "Хайх",  Icon: Search   },
  { value: "tv",       label: "TV",    Icon: Monitor  },
  { value: "quiz",     label: "Quiz",  Icon: Gamepad2 },
  { value: "settings", label: "Миний", Icon: User     },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState("quiz")
  const ic = (tab: string) => activeTab === tab ? ACTIVE : INACTIVE

  return (
    <div
      className="flex flex-col"
      style={{
        backgroundColor: "#0d1b2e",
        // Fill exact viewport — no scroll, no white gaps
        width: "100vw",
        height: "100dvh",        // dvh accounts for mobile browser chrome
        overflow: "hidden",
        // On desktop: center a phone-width column
        maxWidth: 430,
        margin: "0 auto",
      }}
    >
      {/* ── Page content ── */}
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        {activeTab === "quiz"     && <QuizContent />}
        {activeTab === "home"     && <PlaceholderPage label="Кино" />}
        {activeTab === "svod"     && <PlaceholderPage label="Багц" />}
        {activeTab === "search"   && <PlaceholderPage label="Хайх" />}
        {activeTab === "tv"       && <PlaceholderPage label="TV" />}
        {activeTab === "settings" && <PlaceholderPage label="Миний" />}
      </div>

      {/* ── Bottom nav bar ── */}
      <div
        style={{
          backgroundColor: "#0d1b2e",
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 8,
          // Sit above home indicator on iOS/Android
          paddingBottom: "max(12px, env(safe-area-inset-bottom))",
          flexShrink: 0,
        }}
      >
        <div
          className="flex flex-row rounded-2xl shadow-xl mx-auto"
          style={{ backgroundColor: NAV_BG, width: "100%" }}
        >
          {TABS.map(({ value, label, Icon }) => (
            <button
              key={value}
              onClick={() => setActiveTab(value)}
              className="flex flex-1 flex-col items-center py-2 gap-0.5 rounded-2xl transition-colors"
              style={{
                backgroundColor: activeTab === value ? "rgba(255,255,255,0.07)" : "transparent",
              }}
            >
              <Icon size={18} color={ic(value)} />
              <span className="text-[10px] font-medium" style={{ color: ic(value) }}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const PlaceholderPage = ({ label }: { label: string }) => (
  <div className="flex items-center justify-center" style={{ height: "100%" }}>
    <span className="text-white/30 text-sm">{label} — coming soon</span>
  </div>
)