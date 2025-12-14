# PART III – DEPLOYMENT STEP-BY-STEP

## ✅ Pre-Deployment Checklist

- [x] Frontend optimized (code splitting done)
- [x] Backend configured for environment variables
- [x] GitHub repository ready
- [x] Both frontend and backend have `.env.example` files
- [x] API URL is configurable

---

## 🚀 DEPLOYMENT STEPS (IN ORDER)

### STEP 1: MongoDB Atlas Setup (5-10 minutes)

**1.1 Go to MongoDB Atlas**
- URL: https://www.mongodb.com/cloud/atlas
- Click "Sign Up"
- Create account with your email

**1.2 Create Free Cluster**
- Click "Create" → "Build a Cluster"
- Select **M0 Sandbox (Free)**
- Choose region: US East or closest to you
- Click "Create Cluster"
- Wait 5-10 minutes

**1.3 Get Connection String**
- Cluster created → Click "Connect"
- Select "Connect your application"
- Copy connection string (MongoDB URI)
- It will look like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

**1.4 Create Database User**
- Go to "Database Access" (left sidebar)
- Click "Add New Database User"
- Username: `admin`
- Password: (Generate strong password - COPY THIS!)
- Click "Create Database User"

**1.5 Update Connection String with Credentials**
Replace in the string:
```
mongodb+srv://admin:YOUR_COPIED_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

**1.6 Whitelist IP (Important!)**
- Go to "Network Access"
- Click "Add IP Address"
- Select "Allow Access from Anywhere" (0.0.0.0/0)
- Click "Confirm"

---

### STEP 2: Deploy Backend to Render (10 minutes)

**2.1 Create Render Account**
- URL: https://render.com
- Sign up with GitHub (use your yuvrajsingg GitHub account)
- Authorize access to repositories

**2.2 Create New Web Service**
- Dashboard → Click "New" → "Web Service"
- Select repository: `Web-development`
- Click "Connect"

**2.3 Configure Deployment**
- **Name:** `portfolio-api` 
- **Environment:** Node
- **Region:** US (same as MongoDB)
- **Branch:** main
- **Build Command:** `npm install --prefix server`
- **Start Command:** `node server/express.js`
- **Instance Type:** Free

**2.4 Add Environment Variables**
Click "Add Environment Variable" and add:
```
MONGODB_URI = mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET = your-super-secret-jwt-key-change-in-production
NODE_ENV = production
CORS_ORIGIN = https://your-portfolio.vercel.app
PORT = 5000
```

**2.5 Deploy**
- Click "Create Web Service"
- Wait for deployment (5-10 minutes)
- **COPY THE URL** (looks like: `https://portfolio-api-xxxx.onrender.com`)

---

### STEP 3: Deploy Frontend to Vercel (5 minutes)

**3.1 Create Vercel Account**
- URL: https://vercel.com
- Sign up with GitHub (use yuvrajsingg)
- Authorize access

**3.2 Import Project**
- Dashboard → "Add New" → "Project"
- Select: `Web-development`
- Click "Import"

**3.3 Configure Frontend**
- **Root Directory:** `client`
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

**3.4 Add Environment Variables**
```
VITE_API_URL = https://portfolio-api-xxxx.onrender.com
```
(Use the Render backend URL from STEP 2.5)

**3.5 Deploy**
- Click "Deploy"
- Wait for deployment (2-5 minutes)
- **COPY THE URL** (looks like: `https://portfolio-xxxx.vercel.app`)

---

### STEP 4: Update Backend CORS

Go back to Render dashboard:
- Select your deployed app
- Go to Environment
- Update `CORS_ORIGIN` to your Vercel URL:
```
CORS_ORIGIN = https://portfolio-xxxx.vercel.app
```
- Redeploy (Render will auto-redeploy)

---

### STEP 5: Test Deployed Application (5 minutes)

**5.1 Test Frontend**
- Open your Vercel URL in browser
- Check all pages load (Home, About, Projects, etc.)
- Verify navigation works

**5.2 Test Backend Connection**
- Try to create account (if applicable)
- Check browser DevTools → Network tab
- See if API calls go to Render backend
- Should see 200 OK responses

**5.3 Test Full Flow**
- Create account on deployed site
- Sign in
- Add portfolio entries
- Refresh page - data should persist (saved in MongoDB)

**5.4 Check Console Logs**
- Open browser DevTools
- Check Console for errors
- Check Network tab for failed requests

---

### STEP 6: Setup CI/CD Pipeline (Optional but Recommended)

**6.1 Automatic Deployments Already Enabled**
- Both Vercel and Render watch GitHub repo
- When you push to `main` branch, they auto-deploy
- New code goes live in 2-5 minutes

**6.2 To Test CI/CD**
- Make a small change to code (e.g., add a comment)
- Commit and push to GitHub
- Watch Vercel dashboard - should auto-deploy
- Refresh deployed app - should see update

---

### STEP 7: Final Testing Checklist

- [ ] Frontend loads at Vercel URL
- [ ] All pages accessible
- [ ] Navigation works
- [ ] Backend API connects
- [ ] Can create account (if auth exists)
- [ ] Data saves to MongoDB
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Images load correctly
- [ ] Styling looks good

---

## 📸 Screenshots to Capture for Word Document

**For PART III - Deployment:**

1. MongoDB Atlas Cluster Status
2. Render Backend Deployment Dashboard
3. Vercel Frontend Deployment Dashboard
4. **DEPLOYED APP HOME PAGE** (from your Vercel URL)
5. Browser showing your portfolio live
6. GitHub repository with commits

---

## 🔗 Final URLs for Your Submission

After deployment, you'll have:
```
Frontend URL: https://your-portfolio.vercel.app
Backend URL: https://portfolio-api-xxxx.onrender.com
GitHub URL: https://github.com/yuvrajsingg/Web-development
MongoDB Atlas: (dashboard access)
```

**These are what you submit in your Word document!**

---

## ⚠️ Important Notes

1. **Free Tier Limitations:**
   - Render free tier: may spin down after 15 mins of inactivity
   - MongoDB free: 512MB storage (enough for portfolio)
   - Vercel: Unlimited free deployments

2. **Keeping Services Running:**
   - Add monitoring to Render (keeps it awake)
   - Or upgrade to paid tier if needed

3. **Security:**
   - Never commit `.env` file to GitHub
   - Keep MongoDB password private
   - Use strong JWT_SECRET

4. **Troubleshooting:**
   - Check Render/Vercel deployment logs
   - Check MongoDB Atlas connection string
   - Check CORS settings
   - Check environment variables are set correctly

---

## Next: PART IV – CI/CD Demo

After deployment is working, for PART IV:
1. Create new Git branch
2. Make code changes
3. Commit and push
4. Merge to main
5. Watch auto-deploy
6. Show screenshots of before/after

---

**READY TO START? Follow STEP 1 first!**
