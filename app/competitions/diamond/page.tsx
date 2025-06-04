"use client"

import { useState, useEffect } from "react"
import { ComingSoon } from "@/components/coming-soon"
import { checkEligibility } from "@/lib/eligibility"
import { EducationRequirementModal } from "@/components/education-requirement-modal"

export default function DiamondCompetitionPage() {
  const [isEligible, setIsEligible] = useState<boolean | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    async function checkUserEligibility() {
      const eligible = await checkEligibility("diamond")
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
          title="Diamond League Competition - Not Eligible"
          description="You are not eligible for the Diamond League Competition. Please complete the required education track."
          backLink="/competitions/gold"
          backLinkText="Try Gold League"
          actionText="View Requirements"
          onAction={() => setShowModal(true)}
        />

        {showModal && (
          <EducationRequirementModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            requiredTrack="advanced"
            leagueName="Diamond"
          />
        )}
      </>
    )
  }

  return (
    <ComingSoon
      title="Diamond League Competition"
      description="$50 entry fee with full options trading and premium features. Coming soon!"
      backLink="/competitions/gold"
      backLinkText="Try Gold League"
    />
  )
}
