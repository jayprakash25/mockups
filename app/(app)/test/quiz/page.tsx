'use client';

// Sample quiz data
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
        correct: 1
    },
    {
        question: "What is the largest ocean?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: 3
    }
];



import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Command, 
  MessageSquare,
  Lightbulb,
  SkipBack,
  HelpCircle,
  Keyboard
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(quizData.length).fill(-1));
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showAiDialog, setShowAiDialog] = useState(false);
  const [aiMode, setAiMode] = useState<'explain' | 'hint' | 'concept' | null>(null);
  

  // Command + K handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowAiDialog(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const progress = Math.round((selectedAnswers.filter(ans => ans !== -1).length / quizData.length) * 100);

  const clearCurrentSelection = () => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = -1;
    setSelectedAnswers(newAnswers);
  };

  // Add keyboard handler for number keys and navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Existing Command + K handler
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowAiDialog(true);
        return;
      }

      // Letter keys A-D for options
      const letterMap: { [key: string]: number } = {
        'a': 0, 'A': 0,
        'b': 1, 'B': 1,
        'c': 2, 'C': 2,
        'd': 3, 'D': 3
      };

      if (e.key in letterMap) {
        const optionIndex = letterMap[e.key];
        if (optionIndex < quizData[currentQuestion].options.length) {
          handleOptionSelect(optionIndex);
        }
      }

      // Arrow keys / Enter for navigation
      switch (e.key) {
        case 'ArrowLeft':
          if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
          }
          break;
        case 'ArrowRight':
        case 'Enter':
          if (selectedAnswers[currentQuestion] !== -1) {
            if (currentQuestion < quizData.length - 1) {
              setCurrentQuestion(prev => prev + 1);
            } else if (selectedAnswers.every(ans => ans !== -1)) {
              router.push('/test/report');
            }
          }
          break;
        case 'Backspace':
          clearCurrentSelection();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, selectedAnswers, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-2 sm:p-4 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header - make it stack on mobile */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 mb-8">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Progress value={progress} className="w-full sm:w-48" />
            <span className="text-sm text-gray-500 whitespace-nowrap">
              {progress}% Complete
            </span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 text-gray-500">
              <Clock className="h-4 w-4" />
              <span className="font-mono">{formatTime(elapsedTime)}</span>
            </div>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={clearCurrentSelection}
                    disabled={selectedAnswers[currentQuestion] === -1}
                    size="sm"
                    className="flex"
                  >
                    <SkipBack className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Clear</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex items-center gap-2">
                    <Keyboard className="h-4 w-4" />
                    <span>Backspace</span>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => setShowAiDialog(true)}
                    size="sm"
                  >
                    <Sparkles className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">AI Help</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex items-center gap-2">
                    <Command className="h-4 w-4" />
                    <span>K</span>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Question Card - adjust padding for mobile */}
        <Card className="mb-8">
          <CardContent className="p-4 sm:p-8">
            <h2 className="text-2xl font-light mb-8">
              {quizData[currentQuestion].question}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quizData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={cn(
                    "p-6 text-left rounded-lg transition-all duration-200",
                    "border-2 hover:border-emerald-500",
                    "relative",
                    selectedAnswers[currentQuestion] === index 
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700" 
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <span className="text-lg">{option}</span>
                  <span className="absolute bottom-2 right-2 text-xs text-gray-400 flex items-center gap-1">
                    <Keyboard className="h-3 w-3" />
                    {String.fromCharCode(65 + index)}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation - adjust spacing for mobile */}
        <div className="flex justify-between items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="gap-2"
                  onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex items-center gap-2">
                  <Keyboard className="h-4 w-4" />
                  <span>←</span>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                {currentQuestion === quizData.length - 1 ? (
                  <Button
                    variant="default"
                    className="gap-2"
                    onClick={() => router.push('/test/report')}
                    disabled={!selectedAnswers.every(ans => ans !== -1)}
                  >
                    Complete Quiz
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    className="gap-2"
                    onClick={() => setCurrentQuestion(prev => prev + 1)}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex items-center gap-2">
                  <Keyboard className="h-4 w-4" />
                  <span>→ or Enter</span>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* AI Assistant Dialog - make it more mobile friendly */}
        <Dialog open={showAiDialog} onOpenChange={setShowAiDialog}>
          <DialogContent className="sm:max-w-[500px] w-[95vw] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-emerald-500" />
                AI Assistant
              </DialogTitle>
              <DialogDescription>
                How can I help you with this question?
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 gap-3 mt-4">
              <Button
                variant="outline"
                className="justify-start gap-2 h-auto p-3 sm:p-4 text-wrap"
                onClick={() => setAiMode('explain')}
              >
                <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-blue-500" />
                <div className="text-left">
                  <div className="font-medium text-sm sm:text-base break-words">Explain This Question</div>
                  <div className="text-xs sm:text-sm text-gray-500 break-words">Get a detailed explanation of what the question is asking</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start gap-2 h-auto p-3 sm:p-4 text-wrap"
                onClick={() => setAiMode('hint')}
              >
                <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-amber-500" />
                <div className="text-left">
                  <div className="font-medium text-sm sm:text-base break-words">Get a Hint</div>
                  <div className="text-xs sm:text-sm text-gray-500 break-words">Receive a subtle hint without giving away the answer</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start gap-2 h-auto p-3 sm:p-4 text-wrap"
                onClick={() => setAiMode('concept')}
              >
                <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-purple-500" />
                <div className="text-left">
                  <div className="font-medium text-sm sm:text-base break-words">Review Related Concepts</div>
                  <div className="text-xs sm:text-sm text-gray-500 break-words">Understand the key concepts needed for this question</div>
                </div>
              </Button>
            </div>
            {aiMode && (
              <div className="mt-4 relative overflow-hidden">
                <div className="p-3 sm:p-6 bg-gradient-to-r from-emerald-50 to-emerald-50/20 dark:from-emerald-900/10 dark:to-emerald-900/5 
                    rounded-xl border border-emerald-100 dark:border-emerald-800/30
                    shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="h-4 w-4 relative flex-shrink-0 mt-1">
                      <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping"></div>
                      <div className="absolute inset-0 rounded-full bg-emerald-500"></div>
                    </div>
                    <div className="flex flex-col gap-2 flex-1 min-w-0">
                      <div className="h-2 bg-emerald-200/50 dark:bg-emerald-700/30 rounded-full w-1/3 animate-pulse"></div>
                      <div className="h-2 bg-emerald-200/30 dark:bg-emerald-700/20 rounded-full w-1/2 animate-pulse delay-75"></div>
                      <div className="h-2 bg-emerald-200/20 dark:bg-emerald-700/10 rounded-full w-1/4 animate-pulse delay-150"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}