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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b border-border \
        ${scrolled ? "bg-background/90 backdrop-blur-md shadow-xl" : "bg-background"}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="p-2 bg-gradient-to-br from-primary to-green-500 rounded-xl group-hover:shadow-lg transition-all duration-200">
                <TrendingUp className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground tracking-tight">Staxmore</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link href="/" className="text-muted-foreground px-4 py-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
              Home
            </Link>

            <Link href="/leaderboard" className="text-muted-foreground px-4 py-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
              Leaderboard
            </Link>

            <Link href="/chat" className="text-muted-foreground px-4 py-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
              Chat
            </Link>

            {navigationItems.map((item) => (
              <div key={item.name} className="relative group">
                <button
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="flex items-center text-muted-foreground px-4 py-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                >
                  {item.name}
                  <ChevronDown className="ml-1 h-4 w-4 text-muted-foreground transition-transform group-hover:rotate-180" />
                </button>

                {activeDropdown === item.name && (
                  <div
                    className="absolute top-full left-0 mt-2 w-80 bg-popover rounded-xl shadow-xl border border-border z-50 overflow-hidden"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="p-2">
                      {item.items.map((subItem) => (
                        <div key={subItem.name}>
                          {subItem.href ? (
                            <Link
                              href={subItem.href}
                              className="block p-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                              onClick={closeDropdowns}
                            >
                              <div className="font-semibold text-foreground">{subItem.name}</div>
                              {subItem.description && (
                                <div className="text-sm text-muted-foreground mt-1">{subItem.description}</div>
                              )}
                            </Link>
                          ) : (
                            <div>
                              <div className="px-3 py-2 text-sm font-semibold text-foreground bg-accent rounded-lg mb-1">
                                {subItem.name}
                              </div>
                              {subItem.subitems?.map((subsubItem) => (
                                <Link
                                  key={subsubItem.name}
                                  href={subsubItem.href}
                                  className="block px-6 py-2 text-sm text-muted-foreground hover:text-accent-foreground hover:bg-accent rounded-lg transition-colors"
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
              <div className="w-24 h-10 bg-muted animate-pulse rounded-full"></div>
            ) : user ? (
              <div className="relative group">
                <button
                  onMouseEnter={() => setActiveDropdown("user")}
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200 border border-gray-700 shadow-md"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-200">{user.user_metadata?.username || user.email}</span>
                  <ChevronDown className="h-4 w-4 text-gray-400 transition-transform group-hover:rotate-180" />
                </button>

                {activeDropdown === "user" && (
                  <div
                    className="absolute top-full right-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-xl border border-gray-700 z-50 overflow-hidden"
                    onMouseEnter={() => setActiveDropdown("user")}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="p-2">
                      <Link
                        href="/dashboard"
                        className="block px-4 py-3 text-sm font-medium text-gray-100 hover:bg-gray-700 rounded-lg transition-colors"
                        onClick={closeDropdowns}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/gym"
                        className="block px-4 py-3 text-sm font-medium text-gray-100 hover:bg-gray-700 rounded-lg transition-colors"
                        onClick={closeDropdowns}
                      >
                        Stonks Gym
                      </Link>
                      <Link
                        href="/trade"
                        className="block px-4 py-3 text-sm font-medium text-gray-100 hover:bg-gray-700 rounded-lg transition-colors"
                        onClick={closeDropdowns}
                      >
                        Live Trading
                      </Link>
                      <Link
                        href="/profile"
                        className="block px-4 py-3 text-sm font-medium text-gray-100 hover:bg-gray-700 rounded-lg transition-colors"
                        onClick={closeDropdowns}
                      >
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-900 rounded-lg transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-4">
                <Button asChild className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition-all duration-300">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild variant="outline" className="bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700 hover:border-gray-600 hover:text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-300">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-gray-950/90 backdrop-blur-md z-40" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute top-0 right-0 w-64 h-full bg-gray-900 border-l border-gray-800 shadow-lg p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <Link href="/" className="block px-4 py-2 text-gray-200 hover:bg-gray-800 rounded-lg transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/leaderboard" className="block px-4 py-2 text-gray-200 hover:bg-gray-800 rounded-lg transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                Leaderboard
              </Link>
              <Link href="/chat" className="block px-4 py-2 text-gray-200 hover:bg-gray-800 rounded-lg transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                Chat
              </Link>
              {navigationItems.map((item) => (
                <div key={item.name} className="border-b border-gray-800 pb-2 last:border-b-0">
                  <button
                    onClick={() => handleDropdownToggle(item.name)}
                    className="flex items-center justify-between w-full px-4 py-2 text-gray-200 hover:bg-gray-800 rounded-lg transition-colors font-medium"
                  >
                    {item.name}
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                  </button>
                  {activeDropdown === item.name && (
                    <div className="pl-4 pt-2 space-y-2">
                      {item.items.map((subItem) => (
                        <div key={subItem.name}>
                          {subItem.href ? (
                            <Link
                              href={subItem.href}
                              className="block p-2 text-sm text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <div className="font-medium text-gray-100">{subItem.name}</div>
                              {subItem.description && (
                                <div className="text-xs text-gray-400 mt-1">{subItem.description}</div>
                              )}
                            </Link>
                          ) : (
                            <div>
                              <div className="px-2 py-2 text-xs font-semibold text-gray-100 bg-gray-800 rounded-lg mb-1">
                                {subItem.name}
                              </div>
                              {subItem.subitems?.map((subsubItem) => (
                                <Link
                                  key={subsubItem.name}
                                  href={subsubItem.href}
                                  className="block px-4 py-2 text-xs text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {subsubItem.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {loading ? (
                <div className="w-full h-10 bg-gray-700 animate-pulse rounded-full mt-4"></div>
              ) : user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-gray-200 hover:bg-gray-800 rounded-lg transition-colors font-medium mt-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/gym"
                    className="block px-4 py-2 text-gray-200 hover:bg-gray-800 rounded-lg transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Stonks Gym
                  </Link>
                  <Link
                    href="/trade"
                    className="block px-4 py-2 text-gray-200 hover:bg-gray-800 rounded-lg transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Live Trading
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-200 hover:bg-gray-800 rounded-lg transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-red-400 hover:bg-red-900 rounded-lg transition-colors font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 mt-4">
                  <Button asChild className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition-all duration-300">
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700 hover:border-gray-600 hover:text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-300">
                    <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
