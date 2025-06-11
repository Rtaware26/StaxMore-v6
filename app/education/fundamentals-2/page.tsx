import Link from 'next/link';
import { PlayCircle, BookOpen, Lightbulb, CheckCircle, XCircle, ArrowRight, BarChart2, TrendingUp, DollarSign, CalendarDays, LineChart } from 'lucide-react';

export default function FundamentalsLesson2Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Course Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-600 text-blue-100 mb-4 shadow-lg">
            <BookOpen className="w-4 h-4 mr-2" /> Premium Lesson
          </span>
          <h1 className="text-6xl font-extrabold text-white mb-4 leading-tight tracking-tighter">
            Key Macroeconomic Indicators That Move Markets
          </h1>
          <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto">
            These 5 macro indicators drive currencies, stocks, and bonds — ignore them at your own risk.
          </p>
        </div>

        {/* Video Overview Section */}
        <div className="mb-16 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <PlayCircle className="w-10 h-10 text-blue-500 mr-4" />
            <div>
              <h2 className="text-4xl font-bold text-white mb-1">Video Overview</h2>
              <p className="text-lg text-gray-400">Learn about the most impactful economic data releases and how they influence market movements.</p>
            </div>
          </div>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-700 shadow-xl">
            {/* YouTube Embed Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-400 text-xl">
              <span className="animate-pulse">Loading Video...</span>
              {/* Replace `VIDEO_ID` with your actual YouTube video ID */}
              {/* <iframe
                src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Lesson 2: Key Macroeconomic Indicators"
                className="w-full h-full"
              ></iframe> */}
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* CPI Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🧨 1. CPI – Inflation Pulse</h2>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-6">
            <li><strong className="text-white">What it is:</strong> Consumer Price Index = how fast prices are rising</li>
            <li><strong className="text-white">Why it matters:</strong> Hot CPI → rate hikes → USD up, stocks down</li>
          </ul>
          {/* Image: CPI vs USD chart reaction */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=CPI+vs+USD+Chart" alt="CPI vs USD Chart Reaction" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: USD chart reacting to a CPI surprise.</p>
          </div>
          <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-8 shadow-inner flex items-start">
            <Lightbulb className="w-8 h-8 text-yellow-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-yellow-200">
              Example: In June 2022, CPI hit 9.1%. Dow fell 600 points in 1 hour.
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* NFP Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">👷‍♂️ 2. NFP – Non-Farm Payrolls</h2>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-6">
            <li>Measures U.S. job creation monthly</li>
            <li>Big surprise = big USD reaction</li>
          </ul>
          {/* Image: Chart showing USD spike post-NFP */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=USD+NFP+Spike" alt="USD Spike Post-NFP" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Chart showing USD spike post-NFP release.</p>
          </div>
          <div className="bg-green-900/30 border border-green-700 rounded-lg p-8 shadow-inner flex items-start">
            <CalendarDays className="w-8 h-8 text-green-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-green-200">
              Watch for Friday releases at 8:30am ET.
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Interest Rate Decisions Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🏦 3. Interest Rate Decisions</h2>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-6">
            <li>Fed, RBA, ECB control short-term rates</li>
            <li>Hikes = bullish for currency, bearish for growth stocks</li>
          </ul>
          {/* Image: Interest rate hike timeline */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Interest+Rate+Timeline" alt="Interest Rate Hike Timeline" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Interest rate hike timeline illustrating SPX pullback.</p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* GDP Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">📉 4. GDP – Total Output</h2>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-6">
            <li>Quarterly growth data on a country's economy</li>
            <li>Slowing GDP → fear → risk-off tone</li>
          </ul>
          <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-8 shadow-inner flex items-start">
            <Lightbulb className="w-8 h-8 text-yellow-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-yellow-200">
              Combine with CPI/NFP for macro bias.
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Consumer Sentiment Index Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🧍 5. Consumer Sentiment</h2>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-6">
            <li>Measures public confidence in the economy</li>
            <li>Lower sentiment = less spending = weaker GDP ahead</li>
          </ul>
          <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-8 shadow-inner flex items-start">
            <LineChart className="w-8 h-8 text-purple-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-purple-200">
              Often a <strong className="text-white">leading</strong> signal.
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Analogy Box */}
        <div className="mb-16 bg-blue-900/30 border border-blue-700 rounded-lg p-8 shadow-inner flex items-start">
          <Lightbulb className="w-8 h-8 text-blue-300 mr-4 flex-shrink-0" />
          <p className="italic text-xl text-blue-200">
            📦 "Central banks are DJs. Macro data is the music. Hot CPI? They crank the volume. Weak NFP? They lower the bass."
          </p>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* How to Track This Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🧠 How to Track All This</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Use calendars like:
          </p>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-6">
            <li><a href="https://www.forexfactory.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Forex Factory</a></li>
            <li><a href="https://tradingeconomics.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Trading Economics</a></li>
            <li><a href="https://www.investing.com/economic-calendar/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Investing.com</a></li>
          </ul>
          {/* Image: Economic calendar screenshot */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Economic+Calendar+Screenshot" alt="Economic Calendar Screenshot" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Screenshot of an economic calendar highlighting red-impact events.</p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Practice Activity Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🛠️ Practice Activity</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Open an economic calendar and:
          </p>
          <ol className="list-decimal list-inside text-xl text-gray-300 ml-6 space-y-4">
            <li>Find the next CPI and NFP dates</li>
            <li>Look up how the market reacted after the last release</li>
            <li>Share your findings in Discord: "Lesson 2 Macro Insights"</li>
          </ol>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Quiz Section */}
        <div className="mb-16 bg-gray-900 p-10 rounded-xl shadow-2xl border border-gray-800">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">📚 Quiz: Test Yourself</h2>
          <p className="italic text-xl text-gray-400 mb-8 text-center">
            _Pick the best answer for each question._
          </p>
          <div className="space-y-12">
            {/* Question 1 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                1. Which indicator measures price inflation?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) GDP
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  B) CPI
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) NFP
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) PMI
                </li>
              </ul>
            </div>

            {/* Question 2 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                2. Why do interest rate decisions matter?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) They affect consumer emotion
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  B) They move currency & bond yields
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) They track oil prices
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) They follow moving averages
                </li>
              </ul>
            </div>

            {/* Question 3 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                3. What's a common release time for NFP?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Tuesday 5pm
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) Thursday 9am
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) Friday 8:30am ET
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Saturday midnight
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Call to Action: Next Lesson */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready for Deeper Dives?</h2>
          <Link href="/education/fundamentals-3" passHref>
            <div className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
              Next Lesson: Earnings, Revenue & Company-Specific Data
              <ArrowRight className="w-8 h-8 ml-4" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 