import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, TrendingUp, Globe, Target, DollarSign } from "lucide-react"

export default function PhilanthropyPage() {
  const initiatives = [
    {
      title: "Financial Literacy Education",
      description: "Providing free trading education to underserved communities worldwide",
      impact: "5,000+ students reached",
      icon: <Users className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Microfinance Support",
      description: "Supporting small business loans in developing countries",
      impact: "$50,000 donated",
      icon: <DollarSign className="h-6 w-6 text-emerald-600" />,
    },
    {
      title: "Scholarship Program",
      description: "Annual scholarships for students pursuing finance education",
      impact: "25 scholarships awarded",
      icon: <Target className="h-6 w-6 text-purple-600" />,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-100 text-red-800 px-4 py-2 rounded-full font-semibold">❤️ Giving Back</Badge>
          <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Our Philanthropy Mission</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Using the power of trading education and financial literacy to create positive change worldwide
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="card-modern mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Heart className="h-6 w-6 mr-3 text-red-500" />
              Our Commitment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  At Staxmore, we believe that financial education is a fundamental right. That's why we commit
                  <span className="font-semibold text-emerald-600"> 10% of our profits</span> to charitable initiatives
                  focused on financial literacy, education, and economic empowerment.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Our goal is to democratize access to financial knowledge and trading skills, helping people worldwide
                  build better financial futures for themselves and their communities.
                </p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-8 text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">10%</div>
                <div className="text-slate-700 font-medium mb-4">of profits donated</div>
                <div className="text-2xl font-bold text-slate-900 mb-2">$127,500</div>
                <div className="text-slate-600 text-sm">Total donated in 2024</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Initiatives */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Current Initiatives</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {initiatives.map((initiative, index) => (
              <Card key={index} className="card-modern text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                    {initiative.icon}
                  </div>
                  <CardTitle className="text-xl">{initiative.title}</CardTitle>
                  <CardDescription className="text-base">{initiative.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-semibold">
                    {initiative.impact}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Partner Organizations */}
        <Card className="card-modern mb-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-blue-600" />
              Partner Organizations
            </CardTitle>
            <CardDescription>Working together to maximize our impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-slate-900 mb-4">Education Partners</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">KF</span>
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">Khan Academy</div>
                      <div className="text-sm text-slate-600">Free online education platform</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-600 font-semibold text-sm">JA</span>
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">Junior Achievement</div>
                      <div className="text-sm text-slate-600">Youth financial literacy programs</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-4">Microfinance Partners</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 font-semibold text-sm">KV</span>
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">Kiva</div>
                      <div className="text-sm text-slate-600">Microloans for entrepreneurs</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <span className="text-yellow-600 font-semibold text-sm">GF</span>
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">Grameen Foundation</div>
                      <div className="text-sm text-slate-600">Financial inclusion initiatives</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Get Involved */}
        <Card className="card-modern">
          <CardHeader>
            <CardTitle>Get Involved</CardTitle>
            <CardDescription>Join us in making a difference through financial education</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Volunteer</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Share your trading knowledge by mentoring students in our education programs
                </p>
                <Button className="btn-secondary">Learn More</Button>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Donate</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Make a direct contribution to our financial literacy initiatives
                </p>
                <Button className="btn-primary">Donate Now</Button>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Trade for Good</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Participate in our charity trading competitions where proceeds go to education
                </p>
                <Button className="btn-secondary">Join Competition</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
