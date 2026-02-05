const fs = require('fs');

const contractJson = JSON.parse(
  fs.readFileSync('artifacts/contracts/VotingSystem.sol/VotingSystem.json', 'utf8')
);

fs.writeFileSync(
  'frontend/src/VotingSystemABI.json',
  JSON.stringify(contractJson.abi, null, 2)
);

console.log('ABI extracted successfully!');
