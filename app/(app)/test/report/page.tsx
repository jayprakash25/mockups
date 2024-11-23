'use client'

import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { MinimalNav } from '@/components/MinimalNav'
import { Trophy, Clock, Target, Zap, ArrowRight, RotateCcw, Home } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ReportStats {
  correct: number
  incorrect: number
  timeSpent: number
  accuracy: number
}

export default function ReportPage() {
  const router = useRouter()
  
  const stats: ReportStats = {
    correct: 8,
    incorrect: 2,
    timeSpent: 300,
    accuracy: 80
  }

  const radarData = [
    { subject: 'Accuracy', score: stats.accuracy, fullMark: 100 },
    { subject: 'Speed', score: 85, fullMark: 100 },
    { subject: 'Consistency', score: 90, fullMark: 100 },
    { subject: 'Performance', score: 75, fullMark: 100 },
  ]

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  const getPerformanceLabel = (accuracy: number): string => {
    if (accuracy >= 90) return 'Exceptional'
    if (accuracy >= 80) return 'Very Good'
    if (accuracy >= 70) return 'Good'
    return 'Keep Practicing'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      
      
      <main className="container max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header Section */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-block mb-4"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Quiz Completed!
            </h1>
            <div className="mt-2">
              <Badge variant="secondary" className="text-sm">
                {getPerformanceLabel(stats.accuracy)}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Stats Cards */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <Target className="w-5 h-5" />
                      <span className="text-sm font-medium">Correct</span>
                    </div>
                    <p className="text-3xl font-bold">{stats.correct}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-red-500">
                      <Zap className="w-5 h-5" />
                      <span className="text-sm font-medium">Incorrect</span>
                    </div>
                    <p className="text-3xl font-bold">{stats.incorrect}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue-500">
                      <Clock className="w-5 h-5" />
                      <span className="text-sm font-medium">Duration</span>
                    </div>
                    <p className="text-3xl font-bold">{formatTime(stats.timeSpent)}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-purple-500">
                      <Target className="w-5 h-5" />
                      <span className="text-sm font-medium">Accuracy</span>
                    </div>
                    <p className="text-3xl font-bold">{stats.accuracy}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personalized Feedback */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-gray-600 space-y-2">
                  <p>You demonstrated strong understanding in:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Core concepts</li>
                    <li>Problem-solving approach</li>
                    <li>Time management</li>
                  </ul>
                </div>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>Areas for improvement:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Advanced topics</li>
                    <li>Speed optimization</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Radar Chart */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Skill Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.1} />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: 'currentColor', fontSize: 12 }}
                        axisLine={{ strokeOpacity: 0.1 }}
                      />
                      <Radar
                        name="Performance"
                        dataKey="score"
                        fill="url(#skillGradient)"
                        fillOpacity={0.6}
                        stroke="url(#skillGradient)"
                      />
                      <defs>
                        <linearGradient id="skillGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10B981" stopOpacity={0.8} />
                          <stop offset="100%" stopColor="#14B8A6" stopOpacity={0.8} />
                        </linearGradient>
                      </defs>
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 pt-8">
            <Button
              variant="outline"
              onClick={() => router.push('/test/quiz')}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </Button>
            <Button
              onClick={() => router.push('/search')}
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              Return Home
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}