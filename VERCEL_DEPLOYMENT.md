# Vercel Deployment Guide

## What was fixed

### 1. **Build Configuration** (`vite.config.ts`)
- Disabled Cloudflare plugin: `cloudflare: false`
- Restored TanStack Start configuration with proper SSR setup
- App now builds with Vercel-compatible output

### 2. **API Handler** (`api/ssr.ts`)
- Created Vercel Edge Function that:
  - Imports the compiled server handler directly
  - Routes all requests through the SSR handler
  - Returns proper HTML responses with error handling

### 3. **Asset Management** 
- Created `scripts/prepare-vercel.mjs` to copy client assets to `public/assets/`
- Assets are now statically served by Vercel with cache headers
- App can reference assets at `/assets/[filename]`

### 4. **Vercel Configuration** (`vercel.json`)
- Configured rewrites to route requests through `/api/ssr`
- Static assets are served from `/assets/`

### 5. **Build Script** (`package.json`)
- Added `vercel-build` command: `npm run build && node ./scripts/prepare-vercel.mjs`
- Vercel automatically uses this for deployment

## How to Deploy

### Option 1: Push to GitHub and connect to Vercel
```bash
# In your Vercel dashboard:
# 1. Import project from GitHub
# 2. Vercel auto-detects package.json
# 3. Set Build Command: npm run vercel-build
# 4. Deploy
```

### Option 2: Deploy locally with Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Deployment Checklist

✅ Build command set to: `npm run vercel-build`
✅ Output directory: Default (root)
✅ Environment: Node.js 18+
✅ Static assets: `public/assets/` directory
✅ API function: `api/ssr.ts` (Edge Function)

## Expected Result

- **Production URL**: Your Vercel deployment
- **Routes handled by**: `/api/ssr` SSR function
- **Static assets served**: From `/assets/` path
- **No more white screen**: HTML renders server-side + client hydrates

## Troubleshooting

### If you still see a white screen:
1. Check Vercel function logs: `vercel logs`
2. Check browser console for errors (F12)
3. Verify assets load: Open DevTools Network tab
4. Run local build: `npm run vercel-build`

### If assets 404:
1. Verify `public/assets/` directory exists
2. Check `vercel.json` rewrites are correct
3. Run: `npm run vercel-build` to regenerate

## Local Testing

```bash
# Build for production
npm run vercel-build

# Test the built output
npm install -g vercel
vercel dev
```

Then visit `http://localhost:3000`
