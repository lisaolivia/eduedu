# Deployment Guide

This guide will help you deploy EduSafe backend to Railway and frontend to Netlify.

## Prerequisites

- GitHub account
- Railway account (https://railway.app)
- Netlify account (https://netlify.com)
- MongoDB Atlas account (or your MongoDB instance)
- Redis instance (optional, for caching)
- WeatherAPI key (https://www.weatherapi.com/)

## Backend Deployment (Railway)

### Step 1: Prepare Repository

1. Ensure all code is committed and pushed to GitHub
2. Make sure `.env` file is NOT committed (it's in `.gitignore`)

### Step 2: Deploy to Railway

1. Go to https://railway.app and sign in
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Railway will automatically detect Node.js

### Step 3: Configure Environment Variables

In Railway dashboard, go to your service → Variables tab and add:

```env
PORT=5000
NODE_ENV=production
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secret-jwt-key
WEATHERAPI_KEY=your-weather-api-key
SCHOOL_LAT=-7.7956
SCHOOL_LON=110.3695
WEATHER_CHECK_HOUR=9
WEATHER_CHECK_MINUTE=0
FRONTEND_URL=https://your-frontend-domain.netlify.app
REDIS_URL=your-redis-url (optional)
DEFAULT_CACHE_TTL=300
```

### Step 4: Configure Build Settings

Railway should auto-detect, but verify:
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Root Directory**: `/` (root of repo)

### Step 5: Get Backend URL

After deployment, Railway will provide a URL like:
`https://your-app-name.railway.app`

Copy this URL - you'll need it for frontend configuration.

---

## Frontend Deployment (Netlify)

### Step 1: Prepare Frontend

1. Ensure all code is committed
2. The `netlify.toml` file is already configured

### Step 2: Deploy to Netlify

**Option A: Via Netlify Dashboard**

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `frontend/.next`
5. Click "Deploy site"

**Option B: Via Netlify CLI**

```bash
cd frontend
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### Step 3: Configure Environment Variables

In Netlify dashboard → Site settings → Environment variables, add:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.railway.app
```

**Important**: Use the Railway backend URL you copied earlier.

### Step 4: Update Backend CORS

Go back to Railway and update the `FRONTEND_URL` environment variable:

```env
FRONTEND_URL=https://your-netlify-site.netlify.app
```

If you have multiple frontend URLs, separate them with commas:
```env
FRONTEND_URL=https://your-netlify-site.netlify.app,http://localhost:3000
```

---

## Local Testing Before Deployment

### Backend Testing

1. Create `.env` file in root directory (copy from `.env.example`)
2. Fill in all required variables
3. Run:
   ```bash
   npm install
   npm run dev
   ```
4. Test API: `http://localhost:5000`

### Frontend Testing

1. Create `frontend/.env.local` file (copy from `frontend/.env.example`)
2. Set `NEXT_PUBLIC_API_BASE_URL=http://localhost:5000`
3. Run:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
4. Test frontend: `http://localhost:3000`

### Integration Testing

1. Start backend: `npm run dev` (port 5000)
2. Start frontend: `cd frontend && npm run dev` (port 3000)
3. Test login, navigation, and API calls
4. Check browser console for errors
5. Check backend logs for errors

---

## Post-Deployment Checklist

- [ ] Backend is accessible at Railway URL
- [ ] Frontend is accessible at Netlify URL
- [ ] Environment variables are set correctly
- [ ] CORS is configured properly
- [ ] MongoDB connection is working
- [ ] Redis connection is working (if used)
- [ ] Weather API is working
- [ ] Authentication is working
- [ ] All API endpoints are accessible
- [ ] Frontend can communicate with backend

---

## Troubleshooting

### Backend Issues

**MongoDB Connection Failed**
- Check `MONGO_URI` is correct
- Ensure MongoDB Atlas allows connections from Railway IPs (0.0.0.0/0)
- Check MongoDB credentials

**CORS Errors**
- Verify `FRONTEND_URL` includes your Netlify URL
- Check browser console for specific CORS error
- Ensure backend allows credentials

**Port Issues**
- Railway automatically sets `PORT` - don't hardcode it
- Use `process.env.PORT || 5000` in code

### Frontend Issues

**API Calls Failing**
- Check `NEXT_PUBLIC_API_BASE_URL` is set correctly
- Verify backend URL is accessible
- Check browser Network tab for failed requests
- Ensure CORS is configured on backend

**Build Errors**
- Check Node version (should be 18+)
- Clear `.next` folder and rebuild
- Check for missing dependencies

**Environment Variables Not Working**
- Next.js requires `NEXT_PUBLIC_` prefix for client-side vars
- Rebuild after changing env vars
- Check Netlify build logs

---

## Security Notes

1. **Never commit `.env` files**
2. **Use strong JWT_SECRET** (generate with: `openssl rand -base64 32`)
3. **Use HTTPS** in production (Railway and Netlify provide this)
4. **Restrict MongoDB access** to specific IPs when possible
5. **Use environment-specific variables** (development vs production)

---

## Support

If you encounter issues:
1. Check Railway logs: Dashboard → Deployments → View logs
2. Check Netlify logs: Site → Deploys → View build log
3. Check browser console for frontend errors
4. Check Network tab for API call issues

