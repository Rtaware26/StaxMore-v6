import Link from 'next/link';
import { PlayCircle, BookOpen, Lightbulb, CheckCircle, XCircle, ArrowRight, TrendingUp, TrendingDown, RefreshCw, Layers } from 'lucide-react';

export default function Lesson10Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Course Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-600 text-blue-100 mb-4 shadow-lg">
            <BookOpen className="w-4 h-4 mr-2" /> Premium Lesson
          </span>
          <h1 className="text-6xl font-extrabold text-white mb-4 leading-tight tracking-tighter">
            Backtesting Strategies
          </h1>
          <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto">
            Backtesting is your secret weapon. Learn to prove your strategies actually work (or don't) before risking real capital.
          </p>
        </div>

        {/* Video Overview Section */}
        <div className="mb-16 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <PlayCircle className="w-10 h-10 text-blue-500 mr-4" />
            <div>
              <h2 className="text-4xl font-bold text-white mb-1">Video Overview</h2>
              <p className="text-lg text-gray-400">Discover how to validate your trading ideas and build confidence using historical data.</p>
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
                title="Lesson 10: Backtesting Strategies"
                className="w-full h-full"
              ></iframe> */}
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* What is Backtesting? Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🔄 What is Backtesting?</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            <strong className="text-white">Backtesting</strong> is the process of testing a trading strategy using historical data to determine its viability and profitability.
          </p>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-10">
            <li>Simulate trades on past market conditions.</li>
            <li>Evaluate how your strategy would have performed.</li>
          </ul>
          {/* Image: Chart with backtesting marks */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Backtesting+Chart" alt="Backtesting Chart" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: A chart demonstrating how a strategy is applied to historical data during backtesting.</p>
          </div>
          <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-8 shadow-inner flex items-start">
            <Lightbulb className="w-8 h-8 text-yellow-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-yellow-200">
              Mental Model: Backtesting is your financial laboratory. Experiment and refine without losing real money.
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Why Backtest? Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">✅ Why Backtest?</h2>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-10">
            <li><strong className="text-white">Validate Your Edge</strong>: See if your strategy has a statistical advantage.</li>
            <li><strong className="text-white">Build Confidence</strong>: Trust your system when live trading.</li>
            <li><strong className="text-white">Identify Weaknesses</strong>: Find and fix flaws in your strategy.</li>
            <li><strong className="text-white">Quantify Performance</strong>: Understand drawdowns, win rate, R:R.</li>
          </ul>
          {/* Image: Performance metrics chart (win rate, R:R, drawdown) */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Performance+Metrics" alt="Performance Metrics" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Key performance metrics derived from backtesting results.</p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* How to Backtest Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🔬 How to Backtest (Steps)</h2>
          <ol className="list-decimal list-inside text-xl text-gray-300 ml-6 space-y-4 mb-10">
            <li><strong className="text-white">Define Your Strategy</strong>: Clear entry, exit, and risk rules.</li>
            <li><strong className="text-white">Gather Data</strong>: Get reliable historical price data.</li>
            <li><strong className="text-white">Manual or Automated</strong>: Choose your backtesting method.</li>
            <li><strong className="text-white">Record Results</strong>: Track every trade (profit, loss, entry, exit, notes).</li>
            <li><strong className="text-white">Analyze & Refine</strong>: Use data to improve your rules.</li>
          </ol>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Tools for Backtesting Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🛠️ Tools for Backtesting</h2>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-10">
            <li><strong className="text-white">Manual Backtesting</strong>: TradingView's "Replay" feature, Excel/Google Sheets.</li>
            <li><strong className="text-white">Automated Backtesting</strong>: MetaTrader, Python (Pandas, Backtrader), specialized platforms.</li>
          </ul>
          {/* Image: TradingView Replay feature screenshot */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=TradingView+Replay" alt="TradingView Replay Feature" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Screenshot of TradingView's replay feature for manual backtesting.</p>
          </div>
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-8 shadow-inner flex items-start">
            <Lightbulb className="w-8 h-8 text-blue-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-blue-200">
              Pro Tip: Start with manual backtesting to deeply understand your strategy before automating.
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Practice Activity Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🚀 Practice Activity</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Pick one simple strategy you've learned (e.g., MA crossover, bounce off S/R):
          </p>
          <ol className="list-decimal list-inside text-xl text-gray-300 ml-6 space-y-4">
            <li>Go to <a href="https://tradingview.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">TradingView</a> and use the Replay tool.</li>
            <li>Find 10 past setups for your chosen strategy.</li>
            <li>Record entry, exit, stop-loss, and outcome for each trade.</li>
            <li>Calculate your win rate and average R:R for these 10 trades.</li>
            <li>Share your findings (numbers only) in Discord: "Lesson 10 Backtest Stats"</li>
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
                1. What is the main purpose of backtesting?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) To predict future market movements with certainty
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  B) To validate a strategy's performance on historical data
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) To get rich quick
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) To replace live trading entirely
                </li>
              </ul>
            </div>

            {/* Question 2 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                2. Which of these is NOT a benefit of backtesting?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Building confidence in a strategy
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) Identifying weaknesses in a strategy
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) Eliminating all risk from trading
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Quantifying performance metrics
                </li>
              </ul>
            </div>

            {/* Question 3 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                3. What type of data is used for backtesting?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Future predictions
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) Expert opinions
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) Historical price data
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Random numbers
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Call to Action: Next Lesson */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Validate Your Edge?</h2>
          <Link href="/education/lesson11" passHref>
            <div className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
              Next Lesson: Putting It All Together
              <ArrowRight className="w-8 h-8 ml-4" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 