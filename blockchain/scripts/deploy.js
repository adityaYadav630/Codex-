const hre = require("hardhat");

async function main() {
  const SplitChain = await hre.ethers.getContractFactory("SplitChain");

  const splitChain = await SplitChain.deploy();

  await splitChain.waitForDeployment(); // 🔥 FIX HERE

  console.log("SplitChain deployed to:", await splitChain.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
