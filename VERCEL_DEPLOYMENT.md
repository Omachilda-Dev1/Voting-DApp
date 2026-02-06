# Vercel Deployment Guide

## Quick Fix for Common Issues

### Issue 1: Build Fails
**Problem**: Vercel can't find the React app or build fails
**Solution**: The `vercel.json` file is now configured to point to the `frontend/` directory

### Issue 2: 404 on Routes
**Problem**: Page refreshes result in 404 errors
**Solution**: The rewrites configuration in `vercel.json` handles SPA routing

### Issue 3: Environment Variables
**Problem**: Contract address not configured
**Solution**: Set environment variables in Vercel dashboard

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add Vercel configuration"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Project**
   - Framework Preset: **Other** (don't select Create React App)
   - Root Directory: **Leave as `.` (root)**
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: `frontend/build`
   - Install Command: `cd frontend && npm install`

4. **Set Environment Variables** (Optional)
   - Go to Project Settings → Environment Variables
   - Add: `REACT_APP_CONTRACT_ADDRESS` = `your_deployed_contract_address`
   - Add: `REACT_APP_NETWORK_ID` = `11155111` (for Sepolia)

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Follow prompts**
   - Set up and deploy: Yes
   - Which scope: Select your account
   - Link to existing project: No
   - Project name: voting-dapp (or your choice)
   - Directory: `./` (root)

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Post-Deployment

### Update Contract Address
After deployment, if you need to change the contract address:

1. **Option A: Redeploy with Environment Variable**
   - Add `REACT_APP_CONTRACT_ADDRESS` in Vercel dashboard
   - Update `App.js` to use: `process.env.REACT_APP_CONTRACT_ADDRESS`
   - Redeploy

2. **Option B: Update Code Directly**
   - Update the `contractAddress` in `frontend/src/App.js`
   - Commit and push changes
   - Vercel will auto-deploy

### Verify Deployment

1. Visit your Vercel URL
2. Open browser console (F12)
3. Check for errors
4. Try connecting MetaMask
5. Ensure you're on Sepolia network (Chain ID: 11155111)

## Troubleshooting

### Build Fails with "Command not found"
- Check that `package.json` exists in `frontend/` directory
- Verify build command in `vercel.json`

### "Cannot find module" errors
- Clear Vercel cache: Project Settings → General → Clear Cache
- Redeploy

### MetaMask Connection Issues
- Ensure you're on the correct network (Sepolia)
- Check contract address is correct
- Verify contract is deployed on that network

### Blank Page After Deployment
- Check browser console for errors
- Verify `public/index.html` has `<div id="root"></div>`
- Check that build completed successfully in Vercel logs

### Environment Variables Not Working
- Ensure variables start with `REACT_APP_`
- Redeploy after adding environment variables
- Check they're set for Production environment

## Alternative: Deploy Frontend Only

If you want to deploy just the frontend folder:

1. **Create a new repository with only frontend code**
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-new-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Import the new repository
   - Framework Preset: **Create React App**
   - Deploy

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (up to 48 hours)

## Automatic Deployments

Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you push to other branches or open PRs

## Performance Tips

1. **Enable Caching**: Already configured in `vercel.json`
2. **Optimize Images**: Use WebP format
3. **Code Splitting**: React does this automatically
4. **Analyze Bundle**: Run `npm run build` locally and check size

## Security Notes

- Never commit private keys or sensitive data
- Use environment variables for configuration
- Keep dependencies updated
- Enable Vercel's security headers (optional)

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- Check deployment logs in Vercel dashboard
