import { ethers } from "hardhat";
const hre = require("hardhat");

async function main() {
  const nutFactory = await hre.ethers.getContractFactory("ProfileImageNft")
  const profileImageContract = await nutFactory.deploy()

  await profileImageContract.deployed();

  console.log("Profile Image Contract deployed to:", profileImageContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
