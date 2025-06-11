import Link from 'next/link';
import { PlayCircle, BookOpen, Lightbulb, CheckCircle, XCircle, ArrowRight, TrendingUp, DollarSign, Target, Percent, Map, Navigation, Flag, Calendar } from 'lucide-react';

export default function FundamentalsLesson5Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Course Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-600 text-blue-100 mb-4 shadow-lg">
            <BookOpen className="w-4 h-4 mr-2" /> Premium Lesson
          </span>
          <h1 className="text-6xl font-extrabold text-white mb-4 leading-tight tracking-tighter">
            Combining FA with TA (Smart Fusion)
          </h1>
          <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto">
            Learn how top traders align fundamental bias with technical setups for high-conviction entries.
          </p>
        </div>

        {/* Video Overview Section */}
        <div className="mb-16 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <PlayCircle className="w-10 h-10 text-blue-500 mr-4" />
            <div>
              <h2 className="text-4xl font-bold text-white mb-1">Video Overview</h2>
              <p className="text-lg text-gray-400">Learn how to combine fundamental analysis with technical analysis for powerful trading setups.</p>
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
                title="Lesson 5: Combining FA with TA (Smart Fusion)"
                className="w-full h-full"
              ></iframe> */}
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Why Combine Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🔗 Why Combine FA + TA?</h2>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-6">
            <li>FA builds long-term <em className="text-white">bias</em></li>
            <li>TA helps pinpoint <em className="text-white">entries/exits</em></li>
          </ul>
          {/* Image: Google Maps vs Waze analogy */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Google+Maps+vs+Waze" alt="Google Maps vs Waze Analogy" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Google Maps (FA) vs Waze (TA) - both help you reach your destination.</p>
          </div>
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-8 shadow-inner flex items-start">
            <Lightbulb className="w-8 h-8 text-blue-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-blue-200">
              "Fundamentals tell you WHY. Technicals tell you WHEN."
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Example Setups Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🧠 Example Fusion Setups</h2>
          
          {/* Setup 1 */}
          <div className="bg-gray-900 p-8 rounded-xl mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">1. Macro + Technical</h3>
            <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3">
              <li>📌 CPI comes in hot → USD expected to rise</li>
              <li>📉 TA shows DXY pullback → Entry at support</li>
            </ul>
          </div>

          {/* Setup 2 */}
          <div className="bg-gray-900 p-8 rounded-xl mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">2. Earnings + Chart Pattern</h3>
            <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3">
              <li>📌 Apple beats earnings → Price flags</li>
              <li>📈 TA breakout = entry</li>
            </ul>
          </div>

          {/* Setup 3 */}
          <div className="bg-gray-900 p-8 rounded-xl mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">3. News Spike + Fade</h3>
            <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3">
              <li>📌 Oil spikes on war fears → Price goes parabolic</li>
              <li>📉 Look for exhaustion candle → Short setup</li>
            </ul>
          </div>

          {/* Example Charts */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Example+Setups" alt="Example Setups" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: CPI + USD chart, AAPL flag, Oil blowoff top examples.</p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Smart Trader Checklist Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">✅ Smart Trader Checklist</h2>
          <ol className="list-decimal list-inside text-xl text-gray-300 ml-6 space-y-4 mb-6">
            <li>Use FA to form bias (CPI, NFP, earnings, war)</li>
            <li>Watch for scheduled events (economic + earnings calendars)</li>
            <li>Use TA tools:
              <ul className="list-disc list-inside ml-8 mt-2 space-y-2">
                <li>Support & resistance</li>
                <li>Chart patterns</li>
                <li>Indicators (RSI, MACD)</li>
              </ul>
            </li>
            <li>Don't fade fundamentals unless you're scalping</li>
            <li>Always review and journal trades</li>
          </ol>
          <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-8 shadow-inner flex items-start">
            <Calendar className="w-8 h-8 text-purple-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-purple-200">
              "Keep an economic calendar handy — it's your trading roadmap."
            </p>
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
                1. What's the main benefit of combining FA with TA?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) More complexity
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  B) Better entry + stronger bias
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) You avoid losing
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Less risk
                </li>
              </ul>
            </div>

            {/* Question 2 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                2. Which is a good example of FA + TA fusion?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) RSI + Bollinger Bands
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  B) CPI beats + USD pullback long
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) MACD divergence only
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Ignoring news
                </li>
              </ul>
            </div>

            {/* Question 3 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                3. What's the role of FA in trading?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Tells you when to enter
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  B) Creates directional bias
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) Draws patterns
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Shows leverage
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Module Complete Section */}
        <div className="text-center">
          <div className="mb-8">
            <span className="inline-flex items-center px-6 py-3 rounded-full text-xl font-medium bg-green-600 text-green-100 shadow-lg">
              <CheckCircle className="w-6 h-6 mr-2" /> Module Complete
            </span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">🎉 You've Finished the Beginner Fundamentals Track!</h2>
          <Link href="/education/fundamentals-intermediate-1" passHref>
            <div className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
              Go to Intermediate Fundamentals
              <ArrowRight className="w-8 h-8 ml-4" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 
 