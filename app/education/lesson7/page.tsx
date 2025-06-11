import Link from 'next/link';
import { PlayCircle, BookOpen, Lightbulb, CheckCircle, XCircle, ArrowRight, Shield, DollarSign, Scale } from 'lucide-react';

export default function Lesson7Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Course Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-600 text-blue-100 mb-4 shadow-lg">
            <BookOpen className="w-4 h-4 mr-2" /> Premium Lesson
          </span>
          <h1 className="text-6xl font-extrabold text-white mb-4 leading-tight tracking-tighter">
            Risk Management Basics
          </h1>
          <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto">
            Trading is a game of survival — not just high scores. Risk management is your shield against randomness, greed, and drawdowns.
          </p>
        </div>

        {/* Video Overview Section */}
        <div className="mb-16 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <PlayCircle className="w-10 h-10 text-blue-500 mr-4" />
            <div>
              <h2 className="text-4xl font-bold text-white mb-1">Video Overview</h2>
              <p className="text-lg text-gray-400">Trading is a game of survival — not just high scores. Risk management is your shield against randomness, greed, and drawdowns.</p>
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
                title="Lesson 7: Risk Management Basics"
                className="w-full h-full"
              ></iframe> */}
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* What is Risk Management? Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">⚖️ What is Risk Management?</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            Risk management is how you protect your capital from big losses.
            It involves:
          </p>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-10">
            <li>Setting proper stop losses</li>
            <li>Controlling how much you risk per trade</li>
            <li>Understanding risk:reward dynamics</li>
            <li>Scaling size based on account and volatility</li>
          </ul>
          <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-8 shadow-inner flex items-start">
            <Lightbulb className="w-8 h-8 text-yellow-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-yellow-200">
              Mental Model: Think of it like a helmet: you hope you don't need it, but it can save your life.
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Risk Per Trade Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">💸 Risk Per Trade</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Rule of thumb: <strong className="text-white">Never risk more than 1–2% of your total account per trade</strong>.
          </p>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Example:
          </p>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-10">
            <li>Account: $10,000</li>
            <li>Max risk (1%) = $100</li>
          </ul>
          {/* Image: Risk % graphic (1% of account balance) */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=1%25+Risk+Allocation" alt="1% Risk Allocation" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Pie chart showing 1% risk allocation.</p>
          </div>
          <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-8 shadow-inner flex items-start">
            <Scale className="w-8 h-8 text-purple-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-purple-200">
              Formula: <code className="font-mono text-white">Risk = (Entry – Stop Loss) × Lot Size</code>
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Risk to Reward Ratio Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🧠 Risk to Reward Ratio</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Your <strong className="text-white">R:R ratio</strong> tells you how much potential reward you get for each dollar you risk.
          </p>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-10">
            <li>1:1 → break even at 50% win rate</li>
            <li>1:2 → profitable at just 34% win rate</li>
            <li>1:3 → even better margin of error</li>
          </ul>
          {/* Image: Risk:Reward bar chart (1:2, 1:3) */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Risk+Reward+Bar+Chart" alt="Risk Reward Bar Chart" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Bar graph visual illustrating different risk:reward ratios.</p>
          </div>
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-8 shadow-inner flex items-start">
            <Lightbulb className="w-8 h-8 text-blue-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-blue-200">
              Mental Model: "You're not betting on being right — you're betting on outcomes over time."
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Stop Losses & Position Sizing Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🧯 Stop Losses & Position Sizing</h2>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-10">
            <li><strong className="text-white">Stop Loss</strong>: Logical exit when the trade is invalidated</li>
            <li><strong className="text-white">Position Sizing</strong>: Adjust trade size to keep risk fixed
              <ul className="list-disc list-inside ml-8 mt-2 space-y-2">
                <li>Tighter stops = bigger position</li>
                <li>Wider stops = smaller position</li>
              </ul>
            </li>
          </ul>
          {/* Image: Chart with stop loss placed under market structure */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Stop+Loss+Position+Sizing" alt="Stop Loss Position Sizing" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Chart with stop loss placed under market structure, illustrating position sizing.</p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Practice Activity Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🛠️ Practice Activity</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Open your trading platform (or <a href="https://tradingview.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">TradingView</a>) and simulate a trade:
          </p>
          <ol className="list-decimal list-inside text-xl text-gray-300 ml-6 space-y-4">
            <li>Pick a random trade idea on TradingView</li>
            <li>Choose your entry and stop-loss level</li>
            <li>Use this formula: <code className="font-mono text-white">Lot Size = Max Risk ÷ (Entry – Stop Loss)</code></li>
            <li>Calculate position size for a $5,000 account with 1% risk</li>
            <li>Share in Discord: "Lesson 7 RM Setup" + screenshot</li>
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
                1. What's a healthy risk per trade for most accounts?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) 10%
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) 25%
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) 1–2%
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) As much as needed
                </li>
              </ul>
            </div>

            {/* Question 2 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                2. If you risk $100 and aim to make $300, what's your R:R?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) 3:1
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  B) 1:3
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) 2:1
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) 1:2
                </li>
              </ul>
            </div>

            {/* Question 3 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                3. Why is position sizing important?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) To trade bigger
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) To make every trade exciting
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) To keep total risk fixed
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) So you can double the account faster
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Call to Action: Next Lesson */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Master Your Risk?</h2>
          <Link href="/education/lesson8" passHref>
            <div className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
              Next Lesson: Trading Psychology
              <ArrowRight className="w-8 h-8 ml-4" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 