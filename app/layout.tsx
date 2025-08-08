import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "../components/theme-provider"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

// Detectar si estamos en GitHub Pages
const isGitHubPages = process.env.GITHUB_PAGES === 'true'
const basePath = isGitHubPages ? '/Portfolio' : ''

export const metadata: Metadata = {
  title: "Juan-Dev-Portfolio",
  description: "Portfolio website for a software engineer showcasing projects and skills",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="light" style={{ colorScheme: "light" }}>
      <head>
        {/* Favicon */}
        <link rel="icon" href={`${basePath}/perfil.jpg`} type="image/png" />
        {/* Metadata */}
        <title>{String(metadata.title) || "Juan-Dev-Portfolio"}</title>
        <meta name="description" content={metadata.description || ""} />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}