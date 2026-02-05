# 🗳️ Decentralized Voting DApp

A full-stack decentralized voting application built with Solidity, Hardhat, React, and Ethers.js. This application allows an admin to create voting proposals with deadlines, and users can vote once per proposal using their Ethereum wallet.

## 🎬 Quick Links

📚 **[Documentation Index](INDEX.md)** - Complete guide to all documentation

### Essential Guides
- **[Getting Started](GETTING_STARTED.md)** - Choose your learning path
- **[Quick Start](QUICKSTART.md)** - Get running in 5 minutes
- **[Final Steps](FINAL_STEPS.md)** - Complete your deployment
- **[Deployment Guide](DEPLOYMENT.md)** - Deploy to testnet/mainnet

### Reference
- **[Features](FEATURES.md)** - Complete feature list
- **[Commands](COMMANDS.md)** - All commands reference
- **[Testing Docs](TESTING.md)** - Test suite documentation
- **[Deliverables](DELIVERABLES.md)** - Requirements verification

## ✨ Features

### Smart Contract (Solidity)
- ✅ Admin can create voting proposals with custom deadlines
- ✅ Each address can vote only once per proposal
- ✅ Automatic deadline enforcement
- ✅ Winner determination after voting period ends
- ✅ Real-time vote counting
- ✅ Access control for admin functions

### Frontend (React + Ethers.js)
- ✅ Display all active and ended proposals
- ✅ Real-time vote count updates
- ✅ MetaMask wallet integration
- ✅ Wallet connection status indicator
- ✅ Admin panel for creating proposals
- ✅ Responsive and modern UI design
- ✅ Time remaining countdown for active proposals

### Testing
- ✅ 10+ comprehensive test cases covering:
  - Contract deployment
  - Proposal creation
  - Voting functionality
  - Deadline enforcement
  - Access control
  - Winner determination
  - Query functions

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MetaMask browser extension
- Git

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd voting-dapp
```

2. Install root dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
cd ..
```

## 🧪 Testing

Run the comprehensive test suite:
```bash
npx hardhat test
```

Expected output: All 10+ tests should pass, covering:
- Contract deployment and initialization
- Proposal creation (admin only)
- Voting functionality
- Double voting prevention
- Deadline enforcement
- Winner determination
- Access control
- Query functions

## 📦 Deployment

### 1. Deploy to Local Hardhat Network

Start local node:
```bash
npx hardhat node
```

In a new terminal, deploy the contract:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### 2. Deploy to Testnet (e.g., Sepolia)

Update `hardhat.config.js` with your network configuration:
```javascript
networks: {
  sepolia: {
    url: "YOUR_ALCHEMY_OR_INFURA_URL",
    accounts: ["YOUR_PRIVATE_KEY"]
  }
}
```

Deploy:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### 3. Configure Frontend

After deployment, update `frontend/src/App.js` with your deployed contract address:
```javascript
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
```

The ABI is already included in `frontend/src/VotingSystemABI.json`.

## 🌐 Running the Frontend

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Start the development server:
```bash
npm start
```

3. Open http://localhost:3000 in your browser

4. Connect your MetaMask wallet to the same network where you deployed the contract

## 📱 Using the Application

### For Admin:
1. Connect your wallet (the deployer address is the admin)
2. You'll see an "Admin" badge next to your wallet address
3. Use the "Create New Proposal" form to add proposals
4. Enter a description and duration in minutes
5. Click "Create Proposal" and confirm the transaction

### For Voters:
1. Connect your wallet
2. Browse active proposals
3. Click "Vote" on any active proposal
4. Confirm the transaction in MetaMask
5. You can only vote once per proposal

### Viewing Results:
- Vote counts update in real-time
- Proposals show time remaining until deadline
- Ended proposals are marked with an "Ended" badge
- The winner can be determined by calling `getWinner()` on the contract

## 🏗️ Project Structure

```
voting-dapp/
├── contracts/
│   └── VotingSystem.sol          # Main smart contract
├── test/
│   └── VotingSystem.test.js      # Comprehensive test suite
├── scripts/
│   └── deploy.js                 # Deployment script
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js                # Main React component
│   │   ├── App.css               # Styling
│   │   ├── index.js              # React entry point
│   │   ├── index.css             # Global styles
│   │   └── VotingSystemABI.json  # Contract ABI
│   └── package.json
├── hardhat.config.js             # Hardhat configuration
├── package.json
└── README.md
```

## 🔧 Smart Contract Functions

### Admin Functions
- `createProposal(string description, uint256 durationInMinutes)` - Create a new proposal

### Public Functions
- `vote(uint256 proposalId)` - Vote on a proposal
- `getProposal(uint256 proposalId)` - Get proposal details
- `getAllProposals()` - Get all proposals
- `hasVoted(uint256 proposalId, address voter)` - Check if address has voted
- `getWinner()` - Get the winning proposal (after deadline)

## 🌐 Deployment to Production

### Deploy Frontend to Vercel:

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Set root directory to `frontend`
5. Deploy

### Deploy Frontend to Netlify:

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the `build` folder to Netlify:
```bash
npx netlify-cli deploy --prod --dir=build
```

## 🔐 Security Considerations

- Only the admin (contract deployer) can create proposals
- Each address can vote only once per proposal
- Voting is only allowed before the deadline
- All state changes emit events for transparency
- Input validation on all functions

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using Solidity, Hardhat, React, and Ethers.js
