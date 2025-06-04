"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ComingSoonProps {
  title: string
  description: string
  backLink: string
  backLinkText: string
  actionText?: string
  onAction?: () => void
}

export function ComingSoon({ title, description, backLink, backLinkText, actionText, onAction }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-lg mb-8 max-w-md">{description}</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href={backLink}>
          <Button variant="outline">{backLinkText}</Button>
        </Link>
        {actionText && onAction && <Button onClick={onAction}>{actionText}</Button>}
      </div>
    </div>
  )
}
