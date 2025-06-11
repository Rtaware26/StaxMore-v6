import Link from 'next/link';
import { PlayCircle, BookOpen, Lightbulb, CheckCircle, XCircle, ArrowRight, TrendingUp, TrendingDown, Clock } from 'lucide-react';

export default function Lesson6Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Course Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-600 text-blue-100 mb-4 shadow-lg">
            <BookOpen className="w-4 h-4 mr-2" /> Premium Lesson
          </span>
          <h1 className="text-6xl font-extrabold text-white mb-4 leading-tight tracking-tighter">
            Moving Averages
          </h1>
          <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto">
            Moving Averages help you follow the trend, ignore noise, and find dynamic levels where price reacts. Let's break it down.
          </p>
        </div>

        {/* Video Overview Section */}
        <div className="mb-16 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <PlayCircle className="w-10 h-10 text-blue-500 mr-4" />
            <div>
              <h2 className="text-4xl font-bold text-white mb-1">Video Overview</h2>
              <p className="text-lg text-gray-400">Moving Averages help you follow the trend, ignore noise, and find dynamic levels where price reacts. Let's break it down.</p>
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
                title="Lesson 6: Moving Averages"
                className="w-full h-full"
              ></iframe> */}
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* What is a Moving Average? Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">📈 What is a Moving Average?</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            A <strong className="text-white">moving average (MA)</strong> is a smooth line showing the average price over a selected number of candles.
          </p>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-10">
            <li>It follows price but smooths it out</li>
            <li>Helps confirm the trend</li>
            <li>Often acts as support or resistance</li>
          </ul>
          {/* Image: Moving average smoothing a volatile chart */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=MA+Smoothing+Chart" alt="MA Smoothing Chart" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Moving average smoothing out volatile candles.</p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Types of Moving Averages Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🧮 Types of Moving Averages</h2>

          {/* Simple Moving Average (SMA) */}
          <div className="mb-10">
            <h3 className="text-3xl font-bold text-white mb-4">✅ Simple Moving Average (SMA)</h3>
            <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3">
              <li>Equal weight to all candles</li>
              <li>Slower, smoother, good for confirmation</li>
            </ul>
          </div>

          {/* Exponential Moving Average (EMA) */}
          <div className="mb-10">
            <h3 className="text-3xl font-bold text-white mb-4">✅ Exponential Moving Average (EMA)</h3>
            <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3">
              <li>Gives more weight to recent candles</li>
              <li>Reacts faster to trend shifts</li>
            </ul>
          </div>

          {/* Image: SMA vs EMA overlaid on chart */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=SMA+vs+EMA" alt="SMA vs EMA" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: SMA vs EMA overlaid on a chart, showing their different responsiveness.</p>
          </div>

          <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-8 shadow-inner flex items-start">
            <Lightbulb className="w-8 h-8 text-yellow-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-yellow-200">
              Tip: Use <strong className="text-white">21 EMA</strong> for short-term trend. Use <strong className="text-white">50 SMA</strong> or <strong className="text-white">200 SMA</strong> for long-term bias.
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* How Traders Use Them Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">💡 How Traders Use Moving Averages</h2>
          <ol className="list-decimal list-inside text-xl text-gray-300 ml-6 space-y-4 mb-10">
            <li><strong className="text-white">Trend Bias</strong>
              <ul className="list-disc list-inside ml-8 mt-2 space-y-2">
                <li>Price above MA = bullish bias</li>
                <li>Price below MA = bearish</li>
              </ul>
            </li>
            <li><strong className="text-white">Bounce Entries</strong>
              <ul className="list-disc list-inside ml-8 mt-2 space-y-2">
                <li>Price pulls back to MA and bounces = good entry zone</li>
              </ul>
            </li>
            <li><strong className="text-white">MA Crossovers</strong>
              <ul className="list-disc list-inside ml-8 mt-2 space-y-2">
                <li><strong className="text-white">Golden Cross</strong> = 50 crosses above 200 → bullish trend</li>
                <li><strong className="text-white">Death Cross</strong> = 50 crosses below 200 → bearish trend</li>
              </ul>
            </li>
          </ol>

          {/* Image: Diagram showing Golden Cross vs Death Cross */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Golden+Death+Cross" alt="Golden and Death Cross Diagram" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Diagram showing Golden Cross vs Death Cross patterns.</p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Real Market Examples Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🔍 Real Market Examples</h2>
          {/* Chart: ETH respecting 21 EMA in an uptrend */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=ETH+21EMA+Bounce" alt="ETH 21 EMA Bounce" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: ETH chart showing price respecting 21 EMA in an uptrend.</p>
          </div>
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-8 shadow-inner flex items-start">
            <Lightbulb className="w-8 h-8 text-blue-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-blue-200">
              Pro Tip: Price bouncing 3+ times off the 21 EMA → shows buyers defending the level. Break below? Could signal a shift.
            </p>
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
            <li>Apply a 21 EMA and a 50 SMA to BTC, ETH, or SPX</li>
            <li>Find:
              <ul className="list-disc list-inside ml-8 mt-2 space-y-2">
                <li>At least 1 price bounce on a moving average</li>
                <li>1 possible crossover</li>
              </ul>
            </li>
            <li>Screenshot and drop in Discord as: "Lesson 6 MA setup"</li>
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
                1. What does a 50 EMA show?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Volatility spikes
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  B) Average price of last 50 candles
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) RSI divergence
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Volume strength
                </li>
              </ul>
            </div>

            {/* Question 2 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                2. What is a Golden Cross?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) RSI > 70
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) News breakout
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) 50 MA crossing above 200
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Price crossing VWAP
                </li>
              </ul>
            </div>

            {/* Question 3 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                3. Which MA reacts faster?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) SMA
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  B) EMA
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) VWAP
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Trendline
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Call to Action: Next Lesson */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready for the Next Step?</h2>
          <Link href="/education/lesson7" passHref>
            <div className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
              Next Lesson: Risk Management Basics
              <ArrowRight className="w-8 h-8 ml-4" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 