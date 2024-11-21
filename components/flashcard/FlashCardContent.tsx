import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FlashcardContentProps {
  front: string
  back: string
  isFlipped: boolean
  onFlip: () => void
}

export const FlashcardContent: React.FC<FlashcardContentProps> = ({ front, back, isFlipped, onFlip }) => {
  return (
    <div className="w-full h-full relative cursor-pointer" onClick={onFlip}>
      {/* Front of card */}
      <motion.div
        className={cn(
          "w-full h-full absolute backface-hidden rounded-2xl shadow-lg",
          "bg-white dark:bg-gray-800/90",
          "border border-gray-200 dark:border-gray-700"
        )}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Question</p>
          <p className="text-2xl font-medium text-gray-800 dark:text-gray-200">{front}</p>
        </div>
      </motion.div>
      
      {/* Back of card */}
      <motion.div
        className={cn(
          "w-full h-full absolute backface-hidden rounded-2xl shadow-lg",
          "bg-gradient-to-br from-emerald-500 to-teal-600",
          "border border-emerald-400/20"
        )}
        initial={false}
        animate={{ rotateY: isFlipped ? 0 : -180 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
          <p className="text-sm text-emerald-50/80 mb-4">Answer</p>
          <p className="text-2xl font-medium text-white">{back}</p>
        </div>
      </motion.div>
    </div>
  )
}

