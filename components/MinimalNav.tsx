'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  MessageSquare,
  Brain,
  BookOpen,
  File ,
  Settings,
  GraduationCap,
  ClipboardList,
  Home
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface NavItem {
  path: string
  icon: any
  label: string
  hub: 'learning' | 'test'
}

export function MinimalNav() {
  const router = useRouter()
  const pathname = usePathname()

  const navItems: NavItem[] = [
    { path: '/dashboard', icon: Home, label: 'Dashboard', hub: 'learning' },
    { path: '/learn/lessons', icon: BookOpen, label: 'Lessons', hub: 'learning' },
    { path: '/learn/flashcards', icon: Brain, label: 'Flashcards', hub: 'learning' },
    { path: '/learn/presentations', icon: File, label: 'Presentations', hub: 'learning' },
    { path: '/learn/chat', icon: MessageSquare, label: 'Chat', hub: 'learning' },
    { path: '/learn/preferences', icon: Settings, label: 'Preferences', hub: 'learning' },
    { path: '/test/quiz', icon: ClipboardList, label: 'Quiz', hub: 'test' },
  ]

  const isTestHub = pathname.startsWith('/test')
  const isLearningHub = pathname.startsWith('/learn')

  return (
    <div className="flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex  items-center">
          <div className="flex gap-2">
            <Button
              variant={isLearningHub ? "default" : "ghost"}
              className="gap-2"
              onClick={() => router.push('/learn')}
            >
              <GraduationCap className="h-4 w-4" />
              Learning Hub
            </Button>
            <Button
              variant={isTestHub ? "default" : "ghost"}
              className="gap-2"
              onClick={() => router.push('/test/quiz')}
            >
              <ClipboardList className="h-4 w-4" />
              Test Hub
            </Button>
          </div>
        </div>
      </header>

      <nav className="fixed left-0 top-14 h-full w-14 border-r bg-background/95 backdrop-blur">
        <div className="flex flex-col gap-2 p-2">
          <TooltipProvider delayDuration={100}>
            {navItems
              .filter(item => 
                (isTestHub && item.hub === 'test') || 
                (isLearningHub && item.hub === 'learning') ||
                item.path === '/dashboard'
              )
              .map((item) => (
                <Tooltip key={item.path}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={pathname === item.path ? "secondary" : "ghost"}
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => router.push(item.path)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="sr-only">{item.label}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="text-xs">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              ))}
          </TooltipProvider>
        </div>
      </nav>
    </div>
  );
}