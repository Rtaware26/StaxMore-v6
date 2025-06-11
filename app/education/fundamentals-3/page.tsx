import Link from 'next/link';
import { PlayCircle, BookOpen, Lightbulb, CheckCircle, XCircle, ArrowRight, TrendingUp, DollarSign, Target, Percent } from 'lucide-react';

export default function FundamentalsLesson3Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Course Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-600 text-blue-100 mb-4 shadow-lg">
            <BookOpen className="w-4 h-4 mr-2" /> Premium Lesson
          </span>
          <h1 className="text-6xl font-extrabold text-white mb-4 leading-tight tracking-tighter">
            Earnings, Revenue & Company-Specific Data
          </h1>
          <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto">
            Learn how company fundamentals like EPS, guidance, and revenue can trigger 10% price swings overnight.
          </p>
        </div>

        {/* Video Overview Section */}
        <div className="mb-16 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <PlayCircle className="w-10 h-10 text-blue-500 mr-4" />
            <div>
              <h2 className="text-4xl font-bold text-white mb-1">Video Overview</h2>
              <p className="text-lg text-gray-400">Understand the key company-specific data points that drive stock prices and how to interpret earnings reports.</p>
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
                title="Lesson 3: Earnings, Revenue & Company-Specific Data"
                className="w-full h-full"
              ></iframe> */}
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* EPS Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">📈 1. Earnings Per Share (EPS)</h2>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-6">
            <li><strong className="text-white">EPS</strong> = (Net Income ÷ Shares Outstanding)</li>
            <li>Measures profitability per share</li>
            <li>High EPS is bullish <em className="text-white">only if</em> it beats forecasts</li>
          </ul>
          {/* Image: Chart – EPS beats vs stock reaction */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=EPS+vs+Stock+Reaction" alt="EPS vs Stock Reaction Chart" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Chart illustrating EPS beats vs stock reactions.</p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Revenue Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">💰 2. Revenue</h2>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-6">
            <li>Total income from business operations</li>
            <li>Compare YoY growth and segment breakdown</li>
            <li>Strong revenue with weak profit = mixed signals</li>
          </ul>
          {/* Image: Bar chart – Amazon revenue by quarter */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Revenue+Bar+Chart" alt="Amazon Revenue by Quarter" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Bar chart showing YoY revenue growth (e.g., Amazon by quarter).</p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Forward Guidance Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🔮 3. Forward Guidance</h2>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-6">
            <li>Company's own forecast for future quarters</li>
            <li>Often the <strong className="text-white">biggest market mover</strong> during earnings</li>
          </ul>
          {/* Image: Post-earnings stock dump example (e.g. Netflix) */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Post-Earnings+Stock+Drop" alt="Post-Earnings Stock Drop Example" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Chart showing a post-earnings stock drop (e.g., Netflix).</p>
          </div>
          <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-8 shadow-inner flex items-start">
            <Lightbulb className="w-8 h-8 text-yellow-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-yellow-200">
              Example: "Strong results + weak guidance = stock sells off."
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Margins Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">⚙️ 4. Margins</h2>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-6">
            <li>Measures how efficiently a company turns revenue into profit</li>
            <li><strong className="text-white">Gross margin</strong></li>
            <li><strong className="text-white">Operating margin</strong></li>
            <li><strong className="text-white">Net margin</strong></li>
          </ul>
          <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-8 shadow-inner flex items-start">
            <Percent className="w-8 h-8 text-purple-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-purple-200">
              Shrinking margins often mean cost pressures or inefficiencies.
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Earnings Reactions Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🎭 5. Earnings Reactions = Expectation Games</h2>
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-8 shadow-inner flex items-start mb-8">
            <Lightbulb className="w-8 h-8 text-blue-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-blue-200">
              "It's not the number — it's the surprise."
            </p>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Markets move when results <em className="text-white">beat or miss</em> what was expected.
            You can find this via analyst estimates on Yahoo Finance or Nasdaq Earnings pages.
          </p>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Bonus Tips Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">📅 Bonus Tips – Earnings Season</h2>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-6">
            <li>Always check when your stock reports (use EarningsWhispers or Nasdaq calendar)</li>
            <li>Consider implied volatility — it tells you how much movement is expected</li>
            <li>If unsure, avoid holding through earnings unless you're playing the gamble</li>
          </ul>
          {/* Image: EarningsWhispers screenshot */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=EarningsWhispers+Screenshot" alt="EarningsWhispers Screenshot" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Screenshot of an earnings calendar or whisper site.</p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Practice Activity Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🛠️ Practice Activity</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Pick any US stock reporting earnings this week and:
          </p>
          <ol className="list-decimal list-inside text-xl text-gray-300 ml-6 space-y-4">
            <li>Look up its: EPS estimate, Revenue forecast, Last quarter's result</li>
            <li>Predict the move — and see what actually happens</li>
            <li>Share your analysis in Discord: "Lesson 3 Earnings Prep"</li>
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
                1. Which metric shows total company sales?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) EPS
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  B) Revenue
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) Margins
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Guidance
                </li>
              </ul>
            </div>

            {/* Question 2 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                2. A company beats EPS but gives weak guidance. What often happens?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Stock rises
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) No change
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) Stock drops
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Price stabilizes
                </li>
              </ul>
            </div>

            {/* Question 3 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                3. What do "margins" help assess?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Price patterns
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) Volatility
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) Efficiency
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Currency strength
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Call to Action: Next Lesson */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Analyze Companies?</h2>
          <Link href="/education/fundamentals-4" passHref>
            <div className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
              Next Lesson: Sentiment, News & Geopolitical Events
              <ArrowRight className="w-8 h-8 ml-4" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 
 