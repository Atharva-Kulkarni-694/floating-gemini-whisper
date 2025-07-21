import { useState, useRef, useEffect } from 'react'
import { Send, X, Minimize2, Maximize2, MessageCircle, FileText, Brain } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import ChatMessage, { Message } from './ChatMessage'
import { toast } from "sonner"

interface RAGChatbotProps {
  className?: string;
}

// Mock RAG documents - Replace with your actual RAG documents
const mockRAGDocuments = [
  {
    id: '1',
    title: 'Company Overview',
    content: 'Quagster is a cutting-edge technology company focused on AI-driven solutions...',
    category: 'About'
  },
  {
    id: '2', 
    title: 'Product Features',
    content: 'Our platform offers advanced machine learning capabilities, real-time analytics...',
    category: 'Products'
  },
  {
    id: '3',
    title: 'Technical Documentation',
    content: 'API endpoints, integration guides, and technical specifications...',
    category: 'Technical'
  }
]

const RAGChatbot = ({ className }: RAGChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "👋 Hello! I'm your AI assistant powered by RAG (Retrieval-Augmented Generation). I can help you with questions about our company, products, and documentation. What would you like to know?",
      role: 'assistant',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [streamingMessage, setStreamingMessage] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages, streamingMessage])

  // Simulate RAG document retrieval
  const retrieveRelevantDocuments = (query: string) => {
    const queryLower = query.toLowerCase()
    return mockRAGDocuments.filter(doc => 
      doc.title.toLowerCase().includes(queryLower) ||
      doc.content.toLowerCase().includes(queryLower) ||
      doc.category.toLowerCase().includes(queryLower)
    )
  }

  // Simulate Gemini API call with RAG context
  const callGeminiAPI = async (userMessage: string, relevantDocs: typeof mockRAGDocuments) => {
    
     * GEMINI API INTEGRATION POINT
     * Replace this mock implementation with actual Gemini API call
     * 
     * Example implementation:
     * 
     * const GEMINI_API_KEY = 'AIzaSyBR2bDkLJCyHZk7gBFjgoEApoq3Fz2sI8w'; // ⚠️ Add your Gemini API key here
     * 
     * const contextPrompt = `
     * You are a helpful AI assistant. Use the following context to answer the user's question:
     * 
     * CONTEXT:
     * ${relevantDocs.map(doc => `${doc.title}: ${doc.content}`).join('\n\n')}
     * 
     * USER QUESTION: ${userMessage}
     * 
     * Please provide a helpful and accurate response based on the context provided.
     * `;
     * 
     * const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY, {
     *   method: 'POST',
     *   headers: {
     *     'Content-Type': 'application/json',
     *   },
     *   body: JSON.stringify({
     *     contents: [{
     *       parts: [{
     *         text: contextPrompt
     *       }]
     *     }]
     *   })
     * });
     * 
     * const data = await response.json();
     * return data.candidates[0].content.parts[0].text;
     

    // Mock response for demo - Replace with actual Gemini API call above
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        const contextInfo = relevantDocs.length > 0 
          ? `Based on our documentation about ${relevantDocs.map(d => d.category).join(', ')}, ` 
          : ''
        
        const responses = [
          `${contextInfo}I'd be happy to help you with that! Here's what I found in our knowledge base...`,
          `${contextInfo}Great question! Let me provide you with some relevant information from our documents...`,
          `${contextInfo}Based on the available information, here's what I can tell you...`
        ]
        
        resolve(responses[Math.floor(Math.random() * responses.length)] + 
          `\n\nThis response was generated using RAG with ${relevantDocs.length} relevant document(s) found.` +
          (relevantDocs.length > 0 ? `\n\nRelevant sources: ${relevantDocs.map(d => d.title).join(', ')}` : ''))
      }, 1500)
    })
  }

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Step 1: Retrieve relevant documents using RAG
      const relevantDocs = retrieveRelevantDocuments(input)
      
      // Step 2: Call Gemini API with RAG context
      const response = await callGeminiAPI(input, relevantDocs)

      // Step 3: Add AI response to messages
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
      toast.success("Response generated successfully!")

    } catch (error) {
      console.error('Error calling Gemini API:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble processing your request right now. Please check your API configuration and try again.",
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      toast.error("Failed to generate response. Please check your API key configuration.")
    } finally {
      setIsLoading(false)
      setStreamingMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="chat-button pulse-glow"
        size="lg"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    )
  }

  return (
    <Card className={cn(
      "fixed bottom-4 right-4 w-96 h-[600px] z-50 shadow-2xl border-border/50",
      "bg-card/90 backdrop-blur-lg",
      isMinimized && "h-14",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ai-neural to-ai-primary flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div>
            <CardTitle className="text-sm">RAG AI Assistant</CardTitle>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                <FileText className="w-2.5 h-2.5 mr-1" />
                RAG Enabled
              </Badge>
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-6 w-6 p-0"
          >
            {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-6 w-6 p-0"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-[calc(100%-80px)]">
          <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
            <div className="space-y-0">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                />
              ))}
              {isLoading && streamingMessage && (
                <ChatMessage
                  message={{
                    id: 'streaming',
                    content: streamingMessage,
                    role: 'assistant',
                    timestamp: new Date()
                  }}
                  isStreaming
                />
              )}
              {isLoading && !streamingMessage && (
                <div className="flex gap-3 p-4 rounded-lg mb-4 message-ai mr-auto max-w-[85%]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-ai-neural to-ai-primary flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-ai-neural mb-2">AI Assistant</div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-ai-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-ai-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-ai-primary rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-border/50">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about our company..."
                disabled={isLoading}
                className="flex-1 bg-background/50"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                size="sm"
                className="px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-xs text-muted-foreground mt-2 text-center">
              Powered by Gemini AI with RAG • {mockRAGDocuments.length} docs indexed
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

export default RAGChatbot
