# Voting DApp Frontend

React-based frontend for the decentralized voting application.

## Features

- 🔐 MetaMask wallet integration
- 📊 Real-time vote counting
- ⏰ Countdown timers for active proposals
- 👨‍💼 Admin panel for creating proposals
- 📱 Responsive design
- 🎨 Modern gradient UI

## Setup

1. Install dependencies:
```bash
npm install
```

2. Update contract address in `src/App.js`:
```javascript
const contractAddress = "YOUR_CONTRACT_ADDRESS";
```

3. Start development server:
```bash
npm start
```

## Configuration

The app connects to the contract using:
- Contract address (in `App.js`)
- ABI (in `src/VotingSystemABI.json`)

## Building for Production

```bash
npm run build
```

This creates an optimized build in the `build` folder.

## Deployment

### Vercel
```bash
vercel
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=build
```

## Environment Variables

Create `.env` file:
```
REACT_APP_CONTRACT_ADDRESS=your_contract_address
REACT_APP_NETWORK_ID=1337
```

## Customization

- **Styling**: Edit `src/App.css` and `src/index.css`
- **Components**: Modify `src/App.js`
- **Colors**: Update gradient colors in CSS files

## Browser Support

- Chrome (recommended)
- Firefox
- Brave
- Edge

Requires MetaMask extension.
