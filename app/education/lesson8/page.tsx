import Link from 'next/link';
import { PlayCircle, BookOpen, Lightbulb, CheckCircle, XCircle, ArrowRight, Brain, TrendingUp, TrendingDown } from 'lucide-react';

export default function Lesson8Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Course Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-600 text-blue-100 mb-4 shadow-lg">
            <BookOpen className="w-4 h-4 mr-2" /> Premium Lesson
          </span>
          <h1 className="text-6xl font-extrabold text-white mb-4 leading-tight tracking-tighter">
            Trading Psychology
          </h1>
          <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto">
            Mastering your mind is mastering the market. Learn to control emotions, build discipline, and think like a professional trader.
          </p>
        </div>

        {/* Video Overview Section */}
        <div className="mb-16 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <PlayCircle className="w-10 h-10 text-blue-500 mr-4" />
            <div>
              <h2 className="text-4xl font-bold text-white mb-1">Video Overview</h2>
              <p className="text-lg text-gray-400">Discover the psychological traps that sabotage traders and how to build a resilient mindset for consistent performance.</p>
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
                title="Lesson 8: Trading Psychology"
                className="w-full h-full"
              ></iframe> */}
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Emotions in Trading Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🧠 Emotions in Trading</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            Trading involves significant emotional challenges. The most common emotions are:
          </p>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-10">
            <li><strong className="text-white">Fear</strong>: Missing out (FOMO), losing money, being wrong.</li>
            <li><strong className="text-white">Greed</strong>: Taking excessive risk, holding onto winning trades too long.</li>
            <li><strong className="text-white">Hope</strong>: Hoping a losing trade turns around, ignoring stop-losses.</li>
          </ul>
          {/* Image: Emotional rollercoaster chart */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Emotional+Rollercoaster" alt="Emotional Rollercoaster" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Diagram illustrating the emotional rollercoaster of trading.</p>
          </div>
          <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-8 shadow-inner flex items-start">
            <Lightbulb className="w-8 h-8 text-yellow-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-yellow-200">
              Mental Model: Your biggest opponent isn't the market; it's yourself. Learn to manage your inner game.
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Building Discipline Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">💪 Building Discipline</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Discipline is paramount for consistent results. Key aspects include:
          </p>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-10">
            <li><strong className="text-white">Sticking to your plan</strong>: Execute without hesitation.</li>
            <li><strong className="text-white">Accepting losses</strong>: Losses are part of the game.</li>
            <li><strong className="text-white">Avoiding overtrading</strong>: Quality over quantity.</li>
          </ul>
          {/* Image: Disciplined trader at desk */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Disciplined+Trader" alt="Disciplined Trader" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: A trader demonstrating focus and discipline.</p>
          </div>
          <div className="bg-green-900/30 border border-green-700 rounded-lg p-8 shadow-inner flex items-start">
            <Lightbulb className="w-8 h-8 text-green-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-green-200">
              Mental Model: Discipline is doing what needs to be done, even when you don't want to.
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Mindset for Success Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🌟 Mindset for Success</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Cultivate a probabilistic mindset:
          </p>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-10">
            <li><strong className="text-white">Process-oriented</strong>: Focus on your execution, not just outcomes.</li>
            <li><strong className="text-white">Patience</strong>: Wait for your setup; don't chase trades.</li>
            <li><strong className="text-white">Accepting Uncertainty</strong>: The market is unpredictable.</li>
          </ul>
          {/* Image: Trader meditating/zen */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Zen+Trader" alt="Zen Trader" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: A trader with a calm and focused mindset.</p>
          </div>
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-8 shadow-inner flex items-start">
            <Lightbulb className="w-8 h-8 text-blue-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-blue-200">
              Mental Model: Every trade is just one of many. Focus on playing your edge repeatedly.
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Practice Activity Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🛠️ Practice Activity</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Keep a <strong className="text-white">trading journal</strong>:
          </p>
          <ol className="list-decimal list-inside text-xl text-gray-300 ml-6 space-y-4">
            <li>After each trade, note your emotions and thoughts.</li>
            <li>Identify any times you deviated from your plan due to fear, greed, or hope.</li>
            <li>Review your journal weekly to spot patterns in your psychological weaknesses.</li>
            <li>Write down a corrective action for one recurring emotional challenge.</li>
            <li>Share your insights (without revealing trades) in Discord: "Lesson 8 Psych Insight"</li>
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
                1. Which emotion often leads to chasing trades?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Discipline
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  B) FOMO (Fear of Missing Out)
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) Patience
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Acceptance
                </li>
              </ul>
            </div>

            {/* Question 2 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                2. What does a "probabilistic mindset" mean in trading?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Predicting every market move
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  B) Focusing on long-term outcomes and edge, not single trades
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) Trading based on intuition only
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Avoiding any form of analysis
                </li>
              </ul>
            </div>

            {/* Question 3 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                3. A trading journal primarily helps with:
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Predicting the next market crash
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) Finding hot new stocks
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) Identifying and improving psychological weaknesses
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Bragging to friends about wins
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Call to Action: Next Lesson */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Master Your Mind?</h2>
          <Link href="/education/lesson9" passHref>
            <div className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
              Next Lesson: Trading Plan Development
              <ArrowRight className="w-8 h-8 ml-4" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 