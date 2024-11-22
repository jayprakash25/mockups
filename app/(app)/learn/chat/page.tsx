'use client'

import { useState, useEffect } from 'react';
import { ChatSection } from '@/components/chat/ChatSection';

import FilePreview from '@/components/chat/FilePreview';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export default function ChatPage() {
  const [selectedFileId, setSelectedFileId] = useState<string>('1');
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
    <div className="flex flex-col h-full">
      <div className="flex-1 flex relative">
        <div className="flex-1 flex flex-col lg:flex-row">
          <ResizablePanelGroup 
            direction={isMobile ? "vertical" : "horizontal"}
            className="w-full"
          >
            <ResizablePanel 
              defaultSize={isMobile ? 40 : 60} 
              className="min-h-[200px] border-b lg:border-b-0 lg:border-r"
            >
              <FilePreview selectedFileId={selectedFileId} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={isMobile ? 60 : 40}>
              <ChatSection />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
}
