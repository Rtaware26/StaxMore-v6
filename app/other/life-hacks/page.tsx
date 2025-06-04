import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, TrendingUp, Target, Brain, Clock, DollarSign } from "lucide-react"

export default function LifeHacksPage() {
  const lifeHacks = [
    {
      icon: <DollarSign className="h-6 w-6 text-emerald-600" />,
      title: "Track Your Net Worth Weekly",
      description:
        "Monitor all assets and liabilities every Sunday. Use apps like Personal Capital or create a simple spreadsheet.",
      tips: [
        "Include all accounts: checking, savings, investments, retirement",
        "Don't forget to subtract debts and liabilities",
        "Track trends over time, not just absolute numbers",
        "Set monthly net worth growth targets",
      ],
    },
    {
      icon: <Target className="h-6 w-6 text-blue-600" />,
      title: "Automate Your Investments",
      description: "Set up automatic transfers to investment accounts to remove emotion and ensure consistency.",
      tips: [
        "Start with just $50-100 per month if you're beginning",
        "Use dollar-cost averaging for volatile markets",
        "Automate on payday to 'pay yourself first'",
        "Review and adjust amounts quarterly",
      ],
    },
    {
      icon: <Brain className="h-6 w-6 text-purple-600" />,
      title: "The 24-Hour Rule",
      description: "Wait 24 hours before making any major financial decision to avoid emotional trading.",
      tips: [
        "Write down your reasoning for the decision",
        "Sleep on it and review with fresh eyes",
        "Discuss with a trusted friend or mentor",
        "Ask: 'Will this matter in 5 years?'",
      ],
    },
    {
      icon: <Clock className="h-6 w-6 text-orange-600" />,
      title: "Time-Block Your Trading",
      description: "Dedicate specific hours to trading and market analysis to maintain work-life balance.",
      tips: [
        "Set specific market hours for active trading",
        "Use pre-market time for research and planning",
        "Avoid checking positions constantly throughout the day",
        "Have 'no-trading' days for mental breaks",
      ],
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-green-600" />,
      title: "The 1% Rule",
      description: "Never risk more than 1% of your portfolio on a single trade to preserve capital.",
      tips: [
        "Calculate position size before entering any trade",
        "Use stop-losses to limit downside risk",
        "Focus on risk-reward ratios of at least 1:2",
        "Track your win rate and average gains/losses",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-semibold">
            💡 Financial Productivity
          </Badge>
          <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Life Hacks for Traders</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Proven strategies to optimize your financial life and trading performance
          </p>
        </div>

        {/* Life Hacks Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {lifeHacks.map((hack, index) => (
            <Card key={index} className="card-modern">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-slate-50 rounded-xl">{hack.icon}</div>
                  <div>
                    <CardTitle className="text-xl">{hack.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-base leading-relaxed">{hack.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {hack.tips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{tip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Resources */}
        <Card className="card-modern">
          <CardHeader>
            <CardTitle>Recommended Tools & Apps</CardTitle>
            <CardDescription>Essential tools to implement these life hacks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Budgeting & Tracking</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Mint (free budgeting)</li>
                  <li>• YNAB (zero-based budgeting)</li>
                  <li>• Personal Capital (net worth tracking)</li>
                  <li>• Tiller (spreadsheet-based)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Investment Automation</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Vanguard (low-cost index funds)</li>
                  <li>• Fidelity (zero-fee funds)</li>
                  <li>• M1 Finance (automated portfolios)</li>
                  <li>• Acorns (micro-investing)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Trading Tools</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• TradingView (charting)</li>
                  <li>• Position Size Calculator</li>
                  <li>• Risk/Reward Calculator</li>
                  <li>• Trading Journal apps</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
