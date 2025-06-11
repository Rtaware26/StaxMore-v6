import Link from 'next/link';
import { PlayCircle, BookOpen, Lightbulb, CheckCircle, XCircle, ArrowRight, TrendingUp, DollarSign, Target, Percent, Cloud, Umbrella } from 'lucide-react';

export default function FundamentalsLesson4Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Course Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-600 text-blue-100 mb-4 shadow-lg">
            <BookOpen className="w-4 h-4 mr-2" /> Premium Lesson
          </span>
          <h1 className="text-6xl font-extrabold text-white mb-4 leading-tight tracking-tighter">
            Sentiment, News & Geopolitical Events
          </h1>
          <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto">
            Learn how market sentiment and news events can trigger massive price swings overnight.
          </p>
        </div>

        {/* Video Overview Section */}
        <div className="mb-16 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <PlayCircle className="w-10 h-10 text-blue-500 mr-4" />
            <div>
              <h2 className="text-4xl font-bold text-white mb-1">Video Overview</h2>
              <p className="text-lg text-gray-400">Sentiment and news hit markets with force — let's break down how to read the room before the market reacts.</p>
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
                title="Lesson 4: Sentiment, News & Geopolitical Events"
                className="w-full h-full"
              ></iframe> */}
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* What is Sentiment Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">😨 What is Sentiment?</h2>
          <p className="text-xl text-gray-300 mb-6">
            Sentiment = market's emotional temperature
          </p>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-6">
            <li><strong className="text-white">Bullish:</strong> risk-on, optimism, FOMO</li>
            <li><strong className="text-white">Bearish:</strong> fear, risk-off, panic selling</li>
          </ul>
          {/* Image: Fear & Greed Index */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Fear+%26+Greed+Index" alt="CNN Fear & Greed Index" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: CNN's Fear & Greed Index showing market sentiment.</p>
          </div>
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-8 shadow-inner flex items-start">
            <Lightbulb className="w-8 h-8 text-blue-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-blue-200">
              "It's like group chat vibes — if everyone's scared, markets spiral."
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* News & Geopolitics Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">💣 How News & Geopolitics Move Markets</h2>
          <p className="text-xl text-gray-300 mb-6">
            News events inject volatility. Reactions are fast, often irrational.
          </p>
          <div className="bg-gray-900 p-8 rounded-xl mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Examples:</h3>
            <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3">
              <li>Fed emergency meetings → USD strength</li>
              <li>Wars or invasions → Oil/Gold spike</li>
              <li>Pandemic headlines → Risk assets down</li>
              <li>Elon tweets → Meme coins fly</li>
            </ul>
          </div>
          {/* Image: Timeline of Ukraine news → oil chart */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=News+Timeline+vs+Price" alt="Timeline of Ukraine news → oil chart" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Timeline showing how news events impact price action.</p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Sentiment Tracking Tools Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🔎 Tools for Tracking Sentiment</h2>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-6">
            <li>CNN Fear & Greed Index</li>
            <li>Twitter/X sentiment scrapers (e.g. LunarCrush)</li>
            <li>AAII Investor Sentiment Survey</li>
            <li>CFTC Commitment of Traders (COT) Reports</li>
            <li>Forex Factory's News Impact Scores</li>
          </ul>
          {/* Image: News sentiment dashboard */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=News+Sentiment+Dashboard" alt="News sentiment dashboard" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: News sentiment dashboard with score slider.</p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Strategy Tips Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">📈 Strategy Tips</h2>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-6">
            <li>Don't trade <strong className="text-white">headlines alone</strong> — combine with TA zones</li>
            <li>Look for <strong className="text-white">liquidity grabs</strong> during max fear or euphoria</li>
            <li>Avoid chasing initial moves unless you're scalping news volatility</li>
          </ul>
          <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-8 shadow-inner flex items-start">
            <div className="flex items-center">
              <Cloud className="w-8 h-8 text-purple-300 mr-4" />
              <Umbrella className="w-8 h-8 text-purple-300" />
            </div>
            <p className="italic text-xl text-purple-200 ml-4">
              "Sentiment is the weather. TA is your umbrella."
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Practice Activity Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🛠️ Practice Activity</h2>
          <ol className="list-decimal list-inside text-xl text-gray-300 ml-6 space-y-4">
            <li>Pick a major news headline from the past month</li>
            <li>Observe how it moved an asset (e.g. Gold, BTC, Nasdaq)</li>
            <li>Was the sentiment reaction bullish or bearish?</li>
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
                1. What does 'sentiment' mean in markets?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Chart patterns
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) Economic data
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) Market emotion
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Broker fees
                </li>
              </ul>
            </div>

            {/* Question 2 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                2. Which is a sentiment tracking tool?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Bollinger Bands
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) RSI
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) Fear & Greed Index
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) P/E Ratio
                </li>
              </ul>
            </div>

            {/* Question 3 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                3. How should you trade news-based sentiment?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Chase every spike
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) Only hold long-term
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) Combine with technical zones
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Ignore news completely
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Call to Action: Next Lesson */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Combine FA with TA?</h2>
          <Link href="/education/fundamentals-5" passHref>
            <div className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
              Next Lesson: Combining FA with TA (Smart Fusion)
              <ArrowRight className="w-8 h-8 ml-4" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 
 