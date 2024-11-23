'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster, toast } from 'sonner'
import { InstructionsForm } from '@/components/instruct/InstructionForm'
import AIAssistant from '@/components/instruct/Aiassistant'
import { Toggle } from '@/components/instruct/Toggle'
import { BUTTON_GRADIENT } from '@/lib/constants'
import { MultiStepLoader } from '@/components/step-loader'

export default function InstructionsPage() {
  const [isPublisher, setIsPublisher] = useState(false)
  const [formData, setFormData] = useState({
    quizLength: 5,
    presentationLength: 10,
    instructions: ''
  })
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = ['Lessons', 'Quiz', 'Flashcards']

  const loadingStates = [
    { text: 'Generating your lessons...' },
    { text: 'Creating quiz questions...' },
    { text: 'Preparing flashcards...' },
  ]

  const handleSubmit = () => {
    console.log('Generating content with:', formData)
  }

  const handleAIUpdate = (newText: string, shouldReplace: boolean = false) => {
    setFormData(prev => ({
      ...prev,
      instructions: shouldReplace ? newText : `${prev.instructions}\n${newText}`.trim()
    }))
  }

  const handleGenerate = () => {
    setIsGenerating(true)
    handleSubmit()

    setTimeout(() => {
      window.location.href = '/dashboard'
    }, 6000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Toaster position="top-center" />
      <div className="min-h-screen p-4 sm:p-6 md:p-8 flex items-center justify-center relative">
        <div className="w-full max-w-6xl relative">
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <motion.div 
              className="space-y-4 sm:space-y-6 w-full max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-3 sm:p-4 md:p-6 shadow-xl ring-1 ring-gray-900/5 dark:ring-white/10">
                <Toggle isPublisher={isPublisher} onToggle={() => setIsPublisher(!isPublisher)} />
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-3 sm:p-4 md:p-6 shadow-xl ring-1 ring-gray-900/5 dark:ring-white/10">
                <InstructionsForm
                  formData={{...formData, difficultyLevel: 'intermediate'}}
                  onChange={setFormData}
                  isPublisher={isPublisher}
                />
              </div>

              <div className="flex justify-end mt-4 sm:mt-6">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className={`${BUTTON_GRADIENT} text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''} w-full sm:w-auto justify-center`}
                >
                  <span>{isPublisher ? 'Generate Content' : 'Start Learning'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            <motion.div 
              className="hidden sm:block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <AIAssistant 
                isPublisher={isPublisher} 
                onUpdateInstructions={handleAIUpdate}
              />
            </motion.div>
          </div>

          <MultiStepLoader
            loadingStates={[
              { text: 'Analyzing your requirements...' },
              { text: 'Crafting personalized lessons...' },
              { text: 'Generating interactive quizzes...' },
              { text: 'Creating study flashcards...' },
              { text: 'Finalizing your learning experience...' }
            ]}
            loading={isGenerating}
            duration={1500}
            loop={false}
          />
        </div>
      </div>
    </main>
  )
}

