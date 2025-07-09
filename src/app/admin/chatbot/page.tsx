"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BarChart, MessageSquare, Users, TrendingUp, Download, RefreshCw } from "lucide-react"

interface AnalyticsEvent {
  timestamp: string
  event: string
  data?: unknown
  sessionId: string
}

interface ChatMessage {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

interface ConversationData {
  sessionId: string
  startTime: string
  messages: ChatMessage[]
  userQuestions: string[]
  botResponses: string[]
  actionsTaken: string[]
  conversionEvents: string[]
}

export default function ChatbotAdminPage() {
  const [analytics, setAnalytics] = useState<AnalyticsEvent[]>([])
  const [conversations, setConversations] = useState<ConversationData[]>([])
  const [selectedConversation, setSelectedConversation] = useState<ConversationData | null>(null)

  // Load data from localStorage
  const loadData = useCallback(() => {
    const analyticsData = JSON.parse(localStorage.getItem('chatbot_analytics') || '[]')
    const conversationsData = JSON.parse(localStorage.getItem('chatbot_conversations') || '[]')
    setAnalytics(analyticsData)
    setConversations(conversationsData)
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  // Analytics calculations
  const totalSessions = [...new Set(analytics.map(a => a.sessionId))].length
  const totalMessages = analytics.filter(a => a.event === 'user_message_sent').length
  const conversionRate = conversations.length > 0
    ? (conversations.filter(c => c.conversionEvents.length > 0).length / conversations.length * 100).toFixed(1)
    : '0'

  // Popular queries
  const queryFrequency = analytics
    .filter(a => a.event === 'program_inquiry' || a.event === 'pricing_inquiry' || a.event === 'trial_inquiry')
    .reduce((acc, event) => {
      const eventData = event.data as { program?: string } | undefined
      const key = eventData?.program || event.event
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {} as Record<string, number>)

  const popularQueries = Object.entries(queryFrequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)

  // Export data
  const exportData = () => {
    const data = {
      analytics,
      conversations,
      exportedAt: new Date().toISOString(),
      summary: {
        totalSessions,
        totalMessages,
        conversionRate,
        popularQueries
      }
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `chatbot-analytics-${new Date().toISOString().split('T')[0]}.json`
    a.click()
  }

  // Clear data
  const clearData = () => {
    if (confirm('Are you sure you want to clear all analytics data? This cannot be undone.')) {
      localStorage.removeItem('chatbot_analytics')
      localStorage.removeItem('chatbot_conversations')
      setAnalytics([])
      setConversations([])
      setSelectedConversation(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Chatbot Admin Dashboard</h1>
          <p className="text-gray-600">Monitor chatbot usage, analyze conversations, and track conversions</p>

          <div className="flex gap-4 mt-4">
            <Button onClick={loadData} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </Button>
            <Button onClick={exportData} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Analytics
            </Button>
            <Button onClick={clearData} variant="destructive">
              Clear All Data
            </Button>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSessions}</div>
              <p className="text-xs text-gray-500">Unique chatbot conversations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMessages}</div>
              <p className="text-xs text-gray-500">User messages sent</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{conversionRate}%</div>
              <p className="text-xs text-gray-500">Sessions with actions taken</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">ClubWorx Signups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {conversations.reduce((sum, c) => sum + c.conversionEvents.filter(e => e.includes('ClubWorx')).length, 0)}
              </div>
              <p className="text-xs text-gray-500">Direct online signups</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Popular Queries */}
              <Card>
                <CardHeader>
                  <CardTitle>Popular Queries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {popularQueries.map(([query, count]) => (
                      <div key={query} className="flex items-center justify-between">
                        <span className="capitalize">{query.replace('_', ' ')}</span>
                        <Badge variant="secondary">{count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {analytics.slice(-10).reverse().map((event, index) => (
                      <div key={index} className="text-sm border-b pb-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{event.event}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(event.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        {typeof event.data !== 'undefined' && event.data !== null && (
                          <div className="text-xs text-gray-600 mt-1">
                            {JSON.stringify(event.data)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="conversations">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Conversations List */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Conversations ({conversations.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {conversations.map((conv) => (
                      <div
                        key={conv.sessionId}
                        className={`p-3 border rounded cursor-pointer hover:bg-gray-50 ${
                          selectedConversation?.sessionId === conv.sessionId ? 'bg-yellow-50 border-yellow-300' : ''
                        }`}
                        onClick={() => setSelectedConversation(conv)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-sm font-medium">
                              Session {conv.sessionId.split('_')[1]}
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(conv.startTime).toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              {conv.userQuestions.length} messages
                            </div>
                          </div>
                          {conv.conversionEvents.length > 0 && (
                            <Badge variant="default" className="bg-green-500">
                              Converted
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Conversation Details */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>
                    {selectedConversation
                      ? `Conversation Details - Session ${selectedConversation.sessionId.split('_')[1]}`
                      : 'Select a conversation to view details'
                    }
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedConversation ? (
                    <div className="space-y-4">
                      {/* Conversation Stats */}
                      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded">
                        <div>
                          <div className="text-sm font-medium">Messages</div>
                          <div className="text-lg">{selectedConversation.userQuestions.length}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Actions Taken</div>
                          <div className="text-lg">{selectedConversation.actionsTaken.length}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Conversions</div>
                          <div className="text-lg text-green-600">{selectedConversation.conversionEvents.length}</div>
                        </div>
                      </div>

                      {/* Messages */}
                      <div>
                        <h4 className="font-medium mb-2">Conversation Flow</h4>
                        <div className="space-y-2 max-h-64 overflow-y-auto border rounded p-3">
                          {selectedConversation.messages.map((msg, index) => (
                            <div key={index} className={`text-sm ${msg.isBot ? 'text-blue-600' : 'text-gray-800'}`}>
                              <strong>{msg.isBot ? 'Bot' : 'User'}:</strong> {msg.text}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions and Conversions */}
                      {selectedConversation.actionsTaken.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Actions Taken</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedConversation.actionsTaken.map((action, index) => (
                              <Badge key={index} variant="outline">{action}</Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedConversation.conversionEvents.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2 text-green-600">Conversion Events</h4>
                          <div className="space-y-1">
                            {selectedConversation.conversionEvents.map((event, index) => (
                              <Badge key={index} className="bg-green-500">{event}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      Select a conversation from the list to view detailed analytics
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="knowledge">
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Base Management</CardTitle>
                <p className="text-sm text-gray-600">
                  Update chatbot responses and knowledge. Changes will be applied immediately.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-blue-50 rounded">
                      <div className="text-sm font-medium text-blue-600">Programs</div>
                      <div className="text-lg font-bold">7</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded">
                      <div className="text-sm font-medium text-green-600">Instructors</div>
                      <div className="text-lg font-bold">6</div>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded">
                      <div className="text-sm font-medium text-yellow-600">Pricing Plans</div>
                      <div className="text-lg font-bold">6</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded">
                      <div className="text-sm font-medium text-purple-600">ClubWorx Links</div>
                      <div className="text-lg font-bold">4</div>
                    </div>
                  </div>

                  {/* Knowledge Update Form */}
                  <div className="border rounded p-4">
                    <h4 className="font-medium mb-4">Update Knowledge Base</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Contact Phone</label>
                        <Input placeholder="(042) 311 1999" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Contact Email</label>
                        <Input placeholder="info@marrickvillemartialartsclub.com.au" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Opening Hours</label>
                        <Input placeholder="Mon-Sun: 7:00-9:30 AM & 4:00-9:30 PM" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Address</label>
                        <Input placeholder="Unit 5/1-7 Jabez Street, Marrickville NSW 2204" />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button>Update Knowledge Base</Button>
                      <Button variant="outline" className="ml-2">Reset to Defaults</Button>
                    </div>
                  </div>

                  {/* ClubWorx Links Management */}
                  <div className="border rounded p-4">
                    <h4 className="font-medium mb-4">ClubWorx Integration Links</h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input placeholder="Kick Starter Plan" />
                        <Input placeholder="https://app.clubworx.com/s/MdQN9003" />
                        <Button variant="outline">Update</Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input placeholder="2X Plan" />
                        <Input placeholder="https://app.clubworx.com/s/RDaphccF" />
                        <Button variant="outline">Update</Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input placeholder="Unlimited Plan" />
                        <Input placeholder="https://app.clubworx.com/s/LiqEKTNa" />
                        <Button variant="outline">Update</Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input placeholder="Special Offer" />
                        <Input placeholder="https://app.clubworx.com/s/diU5mlHO" />
                        <Button variant="outline">Update</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
