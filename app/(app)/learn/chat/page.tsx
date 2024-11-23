'use client'

import { useState, useEffect } from 'react';
import { ChatSection } from '@/components/chat/ChatSection';
import FilePreview from '@/components/chat/FilePreview';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Card } from "@/components/ui/card";

export default function ChatPage() {
  const [selectedFileId, setSelectedFileId] = useState('1');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavigate = (path: string) => {
    const id = path.split('/').pop();
    if (id) {
      setSelectedFileId(id);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <Card className="h-[calc(100vh-2rem)] shadow-lg bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border-0">
        <ResizablePanelGroup
          direction={isMobile ? "vertical" : "horizontal"}
          className="h-full rounded-xl"
        >
          <ResizablePanel
            defaultSize={isMobile ? 40 : 60}
            minSize={25}
            maxSize={75}
            className="transition-all duration-200 ease-in-out"
          >
            <div className="h-full">
              <FilePreview selectedFileId={selectedFileId} />
            </div>
          </ResizablePanel>
          
          <ResizableHandle className="bg-slate-200 hover:bg-slate-300 transition-colors">
            <div className={`${isMobile ? 'h-1 w-8' : 'w-1 h-8'} bg-slate-300 rounded-full mx-auto`} />
          </ResizableHandle>
          
          <ResizablePanel
            defaultSize={isMobile ? 60 : 40}
            minSize={25}
            maxSize={75}
            className="transition-all duration-200 ease-in-out"
          >
            <div className="h-full">
              <ChatSection />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Card>
    </div>
  );
}