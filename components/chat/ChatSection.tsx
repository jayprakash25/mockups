import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatMessage {
  id: number;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: string;
}

const mockMessages: ChatMessage[] = [
  {
    id: 1,
    content: "Hello! How can I help you today?",
    sender: "assistant",
    timestamp: "10:00 AM"
  },
  {
    id: 2,
    content: "I need help with my React project",
    sender: "user",
    timestamp: "10:01 AM"
  },
  {
    id: 3,
    content: "Sure! What specific issues are you facing with your React project?",
    sender: "assistant",
    timestamp: "10:01 AM"
  },
];

export function ChatSection() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);

  const handleSend = () => {
    if (!message.trim()) return;
    
    const newMessage: ChatMessage = {
      id: messages.length + 1,
      content: message,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-4 lg:gap-6 p-3 lg:p-4 min-h-full">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-2 lg:gap-3 max-w-[85%] lg:max-w-[80%]",
                message.sender === "user" ? "ml-auto" : ""
              )}
            >
              {message.sender === "assistant" && (
                <Avatar className="h-6 w-6 lg:h-8 lg:w-8 shrink-0">
                  <AvatarImage src="/assistant-avatar.png" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "rounded-lg p-2 lg:p-3",
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p className="text-xs lg:text-sm whitespace-pre-wrap break-words">
                  {message.content}
                </p>
                <span className="text-[10px] lg:text-xs opacity-50 mt-1 block">
                  {message.timestamp}
                </span>
              </div>
              {message.sender === "user" && (
                <Avatar className="h-6 w-6 lg:h-8 lg:w-8 shrink-0">
                  <AvatarImage src="/user-avatar.png" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t p-2 lg:p-4">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 text-sm"
          />
          <Button 
            onClick={handleSend}
            size="icon"
            disabled={!message.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
