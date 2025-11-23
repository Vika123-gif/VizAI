# Moodboard to Photorealistic Render

## Overview

This is a web application that transforms moodboard images into photorealistic interior design renders using Google's Gemini AI image generation capabilities. Users upload a moodboard showcasing their desired aesthetic (colors, furniture styles, materials) and the system generates a professional-quality photorealistic render matching that design vision.

The application provides a clean, dark-themed interface optimized for creative workflow, drawing inspiration from professional design tools like Figma and Linear.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server with hot module replacement
- Wouter for lightweight client-side routing

**UI Component System:**
- shadcn/ui components (New York style) built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Dark mode as the primary theme with HSL-based color system
- Custom spacing primitives (4, 6, 8, 12) for consistent rhythm

**State Management:**
- TanStack Query (React Query) for server state and API caching
- Local React state for UI interactions and file handling
- Toast notifications for user feedback

**Design Approach:**
The application follows a utility-focused design with professional dark interface. The layout uses a two-column grid on desktop (upload controls on left, preview panel on right) that collapses to single column on mobile. Key design elements include large, prominent upload areas with dashed borders, pill-shaped model selectors, and Inter font for modern typography.

### Backend Architecture

**Server Framework:**
- Express.js for HTTP server and API routing
- Separate development (Vite middleware) and production (static file serving) entry points
- Custom logging middleware for request/response tracking

**API Structure:**
- RESTful endpoint: `POST /api/generate` for render generation
- Request validation for image data and MIME types
- Base64 image encoding for data transfer
- Support for PNG, JPEG, and WEBP formats (up to 5MB)

**Image Processing Flow:**
1. Client uploads moodboard and empty space images via drag-and-drop or file input
2. Images converted to base64 data URLs
3. Backend extracts MIME type and base64 data
4. Images sent to Gemini API with structured prompt
5. Generated render returned as base64 data URL

### External Dependencies

**AI/ML Services:**
- Google Gemini AI (`@google/genai`) - Primary service for image generation
- Model: `gemini-2.0-flash-preview-image-generation` - Specialized for photorealistic interior render generation
- API key required via `GEMINI_API_KEY` environment variable

**Database:**
- PostgreSQL configured via Drizzle ORM
- Neon Database serverless driver (`@neondatabase/serverless`)
- Database URL required via `DATABASE_URL` environment variable
- Schema includes user table (currently in-memory storage used)
- Session management prepared with `connect-pg-simple`

**UI Component Libraries:**
- Radix UI - Unstyled, accessible component primitives (accordion, dialog, dropdown, select, toast, tooltip, etc.)
- Lucide React - Icon library for UI elements
- date-fns - Date manipulation and formatting
- cmdk - Command palette component
- embla-carousel-react - Carousel functionality
- react-day-picker - Calendar component
- recharts - Charting library

**Form Management:**
- React Hook Form with Zod resolver for validation
- Drizzle-Zod for schema-based validation

**Development Tools:**
- Replit-specific plugins for development banner, error overlay, and cartographer
- TypeScript for type checking
- ESBuild for production bundling
- Drizzle Kit for database migrations

**Architectural Decisions:**

1. **Separation of Development and Production:** Two separate entry points (`index-dev.ts` and `index-prod.ts`) allow for Vite middleware in development and optimized static serving in production.

2. **In-Memory Storage Pattern:** Currently uses `MemStorage` class implementing `IStorage` interface, designed to be swapped with database-backed storage when needed.

3. **Component-Based UI:** Leverages shadcn/ui pattern of copying components into the project for full customization while maintaining consistency.

4. **API-First Image Processing:** Images processed entirely through API calls rather than client-side manipulation, ensuring consistent results and offloading compute to AI service.

5. **Single Model Strategy:** Currently supports only Gemini's image generation model, as it's the only one capable of photorealistic interior render generation from conditioning images.