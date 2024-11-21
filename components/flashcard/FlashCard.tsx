'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FlashcardContent } from './FlashCardContent'
import { Progress } from "@/components/ui/progress"
import { cn } from '@/lib/utils'

interface Flashcard {
  id: number
  front: string
  back: string
}

const flashcardsData: Flashcard[] = [
  { id: 1, front: "What is the capital of France?", back: "Paris" },
  { id: 2, front: "Who painted the Mona Lisa?", back: "Leonardo da Vinci" },
  { id: 3, front: "What is the largest planet in our solar system?", back: "Jupiter" },
  { id: 4, front: "What is the chemical symbol for gold?", back: "Au" },
  { id: 5, front: "Who wrote 'Romeo and Juliet'?", back: "William Shakespeare" },
]

export const Flashcards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch(e.key) {
        case 'ArrowRight':
          handleNext()
          break
        case 'ArrowLeft':
          handlePrevious()
          break
        case ' ':
          handleFlip()
          break
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const handleNext = () => {
    setIsFlipped(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcardsData.length)
  }

  const handlePrevious = () => {
    setIsFlipped(false)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcardsData.length) % flashcardsData.length)
  }

  const handleFlip = () => {
    setIsFlipped((prev) => !prev)
  }

  const progress = ((currentIndex + 1) / flashcardsData.length) * 100

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
        </div>

        <motion.div
          className="aspect-[3/2] perspective-1000"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative w-full h-full transform-style-3d">
            <FlashcardContent
              front={flashcardsData[currentIndex].front}
              back={flashcardsData[currentIndex].back}
              isFlipped={isFlipped}
              onFlip={handleFlip}
            />
          </div>
        </motion.div>

        <div className="flex justify-between mt-8 gap-4">
          <Button variant="outline" size="lg" onClick={handlePrevious}>
            <ChevronLeft className="mr-2" size={20} />
            Previous
          </Button>
          
          <Button variant="outline" size="lg" onClick={handleFlip}>
            {isFlipped ? 'Hide Answer' : 'Reveal Answer'}
          </Button>
          
          <Button variant="outline" size="lg" onClick={handleNext}>
            Next
            <ChevronRight className="ml-2" size={20} />
          </Button>
        </div>

        <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
          Card {currentIndex + 1} of {flashcardsData.length}
        </div>
      </div>
    </div>
  )
}

