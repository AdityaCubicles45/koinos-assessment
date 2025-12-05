# Deploy Backend to Render

## Method 1: Using Render Dashboard (Recommended)

### Steps:

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare backend for Render deployment"
   git push origin main
   ```

2. **Go to Render Dashboard**
   - Visit https://render.com
   - Sign up/login with GitHub
   - Click "New +" → "Web Service"

3. **Connect Repository**
   - Connect your GitHub account
   - Select your repository

4. **Configure Service Settings**
   
   **Basic Settings:**
   - **Name:** `koinos-backend` (or your preferred name)
   - **Environment:** `Node`
   - **Region:** Choose closest to you
   - **Branch:** `main` (or your default branch)
   - **Plan:** Free (or choose your plan)

   **Build & Deploy Settings:**
   - **Root Directory:** `backend` ⚠️ **IMPORTANT: Set this to `backend`**
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Auto-Deploy:** Yes (deploys on every push)

5. **Environment Variables**
   Click "Add Environment Variable" and add:
   - `NODE_ENV` = `production`
   - `FRONTEND_URL` = `http://localhost:3000` (update with your frontend URL later)
   - `PORT` = Leave empty (Render sets this automatically)

6. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy
   - Wait for deployment to complete (~2-3 minutes)

7. **Get Your Backend URL**
   - After deployment, you'll get a URL like: `https://koinos-backend.onrender.com`
   - Copy this URL for your frontend configuration

---

## Method 2: Using render.yaml (Alternative)

If you prefer configuration as code, create/update `render.yaml` in your repository root:

```yaml
services:
  - type: web
    name: koinos-backend
    env: node
    plan: free
    rootDir: backend
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: FRONTEND_URL
        value: http://localhost:3000
        sync: false
```

Then:
1. Push `render.yaml` to your repository
2. In Render dashboard, select "Apply render.yaml"
3. Render will use the configuration from the file

---

## Important Notes:

### ✅ Root Directory Setting
**CRITICAL:** Set **Root Directory** to `backend` in Render dashboard. This tells Render to:
- Run `npm install` inside the `backend` folder
- Run `npm start` from the `backend` folder
- Treat `backend` as the project root

### ✅ Data File Location
The backend expects `data/items.json` at `backend/data/items.json`, which is already in your repository structure. This will work correctly when Root Directory is set to `backend`.

### ✅ CORS Configuration
After deployment, update the `FRONTEND_URL` environment variable in Render with your frontend URL (if you deploy the frontend separately).

### ✅ Free Tier Limitations
- Service spins down after 15 minutes of inactivity
- Takes ~30 seconds to wake up on first request
- 750 hours/month free

### ✅ Testing Your Deployment
After deployment, test your API:
```bash
# Test items endpoint
curl https://your-service-name.onrender.com/api/items

# Test stats endpoint
curl https://your-service-name.onrender.com/api/stats

# Test single item
curl https://your-service-name.onrender.com/api/items/1
```

---

## Troubleshooting

### Build Fails
- Check that Root Directory is set to `backend`
- Verify `package.json` exists in `backend/` folder
- Check build logs in Render dashboard

### Service Crashes
- Check logs in Render dashboard
- Verify all dependencies are in `package.json` (not just devDependencies)
- Ensure `data/items.json` exists in `backend/data/`

### CORS Errors
- Update `FRONTEND_URL` environment variable with your frontend URL
- Restart the service after updating environment variables

---

## Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Root Directory set to `backend` in Render
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Environment variables set
- [ ] Service deployed successfully
- [ ] API endpoints tested

