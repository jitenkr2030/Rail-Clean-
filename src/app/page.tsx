'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Train, Shield, Smartphone, BarChart3, Users, AlertTriangle, CheckCircle, Star, Wrench } from 'lucide-react'

export default function Home() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Train className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">RailClean AI</h1>
              <Badge variant="secondary">Smart Railway Monitoring</Badge>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => window.open('/feedback?coach=12301-C05', '_blank')}>
                <Smartphone className="h-4 w-4 mr-2" />
                Try Passenger Feedback
              </Button>
              <Button variant="outline" onClick={() => window.open('/staff', '_blank')}>
                <Wrench className="h-4 w-4 mr-2" />
                Staff Management
              </Button>
              <Button onClick={() => window.open('/dashboard', '_blank')}>
                <BarChart3 className="h-4 w-4 mr-2" />
                View Official Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Real-Time Railway Coach Cleanliness Monitoring
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Empowering Indian Railways with AI-driven insights, passenger feedback, and staff accountability 
            to ensure the highest standards of cleanliness across all coaches.
          </p>
          <div className="flex justify-center gap-4 mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Shield className="h-5 w-5 mr-2" />
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">The Challenge We Solve</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <AlertTriangle className="h-8 w-8 text-red-600 mb-2" />
                <CardTitle>No Real Accountability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Cleaning staff manually mark coaches as "cleaned" with no verification or passenger feedback loop.
                </p>
              </CardContent>
            </Card>
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <Users className="h-8 w-8 text-orange-600 mb-2" />
                <CardTitle>Passenger Dissatisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Complaints go to social media instead of official channels, creating negative publicity.
                </p>
              </CardContent>
            </Card>
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-yellow-600 mb-2" />
                <CardTitle>No Data Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Railway officials lack real-time data to identify problem areas and optimize cleaning schedules.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Our Smart Solution</h3>
          <Tabs defaultValue="feedback" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="feedback">QR Feedback</TabsTrigger>
              <TabsTrigger value="dashboard">Real Dashboard</TabsTrigger>
              <TabsTrigger value="staff">Staff System</TabsTrigger>
              <TabsTrigger value="ai">AI Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="feedback" className="mt-8">
              <Card>
                <CardHeader>
                  <Smartphone className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Passenger QR Feedback System</CardTitle>
                  <CardDescription>
                    Every coach displays a unique QR code for instant feedback
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Quick 10-Second Rating</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Cleanliness Rating (⭐⭐⭐⭐⭐)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Toilet Condition
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Odor Assessment
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Garbage Collection
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Water Availability
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Multi-Language Support</h4>
                      <div className="flex gap-2">
                        <Badge variant="outline">English</Badge>
                        <Badge variant="outline">हिन्दी</Badge>
                        <Badge variant="outline">ગુજરાતી</Badge>
                        <Badge variant="outline">বাংলা</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-3">
                        No app required - works on any smartphone browser
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dashboard" className="mt-8">
              <Card>
                <CardHeader>
                  <BarChart3 className="h-8 w-8 text-green-600 mb-2" />
                  <CardTitle>Real-Time Official Dashboard</CardTitle>
                  <CardDescription>
                    Live monitoring for railway managers and officials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">94%</div>
                      <div className="text-sm text-gray-600">Average Cleanliness</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">127</div>
                      <div className="text-sm text-gray-600">Active Trains</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-3xl font-bold text-red-600">3</div>
                      <div className="text-sm text-gray-600">Alerts</div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="font-medium">🚆 Rajdhani Express</span>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span>4.8</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="font-medium">🚆 Duronto Express</span>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span>4.2</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="staff" className="mt-8">
              <Card>
                <CardHeader>
                  <Wrench className="h-8 w-8 text-purple-600 mb-2" />
                  <CardTitle>Staff Accountability System</CardTitle>
                  <CardDescription>
                    Complete tracking of cleaning operations and staff performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Before/After Photo Proof</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Time-stamped photo uploads</li>
                        <li>• Geotagged location verification</li>
                        <li>• Staff assignment tracking</li>
                        <li>• Performance metrics</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Team Management</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Cleaning team assignments</li>
                        <li>• Shift scheduling</li>
                        <li>• Attendance tracking</li>
                        <li>• Performance bonuses</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai" className="mt-8">
              <Card>
                <CardHeader>
                  <BarChart3 className="h-8 w-8 text-orange-600 mb-2" />
                  <CardTitle>AI-Powered Insights</CardTitle>
                  <CardDescription>
                    Predictive analytics and intelligent recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Predictive Analysis</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Peak usage patterns</li>
                        <li>• Cleaning requirement prediction</li>
                        <li>• Resource optimization</li>
                        <li>• Trend analysis</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Smart Alerts</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Dirty coach notifications</li>
                        <li>• Station performance ranking</li>
                        <li>• Staff efficiency alerts</li>
                        <li>• Maintenance scheduling</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Simple B2G Pricing</h3>
          <div className="max-w-4xl mx-auto">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Per Train Plan</CardTitle>
                <div className="text-4xl font-bold text-blue-600">₹5,000<span className="text-lg text-gray-600">/month</span></div>
                <CardDescription>Complete monitoring and analytics solution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Unlimited passenger feedback</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Real-time dashboard access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Staff management system</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>AI insights & analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Multi-language support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>24/7 technical support</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                  Get Started Today
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Train className="h-6 w-6" />
                <span className="text-xl font-bold">RailClean AI</span>
              </div>
              <p className="text-gray-400">
                Transforming railway cleanliness with smart technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Case Studies</li>
                <li>API Docs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>System Status</li>
                <li>Training</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@railclean.ai</li>
                <li>+91-8080808080</li>
                <li>24/7 Support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RailClean AI. Empowering Indian Railways.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}