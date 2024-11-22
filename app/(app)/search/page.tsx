'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Search, Upload, X, Brain, Book, Presentation, FileText, Sparkles } from 'lucide-react';
import { FileUpload } from '@/components/ui/file-upload';
import { BUTTON_GRADIENT } from '@/lib/constants';
import Link from 'next/link';

interface ActionButtonProps {
  icon: React.ReactNode;
  text: string;
  subtext: string;
  onClick?: () => void;
}

export default function LearningHub() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadOpen, setUploadOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    {
      icon: <Book className="w-4 h-4" />,
      text: "Research Paper",
      category: "Convert paper into structured lessons"
    },
    {
      icon: <Presentation className="w-4 h-4" />,
      text: "Course Slides",
      category: "Transform slides into interactive content"
    },
    {
      icon: <FileText className="w-4 h-4" />,
      text: "Study Notes",
      category: "Convert notes to comprehensive guides"
    },
    {
      icon: <Brain className="w-4 h-4" />,
      text: "Learning Material",
      category: "Generate lessons from any content"
    }
  ];

  const popularTopics = [
    {
      icon: <Brain className="w-4 h-4" />,
      text: "Machine Learning",
      category: "Technical"
    },
    {
      icon: <Book className="w-4 h-4" />,
      text: "World History",
      category: "Humanities"
    },
    {
      icon: <Sparkles className="w-4 h-4" />,
      text: "Business Strategy",
      category: "Business"
    },
    {
      icon: <FileText className="w-4 h-4" />,
      text: "Psychology",
      category: "Science"
    }
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isTyping = document.activeElement?.tagName === 'INPUT' || 
                      document.activeElement?.tagName === 'TEXTAREA';

      if (event.key === '/' && !isTyping) {
        event.preventDefault();
        setSearchOpen(true);
        setTimeout(() => inputRef.current?.focus(), 10);
      }

      if (event.key === 'Escape') {
        if (searchOpen) {
          setSearchOpen(false);
          setSearchQuery('');
        }
        if (uploadOpen) {
          setUploadOpen(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, uploadOpen]);

  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
        <div className="w-full max-w-2xl mx-auto">
          {/* Enhanced Header Section */}
          {!searchOpen && !uploadOpen && (
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 tracking-tight 
                           text-gray-900 dark:text-white transition-colors duration-300">
                Transform Any Content
                <span className="text-emerald-500"> Into Learning</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                Upload your content or explore our library. We'll convert it into interactive lessons, 
                study guides, and practice materials.
              </p>
            </div>
          )}

          {/* Dynamic Title for Search/Upload States */}
          {(searchOpen || uploadOpen) && (
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center 
                         tracking-tight text-gray-900 dark:text-white transition-colors duration-300">
              {searchOpen ? "Find Learning Content" : "Upload Your Material"}
            </h1>
          )}

          <div className="w-full" ref={containerRef}>
            <div className={`w-full flex justify-center transition-all duration-500 ease-in-out ${
              searchOpen || uploadOpen ? 'scale-105' : 'scale-100'
            }`}>
              {/* Action Buttons Container */}
              <div className="w-full flex flex-col sm:flex-row gap-3">
                {/* Upload Section */}
                <div className={`transition-all duration-500 ease-in-out ${
                  searchOpen ? 'w-0 opacity-0 scale-95' : 
                  uploadOpen ? 'w-full' : 'w-full sm:w-1/2 opacity-100'
                }`}>
                  {!uploadOpen ? (
                    <ActionButton 
                      icon={<Upload className="w-4 h-4" />}
                      text="Transform Content"
                      subtext="Upload materials to convert"
                      onClick={() => setUploadOpen(true)}
                    />
                  ) : (
                    <div className="w-full animate-fade-in">
                      <FileUpload onCancel={() => setUploadOpen(false)} />
                    </div>
                  )}
                </div>

                {/* Search Section */}
                <div className={`transition-all duration-500 ease-in-out ${
                  uploadOpen ? 'w-0 opacity-0 scale-95' :
                  searchOpen ? 'w-full' : 'w-full sm:w-1/2'
                }`}>
                  {!searchOpen ? (
                    <ActionButton 
                      icon={<Search className="w-4 h-4" />}
                      text="Explore Content"
                      subtext="Find existing materials"
                      onClick={() => {
                        setSearchOpen(true);
                        setTimeout(() => inputRef.current?.focus(), 10);
                      }}
                    />
                  ) : (
                    <div className="w-full">
                      <div className="relative w-full group">
                        <input
                          ref={inputRef}
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="What would you like to learn?"
                          className="w-full px-4 py-3 text-sm sm:text-base bg-white dark:bg-gray-800 
                                   rounded-xl border border-gray-200 dark:border-gray-700
                                   focus:outline-none focus:ring-2 focus:ring-emerald-500/20
                                   focus:border-emerald-500 dark:focus:border-emerald-400
                                   shadow-sm transition-all duration-300"
                          autoFocus
                        />
                        <button 
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg
                                   text-gray-500 hover:text-gray-700 dark:text-gray-400 
                                   dark:hover:text-gray-200 hover:bg-gray-100 
                                   dark:hover:bg-gray-700/50 transition-all duration-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex justify-between gap-3 mt-6">
                        <button 
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm
                                   bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300
                                   hover:bg-gray-200 dark:hover:bg-gray-700
                                   transition-all duration-300"
                        >
                          Cancel
                        </button>
                        <Link href="/instruct">
                          <button
                            disabled={!searchQuery}
                            className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm 
                                     font-semibold transition-all duration-300 ${
                              searchQuery
                                ? `${BUTTON_GRADIENT} text-white hover:shadow-lg hover:-translate-y-0.5`
                                : "bg-gray-400 text-white cursor-not-allowed"
                            }`}
                          >
                            Generate Lessons
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Suggestions Section */}
            {!uploadOpen && searchOpen && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 animate-fade-in">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(suggestion.text)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl
                             bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300
                             border border-gray-200 dark:border-gray-700
                             hover:bg-gray-200 dark:hover:bg-gray-700
                             transition-all duration-300 group text-left"
                  >
                    <span className="p-1.5 rounded-lg bg-white/50 dark:bg-gray-800 
                                   group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/20
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

            {/* Popular Topics */}
            {!searchOpen && !uploadOpen && (
              <div className="mt-8 text-center animate-fade-in">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Browse popular topics:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {popularTopics.map((topic, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchOpen(true);
                        setSearchQuery(topic.text);
                      }}
                      className="group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs
                               font-medium bg-white dark:bg-gray-800 border border-gray-200 
                               dark:border-gray-700 text-gray-700 dark:text-gray-300
                               hover:border-emerald-500 dark:hover:border-emerald-400
                               hover:shadow-sm transition-all duration-300"
                    >
                      <span className="text-emerald-500">{topic.icon}</span>
                      {topic.text}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Keyboard Shortcuts */}
          {!searchOpen && !uploadOpen && (
            <div className="mt-8 hidden lg:flex justify-center items-center gap-4 
                           text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 
                               border border-gray-300 dark:border-gray-600 text-xs font-mono">/</kbd>
                <span>to search</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 
                               border border-gray-300 dark:border-gray-600 text-xs font-mono">ESC</kbd>
                <span>to close</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function ActionButton({ icon, text, subtext, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl
                 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700
                 hover:border-emerald-500 dark:hover:border-emerald-400
                 hover:shadow-md active:scale-[0.98] w-full transition-all duration-300"
    >
      <span className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 
                      group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/20
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
  );
}