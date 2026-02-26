'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Star, Train, CheckCircle, AlertCircle, Languages } from 'lucide-react'

interface CoachInfo {
  id: string
  coachNumber: string
  train: {
    trainNumber: string
    trainName: string
  }
}

const translations = {
  english: {
    title: 'Coach Cleanliness Feedback',
    subtitle: 'Your feedback helps us maintain high standards',
    cleanliness: 'Overall Cleanliness',
    toilet: 'Toilet Condition',
    odor: 'Odor/Freshness',
    garbage: 'Garbage Collection',
    water: 'Water Availability',
    comments: 'Additional Comments (Optional)',
    submit: 'Submit Feedback',
    thankYou: 'Thank you for your feedback!',
    rating: {
      1: 'Very Poor',
      2: 'Poor', 
      3: 'Average',
      4: 'Good',
      5: 'Excellent'
    }
  },
  hindi: {
    title: 'कोच स्वच्छता प्रतिक्रिया',
    subtitle: 'आपकी प्रतिक्रिया हमें उच्च मानक बनाए रखने में मदद करती है',
    cleanliness: 'समग्र स्वच्छता',
    toilet: 'शौचालय की स्थिति',
    odor: 'गंध/ताजगी',
    garbage: 'कचरा संग्रह',
    water: 'पानी की उपलब्धता',
    comments: 'अतिरिक्त टिप्पणियाँ (वैकल्पिक)',
    submit: 'प्रतिक्रिया जमा करें',
    thankYou: 'आपकी प्रतिक्रिया के लिए धन्यवाद!',
    rating: {
      1: 'बहुत खराब',
      2: 'खराब',
      3: 'औसत',
      4: 'अच्छा',
      5: 'उत्कृष्ट'
    }
  }
}

export default function FeedbackPage() {
  const searchParams = useSearchParams()
  const coachId = searchParams.get('coach')
  const [language, setLanguage] = useState<'english' | 'hindi'>('english')
  const [coachInfo, setCoachInfo] = useState<CoachInfo | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [ratings, setRatings] = useState({
    cleanliness: 0,
    toilet: 0,
    odor: 0,
    garbage: 0,
    water: 0
  })
  const [comments, setComments] = useState('')

  const t = translations[language]

  useEffect(() => {
    if (coachId) {
      // In a real app, this would fetch from API
      // For demo, we'll simulate coach info
      setCoachInfo({
        id: coachId,
        coachNumber: 'C05',
        train: {
          trainNumber: '12301',
          trainName: 'Rajdhani Express'
        }
      })
    }
  }, [coachId])

  const handleRating = (category: keyof typeof ratings, value: number) => {
    setRatings(prev => ({ ...prev, [category]: value }))
  }

  const handleSubmit = async () => {
    if (ratings.cleanliness === 0 || ratings.toilet === 0 || ratings.odor === 0 || 
        ratings.garbage === 0 || ratings.water === 0) {
      alert('Please rate all categories')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coachId: coachId || 'demo-coach',
          ...ratings,
          comments: comments || undefined,
          language
        })
      })

      const result = await response.json()
      if (result.success) {
        setIsSubmitted(true)
      } else {
        alert('Failed to submit feedback. Please try again.')
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to submit feedback. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <CardTitle className="text-2xl text-green-800">{t.thankYou}</CardTitle>
            <CardDescription>
              Your feedback has been recorded and will help improve our services.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              onClick={() => window.close()} 
              className="bg-green-600 hover:bg-green-700"
            >
              Close
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const RatingStars = ({ 
    category, 
    value 
  }: { 
    category: keyof typeof ratings
    value: number 
  }) => (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleRating(category, star)}
          className="transition-all duration-200 transform hover:scale-110"
        >
          <Star 
            className={`h-8 w-8 ${
              star <= value 
                ? 'text-yellow-500 fill-yellow-500' 
                : 'text-gray-300 hover:text-yellow-300'
            }`}
          />
        </button>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Train className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">RailClean AI</h1>
                <p className="text-sm text-gray-600">Indian Railways Cleanliness Monitoring</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Languages className="h-5 w-5 text-gray-600" />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === 'english' ? 'hindi' : 'english')}
              >
                {language === 'english' ? 'हिन्दी' : 'English'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Coach Info */}
          {coachInfo && (
            <Card className="mb-6 border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-blue-900">
                      {coachInfo.train.trainNumber} - {coachInfo.train.trainName}
                    </h2>
                    <p className="text-blue-700">Coach {coachInfo.coachNumber}</p>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    QR Code Scanned
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Feedback Form */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900">{t.title}</CardTitle>
              <CardDescription className="text-lg">{t.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Cleanliness Rating */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-lg font-medium text-gray-900">
                    {t.cleanliness}
                  </label>
                  {ratings.cleanliness > 0 && (
                    <Badge variant="outline">
                      {t.rating[ratings.cleanliness as keyof typeof t.rating]}
                    </Badge>
                  )}
                </div>
                <RatingStars category="cleanliness" value={ratings.cleanliness} />
              </div>

              {/* Toilet Rating */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-lg font-medium text-gray-900">
                    {t.toilet}
                  </label>
                  {ratings.toilet > 0 && (
                    <Badge variant="outline">
                      {t.rating[ratings.toilet as keyof typeof t.rating]}
                    </Badge>
                  )}
                </div>
                <RatingStars category="toilet" value={ratings.toilet} />
              </div>

              {/* Odor Rating */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-lg font-medium text-gray-900">
                    {t.odor}
                  </label>
                  {ratings.odor > 0 && (
                    <Badge variant="outline">
                      {t.rating[ratings.odor as keyof typeof t.rating]}
                    </Badge>
                  )}
                </div>
                <RatingStars category="odor" value={ratings.odor} />
              </div>

              {/* Garbage Rating */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-lg font-medium text-gray-900">
                    {t.garbage}
                  </label>
                  {ratings.garbage > 0 && (
                    <Badge variant="outline">
                      {t.rating[ratings.garbage as keyof typeof t.rating]}
                    </Badge>
                  )}
                </div>
                <RatingStars category="garbage" value={ratings.garbage} />
              </div>

              {/* Water Rating */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-lg font-medium text-gray-900">
                    {t.water}
                  </label>
                  {ratings.water > 0 && (
                    <Badge variant="outline">
                      {t.rating[ratings.water as keyof typeof t.rating]}
                    </Badge>
                  )}
                </div>
                <RatingStars category="water" value={ratings.water} />
              </div>

              {/* Comments */}
              <div className="space-y-3">
                <label className="text-lg font-medium text-gray-900">
                  {t.comments}
                </label>
                <Textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder={language === 'english' 
                    ? 'Share any additional feedback...' 
                    : 'कोई अतिरिक्त प्रतिक्रिया साझा करें...'}
                  rows={3}
                />
              </div>

              {/* Submit Button */}
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-3 text-lg bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </div>
                ) : (
                  t.submit
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="mt-6 border-gray-200 bg-gray-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-gray-600 mt-0.5" />
                <div className="text-sm text-gray-600">
                  <p className="font-medium mb-1">About this feedback:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Your feedback helps maintain high cleanliness standards</li>
                    <li>• All responses are confidential and anonymous</li>
                    <li>• This takes less than 30 seconds to complete</li>
                    <li>• Thank you for helping improve Indian Railways!</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}