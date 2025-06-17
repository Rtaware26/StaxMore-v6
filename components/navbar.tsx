"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X, TrendingUp, User, LockOpen, Medal } from "lucide-react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { Badge } from "@/components/ui/badge"

export function Navbar() {
  const { user, loading, isGuest, isFreeUser, isCompMember, userProfile, canAccessFeature } = useAuth()
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
      name: "Trading",
      items: [
        {
          name: "Demo Trading",
          href: "/gym/demo-trading",
          show: canAccessFeature('demo-trading'),
        },
        {
          name: "Live Trading",
          href: "/trading",
          show: canAccessFeature('live-trading'),
        },
      ],
    },
    {
      name: "Competitions",
      items: [
        {
          name: "Bronze League",
          href: "/competitions/bronze",
          show: canAccessFeature('competitions'),
        },
        {
          name: "Silver League",
          href: "/competitions/silver",
          show: canAccessFeature('competitions'),
        },
        {
          name: "Gold League",
          href: "/competitions/gold",
          show: canAccessFeature('competitions'),
        },
        {
          name: "Diamond League",
          href: "/competitions/diamond",
          show: canAccessFeature('competitions'),
        },
      ],
    },
    {
      name: "Community",
      items: [
        {
          name: "Chat",
          href: "/chat",
          show: canAccessFeature('chat'),
        },
        {
          name: "Leaderboard",
          href: "/leaderboard",
          show: canAccessFeature('competitions'),
        },
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

  // Filter navigation items based on user state
  const filteredNavigationItems = navigationItems.map(section => ({
    ...section,
    items: section.items.filter(item => item.show),
  })).filter(section => section.items.length > 0)

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

            {filteredNavigationItems.map((item) => (
              <div key={item.name} className="relative group">
                <button
                  onClick={() => handleDropdownToggle(item.name)}
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
            ) : isGuest ? (
              <>
                <Link href="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            ) : (
              <div className="relative group">
                <button
                  onMouseEnter={() => setActiveDropdown("user")}
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200 border border-gray-700 shadow-md"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-200">{user?.user_metadata?.username || user?.email}</span>
                  <ChevronDown className="h-4 w-4 text-gray-400 transition-transform group-hover:rotate-180" />
                </button>

                {activeDropdown === "user" && (
                  <div
                    className="absolute top-full right-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-xl border border-gray-700 z-50 overflow-hidden"
                    onMouseEnter={() => setActiveDropdown("user")}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="p-2">
                      {isFreeUser && (
                        <div className="px-4 py-3 text-sm font-medium text-gray-300 flex items-center mb-2">
                          <LockOpen className="h-4 w-4 mr-2 text-yellow-500" />
                          <span>🔓 Free User</span>
                        </div>
                      )}
                      {isCompMember && userProfile?.league && (
                        <div className="px-4 py-3 text-sm font-medium text-gray-300 flex items-center mb-2">
                          <Medal className={`h-4 w-4 mr-2 ${userProfile.league === 'bronze' ? 'text-amber-600' :
                                                               userProfile.league === 'silver' ? 'text-gray-400' :
                                                               userProfile.league === 'gold' ? 'text-yellow-500' :
                                                               userProfile.league === 'diamond' ? 'text-purple-500' : ''}`} />
                          <span>{userProfile.league.charAt(0).toUpperCase() + userProfile.league.slice(1)} League Member</span>
                        </div>
                      )}

                      <Link
                        href="/dashboard"
                        className="block px-4 py-3 text-sm font-medium text-gray-100 hover:bg-gray-700 rounded-lg transition-colors"
                        onClick={closeDropdowns}
                      >
                        Dashboard
                      </Link>
                      {(isFreeUser || isCompMember) && (
                        <Link
                          href="/gym"
                          className="block px-4 py-3 text-sm font-medium text-gray-100 hover:bg-gray-700 rounded-lg transition-colors"
                          onClick={closeDropdowns}
                        >
                          Stonks Gym
                        </Link>
                      )}
                      {isCompMember && (
                        <Link
                          href="/trade"
                          className="block px-4 py-3 text-sm font-medium text-gray-100 hover:bg-gray-700 rounded-lg transition-colors"
                          onClick={closeDropdowns}
                        >
                          Live Trading
                        </Link>
                      )}
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
            )}

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/leaderboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Leaderboard
            </Link>
            {isCompMember && (
              <Link
                href="/chat"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Chat
              </Link>
            )}
            {(isFreeUser || isCompMember) && (
              <Link
                href="/gym"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Stonks Gym
              </Link>
            )}
            {isCompMember && (
              <Link
                href="/trade"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Live Trading
              </Link>
            )}
            {filteredNavigationItems.map((item) => (
              <div key={item.name}>
                <button
                  onClick={() => handleDropdownToggle(item.name)}
                  className="flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  {item.name}
                  <ChevronDown className={`h-5 w-5 transition-transform ${activeDropdown === item.name ? "rotate-180" : ""}`} />
                </button>
                {activeDropdown === item.name && (
                  <div className="pl-4 pr-2 py-2 space-y-1">
                    {item.items.map((subItem) => (
                      <div key={subItem.name}>
                        {subItem.href ? (
                          <Link
                            href={subItem.href}
                            className="block px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:bg-gray-600 hover:text-white"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ) : (
                          <div>
                            <div className="px-3 py-2 text-sm font-semibold text-gray-300 bg-gray-700 rounded-md mb-1">
                              {subItem.name}
                            </div>
                            {subItem.subitems?.map((subsubItem) => (
                              <Link
                                key={subsubItem.name}
                                href={subsubItem.href}
                                className="block px-6 py-2 text-sm text-gray-400 hover:bg-gray-600 hover:text-white rounded-md"
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

            {isGuest && (
              <div className="pt-4 pb-3 border-t border-gray-700">
                <Link href="/login">
                  <Button className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" className="mt-2 block">
                  <Button variant="outline" className="w-full text-base">Sign Up</Button>
                </Link>
              </div>
            )}
            {!loading && user && (
              <div className="pt-4 pb-3 border-t border-gray-700">
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-red-900"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
