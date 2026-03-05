import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "My MVP",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn">
      <head>
        {/* viewport-fit=cover lets us use safe-area-inset env variables */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#000",
          // Prevent the body itself from scrolling or showing white
          overflow: "hidden",
          width: "100vw",
          height: "100dvh",
        }}
      >
        {children}
      </body>
    </html>
  )
}