# Vercel Deployment Troubleshooting & Configuration Guide

## Issues Fixed

### ✅ Issue 1: Syntax Error in api/ssr.ts
**Problem**: Extra closing brace causing syntax error
**Fix**: Removed the extra brace

### ✅ Issue 2: TypeScript API Handler Issue  
**Problem**: Vercel prefers JavaScript in /api directory
**Fix**: Created `api/ssr.js` (JavaScript version) with better error handling
- Multiple import path fallbacks
- Clear error messages for debugging
- Proper validation of server handler

### ✅ Issue 3: Missing Runtime Specification
**Problem**: Vercel didn't know which Node.js version to use
**Fix**: Added `"runtime": "nodejs20.x"` to vercel.json

### ✅ Issue 4: Incomplete .vercelignore
**Problem**: Unclear what files to include/exclude
**Fix**: Properly configured to:
- Exclude source files (src/)
- Exclude git files (.git, .gitignore)
- Include build output (dist/, public/)

### ✅ Issue 5: Missing Error Context
**Problem**: Silent failures made debugging impossible
**Fix**: Enhanced error handler with:
- Multiple import path attempts
- Detailed error messages
- HTML error page with debugging info

---

## Files Modified
```
✅ api/ssr.js (NEW) - JavaScript handler with fallbacks
✅ api/ssr.ts - Keep this for reference (can delete later)
✅ vercel.json - Updated to use api/ssr.js with proper config
✅ .vercelignore - Properly configured
```

---

## Deployment Steps

### Step 1: Test Locally
```bash
# Terminal 1: Start backend (from backend/ directory)
cd backend
npm run dev

# Terminal 2: Start frontend (from root)
npm run dev
```
**Expected**: App loads at http://localhost:8081 without CORS errors

### Step 2: Test Build
```bash
npm run vercel-build
```
**Expected Output**:
```
✓ Built with vite
✓ Copied client assets to public/assets for Vercel deployment.
```

Verify files exist:
```bash
ls dist/server/        # Should have index.mjs or similar
ls public/assets/      # Should have CSS/JS files
```

### Step 3: Deploy to Vercel
```bash
git add .
git commit -m "Fix Vercel deployment: use JavaScript API handler + proper config"
git push origin main
```

### Step 4: Monitor Deployment
1. Go to Vercel Dashboard
2. Click on latest deployment
3. Check **Function Logs** tab (not Build Logs)
4. Wait for "Deployment Complete"

---

## What to Check if Deployment Still Fails

### Check #1: Build Output
```bash
npm run build 2>&1 | tail -50  # Show last 50 lines of build output
ls -la dist/server/           # List server output files
```

### Check #2: Vercel Logs
In Vercel Dashboard:
- **Build Logs** → Shows npm run build output
- **Function Logs** → Shows errors when function runs
- Look for "Cannot find module" or import errors

### Check #3: Environment Variables
In Vercel Project Settings:
- Check that VITE_API_URL is set
- Check that NODE_ENV = production

### Check #4: Function Configuration
Verify in vercel.json:
```json
{
  "functions": {
    "api/ssr.js": {
      "runtime": "nodejs20.x",
      "maxDuration": 30
    }
  }
}
```

---

## Common Issues & Solutions

### Issue: "Cannot find module ../dist/server/index.mjs"
**Cause**: Build process didn't create server file
**Solution**: 
- Run `npm run build` locally and verify dist/ exists
- Check vite.config.ts tanstackStart configuration
- Delete .vercel and dist/, rebuild: `rm -rf dist && npm run build`

### Issue: "serverHandler is not a function"
**Cause**: Server exported wrong format
**Solution**:
- Check that src/server.ts properly exports default function
- Verify server.ts imports from @tanstack/react-start/server-entry

### Issue: "404 NOT_FOUND" at root URL
**Cause**: 
- Rewrites not working
- All routes going to api/ssr without proper fallback
**Solution**:
- Verify rewrites in vercel.json are ordered correctly
- Check that api/ssr.js is deployed
- Check Function Logs for actual error

---

## If Everything is Deployed but Still 404

Try this debug command (requires Vercel CLI):
```bash
npx vercel --version                    # Check CLI installed
npx vercel inspect <deployment-id>      # Get deployment details
npx vercel logs <project-name>          # View function logs
```

---

## Important Notes

1. **Keep api/ssr.js updated** - This is the production handler
2. **Don't delete api/ssr.ts** yet - Keeping both for now is fine
3. **Vercel rebuilds on push** - Every git push to main triggers rebuild
4. **Check Function Logs** - Build logs don't show runtime errors
5. **Clear cache** - If issues persist, in Vercel: Settings → Caching → Clear

---

## Success Indicators

✅ Vercel shows "Deployment Complete"  
✅ Clicking the deployment URL shows your app (not 404)  
✅ Function Logs show no error imports  
✅ Visiting /api/ssr directly shows error page (expected) not 404  
✅ Frontend loads and can reach backend API  

Your deployment is ready when all above are checked!
