export interface User {
    name: string
    email: string
    avatarUrl?: string
    avatarFallback: string
  }
  
  export interface Brand {
    name: string
  }
  
  export interface RecentItem {
    id: string
    title: string
  }
  
  export interface SidebarProps {
    brand: Brand
    user: User
    recentItems?: RecentItem[]
    onNavigate?: (path: string) => void
    onNewItem?: () => void
    onSearch?: () => void
    onProfileClick?: () => void
    onSettingsClick?: () => void
    className?: string
    defaultCollapsed?: boolean
  }
  
  