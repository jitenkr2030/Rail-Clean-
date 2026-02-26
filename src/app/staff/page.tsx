'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Users, 
  Camera, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Upload,
  Wrench,
  Search,
  Calendar
} from 'lucide-react'

interface CleaningTeam {
  id: string
  name: string
  leaderName: string
  contact: string
  station: {
    name: string
    code: string
  }
  isActive: boolean
}

interface CleaningRecord {
  id: string
  coach: {
    coachNumber: string
    train: {
      trainNumber: string
      trainName: string
    }
  }
  team: {
    name: string
    leaderName: string
  }
  cleanedAt: string
  status: string
  beforePhotoUrl?: string
  afterPhotoUrl?: string
  notes?: string
  verifiedAt?: string
}

export default function StaffPage() {
  const [teams, setTeams] = useState<CleaningTeam[]>([])
  const [records, setRecords] = useState<CleaningRecord[]>([])
  const [selectedTeam, setSelectedTeam] = useState<string>('')
  const [coachNumber, setCoachNumber] = useState('')
  const [notes, setNotes] = useState('')
  const [beforePhoto, setBeforePhoto] = useState<File | null>(null)
  const [afterPhoto, setAfterPhoto] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchTeams()
    fetchRecords()
  }, [])

  const fetchTeams = async () => {
    // Mock data for demo
    setTeams([
      {
        id: '1',
        name: 'Delhi Cleaning Team A',
        leaderName: 'Ramesh Kumar',
        contact: '+91-9812345678',
        station: { name: 'New Delhi', code: 'NDLS' },
        isActive: true
      },
      {
        id: '2',
        name: 'Mumbai Cleaning Team A',
        leaderName: 'Suresh Patel',
        contact: '+91-9823456789',
        station: { name: 'Mumbai Central', code: 'MMCT' },
        isActive: true
      }
    ])
  }

  const fetchRecords = async () => {
    // Mock data for demo
    setRecords([
      {
        id: '1',
        coach: {
          coachNumber: 'C05',
          train: { trainNumber: '12301', trainName: 'Rajdhani Express' }
        },
        team: { name: 'Delhi Cleaning Team A', leaderName: 'Ramesh Kumar' },
        cleanedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        status: 'completed',
        beforePhotoUrl: '/photos/before/12301-C05.jpg',
        afterPhotoUrl: '/photos/after/12301-C05.jpg',
        notes: 'Coach cleaned successfully, all areas sanitized',
        verifiedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        coach: {
          coachNumber: 'C03',
          train: { trainNumber: '12261', trainName: 'Duronto Express' }
        },
        team: { name: 'Mumbai Cleaning Team A', leaderName: 'Suresh Patel' },
        cleanedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        status: 'in_progress',
        beforePhotoUrl: '/photos/before/12261-C03.jpg',
        notes: 'Cleaning in progress, toilet area being deep cleaned'
      }
    ])
  }

  const handleSubmitCleaning = async () => {
    if (!selectedTeam || !coachNumber) {
      alert('Please select a team and enter coach number')
      return
    }

    setIsSubmitting(true)
    try {
      // In a real app, this would upload photos and create cleaning record
      console.log('Submitting cleaning record:', {
        teamId: selectedTeam,
        coachNumber,
        notes,
        beforePhoto,
        afterPhoto
      })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert('Cleaning record submitted successfully!')
      setCoachNumber('')
      setNotes('')
      setBeforePhoto(null)
      setAfterPhoto(null)
      fetchRecords()
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to submit cleaning record')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'scheduled': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredRecords = records.filter(record =>
    record.coach.train.trainNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.coach.train.trainName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.coach.coachNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.team.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wrench className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
                <p className="text-sm text-gray-600">Cleaning Team Accountability System</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-600">
                {teams.filter(t => t.isActive).length} Active Teams
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="teams" className="space-y-6">
          <TabsList>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="records">Cleaning Records</TabsTrigger>
            <TabsTrigger value="submit">Submit Work</TabsTrigger>
          </TabsList>

          <TabsContent value="teams">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teams.map((team) => (
                <Card key={team.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        {team.name}
                      </CardTitle>
                      <Badge variant={team.isActive ? 'default' : 'secondary'}>
                        {team.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <CardDescription>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4" />
                        {team.station.name} ({team.station.code})
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium">Team Leader</Label>
                        <p className="text-gray-700">{team.leaderName}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Contact</Label>
                        <p className="text-gray-700">{team.contact}</p>
                      </div>
                      <div className="pt-3 flex gap-2">
                        <Button size="sm" variant="outline">
                          <Calendar className="h-4 w-4 mr-2" />
                          View Schedule
                        </Button>
                        <Button size="sm" variant="outline">
                          View Performance
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="records">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Cleaning Records
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by train, coach, or team..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredRecords.map((record) => (
                    <div key={record.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">
                            {record.coach.train.trainNumber} - {record.coach.train.trainName}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Coach {record.coach.coachNumber} • {record.team.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Leader: {record.team.leaderName}
                          </p>
                        </div>
                        <Badge className={getStatusColor(record.status)}>
                          {record.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        {record.beforePhotoUrl && (
                          <div>
                            <Label className="text-sm font-medium">Before Photo</Label>
                            <div className="mt-1 border rounded p-2 bg-gray-50">
                              <Camera className="h-8 w-8 text-gray-400 mx-auto" />
                              <p className="text-xs text-center text-gray-600 mt-1">
                                Photo uploaded
                              </p>
                            </div>
                          </div>
                        )}
                        {record.afterPhotoUrl && (
                          <div>
                            <Label className="text-sm font-medium">After Photo</Label>
                            <div className="mt-1 border rounded p-2 bg-gray-50">
                              <Camera className="h-8 w-8 text-gray-400 mx-auto" />
                              <p className="text-xs text-center text-gray-600 mt-1">
                                Photo uploaded
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {record.notes && (
                        <div className="mb-3">
                          <Label className="text-sm font-medium">Notes</Label>
                          <p className="text-sm text-gray-700 mt-1">{record.notes}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-4">
                          <span>Cleaned: {new Date(record.cleanedAt).toLocaleString()}</span>
                          {record.verifiedAt && (
                            <span className="flex items-center gap-1">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              Verified: {new Date(record.verifiedAt).toLocaleString()}
                            </span>
                          )}
                        </div>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submit">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Submit Cleaning Work
                </CardTitle>
                <CardDescription>
                  Record cleaning activities with photo evidence
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="team">Cleaning Team</Label>
                    <select
                      id="team"
                      value={selectedTeam}
                      onChange={(e) => setSelectedTeam(e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md"
                    >
                      <option value="">Select a team...</option>
                      {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name} - {team.station.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="coach">Coach Number</Label>
                    <Input
                      id="coach"
                      value={coachNumber}
                      onChange={(e) => setCoachNumber(e.target.value)}
                      placeholder="e.g., C05"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="before">Before Photo</Label>
                    <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setBeforePhoto(e.target.files?.[0] || null)}
                        className="hidden"
                        id="before-photo"
                      />
                      <label htmlFor="before-photo" className="cursor-pointer">
                        <Button type="button" variant="outline" size="sm">
                          Choose File
                        </Button>
                      </label>
                      {beforePhoto && (
                        <p className="text-sm text-gray-600 mt-2">{beforePhoto.name}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="after">After Photo</Label>
                    <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setAfterPhoto(e.target.files?.[0] || null)}
                        className="hidden"
                        id="after-photo"
                      />
                      <label htmlFor="after-photo" className="cursor-pointer">
                        <Button type="button" variant="outline" size="sm">
                          Choose File
                        </Button>
                      </label>
                      {afterPhoto && (
                        <p className="text-sm text-gray-600 mt-2">{afterPhoto.name}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any additional notes about the cleaning work..."
                    rows={3}
                    className="mt-1"
                  />
                </div>

                <Button 
                  onClick={handleSubmitCleaning}
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </div>
                  ) : (
                    'Submit Cleaning Record'
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}