import React from 'react'
import { motion } from 'framer-motion'

interface FlashcardContentProps {
  front: string
  back: string
  isFlipped: boolean
  onFlip: () => void
}

export const FlashcardContent: React.FC<FlashcardContentProps> = ({ front, back, isFlipped, onFlip }) => {
  return (
    <div className="w-full h-full relative cursor-pointer" onClick={onFlip}>
      <motion.div
        className="w-full h-full absolute backface-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Question</p>
          <p className="text-2xl font-medium text-gray-800 dark:text-gray-200">{front}</p>
        </div>
      </motion.div>
      
      <motion.div
        className="w-full h-full absolute backface-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        initial={false}
        animate={{ rotateY: isFlipped ? 0 : -180 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Answer</p>
          <p className="text-2xl font-medium text-gray-800 dark:text-gray-200">{back}</p>
        </div>
      </motion.div>
    </div>
  )
}

