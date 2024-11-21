'use client';
import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

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

// Add this function at the top of your component
const calculateProgress = (currentQuestion: number, totalQuestions: number) => {
    return ((currentQuestion + 1) / totalQuestions) * 100;
};

export default function QuizPage() {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(quizData.length).fill(-1));
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [aiInput, setAiInput] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [showAiInput, setShowAiInput] = useState(false);
    const [aiQuestion, setAiQuestion] = useState('');
    const [aiHint, setAiHint] = useState('');

    // Timer that counts up instead of down
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

    const isAllAnswered = selectedAnswers.every(answer => answer !== -1);
    const progress = Math.round((selectedAnswers.filter(ans => ans !== -1).length / quizData.length) * 100);

    const handleNext = () => {
        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    const handleFinish = () => {
        setIsComplete(true);
        router.push('/lessons');
    };

    const handleAiSubmit = () => {
        // Dummy AI response
        setAiResponse(`Here's a hint about ${quizData[currentQuestion].question}: 
        Think about the fundamental concepts and try to eliminate obviously wrong answers first. 
        Remember that ${aiInput} is an important consideration.`);
        setAiInput('');
    };

    return (
        <div className="min-h-screen bg-white p-4 sm:p-8 flex items-center justify-center">
            <div className="w-full max-w-4xl">
                {/* Top bar */}
                <div className="mb-12">
                    <div className="flex justify-between items-center gap-8">
                        <div className="flex-1 h-[3px] bg-gray-100">
                            <div 
                                className="h-full bg-green-500 transition-all duration-300"
                                style={{ width: `${calculateProgress(currentQuestion, quizData.length)}%` }}
                            />
                        </div>
                        <div className="font-mono text-sm text-gray-400">
                            {formatTime(elapsedTime)}
                        </div>
                        <button 
                            onClick={() => setShowHelpModal(true)}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Help
                        </button>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl sm:text-3xl mb-8 sm:mb-10 font-light">
                        {quizData[currentQuestion].question}
                    </h2>

                    {/* Updated options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 mb-12">
                        {quizData[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionSelect(index)}
                                className={`
                                    h-16 sm:h-20 px-4 text-left transition-all
                                    border-2 hover:border-green-500
                                    rounded-lg text-lg
                                    ${selectedAnswers[currentQuestion] === index 
                                        ? 'border-green-500 text-green-500' 
                                        : 'border-gray-200 text-gray-600'
                                    }
                                `}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                            disabled={currentQuestion === 0}
                            className="text-base text-gray-400 hover:text-green-500 disabled:opacity-50"
                        >
                            Previous
                        </button>

                        {currentQuestion === quizData.length - 1 ? (
                            <button
                                onClick={handleFinish}
                                disabled={!isAllAnswered}
                                className={`
                                    px-8 py-2 text-base rounded-md border-2
                                    ${isAllAnswered 
                                        ? 'text-green-500 border-green-500 hover:bg-green-50' 
                                        : 'text-gray-300 border-gray-200'
                                    }
                                `}
                            >
                                Complete
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="text-base text-gray-400 hover:text-green-500"
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>

                {/* Redesigned Help Modal */}
                {showHelpModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        {/* Backdrop */}
                        <div 
                            className="absolute inset-0 bg-white/80 backdrop-blur-sm"
                            onClick={() => {
                                setShowHelpModal(false);
                                setShowAiInput(false);
                                setAiHint('');
                                setAiQuestion('');
                            }}
                        />
                        
                        {/* Modal Content */}
                        <div className="relative bg-white w-full max-w-xl p-8 rounded-lg shadow-lg border-2 border-gray-100">
                            {/* Close button */}
                            <button 
                                onClick={() => {
                                    setShowHelpModal(false);
                                    setShowAiInput(false);
                                    setAiHint('');
                                    setAiQuestion('');
                                }}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            >
                                ×
                            </button>

                            {/* Help content */}
                            <div className="mb-8 text-gray-600 leading-relaxed">
                                Here are some tips to help you with this question:
                                <br /><br />
                                1. Read the question carefully and identify key terms<br />
                                2. Consider all options before making your choice<br />
                                3. Look for any patterns in the question structure<br />
                                4. Eliminate obviously incorrect answers first<br />
                                5. Trust your initial instinct, but verify<br />
                                6. Check if the question contains any hints<br />
                                7. Remember related concepts from your studies<br />
                                8. Look for any qualifying words in the question<br />
                                9. Consider the context of the topic<br />
                                10. Take your time to understand each option
                            </div>

                            {/* AI Helper Section */}
                            <div className="flex items-center gap-3">
                                {/* AI Trigger Button */}
                                <button
                                    onClick={() => setShowAiInput(!showAiInput)}
                                    className="flex items-center gap-2 text-gray-400 hover:text-green-500 transition-colors"
                                >
                                    <Sparkles size={16} />
                                    <span className="text-sm">Ask AI</span>
                                </button>

                                {/* AI Input */}
                                {showAiInput && (
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            value={aiQuestion}
                                            onChange={(e) => {
                                                setAiQuestion(e.target.value);
                                                // Mockup: Show hint after typing
                                                setAiHint('This is a sample AI response to help you understand the concept better.');
                                            }}
                                            placeholder="Ask a quick question..."
                                            className="w-full py-1 px-3 text-sm border-b-2 border-gray-200 focus:border-green-500 focus:outline-none"
                                        />
                                        
                                        {/* AI Hint Popup */}
                                        {aiHint && (
                                            <div className="absolute top-0 transform -translate-y-full -translate-x-1/4 left-1/2 mb-2 p-3 bg-green-50 rounded-lg text-gray-600 text-sm w-64 animate-fade-in">
                                                {aiHint}
                                                <div className="absolute bottom-0 left-1/2 transform translate-x-[-50%] translate-y-[50%] rotate-45 w-2 h-2 bg-green-50"></div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
