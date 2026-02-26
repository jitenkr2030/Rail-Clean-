import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const feedbackSchema = z.object({
  coachId: z.string(),
  cleanliness: z.number().min(1).max(5),
  toilet: z.number().min(1).max(5),
  odor: z.number().min(1).max(5),
  garbage: z.number().min(1).max(5),
  water: z.number().min(1).max(5),
  comments: z.string().optional(),
  language: z.string().default('english')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = feedbackSchema.parse(body)
    
    // Calculate overall rating
    const overall = Math.round(
      (validatedData.cleanliness + validatedData.toilet + validatedData.odor + 
       validatedData.garbage + validatedData.water) / 5
    )
    
    const feedback = await db.feedback.create({
      data: {
        ...validatedData,
        overall: overall,
        ipAddress: request.ip || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
    })

    // Check if rating is below threshold and create alert
    if (overall <= 2) {
      await db.alert.create({
        data: {
          coachId: validatedData.coachId,
          type: 'low_rating',
          severity: overall <= 1 ? 'critical' : 'high',
          message: `Coach received low rating: ${overall}/5`
        }
      })
    }

    return NextResponse.json({ 
      success: true, 
      feedbackId: feedback.id,
      message: 'Thank you for your feedback!' 
    })
  } catch (error) {
    console.error('Feedback submission error:', error)
    if (error instanceof Error) {
      console.error('Error details:', error.message)
      console.error('Error stack:', error.stack)
    }
    return NextResponse.json(
      { success: false, message: 'Invalid feedback data', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 400 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const coachId = searchParams.get('coachId')
  
  if (!coachId) {
    return NextResponse.json({ error: 'Coach ID required' }, { status: 400 })
  }

  try {
    const feedback = await db.feedback.findMany({
      where: { coachId },
      orderBy: { createdAt: 'desc' },
      take: 100
    })

    const avgRatings = feedback.length > 0 ? {
      cleanliness: feedback.reduce((acc, f) => acc + f.cleanliness, 0) / feedback.length,
      toilet: feedback.reduce((acc, f) => acc + f.toilet, 0) / feedback.length,
      odor: feedback.reduce((acc, f) => acc + f.odor, 0) / feedback.length,
      garbage: feedback.reduce((acc, f) => acc + f.garbage, 0) / feedback.length,
      water: feedback.reduce((acc, f) => acc + f.water, 0) / feedback.length,
      overall: feedback.reduce((acc, f) => acc + f.overall, 0) / feedback.length,
    } : null

    return NextResponse.json({
      feedback,
      avgRatings,
      totalResponses: feedback.length
    })
  } catch (error) {
    console.error('Feedback retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve feedback' },
      { status: 500 }
    )
  }
}