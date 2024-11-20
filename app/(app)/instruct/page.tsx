'use client'

import { useState } from 'react'
import { Sparkles, ArrowRight, Bot, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster, toast } from 'sonner'
import { InstructionsForm } from '@/components/instruct/InstructionForm'
import AIAssistant from '@/components/instruct/Aiassistant'
import { Toggle } from '@/components/instruct/Toggle'

export default function InstructionsPage() {
  const [isPublisher, setIsPublisher] = useState(false)
  const [formData, setFormData] = useState({
    quizLength: 5,
    presentationLength: 10,
    instructions: ''
  })
  const [showAIAssistant, setShowAIAssistant] = useState(false)

  const handleSubmit = () => {
    toast.success('Generating your personalized content...', {
      description: 'This might take a moment.',
    })
    console.log('Generating content with:', formData)
  }

  const handleAIUpdate = (newText: string, shouldReplace: boolean = false) => {
    setFormData(prev => ({
      ...prev,
      instructions: shouldReplace ? newText : `${prev.instructions}\n${newText}`.trim()
    }))
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Toaster position="top-center" />
      <div className="min-h-screen p-4 sm:p-6">
        <div className="max-w-6xl mx-auto relative">
          {/* Animated Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-3 mb-8 sm:mb-12 relative"
          >
            <div className="inline-block">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight">
                <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                  {isPublisher ? "Create Amazing Content" : "Customize Your Learning"}
                </span>
              </h1>
              <div className="h-px w-1/3 bg-gradient-to-r from-emerald-400 to-blue-500 mx-auto mt-3 opacity-50" />
            </div>
            <p className="text-sm font-light text-gray-600 dark:text-gray-400 max-w-md mx-auto tracking-wide">
              {isPublisher 
                ? "Transform your knowledge into engaging learning materials"
                : "Tell us how you learn best, and we'll adapt to your style"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 mx-auto place-items-center place-content-center gap-6">
            {/* Main Form Section */}
            <motion.div 
              className="lg:col-span-3 lg:col-start-2 space-y-6 w-full max-w-2xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-xl ring-1 ring-gray-900/5 dark:ring-white/10">
                <Toggle isPublisher={isPublisher} onToggle={() => setIsPublisher(!isPublisher)} />
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-xl ring-1 ring-gray-900/5 dark:ring-white/10">
                <InstructionsForm
                  formData={{...formData, difficultyLevel: 'intermediate'}}
                  onChange={setFormData}
                  isPublisher={isPublisher}
                />
              </div>
            </motion.div>

            {/* AI Assistant Section (Desktop) */}
            <motion.div 
              className="lg:col-span-1 lg:col-start-5 hidden lg:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <AIAssistant 
                isPublisher={isPublisher} 
                onUpdateInstructions={handleAIUpdate}
              />
            </motion.div>
          </div>

          {/* Submit Button */}
          <motion.div 
            className="mt-8 flex justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button
              onClick={handleSubmit}
              disabled={!formData.instructions}
              className={`group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl
                       flex items-center gap-3
                       transition-all duration-300 ease-in-out
                       ${formData.instructions 
                         ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white hover:shadow-lg hover:scale-105' 
                         : 'bg-gray-100 dark:bg-gray-700/50 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                       }`}
            >
              <Sparkles className={`w-5 h-5 ${formData.instructions ? 'animate-pulse' : ''}`} />
              <span className="font-medium">Generate Content</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* AI Assistant Toggle (Mobile) */}
      <motion.button
        className="fixed bottom-4 right-4 lg:hidden z-50 bg-emerald-500 text-white p-3 rounded-full shadow-lg"
        onClick={() => setShowAIAssistant(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Bot className="w-6 h-6" />
        <span className="sr-only">Open AI Assistant</span>
      </motion.button>

      {/* AI Assistant Modal (Mobile) */}
      <AnimatePresence>
        {showAIAssistant && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
            className="fixed inset-0 z-50 lg:hidden bg-white dark:bg-gray-800 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4">
              <button
                onClick={() => setShowAIAssistant(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-6 h-6" />
                <span className="sr-only">Close AI Assistant</span>
              </button>
            </div>
            <div className="h-full overflow-y-auto p-4">
              <AIAssistant 
                isPublisher={isPublisher} 
                onUpdateInstructions={handleAIUpdate}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}