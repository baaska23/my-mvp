"use client"

import { useState } from "react"
import { Film, Package, Search, Gamepad2, User, Monitor } from "lucide-react"
import QuizContent from "@/src/components/pages/quiz"

// ── Design tokens ─────────────────────────────────────────────────────────────
const ACTIVE  = "#00d084"
const INACTIVE = "rgba(255,255,255,0.45)"
const NAV_BG  = "#131f2e"

const TABS = [
  { value: "home",     label: "Кино",   Icon: Film     },
  { value: "svod",     label: "Багц",   Icon: Package  },
  { value: "search",   label: "Хайх",   Icon: Search   },
  { value: "tv",       label: "TV",     Icon: Monitor  },
  { value: "quiz",     label: "Quiz",   Icon: Gamepad2 },
  { value: "settings", label: "Миний",  Icon: User     },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState("home")
  const ic = (tab: string) => activeTab === tab ? ACTIVE : INACTIVE

  return (
    // Simulate a phone-sized viewport centered on desktop
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div
        className="relative flex flex-col overflow-hidden"
        style={{ width: 390, height: 844, backgroundColor: "#0d1b2e" }}
      >

        {/* ── Page content ── */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "home" && <PlaceholderPage label="Home" />}
          {activeTab === "quiz" && <QuizContent/>}
          {activeTab === "svod"     && <PlaceholderPage label="Багц" />}
          {activeTab === "search"   && <PlaceholderPage label="Хайх" />}
          {activeTab === "tv"       && <PlaceholderPage label="TV" />}
          {activeTab === "settings" && <PlaceholderPage label="Миний" />}
        </div>

        {/* ── Bottom nav bar ── */}
        <div className="px-4 pb-6 pt-2" style={{ backgroundColor: "#0d1b2e" }}>
          <div
            className="flex flex-row rounded-2xl shadow-xl mx-auto"
            style={{ backgroundColor: NAV_BG, width: "90%" }}
          >
            {TABS.map(({ value, label, Icon }) => (
              <button
                key={value}
                onClick={() => setActiveTab(value)}
                className="flex flex-1 flex-col items-center py-2 gap-0.5 rounded-2xl transition-colors"
                style={{
                  backgroundColor: activeTab === value ? "rgba(255,255,255,0.07)" : "transparent"
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
    </div>
  )
}

// Placeholder for unbuilt tabs
const PlaceholderPage = ({ label }: { label: string }) => (
  <div className="flex flex-1 h-full items-center justify-center">
    <span className="text-white/30 text-sm">{label} — coming soon</span>
  </div>
)