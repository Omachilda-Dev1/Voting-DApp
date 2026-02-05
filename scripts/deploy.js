const hre = require("hardhat");

async function main() {
  console.log("Deploying VotingSystem contract...");

  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
  const votingSystem = await VotingSystem.deploy();

  await votingSystem.waitForDeployment();

  const address = await votingSystem.getAddress();
  console.log("VotingSystem deployed to:", address);
  console.log("Admin address:", (await hre.ethers.getSigners())[0].address);
  
  // Save deployment info
  const fs = require("fs");
  const deploymentInfo = {
    contractAddress: address,
    network: hre.network.name,
    deployedAt: new Date().toISOString()
  };
  
  fs.writeFileSync(
    "frontend/src/contractConfig.json",
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("\nDeployment info saved to frontend/src/contractConfig.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
