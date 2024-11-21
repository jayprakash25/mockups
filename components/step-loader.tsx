"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("w-6 h-6 ", className)}
    >
      <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
};

const CheckFilled = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-6 h-6 ", className)}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

type LoadingState = {
  text: string;
};

const LoaderCore = ({
  loadingStates,
  value = 0,
  interactive = false,
  onStepClick,
}: {
  loadingStates: LoadingState[];
  value?: number;
  interactive?: boolean;
  onStepClick?: (index: number) => void;
}) => {
  return (
    <div className="flex relative justify-start max-w-xl mx-auto flex-col py-6">
      {loadingStates.map((loadingState, index) => {
        const distance = Math.abs(index - value);
        const opacity = Math.max(1 - distance * 0.2, 0);

        return (
          <motion.div
            key={index}
            className={cn(
              "text-left flex gap-3 mb-2 px-4 py-2 rounded-lg",
              interactive && "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: opacity, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => interactive && onStepClick?.(index)}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/30 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: index <= value ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
              {index > value ? (
                <CheckIcon className="text-emerald-500 dark:text-emerald-400 relative z-10" />
              ) : (
                <CheckFilled
                  className={cn(
                    "text-emerald-500 dark:text-emerald-400 relative z-10",
                    value === index && "text-emerald-600 dark:text-emerald-500"
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "text-gray-600 dark:text-gray-300",
                value === index && "text-emerald-600 dark:text-emerald-500",
                interactive && "hover:text-emerald-600 dark:hover:text-emerald-400"
              )}
            >
              {loadingState.text}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

export const MultiStepLoader = ({
  loadingStates,
  loading,
  duration = 2000,
  loop = true,
  value,
  interactive = false,
  onStepClick,
}: {
  loadingStates: LoadingState[];
  loading?: boolean;
  duration?: number;
  loop?: boolean;
  value?: number;
  interactive?: boolean;
  onStepClick?: (index: number) => void;
}) => {
  const [currentState, setCurrentState] = useState(value || 0);

  useEffect(() => {
    if (!loading) {
      setCurrentState(0);
      return;
    }
    const timeout = setTimeout(() => {
      setCurrentState((prevState) =>
        loop
          ? prevState === loadingStates.length - 1
            ? 0
            : prevState + 1
          : Math.min(prevState + 1, loadingStates.length - 1)
      );
    }, duration);

    return () => clearTimeout(timeout);
  }, [currentState, loading, loop, loadingStates.length, duration]);
  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="w-full h-full fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-2xl bg-white/80 dark:bg-gray-900/80"
        >
          <div className="h-96 relative">
            <LoaderCore value={currentState} loadingStates={loadingStates} interactive={interactive} onStepClick={onStepClick} />
          </div>

          <div className="bg-gradient-to-t inset-x-0 z-20 bottom-0 bg-white dark:bg-gray-900 h-full absolute [mask-image:radial-gradient(900px_at_center,transparent_30%,white)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
