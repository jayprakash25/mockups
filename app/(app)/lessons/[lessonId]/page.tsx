'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { MultiStepLoader } from '@/components/step-loader'
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input'
import { cn } from "@/lib/utils"
import { motion } from 'framer-motion';

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.lessonId as string;
  const [isLoading, setIsLoading] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const lessons = [
    { id: '1', title: "Hitler's Rise to Power" },
    { id: '2', title: "The Holocaust" },
    { id: '3', title: "World War II" },
    { id: '4', title: "The United Nations" },
    { id: '5', title: "Nazi Propaganda" },
    { id: '6', title: "The Nuremberg Trials" },
    { id: '7', title: "Post-War Germany" },
    { id: '8', title: "Modern Germany and the European Union" },
  ];
  
  const lesson = lessons.find(l => l.id === lessonId);
  const currentLessonIndex = lessons.findIndex(l => l.id === lessonId);

  const handleQuestionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  const navigateToLesson = (direction: 'prev' | 'next') => {
    const nextIndex = direction === 'next' ? currentLessonIndex + 1 : currentLessonIndex - 1;
    
    if (nextIndex >= 0 && nextIndex < lessons.length) {
      router.push(`/lessons/${lessons[nextIndex].id}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <ProgressIndicator progress={scrollProgress} />
      
      {/* Navigation Step Loader */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 overflow-x-auto">
        <div className="max-w-6xl mx-auto px-4">
          <MultiStepLoader
            loadingStates={lessons.map(l => ({ text: l.title }))}
            loading={false}
            value={currentLessonIndex}
            duration={1000}
            loop={false}
            interactive={true}
            onStepClick={(index) => {
              window.location.href = `/lessons/${lessons[index].id}`;
            }}
          />
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* AI Input Section */}
        <div className="mb-16">
          <PlaceholdersAndVanishInput
            placeholders={[
              "Ask about the historical context...",
              "What would you like to understand better?",
              "Ask for clarification on any topic...",
              "Explore related historical events..."
            ]}
            onChange={(e) => {}}
            onSubmit={handleQuestionSubmit}
          />
        </div>

        {/* Lesson Content Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-4 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent mb-6">
              {lesson?.title}
            </h1>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Adolf Hitler&apos;s rise to power marked one of the darkest chapters in human history, leading to World War II and the Holocaust. Understanding this period is crucial for preventing similar atrocities in the future and recognizing the warning signs of totalitarianism and extremism.
              </p>

              <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Early Life and Entry into Politics
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>Born in Austria in 1889, Hitler moved to Germany in 1913. After serving in World War I, he joined the German Workers&apos; Party (later renamed the Nazi Party) in 1919, quickly rising to become its leader.</p>
                  <p>The failed Beer Hall Putsch of 1923 led to his imprisonment, during which he wrote &quot;Mein Kampf,&quot; outlining his political ideology and future plans for Germany.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Rise to Power
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>The Great Depression of 1929 created conditions that Hitler exploited. He promised economic recovery and national restoration, gaining popular support through powerful speeches and propaganda.</p>
                  <p>In 1933, Hitler was appointed Chancellor of Germany. Through the Enabling Act, he quickly transformed the Weimar Republic into a dictatorship, establishing the Third Reich.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  World War II and the Holocaust
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>Hitlers aggressive expansion policies led to the invasion of Poland in 1939, triggering World War II. His regime systematically persecuted and murdered millions in the Holocaust, particularly targeting Jewish people.</p>
                  <p>As Allied forces closed in on Berlin in 1945, Hitler committed suicide in his bunker. The war in Europe ended shortly after, leaving a devastated continent and lessons that continue to resonate today.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Historical Impact
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>The aftermath of Hitlers regime led to significant changes in international law, human rights policies, and global politics. The United Nations was established, and the world adopted the Universal Declaration of Human Rights to prevent future atrocities.</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Improved Navigation UI */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-4 z-50">
        <NavigationButton
          direction="prev"
          disabled={currentLessonIndex === 0}
          onClick={() => navigateToLesson('prev')}
          lesson={currentLessonIndex > 0 ? lessons[currentLessonIndex - 1] : null}
        />

        <div className="px-3 py-2 hidden md:flex rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700">
          <span className="text-xs  sm:text-sm font-medium text-gray-500 dark:text-gray-400">
            Lesson {currentLessonIndex + 1} of {lessons.length}
          </span>
        </div>

        <NavigationButton
          direction="next"
          disabled={currentLessonIndex === lessons.length - 1}
          onClick={() => navigateToLesson('next')}
          lesson={currentLessonIndex < lessons.length - 1 ? lessons[currentLessonIndex + 1] : null}
        />
      </div>

      {/* Keyboard Navigation */}
      {/* <KeyboardNavigation
        onPrev={() => !isLoading && currentLessonIndex > 0 && navigateToLesson('prev')}
        onNext={() => !isLoading && currentLessonIndex < lessons.length - 1 && navigateToLesson('next')}
      /> */}
    </div>
  )
}

// Improved Navigation Button Component
interface NavigationButtonProps {
  direction: 'prev' | 'next';
  disabled: boolean;
  onClick: () => void;
  lesson: { title: string } | null;
}

const NavigationButton = ({ direction, disabled, onClick, lesson }: NavigationButtonProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative group">
      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={cn(
          "relative px-3 sm:px-4 py-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg",
          "border border-gray-200 dark:border-gray-700 transition-all duration-200",
          disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
        )}
      >
        <span className="flex items-center gap-2">
          <ArrowIcon 
            className={cn(
              "w-4 h-4 sm:w-5 sm:h-5",
              direction === 'prev' && "rotate-180"
            )} 
          />
        </span>
      </motion.button>

      {/* Improved Tooltip */}
      {lesson && showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className={cn(
            "absolute bottom-full mb-2 px-3 py-2 rounded-lg bg-white/95 dark:bg-gray-800/95",
            "backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700",
            "text-sm whitespace-nowrap",
            direction === 'prev' ? "left-0" : "right-0"
          )}
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs hidden md:flex text-gray-500 dark:text-gray-400">
              {direction === 'prev' ? 'Previous' : 'Next'} Lesson
            </span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {lesson.title}
            </span>
          </div>
          {/* Tooltip Arrow */}
          <div className="absolute bottom-0 translate-y-full w-full left-0 flex justify-center">
            <div className="w-2 h-2 bg-white dark:bg-gray-800 rotate-45 -translate-y-1 border-b border-r border-gray-200 dark:border-gray-700" />
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Improved Arrow Icon
const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
      clipRule="evenodd"
    />
  </svg>
);

// Improved Keyboard Navigation with visual feedback
const KeyboardNavigation = ({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) => {
  

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        onPrev();
     
      }
      if (e.key === 'ArrowRight') {
        onNext();
      
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPrev, onNext]);


};

// Add a progress indicator component
const ProgressIndicator = ({ progress }: { progress: number }) => (
  <motion.div
    className="fixed top-0 left-0 h-1 bg-emerald-500"
    style={{ width: `${progress}%` }}
    initial={{ width: 0 }}
    animate={{ width: `${progress}%` }}
    transition={{ duration: 0.5 }}
  />
);

