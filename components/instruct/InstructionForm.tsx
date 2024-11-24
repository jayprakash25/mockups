"use client"

import { motion } from 'framer-motion'
import { Sliders, Sparkles, BarChart2 } from 'lucide-react'

interface FormData {
  quizLength: number
  presentationLength: number
  instructions: string
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced'
}

interface InstructionsFormProps {
  formData: FormData
  onChange: (data: FormData) => void
  step: number
}

export function InstructionsForm({ formData, onChange, step }: InstructionsFormProps) {
  const difficultyOptions = [
    { value: 'beginner', label: 'Beginner', color: 'emerald' },
    { value: 'intermediate', label: 'Intermediate', color: 'blue' },
    { value: 'advanced', label: 'Advanced', color: 'purple' }
  ]

  const handleRangeChange = (field: 'quizLength' | 'presentationLength', value: number) => {
    // Round to nearest multiple of 5
    const roundedValue = Math.round(value / 5) * 5
    onChange({ ...formData, [field]: roundedValue })
  }

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
          <Sliders className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Content Settings</h2>
      </div>

      <div className="space-y-6">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative group">
            <label className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <span>Quiz Length</span>
              <span className="text-emerald-500">{formData.quizLength} questions</span>
            </label>
            <input
              type="range"
              min="5"

              max="50"
              step={step}

              value={formData.quizLength}
              onChange={(e) => handleRangeChange('quizLength', parseInt(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer
                       bg-gradient-to-r from-emerald-200 to-blue-200
                       dark:from-emerald-900/50 dark:to-blue-900/50
                       accent-emerald-500"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
              <span>5</span>
              <span>10</span>
              <span>15</span>
              <span>20</span>
            </div>
          </div>

          <div className="relative group">
            <label className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <span>Presentation Length</span>
              <span className="text-emerald-500">{formData.presentationLength} slides</span>
            </label>
            <input
              type="range"
              min="5"
              max="30"

              step={step}

              value={formData.presentationLength}
              onChange={(e) => handleRangeChange('presentationLength', parseInt(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer
                       bg-gradient-to-r from-emerald-200 to-blue-200
                       dark:from-emerald-900/50 dark:to-blue-900/50
                       accent-emerald-500"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
              <span>5</span>
              <span>15</span>
              <span>25</span>
              <span>30</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            <BarChart2 className="w-4 h-4 text-emerald-500" />
            Difficulty Level
          </label>
          <div className="grid grid-cols-3 gap-3">
            {difficultyOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onChange({ ...formData, difficultyLevel: option.value as any })}
                className={`relative flex items-center justify-center px-3 py-2 rounded-xl
                           border-2 transition-all duration-300 group
                           ${formData.difficultyLevel === option.value
                             ? `border-${option.color}-500 bg-${option.color}-50 dark:bg-${option.color}-900/20`
                             : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                           }`}
              >
                <span className={`text-sm font-medium transition-colors duration-300
                                ${formData.difficultyLevel === option.value
                                  ? `text-${option.color}-700 dark:text-${option.color}-300`
                                  : 'text-gray-600 dark:text-gray-400'
                                }`}>
                  {option.label}
                </span>
                {formData.difficultyLevel === option.value && (
                  <motion.div
                    layoutId="difficulty-active"
                    className={`absolute inset-0 rounded-xl bg-${option.color}-500/10 dark:bg-${option.color}-500/20
                               ring-1 ring-${option.color}-500/30 dark:ring-${option.color}-400/30`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            {" Preferences"}
          </label>
          <textarea
            value={formData.instructions}
            onChange={(e) => onChange({ ...formData, instructions: e.target.value })}
            placeholder={"Tell us your learning style, areas of focus, and what you hope to achieve..."
            }
            rows={4}
            className="w-full px-4 py-3 rounded-xl
                     bg-white dark:bg-gray-800
                     border border-gray-200 dark:border-gray-700
                     focus:outline-none focus:ring-2 focus:ring-emerald-500/20
                     focus:border-emerald-500 dark:focus:border-emerald-400
                     text-gray-900 dark:text-gray-100
                     placeholder:text-gray-400 dark:placeholder:text-gray-500
                     transition-all duration-300 ease-in-out
                     hover:border-emerald-500/50"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

