import Link from 'next/link';
import { PlayCircle, BookOpen, Lightbulb, CheckCircle, XCircle, ArrowRight, TrendingUp, Layers, Zap, Trophy } from 'lucide-react';

export default function Lesson11Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Course Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-600 text-blue-100 mb-4 shadow-lg">
            <BookOpen className="w-4 h-4 mr-2" /> Premium Lesson
          </span>
          <h1 className="text-6xl font-extrabold text-white mb-4 leading-tight tracking-tighter">
            Putting It All Together
          </h1>
          <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto">
            The final step: combining all you've learned into a cohesive trading approach.
          </p>
        </div>

        {/* Video Overview Section */}
        <div className="mb-16 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <PlayCircle className="w-10 h-10 text-blue-500 mr-4" />
            <div>
              <h2 className="text-4xl font-bold text-white mb-1">Video Overview</h2>
              <p className="text-lg text-gray-400">See how all technical analysis concepts interlink to form a powerful trading framework.</p>
            </div>
          </div>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-700 shadow-xl">
            {/* YouTube Embed Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-400 text-xl">
              <span className="animate-pulse">Loading Video...</span>
              {/* <iframe
                src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Lesson 11: Putting It All Together"
                className="w-full h-full"
              ></iframe> */}
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* The Big Picture Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">💡 The Big Picture</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            You've covered the core pillars of technical analysis:
          </p>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-10">
            <li><strong className="text-white">Price Action & Candlesticks</strong>: Reading market sentiment.</li>
            <li><strong className="text-white">Support & Resistance</strong>: Key supply and demand zones.</li>
            <li><strong className="text-white">Trendlines & Channels</strong>: Identifying and riding trends.</li>
            <li><strong className="text-white">Chart Patterns</strong>: Predicting continuations and reversals.</li>
            <li><strong className="text-white">Moving Averages</strong>: Smoothing price and finding dynamic levels.</li>
            <li><strong className="text-white">Risk Management</strong>: Protecting your capital.</li>
            <li><strong className="text-white">Trading Psychology</strong>: Mastering your mindset.</li>
            <li><strong className="text-white">Trading Plan & Backtesting</strong>: Your systematic approach.</li>
          </ul>
          {/* Image: Infographic combining all concepts */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=TA+Concepts+Infographic" alt="Technical Analysis Concepts Infographic" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: An infographic illustrating how all TA concepts interlink.</p>
          </div>
          <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-8 shadow-inner flex items-start">
            <Lightbulb className="w-8 h-8 text-yellow-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-yellow-200">
              Mental Model: Each concept is a piece of the puzzle. Combining them gives you a clearer picture.
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Synergy of Concepts Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🤝 Synergy of Concepts</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            A powerful trade setup often involves multiple confluent factors.
          </p>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-10">
            <li><strong className="text-white">Example 1</strong>: Price forms a bullish engulfing candle (candlesticks) at a strong support level (S&R), confirming a bounce off an uptrendline (trendlines).</li>
            <li><strong className="text-white">Example 2</strong>: A bear flag (chart patterns) breaks down below a declining 50 EMA (moving averages), indicating a bearish continuation.</li>
          </ul>
          {/* Image: Example trade setup with multiple TA elements */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Synergy+Example+Chart" alt="Synergy Example Chart" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: A chart highlighting a trade setup using multiple technical analysis tools.</p>
          </div>
          <div className="bg-green-900/30 border border-green-700 rounded-lg p-8 shadow-inner flex items-start">
            <Lightbulb className="w-8 h-8 text-green-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-green-200">
              Pro Tip: Look for confluence — when multiple technical indicators or concepts align to support a trade idea.
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Developing Your Edge Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">⚡ Developing Your Edge</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            An edge is a statistical advantage. You develop it through:
          </p>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-10">
            <li><strong className="text-white">Practice</strong>: Consistent chart analysis and simulated trading.</li>
            <li><strong className="text-white">Journaling</strong>: Tracking trades, emotions, and lessons learned.</li>
            <li><strong className="text-white">Patience & Discipline</strong>: Waiting for high-probability setups.</li>
          </ul>
          {/* Image: Chart with notes and journaling */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Trading+Journal" alt="Trading Journal" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: A trading journal with notes, showing the importance of detailed record-keeping.</p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Next Steps Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🚀 Your Next Steps</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Congratulations on completing this course! Here's how to continue your journey:
          </p>
          <ol className="list-decimal list-inside text-xl text-gray-300 ml-6 space-y-4">
            <li><strong className="text-white">Paper Trading</strong>: Apply your plan in a simulated environment.</li>
            <li><strong className="text-white">Live Trading (Small Size)</strong>: Start with minimal risk once confident.</li>
            <li><strong className="text-white">Continuous Learning</strong>: The market is always evolving.</li>
            <li><strong className="text-white">Join Our Community</strong>: Share insights and learn from others.</li>
          </ol>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Quiz Section */}
        <div className="mb-16 bg-gray-900 p-10 rounded-xl shadow-2xl border border-gray-800">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">📚 Quiz: Final Test</h2>
          <p className="italic text-xl text-gray-400 mb-8 text-center">
            _Show what you've learned!_
          </p>
          <div className="space-y-12">
            {/* Question 1 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                1. Which of these is NOT a core pillar of technical analysis?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Chart Patterns
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) Risk Management
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) Predicting economic recessions years in advance
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Trading Psychology
                </li>
              </ul>
            </div>

            {/* Question 2 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                2. What does "confluence" refer to in trading setups?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) A random market event
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  B) Multiple technical factors aligning to support a trade idea
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) Trading without a plan
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) The speed of price movement
                </li>
              </ul>
            </div>

            {/* Question 3 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                3. What is the benefit of continuous learning in trading?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) To guarantee you'll never lose money
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) To master a single strategy forever
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) To adapt to evolving market conditions and improve over time
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) To impress other traders with your knowledge
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Call to Action: Complete Course */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Congratulations! You've Completed the Basics!</h2>
          <Link href="/education/beginner/technical" passHref>
            <div className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
              Return to Course Overview
              <ArrowRight className="w-8 h-8 ml-4" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 