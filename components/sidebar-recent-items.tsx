import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Clock } from 'lucide-react'

interface RecentItem {
  id: string
  title: string
}

interface SidebarRecentItemsProps {
  items: RecentItem[]
  onItemClick: (id: string) => void
}

export function SidebarRecentItems({ items, onItemClick }: SidebarRecentItemsProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 px-2">
        <Clock className="h-4 w-4" />
        <span className="font-medium">Recent</span>
      </div>
      <ScrollArea className="h-[200px]">
        <div className="space-y-1">
          {items.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className="w-full justify-start text-sm"
              onClick={() => onItemClick(item.id)}
            >
              {item.title.length > 25 ? `${item.title.slice(0, 25)}...` : item.title}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

