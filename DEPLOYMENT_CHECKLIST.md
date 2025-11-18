# ✅ Final Deployment Checklist

## 🔍 Pre-Deployment Code Verification

### Backend Verification
- [x] ✅ `src/server.js` - Error handler in correct position
- [x] ✅ `src/server.js` - CORS configured for production
- [x] ✅ `src/server.js` - PORT has default value
- [x] ✅ `src/server.js` - 404 handler added
- [x] ✅ `package.json` - Has `start` script for production
- [x] ✅ `railway.json` - Uses `npm start` (not `npm run dev`)
- [x] ✅ `src/lib/redis.js` - Redis is optional, won't crash if not configured
- [x] ✅ `src/middlewares/cache.js` - Handles Redis errors gracefully
- [x] ✅ All environment variables use `process.env` (no hardcoded values)

### Frontend Verification
- [x] ✅ `frontend/lib/api.js` - Has fallback for API URL
- [x] ✅ `frontend/lib/api.js` - Handles missing env vars
- [x] ✅ `frontend/next.config.mjs` - Configured for Netlify
- [x] ✅ `netlify.toml` - Build settings correct
- [x] ✅ All weather pages use correct API paths
- [x] ✅ No hardcoded localhost URLs in production code

### Security Verification
- [x] ✅ `.env` files are in `.gitignore`
- [x] ✅ `.env.local` files are in `.gitignore`
- [x] ✅ No secrets in code
- [x] ✅ JWT_SECRET uses environment variable
- [x] ✅ MongoDB URI uses environment variable

### Configuration Files
- [x] ✅ `railway.json` - Correct start command
- [x] ✅ `netlify.toml` - Correct build settings
- [x] ✅ `.gitignore` - Excludes sensitive files

---

## 📋 Environment Variables Checklist

### Backend (.env) - Copy to Railway Variables
```
✅ PORT=5000
✅ NODE_ENV=production
✅ MONGO_URI=your-mongodb-connection-string
✅ JWT_SECRET=your-super-secret-jwt-key
✅ WEATHERAPI_KEY=your-weather-api-key
✅ SCHOOL_LAT=-7.7956 (or your school's latitude)
✅ SCHOOL_LON=110.3695 (or your school's longitude)
✅ WEATHER_CHECK_HOUR=9
✅ WEATHER_CHECK_MINUTE=0
✅ FRONTEND_URL=https://your-netlify-site.netlify.app (update after frontend deploy)
✅ REDIS_URL=your-redis-url (optional)
✅ DEFAULT_CACHE_TTL=300
```

### Frontend (.env.local) - Copy to Netlify Variables
```
✅ NEXT_PUBLIC_API_BASE_URL=https://your-railway-app.up.railway.app
```

---

## 🚀 Deployment Steps Summary

### Step 1: Deploy Backend (Railway)
1. Go to https://railway.app
2. New Project → Deploy from GitHub → Select `lisaolivia/eduedu`
3. Add all environment variables (see above)
4. Wait for deployment
5. Copy Railway URL

### Step 2: Deploy Frontend (Netlify)
1. Go to https://app.netlify.com
2. Add new site → Import from GitHub → Select `lisaolivia/eduedu`
3. Set `NEXT_PUBLIC_API_BASE_URL` to Railway URL
4. Deploy
5. Copy Netlify URL

### Step 3: Update Backend CORS
1. Go back to Railway
2. Update `FRONTEND_URL` with Netlify URL
3. Railway will auto-redeploy

### Step 4: Test Everything
1. Test backend: Open Railway URL → Should see `{"msg":"API jalan bro"}`
2. Test frontend: Open Netlify URL → Should see landing page
3. Test login: Try logging in → Check for errors
4. Check browser console for errors
5. Check Network tab for API calls

---

## ⚠️ Common Issues & Solutions

### Issue: MongoDB Connection Failed
**Solution:**
- Check `MONGO_URI` in Railway variables
- MongoDB Atlas → Network Access → Add IP: `0.0.0.0/0`
- Wait 2-3 minutes after adding IP

### Issue: CORS Errors
**Solution:**
- Verify `FRONTEND_URL` in Railway includes Netlify URL
- Check browser console for specific error
- Ensure no trailing slashes in URLs

### Issue: Frontend Can't Connect to Backend
**Solution:**
- Check `NEXT_PUBLIC_API_BASE_URL` in Netlify variables
- Verify Railway URL is correct (no trailing slash)
- Check Railway logs for errors
- Test Railway URL directly in browser

### Issue: Build Fails
**Solution:**
- Check build logs for specific error
- Verify Node version (should be 18+)
- Check for missing dependencies
- Try building locally first: `cd frontend && npm run build`

### Issue: Redis Errors
**Solution:**
- Redis is optional - app works without it
- If Redis fails, caching is disabled but app continues
- Check Railway logs for Redis connection errors

---

## ✅ Final Verification

Before considering deployment complete:

- [ ] Backend accessible at Railway URL
- [ ] Frontend accessible at Netlify URL
- [ ] Backend health check works: `{/}` endpoint
- [ ] Frontend can make API calls to backend
- [ ] No CORS errors in browser console
- [ ] Login functionality works
- [ ] All environment variables are set correctly
- [ ] MongoDB connection is working
- [ ] Weather API is working (if configured)
- [ ] No errors in Railway logs
- [ ] No errors in Netlify build logs
- [ ] No errors in browser console

---

## 📝 Notes

- **Never commit `.env` files** - They're in `.gitignore`
- **JWT_SECRET** should be a strong random string
- **FRONTEND_URL** can have multiple URLs separated by commas
- **Redis is optional** - App works without it
- **MongoDB Atlas** needs to allow Railway IPs (use `0.0.0.0/0` for testing)

---

## 🎉 Ready to Deploy!

Your codebase is now **100% ready for deployment**. Follow the steps in `DEPLOYMENT_STEPS.md` for detailed instructions.

**Good luck with your deployment! 🚀**

