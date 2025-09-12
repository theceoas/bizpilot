"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bot, ImageIcon, Send, CheckCircle, Zap, Target } from "lucide-react"

export function DemoSection() {
  const [chatInput, setChatInput] = useState("")
  const [chatMessages, setChatMessages] = useState([
          { type: "bot", message: "👋 Hi! I'm your BizPilot AI assistant. How can I help you today?" }
  ])

  const handleChatSend = () => {
    if (!chatInput.trim()) return
    
    const userMessage = chatInput
    setChatMessages(prev => [...prev, { type: "user", message: userMessage }])
    setChatInput("")
    
    // Simulate AI response
    setTimeout(() => {
      let response = ""
      if (userMessage.toLowerCase().includes("price") || userMessage.toLowerCase().includes("cost")) {
        response = "Our automation system starts at $2,997 (normally $5,497). This includes your complete setup, AI chat system, order management, and branded visuals. Would you like to see what's included?"
      } else if (userMessage.toLowerCase().includes("delivery") || userMessage.toLowerCase().includes("shipping")) {
        response = "Great question! 📦 For delivery, I can automatically:\n• Send tracking updates\n• Confirm delivery addresses\n• Handle shipping inquiries\n• Process returns\n\nWhat's your business type so I can customize the flow?"
      } else {
        response = "I can help you automate your entire business! I handle orders, customer service, payments, and even create your marketing visuals. What specific part of your business takes up most of your time?"
      }
      setChatMessages(prev => [...prev, { type: "bot", message: response }])
    }, 1000)
  }

  const handleImageGenerate = () => {
    // This would trigger the actual image generation
    console.log("Generating marketing visuals from uploaded images")
  }



  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="demo" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Real Example
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 px-4">
            See how BizPilot handles real orders — fast, accurate, and without you lifting a finger.
          </p>
        </div>

        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8 h-auto">
            <TabsTrigger value="chat" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-3">
              <Bot className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">AI Chat Demo</span>
              <span className="sm:hidden">Chat</span>
            </TabsTrigger>
            <TabsTrigger value="visuals" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-3">
              <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Visual Generator</span>
              <span className="sm:hidden">Visuals</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <Card className="max-w-4xl mx-auto">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="truncate">BizPilot™ AI Assistant - Live Demo</span>
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base mt-1">
                      Ask anything your customers would ask — pricing, delivery, products, etc.
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 shrink-0">
                    Live Demo
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 sm:h-80 lg:h-96 bg-slate-50 rounded-lg p-3 sm:p-6 overflow-y-auto mb-4">
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`mb-3 sm:mb-4 flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[280px] sm:max-w-xs px-3 sm:px-4 py-2 rounded-lg ${
                          msg.type === "user"
                            ? "bg-slate-700 text-white"
                            : "bg-white border border-slate-200 shadow-sm"
                        }`}
                      >
                        <p className="text-xs sm:text-sm whitespace-pre-wrap">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about pricing, delivery, products..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleChatSend()}
                    className="flex-1 text-sm sm:text-base"
                  />
                  <Button onClick={handleChatSend} className="px-4 sm:px-6 bg-slate-700 hover:bg-slate-800">
                    <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  💡 Try asking: &quot;What&apos;s the pricing?&quot; or &quot;How does delivery work?&quot;
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visuals">
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  AI Visual Generator - Product Photo to Marketing Magic
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  <strong>Simply upload your product photos</strong> and instantly get professional marketing visuals ready for social media, website, and ads
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <h4 className="font-semibold text-emerald-800 text-sm sm:text-base">How It Works</h4>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3 text-xs sm:text-sm text-emerald-700">
                    <div className="text-center">
                      <div className="font-medium mb-1">1. Upload Photos</div>
                      <div>Drop your product images</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium mb-1">2. AI Processing</div>
                      <div>Auto-generates marketing visuals</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium mb-1">3. Download & Use</div>
                      <div>Ready for Instagram, Facebook, etc.</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-4 text-base sm:text-lg">Product Photo Upload</h4>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                        <ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-600 font-medium">Click to upload product images</p>
                        <p className="text-xs text-slate-500 mt-1">Supports JPG, PNG, multiple files</p>
                      </div>
                      <Button 
                        onClick={handleImageGenerate}
                        className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800"
                      >
                        <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        Generate Marketing Visuals
                      </Button>
                    </div>
                    <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                      <h5 className="font-medium text-slate-900 mb-2 text-sm sm:text-base">Instantly Generated from Your Photos:</h5>
                      <ul className="text-xs sm:text-sm text-slate-700 space-y-1">
                        <li>• Instagram posts (square & story formats)</li>
                        <li>• Facebook ad creatives with compelling copy</li>
                        <li>• Website hero banners & product showcases</li>
                        <li>• Social media promotional graphics</li>
                        <li>• Professional product catalogs</li>
                        <li>• Branded marketing materials</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4 text-base sm:text-lg">Sample Generated Visuals</h4>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <div className="bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg h-24 sm:h-32 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                        Instagram Post
                      </div>
                      <div className="bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg h-24 sm:h-32 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                        Facebook Ad
                      </div>
                      <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg h-24 sm:h-32 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                        Story Format
                      </div>
                      <div className="bg-gradient-to-br from-amber-600 to-orange-700 rounded-lg h-24 sm:h-32 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                        Promo Graphic
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>


        </Tabs>

        <div className="text-center mt-8 sm:mt-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold mb-4 sm:mb-6 text-sm sm:text-base">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            This exact experience can be yours in 7 days
          </div>
          <div>
            <Button 
              size="lg"
              onClick={() => scrollToSection("apply")}
              className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold w-full sm:w-auto"
            >
              <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Claim One of the Final 3 Discounted Slots
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 