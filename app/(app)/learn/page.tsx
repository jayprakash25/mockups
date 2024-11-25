'use client';

import React from 'react';
import { Book, Brain, FileText, MessageSquare, Diamond, Presentation, ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { BUTTON_GRADIENT } from "@/lib/constants";

const LearningHub = () => {
  const learningOptions = [
    {
      icon: <Book className="w-5 h-5" />,
      title: "Interactive Lessons",
      description: "Step-by-step guided learning experience",
      stats: "12 lessons • 2.5 hrs",
      href: "/learn/lessons",
      color: "text-blue-500"
    },
    {
      icon: <Diamond className="w-5 h-5" />,
      title: "Flashcards",
      description: "Quick review and memorization",
      stats: "85 cards • 3 decks",
      href: "/learn/flashcards",
      color: "text-purple-500"
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Chat with Content",
      description: "Ask questions about your materials",
      stats: "AI-powered assistance",
      href: "/learn/chat",
      color: "text-emerald-500"
    },
    {
      icon: <Presentation className="w-5 h-5" />,
      title: "Presentations",
      description: "Slides with speaker notes",
      stats: "15 slides • Annotated",
      href: "/learn/presentation",
      color: "text-orange-500"
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Quick References",
      description: "One-page summaries and cheatsheets",
      stats: "5 guides • Key points",
      href: "/learn/cheatsheet",
      color: "text-pink-500"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Machine Learning Basics
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
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
          
          <Button className={`${BUTTON_GRADIENT} text-white hover:opacity-90 transition-all duration-300`}>
            Continue Learning
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningOptions.map((option, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <Link href={option.href} className="block h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {option.title}
                  </CardTitle>
                  <div className={`${option.color}`}>
                    {option.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs sm:text-sm mb-4">
                    {option.description}
                  </CardDescription>
                  <p className="text-xs text-muted-foreground">
                    {option.stats}
                  </p>
                </CardContent>
                <CardFooter>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-400 
                                     group-hover:transform group-hover:translate-x-1 transition-all ml-auto" />
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default LearningHub;

