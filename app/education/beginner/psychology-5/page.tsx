import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Psychology5() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">🧠 Lesson 5: Risk Management Myths That Are Draining Your Account</h1>
        <p className="text-xl text-gray-600 mb-8">Learn how common misconceptions about risk destroy performance.</p>
        
        <div className="aspect-video relative mb-8">
          <iframe
            className="w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/VIDEO_ID_HERE"
            title="Risk Management Myths"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
          <h3 className="text-yellow-800 font-semibold mb-4">Key Takeaways</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-yellow-800">% Risk</p>
              <p className="text-gray-600">Risk a set % per trade</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-yellow-800">Position Sizing</p>
              <p className="text-gray-600">Adjust based on stop distance</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-yellow-800">Reward:Risk</p>
              <p className="text-gray-600">Aim for 1.5–3x</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-yellow-800">Consistency</p>
              <p className="text-gray-600">Habits > trades</p>
            </div>
          </div>
        </div>

        <h2>🚫 Myth 1: "Tight stop-losses keep me safe"</h2>
        <div className="bg-red-50 p-6 rounded-lg mb-6">
          <h3 className="text-red-800 font-semibold mb-2">The Myth</h3>
          <p>Placing stops too close to entry to "minimize risk"</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg mb-8">
          <h3 className="text-green-800 font-semibold mb-2">The Fix</h3>
          <p>Place stops based on market structure, not arbitrary distances. A stop that's too tight will get hit by normal market noise.</p>
        </div>

        <h2>💰 Myth 2: "I'll just risk $5 per trade"</h2>
        <div className="bg-red-50 p-6 rounded-lg mb-6">
          <h3 className="text-red-800 font-semibold mb-2">The Myth</h3>
          <p>Using fixed dollar amounts regardless of account size or setup quality</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg mb-8">
          <h3 className="text-green-800 font-semibold mb-2">The Fix</h3>
          <p>Risk a consistent percentage of your account (1-2%) and adjust position size based on stop distance. This scales with your account and protects you from overtrading.</p>
        </div>

        <div className="my-8">
          <Image
            src="/images/education/risk-reward-chart.png"
            alt="Risk:Reward ratio visualization"
            width={800}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>

        <h2>📊 Myth 3: "High win-rate = low risk"</h2>
        <div className="bg-red-50 p-6 rounded-lg mb-6">
          <h3 className="text-red-800 font-semibold mb-2">The Myth</h3>
          <p>Focusing only on win rate while ignoring reward:risk ratios</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg mb-8">
          <h3 className="text-green-800 font-semibold mb-2">The Fix</h3>
          <p>Aim for 1.5-3x reward:risk ratios. A 40% win rate with 2:1 reward:risk is more profitable than a 60% win rate with 1:1.</p>
        </div>

        <h2>🎯 Myth 4: "I'll just move my stop-loss"</h2>
        <div className="bg-red-50 p-6 rounded-lg mb-6">
          <h3 className="text-red-800 font-semibold mb-2">The Myth</h3>
          <p>Moving stops to avoid losses or "give trades room to breathe"</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg mb-8">
          <h3 className="text-green-800 font-semibold mb-2">The Fix</h3>
          <p>Set stops based on invalidation points and stick to them. Moving stops is often emotional and leads to larger losses.</p>
        </div>

        <div className="mt-12">
          <Link 
            href="/education/beginner/psychology-6"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Next Lesson
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
} 