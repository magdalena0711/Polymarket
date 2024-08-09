require('@nomicfoundation/hardhat-ignition');
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
    solidity: "0.8.19",
    networks: {
        sepolia: {
            url: process.env.TENDERLY_RPC_URL,
            accounts: [process.env.PRIVATE_KEY]
        }
    },
    ignition: {
        modules: ['LockModule', 'RunnerTrackerModule', 'FundManagerModule']
    }
};
