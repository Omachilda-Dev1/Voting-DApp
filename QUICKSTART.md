# 🚀 Quick Start Guide

Get your voting dApp running in 5 minutes!

## 1. Install Dependencies (2 min)

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

## 2. Test Smart Contract (1 min)

```bash
npx hardhat test
```

You should see 21 passing tests ✅

## 3. Start Local Blockchain (30 sec)

Open a new terminal and run:
```bash
npx hardhat node
```

Keep this running!

## 4. Deploy Contract (30 sec)

In another terminal:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

Copy the contract address from the output.

## 5. Configure Frontend (30 sec)

Edit `frontend/src/App.js` line 12:
```javascript
const contractAddress = "PASTE_YOUR_CONTRACT_ADDRESS_HERE";
```

## 6. Start Frontend (30 sec)

```bash
cd frontend
npm start
```

## 7. Use the App! 🎉

1. Open http://localhost:3000
2. Click "Connect Wallet"
3. Approve MetaMask connection
4. Create proposals (you're the admin!)
5. Vote on proposals

## Troubleshooting

**MetaMask shows wrong network?**
- Add Hardhat network manually:
  - Network Name: Hardhat Local
  - RPC URL: http://127.0.0.1:8545
  - Chain ID: 1337
  - Currency: ETH

**No test accounts?**
- Import a Hardhat test account into MetaMask
- Use one of the private keys shown when you ran `npx hardhat node`

**Transaction failed?**
- Make sure Hardhat node is running
- Try resetting MetaMask account (Settings → Advanced → Reset Account)

## Next Steps

- Read [DEPLOYMENT.md](DEPLOYMENT.md) for testnet/mainnet deployment
- Check [TESTING.md](TESTING.md) for test documentation
- Customize the UI in `frontend/src/App.css`

## Need Help?

Open an issue on GitHub or check the full README.md
