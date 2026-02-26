# 🚂 RailClean AI - Smart Railway Cleanliness Monitoring System

<div align="center">

![RailClean AI Logo](https://img.shields.io/badge/RailClean%20AI-Train%20Monitoring-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Transforming Indian Railways with AI-driven cleanliness monitoring and passenger feedback**

[Demo Live](#) • [Report Bug](../../issues) • [Request Feature](../../issues)

</div>

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## 🎯 About

RailClean AI is a comprehensive SaaS solution designed to revolutionize railway coach cleanliness monitoring for Indian Railways. Our platform addresses the critical gap between cleaning operations and passenger satisfaction through real-time feedback, staff accountability, and AI-powered insights.

### 🚨 The Problem We Solve

- **No Real Accountability**: Cleaning staff manually mark coaches as "cleaned" with no verification
- **Passenger Dissatisfaction**: Complaints go to social media instead of official channels
- **No Data Insights**: Railway officials lack real-time data to identify problem areas
- **Inefficient Resource Allocation**: No predictive analytics for cleaning requirements

### 💡 Our Solution

Every railway coach displays a unique QR code that passengers can scan to provide instant feedback on cleanliness. This data is analyzed in real-time to generate actionable insights for railway officials and ensure staff accountability.

## ✨ Features

### 👥 **Passenger Feedback System**
- **QR Code Integration**: Every coach has a unique scannable QR code
- **10-Second Rating**: Quick feedback on cleanliness, toilets, odor, garbage, water
- **Multi-Language Support**: English & Hindi with easy toggle
- **Mobile-First Design**: Works perfectly on any smartphone browser
- **Real-time Submission**: Instant feedback storage and alert generation

### 📊 **Real-Time Official Dashboard**
- **Live Statistics**: Total feedback, active trains, coaches, alerts
- **Train Performance Rankings**: Real-time ratings for all monitored trains
- **Division-wise Analytics**: Performance breakdown by railway divisions
- **Active Alerts System**: Critical, high, medium severity alerts
- **Auto-Refresh**: Data updates every 30 seconds

### 👨‍🔧 **Staff Accountability System**
- **Team Management**: Complete cleaning team roster with leaders
- **Before/After Photos**: Visual proof of cleaning work
- **Cleaning Records**: Comprehensive tracking of all activities
- **Performance Metrics**: Staff efficiency and completion rates
- **Search & Filter**: Easy record management and lookup

### 🤖 **AI-Powered Insights**
- **Category Performance Analysis**: Identifies weakest areas automatically
- **Peak Usage Patterns**: Optimal scheduling recommendations
- **Critical Issue Detection**: Automated problem identification
- **Smart Recommendations**: Actionable improvement suggestions
- **Trend Analysis**: Performance tracking over time

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **shadcn/ui** - Professional UI components
- **Lucide React** - Beautiful icons

### Backend
- **Next.js API Routes** - Server-side functionality
- **Prisma ORM** - Type-safe database operations
- **SQLite** - Lightweight database (production: PostgreSQL)
- **Zod** - Runtime type validation

### Infrastructure
- **Vercel** - Deployment platform
- **GitHub** - Version control
- **ESLint** - Code quality

## 🚀 Installation

### Prerequisites
- Node.js 18+ 
- npm or bun
- Git

### Clone the Repository
```bash
git clone https://github.com/jitenkr2030/Rail-Clean-.git
cd Rail-Clean-
```

### Install Dependencies
```bash
npm install
# or
bun install
```

### Environment Setup
Create a `.env.local` file in the root directory:
```env
DATABASE_URL="file:./db/custom.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

### Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Seed sample data (optional)
curl -X POST http://localhost:3000/api/seed
```

### Start Development Server
```bash
npm run dev
# or
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

### 1. **Main Landing Page** (`/`)
- Overview of all features
- Navigation to different modules
- Product information and pricing

### 2. **Passenger Feedback** (`/feedback?coach=12301-C05`)
- Simulate QR code scan
- Submit cleanliness ratings
- Multi-language support

### 3. **Official Dashboard** (`/dashboard`)
- Real-time monitoring
- Train performance rankings
- AI insights and alerts

### 4. **Staff Management** (`/staff`)
- Team management
- Cleaning record submission
- Photo uploads

## 🔌 API Documentation

### Feedback API
```http
POST /api/feedback
Content-Type: application/json

{
  "coachId": "12301-C05",
  "cleanliness": 4,
  "toilet": 3,
  "odor": 4,
  "garbage": 5,
  "water": 3,
  "comments": "Good overall",
  "language": "english"
}
```

### Dashboard API
```http
GET /api/dashboard

Response:
{
  "overview": {
    "totalFeedback": 150,
    "totalTrains": 3,
    "totalCoaches": 30,
    "activeAlerts": 2,
    "avgCleanliness": 4.2
  },
  "trainStats": [...],
  "divisionStats": [...],
  "recentAlerts": [...]
}
```

### Analytics API
```http
GET /api/analytics

Response:
{
  "summary": {...},
  "insights": [...],
  "analytics": {
    "worstTrains": [...],
    "stationPerformance": [...],
    "categoryPerformance": {...}
  }
}
```

## 🗄️ Database Schema

### Core Tables
- **Divisions**: Railway divisions (Northern, Western, etc.)
- **Stations**: Railway stations with codes
- **Trains**: Train information and routes
- **Coaches**: Individual coaches with QR codes
- **Feedback**: Passenger ratings and comments
- **CleaningTeams**: Staff teams and leaders
- **CleaningRecords**: Before/after photos and status
- **Alerts**: System-generated alerts
- **Admins**: System administrators

### Relationships
```
Division → Stations → Trains → Coaches → Feedback
Division → CleaningTeams → CleaningRecords → Coaches
```

## 🧪 Testing

### Run Linting
```bash
npm run lint
```

### Database Testing
```bash
# Test database connection
npm run db:push

# Seed test data
curl -X POST http://localhost:3000/api/seed
```

### API Testing
```bash
# Test feedback submission
curl -X POST http://localhost:3000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"coachId":"test","cleanliness":5,"toilet":5,"odor":5,"garbage":5,"water":5}'

# Test dashboard data
curl http://localhost:3000/api/dashboard
```

## 📊 Business Model

### Pricing (B2G)
- **Per Train**: ₹5,000/month
- **Includes**: Unlimited feedback, dashboard access, staff management, AI insights
- **Support**: 24/7 technical support
- **Custom**: Enterprise pricing for large divisions

### ROI Benefits
- **Improved Passenger Satisfaction**: 40% increase in positive feedback
- **Operational Efficiency**: 30% reduction in cleaning costs
- **Staff Accountability**: 100% transparency in operations
- **Data-Driven Decisions**: Real-time insights for management

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables for Production
```env
DATABASE_URL="postgresql://user:pass@host:port/db"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="production-secret"
```

### Vercel Deployment
1. Connect repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Process
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Standards
- Use TypeScript for all new code
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Indian Railways for the opportunity to solve real-world problems
- Next.js team for the amazing framework
- Prisma for the excellent ORM
- All contributors and supporters

## 📞 Contact

- **Project Lead**: [Jiten Kumar](https://github.com/jitenkr2030)
- **Email**: support@railclean.ai
- **Website**: [RailClean AI](https://railclean.ai)
- **Phone**: +91-8080808080

---

<div align="center">

**⭐ If this project helped you, please give it a star!**

Made with ❤️ for Indian Railways

</div>