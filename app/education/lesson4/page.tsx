import Link from 'next/link';
import { PlayCircle, BookOpen, Lightbulb, CheckCircle, XCircle, ArrowRight, TrendingUp, TrendingDown, Layers, LineChart } from 'lucide-react';

export default function Lesson4Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Course Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-600 text-blue-100 mb-4 shadow-lg">
            <BookOpen className="w-4 h-4 mr-2" /> Beginner Level
          </span>
          <h1 className="text-6xl font-extrabold text-white mb-4 leading-tight tracking-tighter">
            Trendlines & Channels
          </h1>
          <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto">
            Markets move in trends — not straight lines. Learn to spot and trade them like a pro.
          </p>
        </div>

        {/* Video Overview Section */}
        <div className="mb-16 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <PlayCircle className="w-10 h-10 text-blue-500 mr-4" />
            <div>
              <h2 className="text-4xl font-bold text-white mb-1">Video Overview</h2>
              <p className="text-lg text-gray-400">Learn how to spot, draw, and trade trendlines and channels to time your entries.</p>
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
                title="Lesson 4: Trendlines & Channels"
                className="w-full h-full"
              ></iframe> */}
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* What is a Trendline? Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">📈 What is a Trendline?</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            A <strong className="text-white">trendline</strong> is a diagonal line that connects two or more swing highs or lows.
          </p>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-10">
            <li><strong className="text-white">Uptrendline</strong>: connects higher lows → shows buyer strength</li>
            <li><strong className="text-white">Downtrendline</strong>: connects lower highs → shows seller strength</li>
          </ul>
          {/* Image: Upward trendline (higher lows) */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Upward+Trendline" alt="Upward Trendline" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Trendline connecting higher lows on a BTC chart, indicating buyer strength.</p>
          </div>
          <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-8 shadow-inner flex items-start">
            <Lightbulb className="w-8 h-8 text-yellow-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-yellow-200">
              Pro Tip: The more times price respects the line, the more meaningful it becomes.
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Mental Model: "Diagonal Support" Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🧠 Mental Model: "Diagonal Support"</h2>
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-8 shadow-inner flex items-start">
            <LineChart className="w-8 h-8 text-blue-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-blue-200">
              "Trendlines are diagonal support or resistance. They tilt with momentum — not just time."
            </p>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed mt-8 mb-6">
            Use them to:
          </p>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3">
            <li>Identify the trend direction</li>
            <li>Plan pullback entries</li>
            <li>Manage stop-losses logically</li>
          </ul>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Channels Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">📐 Channels</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            Draw a <strong className="text-white">parallel line</strong> to your trendline to form a <strong className="text-white">price channel</strong>.
          </p>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-10">
            <li><strong className="text-white">Ascending Channel</strong>: bullish</li>
            <li><strong className="text-white">Descending Channel</strong>: bearish</li>
            <li><strong className="text-white">Flat Channel</strong>: ranging</li>
          </ul>
          {/* Image: Price contained in an upward and downward channel */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Price+Channel+Diagram" alt="Price Channel Diagram" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Price contained within ascending and descending channels.</p>
          </div>
          <div className="bg-green-900/30 border border-green-700 rounded-lg p-8 shadow-inner flex items-start">
            <Lightbulb className="w-8 h-8 text-green-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-green-200">
              Pro Tip: Channels act as dynamic zones — use them to buy low, sell high inside the range.
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* How to Trade It Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🔄 How to Trade It</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Trendlines & channels can be used for:
          </p>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-10">
            <li><strong className="text-white">Bounces</strong>: Buy near trendline in uptrend</li>
            <li><strong className="text-white">Breakouts</strong>: Enter once price closes strongly outside</li>
            <li><strong className="text-white">Stops</strong>: Set slightly beyond the trendline</li>
          </ul>
          {/* Real Chart: NASDAQ bouncing on bullish trendline 3 times before breakdown */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=NASDAQ+Trendline+Chart" alt="NASDAQ Trendline Chart" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: NASDAQ bouncing on bullish trendline 3 times before a breakdown.</p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Practice Activity Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🛠️ Practice Activity</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Go to <a href="https://tradingview.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">TradingView</a>:
          </p>
          <ol className="list-decimal list-inside text-xl text-gray-300 ml-6 space-y-4">
            <li>Choose a trending asset (BTC, NASDAQ, AUD/USD)</li>
            <li>Set chart to 1H or 4H</li>
            <li>Draw an uptrendline or downtrendline</li>
            <li>Copy it to form a channel</li>
            <li>Mark 2 entry points and note where a breakout might occur</li>
            <li>Screenshot & upload to Discord with caption: "Lesson 4 trendline play"</li>
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
                1. What does a trendline show in a chart?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) News volatility
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  B) Diagonal support/resistance
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) Trading volume
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Fibonacci levels
                </li>
              </ul>
            </div>

            {/* Question 2 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                2. What's required to draw a valid trendline?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Two wicks anywhere
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  B) At least 2-3 respected highs/lows
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) Indicator confirmation
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) A flat chart
                </li>
              </ul>
            </div>

            {/* Question 3 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                3. A breakout from a channel signals?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Consolidation
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  B) Trend reversal or continuation
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) News release
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) No signal
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Call to Action: Next Lesson */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready for the Next Step?</h2>
          <Link href="/education/lesson5" passHref>
            <div className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
              Next Lesson: Chart Patterns (Basics)
              <ArrowRight className="w-8 h-8 ml-4" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 