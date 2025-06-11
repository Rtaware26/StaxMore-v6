import Link from 'next/link';
import { PlayCircle, BookOpen, Lightbulb, CheckCircle, XCircle, ArrowRight, CornerDownRight, Scale, Target, RefreshCcw } from 'lucide-react';

export default function Lesson3Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Course Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-600 text-blue-100 mb-4 shadow-lg">
            <BookOpen className="w-4 h-4 mr-2" /> Beginner Level
          </span>
          <h1 className="text-6xl font-extrabold text-white mb-4 leading-tight tracking-tighter">
            Support & Resistance
          </h1>
          <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto">
            Learn how traders identify key price zones that influence every market move.
          </p>
        </div>

        {/* Video Overview Section */}
        <div className="mb-16 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <PlayCircle className="w-10 h-10 text-blue-500 mr-4" />
            <div>
              <h2 className="text-4xl font-bold text-white mb-1">Watch the Full Video</h2>
              <p className="text-lg text-gray-400">Discover how to identify invisible levels that influence price action.</p>
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
                title="Lesson 3: Support & Resistance"
                className="w-full h-full"
              ></iframe> */}
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* What Are Support & Resistance? Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">💡 What Are Support & Resistance?</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            These are fundamental horizontal levels where price consistently reacts.
          </p>
          <div className="overflow-x-auto mb-10">
            <table className="min-w-full bg-gray-900 shadow-xl rounded-xl overflow-hidden border border-gray-800">
              <thead className="bg-gray-800">
                <tr>
                  <th className="py-4 px-6 text-left text-lg font-semibold text-gray-300">Concept</th>
                  <th className="py-4 px-6 text-left text-lg font-semibold text-gray-300">Description</th>
                  <th className="py-4 px-6 text-left text-lg font-semibold text-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6 text-lg text-gray-300"><strong className="text-white">Support</strong></td>
                  <td className="py-4 px-6 text-lg text-gray-300">A price floor where buyers typically step in.</td>
                  <td className="py-4 px-6 text-lg text-gray-300">Price bounces up</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-lg text-gray-300"><strong className="text-white">Resistance</strong></td>
                  <td className="py-4 px-6 text-lg text-gray-300">A price ceiling where sellers typically dominate.</td>
                  <td className="py-4 px-6 text-lg text-gray-300">Price gets rejected</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Chart Placeholder: Price bouncing off support */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Price+Bouncing+Off+Support" alt="Price Bouncing Off Support" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: BTC bouncing off 1.0800 multiple times, forming strong support.</p>
          </div>
          {/* Chart Placeholder: Price rejecting resistance */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Price+Rejecting+Resistance" alt="Price Rejecting Resistance" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: TSLA rejecting $300 three times, confirming resistance.</p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Mental Model: “The Price Room” Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🧠 Mental Model: “The Price Room”</h2>
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-8 shadow-inner flex items-start">
            <Scale className="w-8 h-8 text-blue-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-blue-200">
              “Support is your floor. Resistance is the ceiling.
              Price moves like it's trapped in a room — until something smashes the ceiling or the floor collapses.”
            </p>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed mt-8">
            The more times price hits a level, the more significant it becomes.
          </p>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Support/Resistance Flip Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🔁 Support/Resistance Flip</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            When <strong className="text-white">support breaks</strong>, it often becomes <strong className="text-white">resistance</strong>.
            When <strong className="text-white">resistance breaks</strong>, it becomes <strong className="text-white">support</strong>.
          </p>
          {/* Visual Diagram: Resistance breaks → retests → new support */}
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700 mb-8">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Support/Resistance+Flip+Diagram" alt="Support Resistance Flip Diagram" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Resistance flipping to become new support after a breakout.</p>
          </div>
          <div className="bg-green-900/30 border border-green-700 rounded-lg p-8 shadow-inner flex items-start">
            <RefreshCcw className="w-8 h-8 text-green-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-green-200">
              Pro Tip: This flip is where big trades often happen.
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* How to Spot Key Levels Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🛠️ How to Spot Key Levels</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Look for:
          </p>
          <ul className="list-disc list-inside text-xl text-gray-300 ml-6 space-y-4">
            <li><strong className="text-white">3 or more touches</strong> of a price level</li>
            <li>Long wicks and rejection candles</li>
            <li>Volume spikes near those zones</li>
            <li>Clustering of price = market memory</li>
          </ul>
          <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-8 shadow-inner flex items-start mt-10">
            <Lightbulb className="w-8 h-8 text-yellow-300 mr-4 flex-shrink-0" />
            <p className="italic text-xl text-yellow-200">
              Pro Tip: Draw S/R zones as <strong className="text-white">boxes</strong>, not single lines — they're areas, not laser beams.
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Real Example Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🔍 Real Example: TSLA Price Action</h2>
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg mb-8 shadow-xl border border-gray-700">
            {/* Chart Image Placeholder for TSLA */}
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=TSLA+Support+Resistance+Chart" alt="TSLA Support Resistance Chart" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: TSLA hitting $300, dropping, retesting, breaking, and retesting as new support.</p>
          </div>
          <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-8 shadow-inner">
            <p className="italic text-xl text-purple-200">
              “Traders don't wait for the news. If $300 holds as resistance over and over, that's a level you can trade off.”
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Practice Activity Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">🧪 Practice Activity</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Open <a href="https://tradingview.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">TradingView</a>:
          </p>
          <ol className="list-decimal list-inside text-xl text-gray-300 ml-6 space-y-4">
            <li>Choose a 1H or 4H chart</li>
            <li>Identify:
              <ul className="list-disc list-inside ml-8 mt-2 space-y-2">
                <li>One <strong className="text-white">Support Level</strong> (3+ bounces up)</li>
                <li>One <strong className="text-white">Resistance Level</strong> (3+ rejections)</li>
              </ul>
            </li>
            <li>Draw them with rectangular zones</li>
            <li>Screenshot and upload to Discord with caption: "Lesson 3: My first S/R map"</li>
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
                1. What does a support level represent?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Price ceiling
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  B) Buyer zone
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) Chart resistance
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Stop loss area
                </li>
              </ul>
            </div>

            {/* Question 2 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                2. If resistance is broken and retested, it can become…?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Trendline
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) New resistance
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) New support
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Noise
                </li>
              </ul>
            </div>

            {/* Question 3 */}
            <div>
              <p className="font-semibold text-2xl text-white mb-4">
                3. What's a sign that a level is strong support/resistance?
              </p>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) It's hit once
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) It has no wick
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) It's tested multiple times
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) It follows Fibonacci
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-16 border-gray-800" />

        {/* Call to Action: Next Lesson */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready for the Next Step?</h2>
          <Link href="/education/lesson4" passHref>
            <div className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
              Next Lesson: Trendlines & Channels
              <ArrowRight className="w-8 h-8 ml-4" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}