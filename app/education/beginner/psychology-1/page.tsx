'use client';

import Link from 'next/link';
import { PlayCircle, BookOpen, Lightbulb, CheckCircle, XCircle, ArrowRight, Brain, AlertTriangle, ListChecks } from 'lucide-react';

export default function PsychologyLesson1Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Course Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-600 text-blue-100 mb-4 shadow-lg">
            <BookOpen className="w-4 h-4 mr-2" /> Premium Lesson
          </span>
          <h1 className="text-6xl font-extrabold text-white mb-4 leading-tight tracking-tighter">
            What Trading <em className="text-blue-400">Really</em> Is — A Mental Game
          </h1>
          <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto">
            Before you master charts, you need to master your brain.
          </p>
        </div>

        {/* Video Overview Section */}
        <div className="mb-16 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <PlayCircle className="w-10 h-10 text-blue-500 mr-4" />
            <div>
              <h2 className="text-4xl font-bold text-white mb-1">Video Overview</h2>
              <p className="text-lg text-gray-400">Learn why trading success starts in your mind, not on your charts.</p>
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
                title="Lesson 1: What Trading Really Is — A Mental Game"
                className="w-full h-full"
              ></iframe> */}
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Mental Warfare Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">💡 Trading = Mental Warfare</h2>
          <p className="text-xl text-gray-300 mb-6">
            Trading looks technical. It feels emotional.<br />
            Fear, greed, FOMO, revenge — these destroy more traders than any chart ever did.
          </p>
          {/* Image: Emotional discipline vs strategy scale */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Emotional+Discipline+vs+Strategy" alt="Emotional Discipline vs Strategy Scale" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: The balance between emotional control and technical strategy.</p>
          </div>
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-8 shadow-inner flex items-start">
            <Lightbulb className="w-8 h-8 text-blue-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-blue-200">
              "Trading is poker, not chess. You're betting against emotion, not logic."
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Mental Traps Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">⚠️ Common Mental Traps for Beginners</h2>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-6">
            <li>FOMO entries → chasing green candles</li>
            <li>Revenge trades → "I'll win it back" mindset</li>
            <li>Overconfidence → doubling down recklessly</li>
            <li>Doubt → cutting winners too early</li>
          </ul>
          <p className="text-xl text-gray-300 mb-6">
            📌 It's not your strategy — it's your psychology.
          </p>
          {/* Image: FOMO graphic */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=FOMO+vs+Discipline" alt="FOMO vs Discipline" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: The emotional rollercoaster of FOMO trading.</p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Mental Edge Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🧠 Build a Mental Edge</h2>
          <p className="text-xl text-gray-300 mb-6">
            Great traders journal, reset, and know when <em className="text-white">not</em> to trade.
          </p>
          <div className="bg-gray-900 p-8 rounded-xl mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">✅ Tips:</h3>
            <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3">
              <li>Fixed % risk per trade</li>
              <li>Max daily loss (and stop for the day)</li>
              <li>Take breaks after emotional trades</li>
              <li>Pre-trade checklist: "Am I calm? Is this setup clean?"</li>
            </ul>
          </div>
          {/* Image: Checklist card overlay */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Pre-Trade+Checklist" alt="Pre-Trade Mental Checklist" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Your pre-trade mental checklist.</p>
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
                1. What's the biggest hidden factor in trading success?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Broker fees
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) Chart indicators
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) Your mindset
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Candlestick size
                </li>
              </ul>
            </div>

            {/* Question 2 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                2. What does "revenge trading" mean?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Using leverage
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) Chasing missed trades
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) Entering to win back losses emotionally
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Holding overnight
                </li>
              </ul>
            </div>

            {/* Question 3 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                3. What's one way to build trading discipline?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Change strategy often
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) Risk 10% per trade
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) Journal emotions
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Only trade Mondays
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Call to Action: Next Lesson */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Master Risk Management?</h2>
          <Link href="/education/beginner/psychology-2" passHref>
            <div className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
              Next Lesson: Risk Per Trade — Your Lifeline
              <ArrowRight className="w-8 h-8 ml-4" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 