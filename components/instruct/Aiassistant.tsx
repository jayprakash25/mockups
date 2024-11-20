'use client'

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, Command, ArrowUpDown } from 'lucide-react'

interface AIAssistantProps {
  isPublisher?: boolean
  onUpdateInstructions?: (text: string, shouldReplace?: boolean) => void
}

export default function AIAssistant({ isPublisher = false, onUpdateInstructions }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((open) => !open)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSubmit = () => {
    if (!input.trim()) return
    onUpdateInstructions?.(input, false)
    setInput("")
    setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 p-3 rounded-full
                 bg-gradient-to-r from-emerald-400 to-emerald-600
                 text-white shadow-lg hover:shadow-xl
                 transition-all duration-300 hover:scale-110"
      >
        <Bot className="w-6 h-6" />
        <span className="sr-only">Open AI Instruction Assistant</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-4 left-1/2 -translate-x-1/2 z-50
                       w-full max-w-2xl px-4"
            >
              <div className="relative bg-white/90 backdrop-blur-xl rounded-lg shadow-2xl
                          border border-emerald-200 text-gray-800">
                <div className="flex items-center justify-between px-4 py-3 border-b border-emerald-200">
                  <div className="flex items-center gap-2">
                    <Command className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-800">
                      AI Instruction Assistant
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-emerald-600">
                    <div className="flex items-center gap-1">
                      <Command className="w-3 h-3" />
                      <span>K to toggle</span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    placeholder="Ask for help with writing instructions..."
                    className="w-full bg-transparent border-none outline-none text-gray-800 placeholder-emerald-500"
                    autoFocus
                  />
                </div>

                {input && (
                  <div className="border-t border-emerald-200 px-4 py-3 text-xs text-emerald-600">
                    Press Enter to get AI assistance
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}