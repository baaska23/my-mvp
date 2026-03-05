"use client"

import { useState } from "react"

const GREEN = "#00d084"
const BG = "#0d1b2e"
const CARD = "#131f2e"
const MUTED = "rgba(255,255,255,0.45)"

const questions = [
    { question: "Киноны үйл явдал 1930-д оны үед АНУ-ын аль мужид өрнөдөг вэ?", answers: ["Louisiana", "Mississippi", "Georgia", "Alabama"], correct: 0 },
    { question: "Michael B. Jordan-ы бүтээсэн хоёр гол дүр хоорондоо ямар холбоотой вэ?", answers: ["Бизнесийн хамтрагчид", "Аав хүү", "Ихэр ах дүүс", "Үеэлүүд"], correct: 0 },
    { question: "Гол дүрүүд нутагтаа буцаж ирмэгцээ ямар үйл ажиллагаа эрхэлдэг вэ?", answers: ["Сүм байгуулдаг", "Хөвөн худалдаа", "Хөгжим, бүжгийн клуб", "Мөрийтэй тоглоомын газар"], correct: 0 },
    { question: "Sinners киноны найруулагч хэн бэ?", answers: ["Jordan Peele", "Ryan Coogler", "Antoine Fuqua", "Barry Jenkins"], correct: 0 },
    { question: "Sinners кино Юнивишнийн аль цэсэд байгаа вэ?", answers: ["Видео сан - Ази - Тулаант, адал явдалт", "Холливуд багц", "Видео сан - Намтарчилсан", "Видео сан - Триллер, нууцлаг"], correct: 0 },
]

const infoItems = [
    { value: "rules", trigger: "🎯 Тоглоомын дүрэм", content: "Киногоо үзээд күйздээ оролцоорой.  Оноогоо цуглуулаад бэлгийн эзэн бол. 😉 Зөв хариулт бүрд 10 оноо. Бүх киногоо үзсэн бол бонус оноотой шүү." },
    { value: "prize", trigger: "🏆 Энэ 7 хоногийн шагнал", content: "BOX тэмдэглэгээтэй хүссэн 3 киногоо үзэх эрх 🎬" },
    { value: "score", trigger: "📊 Онооны зарчим", content: [
        "Зөв хариулт бүр 10 оноо — max 150 оноо",
        "Сонгосон 3 киноноос 3-ууланг үзсэн бол +20 оноо",
        "15/15 хариулсан бол +20 оноо"
    ] },
]

const movies = [
    { src: "/sinners.png", label: "Sinners" },
    { src: "/formula.png", label: "Formula" },
    { src: "/marty.png", label: "Marty" },
]

export default function ThisWeekContent() {
    const [screen, setScreen] = useState<"main" | "info" | "quiz" | "result">("main")
    const [current, setCurrent] = useState(0)
    const [score, setScore] = useState(0)
    const [chosen, setChosen] = useState<number | null>(null)
    const [openInfo, setOpenInfo] = useState<string | null>(null)
    const [showRentPopup, setShowRentPopup] = useState(false)

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
                    <div key={item.value} className="rounded-xl overflow-hidden px-4 py-3" style={{ backgroundColor: CARD }}>
                        <span className="text-white font-semibold">{item.trigger}</span>
                        {Array.isArray(item.content) ? (
                            <ul className="text-sm mt-1" style={{ color: MUTED, paddingLeft: '1rem', listStyle: 'disc' }}>
                                {item.content.map((line, idx) => (
                                    <li key={idx}>{line}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm mt-1" style={{ color: MUTED }}>{item.content}</p>
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
                        const isChosen = i === chosen;
                        let bg = CARD;
                        if (isChosen && chosen !== null) bg = GREEN;
                        // if (isChosen && !isCorrect) bg = "#c0392b"

                        return (
                            <button
                                key={i}
                                onClick={() => handleAnswer(i)}
                                className="w-full py-4 rounded-xl text-white font-semibold text-sm transition-colors"
                                style={{ backgroundColor: bg }}
                            >
                                {ans}
                            </button>
                        );
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
                        <button
                            className="mx-2 my-2 py-2 rounded-lg text-white text-xs font-semibold border border-white/25 hover:bg-white/5 transition-colors"
                            style={i === 0 ? { backgroundColor: GREEN } : {}}
                            onClick={i != 0 ? () => setShowRentPopup(true) : undefined}
                        >
                            {i === 0 ? "Түрээсэлсэн" : "Түрээслэх"}
                        </button>
                    </div>
                ))}
            </div>

            {showRentPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
                    <div className="bg-[#131f2e] rounded-2xl p-6 max-w-xs w-full flex flex-col items-center">
                        <p className="text-white text-center mb-6">
                            Та энэ контентыг түрээслэн quiz-д оролцох боломжтой
                        </p>
                        <button
                            className="px-8 py-2 rounded-xl bg-[#00d084] text-white font-bold"
                            onClick={() => setShowRentPopup(false)}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

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