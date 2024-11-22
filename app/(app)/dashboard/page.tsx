'use client'

import React from 'react';
import { Book, Brain, Target, Check, Clock, ArrowRight, FileText, Presentation, List, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BUTTON_GRADIENT } from '@/lib/constants';

const GeneratedDashboard = () => {
  const fileName = "Machine Learning Basics.pdf";

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Generation Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-emerald-100 dark:bg-emerald-900/20 
                         rounded-full mb-4">
            <Sparkles className="w-6 h-6 text-emerald-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Your Content is Ready!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We&apos;ve transformed <span className="font-medium text-emerald-500">{fileName}</span> into 
            interactive learning materials and practice tests.
          </p>
        </div>

        {/* Generated Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Learning Materials Card */}
          <Link href="/learn">
            <Card className="group cursor-pointer bg-white dark:bg-gray-800 hover:shadow-lg
                         border-gray-200 dark:border-gray-700 transition-all duration-300
                         hover:border-emerald-500 dark:hover:border-emerald-400">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/20">
                      <Brain className="w-5 h-5 text-emerald-500" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Learning Materials
                    </h2>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 
                                     group-hover:transform group-hover:translate-x-1 transition-all" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Presentation className="w-4 h-4" />
                    <span>12 Interactive Lessons</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <FileText className="w-4 h-4" />
                    <span>Study Guide & Notes</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <List className="w-4 h-4" />
                    <span>Quick Reference Sheets</span>
                  </div>
                </div>

                <button className={`w-full mt-6 px-4 py-2.5 rounded-xl text-sm font-semibold
                                text-white transition-all duration-300 ${BUTTON_GRADIENT}
                                hover:shadow-md hover:-translate-y-0.5`}>
                  Start Learning
                </button>
              </CardContent>
            </Card>
          </Link>

          {/* Practice Tests Card */}
          <Link href="/test/quiz">
            <Card className="group cursor-pointer bg-white dark:bg-gray-800 hover:shadow-lg
                         border-gray-200 dark:border-gray-700 transition-all duration-300
                         hover:border-emerald-500 dark:hover:border-emerald-400">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/20">
                      <Target className="w-5 h-5 text-emerald-500" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Practice Tests
                    </h2>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 
                                     group-hover:transform group-hover:translate-x-1 transition-all" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Brain className="w-4 h-4" />
                    <span>Concept-based Quizzes</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>Timed Assessments</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Check className="w-4 h-4" />
                    <span>Practice Problems</span>
                  </div>
                </div>

                <button className={`w-full mt-6 px-4 py-2.5 rounded-xl text-sm font-semibold
                                text-white transition-all duration-300 ${BUTTON_GRADIENT}
                                hover:shadow-md hover:-translate-y-0.5`}>
                  Start Practice
                </button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Content Overview */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Content Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Book className="w-5 h-5 text-emerald-500" />,
                  title: "Core Concepts",
                  count: "8 topics"
                },
                {
                  icon: <Target className="w-5 h-5 text-emerald-500" />,
                  title: "Practice Questions",
                  count: "45 questions"
                },
                {
                  icon: <Clock className="w-5 h-5 text-emerald-500" />,
                  title: "Estimated Duration",
                  count: "2.5 hours"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/20">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.count}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </main>
  );
};

export default GeneratedDashboard;