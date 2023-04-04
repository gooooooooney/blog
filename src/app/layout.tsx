import Navbar from "@/components/Navbar"
import Providers from "@/components/Providers"
import { Inter } from 'next/font/google'

import { cn } from "@/lib/utils"
import "@/styles/globals.css"
import "prismjs/themes/prism-solarizedlight.min.css"
import { Toaster } from "@/components/ui/Toast"
export const metadata = {
  title: 'Next.js Notion Starter Kit',
  description: "A starter kit for building a blog with Next.js 13 and Notion.",
}
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(inter.className)}>
      <body className="bg-slate-50 text-slate-900 dark:text-slate-50 dark:bg-slate-900 antialiased">
        <Providers>
          <Navbar/>
          <Toaster position='bottom-center' />

          {children}
        </Providers>
      </body>
    </html>
  )
}

