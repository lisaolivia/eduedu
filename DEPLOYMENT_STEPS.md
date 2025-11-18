# 🚀 Step-by-Step Deployment Guide

## ✅ Pre-Deployment Checklist

Before deploying, ensure:
- [x] All code is committed and pushed to GitHub
- [x] `.env` files are NOT in repository (they're in `.gitignore`)
- [x] Environment variables are prepared locally
- [x] MongoDB Atlas database is ready
- [x] WeatherAPI key is obtained
- [x] Redis instance is ready (optional, but recommended)

---

## 📦 Part 1: Deploy Backend to Railway

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub
3. Authorize Railway to access your repositories

### Step 2: Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your repository: `lisaolivia/eduedu`
4. Railway will auto-detect Node.js

### Step 3: Configure Environment Variables
1. In Railway dashboard, click on your service
2. Go to **"Variables"** tab
3. Click **"New Variable"** and add each one:

```env
PORT=5000
NODE_ENV=production
MONGO_URI=your-mongodb-connection-string-here
JWT_SECRET=your-super-secret-jwt-key-here
WEATHERAPI_KEY=your-weather-api-key-here
SCHOOL_LAT=-7.7956
SCHOOL_LON=110.3695
WEATHER_CHECK_HOUR=9
WEATHER_CHECK_MINUTE=0
FRONTEND_URL=https://your-netlify-site.netlify.app
REDIS_URL=your-redis-url-here (optional)
DEFAULT_CACHE_TTL=300
```

**Important Notes:**
- Replace all placeholder values with your actual values
- For `JWT_SECRET`, generate a strong random string (you can use: `openssl rand -base64 32`)
- For `FRONTEND_URL`, you'll update this after deploying frontend
- `REDIS_URL` is optional - app will work without it (caching disabled)

### Step 4: Verify Build Settings
Railway should auto-detect, but verify:
- **Build Command**: `npm install` (auto-detected)
- **Start Command**: `npm start` (from `railway.json`)
- **Root Directory**: `/` (root of repo)

### Step 5: Deploy
1. Railway will automatically start building
2. Watch the **"Deployments"** tab for build logs
3. Wait for deployment to complete (usually 2-5 minutes)

### Step 6: Get Backend URL
1. After successful deployment, go to **"Settings"** tab
2. Under **"Domains"**, Railway provides a URL like:
   ```
   https://your-app-name.up.railway.app
   ```
3. **Copy this URL** - you'll need it for frontend!

### Step 7: Test Backend
1. Open the Railway URL in browser
2. You should see: `{"msg":"API jalan bro"}`
3. Test health endpoint: `https://your-app-name.up.railway.app/`

---

## 🌐 Part 2: Deploy Frontend to Netlify

### Step 1: Create Netlify Account
1. Go to https://app.netlify.com
2. Sign up with GitHub
3. Authorize Netlify to access your repositories

### Step 2: Deploy from GitHub
1. Click **"Add new site"** → **"Import an existing project"**
2. Select **"Deploy with GitHub"**
3. Authorize Netlify (if needed)
4. Choose your repository: `lisaolivia/eduedu`

### Step 3: Configure Build Settings
Netlify should auto-detect from `netlify.toml`, but verify:
- **Base directory**: `frontend`
- **Build command**: `npm install && npm run build`
- **Publish directory**: `.next`

### Step 4: Configure Environment Variables
1. Before deploying, click **"Show advanced"**
2. Click **"New variable"** and add:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-railway-app.up.railway.app
```

**Important:** Use the Railway backend URL you copied in Part 1, Step 6!

### Step 5: Deploy
1. Click **"Deploy site"**
2. Watch the build logs
3. Wait for deployment (usually 3-5 minutes)

### Step 6: Get Frontend URL
1. After deployment, Netlify provides a URL like:
   ```
   https://random-name-12345.netlify.app
   ```
2. **Copy this URL** - you'll need it for backend CORS!

### Step 7: Update Backend CORS
1. Go back to Railway dashboard
2. Go to your service → **"Variables"** tab
3. Find `FRONTEND_URL` variable
4. Click **"Edit"** and update to:
   ```
   https://your-netlify-site.netlify.app
   ```
5. Railway will automatically redeploy with new CORS settings

---

## ✅ Post-Deployment Verification

### Test Backend
1. Open Railway URL: `https://your-app.up.railway.app`
2. Should see: `{"msg":"API jalan bro"}`
3. Test API endpoint: `https://your-app.up.railway.app/api/auth/ping`

### Test Frontend
1. Open Netlify URL: `https://your-site.netlify.app`
2. Should see landing page
3. Try logging in (if you have test accounts)

### Test Integration
1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Try logging in on frontend
4. Check if API calls to Railway backend are successful
5. Check for CORS errors in console

---

## 🔧 Troubleshooting

### Backend Issues

**MongoDB Connection Failed**
- Check `MONGO_URI` in Railway variables
- Ensure MongoDB Atlas allows connections from Railway IPs
- In MongoDB Atlas → Network Access → Add IP: `0.0.0.0/0` (allow all)

**CORS Errors**
- Verify `FRONTEND_URL` in Railway includes your Netlify URL
- Check browser console for specific CORS error
- Ensure backend allows credentials

**Port Issues**
- Railway automatically sets `PORT` - don't override it
- Check Railway logs for port conflicts

### Frontend Issues

**API Calls Failing**
- Check `NEXT_PUBLIC_API_BASE_URL` in Netlify variables
- Verify Railway backend URL is correct
- Check browser Network tab for failed requests
- Ensure CORS is configured on backend

**Build Errors**
- Check Netlify build logs
- Ensure Node version is 18+
- Clear `.next` folder and rebuild locally first

**Environment Variables Not Working**
- Next.js requires `NEXT_PUBLIC_` prefix for client-side vars
- Rebuild after changing env vars
- Check Netlify build logs

### Redis Issues

**Redis Connection Failed**
- Redis is optional - app works without it
- Check Railway logs for Redis errors
- If Redis fails, caching is disabled but app continues

---

## 📝 Environment Variables Summary

### Backend (Railway) - Required
```
PORT=5000
NODE_ENV=production
MONGO_URI=...
JWT_SECRET=...
WEATHERAPI_KEY=...
SCHOOL_LAT=...
SCHOOL_LON=...
FRONTEND_URL=...
```

### Backend (Railway) - Optional
```
REDIS_URL=... (optional)
DEFAULT_CACHE_TTL=300
WEATHER_CHECK_HOUR=9
WEATHER_CHECK_MINUTE=0
```

### Frontend (Netlify) - Required
```
NEXT_PUBLIC_API_BASE_URL=https://your-railway-app.up.railway.app
```

---

## 🎉 Success!

If everything works:
- ✅ Backend is accessible at Railway URL
- ✅ Frontend is accessible at Netlify URL
- ✅ Frontend can communicate with backend
- ✅ No CORS errors
- ✅ Login works
- ✅ All features work

**Your app is now live! 🚀**

---

## 📞 Need Help?

1. Check Railway logs: Dashboard → Deployments → View logs
2. Check Netlify logs: Site → Deploys → View build log
3. Check browser console for frontend errors
4. Check Network tab for API call issues

