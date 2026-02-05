# Deployment Guide

## Prerequisites
- Node.js v16+
- MetaMask wallet
- Test ETH (for testnet deployment)

## Step 1: Install Dependencies

```bash
npm install
cd frontend
npm install
cd ..
```

## Step 2: Compile Smart Contract

```bash
npx hardhat compile
```

## Step 3: Run Tests

```bash
npx hardhat test
```

All 21 tests should pass.

## Step 4: Deploy to Local Network

### Start Local Hardhat Node
```bash
npx hardhat node
```

Keep this terminal running.

### Deploy Contract (in new terminal)
```bash
npx hardhat run scripts/deploy.js --network localhost
```

Copy the deployed contract address from the output.

## Step 5: Deploy to Testnet (Sepolia)

### Configure Network

1. Get Sepolia ETH from faucet: https://sepoliafaucet.com/
2. Get Alchemy/Infura API key
3. Update `hardhat.config.js`:

```javascript
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
```

4. Create `.env` file:
```
SEPOLIA_RPC_URL=your_alchemy_or_infura_url
PRIVATE_KEY=your_wallet_private_key
```

### Deploy
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## Step 6: Configure Frontend

1. Update `frontend/src/App.js` with deployed contract address:
```javascript
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
```

2. The ABI is already in `frontend/src/VotingSystemABI.json`

## Step 7: Run Frontend Locally

```bash
cd frontend
npm start
```

Open http://localhost:3000

## Step 8: Deploy Frontend to Vercel

### Option A: Via Vercel Dashboard
1. Push code to GitHub
2. Go to https://vercel.com
3. Import repository
4. Set root directory to `frontend`
5. Deploy

### Option B: Via CLI
```bash
cd frontend
npm install -g vercel
vercel
```

## Step 9: Deploy Frontend to Netlify

```bash
cd frontend
npm run build
npx netlify-cli deploy --prod --dir=build
```

## Verification

After deployment:
1. Visit your frontend URL
2. Connect MetaMask
3. Switch to the network where you deployed
4. Test creating proposals (admin only)
5. Test voting functionality

## Troubleshooting

### MetaMask Connection Issues
- Ensure you're on the correct network
- Try resetting MetaMask account

### Transaction Failures
- Check you have enough ETH for gas
- Verify contract address is correct
- Check network configuration

### Frontend Not Loading
- Clear browser cache
- Check console for errors
- Verify contract address and ABI

## Contract Addresses

Keep track of your deployments:

- **Local**: [Your local address]
- **Sepolia**: [Your Sepolia address]
- **Mainnet**: [Your mainnet address]

## Security Notes

- Never commit `.env` file
- Keep private keys secure
- Test thoroughly on testnet before mainnet
- Consider getting a security audit for production
