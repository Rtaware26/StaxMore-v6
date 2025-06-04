"use client"

import { useState, useEffect } from "react"
import { ComingSoon } from "@/components/coming-soon"
import { checkEligibility } from "@/lib/eligibility"
import { EducationRequirementModal } from "@/components/education-requirement-modal"

export default function GoldCompetitionPage() {
  const [isEligible, setIsEligible] = useState<boolean | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    async function checkUserEligibility() {
      const eligible = await checkEligibility("gold")
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
          title="Gold League Competition - Not Eligible"
          description="You are not eligible for the Gold League Competition. Please complete the required education track."
          backLink="/competitions/silver"
          backLinkText="Try Silver League"
          actionText="View Requirements"
          onAction={() => setShowModal(true)}
        />

        {showModal && (
          <EducationRequirementModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            requiredTrack="intermediate"
            leagueName="Gold"
          />
        )}
      </>
    )
  }

  return (
    <ComingSoon
      title="Gold League Competition"
      description="$25 entry fee with options trading and advanced features. Coming soon!"
      backLink="/competitions/silver"
      backLinkText="Try Silver League"
    />
  )
}
