import { ComingSoon } from "@/components/coming-soon"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, CheckCircle } from "lucide-react"

interface EducationPageProps {
  params: {
    tier: string
    topic: string
  }
}

export default function EducationPage({ params }: EducationPageProps) {
  const { tier, topic } = params

  // Sample content for technical analysis beginner
  if (tier === "beginner" && topic === "technical") {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Badge className="mb-4 capitalize">{tier} Level</Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Technical Analysis Fundamentals</h1>
            <p className="text-xl text-gray-600">
              Master the basics of reading charts and identifying trading opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2" />
                  Duration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">4 Hours</p>
                <p className="text-sm text-gray-600">8 Lessons</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Difficulty
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">Beginner</p>
                <p className="text-sm text-gray-600">No prerequisites</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Completion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">0%</p>
                <p className="text-sm text-gray-600">Not started</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
              <CardDescription>What you'll learn in this course</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Introduction to Technical Analysis", duration: "30 min", completed: false, href: "/education/lesson1" },
                  { title: "Understanding Price Charts", duration: "45 min", completed: false, href: "/education/lesson2" },
                  { title: "Support and Resistance Levels", duration: "30 min", completed: false, href: "/education/lesson3" },
                  { title: "Trend Lines and Patterns", duration: "40 min", completed: false, href: "/education/lesson4" },
                  { title: "Chart Patterns (Basics)", duration: "50 min", completed: false, href: "/education/lesson5" },
                  { title: "Moving Averages", duration: "35 min", completed: false, href: "/education/lesson6" },
                  { title: "Risk Management Basics", duration: "40 min", completed: false, href: "/education/lesson7" },
                  { title: "Trading Psychology", duration: "45 min", completed: false, href: "/education/lesson8" },
                  { title: "Trading Plan Development", duration: "60 min", completed: false, href: "/education/lesson9" },
                  { title: "Backtesting Strategies", duration: "45 min", completed: false, href: "/education/lesson10" },
                  { title: "Putting It All Together", duration: "25 min", completed: false, href: "/education/lesson11" },
                ].map((lesson, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          lesson.completed ? "bg-green-100" : "bg-gray-100"
                        }`}
                      >
                        {lesson.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <span className="text-sm text-gray-600">{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{lesson.title}</h3>
                        <p className="text-sm text-gray-600">{lesson.duration}</p>
                      </div>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <a href={lesson.href}>{lesson.completed ? "Review" : "Start"}</a>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Fundamental Analysis Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Fundamental Analysis</CardTitle>
              <CardDescription>Understanding the economic and financial factors that drive markets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-100">
                      <span className="text-sm text-gray-600">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium">What is Fundamental Analysis?</h3>
                      <p className="text-sm text-gray-600">30 min</p>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <a href="/education/fundamentals-1">Start</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button size="lg">Start Course</Button>
          </div>
        </div>
      </div>
    )
  }

  // Sample content for fundamental analysis beginner
  if (tier === "beginner" && topic === "fundamental") {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Badge className="mb-4 capitalize">{tier} Level</Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Fundamental Analysis Fundamentals</h1>
            <p className="text-xl text-gray-600">
              Master the basics of analyzing economic and financial factors that drive markets.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2" />
                  Duration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">~2 Hours</p>
                <p className="text-sm text-gray-600">~4 Lessons</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Difficulty
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">Beginner</p>
                <p className="text-sm text-gray-600">No prerequisites</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Completion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">0%</p>
                <p className="text-sm text-gray-600">Not started</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
              <CardDescription>What you'll learn in this course</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "What is Fundamental Analysis?", duration: "30 min", completed: false, href: "/education/fundamentals-1" },
                  { title: "Macroeconomic Indicators That Move Markets", duration: "40 min", completed: false, href: "/education/fundamentals-2" },
                  { title: "Earnings, Revenue & Company-Specific Data", duration: "45 min", completed: false, href: "/education/fundamentals-3" },
                  // Add more fundamental lessons here as they are created
                ].map((lesson, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          lesson.completed ? "bg-green-100" : "bg-gray-100"
                        }`}
                      >
                        {lesson.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <span className="text-sm text-gray-600">{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{lesson.title}</h3>
                        <p className="text-sm text-gray-600">{lesson.duration}</p>
                      </div>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <a href={lesson.href}>{lesson.completed ? "Review" : "Start"}</a>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button size="lg">Start Course</Button>
          </div>
        </div>
      </div>
    )
  }

  // Sample content for psychology & risk beginner
  if (tier === "beginner" && topic === "psychology") {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Badge className="mb-4 capitalize">{tier} Level</Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Trading Psychology & Risk Management</h1>
            <p className="text-xl text-gray-600">
              Master your mind and manage risk effectively to become a disciplined trader.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2" />
                  Duration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">~3 Hours</p>
                <p className="text-sm text-gray-600">~5 Lessons</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Difficulty
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">Beginner</p>
                <p className="text-sm text-gray-600">No prerequisites</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Completion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">0%</p>
                <p className="text-sm text-gray-600">Not started</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
              <CardDescription>What you'll learn in this course</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "What Trading Really Is: A Mental Game", duration: "40 min", completed: false, href: "/education/beginner/psychology-1" },
                  { title: "Risk Per Trade — Your Lifeline", duration: "40 min", completed: false, href: "/education/beginner/psychology-2" },
                  { title: "Emotional Triggers – Spotting the Enemy Within", duration: "40 min", completed: false, href: "/education/beginner/psychology-3" },
                  { title: "Journaling & Self-Review – Becoming Your Own Coach", duration: "40 min", completed: false, href: "/education/beginner/psychology-4" },
                  { title: "Risk Management Myths That Are Draining Your Account", duration: "40 min", completed: false, href: "/education/beginner/psychology-5" },
                  // Add more psychology lessons here as they are created
                ].map((lesson, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          lesson.completed ? "bg-green-100" : "bg-gray-100"
                        }`}
                      >
                        {lesson.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <span className="text-sm text-gray-600">{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{lesson.title}</h3>
                        <p className="text-sm text-gray-600">{lesson.duration}</p>
                      </div>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <a href={lesson.href}>{lesson.completed ? "Review" : "Start"}</a>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button size="lg">Start Course</Button>
          </div>
        </div>
      </div>
    )
  }

  // For other combinations, show coming soon
  const topicTitle = topic.charAt(0).toUpperCase() + topic.slice(1).replace("-", " & ")
  const tierTitle = tier.charAt(0).toUpperCase() + tier.slice(1)

  return (
    <ComingSoon
      title={`${tierTitle} ${topicTitle}`}
      description="This education module is currently being developed by our expert instructors."
      backLink="/education/beginner/technical"
      backLinkText="Try Technical Analysis Basics"
    />
  )
}
