'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, BookOpen, WalletCardsIcon as Cards, FileText, MessageCircle, Save, X, Plus, Minus } from 'lucide-react'

import { Toaster, toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AIAssistantDock } from '@/components/instruct/AIAssistantDock'
import { BUTTON_GRADIENT } from '@/lib/constants'
import { MultiStepLoader } from '@/components/step-loader'

export default function InstructionsPage() {
  const [formData, setFormData] = useState({
    quizTitle: '',
    quizLength: 5,
    quizType: 'multiple-choice',
    difficultyLevel: 'medium',
    timeLimit: 0,
    generateLessons: true,
    generateFlashcards: true,
    generateCheatsheets: true,
    enableChatSupport: false,
    lessonInstructions: '',
    flashcardInstructions: '',
    cheatsheetInstructions: '',
    chatInstructions: '',
    instructions: ''
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsAIAssistantOpen(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const handleSubmit = () => {
    console.log('Generating content with:', formData)
  }

  const handleAIUpdate = (newText: string, shouldReplace: boolean = false) => {
    setFormData(prev => ({
      ...prev,
      instructions: shouldReplace ? newText : `${prev.instructions}\n${newText}`.trim()
    }))
  }

  const handleGenerate = () => {
    if (isGenerating) return
    setIsGenerating(true)
    handleSubmit()

    setTimeout(() => {
      window.location.href = '/dashboard'
    }, 6000)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNumberChange = (field: keyof typeof formData, increment: boolean) => {
    setFormData(prev => {
      const currentValue = typeof prev[field] === 'number' ? prev[field] : 0
      const step = field === 'quizLength' ? 5 : 1
      const newValue = increment ? currentValue + step : Math.max(0, currentValue - step)
      return { ...prev, [field]: newValue }
    })
  }

  return (
    <main className="min-h-screen ">
      <Toaster position="top-center" />
 
      <div className="min-h-screen p-4 sm:p-6 md:p-8 flex flex-col items-center justify-start">
        <div className="w-full max-w-2xl">
          <header className="text-center mb-8">
         
            <p className="text-lg text-emerald-600 dark:text-emerald-400">
              Set up your quiz and choose the resources to make learning engaging and efficient.
            </p>
          </header>

          <Card className="w-full shadow-lg">
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger 
                    value="basic"
                    className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800 dark:data-[state=active]:bg-emerald-800 dark:data-[state=active]:text-emerald-100"
                  >
                    Quick Setup
                  </TabsTrigger>
                  <TabsTrigger 
                    value="advanced"
                    className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800 dark:data-[state=active]:bg-emerald-800 dark:data-[state=active]:text-emerald-100"
                  >
                    Deep Customization
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic">
                  <div className="space-y-6">
                    <section>
                      <h2 className="text-xl font-semibold mb-4 text-emerald-700 dark:text-emerald-300">Quiz Setup</h2>
                      <div className="space-y-4">
                        <Input
                          placeholder="Name your quiz"
                          value={formData.quizTitle}
                          onChange={(e) => handleInputChange('quizTitle', e.target.value)}
                        />
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">Number of Questions:</label>
                          <NumberInput
                            value={formData.quizLength}
                            onIncrement={() => handleNumberChange('quizLength', true)}
                            onDecrement={() => handleNumberChange('quizLength', false)}
                          />
                        </div>
                        <Select
                          value={formData.quizType}
                          onValueChange={(value) => handleInputChange('quizType', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select quiz type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                            <SelectItem value="true-false">True/False</SelectItem>
                            <SelectItem value="short-answer">Short Answer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-4 text-emerald-700 dark:text-emerald-300">Resource Selection</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ResourceCard
                          icon={<BookOpen className="w-6 h-6" />}
                          title="Generate Lessons"
                          description="Create comprehensive lessons to guide learners through the topic."
                          checked={formData.generateLessons}
                          onChange={() => handleInputChange('generateLessons', !formData.generateLessons)}
                        />
                        <ResourceCard
                          icon={<Cards className="w-6 h-6" />}
                          title="Generate Flashcards"
                          description="Produce flashcards for quick review and memorization of key concepts."
                          checked={formData.generateFlashcards}
                          onChange={() => handleInputChange('generateFlashcards', !formData.generateFlashcards)}
                        />
                        <ResourceCard
                          icon={<FileText className="w-6 h-6" />}
                          title="Generate Cheatsheets"
                          description="Create concise cheatsheets summarizing important information."
                          checked={formData.generateCheatsheets}
                          onChange={() => handleInputChange('generateCheatsheets', !formData.generateCheatsheets)}
                        />
                        <ResourceCard
                          icon={<MessageCircle className="w-6 h-6" />}
                          title="Enable Chat Support"
                          description="Provide AI-powered chat support for answering questions and clarifications."
                          checked={formData.enableChatSupport}
                          onChange={() => handleInputChange('enableChatSupport', !formData.enableChatSupport)}
                        />
                      </div>
                    </section>
                  </div>
                </TabsContent>

                <TabsContent value="advanced">
                  <div className="space-y-6">
                    <section>
                      <h2 className="text-xl font-semibold mb-4 text-emerald-700 dark:text-emerald-300">Advanced Quiz Setup</h2>
                      <div className="space-y-4">
                        <Select
                          value={formData.difficultyLevel}
                          onValueChange={(value) => handleInputChange('difficultyLevel', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">Time Limit (minutes):</label>
                          <NumberInput
                            value={formData.timeLimit}
                            onIncrement={() => handleNumberChange('timeLimit', true)}
                            onDecrement={() => handleNumberChange('timeLimit', false)}
                          />
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-4 text-emerald-700 dark:text-emerald-300">Resource Customization</h2>
                      <div className="space-y-4">
                        <ExpandableSection title="Lessons Configuration">
                          <Textarea
                            placeholder="Enter specific instructions for lesson generation..."
                            value={formData.lessonInstructions}
                            onChange={(e) => handleInputChange('lessonInstructions', e.target.value)}
                          />
                        </ExpandableSection>
                        <ExpandableSection title="Flashcards Configuration">
                          <Textarea
                            placeholder="Enter specific instructions for flashcard generation..."
                            value={formData.flashcardInstructions}
                            onChange={(e) => handleInputChange('flashcardInstructions', e.target.value)}
                          />
                        </ExpandableSection>
                        <ExpandableSection title="Cheatsheet Configuration">
                          <Textarea
                            placeholder="Enter specific instructions for cheatsheet generation..."
                            value={formData.cheatsheetInstructions}
                            onChange={(e) => handleInputChange('cheatsheetInstructions', e.target.value)}
                          />
                        </ExpandableSection>
                        <ExpandableSection title="Chat Configuration">
                          <Textarea
                            placeholder="Enter specific instructions for chat support..."
                            value={formData.chatInstructions}
                            onChange={(e) => handleInputChange('chatInstructions', e.target.value)}
                          />
                        </ExpandableSection>
                      </div>
                    </section>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <footer className="mt-8 flex justify-between items-center">
            <Button variant="outline" onClick={() => console.log('Cancelled')}>
              Cancel
            </Button>
            <Button
              className={`${BUTTON_GRADIENT} text-white`}
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              <Save className="w-4 h-4 mr-2" />
              Save and Generate
            </Button>
          </footer>

          <MultiStepLoader
            loadingStates={[
              { text: 'Analyzing your requirements...' },
              { text: 'Crafting personalized lessons...' },
              { text: 'Generating interactive quizzes...' },
              { text: 'Creating study flashcards...' },
              { text: 'Finalizing your learning experience...' }
            ]}
            loading={isGenerating}
            duration={1500}
            loop={false}
          />
        </div>
      </div>
      <AIAssistantDock 
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        onUpdateInstructions={handleAIUpdate}
      />
    </main>
  )
}

interface ResourceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}

function ResourceCard({ icon, title, description, checked, onChange }: ResourceCardProps) {
  return (
    <Card className="flex items-center p-4 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors" onClick={onChange}>
      <div className="mr-3 flex-shrink-0">{icon}</div>
      <div className="flex-grow mr-4">
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
      </div>
      <Checkbox checked={checked} onCheckedChange={onChange} className="flex-shrink-0" />
    </Card>
  )
}

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
}

function ExpandableSection({ title, children }: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        className="w-full p-4 text-left font-medium flex justify-between items-center bg-emerald-50 dark:bg-emerald-900/20"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {title}
        {isExpanded ? <X className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
      </button>
      {isExpanded && (
        <div className="p-4">
          {children}
        </div>
      )}
    </div>
  )
}

interface NumberInputProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

function NumberInput({ value, onIncrement, onDecrement }: NumberInputProps) {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={onDecrement}
        className="h-8 w-8 rounded-full"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-12 text-center">{value}</span>
      <Button
        variant="outline"
        size="icon"
        onClick={onIncrement}
        className="h-8 w-8 rounded-full"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}

