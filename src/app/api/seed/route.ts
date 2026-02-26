import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST() {
  try {
    // Create divisions
    const northernRailway = await db.division.upsert({
      where: { code: 'NR' },
      update: {},
      create: {
        name: 'Northern Railway',
        code: 'NR',
        description: 'Northern Division of Indian Railways'
      }
    })

    const westernRailway = await db.division.upsert({
      where: { code: 'WR' },
      update: {},
      create: {
        name: 'Western Railway',
        code: 'WR',
        description: 'Western Division of Indian Railways'
      }
    })

    // Create stations
    const newDelhi = await db.station.upsert({
      where: { code: 'NDLS' },
      update: {},
      create: {
        name: 'New Delhi',
        code: 'NDLS',
        divisionId: northernRailway.id,
        address: 'New Delhi, India'
      }
    })

    const mumbaiCentral = await db.station.upsert({
      where: { code: 'MMCT' },
      update: {},
      create: {
        name: 'Mumbai Central',
        code: 'MMCT',
        divisionId: westernRailway.id,
        address: 'Mumbai, Maharashtra'
      }
    })

    const howrah = await db.station.upsert({
      where: { code: 'HWH' },
      update: {},
      create: {
        name: 'Howrah Junction',
        code: 'HWH',
        divisionId: northernRailway.id,
        address: 'Kolkata, West Bengal'
      }
    })

    // Create trains
    const rajdhani = await db.train.upsert({
      where: { trainNumber: '12301' },
      update: {},
      create: {
        trainNumber: '12301',
        trainName: 'Rajdhani Express',
        divisionId: northernRailway.id,
        originId: howrah.id,
        destinationId: newDelhi.id,
        type: 'Superfast',
        isActive: true
      }
    })

    const duronto = await db.train.upsert({
      where: { trainNumber: '12261' },
      update: {},
      create: {
        trainNumber: '12261',
        trainName: 'Duronto Express',
        divisionId: westernRailway.id,
        originId: mumbaiCentral.id,
        destinationId: newDelhi.id,
        type: 'Superfast',
        isActive: true
      }
    })

    const shatabdi = await db.train.upsert({
      where: { trainNumber: '12001' },
      update: {},
      create: {
        trainNumber: '12001',
        trainName: 'Shatabdi Express',
        divisionId: northernRailway.id,
        originId: newDelhi.id,
        destinationId: newDelhi.id,
        type: 'Superfast',
        isActive: true
      }
    })

    // Create coaches for each train
    const coachTypes = ['AC1', 'AC2', 'AC3', 'Sleeper', 'General']
    
    for (const train of [rajdhani, duronto, shatabdi]) {
      for (let i = 1; i <= 10; i++) {
        const coachType = coachTypes[Math.floor(Math.random() * coachTypes.length)]
        await db.coach.upsert({
          where: { 
            qrCode: `${train.trainNumber}-C${i.toString().padStart(2, '0')}` 
          },
          update: {},
          create: {
            coachNumber: `C${i.toString().padStart(2, '0')}`,
            trainId: train.id,
            type: coachType,
            qrCode: `${train.trainNumber}-C${i.toString().padStart(2, '0')}`,
            isActive: true
          }
        })
      }
    }

    // Create cleaning teams
    const delhiTeam1 = await db.cleaningTeam.create({
      data: {
        name: 'Delhi Cleaning Team A',
        leaderName: 'Ramesh Kumar',
        contact: '+91-9812345678',
        stationId: newDelhi.id,
        isActive: true
      }
    })

    const mumbaiTeam1 = await db.cleaningTeam.create({
      data: {
        name: 'Mumbai Cleaning Team A',
        leaderName: 'Suresh Patel',
        contact: '+91-9823456789',
        stationId: mumbaiCentral.id,
        isActive: true
      }
    })

    // Create some sample cleaning records
    const coaches = await db.coach.findMany({
      take: 10,
      include: { train: true }
    })

    for (const coach of coaches) {
      await db.cleaningRecord.create({
        data: {
          coachId: coach.id,
          teamId: coach.train.originId === newDelhi.id ? delhiTeam1.id : mumbaiTeam1.id,
          status: 'completed',
          beforePhotoUrl: `/photos/before/${coach.qrCode}.jpg`,
          afterPhotoUrl: `/photos/after/${coach.qrCode}.jpg`,
          notes: `Coach ${coach.coachNumber} cleaned successfully`,
          verifiedAt: new Date()
        }
      })
    }

    // Create admin user
    await db.admin.upsert({
      where: { email: 'admin@railclean.ai' },
      update: {},
      create: {
        email: 'admin@railclean.ai',
        name: 'System Administrator',
        role: 'admin',
        permissions: JSON.stringify(['dashboard', 'reports', 'staff', 'alerts']),
        isActive: true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      data: {
        divisions: 2,
        stations: 3,
        trains: 3,
        coaches: 30,
        cleaningTeams: 2,
        cleaningRecords: 10,
        admins: 1
      }
    })
  } catch (error) {
    console.error('Seeding error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to seed database' },
      { status: 500 }
    )
  }
}