import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LemonDouble / 아카콘 미러',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
      <GoogleAnalytics gaId="G-FGMMR0W69K" />
    </html>
  )
}
