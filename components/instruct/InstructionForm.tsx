import { useState } from "react"
import { BookOpen, Brain, FileText, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FormData {
  quizQuestions: number
  quizType: string
  difficulty: string
  includeResources: {
    lessons: boolean
    flashcards: boolean
    cheatsheet: boolean
  }
}

const initialFormData: FormData = {
  quizQuestions: 10,
  quizType: "mixed",
  difficulty: "intermediate",
  includeResources: {
    lessons: true,
    flashcards: true,
    cheatsheet: true
  }
}

export function InstructionsForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardContent className="p-6 space-y-8">
        {/* Quiz Configuration - Primary Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-emerald-100 dark:border-emerald-800">
            <Brain className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quiz Configuration</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Number of Questions
              </label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[formData.quizQuestions]}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, quizQuestions: value[0] }))}
                  min={5}
                  max={30}
                  step={5}
                  className="flex-1"
                />
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 min-w-[3ch]">
                  {formData.quizQuestions}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Question Types
              </label>
              <Select
                value={formData.quizType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, quizType: value }))}
              >
                <SelectTrigger className="w-full bg-white dark:bg-gray-800">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mixed">Mixed Format</SelectItem>
                  <SelectItem value="mcq">Multiple Choice Only</SelectItem>
                  <SelectItem value="written">Written Response Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Difficulty Level
              </label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value }))}
              >
                <SelectTrigger className="w-full bg-white dark:bg-gray-800">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Supporting Resources - Secondary Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-emerald-100 dark:border-emerald-800">
            <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Supporting Resources</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResourceOption
              icon={<BookOpen className="w-4 h-4" />}
              title="Study Guide"
              description="Detailed explanations and examples"
              checked={formData.includeResources.lessons}
              onChange={(checked) => setFormData(prev => ({
                ...prev,
                includeResources: { ...prev.includeResources, lessons: checked }
              }))}
            />
            
            <ResourceOption
              icon={<Brain className="w-4 h-4" />}
              title="Flashcards"
              description="Quick review cards"
              checked={formData.includeResources.flashcards}
              onChange={(checked) => setFormData(prev => ({
                ...prev,
                includeResources: { ...prev.includeResources, flashcards: checked }
              }))}
            />
            
            <ResourceOption
              icon={<FileText className="w-4 h-4" />}
              title="Cheatsheet"
              description="Key points summary"
              checked={formData.includeResources.cheatsheet}
              onChange={(checked) => setFormData(prev => ({
                ...prev,
                includeResources: { ...prev.includeResources, cheatsheet: checked }
              }))}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface ResourceOptionProps {
  icon: React.ReactNode
  title: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}

function ResourceOption({ icon, title, description, checked, onChange }: ResourceOptionProps) {
  return (
    <div
      className={`
        relative p-4 rounded-lg border transition-all duration-200 cursor-pointer
        ${checked 
          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20' 
          : 'border-gray-200 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-800'
        }
      `}
      onClick={() => onChange(!checked)}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={checked}
          onCheckedChange={onChange}
          className="mt-1 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
        />
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-emerald-600 dark:text-emerald-400">{icon}</span>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h3>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  )
}