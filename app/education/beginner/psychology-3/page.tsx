import Link from 'next/link';
import { PlayCircle, BookOpen, Lightbulb, CheckCircle, XCircle, ArrowRight, TrendingUp, AlertTriangle, Heart, Edit3 } from 'lucide-react';

export default function PsychologyLesson3Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Course Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-600 text-blue-100 mb-4 shadow-lg">
            <BookOpen className="w-4 h-4 mr-2" /> Premium Lesson
          </span>
          <h1 className="text-6xl font-extrabold text-white mb-4 leading-tight tracking-tighter">
            Emotional Triggers — Spotting the Enemy Within
          </h1>
          <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto">
            If you've ever abandoned your plan mid-trade — it wasn't logic. It was emotion.
          </p>
        </div>

        {/* Video Overview Section */}
        <div className="mb-16 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <PlayCircle className="w-10 h-10 text-blue-500 mr-4" />
            <div>
              <h2 className="text-4xl font-bold text-white mb-1">Video Overview</h2>
              <p className="text-lg text-gray-400">Identify and manage the emotional triggers that sabotage your trading.</p>
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
                title="Lesson 3: Emotional Triggers – Spotting the Enemy Within"
                className="w-full h-full"
              ></iframe> */}
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* What Are Emotional Triggers Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">💥 What Are Emotional Triggers?</h2>
          <p className="text-xl text-gray-300 mb-6">
            Moments when emotion hijacks execution.<br />
            You know your plan. But you ignore it.
          </p>
          <h3 className="text-2xl font-bold text-white mb-4">📦 Common Triggers:</h3>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-6">
            <li>FOMO → Chasing late entries</li>
            <li>Revenge → Doubling size after losses</li>
            <li>Greed → Ignoring TP and hoping</li>
            <li>Denial → Refusing to cut losses</li>
          </ul>
          {/* Image: Chart of emotions and matched trader behaviors */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mt-8 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Emotional+Reactions+Chart" alt="Chart of emotions and matched trader behaviors" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Visualizing common emotional reactions and their trading behaviors.</p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* What It Feels Like Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🔁 What It Feels Like</h2>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3 mb-6">
            <li>Breath shortens</li>
            <li>Clicking speeds up</li>
            <li>Tunnel vision</li>
            <li>Internal monologue goes full "it'll bounce back"</li>
          </ul>
          {/* Image: Heartbeat / emotion spike graph */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Emotion+Spike+Graph" alt="Heartbeat / emotion spike graph" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: A graph depicting emotional spikes during trading.</p>
          </div>
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-8 shadow-inner flex items-start">
            <Lightbulb className="w-8 h-8 text-blue-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-blue-200">
              "Most traders don't need a better strategy. They need better self-awareness."
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* How to Defuse Emotional Reactions Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🛠️ How to Defuse Emotional Reactions</h2>
          <div className="bg-gray-900 p-8 rounded-xl mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Step 1 – Awareness</h3>
            <p className="text-xl text-gray-300">Label your 2–3 most common triggers.</p>
          </div>
          <div className="bg-gray-900 p-8 rounded-xl mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Step 2 – Interrupt It</h3>
            <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3">
              <li>Walk away</li>
              <li>Use a 60-second breath reset</li>
              <li>Check your pre-trade checklist</li>
            </ul>
          </div>
          <div className="bg-gray-900 p-8 rounded-xl mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Step 3 – Replace It</h3>
            <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-3">
              <li>Write down what happened</li>
              <li>Reflect post-trade</li>
              <li>Create a better response plan</li>
            </ul>
          </div>
          {/* Image: 3-step triangle for managing triggers */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mt-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=3-Step+Trigger+Management" alt="3-step triangle for managing triggers" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: A visual representation of the 3-step process for managing emotional triggers.</p>
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
                1. What's an emotional trigger in trading?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) A strategy
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) A market signal
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) A mental/emotional impulse that disrupts discipline
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Your broker's stop out
                </li>
              </ul>
            </div>

            {/* Question 2 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                2. What's the best first step when feeling triggered?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Double down
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  B) Walk away
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) Add more indicators
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Try a new strategy
                </li>
              </ul>
            </div>

            {/* Question 3 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                3. What is one common emotional reaction?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Patience
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  B) Revenge trading
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) Risk management
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Profit-locking
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Call to Action: Next Lesson */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready for the Next Step in Your Psychology Journey?</h2>
          <Link href="/education/beginner/psychology-4" passHref>
            <div className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
              Next Lesson: Journaling & Self-Review – Becoming Your Own Coach
              <ArrowRight className="w-8 h-8 ml-4" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 