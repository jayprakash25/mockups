'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, Upload, X,  Brain, Sparkles, Globe2, Code2, Palette, Cloud, BookOpen, Rocket } from 'lucide-react'
import { FileUpload } from '@/components/ui/file-upload'

interface ActionButtonProps {
  icon: React.ReactNode
  text: string
  subtext: string
  onClick?: () => void
}

interface Suggestion {
  icon: React.ReactNode
  text: string
  category: string
}

export default function SearchPage() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [uploadOpen, setUploadOpen] = useState(false)

  const suggestions: Suggestion[] = [
    {
      icon: <Code2 className="w-4 h-4" />,
      text: "Master Modern JavaScript",
      category: "Programming"
    },
    {
      icon: <Brain className="w-4 h-4" />,
      text: "Build AI-Powered Apps",
      category: "Artificial Intelligence"
    },
    {
      icon: <Palette className="w-4 h-4" />,
      text: "Design Like a Pro",
      category: "Design"
    },
    {
      icon: <Cloud className="w-4 h-4" />,
      text: "Cloud Architecture",
      category: "Infrastructure"
    },
    {
      icon: <Globe2 className="w-4 h-4" />,
      text: "Web Development",
      category: "Programming"
    },
    {
      icon: <Rocket className="w-4 h-4" />,
      text: "DevOps Mastery",
      category: "Infrastructure"
    },
    {
      icon: <BookOpen className="w-4 h-4" />,
      text: "System Design",
      category: "Architecture"
    },
    {
      icon: <Sparkles className="w-4 h-4" />,
      text: "UI/UX Fundamentals",
      category: "Design"
    }
  ]

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isTyping = document.activeElement?.tagName === 'INPUT' || 
                      document.activeElement?.tagName === 'TEXTAREA'

      if (event.key === '/' && !isTyping) {
        event.preventDefault()
        setSearchOpen(true)
        setTimeout(() => {
          inputRef.current?.focus()
        }, 10)
      }

      if (event.key === 'Escape' && searchOpen) {
        setSearchOpen(false)
        setSearchQuery('')
      }

      if (event.key === 'Escape' && uploadOpen) {
        setUploadOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [searchOpen, uploadOpen])

  // const [containerWidth, setContainerWidth] = useState<number>(0)

  // useEffect(() => {
  //   if (containerRef.current) {
  //     setContainerWidth(containerRef.current.offsetWidth)
  //   }
  // }, [])

  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
        <div className="w-full max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center tracking-tight text-gray-900 dark:text-white transition-colors duration-300">
            {searchOpen ? (
              "Explore Knowledge"
            ) : uploadOpen ? (
              "Upload Your Content"
            ) : (
              "Discover Your Next Insight"
            )}
          </h1>

          <div className="w-full" ref={containerRef}>
            <div className={`w-full flex justify-center transition-all duration-500 ease-in-out ${
              searchOpen || uploadOpen ? 'scale-105' : 'scale-100'
            }`}>
              <div className="w-full flex gap-3">
                <div className={`transition-all duration-500 ease-in-out ${
                  searchOpen ? 'w-0 opacity-0 scale-95' : 
                  uploadOpen ? 'w-full' : 'w-1/2 opacity-100'
                }`}>
                  {!uploadOpen ? (
                    <ActionButton 
                      icon={<Upload className="w-4 h-4" />}
                      text="Upload"
                      subtext="Add content"
                      onClick={() => setUploadOpen(true)}
                    />
                  ) : (
                    <div className="w-full animate-fade-in">
                      <FileUpload 
                        onChange={(files) => {
                          console.log('Files uploaded:', files)
                          // Handle your file upload logic here
                        }} 
                      />
                      <button 
                        onClick={() => setUploadOpen(false)}
                        className="mt-4 w-full px-4 py-2 rounded-xl text-sm
                                 bg-gray-100 dark:bg-gray-800 
                                 text-gray-700 dark:text-gray-300
                                 hover:bg-gray-200 dark:hover:bg-gray-700
                                 transition-all duration-300 ease-in-out"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
                <div className={`transition-all duration-500 ease-in-out ${
                  uploadOpen ? 'w-0 opacity-0 scale-95' :
                  searchOpen ? 'w-full' : 'w-1/2'
                }`}>
                  {!searchOpen ? (
                    <ActionButton 
                      icon={<Search className="w-4 h-4" />}
                      text="Search"
                      subtext="Find content"
                      onClick={() => {
                        setSearchOpen(true)
                        setTimeout(() => {
                          inputRef.current?.focus()
                        }, 10)
                      }} 
                    />
                  ) : (
                    <div className="relative w-full group">
                      <input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={searchQuery ? "" : "What do you want to learn?"}
                        className="w-full px-4 py-3 text-base bg-white dark:bg-gray-800 rounded-xl
                                   border border-gray-200 dark:border-gray-700
                                   focus:outline-none focus:ring-2 focus:ring-emerald-500/20
                                   focus:border-emerald-500 dark:focus:border-emerald-400
                                   shadow-sm transition-all duration-300 ease-in-out
                                   placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        autoFocus
                      />
                      {!searchQuery && (
                        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                          <kbd className="hidden sm:inline-flex h-5 items-center rounded border 
                                        bg-gray-100 px-1.5 font-mono text-[10px] font-medium text-gray-500
                                        dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400
                                        transition-colors duration-300">
                            ESC
                          </kbd>
                        </div>
                      )}
                      <button 
                        onClick={() => {
                          setSearchOpen(false)
                          setSearchQuery('')
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg
                                   text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200
                                   hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-300 ease-in-out"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {!uploadOpen && (
              <>
                {searchOpen && (
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-2 gap-2 animate-fade-in">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchQuery(suggestion.text)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl
                                   bg-gray-100 dark:bg-gray-800/50 
                                   text-gray-700 dark:text-gray-300
                                   border border-gray-200 dark:border-gray-700
                                   hover:bg-gray-200 dark:hover:bg-gray-700
                                   transition-all duration-300 ease-in-out group text-left
                                   hover:scale-105 hover:shadow-md"
                      >
                        <span className="p-1.5 rounded-lg bg-white/50 dark:bg-gray-800 
                                       group-hover:bg-white dark:group-hover:bg-gray-700
                                       transition-colors duration-300">
                          {suggestion.icon}
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-medium truncate">
                            {suggestion.text}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {suggestion.category}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {!searchOpen && (
                  <div className="mt-8 text-center animate-fade-in">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Popular topics to explore:
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {suggestions.slice(0, 4).map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchOpen(true)
                            setSearchQuery(suggestion.text)
                          }}
                          className="px-3 py-1.5 rounded-full text-xs font-medium
                                   bg-gray-200 dark:bg-gray-700 
                                   text-gray-700 dark:text-gray-300
                                   hover:bg-gray-300 dark:hover:bg-gray-600
                                   transition-all duration-300 ease-in-out
                                   hover:scale-110 hover:shadow-md"
                        >
                          {suggestion.text}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {!searchOpen && !uploadOpen && (
            <div className="mt-8 flex justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 
                               border border-gray-300 dark:border-gray-600 
                               text-xs font-mono transition-colors duration-300">/</kbd>
                <span>to search</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 
                               border border-gray-300 dark:border-gray-600 
                               text-xs font-mono transition-colors duration-300">ESC</kbd>
                <span>to close</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

function ActionButton({ 
  icon, 
  text, 
  subtext, 
  onClick 
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl
                 bg-gray-50 dark:bg-gray-800/50 
                 border border-gray-200 dark:border-gray-700
                 hover:border-emerald-500 dark:hover:border-emerald-400
                 hover:shadow-md active:scale-[0.98]
                 w-full transition-all duration-300 ease-in-out
                 hover:bg-white dark:hover:bg-gray-800"
    >
      <span className="p-1.5 rounded-lg bg-white/50 dark:bg-gray-800 
                      group-hover:bg-green-100 dark:group-hover:bg-green-900/20
                      transition-colors duration-300">
        {icon}
      </span>
      <div className="flex flex-col items-start min-w-0">
        <span className="text-sm font-medium truncate">{text}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {subtext}
        </span>
      </div>
    </button>
  )
}