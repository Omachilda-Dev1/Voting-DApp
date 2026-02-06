# Vercel Deployment - Quick Fix Guide

## 🚨 Most Common Issues

### 1. Build Fails - "Cannot find package.json"
**Cause**: Vercel looking in wrong directory

**Fix**: Use the `vercel.json` configuration (already created)
```json
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/build"
}
```

### 2. Build Fails - "npm ERR! missing script: build"
**Cause**: Build command not found

**Fix**: Verify `frontend/package.json` has:
```json
{
  "scripts": {
    "build": "react-scripts build"
  }
}
```

### 3. Blank Page After Deployment
**Cause**: Wrong output directory or routing issue

**Fix**: 
- Check `vercel.json` has correct `outputDirectory`
- Check browser console for errors
- Verify `public/index.html` exists

### 4. 404 on Page Refresh
**Cause**: SPA routing not configured

**Fix**: Already handled in `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 5. "Please install MetaMask" Error
**Cause**: MetaMask not detected

**Fix**:
- Install MetaMask extension
- Refresh page
- Check `window.ethereum` is available

### 6. "Wrong Network" or Connection Issues
**Cause**: Not on Sepolia network

**Fix**:
- Open MetaMask
- Switch to Sepolia Test Network
- Refresh page
- Verify Chain ID: 11155111

### 7. "Contract not found at this address"
**Cause**: Contract address incorrect or not deployed

**Fix**:
- Verify contract is deployed: Check Sepolia Etherscan
- Update address in `frontend/src/App.js` line 17:
```javascript
const contractAddress = "YOUR_ACTUAL_CONTRACT_ADDRESS";
```

### 8. Build Takes Too Long / Times Out
**Cause**: Installing unnecessary dependencies

**Fix**: Use `.vercelignore` (already created) to exclude:
```
node_modules
artifacts
cache
test
```

## 🔧 Quick Commands

### Redeploy from CLI
```bash
vercel --prod
```

### Clear Cache and Redeploy
```bash
vercel --prod --force
```

### Check Build Logs
```bash
vercel logs <deployment-url>
```

### Test Build Locally
```bash
cd frontend
npm run build
npx serve -s build
```

## 📋 Pre-Deployment Checklist

Before deploying, verify:
- [ ] Contract deployed to Sepolia
- [ ] Contract address updated in `App.js`
- [ ] `frontend/package.json` exists
- [ ] `vercel.json` in root directory
- [ ] Code pushed to GitHub
- [ ] Network ID is 11155111 (Sepolia)

## 🎯 Deployment Settings

**Correct Settings for Vercel Dashboard:**

| Setting | Value |
|---------|-------|
| Framework Preset | Other |
| Root Directory | `.` (root) |
| Build Command | `cd frontend && npm install && npm run build` |
| Output Directory | `frontend/build` |
| Install Command | `cd frontend && npm install` |
| Node Version | 18.x (default) |

## 🔍 Debugging Steps

1. **Check Vercel Build Logs**
   - Go to Vercel Dashboard
   - Click on failed deployment
   - Read error messages

2. **Test Locally**
   ```bash
   cd frontend
   npm install
   npm run build
   npm start
   ```

3. **Check Browser Console**
   - Open deployed site
   - Press F12
   - Look for red errors

4. **Verify Contract**
   - Go to Sepolia Etherscan
   - Search for your contract address
   - Verify it exists and has code

## 💡 Pro Tips

1. **Use Environment Variables** (Optional)
   - Add in Vercel Dashboard → Settings → Environment Variables
   - Prefix with `REACT_APP_`
   - Redeploy after adding

2. **Enable Auto-Deploy**
   - Already enabled by default
   - Push to `main` branch = auto-deploy

3. **Preview Deployments**
   - Push to any branch
   - Get preview URL
   - Test before merging to main

4. **Monitor Performance**
   - Enable Vercel Analytics
   - Check loading times
   - Optimize if needed

## 🆘 Still Having Issues?

1. **Check Vercel Status**: [status.vercel.com](https://status.vercel.com)
2. **Clear Browser Cache**: Ctrl+Shift+Delete
3. **Try Incognito Mode**: Rule out extension conflicts
4. **Check Vercel Logs**: Dashboard → Deployments → View Logs
5. **Redeploy**: Sometimes a fresh deploy fixes issues

## 📞 Get Help

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Vercel Support](https://vercel.com/support)

## ✅ Success Indicators

Your deployment is successful when:
- ✅ Build completes without errors
- ✅ Site loads at Vercel URL
- ✅ No console errors (F12)
- ✅ MetaMask connects successfully
- ✅ Can view proposals
- ✅ Can vote on proposals
- ✅ Admin can create proposals

---

**Quick Test**: Visit your deployed URL and try connecting MetaMask. If that works, you're 90% there!
