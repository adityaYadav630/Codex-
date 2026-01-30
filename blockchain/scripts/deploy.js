import hre from "hardhat";

async function main() {
  const Expense = await hre.ethers.getContractFactory("Expense");
  const expense = await Expense.deploy();

  await expense.waitForDeployment();

  console.log("✅ Contract deployed at:", await expense.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
