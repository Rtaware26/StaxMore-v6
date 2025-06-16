import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrencyAbbreviated(num: number | null | undefined): string {
  if (num === null || num === undefined) {
    return "$0"
  }

  const absNum = Math.abs(num)

  if (absNum >= 1.0e12) {
    return `$${(num / 1.0e12).toFixed(2)}T`
  }
  if (absNum >= 1.0e9) {
    return `$${(num / 1.0e9).toFixed(2)}B`
  }
  if (absNum >= 1.0e6) {
    return `$${(num / 1.0e6).toFixed(2)}M`
  }
  if (absNum >= 1.0e3) {
    return `$${(num / 1.0e3).toFixed(2)}K`
  }
  return `$${num.toFixed(2)}`
}
