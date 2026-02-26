import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Get time-based analytics
    const now = new Date()
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const last7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    // Feedback trends
    const feedbackTrends = await db.feedback.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: last7d
        }
      },
      _count: true,
      _avg: {
        overall: true
      }
    })

    // Worst performing trains
    const worstTrains = await db.train.findMany({
      include: {
        coaches: {
          include: {
            feedback: {
              select: {
                overall: true
              }
            }
          }
        }
      }
    })

    const processedWorstTrains = worstTrains.map(train => {
      const allFeedback = train.coaches.flatMap(coach => coach.feedback)
      const avgRating = allFeedback.length > 0 
        ? allFeedback.reduce((acc, f) => acc + f.overall, 0) / allFeedback.length 
        : 0

      return {
        trainNumber: train.trainNumber,
        trainName: train.trainName,
        avgRating: Number(avgRating.toFixed(2)),
        feedbackCount: allFeedback.length
      }
    }).filter(t => t.feedbackCount > 0).sort((a, b) => a.avgRating - b.avgRating).slice(0, 5)

    // Station performance
    const stationStats = await db.station.findMany({
      include: {
        trainsOrigin: {
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

    const processedStationStats = stationStats.map(station => {
      const allFeedback = station.trainsOrigin.flatMap(train => 
        train.coaches.flatMap(coach => coach.feedback)
      )
      const avgRating = allFeedback.length > 0 
        ? allFeedback.reduce((acc, f) => acc + f.overall, 0) / allFeedback.length 
        : 0

      return {
        stationCode: station.code,
        stationName: station.name,
        avgRating: Number(avgRating.toFixed(2)),
        feedbackCount: allFeedback.length
      }
    }).filter(s => s.feedbackCount > 0).sort((a, b) => a.avgRating - b.avgRating)

    // Category-wise performance
    const categoryPerformance = await db.feedback.aggregate({
      _avg: {
        cleanliness: true,
        toilet: true,
        odor: true,
        garbage: true,
        water: true
      }
    })

    // Peak hours analysis
    const hourlyFeedback = await db.feedback.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: last7d
        }
      },
      _count: true
    })

    const hourlyStats = Array.from({ length: 24 }, (_, hour) => {
      const hourFeedback = hourlyFeedback.filter(item => {
        const itemHour = new Date(item.createdAt).getHours()
        return itemHour === hour
      })
      return {
        hour,
        count: hourFeedback.reduce((acc, item) => acc + item._count, 0)
      }
    })

    // AI Insights
    const insights = []

    // Insight 1: Worst performing category
    const categories = ['cleanliness', 'toilet', 'odor', 'garbage', 'water']
    const categoryScores = categories.map(cat => ({
      category: cat,
      score: categoryPerformance._avg[cat as keyof typeof categoryPerformance._avg] || 0
    })).sort((a, b) => a.score - b.score)

    if (categoryScores[0].score < 3) {
      insights.push({
        type: 'critical',
        title: 'Critical Issue Detected',
        description: `${categoryScores[0].category.charAt(0).toUpperCase() + categoryScores[0].category.slice(1)} has the lowest average rating (${categoryScores[0].score.toFixed(1)}/5). Immediate attention required.`,
        recommendation: `Focus on improving ${categoryScores[0].category} standards across all coaches. Consider additional training for cleaning staff.`
      })
    }

    // Insight 2: Peak hours
    const peakHour = hourlyStats.reduce((max, curr) => curr.count > max.count ? curr : max)
    if (peakHour.count > 10) {
      insights.push({
        type: 'optimization',
        title: 'Peak Usage Pattern Identified',
        description: `Maximum feedback received between ${peakHour.hour}:00 - ${peakHour.hour + 1}:00 (${peakHour.count} responses).`,
        recommendation: 'Schedule cleaning staff 1-2 hours before peak times to maintain cleanliness during high-traffic periods.'
      })
    }

    // Insight 3: Station performance
    if (processedStationStats.length > 0 && processedStationStats[0].avgRating < 3) {
      insights.push({
        type: 'station',
        title: 'Station Performance Alert',
        description: `${processedStationStats[0].stationName} (${processedStationStats[0].stationCode}) has the lowest average rating (${processedStationStats[0].avgRating.toFixed(1)}/5).`,
        recommendation: 'Conduct detailed inspection at this station. Consider replacing cleaning team or providing additional resources.'
      })
    }

    // Insight 4: Train performance
    if (processedWorstTrains.length > 0 && processedWorstTrains[0].avgRating < 3) {
      insights.push({
        type: 'train',
        title: 'Train Performance Alert',
        description: `${processedWorstTrains[0].trainNumber} - ${processedWorstTrains[0].trainName} has the lowest rating (${processedWorstTrains[0].avgRating.toFixed(1)}/5).`,
        recommendation: 'Increase cleaning frequency for this train. Assign dedicated cleaning team for immediate improvement.'
      })
    }

    return NextResponse.json({
      summary: {
        totalInsights: insights.length,
        criticalIssues: insights.filter(i => i.type === 'critical').length,
        lastUpdated: new Date().toISOString()
      },
      insights,
      analytics: {
        worstTrains: processedWorstTrains,
        stationPerformance: processedStationStats,
        categoryPerformance: {
          cleanliness: Number((categoryPerformance._avg.cleanliness || 0).toFixed(2)),
          toilet: Number((categoryPerformance._avg.toilet || 0).toFixed(2)),
          odor: Number((categoryPerformance._avg.odor || 0).toFixed(2)),
          garbage: Number((categoryPerformance._avg.garbage || 0).toFixed(2)),
          water: Number((categoryPerformance._avg.water || 0).toFixed(2))
        },
        hourlyStats,
        peakHour: peakHour.hour,
        feedbackTrends: feedbackTrends.map(item => ({
          date: item.createdAt.toISOString().split('T')[0],
          count: item._count,
          avgRating: Number((item._avg.overall || 0).toFixed(2))
        }))
      }
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    )
  }
}