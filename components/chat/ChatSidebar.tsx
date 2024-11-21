'use client'

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  History,
  Menu,
  Plus,
  Search,
  Settings,
  User,
  Clock,
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
import { SidebarProps } from '@/components/ui/sidebar/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getTypeIcon } from '@/components/ui/sidebar/utils';

export default function ChatSidebar({
  brand = { name: 'Tesla Learn' },
  user = {
    name: 'John Doe',
    email: 'john@example.com', 
    avatarFallback: 'JD'
  },
  recentItems = [],
  onNavigate,
  onProfileClick,
  onSettingsClick,
  className,
  defaultCollapsed = false,
  collapsed,
  setCollapsed
}: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);
      if (isMobileView) {
        setCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavigate = (path: string) => {
    onNavigate?.(path);
    if (isMobile) {
      setCollapsed(true);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {!collapsed && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:relative flex h-[calc(100vh-3.5rem)] flex-col border-r bg-background transition-all duration-300 z-40',
          collapsed ? 'w-0 lg:w-16 -translate-x-full lg:translate-x-0' : 'w-72',
          'overflow-hidden',
          className
        )}
      >
        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            
            <Separator className="my-2" />

            {/* Recent Items */}
            {!collapsed && (
              <div className="flex-1 flex flex-col min-h-0">
                <ScrollArea className="h-[calc(100vh-280px)]">
                  <div className="space-y-1 p-1">
                    {[
                      {
                        id: '1',
                        title: 'React Performance Optimization',
                        type: 'chat',
                      },
                      {
                        id: '2',
                        title: 'NextJS Authentication Setup',
                        type: 'chat',
                      },
                      {
                        id: '3',
                        title: 'Database Schema Design',
                        type: 'chat',
                      },
                      {
                        id: '4',
                        title: 'API Integration Guide',
                        type: 'chat',
                      },
                      {
                        id: '5',
                        title: 'CSS Grid Layout Tutorial',
                        type: 'chat',
                      },
                    ].map((item) => {
                      const Icon = getTypeIcon(item.type);
                      return (
                        <Button
                          key={item.id}
                          variant="ghost"
                          className="w-full justify-start gap-3 h-auto py-2 px-3"
                          onClick={() => handleNavigate(`/view/${item.id}`)}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          <span className="text-sm font-medium">{item.title}</span>
                        </Button>
                      );
                    })}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>

          {/* User Profile - Now will stick to bottom */}
          <div>
            <Separator />
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
                      <AvatarImage src={user.avatarUrl} />
                      <AvatarFallback>{user.avatarFallback}</AvatarFallback>
                    </Avatar>
                    {!collapsed && (
                      <div className="flex flex-col items-start text-sm">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {user.email}
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
        </div>
      </aside>
    </>
  );
}