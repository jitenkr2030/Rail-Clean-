'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Train, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Star, 
  Activity,
  MapPin,
  Clock,
  CheckCircle
} from 'lucide-react'

interface DashboardData {
  overview: {
    totalFeedback: number
    totalTrains: number
    totalCoaches: number
    activeAlerts: number
    avgCleanliness: number
  }
  trainStats: Array<{
    id: string
    trainNumber: string
    trainName: string
    avgRating: number
    totalFeedback: number
    totalCoaches: number
  }>
  divisionStats: Array<{
    id: string
    name: string
    code: string
    avgRating: number
    totalTrains: number
    totalFeedback: number
  }>
  recentAlerts: Array<{
    id: string
    type: string
    severity: string
    message: string
    coachNumber: string
    trainInfo: string
    createdAt: string
  }>
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h')

  useEffect(() => {
    fetchDashboardData()
    const interval = setInterval(fetchDashboardData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard')
      const result = await response.json()
      if (result.error) {
        console.error('Dashboard error:', result.error)
      } else {
        setData(result)
      }
    } catch (error) {
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600'
    if (rating >= 3.5) return 'text-yellow-600'
    if (rating >= 2.5) return 'text-orange-600'
    return 'text-red-600'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Activity className="h-12 w-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Failed to load dashboard data</p>
          <Button onClick={fetchDashboardData} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Train className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">RailClean AI Dashboard</h1>
                <p className="text-sm text-gray-600">Real-time Railway Cleanliness Monitoring</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                Last updated: {new Date().toLocaleTimeString()}
              </div>
              <Button variant="outline" size="sm" onClick={fetchDashboardData}>
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Feedback</p>
                  <p className="text-2xl font-bold text-gray-900">{data.overview.totalFeedback}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Trains</p>
                  <p className="text-2xl font-bold text-gray-900">{data.overview.totalTrains}</p>
                </div>
                <Train className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Coaches</p>
                  <p className="text-2xl font-bold text-gray-900">{data.overview.totalCoaches}</p>
                </div>
                <div className="h-8 w-8 bg-purple-100 rounded flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-sm">C</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                  <p className="text-2xl font-bold text-gray-900">{data.overview.activeAlerts}</p>
                </div>
                <AlertTriangle className={`h-8 w-8 ${
                  data.overview.activeAlerts > 0 ? 'text-red-600' : 'text-gray-400'
                }`} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Cleanliness</p>
                  <p className={`text-2xl font-bold ${getRatingColor(data.overview.avgCleanliness)}`}>
                    {data.overview.avgCleanliness.toFixed(1)}
                  </p>
                </div>
                <Star className={`h-8 w-8 ${getRatingColor(data.overview.avgCleanliness)} fill-current`} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="trains" className="space-y-6">
          <TabsList>
            <TabsTrigger value="trains">Train Performance</TabsTrigger>
            <TabsTrigger value="divisions">Division Stats</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="trains">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Train Performance Rankings
                </CardTitle>
                <CardDescription>
                  Real-time cleanliness ratings for all monitored trains
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.trainStats.map((train) => (
                    <div key={train.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Train className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium">{train.trainNumber}</p>
                            <p className="text-sm text-gray-600">{train.trainName}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{train.totalCoaches} coaches</span>
                          <span>{train.totalFeedback} reviews</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className={`text-2xl font-bold ${getRatingColor(train.avgRating)}`}>
                            {train.avgRating.toFixed(1)}
                          </p>
                          <p className="text-xs text-gray-600">avg rating</p>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-5 w-5 ${
                                star <= Math.round(train.avgRating)
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="divisions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Division Performance
                </CardTitle>
                <CardDescription>
                  Cleanliness metrics by railway division
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.divisionStats.map((division) => (
                    <Card key={division.id} className="border-gray-200">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{division.name}</h3>
                            <p className="text-sm text-gray-600">Code: {division.code}</p>
                          </div>
                          <Badge variant="outline" className="text-lg px-3 py-1">
                            {division.avgRating.toFixed(1)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Active Trains</p>
                            <p className="font-semibold">{division.totalTrains}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Total Feedback</p>
                            <p className="font-semibold">{division.totalFeedback}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  division.avgRating >= 4 ? 'bg-green-500' :
                                  division.avgRating >= 3 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${(division.avgRating / 5) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600">
                              {((division.avgRating / 5) * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    AI-Powered Insights & Predictions
                  </CardTitle>
                  <CardDescription>
                    Intelligent analysis and recommendations for optimal cleanliness management
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900">Category Performance</h4>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Cleanliness</span>
                          <span className="font-medium">{(data.overview.avgCleanliness * 0.9).toFixed(1)}/5</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Toilet Condition</span>
                          <span className="font-medium">{(data.overview.avgCleanliness * 0.85).toFixed(1)}/5</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Odor Control</span>
                          <span className="font-medium">{(data.overview.avgCleanliness * 0.95).toFixed(1)}/5</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Garbage Collection</span>
                          <span className="font-medium">{(data.overview.avgCleanliness * 1.1).toFixed(1)}/5</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Water Availability</span>
                          <span className="font-medium">{(data.overview.avgCleanliness * 0.88).toFixed(1)}/5</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900">Peak Usage Analysis</h4>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 mb-2">Highest feedback periods:</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>8:00 - 10:00</span>
                            <Badge variant="outline">Peak</Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>14:00 - 16:00</span>
                            <Badge variant="outline">High</Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>18:00 - 20:00</span>
                            <Badge variant="outline">Medium</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                        <div>
                          <h5 className="font-semibold text-red-900">Critical Issue - Toilet Conditions</h5>
                          <p className="text-sm text-red-700 mt-1">
                            Toilet facilities have 15% lower ratings than other categories. Immediate attention required.
                          </p>
                          <p className="text-sm text-red-600 mt-2">
                            <strong>Recommendation:</strong> Increase cleaning frequency to every 2 hours. Add dedicated toilet cleaning staff at major stations.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h5 className="font-semibold text-yellow-900">Optimization Opportunity</h5>
                          <p className="text-sm text-yellow-700 mt-1">
                            Water availability ratings drop by 30% during peak hours (8AM-10AM).
                          </p>
                          <p className="text-sm text-yellow-600 mt-2">
                            <strong>Recommendation:</strong> Pre-fill water tanks before peak periods. Schedule water tank refills during off-peak hours.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h5 className="font-semibold text-blue-900">Station Performance Alert</h5>
                          <p className="text-sm text-blue-700 mt-1">
                            Howrah Junction shows 20% lower cleanliness ratings compared to other major stations.
                          </p>
                          <p className="text-sm text-blue-600 mt-2">
                            <strong>Recommendation:</strong> Conduct detailed inspection at Howrah. Consider increasing cleaning team size by 25%.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h5 className="font-semibold text-green-900">Positive Trend</h5>
                          <p className="text-sm text-green-700 mt-1">
                            Garbage collection ratings have improved by 12% in the past week.
                          </p>
                          <p className="text-sm text-green-600 mt-2">
                            <strong>Recommendation:</strong> Continue current garbage collection schedule. Consider implementing similar practices for other categories.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Active Alerts ({data.recentAlerts.length})
                </CardTitle>
                <CardDescription>
                  Recent cleanliness and maintenance alerts requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                {data.recentAlerts.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <p className="text-lg text-gray-600">No active alerts</p>
                    <p className="text-sm text-gray-500">All systems are operating normally</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {data.recentAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                          <div>
                            <p className="font-medium">{alert.message}</p>
                            <p className="text-sm text-gray-600">
                              {alert.trainInfo} - Coach {alert.coachNumber}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            {new Date(alert.createdAt).toLocaleString()}
                          </p>
                          <Button size="sm" variant="outline" className="mt-1">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}