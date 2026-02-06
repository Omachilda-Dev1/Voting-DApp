# Vercel Deployment Checklist

## Pre-Deployment ✅

- [ ] Smart contract deployed to Sepolia testnet
- [ ] Contract address copied and saved
- [ ] Contract verified on Etherscan (optional but recommended)
- [ ] Frontend tested locally with deployed contract
- [ ] MetaMask connected and working on Sepolia
- [ ] All dependencies installed (`npm install` in both root and frontend)
- [ ] Code committed to Git repository
- [ ] Repository pushed to GitHub

## Vercel Configuration ✅

- [x] `vercel.json` created in root directory
- [x] `.vercelignore` created to exclude unnecessary files
- [ ] Contract address updated in `frontend/src/App.js` (line 17)
- [ ] Network ID verified (should be 11155111 for Sepolia)

## Deployment Steps ✅

### Method 1: Vercel Dashboard
- [ ] Go to [vercel.com](https://vercel.com) and sign in
- [ ] Click "Add New Project"
- [ ] Import your GitHub repository
- [ ] Configure build settings:
  - Root Directory: `.` (leave as root)
  - Framework: Other
  - Build Command: `cd frontend && npm install && npm run build`
  - Output Directory: `frontend/build`
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete

### Method 2: Vercel CLI
- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Login: `vercel login`
- [ ] Deploy: `vercel`
- [ ] Deploy to production: `vercel --prod`

## Post-Deployment Testing ✅

- [ ] Visit deployed URL
- [ ] Check browser console for errors (F12)
- [ ] Connect MetaMask wallet
- [ ] Verify network is Sepolia (Chain ID: 11155111)
- [ ] Test wallet connection
- [ ] Test viewing proposals
- [ ] Test voting (if not admin)
- [ ] Test creating proposals (if admin)
- [ ] Test on mobile device
- [ ] Test on different browsers (Chrome, Firefox, Brave)

## Common Issues & Fixes 🔧

### Build Fails
- **Error**: "Cannot find module"
  - **Fix**: Check `frontend/package.json` exists
  - **Fix**: Clear Vercel cache and redeploy

- **Error**: "Command not found"
  - **Fix**: Verify build command in `vercel.json`
  - **Fix**: Ensure `npm` is available in build environment

### Runtime Errors
- **Error**: "Contract not found"
  - **Fix**: Verify contract address in `App.js`
  - **Fix**: Ensure contract is deployed on Sepolia

- **Error**: "Wrong network"
  - **Fix**: Switch MetaMask to Sepolia network
  - **Fix**: Verify Chain ID is 11155111

- **Error**: "Please install MetaMask"
  - **Fix**: Install MetaMask browser extension
  - **Fix**: Refresh page after installation

### 404 Errors
- **Error**: Page refresh shows 404
  - **Fix**: Already handled by `vercel.json` rewrites
  - **Fix**: If still occurs, check Vercel logs

## Environment Variables (Optional) 🔐

If you want to use environment variables instead of hardcoding:

1. **Update `frontend/src/App.js`**:
   ```javascript
   const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || "0xfE8B10574f86647267b565FbFd75ba59aC4eAeD6";
   ```

2. **Add in Vercel Dashboard**:
   - Go to Project Settings → Environment Variables
   - Add: `REACT_APP_CONTRACT_ADDRESS` = `your_contract_address`
   - Add: `REACT_APP_NETWORK_ID` = `11155111`

3. **Redeploy** for changes to take effect

## Performance Optimization ⚡

- [ ] Enable Vercel Analytics (optional)
- [ ] Check bundle size: `cd frontend && npm run build`
- [ ] Optimize images if any added
- [ ] Enable compression (automatic on Vercel)
- [ ] Test loading speed with Lighthouse

## Security Checklist 🔒

- [ ] No private keys in code
- [ ] No sensitive data in repository
- [ ] `.env` files in `.gitignore`
- [ ] Contract address is public (safe to expose)
- [ ] Dependencies up to date: `npm audit`

## Custom Domain (Optional) 🌐

- [ ] Purchase domain from registrar
- [ ] Add domain in Vercel Project Settings
- [ ] Configure DNS records
- [ ] Wait for DNS propagation (24-48 hours)
- [ ] Verify SSL certificate is active

## Monitoring & Maintenance 📊

- [ ] Set up Vercel deployment notifications
- [ ] Monitor error logs in Vercel dashboard
- [ ] Check analytics for usage patterns
- [ ] Keep dependencies updated
- [ ] Test after each deployment

## Documentation Updates 📝

- [ ] Update README.md with deployed URL
- [ ] Add deployment date to documentation
- [ ] Document any environment variables used
- [ ] Update contract address in all docs
- [ ] Share deployment URL with team/users

## Final Verification ✨

- [ ] All features working on production
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Fast loading time
- [ ] MetaMask integration working
- [ ] Voting functionality working
- [ ] Admin panel working (if admin)
- [ ] Proposal creation working
- [ ] Vote counting accurate

## Rollback Plan 🔄

If deployment fails or has issues:

1. **Revert to previous deployment**:
   - Go to Vercel Dashboard → Deployments
   - Find last working deployment
   - Click "..." → "Promote to Production"

2. **Fix locally and redeploy**:
   - Fix issues in local environment
   - Test thoroughly
   - Commit and push changes
   - Vercel will auto-deploy

## Success! 🎉

Once all items are checked:
- [ ] Share deployment URL
- [ ] Celebrate! 🎊
- [ ] Monitor for first 24 hours
- [ ] Gather user feedback

---

**Deployment URL**: _________________

**Contract Address**: 0xfE8B10574f86647267b565FbFd75ba59aC4eAeD6

**Network**: Sepolia Testnet (Chain ID: 11155111)

**Deployment Date**: _________________
