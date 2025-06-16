"use client"

import { ChevronDown } from "lucide-react"
import React, { useState } from "react"

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What is Staxmore?",
      answer: "Staxmore is a gamified trading platform designed to help you master trading skills in a risk-free environment. We offer real-time market simulations, competition leagues, and comprehensive educational content.",
    },
    {
      question: "How do I get started on Staxmore?",
      answer: "You can get started by signing up for a free account. Once registered, you can access our demo trading platform, join a competition league, or begin your learning journey with our educational courses.",
    },
    {
      question: "Is Staxmore suitable for beginners?",
      answer: "Absolutely! Staxmore is designed with beginners in mind. Our Bronze League is free to enter and perfect for new traders, and our Education section offers courses from beginner to advanced levels.",
    },
    {
      question: "What financial instruments can I trade on Staxmore?",
      answer: "Staxmore offers a wide range of simulated financial instruments, including forex, cryptocurrencies, stocks, and commodities, allowing you to practice across various markets.",
    },
    {
      question: "How is my performance tracked?",
      answer: "Your performance is tracked through a comprehensive portfolio overview, daily P&L, realized and unrealized P&L, win rates, and a personal risk score. You can also see your ranking in various competition leagues.",
    },
    {
      question: "Is my personal information safe?",
      answer: "Yes, we prioritize the security and privacy of your data. Staxmore employs industry-standard security measures to protect your personal information and trading activity.",
    },
    {
      question: "Can I withdraw real money from Staxmore?",
      answer: "Staxmore is a simulated trading platform for educational and competitive purposes. You trade with virtual money, and therefore, you cannot withdraw real money from your account. Any prizes won in competitions are real money, but not directly from simulated trading profits.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground">Find quick answers to the most common questions about Staxmore.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="card-modern p-6 cursor-pointer bg-card text-card-foreground hover:bg-accent/50" onClick={() => toggleFAQ(index)}>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-foreground">{faq.question}</h2>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`}
                />
              </div>
              {openIndex === index && (
                <p className="mt-4 text-muted-foreground leading-relaxed">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
