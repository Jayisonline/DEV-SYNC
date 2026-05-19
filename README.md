# DEV-SYNC

**Real-time Developer Collaboration & Streaming Platform**

A modern, full-stack Next.js application enabling developers to collaborate in real-time through live coding streams, video/audio calls, chat, and synchronized sessions. Built with cutting-edge technologies for performance, scalability, and seamless real-time experiences.

![TypeScript](https://img.shields.io/badge/TypeScript-98.4%25-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![LiveKit](https://img.shields.io/badge/LiveKit-Video%20%26%20Audio-brightgreen)

## ✨ Features

### Core Functionality
- **Live Streaming**: High-quality video/audio streaming powered by LiveKit
- **Real-time Collaboration**: Socket.io for bidirectional communication and state synchronization
- **P2P Connectivity**: WebRTC via Simple-Peer for low-latency direct connections
- **Authentication**: Secure auth with Clerk (OAuth, email, etc.)
- **User Profiles & Streams**: Prisma ORM with PostgreSQL for robust data modeling
- **Responsive UI**: Modern, accessible interface with Tailwind CSS and shadcn/ui components
- **Real-time Chat**: With moderation controls (followers-only, delayed chat, etc.)

### Technical Highlights
- **App Router** with Server and Client Components (Next.js 15 + React 19)
- **Turbopack** for lightning-fast development
- **Zustand** for lightweight, performant global state management
- **Middleware** for authentication and route protection
- **Webhooks** integration for Clerk events
- **Type-safe** throughout with TypeScript and Prisma Client

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router) + React 19
- **Styling**: Tailwind CSS v4 + PostCSS
- **UI Components**: shadcn/ui + Lucide React icons
- **State Management**: Zustand + React hooks
- **Real-time**: Socket.io-client + LiveKit Components
- **Fonts**: Geist Sans & Geist Mono

### Backend & Infrastructure
- **Database**: PostgreSQL with Prisma ORM (full-text search preview)
- **Auth**: Clerk (with custom themes and webhooks)
- **Streaming**: LiveKit (Client + Server SDK)
- **P2P**: Simple-Peer + WebRTC
- **Real-time Server**: Socket.io
- **Deployment Ready**: Optimized Next.js config

### Dev Tools
- TypeScript
- ESLint (Flat config)
- Prisma (with custom client output)
- Turbopack dev server

## 📁 Project Structure

```bash
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication routes
│   │   ├── (browse)/          # Main browsing/streaming pages
│   │   ├── api/               # API routes & webhooks
│   │   └── layout.tsx
│   ├── components/
│   │   ├── stream-player/     # Live streaming UI components
│   │   └── ui/                # Reusable shadcn components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilities & configurations
│   └── middleware.ts
├── store/                     # Zustand stores (chat, sidebar, etc.)
├── prisma/
│   └── schema.prisma          # Database models (User, Stream)
├── actions/                   # Server actions
├── public/                    # Static assets
└── components/                # Root-level components


```


## 🚀 Getting Started


### 📊 Database Schema Highlights

User Model: Synchronized with Clerk using external ID, includes username, bio, avatar, and one-to-one relation with Stream.
Stream Model: Manages live status, ingress details, thumbnail, and chat settings (delayed chat, followers-only mode).
Optimized indexes and relations designed for high-concurrency streaming scenarios.


### 🔧 Key Technical Implementations

Hybrid Rendering: Server Components for efficient data fetching + Client Components for real-time interactivity.
Optimistic Updates: Smooth user experience using Zustand and React state.
Ingress & Egress: Robust LiveKit integration for reliable video/audio streaming.
WebRTC Fallbacks: Socket.io used for signaling with Simple-Peer for direct P2P connections.
Security: Protected routes via Next.js middleware and Clerk session management.
Performance: Powered by Turbopack, React 19, and optimized bundle size.


### 🎯 Future Enhancements

Screen sharing & collaborative code editor (Yjs + CodeMirror)
Recording & Video-on-Demand (VOD) support
Multi-user rooms and breakout sessions
Advanced moderation dashboard
Analytics and insights dashboard
Mobile app support (React Native or Tauri)


### 🤝 Contributing
Contributions are welcome! Feel free to submit a Pull Request.

Fork the project
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request


Built with ❤️ for the developer community
Real-time sync. Real collaboration. Real growth.
