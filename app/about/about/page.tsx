"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Users, Globe, Handshake } from "lucide-react"

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
          Our Story: Empowering Traders
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Staxmore was founded with a clear vision: to democratize financial education and trading skills. We believe
          that with the right tools, knowledge, and community, anyone can become a proficient trader.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="card-modern p-8">
            <Sparkles className="h-10 w-10 text-primary mb-4 mx-auto" />
            <h2 className="text-2xl font-bold text-foreground mb-3">Our Founding Principle</h2>
            <p className="text-muted-foreground">
              We started Staxmore to bridge the gap between complex financial markets and aspiring traders. Our goal is to make learning engaging, accessible, and practical through a unique gamified approach.
            </p>
          </div>
          <div className="card-modern p-8">
            <Users className="h-10 w-10 text-primary mb-4 mx-auto" />
            <h2 className="text-2xl font-bold text-foreground mb-3">Community & Collaboration</h2>
            <p className="text-muted-foreground">
              Trading can be a solitary journey, but it doesn't have to be. Staxmore fosters a vibrant community where traders can share insights, learn from each other, and grow together.
            </p>
          </div>
        </div>

        <h2 className="text-4xl font-bold text-foreground mb-8 leading-tight">Our Mission</h2>
        <p className="text-xl text-muted-foreground mb-12">
          To provide a comprehensive, interactive, and risk-free platform for individuals to develop essential trading skills, build confidence, and achieve financial literacy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="card-modern p-8">
            <Globe className="h-10 w-10 text-primary mb-4 mx-auto" />
            <h2 className="text-2xl font-bold text-foreground mb-3">Global Accessibility</h2>
            <p className="text-muted-foreground">
              We aim to make high-quality trading education accessible to everyone, regardless of their geographical location or financial background.
            </p>
          </div>
          <div className="card-modern p-8">
            <Handshake className="h-10 w-10 text-primary mb-4 mx-auto" />
            <h2 className="text-2xl font-bold text-foreground mb-3">Ethical Trading Practices</h2>
            <p className="text-muted-foreground">
              We advocate for responsible trading and provide tools and education to help users manage risk effectively and make informed decisions.
            </p>
          </div>
        </div>

        <p className="text-xl text-muted-foreground mb-8">
          Join us on our mission to transform the way people learn and engage with financial markets.
        </p>
        <Link href="/signup">
          <Button className="text-lg px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90">
            Start Your Journey Today
          </Button>
        </Link>
      </div>
    </div>
  )
}
