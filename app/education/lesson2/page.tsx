import Link from 'next/link';
import { PlayCircle, BookOpen, BarChart, Lightbulb, CheckCircle, XCircle, ArrowRight, TrendingUp, TrendingDown, RefreshCw, Layers } from 'lucide-react';

export default function Lesson2Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Course Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-600 text-blue-100 mb-4 shadow-lg">
            <BookOpen className="w-4 h-4 mr-2" /> Beginner Level
          </span>
          <h1 className="text-6xl font-extrabold text-white mb-4 leading-tight tracking-tighter">
            Candlestick Charts 101
          </h1>
          <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto">
            Candles are more than just colors — they tell the story of every price battle on the chart.
          </p>
        </div>

        {/* Video Overview Section */}
        <div className="mb-16 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <PlayCircle className="w-10 h-10 text-blue-500 mr-4" />
            <div>
              <h2 className="text-4xl font-bold text-white mb-1">Video Overview</h2>
              <p className="text-lg text-gray-400">Watch this 4-minute breakdown to learn the core structure and psychology of candlesticks.</p>
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
                title="Lesson 2: Candlestick Charts 101"
                className="w-full h-full"
              ></iframe> */}
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* What is a Candlestick? Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">📖 What is a Candlestick?</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            Each candle represents how price moved during a set period (e.g., 1 minute, 1 hour, 1 day).
          </p>
          <div className="overflow-x-auto mb-10">
            <table className="min-w-full bg-gray-900 shadow-xl rounded-xl overflow-hidden border border-gray-800">
              <thead className="bg-gray-800">
                <tr>
                  <th className="py-4 px-6 text-left text-lg font-semibold text-gray-300">Part</th>
                  <th className="py-4 px-6 text-left text-lg font-semibold text-gray-300">Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6 text-lg text-gray-300"><strong className="text-white">Body</strong></td>
                  <td className="py-4 px-6 text-lg text-gray-300">Distance between open and close</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6 text-lg text-gray-300"><strong className="text-white">Wick (Shadow)</strong></td>
                  <td className="py-4 px-6 text-lg text-gray-300">Highest and lowest prices reached</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-lg text-gray-300"><strong className="text-white">Color</strong></td>
                  <td className="py-4 px-6 text-lg text-gray-300">Green = close &gt; open (bullish), Red = close &lt; open (bearish)</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Diagram: Candlestick anatomy */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Candlestick+Anatomy+Diagram" alt="Candlestick Anatomy Diagram" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Understanding the open, close, high, and low of a candle.</p>
          </div>
          <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-8 shadow-inner flex items-start">
            <Lightbulb className="w-8 h-8 text-yellow-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-yellow-200">
              Tip: The shorter the body, the more indecisive the session.
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Candlestick Psychology Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🧠 Candlestick Psychology</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            Candles = emotional footprints of the market.
          </p>
          <h3 className="text-3xl font-bold text-white mb-6">Here are four powerful ones to master first:</h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Doji */}
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 shadow-lg flex items-start">
              <RefreshCw className="w-8 h-8 text-orange-400 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Doji <span className="text-orange-400">• Indecision</span></h3>
                <p className="text-lg text-gray-400 mb-4">Tug-of-war between buyers and sellers.</p>
                <p className="italic text-xl text-orange-200">“Market paused — nobody's in control.”</p>
                <div className="relative w-full mt-6 aspect-[16/9] bg-gray-800 flex items-center justify-center rounded-md border border-gray-700">
                  <img src="https://via.placeholder.com/300x170/1A202C/A0AEC0?text=Doji+Candle" alt="Doji Candle" className="object-contain h-full" />
                  <p className="absolute bottom-2 right-2 text-xs text-gray-500">Diagram: Doji</p>
                </div>
              </div>
            </div>

            {/* Hammer */}
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 shadow-lg flex items-start">
              <TrendingUp className="w-8 h-8 text-green-400 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Hammer <span className="text-green-400">• Bullish Reversal</span></h3>
                <p className="text-lg text-gray-400 mb-4">Buyers fight back after a sell-off. Often signals a reversal.</p>
                <p className="italic text-xl text-green-200">“We dipped, but bulls came swinging.”</p>
                <div className="relative w-full mt-6 aspect-[16/9] bg-gray-800 flex items-center justify-center rounded-md border border-gray-700">
                  <img src="https://via.placeholder.com/300x170/1A202C/A0AEC0?text=Hammer+Candle" alt="Hammer Candle" className="object-contain h-full" />
                  <p className="absolute bottom-2 right-2 text-xs text-gray-500">Diagram: Hammer</p>
                </div>
              </div>
            </div>

            {/* Shooting Star */}
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 shadow-lg flex items-start">
              <TrendingDown className="w-8 h-8 text-red-400 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Shooting Star <span className="text-red-400">• Bearish Reversal</span></h3>
                <p className="text-lg text-gray-400 mb-4">Fakeout to the upside, then crash. Bearish reversal.</p>
                <p className="italic text-xl text-red-200">“Wick high, close low = trap confirmed.”</p>
                <div className="relative w-full mt-6 aspect-[16/9] bg-gray-800 flex items-center justify-center rounded-md border border-gray-700">
                  <img src="https://via.placeholder.com/300x170/1A202C/A0AEC0?text=Shooting+Star+Candle" alt="Shooting Star Candle" className="object-contain h-full" />
                  <p className="absolute bottom-2 right-2 text-xs text-gray-500">Diagram: Shooting Star</p>
                </div>
              </div>
            </div>

            {/* Engulfing */}
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 shadow-lg flex items-start">
              <Layers className="w-8 h-8 text-blue-400 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Engulfing <span className="text-blue-400">• Momentum Shift</span></h3>
                <p className="text-lg text-gray-400 mb-4">When one candle fully consumes the last — big momentum shift.</p>
                <p className="italic text-xl text-blue-200">“The market just flipped the script.”</p>
                <div className="relative w-full mt-6 aspect-[16/9] bg-gray-800 flex items-center justify-center rounded-md border border-gray-700">
                  <img src="https://via.placeholder.com/300x170/1A202C/A0AEC0?text=Engulfing+Candle" alt="Engulfing Candle" className="object-contain h-full" />
                  <p className="absolute bottom-2 right-2 text-xs text-gray-500">Diagram: Engulfing</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Real-World Example Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🔍 Real-World Example: AAPL Bullish Engulfing</h2>
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg mb-8 shadow-xl border border-gray-700">
            {/* Chart Image Placeholder */}
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=AAPL+Bullish+Engulfing+Chart" alt="AAPL showing bullish engulfing at support" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: 3 consecutive engulfing candles at support = real buyer strength.</p>
          </div>
          <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-8 shadow-inner">
            <p className="italic text-xl text-purple-200">
              “This often leads to breakouts or strong trend continuation.”
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Practice Activity Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🛠️ Practice Activity</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Open <a href="https://tradingview.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">TradingView</a>:
          </p>
          <ol className="list-decimal list-inside text-xl text-gray-300 ml-6 space-y-4">
            <li>Search for any asset (e.g. AAPL, BTC, AUD/USD)</li>
            <li>Find a <strong className="text-white">bullish engulfing</strong> candle near a support level</li>
            <li>Mark it using the brush tool</li>
            <li>Screenshot and share in our Discord!</li>
          </ol>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Quiz Section */}
        <div className="mb-16 bg-gray-900 p-10 rounded-xl shadow-2xl border border-gray-800">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">📚 Quiz: Test Your Understanding</h2>
          <p className="italic text-xl text-gray-400 mb-8 text-center">
            _Pick the best answer for each question._
          </p>
          <div className="space-y-12">
            {/* Question 1 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                1. What does a long wick at the top of a candle mean?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Price exploded upward and stayed there
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  B) Price was rejected at the high
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) Nothing
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Strong bullish trend
                </li>
              </ul>
            </div>

            {/* Question 2 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                2. What does a bullish engulfing candle indicate?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  A) Buyers took control
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) Indecision
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) Market crash
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Doji incoming
                </li>
              </ul>
            </div>

            {/* Question 3 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                3. Which candle often signals a reversal after a dip?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Doji
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  B) Hammer
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) Shooting Star
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Bear Trap
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Call to Action: Next Lesson */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready for the Next Step?</h2>
          <Link href="/education/lesson3" passHref>
            <div className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
              Next Lesson: Support & Resistance
              <ArrowRight className="w-8 h-8 ml-4" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 