import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.2",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/Hp7ozrqfT7OffHpkLsxWQZVvIBgA4PzG",
      accounts: [process.env.WEB3_ACCOUNT!]
    }
  }
};

export default config;
