'use client'

import { cn } from "@/lib/utils"
import React, { useRef, useState } from "react"
import { motion } from "framer-motion"
import { IconUpload } from "@tabler/icons-react"
import { useDropzone } from "react-dropzone"
import Link from "next/link"

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
}

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
}

export const FileUpload = ({
  onChange,
  onCancel,
  isQuizMode = false,
  onGenerateQuiz,
}: {
  onChange?: (files: File[]) => Promise<void>
  onCancel?: () => void
  isQuizMode?: boolean
  onGenerateQuiz?: () => void
}) => {
  const [files, setFiles] = useState<File[]>([])
  const [ctaEnabled, setCtaEnabled] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (newFiles: File[]) => {
    const updatedFiles = [...files, ...newFiles]
    setFiles(updatedFiles)
    setCtaEnabled(updatedFiles.length > 0)
    onChange && onChange(updatedFiles)
  }

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, idx) => idx !== index)
    setFiles(updatedFiles)
    setCtaEnabled(updatedFiles.length > 0)
    onChange && onChange(updatedFiles)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const { getRootProps, isDragActive } = useDropzone({
    multiple: true,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error)
    },
  })

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-4 sm:p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          multiple
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
            {files.length > 0 ? 'Add more files' : 'Upload files'}
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-sm sm:text-base mt-2 text-center">
            {files.length > 0 
              ? 'Drag more files here or click to upload'
              : isQuizMode
                ? "Upload your study materials and we'll create an instant quiz."
                : 'Add your files and let us create personalized quizzes and resources.'
            }
          </p>
        </div>
        <div className="relative w-full mt-6 sm:mt-10 max-w-xl mx-auto">
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 flex justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-neutral-900 p-2 rounded-full shadow-sm cursor-pointer"
                onClick={handleClick}
              >
                <IconUpload className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
              </motion.div>
            </motion.div>
          )}
          
          {files.length > 0 &&
            files.map((file, idx) => (
              <motion.div
                key={"file" + idx}
                layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                className={cn(
                  "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start p-3 sm:p-4 mt-4 w-full mx-auto rounded-md",
                  "shadow-sm"
                )}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveFile(idx)
                  }}
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-neutral-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div className="flex justify-between w-full items-center gap-2 sm:gap-4 pr-8">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                    className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 truncate max-w-[12rem] sm:max-w-xs"
                  >
                    {file.name}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                    className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-xs sm:text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                  >
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </motion.p>
                </div>

                <div className="flex text-xs sm:text-sm flex-col sm:flex-row items-start sm:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                    className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 mb-1 sm:mb-0"
                  >
                    {file.type}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                  >
                    modified {new Date(file.lastModified).toLocaleDateString()}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          {!files.length && (
            <motion.div
              layoutId="file-upload"
              variants={mainVariant}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className={cn(
                "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-24 sm:h-32 mt-4 w-full max-w-[6rem] sm:max-w-[8rem] mx-auto rounded-md",
                "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
              )}
            >
              {isDragActive ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-neutral-600 flex flex-col items-center text-sm sm:text-base"
                >
                  Drop it
                  <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                </motion.p>
              ) : (
                <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
              )}
            </motion.div>
          )}

          {!files.length && (
            <motion.div
              variants={secondaryVariant}
              className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-24 sm:h-32 mt-4 w-full max-w-[6rem] sm:max-w-[8rem] mx-auto rounded-md"
            ></motion.div>
          )}
        </div>
      </motion.div>
      <div className="flex flex-col gap-3 mt-6">
        {isQuizMode ? (
          <button
            disabled={!ctaEnabled}
            onClick={() => {
              if (onGenerateQuiz) {
                onGenerateQuiz();
              }
            }}
            className={`w-full px-4 py-2 rounded-xl text-sm font-semibold
              transition-all duration-300 ${
              ctaEnabled
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            Generate Quiz
          </button>
        ) : (
          <Link href="/instruct">
            <button
              disabled={!ctaEnabled}
              className={`w-full px-4 py-2 rounded-xl text-sm font-semibold
                transition-all duration-300 ${
                ctaEnabled
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </Link>
        )}
        <button 
          onClick={onCancel}
          className="w-full px-4 py-2 rounded-xl text-sm
            bg-gray-100 dark:bg-gray-800 
            text-gray-700 dark:text-gray-300
            hover:bg-gray-200 dark:hover:bg-gray-700
            transition-all duration-300 ease-in-out"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export function GridPattern() {
  const columns = 41
  const rows = 11
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col
          return (
            <div
              key={`${col}-${row}`}
              className={`w-8 sm:w-10 h-8 sm:h-10 flex flex-shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-neutral-950"
                  : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          )
        })
      )}
    </div>
  )
}