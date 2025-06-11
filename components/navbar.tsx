"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "./auth-provider"
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X, TrendingUp, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export function Navbar() {
  const { user, loading } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const closeDropdowns = () => {
    setActiveDropdown(null)
  }

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (!error) {
        closeDropdowns()
        router.push("/login")
      } else {
        console.error("Logout failed:", error.message)
      }
    } catch (err) {
      console.error("Unexpected error during logout:", err)
    }
  }

  const navigationItems = [
    {
      name: "Competitions",
      items: [
        { name: "Bronze League", href: "/competitions/bronze", description: "Free entry • Perfect for beginners" },
        { name: "Silver League", href: "/competitions/silver", description: "$5 entry • Advanced analytics" },
        { name: "Gold League", href: "/competitions/gold", description: "$10 entry • Options trading" },
        { name: "Diamond League", href: "/competitions/diamond", description: "$15 entry • Full analytics suite" },
      ],
    },
    {
      name: "Education",
      items: [
        {
          name: "Beginner",
          subitems: [
            { name: "Technical Analysis", href: "/education/beginner/technical" },
            { name: "Fundamental Analysis", href: "/education/beginner/fundamental" },
            { name: "Psychology & Risk", href: "/education/beginner/psychology" },
          ],
        },
        {
          name: "Intermediate",
          subitems: [
            { name: "Technical Analysis", href: "/education/intermediate/technical" },
            { name: "Fundamental Analysis", href: "/education/intermediate/fundamental" },
            { name: "Psychology & Risk", href: "/education/intermediate/psychology" },
          ],
        },
        {
          name: "Advanced",
          subitems: [
            { name: "Technical Analysis", href: "/education/advanced/technical" },
            { name: "Fundamental Analysis", href: "/education/advanced/fundamental" },
            { name: "Psychology & Risk", href: "/education/advanced/psychology" },
          ],
        },
      ],
    },
    {
      name: "Other",
      items: [
        { name: "Philanthropy", href: "/other/philanthropy", description: "Our charitable mission" },
        { name: "Life Hacks", href: "/other/life-hacks", description: "Financial productivity tips" },
        { name: "Trading Tools", href: "/other/tools", description: "Calculators & utilities" },
      ],
    },
    {
      name: "About",
      items: [
        { name: "About Us", href: "/about/about", description: "Our story and mission" },
        { name: "Contact", href: "/about/contact", description: "Get in touch" },
        { name: "Mission", href: "/about/mission", description: "Why we exist" },
        { name: "FAQ", href: "/about/faq", description: "Common questions" },
      ],
    },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white"
      } border-b border-slate-100`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="p-2 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl group-hover:shadow-lg transition-all duration-200">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">Staxmore</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link href="/" className="nav-link px-4 py-2 rounded-full hover:bg-slate-50">
              Home
            </Link>

            <Link href="/leaderboard" className="nav-link px-4 py-2 rounded-full hover:bg-slate-50">
              Leaderboard
            </Link>

            <Link href="/chat" className="nav-link px-4 py-2 rounded-full hover:bg-slate-50">
              Chat
            </Link>

            {navigationItems.map((item) => (
              <div key={item.name} className="relative group">
                <button
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="nav-link flex items-center px-4 py-2 rounded-full hover:bg-slate-50"
                >
                  {item.name}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>

                {activeDropdown === item.name && (
                  <div
                    className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 z-50"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="p-2">
                      {item.items.map((subItem) => (
                        <div key={subItem.name}>
                          {subItem.href ? (
                            <Link
                              href={subItem.href}
                              className="block p-3 rounded-lg hover:bg-slate-50 transition-colors"
                              onClick={closeDropdowns}
                            >
                              <div className="font-semibold text-slate-900">{subItem.name}</div>
                              {subItem.description && (
                                <div className="text-sm text-slate-600 mt-1">{subItem.description}</div>
                              )}
                            </Link>
                          ) : (
                            <div>
                              <div className="px-3 py-2 text-sm font-semibold text-slate-900 bg-slate-50 rounded-lg mb-1">
                                {subItem.name}
                              </div>
                              {subItem.subitems?.map((subsubItem) => (
                                <Link
                                  key={subsubItem.name}
                                  href={subsubItem.href}
                                  className="block px-6 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                                  onClick={closeDropdowns}
                                >
                                  {subsubItem.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Auth Section */}
            {loading ? (
              <div className="w-24 h-10 bg-slate-200 animate-pulse rounded-full"></div>
            ) : user ? (
              <div className="relative group">
                <button
                  onMouseEnter={() => setActiveDropdown("user")}
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-slate-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-600" />
                </button>

                {activeDropdown === "user" && (
                  <div
                    className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-50"
                    onMouseEnter={() => setActiveDropdown("user")}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="p-2">
                      <Link
                        href="/dashboard"
                        className="block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                        onClick={closeDropdowns}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/gym"
                        className="block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                        onClick={closeDropdowns}
                      >
                        Stonks Gym
                      </Link>
                      <Link
                        href="/trade"
                        className="block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                        onClick={closeDropdowns}
                      >
                        Live Trading
                      </Link>
                      <Link
                        href="/profile"
                        className="block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                        onClick={closeDropdowns}
                      >
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-4">
                <Link href="/login">
                  <Button variant="ghost" className="rounded-full font-semibold">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="btn-primary">Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-50"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 py-4">
            <div className="space-y-2">
              <Link
                href="/"
                className="block px-4 py-3 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/leaderboard"
                className="block px-4 py-3 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Leaderboard
              </Link>
              <Link
                href="/trade"
                className="block px-4 py-3 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Live Trading
              </Link>

              {/* Mobile Auth */}
              {!loading &&
                (user ? (
                  <div className="space-y-2 border-t border-slate-100 pt-4 mt-4">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-3 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/gym"
                      className="block px-4 py-3 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Stonks Gym
                    </Link>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false)
                        handleSignOut()
                      }}
                      className="block w-full text-left px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 border-t border-slate-100 pt-4 mt-4">
                    <Link
                      href="/login"
                      className="block px-4 py-3 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="block px-4 py-3 text-base font-medium bg-slate-900 text-white hover:bg-slate-800 rounded-lg text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
