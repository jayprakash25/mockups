import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";

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
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim()) return;
    
    const newMessage: ChatMessage = {
      id: messages.length + 1,
      content: message,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: messages.length + 2,
        content: "I'm processing your request...",
        sender: "assistant",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-background/95 backdrop-blur-sm">
      {/* Chat Header */}
      <div className="border-b px-4 py-3 bg-background/50 backdrop-blur-sm">
        <h2 className="text-lg font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
          AI Assistant
        </h2>
        <p className="text-sm text-muted-foreground">Ask me anything about the content</p>
      </div>

      {/* Messages Area - Fixed Height */}
      <ScrollArea className="flex-1 px-4 h-[calc(100vh-12rem)]">
        <div className="flex flex-col gap-4 lg:gap-6 py-4 lg:py-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 lg:gap-4 max-w-[85%] lg:max-w-[80%]",
                "animate-in slide-in-from-bottom-2 duration-300",
                "hover:translate-y-[-1px] transition-transform",
                message.sender === "user" ? "ml-auto" : ""
              )}
            >
              {message.sender === "assistant" && (
                <Avatar className="h-8 w-8 lg:h-9 lg:w-9 ring-2 ring-emerald-500/20 shadow-md">
                  <AvatarImage src="/assistant-avatar.png" />
                  <AvatarFallback className="bg-emerald-500/20">AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "rounded-2xl p-3 lg:p-4 shadow-md",
                  "transition-all duration-200",
                  message.sender === "user"
                    ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white"
                    : "bg-white dark:bg-gray-800 border border-emerald-500/20"
                )}
              >
                <p className="text-sm lg:text-base whitespace-pre-wrap break-words">
                  {message.content}
                </p>
                <span className="text-[10px] lg:text-xs opacity-70 mt-1.5 block">
                  {message.timestamp}
                </span>
              </div>
              {message.sender === "user" && (
                <Avatar className="h-8 w-8 lg:h-9 lg:w-9 ring-2 ring-emerald-500/20 shadow-md">
                  <AvatarImage src="/user-avatar.png" />
                  <AvatarFallback className="bg-emerald-500/20">U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-2 items-center text-muted-foreground p-2 rounded-lg bg-muted/50 w-fit">
              <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />
              <span className="text-sm">AI is thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area - Fixed at Bottom */}
      <div className="border-t bg-background/50 backdrop-blur-sm p-4 sticky bottom-0">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 text-sm lg:text-base rounded-full border-emerald-500/20 focus:ring-emerald-500/20"
          />
          <Button 
            onClick={handleSend}
            size="icon"
            className={cn(
              "rounded-full h-10 w-10",
              "bg-gradient-to-r from-emerald-500 to-teal-600",
              "hover:scale-105 active:scale-95 transition-all duration-200",
              "shadow-md hover:shadow-lg"
            )}
            disabled={!message.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
