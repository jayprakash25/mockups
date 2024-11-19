'use client'

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { History, BookOpen, Settings, GraduationCap, Trophy, ChevronRight } from 'lucide-react'

export default function AppSidebar() {
  const [activeCourses, setActiveCourses] = useState([
    { id: 1, name: "Machine Learning Basics", progress: 65 },
    { id: 2, name: "Web Development Fundamentals", progress: 40 },
  ])

  return (
    <aside className="flex h-screen w-72 flex-col justify-between border-r border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      {/* Profile Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12 ring-2 ring-offset-2 ring-emerald-500">
            <AvatarImage src="/avatar.png" alt="John Doe" />
            <AvatarFallback>JB</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">James Bond</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Student</p>
          </div>
        </div>

        {/* Learning Progress */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Learning Progress</h3>
          <div className="flex items-center justify-between">
            <Progress value={33} className="w-2/3" />
            <span className="text-sm font-medium">33%</span>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="space-y-6">
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Your Learning</h3>
            <div className="space-y-1">
              <NavButton icon={<GraduationCap size={18} />}>Generated Courses</NavButton>
              <NavButton icon={<History size={18} />}>Generation History</NavButton>
              <NavButton icon={<BookOpen size={18} />}>Learning Progress</NavButton>
              <NavButton icon={<Trophy size={18} />}>Achievements</NavButton>
            </div>
          </div>
        </nav>

        {/* Active Courses */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Courses</h3>
          {activeCourses.map((course) => (
            <div key={course.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{course.name}</span>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
              <Progress value={course.progress} className="h-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="space-y-1">
        <NavButton icon={<Settings size={18} />}>Settings</NavButton>
      </div>
    </aside>
  )
}

function NavButton({ children, icon, className, ...props }: React.ComponentProps<typeof Button> & { icon: React.ReactNode }) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100",
        className
      )}
      {...props}
    >
      {icon}
      <span className="ml-2">{children}</span>
    </Button>
  )
}