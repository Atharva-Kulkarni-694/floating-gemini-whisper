import { cn } from "@/lib/utils"
import { Bot, User } from "lucide-react"

export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
  isStreaming?: boolean
}

const ChatMessage = ({ message, isStreaming = false }: ChatMessageProps) => {
  const isUser = message.role === 'user'

  return (
    <div className={cn(
      "flex gap-3 p-4 rounded-lg mb-4 animate-fade-in",
      isUser ? "message-user ml-auto max-w-[80%]" : "message-ai mr-auto max-w-[85%]"
    )}>
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
        isUser 
          ? "bg-primary text-primary-foreground" 
          : "bg-gradient-to-br from-ai-neural to-ai-primary text-white"
      )}>
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>
      
      <div className="flex-1 space-y-2">
        <div className={cn(
          "text-sm font-medium",
          isUser ? "text-primary-foreground" : "text-ai-neural"
        )}>
          {isUser ? "You" : "AI Assistant"}
        </div>
        
        <div className={cn(
          "text-sm leading-relaxed whitespace-pre-wrap",
          isUser ? "text-primary-foreground" : "text-foreground"
        )}>
          {message.content}
          {isStreaming && (
            <span className="inline-block w-2 h-4 bg-current animate-pulse ml-1" />
          )}
        </div>
        
        <div className={cn(
          "text-xs opacity-60",
          isUser ? "text-primary-foreground" : "text-muted-foreground"
        )}>
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  )
}

export default ChatMessage