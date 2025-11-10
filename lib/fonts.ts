// lib/fonts.ts
import { Inter, Manrope, Plus_Jakarta_Sans } from "next/font/google"

// Pick the one that matches your Figma text. Keep only one export in use.
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

