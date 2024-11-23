'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { SidebarProps } from '@/types/sidebar'
import { Menu, Settings, User, Book, MessageSquare, File, Brain, ChevronRight, Home, ClipboardList, FileText, GraduationCap, History, BarChart, PlusCircle } from 'lucide-react'

export function Sidebar({
  brand,
  user,
  onNavigate,
  onProfileClick,
  onSettingsClick,
  className,
  defaultCollapsed = false,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const [isMobile, setIsMobile] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>(null)
  const pathname = usePathname()

  const isTestHub = pathname.startsWith('/test')
  const isLearningHub = pathname.startsWith('/learn')
  const isDashboard = pathname === '/dashboard'

  // Learning Hub Content
  const learningItems = [
    {
      path: '/learn/lessons',
      icon: Book,
      label: 'Lessons',
      subitems: [
        {
          category: "Fundamentals",
          items: [
            { path: '/learn/lessons/intro', label: 'Introduction to ML' },
            { path: '/learn/lessons/python', label: 'Python Basics' },
            { path: '/learn/lessons/data', label: 'Data Processing' }
          ]
        },
        {
          category: "Advanced Topics",
          items: [
            { path: '/learn/lessons/neural', label: 'Neural Networks' },
            { path: '/learn/lessons/deep', label: 'Deep Learning' },
            { path: '/learn/lessons/nlp', label: 'Natural Language Processing' }
          ]
        }
      ]
    },
    { path: '/learn/flashcards', icon: Brain, label: 'Flashcards' },
    { path: '/learn/presentation', icon: File, label: 'Presentations' },
    { path: '/learn/cheatsheet', icon: FileText, label: 'Cheatsheet' },
    { path: '/learn/chat', icon: MessageSquare, label: 'Chat' },
  ]

  // Test Hub Content
  const testItems = [
    { path: '/test/quiz', icon: ClipboardList, label: 'Take Quiz' },
    { path: '/test/history', icon: History, label: 'Quiz History' },
    { path: '/test/report', icon: BarChart, label: 'Performance' },
  ]

  const getCurrentHubItems = () => {
    if (isTestHub) return testItems
    if (isLearningHub) return learningItems
    return []
  }

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
      if (window.innerWidth <= 768) {
        setCollapsed(true)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleNavigate = (path: string) => {
    onNavigate?.(path)
    if (isMobile) setCollapsed(true)
  }

  const renderNavItem = (item: any) => {
    const isActive = pathname.startsWith(item.path)
    const isOpen = openSection === item.path

    if (item.subitems) {
      return (
        <div key={item.path} className="space-y-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-between',
                  collapsed && 'justify-center',
                  isActive && 'bg-primary/10'
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  {!collapsed && <span>{item.label}</span>}
                </div>
                {!collapsed && <ChevronRight className="h-4 w-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align={collapsed ? 'right' : 'left'}
              className="w-64"
            >
              {item.subitems.map((category: any, idx: number) => (
                <div key={idx}>
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    {category.category}
                  </DropdownMenuLabel>
                  {category.items.map((subitem: any) => (
                    <DropdownMenuItem
                      key={subitem.path}
                      onClick={() => handleNavigate(subitem.path)}
                    >
                      {subitem.label}
                    </DropdownMenuItem>
                  ))}
                  {idx < item.subitems.length - 1 && <DropdownMenuSeparator />}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }

    return (
      <TooltipProvider key={item.path}>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start gap-3',
                collapsed && 'justify-center',
                pathname === item.path && 'bg-primary/10'
              )}
              onClick={() => handleNavigate(item.path)}
            >
              <item.icon className="h-4 w-4" />
              {!collapsed && <span>{item.label}</span>}
            </Button>
          </TooltipTrigger>
          {collapsed && (
            <TooltipContent side="right">
              {item.label}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <div className="flex min-h-screen">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'fixed top-2 left-2 h-12 w-12 z-50 lg:hidden bg-background',
          !collapsed && 'hidden'
        )}
        onClick={() => setCollapsed(false)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile Overlay */}
      {!collapsed && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 flex h-screen flex-col border-r bg-gradient-to-b from-background to-background/95 backdrop-blur transition-all duration-300 ease-in-out z-40',
          collapsed ? 'w-16' : 'w-64',
          isMobile && collapsed ? '-translate-x-full' : 'translate-x-0',
          className
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4">
          {!collapsed && (
            <span className="text-xl font-semibold bg-gradient-to-br from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              {isTestHub ? 'Test Hub' : isLearningHub ? 'Learning Hub' : 'Dashboard'}
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 lg:flex hidden"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        <Separator />

        {/* Hub Switcher */}
        {(isTestHub || isLearningHub || isDashboard) && (
          <div className="p-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-between',
                    collapsed && 'justify-center'
                  )}
                >
                  <div className="flex items-center gap-2">
                    {isTestHub ? (
                      <ClipboardList className="h-4 w-4" />
                    ) : isLearningHub ? (
                      <GraduationCap className="h-4 w-4" />
                    ) : (
                      <Home className="h-4 w-4" />
                    )}
                    {!collapsed && <span>{isTestHub ? 'Test Hub' : isLearningHub ? 'Learning Hub' : 'Dashboard'}</span>}
                  </div>
                  {!collapsed && <ChevronRight className="h-4 w-4" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => handleNavigate('/learn')}>
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Learning Hub
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigate('/test/quiz')}>
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Test Hub
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNavigate('/dashboard')}>
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Navigation Items */}
        <div className="flex-1 flex flex-col justify-between py-4 overflow-y-auto">
          <nav className="space-y-2 px-2">
            {getCurrentHubItems().map(renderNavItem)}
            {pathname !== '/search' && (
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        'w-full justify-start gap-3',
                        collapsed && 'justify-center'
                      )}
                      onClick={() => handleNavigate('/search')}
                    >
                      <PlusCircle className="h-4 w-4" />
                      {!collapsed && <span>Add New</span>}
                    </Button>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      Add New
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            )}
          </nav>

          {/* Profile Section */}
          <div className="px-2 mt-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start gap-3',
                    collapsed && 'justify-center'
                  )}
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user?.avatarUrl} />
                    <AvatarFallback>{user?.avatarFallback}</AvatarFallback>
                  </Avatar>
                  {!collapsed && (
                    <div className="flex flex-col items-start text-sm">
                      <span className="font-medium">{user?.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {user?.email}
                      </span>
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onProfileClick}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onSettingsClick}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      <main className={cn(
        'flex-1 transition-all duration-300 ease-in-out',
        collapsed ? 'lg:ml-16' : 'lg:ml-64',
        isMobile && 'ml-0'
      )}>
        {/* Main content */}
      </main>
    </div>
  )
}

