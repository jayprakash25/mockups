'use client'

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, GalleryVerticalEnd, Maximize2, Minimize2, MessageSquare, Download, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PresentationViewer = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(true);
  
  // Example presentation data
  const presentation = {
    title: "Introduction to Machine Learning",
    totalSlides: 15,
    slides: [
      {
        id: 1,
        content: (
          <div className="flex flex-col items-center justify-center h-full text-center p-4 sm:p-8">
            <h1 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Introduction to Machine Learning
            </h1>
            <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300">
              Understanding the Fundamentals
            </p>
          </div>
        ),
        notes: "Welcome to the Introduction to Machine Learning course. This presentation covers the basic concepts and principles that form the foundation of machine learning. We'll explore key terminology, common algorithms, and practical applications."
      },
      {
        id: 2,
        content: (
          <div className="flex flex-col items-center justify-center h-full text-center p-4 sm:p-8">
            <h1 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              What is Machine Learning?
            </h1>
            <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300">
              A Brief Overview
            </p>
          </div>
        ),
        notes: "Machine learning is a subset of artificial intelligence that focuses on developing algorithms and statistical models to enable computers to learn from and make decisions based on data. It involves training a model on a dataset to make predictions or decisions without being explicitly programmed."
      },
      {
        id: 3,
        content: (
          <div className="flex flex-col items-center justify-center h-full text-center p-4 sm:p-8">
            <h1 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Types of Machine Learning
            </h1>
            <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300">
              Supervised, Unsupervised, and Reinforcement Learning
            </p>
          </div>
        ),
        notes: "There are three main types of machine learning: supervised learning, unsupervised learning, and reinforcement learning. Supervised learning involves training a model on labeled data, unsupervised learning involves finding patterns in unlabeled data, and reinforcement learning involves training an agent to make decisions based on rewards and penalties."
      },
      {
        id: 4,
        content: (
          <div className="flex flex-col items-center justify-center h-full text-center p-4 sm:p-8">
            <h1 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Supervised Learning
            </h1>
            <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300">
              Training a Model on Labeled Data
            </p>
          </div>
        ),
        notes: "Supervised learning is a type of machine learning where the model is trained on a labeled dataset, meaning that the input data is paired with the correct output. The goal is to learn a mapping function that can predict the output for new, unseen data."
      }
    ]
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {presentation.title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Slide {currentSlide} of {presentation.totalSlides}
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowNotes(!showNotes)}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Toggle Speaker Notes</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleFullscreen}
                  >
                    {isFullscreen ? (
                      <Minimize2 className="h-4 w-4" />
                    ) : (
                      <Maximize2 className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Toggle Fullscreen</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button variant="default" className="gap-2 text-xs sm:text-sm">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download Slides</span>
              <span className="sm:hidden">Download</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Slide Preview */}
          <div className="lg:col-span-2">
            <Card className="aspect-[16/9] flex items-center justify-center bg-white dark:bg-gray-800 shadow-lg">
              {presentation.slides[currentSlide - 1].content}
            </Card>
            
            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentSlide(Math.max(1, currentSlide - 1))}
                disabled={currentSlide === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Previous</span>
              </Button>

              <div className="flex items-center gap-1 sm:gap-2">
                {[...Array(presentation.totalSlides)].map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 sm:h-1.5 transition-all cursor-pointer
                      ${currentSlide === idx + 1 
                        ? 'bg-emerald-500 w-2 sm:w-3' 
                        : 'bg-gray-300 dark:bg-gray-600 w-1 sm:w-1.5'
                      } rounded-full`}
                    onClick={() => setCurrentSlide(idx + 1)}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentSlide(Math.min(presentation.totalSlides, currentSlide + 1))}
                disabled={currentSlide === presentation.totalSlides}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Speaker Notes */}
          {showNotes && (
            <Card className="p-4 sm:p-6 bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <GalleryVerticalEnd className="h-4 w-4 text-emerald-500" />
                  <h3 className="font-medium text-sm sm:text-base">Speaker Notes</h3>
                </div>
                <Button variant="ghost" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <Separator className="mb-4" />
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {presentation.slides[currentSlide - 1].notes}
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PresentationViewer;

