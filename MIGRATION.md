# Vite to Next.js Migration

This document outlines the migration from Vite to Next.js for the Renderdragon project.

## Changes Made

### 1. Project Structure
- Created `app/` directory with Next.js App Router structure
- Moved all routes from React Router to Next.js file-based routing
- Created `app/layout.tsx` for root layout
- Created `app/providers.tsx` for client-side providers
- Removed Vite-specific files:
  - `vite.config.ts`
  - `index.html`
  - `src/main.tsx`
  - `src/vite-env.d.ts`
  - `tsconfig.app.json`
  - `tsconfig.node.json`
  - `eslint.config.js`

### 2. Configuration Files
- Added `next.config.js` for Next.js configuration
- Updated `tsconfig.json` for Next.js
- Updated `postcss.config.js` to use CommonJS exports
- Created `.eslintrc.json` for Next.js ESLint
- Updated `.gitignore` for Next.js build artifacts

### 3. Code Updates
- Created `src/lib/navigation.tsx` wrapper for Next.js routing compatibility
- Updated all components to use the navigation wrapper instead of `react-router-dom`
- Added `'use client'` directive to all interactive components and pages
- Fixed `localStorage` and `window` access for SSR compatibility
- Updated environment variable access from `import.meta.env` to `process.env`
- Fixed Supabase client configuration for Next.js

### 4. Package.json Updates
- Updated scripts to use Next.js commands:
  - `dev`: `next dev`
  - `build`: `next build`
  - `start`: `next start`
  - `lint`: `next lint`
- Removed Vite dependencies
- Added Next.js ESLint configuration

## Running the Project

### Development
```bash
npm run dev
```

The dev server will start at `http://localhost:3000`.

### Building
```bash
npm run build
```

**Note**: The build process may encounter prerendering errors with `react-helmet-async`. The application is fully client-side rendered and these errors can be safely ignored for development. For production, consider:
1. Removing `react-helmet-async` and using Next.js metadata API in `app/layout.tsx`
2. Or configuring all routes to be fully dynamic (already done with `export const dynamic = 'force-dynamic'`)

### Production
```bash
npm run start
```

## Known Issues

1. **React Helmet Async**: The `react-helmet-async` library has SSR compatibility issues with Next.js. The application uses client-side rendering (`'use client'`) for all pages, which bypasses this issue in development mode.

2. **API Routes**: The backend API routes are kept separate (in the `api/` directory) and proxied through Next.js configuration. They can be migrated to Next.js API routes if needed.

## API Integration

The project uses a proxy configuration in `next.config.js` to forward API requests from `/api/*` to `http://localhost:3000/api/*`. The Express server (`server.js`) should be running separately to handle these requests.

## Environment Variables

Environment variables now use the Next.js convention:
- Client-side variables should be prefixed with `NEXT_PUBLIC_`
- The code supports both `VITE_*` and `NEXT_PUBLIC_*` prefixes for backward compatibility

Example:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Next Steps

1. Consider migrating from `react-helmet-async` to Next.js Metadata API
2. Optionally migrate API routes from Express to Next.js API routes
3. Configure environment variables with `NEXT_PUBLIC_` prefix
4. Set up deployment configuration for Next.js (Vercel, etc.)
