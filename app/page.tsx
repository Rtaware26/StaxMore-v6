"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Trophy, BarChart3, ArrowRight, Star, CheckCircle } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export default function HomePage() {
  const { isGuest, isFreeUser, isCompMember } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-background py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-secondary text-secondary-foreground px-4 py-2 rounded-full font-semibold">
              🚀 Join 10,000+ Active Traders
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight">
              Master Trading with
              <span className="bg-gradient-to-r from-primary to-green-500 bg-clip-text text-transparent">
                {" "}
                Staxmore
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 leading-relaxed">
              {isCompMember
                ? "You're already a competition member! Continue your journey with real-time market simulation and advanced features."
                : "The ultimate gamified trading platform. Compete in leagues, learn from experts, and build your trading skills with real-time market simulation."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isCompMember ? (
                <Link href="/trade">
                  <Button className="text-lg px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90">
                    Go to Live Trading
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : isFreeUser ? (
                <Link href="/gym">
                  <Button className="text-lg px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90">
                    Go to Stonks Gym
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Link href="/signup">
                  <Button className="text-lg px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90">
                    Start Free Trading
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}
              <Link href="/education/beginner/technical">
                <Button variant="outline" className="text-lg px-8 py-4 text-foreground border-border bg-background hover:bg-accent hover:text-accent-foreground">
                  Start Learning
                  <BookOpen className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6 tracking-tight">Why Choose Staxmore?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to become a successful trader, from beginner-friendly tools to advanced analytics.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="card-modern p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-green-500 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <Trophy className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Competitive Trading</h3>
              <p className="text-muted-foreground leading-relaxed">
                Join tiered competitions from Bronze to Diamond leagues. Compete against traders worldwide with real
                prizes and recognition.
              </p>
            </div>

            <div className="card-modern p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-primary rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <BookOpen className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Comprehensive Education</h3>
              <p className="text-muted-foreground leading-relaxed">
                Master technical analysis, fundamental analysis, and trading psychology through structured courses from
                beginner to advanced.
              </p>
            </div>

            <div className="card-modern p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-primary rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <BarChart3 className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Real-Time Simulation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Experience real market conditions with live pricing, advanced order types, and comprehensive portfolio
                tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Competition Tiers */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6 tracking-tight">Competition Leagues</h2>
            <p className="text-xl text-muted-foreground">Choose your level and start competing today</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {[
              {
                name: "Bronze",
                price: "Free",
                popular: false,
                features: ["Basic Trading", "Educational Content", "Community Access", "Leaderboard"],
                href: "/competitions/bronze",
                color: "from-amber-400 to-amber-600",
              },
              {
                name: "Silver",
                price: "$5",
                popular: false,
                features: ["Advanced Analytics", "Priority Support", "Exclusive Webinars", "Copy Trading"],
                href: "/competitions/silver",
                color: "from-slate-400 to-slate-600",
              },
              {
                name: "Gold",
                price: "$10",
                popular: true,
                features: ["Options Trading", "Advanced Tools", "Personal Coaching", "Premium Features"],
                href: "/competitions/gold",
                color: "from-yellow-400 to-yellow-600",
              },
              {
                name: "Diamond",
                price: "$15",
                popular: false,
                features: ["Full Analytics Suite", "VIP Access", "Custom Strategies", "1-on-1 Mentoring"],
                href: "/competitions/diamond",
                color: "from-purple-400 to-purple-600",
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`card-modern p-6 relative ${tier.popular ? "ring-2 ring-primary" : ""}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1 rounded-full font-semibold">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${tier.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <Trophy className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{tier.name}</h3>
                  <div className="text-3xl font-bold text-foreground mb-1">{tier.price}</div>
                  <div className="text-muted-foreground text-sm">per month</div>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href={tier.href}>
                  <Button className={`w-full ${tier.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : "btn-secondary"}`}>
                    Join {tier.name}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6 tracking-tight">Trusted by Traders Worldwide</h2>
          </div>

          <div className="grid lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">10,000+</div>
              <div className="text-muted-foreground">Active Traders</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">$2.5M+</div>
              <div className="text-muted-foreground">Simulated Volume</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">150+</div>
              <div className="text-muted-foreground">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">4.9/5</div>
              <div className="text-muted-foreground flex items-center justify-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                User Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-background to-card">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          {isCompMember ? (
            <>
              <h2 className="text-4xl font-bold text-foreground mb-6 tracking-tight">Keep Mastering the Markets!</h2>
              <p className="text-muted-foreground mb-12 leading-relaxed">
                You're already a Staxmore competition member. Continue honing your skills and aiming for the top.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/trade">
                  <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground border border-border rounded-full px-8 py-4 text-lg font-semibold transition-all duration-200">
                    Continue Trading
                  </Button>
                </Link>
              </div>
            </>
          ) : isFreeUser ? (
            <>
              <h2 className="text-4xl font-bold text-foreground mb-6 tracking-tight">Ready for Real Competitions?</h2>
              <p className="text-muted-foreground mb-12 leading-relaxed">
                Upgrade your membership to join real-money competitions and compete for bigger prizes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/competitions/silver"> {/* Link to a higher tier competition */}
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                    Upgrade to Compete
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground border border-border rounded-full px-8 py-4 text-lg font-semibold transition-all duration-200">
                    Go to Dashboard
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-4xl font-bold text-foreground mb-6 tracking-tight">Ready to Start Your Trading Journey?</h2>
              <p className="text-muted-foreground mb-12 leading-relaxed">
                Join thousands of traders already improving their skills on Staxmore. Start with our live trading platform
                or jump into competitions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground border border-border rounded-full px-8 py-4 text-lg font-semibold transition-all duration-200">
                    Sign In
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
