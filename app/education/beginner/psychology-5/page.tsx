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
        <div className="grid gap-8">
          {/* Myth 1 */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4">🚫 Myth 1: "Tight stop-losses keep me safe"</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-700 mb-2">The Myth</h3>
                <p>Using very tight stops to minimize losses per trade</p>
                <ul className="list-disc list-inside text-red-600">
                  <li>Gets stopped out frequently</li>
                  <li>Misses good trades</li>
                  <li>Increases emotional pressure</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-700 mb-2">The Fix</h3>
                <p>Place stops based on market structure</p>
                <ul className="list-disc list-inside text-green-600">
                  <li>Use support/resistance levels</li>
                  <li>Account for volatility</li>
                  <li>Adjust position size instead</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Myth 2 */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4">💰 Myth 2: "I'll just risk $5 per trade"</h2>
            <div className="space-y-4">
              <p>Fixed dollar amounts don't scale with your account. Instead:</p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-700 mb-2">Proper Position Sizing</h3>
                <ul className="list-disc list-inside">
                  <li>Risk 1-2% of account per trade</li>
                  <li>Calculate position size based on stop distance</li>
                  <li>Adjust for volatility and timeframe</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Myth 3 */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4">📊 Myth 3: "High win-rate = low risk"</h2>
            <div className="space-y-4">
              <p>Don't fall for the Martingale trap or ignore reward:risk ratio.</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-700 mb-2">The Problem</h3>
                  <ul className="list-disc list-inside">
                    <li>Martingale systems fail eventually</li>
                    <li>Small wins can't overcome big losses</li>
                    <li>Focus on R:R ratio instead</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-700 mb-2">The Solution</h3>
                  <ul className="list-disc list-inside">
                    <li>Aim for 1.5-3x reward:risk</li>
                    <li>Let winners run</li>
                    <li>Cut losses quickly</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Myth 4 */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4">🎯 Myth 4: "I'll just move my stop-loss"</h2>
            <div className="space-y-4">
              <p>Moving stops is a sign of poor planning and emotional trading.</p>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-700 mb-2">Better Approach</h3>
                <ul className="list-disc list-inside">
                  <li>Set stops before entering</li>
                  <li>Only move to breakeven after profit</li>
                  <li>Accept invalidation when it happens</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="bg-gray-50 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4">📝 Key Takeaways</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="font-semibold w-32">% Risk:</span>
                  <span>Risk a set % per trade</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-32">Position Sizing:</span>
                  <span>Adjust based on stop distance</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="font-semibold w-32">Reward:Risk:</span>
                  <span>Aim for 1.5–3x</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-32">Consistency:</span>
                  <span>Habits &gt; trades</span>
                </div>
              </div>
            </div>
          </div>
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