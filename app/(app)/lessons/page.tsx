'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Book, ArrowRight } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

interface Lesson {
  id: string
  title: string
  description: string
  source: string
}

const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Introduction to Machine Learning',
    description: 'Learn the basics of machine learning and its applications.',
    source: 'ML_Fundamentals.pdf'
  },
  {
    id: '2',
    title: 'Data Preprocessing Techniques',
    description: 'Explore essential data preprocessing methods for ML models.',
    source: 'Data_Preprocessing.docx'
  },
  {
    id: '3',
    title: 'Supervised Learning Algorithms',
    description: 'Dive into popular supervised learning algorithms and their use cases.',
    source: 'Supervised_Learning.pptx'
  },
  {
    id: '4',
    title: 'Neural Networks Fundamentals',
    description: 'Understand the building blocks of neural networks.',
    source: 'Neural_Networks.pdf'
  },
  {
    id: '5',
    title: 'Model Evaluation Metrics',
    description: 'Learn how to evaluate and compare machine learning models.',
    source: 'Model_Evaluation.docx'
  },
  {
    id: '6',
    title: 'Unsupervised Learning Techniques',
    description: 'Explore clustering and dimensionality reduction methods.',
    source: 'Unsupervised_Learning.pptx'
  },
]

export default function LessonGrid() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="min-h-screen p-4 sm:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <LessonCard 
                key={lesson.id} 
                lesson={lesson} 
                isHovered={hoveredCard === lesson.id}
                onHover={() => setHoveredCard(lesson.id)}
                onLeave={() => setHoveredCard(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

function LessonCard({ lesson, isHovered, onHover, onLeave }: { 
  lesson: Lesson
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}) {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Card className="overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-xl ring-1 ring-gray-900/5 dark:ring-white/10">
        <CardContent className="p-6">
          <div className="flex flex-col h-full">
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {lesson.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {lesson.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Book className="w-4 h-4" />
                <span>{lesson.source}</span>
              </div>
            </div>
            <motion.div 
              className="mt-6" 
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                onClick={() => router.push(`/lessons/${lesson.id}`)}
                className="w-full bg-gradient-to-r from-emerald-400 to-emerald-600 text-white hover:shadow-lg 
                          hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>View Lesson</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}