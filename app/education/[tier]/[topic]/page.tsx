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
                  { title: "Introduction to Technical Analysis", duration: "30 min", completed: false },
                  { title: "Understanding Price Charts", duration: "45 min", completed: false },
                  { title: "Support and Resistance Levels", duration: "30 min", completed: false },
                  { title: "Trend Lines and Patterns", duration: "40 min", completed: false },
                  { title: "Moving Averages", duration: "35 min", completed: false },
                  { title: "Volume Analysis", duration: "25 min", completed: false },
                  { title: "Common Chart Patterns", duration: "50 min", completed: false },
                  { title: "Putting It All Together", duration: "25 min", completed: false },
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
                    <Button variant="outline" size="sm">
                      {lesson.completed ? "Review" : "Start"}
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
