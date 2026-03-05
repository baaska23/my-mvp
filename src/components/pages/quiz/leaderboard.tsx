"use client"

import { useState } from "react"

const BG = "#0d1b2e"
const CARD = "#131f2e"
const GREEN = "#00d084"
const MUTED = "rgba(255,255,255,0.40)"

type Leader = { place: number; name: string; pts: string; avatar: string }

const globalLeaders: Leader[] = [
    { place: 1, name: "Misheel", pts: "10k pts", avatar: "https://i.pravatar.cc/150?img=47" },
    { place: 2, name: "Norrie", pts: "1.9k pts", avatar: "https://i.pravatar.cc/150?img=12" },
    { place: 3, name: "Tony", pts: "1.2k pts", avatar: "https://i.pravatar.cc/150?img=33" },
    { place: 4, name: "Bhavna M.", pts: "980 pts", avatar: "https://i.pravatar.cc/150?img=5" },
    { place: 5, name: "Robin", pts: "870 pts", avatar: "https://i.pravatar.cc/150?img=8" },
    { place: 6, name: "Taran", pts: "760 pts", avatar: "https://i.pravatar.cc/150?img=15" },
    { place: 7, name: "Mike", pts: "650 pts", avatar: "https://i.pravatar.cc/150?img=20" },
    { place: 8, name: "Andrew", pts: "540 pts", avatar: "https://i.pravatar.cc/150?img=25" },
    { place: 9, name: "William", pts: "430 pts", avatar: "https://i.pravatar.cc/150?img=30" },
]

const friendLeaders: Leader[] = [
    { place: 1, name: "Bold", pts: "3.2k pts", avatar: "https://i.pravatar.cc/150?img=60" },
    { place: 2, name: "Bayraa", pts: "2.8k pts", avatar: "https://i.pravatar.cc/150?img=61" },
    { place: 3, name: "Zaya", pts: "2.1k pts", avatar: "https://i.pravatar.cc/150?img=62" },
    { place: 4, name: "Enkh", pts: "1.9k pts", avatar: "https://i.pravatar.cc/150?img=63" },
    { place: 5, name: "Suvd", pts: "1.4k pts", avatar: "https://i.pravatar.cc/150?img=64" },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
const ringColor = (p: number) => p === 1 ? "#f59e0b" : p === 2 ? "#94a3b8" : "#f97316"
const avatarSize = (p: number) => p === 1 ? 76 : p === 2 ? 60 : 52
const podiumMt = (p: number) => p === 1 ? 0 : p === 2 ? 28 : 44
const rankColor = (p: number) => p === 1 ? "#f59e0b" : p === 2 ? "#94a3b8" : p === 3 ? "#f97316" : MUTED

// ── Podium Card ───────────────────────────────────────────────────────────────
const PodiumCard = ({ item }: { item: Leader }) => (
    <div style={{ alignItems: "center", width: 88, marginTop: podiumMt(item.place) }}
        className="flex flex-col items-center">
        <span style={{ fontSize: 18, marginBottom: 4 }}>👑</span>
        <div style={{
            borderRadius: 999, border: `2.5px solid ${ringColor(item.place)}`,
            padding: 2, marginBottom: 6,
        }}>
            <img
                src={item.avatar}
                alt={item.name}
                style={{ width: avatarSize(item.place), height: avatarSize(item.place), borderRadius: 999 }}
            />
        </div>
        <span className="text-white font-bold text-xs text-center truncate w-full">
            {item.name}
        </span>
        <span style={{ color: GREEN, fontSize: 11, marginTop: 2 }}>{item.pts}</span>
    </div>
)

// ── Rank Row ──────────────────────────────────────────────────────────────────
const RankRow = ({ item, isMe }: { item: Leader; isMe?: boolean }) => {
    const delta = item.place <= 3 ? `+${(4 - item.place) * 10}` : `-${item.place}`

    return (
        <div
            className="flex flex-row items-center rounded-2xl px-4 py-3 mb-2 gap-3"
            style={{
                backgroundColor: isMe ? "rgba(0,208,132,0.08)" : CARD,
                border: isMe ? `1px solid ${GREEN}` : "1px solid transparent",
            }}
        >
            <span style={{ color: rankColor(item.place), width: 18, textAlign: "center", fontWeight: 700, fontSize: 13 }}>
                {item.place}
            </span>
            <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full" />
            <div className="flex flex-col flex-1">
                <span className="text-white font-semibold text-sm">{item.name}</span>
                <span style={{ color: MUTED, fontSize: 11, marginTop: 1 }}>{item.pts}</span>
            </div>
            <div style={{ backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 10, padding: "4px 10px" }}>
                <span style={{ color: item.place <= 3 ? GREEN : "#f87171", fontSize: 11, fontWeight: 700 }}>
                    {delta}
                </span>
            </div>
        </div>
    )
}

// ── Leader List ───────────────────────────────────────────────────────────────
const LeaderList = ({ data, myPlace }: { data: Leader[]; myPlace?: number }) => {
    const podium = [data[1], data[0], data[2]].filter(Boolean)
    const rest = data.slice(3)

    return (
        <div className="flex flex-col overflow-y-auto pb-8">
            {/* Podium */}
            <div className="rounded-b-3xl pt-8 pb-6 px-4 mb-4" style={{ backgroundColor: CARD }}>
                <div className="flex flex-row justify-center items-end gap-5">
                    {podium.map(item => <PodiumCard key={item.place} item={item} />)}
                </div>
            </div>

            {/* Ranked list */}
            <div className="px-4">
                {rest.map(item => (
                    <RankRow key={item.place} item={item} isMe={item.place === myPlace} />
                ))}
            </div>
        </div>
    )
}

// ── Screen ────────────────────────────────────────────────────────────────────
export default function LeaderboardScreen() {
    const [activeTab, setActiveTab] = useState("global")

    return (
        <div className="flex flex-col flex-1 pt-3" style={{ backgroundColor: BG }}>

            <div className="flex flex-row items-center justify-between px-4 mb-4">
                <h2 className="text-white text-lg font-bold">Тэргүүлэгчид</h2>
                <span className="bg-white/10 text-white text-sm font-semibold rounded-xl px-4 py-2">
                    Таны оноо: <span className="text-green-400 font-bold">4200</span>
                </span>
            </div>

            {/* Tab bar */}
            <div className="flex flex-row rounded-2xl mx-4 mb-1 p-1" style={{ backgroundColor: CARD }}>
                {[
                    { value: "global", label: "🌍 Global" },
                    { value: "friends", label: "👥 Friends" },
                ].map(({ value, label }) => (
                    <button
                        key={value}
                        onClick={() => setActiveTab(value)}
                        className="flex-1 py-2.5 text-white text-xs font-semibold rounded-xl transition-colors"
                        style={{ backgroundColor: activeTab === value ? "rgba(255,255,255,0.1)" : "transparent" }}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Content */}
            {activeTab === "global" && <LeaderList data={globalLeaders} />}
            {activeTab === "friends" && <LeaderList data={friendLeaders} myPlace={3} />}
        </div>
    )
}