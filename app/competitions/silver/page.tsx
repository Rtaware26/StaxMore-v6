"use client"

import { useState, useEffect } from "react"
import { ComingSoon } from "@/components/coming-soon"
import { checkEligibility } from "@/lib/eligibility"
import { EducationRequirementModal } from "@/components/education-requirement-modal"

export default function SilverCompetitionPage() {
  const [isEligible, setIsEligible] = useState<boolean | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    async function checkUserEligibility() {
      const eligible = await checkEligibility("silver")
      setIsEligible(eligible)
    }

    checkUserEligibility()
  }, [])

  // Show loading state while checking eligibility
  if (isEligible === null) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!isEligible) {
    return (
      <>
        <ComingSoon
          title="Silver League Competition - Not Eligible"
          description="You are not eligible for the Silver League Competition. Please complete the required education track."
          backLink="/competitions/bronze"
          backLinkText="Try Bronze League"
          actionText="View Requirements"
          onAction={() => setShowModal(true)}
        />

        {showModal && (
          <EducationRequirementModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            requiredTrack="beginner"
            leagueName="Silver"
          />
        )}
      </>
    )
  }

  return (
    <ComingSoon
      title="Silver League Competition"
      description="$10 entry fee with enhanced features and bigger prizes. Coming soon!"
      backLink="/competitions/bronze"
      backLinkText="Try Bronze League"
    />
  )
}
