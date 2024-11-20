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
import { SidebarRecentItems } from '@/components/ui/sidebar/sidebar-recent-items';

export function Sidebar({
  brand,
  user,
  recentItems = [],
  onNavigate,
  onNewItem,
  onSearch,
  onProfileClick,
  onSettingsClick,
  className,
  defaultCollapsed = false,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
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
      {/* Mobile Toggle Button - Moved to top left */}
      <Button
        variant="default"
        size="icon"
        className={cn(
          'fixed top-4 left-4 h-12 w-12 rounded-full shadow-lg z-50',
          'lg:hidden',
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

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:relative flex h-screen flex-col border-r bg-background transition-all duration-300 z-40',
          collapsed ? 'w-0 lg:w-16 -translate-x-full lg:translate-x-0' : 'w-72',
          'overflow-hidden',
          className
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-4">
          {!collapsed && (
            <span className="text-xl font-semibold bg-gradient-to-br from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              {brand.name}
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

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Main Actions */}
            <div className="p-2 space-y-2">
              <Button
                variant="default"
                className={cn(
                  'w-full justify-start gap-3',
                  collapsed && 'justify-center'
                )}
                onClick={onNewItem}
              >
                <Plus className="h-4 w-4" />
                {!collapsed && <span>New Item</span>}
              </Button>
              
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start gap-3',
                  collapsed && 'justify-center'
                )}
                onClick={onSearch}
              >
                <Search className="h-4 w-4" />
                {!collapsed && <span>Search</span>}
              </Button>
            </div>

            <Separator className="my-2" />

            {/* Recent Items */}
            {!collapsed && recentItems.length > 0 && (
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
                    <SidebarRecentItems
                      items={recentItems}
                      onItemClick={(id) => handleNavigate(`/view/${id}`)}
                    />
                  </CollapsibleContent>
                </Collapsible>
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