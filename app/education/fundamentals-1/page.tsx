import Link from 'next/link';
import { PlayCircle, BookOpen, Lightbulb, CheckCircle, XCircle, ArrowRight, BarChart2, Building2, Globe, TrendingUp } from 'lucide-react';

export default function FundamentalsLesson1Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Course Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-600 text-blue-100 mb-4 shadow-lg">
            <BookOpen className="w-4 h-4 mr-2" /> Premium Lesson
          </span>
          <h1 className="text-6xl font-extrabold text-white mb-4 leading-tight tracking-tighter">
            What is Fundamental Analysis?
          </h1>
          <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto">
            Look beyond the charts — into the economy, companies, and the real-world news that moves prices.
          </p>
        </div>

        {/* Video Overview Section */}
        <div className="mb-16 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <PlayCircle className="w-10 h-10 text-blue-500 mr-4" />
            <div>
              <h2 className="text-4xl font-bold text-white mb-1">Video Overview</h2>
              <p className="text-lg text-gray-400">Discover how fundamental analysis helps you understand the true value of assets and make informed trading decisions.</p>
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
                title="Lesson 1: What is Fundamental Analysis?"
                className="w-full h-full"
              ></iframe> */}
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* What is FA? Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🧊 What is Fundamental Analysis?</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            <strong className="text-white">Fundamental Analysis</strong> is the process of analyzing economic, financial, and geopolitical information to determine the real value of an asset.
          </p>
          {/* Image: Iceberg diagram */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=FA+Iceberg+Diagram" alt="FA Iceberg Diagram" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: The iceberg of market analysis - price action above, fundamentals below.</p>
          </div>
          <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-8 shadow-inner flex items-start">
            <Lightbulb className="w-8 h-8 text-yellow-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-yellow-200">
              "FA is asking why the price is moving — not just what it's doing."
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Key Components Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🔍 Key Components of FA</h2>

          {/* Macroeconomic Data */}
          <div className="mb-10">
            <h3 className="text-3xl font-bold text-white mb-4 flex items-center">
              <BarChart2 className="w-8 h-8 mr-3 text-blue-400" />
              Macroeconomic Data
            </h3>
            <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-6">
              <li>Inflation (CPI, PPI)</li>
              <li>Employment (nonfarm payrolls, unemployment rate)</li>
              <li>GDP growth</li>
              <li>Central bank interest rates & policy statements</li>
            </ul>
          </div>

          {/* Company-Specific Data */}
          <div className="mb-10">
            <h3 className="text-3xl font-bold text-white mb-4 flex items-center">
              <Building2 className="w-8 h-8 mr-3 text-green-400" />
              Company-Specific Data
            </h3>
            <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-6">
              <li>Earnings reports (EPS, revenue, margins)</li>
              <li>Analyst guidance and forecasts</li>
              <li>Competitive positioning and sector trends</li>
            </ul>
          </div>

          {/* Sentiment & News */}
          <div className="mb-10">
            <h3 className="text-3xl font-bold text-white mb-4 flex items-center">
              <Globe className="w-8 h-8 mr-3 text-purple-400" />
              Sentiment & News
            </h3>
            <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-6">
              <li>Geopolitical risk (war, elections, trade tensions)</li>
              <li>Natural disasters or global shocks</li>
              <li>Market psychology — panic or greed</li>
            </ul>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* FA vs TA Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🔄 FA vs TA</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            FA = big picture / long-term valuation<br />
            TA = price timing / short-term edge
          </p>
          {/* Image: FA vs TA analogy */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=FA+vs+TA+Analogy" alt="FA vs TA Analogy" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: FA = Google Maps (big picture) | TA = Waze (short-term navigation).</p>
          </div>
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-8 shadow-inner flex items-start">
            <Lightbulb className="w-8 h-8 text-blue-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-blue-200">
              Mental Model: "Use FA to build bias, TA to time your move."
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Practice Activity Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🛠️ Practice Activity</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Choose an asset (e.g. AUD/USD, AAPL) and:
          </p>
          <ol className="list-decimal list-inside text-xl text-gray-300 ml-6 space-y-4">
            <li>Find 1 piece of news or macro data that affected its price recently</li>
            <li>Write down what the bias might've been (bullish or bearish)</li>
            <li>Share your analysis in Discord: "Lesson 1 FA Analysis"</li>
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
                1. What is the main goal of fundamental analysis?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Draw lines
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) Analyze price patterns
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) Understand underlying value
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Trade meme coins
                </li>
              </ul>
            </div>

            {/* Question 2 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                2. Which of the following is NOT a fundamental data point?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) CPI
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) Earnings
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) RSI
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Interest rates
                </li>
              </ul>
            </div>

            {/* Question 3 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                3. Which statement is true?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) FA and TA cannot be used together
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) TA tells you why price is moving
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) FA is about sentiment only
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  D) FA helps form directional bias
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Call to Action: Next Lesson */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Master the Fundamentals?</h2>
          <Link href="/education/fundamentals-2" passHref>
            <div className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
              Next Lesson: Macroeconomic Indicators
              <ArrowRight className="w-8 h-8 ml-4" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 