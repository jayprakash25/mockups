import React from 'react';
import { Book, Brain, FileText, MessageSquare, Diamond, Presentation, ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { BUTTON_GRADIENT } from '@/lib/constants';

const LearningHub = () => {
  const learningOptions = [
    {
      icon: <Book className="w-5 h-5" />,
      title: "Interactive Lessons",
      description: "Step-by-step guided learning experience",
      stats: "12 lessons • 2.5 hrs",
      href: "/lessons",
      color: "text-blue-500"
    },
    {
      icon: <Diamond className="w-5 h-5" />,
      title: "Flashcards",
      description: "Quick review and memorization",
      stats: "85 cards • 3 decks",
      href: "/flashcards",
      color: "text-purple-500"
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Chat with Content",
      description: "Ask questions about your materials",
      stats: "AI-powered assistance",
      href: "/chat",
      color: "text-emerald-500"
    },
    {
      icon: <Presentation className="w-5 h-5" />,
      title: "Presentations",
      description: "Slides with speaker notes",
      stats: "15 slides • Annotated",
      href: "/presentations",
      color: "text-orange-500"
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Quick References",
      description: "One-page summaries and cheatsheets",
      stats: "5 guides • Key points",
      href: "/references",
      color: "text-pink-500"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Machine Learning Basics
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Brain className="w-4 h-4" />
                <span>AI Generated</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Created 2 hours ago</span>
              </div>
            </div>
          </div>
          
          <button className={`px-4 py-2 rounded-xl text-sm font-medium
                          text-white transition-all duration-300 ${BUTTON_GRADIENT}
                          hover:shadow-md hover:-translate-y-0.5`}>
            Continue Learning
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningOptions.map((option, index) => (
            <Link href={option.href} key={index}>
              <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6
                          border border-gray-100 dark:border-gray-700
                          hover:shadow-lg transition-all duration-300
                          hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${option.color}`}>
                    {option.icon}
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-400 
                                     group-hover:transform group-hover:translate-x-1 transition-all" />
                </div>
                
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {option.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                  {option.description}
                </p>
                
                <div className="text-xs text-gray-400 dark:text-gray-500">
                  {option.stats}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default LearningHub;