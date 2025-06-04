import Link from "next/link"
import { TrendingUp, Mail, Linkedin, Github, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">Staxmore</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              The ultimate gamified trading platform. Learn, compete, and master the markets with real-time simulation.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://linkedin.com/company/staxmore"
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/staxmore"
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:support@staxmore.com"
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/gym" className="text-slate-400 hover:text-white transition-colors">
                  Stonks Gym
                </Link>
              </li>
              <li>
                <Link href="/competitions/bronze" className="text-slate-400 hover:text-white transition-colors">
                  Competitions
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-slate-400 hover:text-white transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  href="/education/beginner/technical"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Education
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/other/tools" className="text-slate-400 hover:text-white transition-colors">
                  Trading Tools
                </Link>
              </li>
              <li>
                <Link href="/other/life-hacks" className="text-slate-400 hover:text-white transition-colors">
                  Life Hacks
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="text-slate-400 hover:text-white transition-colors">
                  Economic Calendar
                </Link>
              </li>
              <li>
                <Link href="/about/faq" className="text-slate-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about/about" className="text-slate-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about/mission" className="text-slate-400 hover:text-white transition-colors">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link href="/other/philanthropy" className="text-slate-400 hover:text-white transition-colors">
                  Philanthropy
                </Link>
              </li>
              <li>
                <Link href="/about/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-slate-400 text-sm">© {new Date().getFullYear()} Staxmore. All rights reserved.</div>
          <div className="flex items-center space-x-2 text-slate-400 text-sm mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>for traders worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
