"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  actionButtons?: QuickAction[]
}

interface QuickAction {
  label: string
  action: 'link' | 'message' | 'phone'
  value: string
  variant?: 'default' | 'primary' | 'secondary'
}

interface ChatBotKnowledge {
  programs: Record<string, {
    name: string
    description: string
    instructor?: string
    instructors?: string
    benefits: string
    schedule: string
    signupUrl?: string
  }>
  instructors: Record<string, string>
  pricing: Record<string, string>
  location: Record<string, string>
  general: Record<string, string>
}

const knowledgeBase: ChatBotKnowledge = {
  programs: {
    bjj: {
      name: "Brazilian Jiu-Jitsu (BJJ)",
      description: "Ground fighting and submission grappling, known as 'the gentle art'",
      instructors: "Josh Allsopp (Head BJJ Instructor, 15+ years experience) and Issa Issa (World Championship Medalist, consistently ranking 1st-3rd globally)",
      benefits: "Self-defense, mental strategy, full-body workout, community",
      schedule: "Monday 6:00-7:30 PM, Tuesday 6:00-7:00 PM, Wednesday 6:30-8:00 PM"
    },
    muaythai: {
      name: "Muay Thai",
      description: "The Art of Eight Limbs - traditional Thai boxing using punches, kicks, knees, and elbows",
      instructor: "Bastian Ayala (10+ years, trained in Thailand) and Johana Reyes Lagos (Women's classes)",
      benefits: "Incredible cardio, self-defense, mental discipline, cultural heritage",
      schedule: "Monday 7:00-8:00 AM & 6:30-7:30 PM, Tuesday 6:30-7:30 PM, Wednesday 6:30-7:30 PM, Thursday 6:30-7:30 PM (Women's), Friday 5:30-6:30 PM (Sparring), Saturday 7:00-8:00 AM"
    },
    mma: {
      name: "Mixed Martial Arts (MMA)",
      description: "Complete fighting system combining BJJ, Muay Thai, Wrestling, and Boxing",
      instructor: "Antonio Mammarella (Head MMA Instructor, 14+ years, former professional fighter)",
      benefits: "Complete fighting skills, competition preparation, comprehensive training",
      schedule: "Tuesday 7:30-8:30 PM, Thursday 7:30-8:30 PM"
    },
    wrestling: {
      name: "Wrestling",
      description: "Olympic-style wrestling with world champion instruction",
      instructor: "Tsuchika Shimoyamada (World Champion, Multiple Australian & Japanese National Champion, Oceania & Asian Champion)",
      benefits: "Strength & conditioning, mental toughness, technical mastery, competition ready",
      schedule: "Monday 7:30-9:00 PM, Wednesday 6:30-8:00 PM"
    },
    kids: {
      name: "Kids Programs",
      description: "BJJ, Muay Thai, Wrestling, and Ninja Warrior for ages 4-12",
      instructors: "Specialized kids instructors",
      benefits: "Confidence building, self-defense, physical fitness, social development",
      schedule: "Monday: Kids Ninja Warrior 4:00-4:40 PM, Kids BJJ 5:00-5:40 PM; Tuesday: Kids Muay Thai 4:00-4:40 PM; Wednesday: Kids BJJ 5:00-5:40 PM; Thursday: Kids Wrestling 4:00-4:40 PM"
    }
  },
  instructors: {
    josh: "Josh Allsopp - Head BJJ Instructor, 15+ years experience, analytical approach, championship-level program development",
    issa: "Issa Issa - BJJ Instructor & World Championship Medalist, consistently ranking 1st-3rd in world championships, elite competition experience",
    bastian: "Bastian Ayala - Muay Thai Specialist, 10+ years, multiple trips to Thailand for authentic training",
    johana: "Johana Reyes Lagos - Women's Muay Thai Instructor, creates supportive environment for women",
    antonio: "Antonio Mammarella - Head MMA Instructor, 14+ years, former professional fighter and coach",
    tsuchika: "Tsuchika Shimoyamada - Wrestling World Champion, Multiple Australian & Japanese National Champion"
  },
  pricing: {
    casual: "$35 per class - pay as you train, no commitment",
    kickstarter: "$30 per week - 1 class per week, perfect for beginners",
    "2x": "$40 per week - 2 classes per week, faster skill development",
    unlimited: "$55 per week - unlimited classes, best value",
    "special_offer": "$45 per week - limited time unlimited plan discount (https://app.clubworx.com/s/diU5mlHO)",
    trial: "FREE first class for all new students"
  },
  location: {
    address: "Unit 5/1-7 Jabez Street, Marrickville NSW 2204",
    phone: "(042) 311 1999",
    email: "info@marrickvillemartialartsclub.com.au",
    hours: "Mon-Sun: 7:00-9:30 AM & 4:00-9:30 PM",
    transport: "5 minutes walk from Marrickville Station, multiple bus routes nearby",
    parking: "Free street parking available"
  },
  general: {
    trial: "FREE trial class available for all programs, no experience necessary, arrive 15 minutes early",
    equipment: "All equipment provided for trial classes, just bring comfortable workout clothes and water bottle",
    beginners: "90% of students start with zero experience, beginner-friendly classes available",
    membership: "No lock-in contracts, 30 days notice to cancel, family discounts available",
    cancellation: "Can freeze membership up to 3 months per year, no joining fees"
  }
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm the MMAC Assistant. I can help you with information about our martial arts programs, schedules, pricing, and more. What would you like to know?",
      isBot: true,
      timestamp: new Date()
    }
  ])

  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const generateBotResponse = (userMessage: string): { text: string; actions?: QuickAction[] } => {
    const message = userMessage.toLowerCase()

    // Program-specific responses
    if (message.includes('bjj') || message.includes('jiu-jitsu') || message.includes('jiu jitsu')) {
      return {
        text: `Our Brazilian Jiu-Jitsu program is led by ${knowledgeBase.programs.bjj.instructors}. ${knowledgeBase.programs.bjj.description}. Classes: ${knowledgeBase.programs.bjj.schedule}. Benefits include ${knowledgeBase.programs.bjj.benefits}. Your first class is FREE!`,
        actions: [
          { label: "🆓 Book Free BJJ Trial", action: "link", value: "https://app.clubworx.com/s/K5XfztjN", variant: "primary" },
          { label: "📅 View Schedule", action: "link", value: "/timetable", variant: "secondary" }
        ]
      }
    }

    if (message.includes('muay thai') || message.includes('thai boxing') || message.includes('kickboxing')) {
      return {
        text: `${knowledgeBase.programs.muaythai.name}: ${knowledgeBase.programs.muaythai.description}. Instructors: ${knowledgeBase.programs.muaythai.instructor}. Schedule: ${knowledgeBase.programs.muaythai.schedule}. We also offer women's-only classes!`,
        actions: [
          { label: "🆓 Book Free Trial", action: "link", value: "https://app.clubworx.com/s/K5XfztjN", variant: "primary" },
          { label: "👩 Women's Classes", action: "message", value: "Tell me about women's Muay Thai", variant: "secondary" }
        ]
      }
    }

    if (message.includes('instructor') || message.includes('coach') || message.includes('teacher')) {
      return {
        text: `Our expert instructors: ${knowledgeBase.instructors.josh}; ${knowledgeBase.instructors.issa}; ${knowledgeBase.instructors.antonio}; ${knowledgeBase.instructors.tsuchika}. World-class instruction across all programs!`,
        actions: [
          { label: "👥 Meet Our Coaches", action: "link", value: "/coaches", variant: "primary" }
        ]
      }
    }

    // Default response
    return {
      text: `I can help you with information about our martial arts programs (BJJ, Muay Thai, MMA, Wrestling, Kids), pricing, schedules, location, and getting started. Try asking about specific programs, pricing, or how to book your FREE trial class! You can also call us at ${knowledgeBase.location.phone}.`,
      actions: [
        { label: "🆓 Book Free Trial", action: "link", value: "https://app.clubworx.com/s/K5XfztjN", variant: "primary" },
        { label: "📞 Call Us", action: "phone", value: "+61423111999", variant: "secondary" }
      ]
    }
  }

  const handleQuickAction = (action: QuickAction) => {
    switch (action.action) {
      case 'phone':
        window.open(`tel:${action.value}`, '_self')
        break
      case 'link':
        if (action.value.startsWith('http')) {
          window.open(action.value, '_blank')
        } else {
          window.open(action.value, '_self')
        }
        break
      case 'message':
        setInputValue(action.value)
        handleSendMessage(action.value)
        break
    }
  }

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue
    if (!textToSend.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const response = generateBotResponse(textToSend)
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isBot: true,
        timestamp: new Date(),
        actionButtons: response.actions
      }

      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-24 left-6 z-50">
        <div className="relative">
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-full w-16 h-16 p-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-0 relative z-10"
            title="Chat with MMAC Assistant"
            type="button"
          >
            <img
              src="https://ugc.same-assets.com/RhTt8Y-gA4XocPwiD9KdPYtPgWXBXfhY.png"
              alt="Chat Assistant"
              className="w-9 h-9"
            />
          </Button>

          {/* Pulse animation */}
          <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-30 pointer-events-none" />
        </div>
      </div>
    )
  }

  return (
    <Card className="fixed bottom-24 left-6 z-50 w-96 h-96 flex flex-col shadow-xl border-2 border-yellow-400">
      <CardHeader className="bg-yellow-400 text-black p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5" />
            <span className="font-semibold">MMAC Assistant</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-black hover:bg-yellow-500"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} w-full`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.isBot
                    ? 'bg-gray-100 text-gray-900'
                    : 'bg-yellow-400 text-black'
                }`}
                style={{
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  hyphens: 'auto',
                  maxWidth: '70%'
                }}
              >
                <div className="flex items-start space-x-2 w-full">
                  {message.isBot && <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                  <div
                    className="text-sm leading-relaxed flex-1 min-w-0"
                    style={{
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      whiteSpace: 'pre-wrap',
                      maxWidth: '100%'
                    }}
                  >
                    {message.text}
                  </div>
                  {!message.isBot && <User className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                </div>

                {message.actionButtons && message.actionButtons.length > 0 && (
                  <div className="mt-3 space-y-2 w-full">
                    {message.actionButtons.map((action, index) => (
                      <Button
                        key={`${message.id}-action-${index}`}
                        size="sm"
                        variant={action.variant === 'primary' ? 'default' : 'outline'}
                        className={`w-full text-xs h-8 ${
                          action.variant === 'primary'
                            ? 'bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-500'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => handleQuickAction(action)}
                      >
                        <span className="truncate text-center w-full px-1">{action.label}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start w-full">
              <div className="bg-gray-100 text-gray-900 p-3 rounded-lg max-w-[70%]">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4" />
                  <div className="text-sm">Typing...</div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t p-3">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about programs, pricing, schedule..."
              className="flex-1 text-sm"
            />
            <Button
              onClick={() => handleSendMessage()}
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
