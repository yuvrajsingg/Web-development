# PART III – DEPLOYMENT GUIDE

## Step 1: MongoDB Atlas Setup

### 1.1 Create MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas
2. Click "Sign Up"
3. Create account with your email
4. Verify email

### 1.2 Create Cluster
1. Click "Create" → "Build a Cluster"
2. Select **M0 (Free)** tier
3. Choose region closest to you
4. Click "Create Cluster" (wait 5-10 minutes)

### 1.3 Get Connection String
1. Go to "Connect" button
2. Select "Connect your application"
3. Copy connection string (looks like):
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
   ```

### 1.4 Setup Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Username: `admin`
4. Password: (generate secure password)
5. Click "Create Database User"
6. Copy username and password

### 1.5 Update Connection String
Replace in the string:
```
mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

---

## Step 2: Update Server Environment Variables

### 2.1 Create `.env` file in server folder

**File: `server/.env`**
```
MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
PORT=5000
NODE_ENV=production
JWT_SECRET=your_jwt_secret_key_here
CORS_ORIGIN=https://your-portfolio.vercel.app
```

### 2.2 Update `express.js` to use environment variables

```javascript
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## Step 3: Deploy Backend to Render

### 3.1 Create Render Account
1. Go to: https://render.com
2. Sign up with GitHub
3. Click "New" → "Web Service"

### 3.2 Connect GitHub Repository
1. Select repository: `yuvrajsingg/Web-development`
2. Click "Connect"

### 3.3 Configure Render
- **Name:** `portfolio-api` (or similar)
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `node server/express.js`
- **Instance Type:** Free tier

### 3.4 Add Environment Variables
In Render dashboard, add:
```
MONGODB_URI = mongodb+srv://admin:password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET = your_secret_key
NODE_ENV = production
```

### 3.5 Deploy
- Click "Create Web Service"
- Wait for deployment (5-10 minutes)
- Copy backend URL: `https://portfolio-api-xxxx.onrender.com`

---

## Step 4: Update Frontend for Backend API

### 4.1 Create `.env` file in client folder

**File: `client/.env.production`**
```
VITE_API_URL=https://portfolio-api-xxxx.onrender.com
```

### 4.2 Update `src/api.js`

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const authAPI = {
  signin: (email, password, role) =>
    fetch(`${API_URL}/api/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role })
    }).then(res => res.json()),
  // ... other methods
};
```

---

## Step 5: Deploy Frontend to Vercel

### 5.1 Create Vercel Account
1. Go to: https://vercel.com
2. Sign up with GitHub
3. Click "New Project"

### 5.2 Import Repository
1. Select `yuvrajsingg/Web-development`
2. Click "Import"

### 5.3 Configure Project
- **Root Directory:** `client`
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### 5.4 Add Environment Variables
```
VITE_API_URL=https://portfolio-api-xxxx.onrender.com
```

### 5.5 Deploy
- Click "Deploy"
- Wait for deployment (2-5 minutes)
- Get URL: `https://your-portfolio.vercel.app`

---

## Step 6: Test Deployed Application

### 6.1 Test Frontend
- Open deployed URL
- Check all pages load correctly
- Verify navigation works

### 6.2 Test Backend Connection
- Try signin/signup
- Check console for API calls
- Verify data saves to MongoDB

### 6.3 Test Full Flow
1. Create account on deployed site
2. Sign in
3. Add portfolio entries
4. Verify data persists

---

## Step 7: Setup CI/CD Pipeline

### 7.1 GitHub Actions for Frontend

**File: `.github/workflows/deploy-frontend.yml`**
```yaml
name: Deploy Frontend to Vercel

on:
  push:
    branches: [main]
    paths:
      - 'client/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@v4
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### 7.2 GitHub Actions for Backend

**File: `.github/workflows/deploy-backend.yml`**
```yaml
name: Deploy Backend to Render

on:
  push:
    branches: [main]
    paths:
      - 'server/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Trigger Render Deploy
        run: curl ${{ secrets.RENDER_DEPLOY_HOOK }}
```

---

## Deployment URLs

### After Successful Deployment:
- **Frontend:** https://your-portfolio.vercel.app
- **Backend API:** https://portfolio-api-xxxx.onrender.com
- **GitHub:** https://github.com/yuvrajsingg/Web-development
- **MongoDB:** MongoDB Atlas dashboard

---

## Screenshots to Capture

1. ✅ MongoDB Atlas cluster setup
2. ✅ Render backend deployment
3. ✅ Vercel frontend deployment
4. ✅ Deployed app home page
5. ✅ GitHub repository with CI/CD workflows

---

## Troubleshooting

### Frontend not connecting to backend:
- Check CORS settings in server
- Verify API URL in `.env`
- Check browser console for errors

### MongoDB connection failing:
- Verify IP whitelist on MongoDB Atlas
- Check connection string
- Verify username/password

### Deployment fails:
- Check build logs
- Verify environment variables
- Check package.json scripts

---

## Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured
- [ ] API connection working
- [ ] Full app tested on production
- [ ] CI/CD pipeline setup
- [ ] GitHub repository updated

---

**PART III – DEPLOYMENT IN PROGRESS**

Next: Follow steps 1-7 in order.
