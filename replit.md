# Electromagnetic Wave Visualization App

## Overview

An interactive educational web application for visualizing and exploring the electromagnetic spectrum. The application allows users to dynamically adjust wave properties (frequency, wavelength, energy) using sliders and see real-time visual representations, classifications, and practical applications of different electromagnetic wave types. The interface adapts its appearance based on the selected wave type, transitioning from white backgrounds (radio waves) to pure black (gamma rays), creating an immersive learning experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**Routing**: Wouter for lightweight client-side routing with a simple single-page structure (Home page + 404)

**UI Component System**: 
- Shadcn/ui component library (New York style variant)
- Radix UI primitives for accessible component foundations
- Tailwind CSS for styling with custom design system
- CSS variables for dynamic theming and color transitions

**State Management**:
- React hooks for local component state
- TanStack Query (React Query) for server state management
- No global state management library (app is primarily client-side with minimal server interaction)

**Design System**:
- Wave-adaptive interface with backgrounds that change based on electromagnetic spectrum position
- Dynamic color system transitioning from white (radio) → gray (microwave) → red (infrared) → rainbow (visible) → purple (UV) → dark blue (X-ray) → black (gamma)
- Typography using system fonts (Roboto family) for performance
- Responsive layout optimized for landscape orientation

**Key Components**:
- `WaveCanvas`: Canvas-based animated wave visualization with frequency-dependent rendering
- `WavePropertiesCard`: Displays scientific notation values for energy, frequency, and wavelength
- `WaveClassificationCard`: Shows wave type classification and size comparisons
- `ApplicationsCard`: Lists practical applications and safety information
- `MathGraph`: Canvas-based mathematical relationship visualization
- `ParticleField`: Animated particle background effect

### Backend Architecture

**Runtime**: Node.js with Express.js

**Build System**: 
- Development: tsx for TypeScript execution
- Production: esbuild for bundling server code
- ESM modules throughout

**Server Structure**:
- Minimal REST API setup (currently placeholder routes)
- Vite middleware integration for development hot module replacement
- Custom logging middleware for API request tracking

**Storage Layer**:
- In-memory storage implementation (`MemStorage`) as the default
- Abstracted storage interface (`IStorage`) for potential database integration
- User model defined but not actively used (placeholder for future features)

### Data Storage Solutions

**Current Implementation**: In-memory storage with a clean interface pattern

**Database Schema** (Drizzle ORM with PostgreSQL):
- Configured but not actively used in current implementation
- `users` table with UUID primary keys, username, and password fields
- Drizzle Kit configured for migrations in `./migrations` directory
- Neon serverless PostgreSQL driver specified

**Data Flow**:
- Application is primarily client-side with calculations performed in the browser
- No persistent user data or session management currently implemented
- Physics calculations (wavelength, frequency, energy conversions) computed client-side using constants

### Authentication and Authorization

**Current State**: No authentication implemented

**Prepared Infrastructure**:
- User schema defined in `shared/schema.ts`
- Storage interface includes user CRUD methods
- Session infrastructure not configured (though connect-pg-simple is available in dependencies)

### Design Patterns

**Component Composition**: Extensive use of shadcn/ui's composable component pattern with Radix UI primitives

**Custom Hooks**: 
- `use-mobile`: Responsive breakpoint detection
- `use-toast`: Toast notification management

**Canvas Rendering**: Direct canvas manipulation for performance-critical animations (wave visualization, particle effects, mathematical graphs)

**Path Aliases**: TypeScript path mapping for clean imports:
- `@/` → `client/src/`
- `@shared/` → `shared/`
- `@assets/` → `attached_assets/`

**Monorepo Structure**: Client and server code separated but sharing TypeScript types through `shared/` directory

## External Dependencies

### Core Framework & Build Tools
- **React 18**: UI framework
- **Vite**: Frontend build tool and dev server
- **TypeScript**: Type safety across frontend and backend
- **Express.js**: Backend web server
- **esbuild**: Production server bundling

### UI Component Libraries
- **Radix UI**: Comprehensive set of unstyled, accessible component primitives (@radix-ui/react-*)
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library built on Radix UI
- **class-variance-authority**: Type-safe variant styling
- **Lucide React**: Icon library

### Data Management
- **TanStack Query (React Query)**: Server state management and data fetching
- **React Hook Form**: Form state management (@hookform/resolvers)
- **Zod**: Schema validation (used with Drizzle)

### Database & ORM
- **Drizzle ORM**: TypeScript ORM for PostgreSQL
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver
- **drizzle-zod**: Zod schema generation from Drizzle schemas
- **connect-pg-simple**: PostgreSQL session store for Express (not actively used)

### Animation & Interaction
- **Embla Carousel**: Carousel component library
- **cmdk**: Command palette component
- **Vaul**: Drawer component library

### Development Tools
- **Wouter**: Lightweight routing library
- **date-fns**: Date manipulation utilities
- **nanoid**: Unique ID generation
- **@replit/vite-plugin-***: Replit-specific development tooling

### Styling Dependencies
- **clsx & tailwind-merge**: Conditional className utilities
- **autoprefixer & postcss**: CSS processing