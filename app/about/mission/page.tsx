"use client"

import { Target, Lightbulb, TrendingUp, Users } from "lucide-react"

export default function MissionPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
          Our Core Mission
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          At Staxmore, our mission is to empower individuals worldwide to achieve financial literacy and trading mastery through innovative, accessible, and engaging educational experiences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="card-modern p-8 bg-card text-card-foreground hover:bg-accent/50">
            <Target className="h-10 w-10 text-primary mb-4 mx-auto" />
            <h2 className="text-2xl font-bold text-foreground mb-3">Democratize Financial Education</h2>
            <p className="text-muted-foreground">
              Break down barriers to entry and make high-quality financial education available to everyone, regardless of their background or prior knowledge.
            </p>
          </div>
          <div className="card-modern p-8 bg-card text-card-foreground hover:bg-accent/50">
            <Lightbulb className="h-10 w-10 text-primary mb-4 mx-auto" />
            <h2 className="text-2xl font-bold text-foreground mb-3">Foster Practical Skills</h2>
            <p className="text-muted-foreground">
              Provide hands-on, risk-free environments where users can apply theoretical knowledge to real-time market simulations, building confidence and practical trading acumen.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card-modern p-8 bg-card text-card-foreground hover:bg-accent/50">
            <TrendingUp className="h-10 w-10 text-primary mb-4 mx-auto" />
            <h2 className="text-2xl font-bold text-foreground mb-3">Promote Responsible Trading</h2>
            <p className="text-muted-foreground">
              Instill a strong understanding of risk management and ethical trading practices, ensuring users make informed and responsible decisions in the markets.
            </p>
          </div>
          <div className="card-modern p-8 bg-card text-card-foreground hover:bg-accent/50">
            <Users className="h-10 w-10 text-primary mb-4 mx-auto" />
            <h2 className="text-2xl font-bold text-foreground mb-3">Build a Thriving Community</h2>
            <p className="text-muted-foreground">
              Create a supportive and collaborative global community where traders can share insights, learn from peers, and grow together in their financial journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
