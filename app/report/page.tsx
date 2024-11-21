'use client'

import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { MinimalNav } from '@/components/MinimalNav'
// import { Dock } from '@/components/dock'

interface ReportStats {
  correct: number
  incorrect: number
  timeSpent: number // in seconds
  accuracy: number
}

export default function ReportPage() {
  const router = useRouter()
  
  // Example data - replace with actual data from your state management
  const stats: ReportStats = {
    correct: 8,
    incorrect: 2,
    timeSpent: 300, // 5 minutes
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

  return (
    <div className="min-h-screen flex flex-col">
      <MinimalNav />
      <main className="flex-1 bg-gradient-to-b from-background to-muted p-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto space-y-8"
        >
          <h1 className="text-3xl font-bold text-center mb-8">Your Performance Report</h1>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Stats Section */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-border/50 p-6 rounded-xl">
                  <h3 className="text-sm font-medium text-muted-foreground">Correct Answers</h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-bold text-green-500">{stats.correct}</p>
                    <span className="text-sm text-muted-foreground">questions</span>
                  </div>
                </div>
                <div className="border border-border/50 p-6 rounded-xl">
                  <h3 className="text-sm font-medium text-muted-foreground">Incorrect Answers</h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-bold text-red-500">{stats.incorrect}</p>
                    <span className="text-sm text-muted-foreground">questions</span>
                  </div>
                </div>
                <div className="border border-border/50 p-6 rounded-xl">
                  <h3 className="text-sm font-medium text-muted-foreground">Time Spent</h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-bold">{formatTime(stats.timeSpent)}</p>
                  </div>
                </div>
                <div className="border border-border/50 p-6 rounded-xl">
                  <h3 className="text-sm font-medium text-muted-foreground">Accuracy</h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-bold text-primary">{stats.accuracy}%</p>
                  </div>
                </div>
              </div>

              {/* Feedback Section */}
              <div className="border border-border/50 p-6 rounded-xl">
                <h3 className="text-lg font-medium mb-2">Feedback</h3>
                <p className="text-muted-foreground">
                  Great work! You showed strong performance with {stats.accuracy}% accuracy.
                  Consider focusing on improving your speed while maintaining accuracy for better results.
                </p>
              </div>
            </div>

            {/* Radar Chart - Colorful Version */}
            <div className="border border-border/50 p-6 rounded-xl">
              <h3 className="text-lg font-medium mb-4">Performance Overview</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                    <PolarGrid 
                      strokeDasharray="3 3" 
                      stroke="currentColor" 
                      strokeOpacity={0.15} 
                    />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: 'currentColor', fontSize: 12 }}
                      axisLine={{ strokeOpacity: 0.2 }}
                    />
                    <Radar
                      name="Performance"
                      dataKey="score"
                      stroke="url(#colorfulGradient)"
                      fill="url(#colorfulGradient)"
                      fillOpacity={0.5}
                    />
                    <defs>
                      <linearGradient id="colorfulGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#4facfe" stopOpacity={0.8} />
                        <stop offset="50%" stopColor="#00f2fe" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#a8edea" stopOpacity={0.8} />
                      </linearGradient>
                    </defs>
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => router.push('/quiz')}
              className="w-32"
            >
              Retake
            </Button>
            <Button
              onClick={() => router.push('/')}
              className="w-32"
            >
              Home
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}