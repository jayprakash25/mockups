'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search, Upload, X, Eye, Plus, ExternalLink, Map, Zap } from 'lucide-react';
import { FileUpload } from '@/components/ui/file-upload';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { BUTTON_GRADIENT } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';
import QuizLoader from '@/components/animate';

interface ActionButtonProps {
  icon: React.ReactNode;
  text: string;
  subtext: string;
  onClick?: () => void;
}

interface Source {
  id: string;
  title: string;
  description: string;
  url: string;
  citations: string[];
  preview?: string;
}

interface SearchResult {
  id: string;
  content: string;
  sources: Source[];
  isGenerating: boolean;
}

const mockSources: Source[] = [
  {
    id: '1',
    title: "Introduction to Machine Learning",
    description: "Comprehensive overview of ML fundamentals",
    url: "https://example.com/ml-intro",
    citations: ["Page 23: Core ML concepts", "Chapter 2: Supervised Learning"],
    preview: "Machine learning is a subset of artificial intelligence that focuses on developing systems that can learn from and make decisions based on data..."
  },
  {
    id: '2',
    title: "Neural Networks Explained",
    description: "Deep dive into neural network architectures",
    url: "https://example.com/neural-networks",
    citations: ["Section 3.1: Network Topology", "Figure 4: Activation Functions"],
    preview: "Neural networks are computing systems inspired by biological neural networks. They consist of layers of interconnected nodes..."
  },
  {
    id: '3',
    title: "Deep Learning Applications",
    description: "Real-world applications of deep learning",
    url: "https://example.com/dl-applications",
    citations: ["Case Study 1: Computer Vision", "Table 5: Industry Applications"],
    preview: "Deep learning has transformed various industries, from healthcare to autonomous vehicles..."
  }
];

export default function LearningHub() {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [uploadOpen, setUploadOpen] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [addedSources, setAddedSources] = useState<Set<string>>(new Set());
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [roadmapOpen, setRoadmapOpen] = useState<boolean>(false);
  const [quizOpen, setQuizOpen] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setResults([{
      id: Date.now().toString(),
      content: '',
      sources: [],
      isGenerating: true
    }]);

    const finalContent = "Here's what I found about machine learning based on reliable sources:";
    let currentContent = '';

    for (let i = 0; i < finalContent.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 15));
      currentContent += finalContent[i];
      setResults(prev => [{
        ...prev[0],
        content: currentContent
      }]);
    }

    for (const source of mockSources) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setResults(prev => [{
        ...prev[0],
        sources: [...prev[0].sources, source]
      }]);
    }

    setIsSearching(false);
    setResults(prev => [{
      ...prev[0],
      isGenerating: false
    }]);
  }, [searchQuery]);

  const handleAddSource = useCallback((sourceId: string) => {
    setAddedSources(prev => {
      const next = new Set(prev);
      next.add(sourceId);
      return next;
    });
    toast.success('Source added to your library', {
      duration: 2000,
      position: 'bottom-center',
    });
  }, []);

  const handlePreview = useCallback((content: string) => {
    setPreviewContent(content);
  }, []);

  const closeModal = useCallback(() => {
    setPreviewContent(null);
  }, []);

  const handleRoadmap = useCallback(() => {
    setRoadmapOpen(true);
    window.location.href = '/roadmap';
  }, []);

  const handleQuiz = async () => {
    setQuizOpen(true);
    const startQuizGeneration = () => {
      setIsGenerating(true);
      toast.success('Generating your quiz...', {
        duration: 2000,
        position: 'bottom-center',
      });
      
      // Simulate processing time
      setTimeout(() => {
        window.location.href = '/test/quiz';
      }, 3000);
    };
  };

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
        if (roadmapOpen) {
          setRoadmapOpen(false);
        }
        if (quizOpen) {
          setQuizOpen(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, uploadOpen, roadmapOpen, quizOpen]);

  return (
    <motion.main
      className="flex-1 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
        <div className="w-full max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!searchOpen && !uploadOpen && !roadmapOpen && !quizOpen && (
              <motion.div
                key="header"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center mb-8"
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 tracking-tight text-gray-900 dark:text-white transition-colors duration-300">
                  We didn't reinvent learning. <br /> <span className="text-emerald-500">We made it effortless.</span>
                </h1>
                {/* <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                  Upload your content or browse our library. We'll transform it into lessons, guides, and quizzes — ready to learn, better than ever.
                </p> */}
              </motion.div>
            )}

            {(searchOpen || uploadOpen || roadmapOpen || quizOpen) && (
              <motion.h1
                key="dynamic-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center 
                         tracking-tight text-gray-900 dark:text-white transition-colors duration-300"
              >
                {searchOpen ? "Explore any topic and build quizzes from trusted sources." : uploadOpen ? "Upload Your Material" : roadmapOpen ? "Generate Your Roadmap" : "Instant Quiz"}
              </motion.h1>
            )}
          </AnimatePresence>

          <div className="w-full" ref={containerRef}>
            <div className={`w-full flex justify-center transition-all duration-500 ease-in-out ${
              searchOpen || uploadOpen || roadmapOpen || quizOpen ? 'scale-105' : 'scale-100'
            }`}>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                {!searchOpen && !roadmapOpen && !quizOpen && (
                  <motion.div className={`transition-all duration-500 ease-in-out ${
                    uploadOpen ? 'col-span-2' : 'col-span-1'
                  }`}>
                    {!uploadOpen ? (
                      <ActionButton
                        icon={<Upload className="w-4 h-4" />}
                        text="Transform Content"
                        subtext="Upload materials to convert"
                        onClick={() => setUploadOpen(true)}
                      />
                    ) : (
                      <div className="w-full">
                        <FileUpload onCancel={() => setUploadOpen(false)} />
                      </div>
                    )}
                  </motion.div>
                )}

                {!uploadOpen && !roadmapOpen && !quizOpen && (
                  <motion.div className={`transition-all duration-500 ease-in-out ${
                    searchOpen ? 'col-span-2' : 'col-span-1'
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
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
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
                          <button
                            disabled={!searchQuery}
                            onClick={handleSearch}
                            className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm 
                                     font-semibold transition-all duration-300 ${searchQuery
                                ? `${BUTTON_GRADIENT} text-white hover:shadow-lg`
                                : "bg-gray-400 text-white cursor-not-allowed"
                              }`}
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {!searchOpen && !uploadOpen && !roadmapOpen && (
                  <motion.div className={`transition-all duration-500 ease-in-out ${
                    quizOpen ? 'col-span-2' : 'col-span-1'
                  }`}>
                    {!quizOpen ? (
                      <ActionButton
                        icon={<Zap className="w-4 h-4" />}
                        text="Instant Quiz"
                        subtext="Quick assessment from content"
                        onClick={handleQuiz}
                      />
                    ) : (
                      <div className="w-full">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                          <FileUpload 
                            isQuizMode={true}
                            onCancel={() => setQuizOpen(false)}
                            onChange={(files) => {
                              if (files.length > 0) {
                                toast.success('Files uploaded successfully')
                              }
                              return Promise.resolve();
                            }}
                            onGenerateQuiz={() => {
                              setQuizOpen(false)
                              setIsGenerating(true)
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {!searchOpen && !uploadOpen && !quizOpen && (
                  <motion.div className={`transition-all duration-500 ease-in-out ${
                    roadmapOpen ? 'col-span-2' : 'col-span-1'
                  }`}>
                    {!roadmapOpen ? (
                      <ActionButton
                        icon={<Map className="w-4 h-4" />}
                        text="Generate Roadmap"
                        subtext="Create a learning path"
                        onClick={handleRoadmap}
                      />
                    ) : (
                      <div className="w-full">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                          <p className="text-gray-900 dark:text-gray-100 leading-relaxed">
                            Your personalized learning roadmap is being generated...
                          </p>
                          <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-emerald-500 rounded-full"
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                            />
                          </div>
                        </div>
                        <div className="flex justify-end mt-4">
                          <button
                            
onClick={() => setRoadmapOpen(false)}
                            className="px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm
                                     bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300
                                     hover:bg-gray-200 dark:hover:bg-gray-700
                                     transition-all duration-300"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            <AnimatePresence>
              {isGenerating && (
                <QuizLoader 
                  onComplete={() => {
                    setIsGenerating(false)
                    window.location.href = '/test/quiz'
                  }} 
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3"
                >
                  <div className="space-y-4">
                    {isSearching ? (
                      <motion.div
                        className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2 animate-pulse" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
                      </motion.div>
                    ) : (
                      results.map((result, index) => (
                        <motion.div
                          key={result.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
                        >
                          <p className="text-gray-900 dark:text-gray-100 leading-relaxed">
                            {result.content}
                          </p>
                          <div className="space-y-3 mt-4">
                            {result.sources.map((source, sourceIndex) => (
                              <motion.div
                                key={source.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: sourceIndex * 0.05 }}
                                className="flex items-start justify-between gap-4 bg-gray-100 dark:bg-gray-700 rounded-md p-2 transition-all duration-300 hover:shadow-md"
                              >
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-medium text-gray-900 dark:text-white">{source.title}</h3>
                                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{source.description}</p>
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    {source.citations.map((citation, i) => (
                                      <span key={i} className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/30 text-xs text-blue-700 dark:text-blue-300">
                                        {citation}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button
                                          onClick={() => source.preview && handlePreview(source.preview)}
                                          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                                        >
                                          <Eye className="w-4 h-4" />
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent>Preview source</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button
                                          onClick={() => handleAddSource(source.id)}
                                          disabled={addedSources.has(source.id)}
                                          className={`p-1.5 rounded-lg transition-colors duration-200 ${addedSources.has(source.id) ? 'text-green-500 cursor-not-allowed' : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                        >
                                          <Plus className="w-4 h-4" />
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent>{addedSources.has(source.id) ? 'Added to library' : 'Add to library'}</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <a
                                          href={source.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                                        >
                                          <ExternalLink className="w-4 h-4" />
                                        </a>
                                      </TooltipTrigger>
                                      <TooltipContent>View source</TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {previewContent && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Preview</h2>
                      <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{previewContent}</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {!searchOpen && !uploadOpen && !roadmapOpen && !quizOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="mt-8 text-center"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Browse popular topics:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['Machine Learning', 'Web Development', 'Data Science', 'UX Design', 'Cybersecurity'].map((topic, index) => (
                      <motion.button
                        key={topic}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                        className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                      >
                        {topic}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {!searchOpen && !uploadOpen && !roadmapOpen && !quizOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="mt-8 hidden lg:flex justify-center items-center gap-4 text-sm text-gray-600 dark:text-gray-400"
              >
                <div className="flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-xs font-mono">/</kbd>
                  <span>to search</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-xs font-mono">ESC</kbd>
                  <span>to close</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.main>
  );
}

const ActionButton = React.memo(({ icon, text, subtext, onClick }: ActionButtonProps) => {
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
});

ActionButton.displayName = 'ActionButton';

