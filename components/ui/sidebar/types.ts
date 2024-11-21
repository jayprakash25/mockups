import { LucideIcon } from 'lucide-react';

export interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

export interface RecentItem {
  id: string | number;
  title: string;
  type: string;
  date: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  avatarFallback: string;
}

export interface SidebarProps {
  brand: {
    name: string;
    logo?: React.ReactNode;
  };
  user: UserProfile;
  recentItems?: RecentItem[];
  onNavigate?: (path: string) => void;
  onNewItem?: () => void;
  onSearch?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  collapsed?: boolean;
  setCollapsed: (collapsed: boolean) => void;
  className?: string;
  defaultCollapsed?: boolean;
} 