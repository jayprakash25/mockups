'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { MessageSquare, Brain, BookOpen, IdCard, SearchIcon, Menu } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface MinimalNavProps {
  collapsed?: boolean
  setCollapsed?: (collapsed: boolean) => void
  showSidebarToggle?: boolean
  brandName?: string
}

export function MinimalNav({ 
  collapsed, 
  setCollapsed, 
  showSidebarToggle,
  brandName 
}: MinimalNavProps) {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { path: '/search', icon: SearchIcon, label: 'Search' },
    { path: '/chat', icon: MessageSquare, label: 'Chat' },
    { path: '/quiz', icon: Brain, label: 'Quiz' },
    { path: '/lessons', icon: BookOpen, label: 'Lessons' },
    { path: '/flashcards', icon: IdCard, label: 'Flashcards' },
  ]

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-2">
        <div className="flex items-center gap-3">
          {showSidebarToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed?.(!collapsed)}
              className="h-8 w-8"
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}
          {(!collapsed && brandName) && (
            <span className="text-xl font-semibold bg-gradient-to-br from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              {brandName}
            </span>
          )}
        </div>

        <nav className="flex gap-1.5">
          <TooltipProvider delayDuration={100}>
            {navItems.map((item) => {
              const isActive = pathname === item.path
              return (
                <Tooltip key={item.path}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-8 w-8 ${
                        isActive ? 'bg-muted text-primary' : 'hover:bg-muted/50'
                      }`}
                      onClick={() => router.push(item.path)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="sr-only">{item.label}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="bottom" 
                    className="text-xs font-medium"
                    sideOffset={6}
                  >
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </TooltipProvider>
        </nav>
      </div>
    </header>
  )
} 