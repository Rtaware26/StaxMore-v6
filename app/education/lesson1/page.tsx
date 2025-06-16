"use client"

import React from 'react';
import EducationProgressBar from '@/components/education-progress-bar';
import Link from 'next/link';
import { PlayCircle, BookOpen, BarChart, Lightbulb, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export default function Lesson1Page() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Course Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-primary text-primary-foreground mb-4 shadow-lg">
            <BookOpen className="w-4 h-4 mr-2" /> Beginner Level
          </span>
          <h1 className="text-6xl font-extrabold text-foreground mb-4 leading-tight tracking-tighter">
            Technical Analysis Fundamentals
          </h1>
          <p className="text-2xl text-muted-foreground font-light max-w-3xl mx-auto">
            Master the basics of reading charts and identifying trading opportunities.
          </p>
          <EducationProgressBar progress={25} label="Lesson Progress" />
        </div>

        {/* Video Lecture Section */}
        <div className="mb-16 bg-card p-8 rounded-xl shadow-2xl border border-border">
          <div className="flex items-center mb-6">
            <PlayCircle className="w-10 h-10 text-primary mr-4" />
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-1">Video Lecture</h2>
              <p className="text-lg text-muted-foreground">A quick 5-minute overview of today's lesson.</p>
            </div>
          </div>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border shadow-xl">
            {/* YouTube Embed Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-xl">
              <span className="animate-pulse">Loading Video...</span>
              {/* Replace `VIDEO_ID` with your actual YouTube video ID */}
              {/* <iframe
                src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Lesson 1: Technical Analysis Introduction"
                className="w-full h-full"
              ></iframe> */}
            </div>
          </div>
        </div>

        <hr className="my-16 border-border" />

        {/* Introduction Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-8">🧠 Introduction</h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            Technical Analysis (TA) is the backbone of short-term and swing trading.
            It's the method of forecasting future price movement by analyzing <strong className="text-foreground">past price and volume</strong>.
          </p>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            TA doesn't care about company earnings or interest rate speeches. It cares about <strong className="text-foreground">what the chart is doing</strong> — because that reflects all that info already.
          </p>
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-8 shadow-inner">
            <p className="italic text-xl text-primary">
              "TA is based on the idea that human behavior repeats — and price patterns reflect those behaviors."
            </p>
          </div>
        </div>

        <hr className="my-16 border-border" />

        {/* Why Use Technical Analysis Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-8">📊 Why Use Technical Analysis?</h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10">
            While fundamental analysis looks at the "why," technical analysis focuses on the "what" and "when."
          </p>
          <div className="overflow-x-auto mb-10">
            <table className="min-w-full bg-card shadow-xl rounded-xl overflow-hidden border border-border">
              <thead className="bg-muted">
                <tr>
                  <th className="py-4 px-6 text-left text-lg font-semibold text-foreground">TA Says…</th>
                  <th className="py-4 px-6 text-left text-lg font-semibold text-foreground">FA Says…</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-4 px-6 text-lg text-muted-foreground">What is the price doing now?</td>
                  <td className="py-4 px-6 text-lg text-muted-foreground">Why is the price moving?</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-6 text-lg text-muted-foreground">Where are buyers/sellers?</td>
                  <td className="py-4 px-6 text-lg text-muted-foreground">Is this company/currency strong?</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-lg text-muted-foreground">Should I enter/exit today?</td>
                  <td className="py-4 px-6 text-lg text-muted-foreground">Should I hold long-term?</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed">
            TA is <strong className="text-foreground">visual</strong>. That's why traders love TradingView — everything is on the chart.
          </p>
        </div>

        <hr className="my-16 border-border" />

        {/* The "Surfing" Analogy Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-8">🏄 The "Surfing" Analogy</h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            Imagine you're a surfer.
            You don't care about <em className="text-foreground">why</em> a wave formed — only <em className="text-foreground">when</em> it forms, how strong it is, and if you can ride it.
          </p>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            TA is the same:
          </p>
          <ul className="list-disc list-inside text-xl text-muted-foreground ml-6 space-y-3 mb-10">
            <li><strong className="text-foreground">See the pattern</strong> (wave forming)</li>
            <li><strong className="text-foreground">Time the entry</strong> (when to paddle in)</li>
            <li><strong className="text-foreground">Ride the move</strong> (and set your stop loss!)</li>
          </ul>
          <div className="bg-green-900/30 border border-green-700 rounded-lg p-8 shadow-inner">
            <p className="italic text-xl text-green-200">
              "You don't need to explain the wave. You just need to ride it."
            </p>
          </div>
          {/* Placeholder for Surfing Analogy Diagram/Image */}
          <div className="mt-10 relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg shadow-xl border border-gray-700">
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Surfing+Analogy+Diagram" alt="Surfing Analogy Diagram" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Aligning your trades with market waves.</p>
          </div>
        </div>

        <hr className="my-16 border-border" />

        {/* Real Chart Example Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-8">🔍 Real Chart Example: BTC at Resistance</h2>
          <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center rounded-lg mb-8 shadow-xl border border-gray-700">
            {/* Chart Image Placeholder */}
            <img src="https://via.placeholder.com/800x450/1A202C/A0AEC0?text=Bitcoin+Resistance+Chart" alt="Bitcoin testing $40,000 resistance" className="object-cover w-full h-full rounded-lg" />
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">Caption: Price rejecting resistance at $40K multiple times.</p>
          </div>
          <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-8 shadow-inner">
            <p className="italic text-xl text-purple-200">
              In TA, this is called a <strong className="text-foreground">resistance level</strong> — a price zone where sellers consistently overpower buyers.
              The chart is telling you: "People don't want to buy above here — yet."
            </p>
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed mt-8">
            We'll revisit how to draw support/resistance zones in Lesson 3.
          </p>
        </div>

        <hr className="my-16 border-border" />

        {/* Core Tools Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-8">🔧 Core Tools in Technical Analysis</h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10">
            You'll master these over this course:
          </p>
          <div className="overflow-x-auto mb-10">
            <table className="min-w-full bg-card shadow-xl rounded-xl overflow-hidden border border-border">
              <thead className="bg-muted">
                <tr>
                  <th className="py-4 px-6 text-left text-lg font-semibold text-foreground">Tool</th>
                  <th className="py-4 px-6 text-left text-lg font-semibold text-foreground">What It Does</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-4 px-6 text-lg text-muted-foreground">🕯 <strong className="text-foreground">Candlestick Charts</strong></td>
                  <td className="py-4 px-6 text-lg text-muted-foreground">Show how price behaved during each time interval</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-6 text-lg text-muted-foreground">📈 <strong className="text-foreground">Indicators (e.g. RSI, MACD)</strong></td>
                  <td className="py-4 px-6 text-lg text-muted-foreground">Help spot trends, momentum, and reversals</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-6 text-lg text-muted-foreground">🔺 <strong className="text-foreground">Chart Patterns</strong></td>
                  <td className="py-4 px-6 text-lg text-muted-foreground">Visual structures that repeat over time</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-lg text-muted-foreground">📉 <strong className="text-foreground">Volume</strong></td>
                  <td className="py-4 px-6 text-lg text-muted-foreground">Confirms whether a move is real or fake</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed">
            TA is <strong className="text-foreground">visual</strong>. That's why traders love TradingView — everything is on the chart.
          </p>
        </div>

        <hr className="my-16 border-border" />

        {/* Mental Models Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-8">💡 Mental Models to Remember</h2>
          <ul className="space-y-6">
            <li className="bg-card border border-border rounded-lg p-6 flex items-start shadow-md hover:bg-accent/50 transition-colors">
              <CheckCircle className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
              <p className="text-xl text-muted-foreground">
                <strong className="text-foreground">Price reflects everything</strong> — news, emotions, fundamentals.
              </p>
            </li>
            <li className="bg-card border border-border rounded-lg p-6 flex items-start shadow-md hover:bg-accent/50 transition-colors">
              <CheckCircle className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
              <p className="text-xl text-muted-foreground">
                <strong className="text-foreground">Patterns repeat</strong> because people repeat.
              </p>
            </li>
            <li className="bg-card border border-border rounded-lg p-6 flex items-start shadow-md hover:bg-accent/50 transition-colors">
              <CheckCircle className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
              <p className="text-xl text-muted-foreground">
                <strong className="text-foreground">Volume confirms</strong> — high volume = strong conviction.
              </p>
            </li>
            <li className="bg-card border border-border rounded-lg p-6 flex items-start shadow-md hover:bg-accent/50 transition-colors">
              <CheckCircle className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
              <p className="text-xl text-muted-foreground">
                <strong className="text-foreground">Traders are reactive</strong> — we're not guessing, we're following.
              </p>
            </li>
          </ul>
        </div>

        <hr className="my-16 border-border" />

        {/* Activity Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-8">🧪 Activity: Chart Spotting</h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            Open <a href="https://tradingview.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">TradingView</a> and do the following:
          </p>
          <ol className="list-decimal list-inside text-xl text-muted-foreground ml-6 space-y-4">
            <li>Pick an asset (e.g. BTC, EUR/USD, AAPL)</li>
            <li>Set the timeframe to 1H or 4H</li>
            <li>Try to identify:
              <ul className="list-disc list-inside ml-8 mt-2 space-y-2">
                <li>One <strong className="text-foreground">resistance level</strong> (price fails to break up)</li>
                <li>One <strong className="text-foreground">support level</strong> (price bounces up multiple times)</li>
              </ul>
            </li>
            <li>Draw a box or line on the chart</li>
            <li>Screenshot and share it in our Discord for feedback!</li>
          </ol>
        </div>

        <hr className="my-16 border-border" />

        {/* Quiz Section */}
        <div className="mb-16 bg-card p-10 rounded-xl shadow-2xl border border-border">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">📚 Quiz: Test Your Understanding</h2>
          <p className="italic text-xl text-muted-foreground mb-8 text-center">
            _Pick the best answer for each question._
          </p>
          <div className="space-y-12">
            {/* Question 1 */}
            <div>
              <p className="font-semibold text-2xl text-foreground mb-4">
                1. What is the core focus of Technical Analysis?
              </p>
              <ul className="space-y-4 text-xl text-muted-foreground">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Balance Sheets
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  B) Price & Volume
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  C) Economic News
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Insider Buying
                </li>
              </ul>
            </div>

            {/* Question 2 */}
            <div>
              <p className="font-semibold text-2xl text-foreground mb-4">
                2. If BTC keeps hitting $40,000 and dropping, what is this level called?
              </p>
              <ul className="space-y-4 text-xl text-muted-foreground">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Support
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) Breakout
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) Resistance
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Fibonacci Zone
                </li>
              </ul>
            </div>

            {/* Question 3 */}
            <div>
              <p className="font-semibold text-2xl text-foreground mb-4">
                3. Why do chart patterns work in TA?
              </p>
              <ul className="space-y-4 text-xl text-muted-foreground">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Coincidence
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) Data leaks
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) Repeating human psychology
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Economic predictions
                </li>
              </ul>
            </div>

            {/* Question 4 */}
            <div>
              <p className="font-semibold text-2xl text-foreground mb-4">
                4. What's the main reason TA traders use charts over news?
              </p>
              <ul className="space-y-4 text-xl text-muted-foreground">
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  A) Charts are prettier
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  B) News is always wrong
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  C) Price reflects all available information
                </li>
                <li className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  D) Charts never lie
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-16 border-border" />

        {/* Call to Action: Next Lesson */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Ready for the Next Step?</h2>
          <Link href="/education/lesson2" passHref>
            <div className="inline-flex items-center justify-center px-10 py-5 bg-primary hover:bg-primary/90 text-white text-2xl font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
              Next Lesson: Candlestick Charts 101
              <ArrowRight className="w-8 h-8 ml-4" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 