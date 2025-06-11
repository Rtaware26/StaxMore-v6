import Link from 'next/link';
import { PlayCircle, BookOpen, Lightbulb, CheckCircle, XCircle, ArrowRight, DollarSign, BarChart2, Calculator } from 'lucide-react';

export default function PsychologyLesson2Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Course Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-600 text-blue-100 mb-4 shadow-lg">
            <BookOpen className="w-4 h-4 mr-2" /> Premium Lesson
          </span>
          <h1 className="text-6xl font-extrabold text-white mb-4 leading-tight tracking-tighter">
            Risk Per Trade — Your Lifeline
          </h1>
          <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto">
            The market doesn't need to kill you — your position sizing can do it for free.
          </p>
        </div>

        {/* Video Overview Section */}
        <div className="mb-16 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <PlayCircle className="w-10 h-10 text-blue-500 mr-4" />
            <div>
              <h2 className="text-4xl font-bold text-white mb-1">Video Overview</h2>
              <p className="text-lg text-gray-400">Understand how to protect your capital with proper risk management.</p>
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
                title="Lesson 2: Risk Per Trade — Your Lifeline"
                className="w-full h-full"
              ></iframe> */}
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* What is Risk Per Trade Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🔑 What is Risk Per Trade?</h2>
          <p className="text-xl text-gray-300 mb-6">
            This is the max amount you're willing to lose per trade.
          </p>
          <p className="text-2xl text-white font-bold mb-4">
            📌 Formula:
          </p>
          <div className="bg-gray-900 p-8 rounded-xl mb-8 flex items-center justify-center">
            <p className="text-4xl font-extrabold text-blue-400">
              Risk ($) = Account Size × % Risk
            </p>
          </div>
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-8 shadow-inner flex items-start">
            <DollarSign className="w-8 h-8 text-blue-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-blue-200">
              Example: $1,000 account × 2% risk = $20 max loss
            </p>
          </div>
          {/* Image: Risk calculator example */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mt-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Risk+Calculator+Example" alt="Risk Calculator Example" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Visualizing a 2% risk calculation.</p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Why It Saves Accounts Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">📉 Why It Saves Accounts</h2>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-6">
            <li>One oversized loss can wipe 30–50% of your capital</li>
            <li>Consistent small losses = survivable</li>
            <li>Gives emotional confidence and clarity</li>
          </ul>
          {/* Image: Chart showing multiple small losses vs one big loss */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Small+Losses+vs+Big+Loss" alt="Small Losses vs Big Loss Chart" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: The stark contrast between controlled small losses and a devastating large loss.</p>
          </div>
          <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-8 shadow-inner flex items-start">
            <Lightbulb className="w-8 h-8 text-purple-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-purple-200">
              "Trading without risk control is like driving without brakes."
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* How To Do It Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">⚙️ How To Do It (Step-by-Step)</h2>
          <ol className="list-decimal list-inside text-xl text-gray-300 ml-6 space-y-4 mb-6">
            <li>Choose % risk (1–2% is common)</li>
            <li>Calculate dollar risk</li>
            <li>Measure your stop loss distance</li>
            <li>Use a calculator to determine lot size</li>
          </ol>
          <h3 className="text-2xl font-bold text-white mb-4">📌 Tools:</h3>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-6">
            <li><a href="https://www.babypips.com/tools/forex-calculators/position-size" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Babypips Position Size Tool</a></li>
            <li>TradingView's position tool</li>
            <li>MT4/MT5 risk calculator plug-ins</li>
          </ul>
          {/* Image: Babypips or TradingView position size calculator */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mt-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Position+Size+Calculator" alt="Position Size Calculator Example" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: An example of an online position size calculator.</p>
          </div>
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
                1. What is "risk per trade"?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) How much profit you want
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) Your potential drawdown
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) Max loss allowed per trade
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Broker margin
                </li>
              </ul>
            </div>

            {/* Question 2 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                2. What happens if you ignore risk per trade?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Nothing
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) Win faster
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) Blow your account on one trade
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Make smaller profits
                </li>
              </ul>
            </div>

            {/* Question 3 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                3. If you have $5,000 and risk 2%, how much is your risk per trade?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) $500
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  B) $100
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) $50
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) $250
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Call to Action: Next Lesson */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Master the Next Aspect of Trading Psychology?</h2>
          <Link href="/education/beginner/psychology-3" passHref>
            <div className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
              Next Lesson: Emotional Triggers – Spotting the Enemy Within
              <ArrowRight className="w-8 h-8 ml-4" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 