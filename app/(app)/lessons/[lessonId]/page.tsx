'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send } from 'lucide-react'

export default function LessonPage() {
  const [question, setQuestion] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSubmit = () => {
    if (!question.trim()) return
    // Handle question submission
    setQuestion('')
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* AI Assistant Section */}
        <div className="mb-16 space-y-4">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-gray-600 dark:text-gray-400"
          >
            Ask genie about anything in this lesson
          </motion.p>
          
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value)
                setIsTyping(true)
              }}
              onBlur={() => setIsTyping(false)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="What would you like to know about this lesson?"
              className="w-full px-4 py-3 rounded-full
                       bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg
                       border border-gray-200 focus:outline-none dark:border-gray-700
                       focus:ring-2 focus:ring-emerald-500/20 dark:focus:ring-emerald-500/10
                       focus:border-emerald-500/20 dark:focus:border-emerald-500/10
                       text-gray-900 dark:text-gray-100
                       placeholder:text-gray-500 dark:placeholder:text-gray-400
                       shadow-sm hover:shadow-md transition-all duration-300"
            />
            
            <button
              onClick={handleSubmit}
              className="absolute right-3 top-1/2 -translate-y-1/2
                       text-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400
                       transition-colors duration-200"
            >
              <Send className="w-5 h-5" />
            </button>

            {/* Decorative Elements */}
            <motion.div
              className="absolute -left-3 -top-3 w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
              animate={{
                scale: isTyping ? [1, 1.2, 1] : 1,
                opacity: isTyping ? 1 : 0.5,
              }}
              transition={{ duration: 1, repeat: isTyping ? Infinity : 0 }}
            />
            <motion.div
              className="absolute -right-3 -bottom-3 w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600"
              animate={{
                scale: isTyping ? [1, 1.2, 1] : 1,
                opacity: isTyping ? 1 : 0.5,
              }}
              transition={{ duration: 1, repeat: isTyping ? Infinity : 0, delay: 0.5 }}
            />
          </div>
        </div>

        {/* Lesson Content */}
        <article className="prose dark:prose-invert max-w-none">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent mb-4"
          >
            The Rise and Fall of Adolf Hitler (1889-1945)
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl shadow-sm"
          >
            Adolf Hitler's rise to power marked one of the darkest chapters in human history, leading to World War II and the Holocaust. Understanding this period is crucial for preventing similar atrocities in the future and recognizing the warning signs of totalitarianism and extremism.
          </motion.p>

          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Early Life and Entry into Politics
          </motion.h2>

          <ul className="space-y-4">
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-4 rounded-lg shadow-sm"
            >
              Born in Austria in 1889, Hitler moved to Germany in 1913. After serving in World War I, he joined the German Workers' Party (later renamed the Nazi Party) in 1919, quickly rising to become its leader.
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-4 rounded-lg shadow-sm"
            >
              The failed Beer Hall Putsch of 1923 led to his imprisonment, during which he wrote "Mein Kampf," outlining his political ideology and future plans for Germany.
            </motion.li>
          </ul>

          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4"
          >
            Rise to Power
          </motion.h2>

          <ul className="space-y-4">
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-4 rounded-lg shadow-sm"
            >
              The Great Depression of 1929 created conditions that Hitler exploited. He promised economic recovery and national restoration, gaining popular support through powerful speeches and propaganda.
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-4 rounded-lg shadow-sm"
            >
              In 1933, Hitler was appointed Chancellor of Germany. Through the Enabling Act, he quickly transformed the Weimar Republic into a dictatorship, establishing the Third Reich.
            </motion.li>
          </ul>

          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4"
          >
            World War II and the Holocaust
          </motion.h2>

          <ul className="space-y-4">
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
              className="text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-4 rounded-lg shadow-sm"
            >
              Hitler's aggressive expansion policies led to the invasion of Poland in 1939, triggering World War II. His regime systematically persecuted and murdered millions in the Holocaust, particularly targeting Jewish people.
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-4 rounded-lg shadow-sm"
            >
              As Allied forces closed in on Berlin in 1945, Hitler committed suicide in his bunker. The war in Europe ended shortly after, leaving a devastated continent and lessons that continue to resonate today.
            </motion.li>
          </ul>

          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4"
          >
            Historical Impact
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="text-gray-600 dark:text-gray-300 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl shadow-sm"
          >
            The aftermath of Hitler's regime led to significant changes in international law, human rights policies, and global politics. The United Nations was established, and the world adopted the Universal Declaration of Human Rights to prevent future atrocities.
          </motion.p>
        </article>
      </div>
    </main>
  )
}
