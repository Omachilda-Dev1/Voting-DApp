# 🛠️ Command Reference

Quick reference for all commands used in this project.

## Installation Commands

### Install Root Dependencies
```bash
npm install
```

### Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

### Install Specific Package
```bash
npm install <package-name>
npm install --save-dev <package-name>
```

## Hardhat Commands

### Compile Contracts
```bash
npx hardhat compile
```

### Run Tests
```bash
npx hardhat test
```

### Run Specific Test
```bash
npx hardhat test --grep "test name"
```

### Generate Coverage Report
```bash
npx hardhat coverage
```

### Start Local Node
```bash
npx hardhat node
```

### Deploy to Local Network
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### Deploy to Sepolia
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Clean Artifacts
```bash
npx hardhat clean
```

### Get Hardhat Help
```bash
npx hardhat help
```

### Open Hardhat Console
```bash
npx hardhat console --network localhost
```

## Frontend Commands

### Start Development Server
```bash
cd frontend
npm start
```

### Build for Production
```bash
cd frontend
npm run build
```

### Run Frontend Tests
```bash
cd frontend
npm test
```

### Eject Configuration (irreversible!)
```bash
cd frontend
npm run eject
```

## Deployment Commands

### Deploy to Vercel (CLI)
```bash
cd frontend
npm install -g vercel
vercel
```

### Deploy to Netlify (CLI)
```bash
cd frontend
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=build
```

### Deploy to GitHub Pages
```bash
cd frontend
npm install --save-dev gh-pages
npm run build
npx gh-pages -d build
```

## Git Commands

### Initialize Repository
```bash
git init
git add .
git commit -m "Initial commit"
```

### Create GitHub Repository
```bash
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

### Update Repository
```bash
git add .
git commit -m "Your commit message"
git push
```

### Create Branch
```bash
git checkout -b feature-name
```

### Merge Branch
```bash
git checkout main
git merge feature-name
```

## Environment Setup

### Create .env File
```bash
# Windows
copy .env.example .env

# Linux/Mac
cp .env.example .env
```

### Edit .env File
```bash
# Windows
notepad .env

# Linux/Mac
nano .env
```

## Testing Commands

### Run All Tests
```bash
npx hardhat test
```

### Run Tests with Gas Report
```bash
REPORT_GAS=true npx hardhat test
```

### Run Tests in Watch Mode
```bash
npx hardhat test --watch
```

### Run Coverage
```bash
npx hardhat coverage
```

## Network Commands

### Add Hardhat Network to MetaMask
```
Network Name: Hardhat Local
RPC URL: http://127.0.0.1:8545
Chain ID: 1337
Currency Symbol: ETH
```

### Get Sepolia Test ETH
Visit: https://sepoliafaucet.com/

### Check Network
```bash
npx hardhat run scripts/check-network.js --network <network-name>
```

## Verification Commands

### Verify Contract on Etherscan
```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
```

### Example Verification
```bash
npx hardhat verify --network sepolia 0x123... "Constructor Arg"
```

## Debugging Commands

### Console Log in Tests
```javascript
console.log("Debug:", variable);
```

### Hardhat Console
```bash
npx hardhat console --network localhost
```

### Check Contract Size
```bash
npx hardhat size-contracts
```

### Gas Reporter
```bash
REPORT_GAS=true npx hardhat test
```

## Maintenance Commands

### Update Dependencies
```bash
npm update
```

### Check for Outdated Packages
```bash
npm outdated
```

### Audit Dependencies
```bash
npm audit
npm audit fix
```

### Clean Install
```bash
rm -rf node_modules package-lock.json
npm install
```

## Useful Scripts

### Create Custom Script
Add to `package.json`:
```json
"scripts": {
  "deploy:local": "hardhat run scripts/deploy.js --network localhost",
  "deploy:sepolia": "hardhat run scripts/deploy.js --network sepolia",
  "test:coverage": "hardhat coverage",
  "frontend:start": "cd frontend && npm start",
  "frontend:build": "cd frontend && npm run build"
}
```

### Run Custom Script
```bash
npm run deploy:local
npm run test:coverage
npm run frontend:start
```

## Quick Commands

### Full Setup
```bash
npm install && cd frontend && npm install && cd ..
```

### Test Everything
```bash
npx hardhat test && cd frontend && npm test && cd ..
```

### Deploy Full Stack (Local)
```bash
# Terminal 1
npx hardhat node

# Terminal 2
npx hardhat run scripts/deploy.js --network localhost

# Terminal 3
cd frontend && npm start
```

## Troubleshooting Commands

### Clear Hardhat Cache
```bash
npx hardhat clean
rm -rf cache artifacts
```

### Reset MetaMask Account
Settings → Advanced → Reset Account

### Check Node Version
```bash
node --version
npm --version
```

### Reinstall Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Check Port Usage
```bash
# Windows
netstat -ano | findstr :3000
netstat -ano | findstr :8545

# Linux/Mac
lsof -i :3000
lsof -i :8545
```

### Kill Process on Port
```bash
# Windows
taskkill /PID <PID> /F

# Linux/Mac
kill -9 <PID>
```

## Environment Variables

### Set Environment Variable (Temporary)
```bash
# Windows
set VARIABLE_NAME=value

# Linux/Mac
export VARIABLE_NAME=value
```

### Load .env File
```bash
# Install dotenv
npm install dotenv

# In your script
require('dotenv').config();
```

## Documentation Commands

### Generate Documentation
```bash
npx hardhat docgen
```

### Serve Documentation Locally
```bash
npx http-server docs
```

## Performance Commands

### Measure Gas Usage
```bash
REPORT_GAS=true npx hardhat test
```

### Optimize Contract
```bash
# In hardhat.config.js
optimizer: {
  enabled: true,
  runs: 200
}
```

## Quick Reference

| Task | Command |
|------|---------|
| Install | `npm install` |
| Compile | `npx hardhat compile` |
| Test | `npx hardhat test` |
| Deploy Local | `npx hardhat run scripts/deploy.js --network localhost` |
| Start Frontend | `cd frontend && npm start` |
| Build Frontend | `cd frontend && npm run build` |
| Clean | `npx hardhat clean` |
| Coverage | `npx hardhat coverage` |

---

**Tip**: Save commonly used commands as npm scripts in package.json for easier access!
