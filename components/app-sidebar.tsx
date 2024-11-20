'use client'

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Clock,
  FileText,
  History,
  Menu,
  Plus,
  Search,
  Settings,
  User,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

// Mock history data - in real app, this would come from your backend
const recentGenerations = [
  {
    id: 1,
    title: 'React Fundamentals',
    type: 'quiz',
    date: '2h ago',
  },
  {
    id: 2,
    title: 'JavaScript Basics',
    type: 'flashcards',
    date: '5h ago',
  },
  {
    id: 3,
    title: 'TypeScript Guide',
    type: 'lesson',
    date: '1d ago',
  },
];

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activePath, setActivePath] = useState('/');
  const [historyOpen, setHistoryOpen] = useState(true);

  // Add responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      // Auto-collapse on mobile
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quiz':
        return FileText;
      case 'flashcards':
        return BookOpen;
      default:
        return FileText;
    }
  };

  return (
    <>
      {/* Mobile Toggle Button (FAB) */}
      <Button
        variant="default"
        size="icon"
        className={cn(
          'fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg z-50',
          'lg:hidden', // Only show on mobile
          !collapsed && 'hidden' // Hide when sidebar is open
        )}
        onClick={() => setCollapsed(false)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Overlay for mobile when sidebar is open */}
      {!collapsed && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}
      
      <aside
        className={cn(
          'fixed lg:relative flex h-screen flex-col border-r bg-background transition-all duration-300 z-40',
          collapsed ? 'w-0 lg:w-16 -translate-x-full lg:translate-x-0' : 'w-72',
          'overflow-hidden' // Prevent content flash during animation
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          {!collapsed && (
            <span className="text-xl font-semibold bg-gradient-to-br from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Tesla Learn
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        <Separator />

        <div className="flex-1 flex flex-col">
          {/* Main Actions */}
          <div className="p-2 space-y-2">
            <Button
              variant="default"
              className={cn(
                'w-full justify-start gap-3',
                collapsed && 'justify-center'
              )}
              onClick={() => setActivePath('/new')}
            >
              <Plus className="h-4 w-4" />
              {!collapsed && <span>New Generation</span>}
            </Button>
            
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start gap-3',
                collapsed && 'justify-center'
              )}
              onClick={() => setActivePath('/search')}
            >
              <Search className="h-4 w-4" />
              {!collapsed && <span>Search Content</span>}
            </Button>
          </div>

          <Separator className="my-2" />

          {/* Recent Generations */}
          {!collapsed && (
            <div className="flex-1 flex flex-col min-h-0">
              <Collapsible
                open={historyOpen}
                onOpenChange={setHistoryOpen}
                className="px-2"
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-2"
                  >
                    <div className="flex items-center gap-2">
                      <History className="h-4 w-4" />
                      <span className="font-medium">Recent</span>
                    </div>
                    <Clock className="h-3 w-3" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ScrollArea className="h-[calc(100vh-280px)]">
                    <div className="space-y-1 p-1">
                      {recentGenerations.map((item) => {
                        const Icon = getTypeIcon(item.type);
                        return (
                          <Button
                            key={item.id}
                            variant="ghost"
                            className="w-full justify-start gap-3 h-auto py-2 px-3"
                            onClick={() => setActivePath(`/view/${item.id}`)}
                          >
                            <Icon className="h-4 w-4 shrink-0" />
                            <div className="flex flex-col items-start text-sm">
                              <span className="font-medium">{item.title}</span>
                              <span className="text-xs text-muted-foreground">
                                {item.date}
                              </span>
                            </div>
                          </Button>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}

          <Separator />

          {/* User Profile */}
          <div className="p-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start gap-3 px-2',
                    collapsed && 'justify-center'
                  )}
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  {!collapsed && (
                    <div className="flex flex-col items-start text-sm">
                      <span className="font-medium">John Doe</span>
                      <span className="text-xs text-muted-foreground">
                        john@example.com
                      </span>
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>
    </>
  );
}