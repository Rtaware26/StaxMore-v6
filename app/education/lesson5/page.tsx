import Link from 'next/link';
import { PlayCircle, BookOpen, Lightbulb, CheckCircle, XCircle, ArrowRight, TrendingUp, TrendingDown, Layers, LineChart, Flag, Triangle, ArrowUpDown } from 'lucide-react';

export default function Lesson5Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Course Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-600 text-blue-100 mb-4 shadow-lg">
            <BookOpen className="w-4 h-4 mr-2" /> Beginner Level
          </span>
          <h1 className="text-6xl font-extrabold text-white mb-4 leading-tight tracking-tighter">
            Chart Patterns (Basics)
          </h1>
          <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto">
            Chart patterns are the market's way of sending clues. Learn to spot common structures that signal continuation or reversal.
          </p>
        </div>

        {/* Video Overview Section */}
        <div className="mb-16 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <PlayCircle className="w-10 h-10 text-blue-500 mr-4" />
            <div>
              <h2 className="text-4xl font-bold text-white mb-1">Video Overview</h2>
              <p className="text-lg text-gray-400">Learn how to spot common structures that signal continuation or reversal — before they happen.</p>
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
                title="Lesson 5: Chart Patterns (Basics)"
                className="w-full h-full"
              ></iframe> */}
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Continuation Patterns Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🔁 Continuation Patterns</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            These show the trend is <strong className="text-white">pausing</strong>, not ending.
          </p>

          {/* Bull Flag */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-6">✅ Bull Flag</h3>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              Price rallies → forms downward-sloping mini channel → breaks up
            </p>
            <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
              <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Bull+Flag+Pattern" alt="Bull Flag Pattern" className="object-cover w-full h-full rounded-lg" />
              <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Bull flag pattern showing consolidation before continuation.</p>
            </div>
            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-8 shadow-inner flex items-start">
              <Lightbulb className="w-8 h-8 text-yellow-300 mr-4 flex-shrink-0" />
              <p className="italic text-xl text-yellow-200">
                Mental Model: Slingshot pattern — tension before continuation.
              </p>
            </div>
          </div>

          {/* Bear Flag */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-6">✅ Bear Flag</h3>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              Downtrend → upward-sloping mini pullback → breakdown
            </p>
            <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
              <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Bear+Flag+Pattern" alt="Bear Flag Pattern" className="object-cover w-full h-full rounded-lg" />
              <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Bear flag pattern showing consolidation before continuation.</p>
            </div>
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-8 shadow-inner flex items-start">
              <Lightbulb className="w-8 h-8 text-red-300 mr-4 flex-shrink-0" />
              <p className="italic text-xl text-red-200">
                Pro Tip: Works best with strong volume drops during the flag.
              </p>
            </div>
          </div>

          {/* Pennant */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-6">✅ Pennant</h3>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              Converging highs/lows after sharp move → breakout
            </p>
            <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
              <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Pennant+Pattern" alt="Pennant Pattern" className="object-cover w-full h-full rounded-lg" />
              <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Pennant pattern showing convergence before breakout.</p>
            </div>
            <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-8 shadow-inner flex items-start">
              <Lightbulb className="w-8 h-8 text-purple-300 mr-4 flex-shrink-0" />
              <p className="italic text-xl text-purple-200">
                Pro Tip: Low volume → big compression → explosion.
              </p>
            </div>
          </div>

          {/* Ascending Triangle */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-6">✅ Ascending Triangle</h3>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              Flat resistance + rising lows
            </p>
            <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
              <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Ascending+Triangle" alt="Ascending Triangle" className="object-cover w-full h-full rounded-lg" />
              <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Ascending triangle showing rising lows against flat resistance.</p>
            </div>
            <div className="bg-green-900/30 border border-green-700 rounded-lg p-8 shadow-inner flex items-start">
              <Lightbulb className="w-8 h-8 text-green-300 mr-4 flex-shrink-0" />
              <p className="italic text-xl text-green-200">
                Pro Tip: Breakout likely once pressure builds enough.
              </p>
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Reversal Patterns Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🔄 Reversal Patterns</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            These signal a <strong className="text-white">trend change</strong> — usually with a battle at key levels.
          </p>

          {/* Double Top / Bottom */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-6">✅ Double Top / Bottom</h3>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              Price fails at the same level twice → reversal
            </p>
            <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
              <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Double+Top+Bottom" alt="Double Top Bottom" className="object-cover w-full h-full rounded-lg" />
              <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Double top/bottom pattern showing price rejection at key levels.</p>
            </div>
          </div>

          {/* Head & Shoulders */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-6">✅ Head & Shoulders</h3>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              One high, higher high, lower high → neckline break
            </p>
            <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
              <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Head+and+Shoulders" alt="Head and Shoulders" className="object-cover w-full h-full rounded-lg" />
              <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Head and shoulders pattern showing market fatigue.</p>
            </div>
            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-8 shadow-inner flex items-start">
              <Lightbulb className="w-8 h-8 text-blue-300 mr-4 flex-shrink-0" />
              <p className="italic text-xl text-blue-200">
                Mental Model: Think of it like market fatigue — each high is weaker.
              </p>
            </div>
          </div>

          {/* Inverse Head & Shoulders */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-6">✅ Inverse Head & Shoulders</h3>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              Opposite version — signals bullish reversal
            </p>
            <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
              <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Inverse+Head+and+Shoulders" alt="Inverse Head and Shoulders" className="object-cover w-full h-full rounded-lg" />
              <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Inverse head and shoulders pattern showing bullish reversal.</p>
            </div>
            <div className="bg-green-900/30 border border-green-700 rounded-lg p-8 shadow-inner flex items-start">
              <Lightbulb className="w-8 h-8 text-green-300 mr-4 flex-shrink-0" />
              <p className="italic text-xl text-green-200">
                Pro Tip: Common in bottom formations after downtrends.
              </p>
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Real Example Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🔍 Real Example</h2>
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=BTC+Chart+Example" alt="BTC Chart Example" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: BTC chart showing bull flag and breakout.</p>
          </div>
          <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-8 shadow-inner flex items-start">
            <Lightbulb className="w-8 h-8 text-yellow-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-yellow-200">
              Pro Tip: Clean consolidation → volume drop → upward explosion.
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
            <li>Choose BTC or SPX</li>
            <li>On 15-min or 1H chart, identify one:
              <ul className="list-disc list-inside ml-8 mt-2 space-y-2">
                <li>Bull Flag or Pennant</li>
                <li>Double Bottom</li>
              </ul>
            </li>
            <li>Screenshot the pattern and drop in Discord with caption: "Lesson 5 Pattern Spot: [pattern name]"</li>
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
                1. What does a bull flag pattern suggest?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Market reversal
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  B) Continuation of uptrend
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) Indecision
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Downtrend forming
                </li>
              </ul>
            </div>

            {/* Question 2 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                2. Which pattern often signals a market top?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  A) Head & Shoulders
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) Triangle
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) Bull Flag
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Doji
                </li>
              </ul>
            </div>

            {/* Question 3 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                3. A double bottom usually forms…?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) During consolidation
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) Near tops
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) After downtrends, signaling reversal
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) With no volume
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Call to Action: Next Lesson */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready for the Next Step?</h2>
          <Link href="/education/lesson6" passHref>
            <div className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
              Next Lesson: Moving Averages
              <ArrowRight className="w-8 h-8 ml-4" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 