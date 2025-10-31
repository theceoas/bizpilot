"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bot, Send, User, Loader2 } from "lucide-react"

interface Message {
  type: "user" | "bot"
  message: string
  timestamp: Date
}

// Session management utilities
const generateSessionId = (): string => {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 10)
  return `demo_${timestamp}_${randomString}`
}

const SESSION_DURATION = 2 * 60 * 60 * 1000 // 2 hours in milliseconds

const getOrCreateSessionId = (): string => {
  if (typeof window === 'undefined') return '' // SSR safety
  
  const existingSessionId = localStorage.getItem('webhook-chat-session-id')
  const sessionTimestamp = localStorage.getItem('webhook-chat-session-timestamp')
  
  // Check if session exists and is still valid (within 2 hours)
  if (existingSessionId && sessionTimestamp) {
    const sessionAge = Date.now() - parseInt(sessionTimestamp)
    if (sessionAge < SESSION_DURATION) {
      return existingSessionId
    }
  }
  
  // Create new session if none exists or expired
  const newSessionId = generateSessionId()
  const currentTimestamp = Date.now().toString()
  
  localStorage.setItem('webhook-chat-session-id', newSessionId)
  localStorage.setItem('webhook-chat-session-timestamp', currentTimestamp)
  
  return newSessionId
}

export function WebhookChat() {
  const [chatInput, setChatInput] = useState("")
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { 
      type: "bot", 
      message: "👋 Hi! I'm your AI Business OS assistant. Ask me anything about our system!", 
      timestamp: new Date() 
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string>("")
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Initialize session ID on component mount
  useEffect(() => {
    const id = getOrCreateSessionId()
    setSessionId(id)
  }, [])

  // Auto-scroll to latest message within chat container only
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages])

  const handleChatSend = async () => {
    if (!chatInput.trim() || isLoading) return
    
    const userMessage = chatInput.trim()
    const userMessageObj: Message = {
      type: "user",
      message: userMessage,
      timestamp: new Date()
    }
    
    setChatMessages(prev => [...prev, userMessageObj])
    setChatInput("")
    setIsLoading(true)
    
    try {
      // Send message to webhook
      const response = await fetch('https://n8n.srv1089510.hstgr.cloud/webhook/54c2f810-b14d-47cd-90db-7efc21381858', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId: sessionId,
          timestamp: new Date().toISOString(),
          source: 'demo-chat'
        })
      })

      if (response.ok) {
        let botResponse = "Thank you for your message! Our AI system has processed your request."
        
        try {
          // First try to get the response as text
          const responseText = await response.text()
          console.log('Webhook response (raw):', responseText) // Debug log
          
          // Try to parse as JSON first
          try {
            const data = JSON.parse(responseText)
            console.log('Webhook response (parsed JSON):', data) // Debug log
            
            // Try different possible response fields from the webhook
            if (data.response) {
              botResponse = data.response
            } else if (data.message) {
              botResponse = data.message
            } else if (data.reply) {
              botResponse = data.reply
            } else if (data.text) {
              botResponse = data.text
            } else if (typeof data === 'string') {
              botResponse = data
            } else if (data.data && data.data.response) {
              botResponse = data.data.response
            }
          } catch {
            // If JSON parsing fails, use the raw text response
            console.log('Response is not JSON, using as plain text:', responseText)
            if (responseText.trim()) {
              botResponse = responseText.trim()
            }
          }
        } catch (textError) {
          console.error('Failed to read response:', textError)
        }
        
        // Add bot response
        const botMessageObj: Message = {
          type: "bot",
          message: botResponse,
          timestamp: new Date()
        }
        
        setChatMessages(prev => [...prev, botMessageObj])
      } else {
        console.error('Webhook HTTP error:', response.status, response.statusText)
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Webhook error:', error)
      
      // Show actual error in development, fallback in production
      const errorMessage = process.env.NODE_ENV === 'development' 
        ? `Connection error: ${error instanceof Error ? error.message : 'Unknown error'}. Using fallback response.`
        : "I'm currently connecting to our AI system. In the meantime, I can tell you that our AI Business OS handles customer inquiries, processes orders, and manages your entire sales funnel automatically. Would you like to know more about pricing or features?"
      
      const fallbackResponse: Message = {
        type: "bot",
        message: errorMessage,
        timestamp: new Date()
      }
      
      setChatMessages(prev => [...prev, fallbackResponse])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleChatSend()
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="min-w-0 flex-1">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="truncate">AI Business OS™ Live System Demo</span>
            </CardTitle>
            <CardDescription className="text-sm sm:text-base mt-1">
              This is connected to our actual AI system. Ask about pricing, features, or how it works!
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 shrink-0">
            Live System
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div ref={chatContainerRef} className="h-64 sm:h-80 lg:h-96 bg-slate-50 rounded-lg p-3 sm:p-6 overflow-y-auto mb-4">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 sm:mb-4 flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="flex items-start gap-2 max-w-[280px] sm:max-w-xs">
                {msg.type === "bot" && (
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-1 shrink-0">
                    <Bot className="w-3 h-3 text-emerald-600" />
                  </div>
                )}
                <div
                  className={`px-3 sm:px-4 py-2 rounded-lg ${
                    msg.type === "user"
                      ? "bg-slate-700 text-white ml-auto"
                      : "bg-white border border-slate-200 shadow-sm"
                  }`}
                >
                  <p className="text-xs sm:text-sm whitespace-pre-wrap">{msg.message}</p>
                  <p className="text-xs opacity-60 mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {msg.type === "user" && (
                  <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center mt-1 shrink-0">
                    <User className="w-3 h-3 text-slate-600" />
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-3 sm:mb-4">
              <div className="flex items-start gap-2 max-w-[280px] sm:max-w-xs">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-1 shrink-0">
                  <Bot className="w-3 h-3 text-emerald-600" />
                </div>
                <div className="bg-white border border-slate-200 shadow-sm px-3 sm:px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin text-emerald-600" />
                    <span className="text-xs sm:text-sm text-slate-600">AI is thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Ask about pricing, features, or how our AI system works..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1 text-sm sm:text-base"
          />
          <Button 
            onClick={handleChatSend} 
            disabled={isLoading || !chatInput.trim()}
            className="px-4 sm:px-6 bg-slate-700 hover:bg-slate-800"
          >
            {isLoading ? (
              <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
            ) : (
              <Send className="w-3 h-3 sm:w-4 sm:h-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}