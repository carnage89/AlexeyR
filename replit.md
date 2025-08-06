# Overview

This is a single-page landing website with an integrated admin panel for content management and Telegram bot integration for form submissions. The project is built as a full-stack application using React/Vite for the frontend and Express.js for the backend, designed to be easily deployable to Netlify with serverless functions.

The landing page features multiple sections (hero, about, services, pricing, portfolio, contact) with a contact form that sends submissions directly to a Telegram bot. The admin panel allows content editors to modify text content and manage dynamic collections like services, portfolio items, and pricing plans through a password-protected interface.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with Vite as the build tool for fast development and optimized production builds
- **Styling**: TailwindCSS with shadcn/ui component library for consistent, modern UI components
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Animations**: Framer Motion for smooth page transitions and component animations
- **Forms**: React Hook Form with Zod validation for type-safe form handling

## Backend Architecture
- **Server**: Express.js with TypeScript for type safety
- **Database**: PostgreSQL with Drizzle ORM for schema management and queries
- **Storage Interface**: Abstract storage layer with in-memory implementation for development
- **API Design**: RESTful endpoints for content management, services, portfolio, pricing, and contact submissions
- **Development Setup**: Vite middleware integration for hot reloading in development

## Authentication & Authorization
- **Admin Access**: Simple password-based authentication for admin panel access
- **Session Management**: localStorage-based token storage for admin sessions
- **Route Protection**: Client-side route guards for admin pages

## Content Management System
- **Dynamic Content**: JSON-based content storage for flexible text and media management
- **Section-based Editing**: Content organized by page sections (hero, about, services, etc.)
- **CRUD Operations**: Full create, read, update, delete operations for services, portfolio items, and pricing plans
- **Real-time Updates**: Immediate content updates using React Query cache invalidation

## Database Schema Design
- **Site Content**: Flexible JSON storage for section-based content with versioning timestamps
- **Services**: Structured data for service offerings with ordering and pricing
- **Portfolio**: Project showcase with technology tags, images, and external links
- **Pricing Plans**: Tiered pricing structure with feature lists and popularity indicators
- **Contact Submissions**: Form data storage with timestamp tracking
- **Users**: Admin user management with secure password storage

# External Dependencies

## Core Technologies
- **Neon Database**: PostgreSQL hosting service for production database
- **Drizzle ORM**: Type-safe database toolkit for schema management and queries
- **TailwindCSS**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: Pre-built component library built on Radix UI primitives

## Telegram Integration
- **Telegram Bot API**: Direct HTTP requests to Telegram's bot API for message delivery
- **Netlify Functions**: Serverless functions for secure Telegram bot communication
- **Environment Variables**: TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID for bot configuration

## Development & Deployment
- **Vite**: Build tool and development server with HMR support
- **TypeScript**: Type safety across frontend and backend code
- **ESBuild**: Fast JavaScript bundler for production builds
- **Netlify**: Static site hosting with serverless function support for Telegram integration

## UI & Animation Libraries
- **Framer Motion**: Animation library for smooth transitions and micro-interactions
- **Radix UI**: Unstyled, accessible UI primitives for complex components
- **Lucide React**: Icon library for consistent iconography
- **React Hook Form**: Form handling with built-in validation
- **Zod**: Schema validation library for type-safe data handling

## Utility Libraries
- **date-fns**: Date manipulation and formatting utilities
- **clsx & tailwind-merge**: Conditional CSS class utilities
- **nanoid**: Unique ID generation for database records