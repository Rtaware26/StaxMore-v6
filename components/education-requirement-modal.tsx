"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Lock, ArrowRight } from "lucide-react"
import Link from "next/link"

interface EducationRequirementModalProps {
  open: boolean
  onClose: () => void
  requiredTrack?: string
  leagueName?: string
}

export function EducationRequirementModal({
  open,
  onClose,
  requiredTrack = "beginner",
  leagueName = "Bronze",
}: EducationRequirementModalProps) {
  const getTrackColor = (track: string) => {
    switch (track) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTrackLessons = (track: string) => {
    return ["Technical Analysis", "Fundamental Analysis", "Psychology & Risk Management"]
  }

  const capitalizedTrack = requiredTrack ? requiredTrack.charAt(0).toUpperCase() + requiredTrack.slice(1) : "Beginner"

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Lock className="h-5 w-5 text-amber-600" />
            <DialogTitle>Education Required</DialogTitle>
          </div>
          <DialogDescription>Complete the required education track to unlock {leagueName} League.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center space-x-2 mb-3">
              <BookOpen className="h-4 w-4 text-amber-600" />
              <span className="font-medium text-amber-900">Required Track:</span>
              <Badge className={getTrackColor(requiredTrack)}>{capitalizedTrack}</Badge>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-amber-800 mb-2">Complete these lessons:</p>
              {getTrackLessons(requiredTrack).map((lesson, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-amber-700">
                  <div className="w-2 h-2 bg-amber-400 rounded-full" />
                  <span>{lesson}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Link href={`/education/${requiredTrack}`} className="flex-1">
              <Button className="w-full">
                Start Learning
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
