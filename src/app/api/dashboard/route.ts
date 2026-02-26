import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Get overall statistics
    const totalFeedback = await db.feedback.count()
    const totalTrains = await db.train.count({ where: { isActive: true } })
    const totalCoaches = await db.coach.count({ where: { isActive: true } })
    const activeAlerts = await db.alert.count({ where: { isResolved: false } })

    // Get average ratings
    const avgRatings = await db.feedback.aggregate({
      _avg: {
        cleanliness: true,
        toilet: true,
        odor: true,
        garbage: true,
        water: true,
        overall: true
      }
    })

    // Get train-wise statistics
    const trainStats = await db.train.findMany({
      where: { isActive: true },
      include: {
        coaches: {
          include: {
            feedback: {
              select: {
                overall: true,
                createdAt: true
              }
            }
          }
        }
      }
    })

    // Process train statistics
    const processedTrainStats = trainStats.map(train => {
      const allFeedback = train.coaches.flatMap(coach => coach.feedback)
      const avgRating = allFeedback.length > 0 
        ? allFeedback.reduce((acc, f) => acc + f.overall, 0) / allFeedback.length 
        : 0

      return {
        id: train.id,
        trainNumber: train.trainNumber,
        trainName: train.trainName,
        avgRating: Number(avgRating.toFixed(1)),
        totalFeedback: allFeedback.length,
        totalCoaches: train.coaches.length
      }
    }).sort((a, b) => b.avgRating - a.avgRating)

    // Get recent alerts
    const recentAlerts = await db.alert.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        coach: {
          include: {
            train: {
              select: {
                trainNumber: true,
                trainName: true
              }
            }
          }
        }
      }
    })

    // Get division-wise statistics
    const divisionStats = await db.division.findMany({
      include: {
        trains: {
          where: { isActive: true },
          include: {
            coaches: {
              include: {
                feedback: {
                  select: { overall: true }
                }
              }
            }
          }
        }
      }
    })

    const processedDivisionStats = divisionStats.map(division => {
      const allFeedback = division.trains.flatMap(train => 
        train.coaches.flatMap(coach => coach.feedback)
      )
      const avgRating = allFeedback.length > 0 
        ? allFeedback.reduce((acc, f) => acc + f.overall, 0) / allFeedback.length 
        : 0

      return {
        id: division.id,
        name: division.name,
        code: division.code,
        avgRating: Number(avgRating.toFixed(1)),
        totalTrains: division.trains.length,
        totalFeedback: allFeedback.length
      }
    })

    return NextResponse.json({
      overview: {
        totalFeedback,
        totalTrains,
        totalCoaches,
        activeAlerts,
        avgCleanliness: Number(avgRatings._avg.overall?.toFixed(1) || 0)
      },
      trainStats: processedTrainStats,
      divisionStats: processedDivisionStats,
      recentAlerts: recentAlerts.map(alert => ({
        id: alert.id,
        type: alert.type,
        severity: alert.severity,
        message: alert.message,
        coachNumber: alert.coach.coachNumber,
        trainInfo: `${alert.coach.train.trainNumber} - ${alert.coach.train.trainName}`,
        createdAt: alert.createdAt
      }))
    })
  } catch (error) {
    console.error('Dashboard data error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}