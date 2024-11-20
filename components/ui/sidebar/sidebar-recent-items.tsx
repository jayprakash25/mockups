import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RecentItem } from './types';
import { getTypeIcon } from '@/components/ui/sidebar/utils';

interface SidebarRecentItemsProps {
  items: RecentItem[];
  onItemClick: (id: string | number) => void;
}

export function SidebarRecentItems({ items, onItemClick }: SidebarRecentItemsProps) {
  return (
    <ScrollArea className="h-[calc(100vh-280px)]">
      <div className="space-y-1 p-1">
        {items.map((item) => {
          const Icon = getTypeIcon(item.type);
          return (
            <Button
              key={item.id}
              variant="ghost"
              className="w-full justify-start gap-3 h-auto py-2 px-3"
              onClick={() => onItemClick(item.id)}
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
  );
} 