import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import I18nRoot from "@/components/i18n/i18n-root"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/auth-provider"

const outfit = Outfit({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bill Bridge",
  description: "Track Better. Manage Smarter. Grow Faster.",
  generator: 'v0.dev',
  icons: {
    icon: '/images/favicon_io/favicon.ico',
    shortcut: '/images/favicon_io/favicon.ico',
    apple: '/images/favicon_io/apple-touch-icon.png',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/favicon_io/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/favicon_io/apple-touch-icon.png" />
      </head>
      <body className={outfit.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <I18nRoot>{children}</I18nRoot>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
