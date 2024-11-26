'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface AIAssistantDockProps {
  isOpen: boolean
  onClose: () => void
  onUpdateInstructions: (newText: string, shouldReplace?: boolean) => void
}

export function AIAssistantDock({ isOpen, onClose, onUpdateInstructions }: AIAssistantDockProps) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the input to your AI service
    // For now, we'll just echo it back
    onUpdateInstructions(`AI: ${input}`)
    setInput('')
  }

  return (
    <div className={`
      fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl
      transition-all duration-300 ease-in-out
      ${isOpen ? 'translate-y-0' : 'translate-y-full'}
    `}>
      <div className="mx-4 mb-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-emerald-100 dark:border-emerald-800">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <h2 className="text-sm font-medium text-emerald-600 dark:text-emerald-400">AI Assistant</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for help with your instructions..."
              className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700"
            />
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-lg
                       hover:bg-emerald-600 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

