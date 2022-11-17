import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config({ path: __dirname + '/.env' })

const config: HardhatUserConfig = {
  solidity: "0.8.2",
  networks: {
    hardhat: {
    },
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/Hp7ozrqfT7OffHpkLsxWQZVvIBgA4PzG",
      accounts: [process.env.WEB3_ACCOUNT!]
    }
  }
};

export default config;
