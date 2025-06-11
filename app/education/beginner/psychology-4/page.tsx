import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Psychology4() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">📓 Lesson 4: Journaling & Self-Review – Becoming Your Own Coach</h1>
        <div className="aspect-video relative mb-8">
          <iframe
            className="w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/VIDEO_ID_HERE"
            title="Journaling & Self-Review"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <p className="text-blue-700 italic">
            "In the moment it feels like instinct. In the journal, it looks like sabotage."
          </p>
        </div>

        <h2>🧠 Why Journaling Works</h2>
        <p>📌 In the moment, emotions feel true.</p>
        <p>📌 In hindsight, logic wins.</p>

        <div className="my-8">
          <Image
            src="/images/education/journaling-comparison.png"
            alt="Chart showing trade idea vs actual outcome"
            width={800}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>

        <h2>📋 What to Track</h2>
        
        <h3>🔄 Before the Trade</h3>
        <ul>
          <li>Setup type (Breakout, Pullback, Range, etc.)</li>
          <li>Entry, SL, TP</li>
          <li>Mindset: Calm? Rushed? Focused?</li>
        </ul>

        <h3>✅ After the Trade</h3>
        <ul>
          <li>Outcome (Win/Loss/BE)</li>
          <li>Mistakes</li>
          <li>Emotional reactions</li>
          <li>What to improve</li>
        </ul>

        <p>📌 Add tags:</p>
        <p>"FOMO," "Overtraded," "Perfect Setup," "Rushed"</p>

        <div className="my-8">
          <Image
            src="/images/education/journal-layout.png"
            alt="Sample journal layout"
            width={800}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>

        <h2>📆 Build the Habit</h2>
        <ul>
          <li>10 mins/day after market close</li>
          <li>Weekly pattern review</li>
          <li>Track top lessons per week</li>
        </ul>

        <p>📌 Tools:</p>
        <ul>
          <li>📒 Notion</li>
          <li>📊 Google Sheets</li>
          <li>🧠 Tradervue, Edgewonk (advanced)</li>
        </ul>

        <div className="my-8">
          <Image
            src="/images/education/weekly-tracker.png"
            alt="Weekly review tracker heatmap"
            width={800}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>

        <h2>📚 Quiz</h2>
        <div className="space-y-6">
          <div>
            <p className="font-semibold">1. Why is journaling important for traders?</p>
            <div className="space-y-2">
              <p>A) For tax purposes</p>
              <p>B) To impress friends</p>
              <p>C) To learn from emotional & strategic mistakes ✅</p>
              <p>D) To get more alerts</p>
            </div>
          </div>

          <div>
            <p className="font-semibold">2. Which is a good post-trade question to ask?</p>
            <div className="space-y-2">
              <p>A) What's for lunch?</p>
              <p>B) Was the entry based on setup or emotion? ✅</p>
              <p>C) Should I change my entire system?</p>
              <p>D) How much leverage can I use next time?</p>
            </div>
          </div>

          <div>
            <p className="font-semibold">3. What should you include in a trade journal?</p>
            <div className="space-y-2">
              <p>A) Only the wins</p>
              <p>B) Emotions, outcomes, what you learned ✅</p>
              <p>C) Asset logos</p>
              <p>D) Your broker password</p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Link 
            href="/education/beginner/psychology-5"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Next Lesson: Setting Realistic Expectations
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
} 