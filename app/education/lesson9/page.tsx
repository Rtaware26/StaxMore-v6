import Link from 'next/link';
import { PlayCircle, BookOpen, Lightbulb, CheckCircle, XCircle, ArrowRight, ClipboardList, TrendingUp, TrendingDown } from 'lucide-react';

export default function Lesson9Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Course Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-600 text-blue-100 mb-4 shadow-lg">
            <BookOpen className="w-4 h-4 mr-2" /> Premium Lesson
          </span>
          <h1 className="text-6xl font-extrabold text-white mb-4 leading-tight tracking-tighter">
            Trading Plan Development
          </h1>
          <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto">
            A trading plan is your blueprint for success. Learn to build a comprehensive plan that guides your decisions and removes guesswork.
          </p>
        </div>

        {/* Video Overview Section */}
        <div className="mb-16 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <PlayCircle className="w-10 h-10 text-blue-500 mr-4" />
            <div>
              <h2 className="text-4xl font-bold text-white mb-1">Video Overview</h2>
              <p className="text-lg text-gray-400">Understand the essential components of a robust trading plan and why it's critical for consistent performance.</p>
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
                title="Lesson 9: Trading Plan Development"
                className="w-full h-full"
              ></iframe> */}
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* What is a Trading Plan? Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">📋 What is a Trading Plan?</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            A <strong className="text-white">trading plan</strong> is a written document that defines your trading goals, risk tolerance, strategies, and rules for entering, managing, and exiting trades.
          </p>
          <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-8 shadow-inner flex items-start">
            <Lightbulb className="w-8 h-8 text-yellow-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-yellow-200">
              Mental Model: Your trading plan is your roadmap in the market. Without it, you're just wandering aimlessly.
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Key Components Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🧩 Key Components</h2>

          {/* Trading Goals */}
          <div className="mb-10">
            <h3 className="text-3xl font-bold text-white mb-4">✅ Trading Goals</h3>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              Define what you want to achieve (e.g., specific profit targets, consistency, skill development).
            </p>
            {/* Image: Goals list/vision board */}
            <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
              <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Trading+Goals" alt="Trading Goals" className="object-cover w-full h-full rounded-lg" />
              <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Visual representation of setting clear trading goals.</p>
            </div>
          </div>

          {/* Risk Management Rules */}
          <div className="mb-10">
            <h3 className="text-3xl font-bold text-white mb-4">✅ Risk Management Rules</h3>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              Stipulate your max risk per trade, overall portfolio risk, and daily/weekly loss limits.
            </p>
            {/* Image: Risk management infographic */}
            <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
              <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Risk+Management+Rules" alt="Risk Management Rules" className="object-cover w-full h-full rounded-lg" />
              <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Infographic detailing risk management rules.</p>
            </div>
          </div>

          {/* Entry & Exit Rules */}
          <div className="mb-10">
            <h3 className="text-3xl font-bold text-white mb-4">✅ Entry & Exit Rules</h3>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              Clearly define your setup criteria, entry triggers, stop-loss placement, and profit-taking strategies.
            </p>
            {/* Image: Chart with entry/exit/SL/TP marked */}
            <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
              <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Entry+Exit+Rules" alt="Entry Exit Rules" className="object-cover w-full h-full rounded-lg" />
              <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Chart demonstrating clear entry, exit, stop-loss, and take-profit points.</p>
            </div>
          </div>

          {/* Post-Trade Analysis */}
          <div className="mb-10">
            <h3 className="text-3xl font-bold text-white mb-4">✅ Post-Trade Analysis</h3>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              Outline how you will review your trades, learn from mistakes, and track your performance.
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Why a Trading Plan? Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">💡 Why a Trading Plan?</h2>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-10">
            <li><strong className="text-white">Removes Emotion</strong>: Follow rules, not feelings.</li>
            <li><strong className="text-white">Ensures Consistency</strong>: Repeat profitable actions.</li>
            <li><strong className="text-white">Tracks Progress</strong>: Measure what works and what doesn't.</li>
            <li><strong className="text-white">Builds Discipline</strong>: Trains you to be systematic.</li>
          </ul>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Practice Activity Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🛠️ Practice Activity</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Start drafting your own personal trading plan. Include at least:
          </p>
          <ol className="list-decimal list-inside text-xl text-gray-300 ml-6 space-y-4">
            <li>Your main trading goal (e.g., "Achieve 2% monthly return")</li>
            <li>Your maximum risk per trade (e.g., "1% of capital")</li>
            <li>One specific entry rule (e.g., "Enter on bounce off 21 EMA")</li>
            <li>One specific exit rule (e.g., "Exit at 1:2 R:R or on candle close below 21 EMA")</li>
            <li>A plan for daily/weekly review (e.g., "Review trades daily for 15 mins")</li>
          </ol>
          <p className="text-xl text-gray-300 leading-relaxed mt-6">
            Share a brief outline of your plan (no sensitive info) in Discord: "Lesson 9 Trading Plan Idea" + key components.
          </p>
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
                1. What is the main purpose of a trading plan?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) To guarantee profit on every trade
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  B) To provide a structured approach to trading decisions
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) To impress other traders
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) To predict market movements with 100% accuracy
                </li>
              </ul>
            </div>

            {/* Question 2 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                2. Which of these is NOT typically a component of a trading plan?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Risk management rules
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) Entry and exit rules
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) Daily news headlines (as a primary strategy)
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Trading goals
                </li>
              </ul>
            </div>

            {/* Question 3 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                3. What does a trading plan help to remove from your trading decisions?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) All risk
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  B) Emotional biases
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) The need for practice
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) The ability to adapt
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Call to Action: Next Lesson */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Build Your Plan?</h2>
          <Link href="/education/lesson10" passHref>
            <div className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
              Next Lesson: Backtesting Strategies
              <ArrowRight className="w-8 h-8 ml-4" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 