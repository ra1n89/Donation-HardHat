require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = "";

// Replace this private key with your Ropsten account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
const RINKEBY_PRIVATE_KEY = ""; //test account

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

//таск для проверки баланса контракта в сети Rinkeby
//npx hardhat rBalance --address <contract address> --network rinkeby
task("rBalance", "Shows balance of the conrtact deployed on Rinkeby")
  .addParam("address", "The contract address on Rinkeby")
  .setAction(async (taskArgs) => {
    const contract = require("./artifacts/contracts/Donation.sol/Donation.json");
    const provider = new ethers.providers.AlchemyProvider("rinkeby", ALCHEMY_API_KEY);
    const balance = await ethers.provider.getBalance(taskArgs.address)
    console.log(ethers.utils.formatEther(balance), "ETH")
});

//таск для отправки 0.01ETH на контракт в сети Rinkeby
//npx hardhat rSend --address <contract address> --network rinkeby   
task("rSend", "Send 0.01ETH to contract from Signer on Rinkeby")
  .addParam("address", "The contract address on Rinkeby")
  .setAction(async (taskArgs) => {
    const contract = require("./artifacts/contracts/Donation.sol/Donation.json");
    const provider = new ethers.providers.AlchemyProvider("rinkeby", ALCHEMY_API_KEY);
    const signer = new ethers.Wallet(RINKEBY_PRIVATE_KEY, provider);
    const tx = {
      to: taskArgs.address,
      value: ethers.utils.parseEther('0.01')
    }
    const sendTx = await signer.sendTransaction(tx)
    await sendTx.wait()
});

//таск для вывода всех денежных средств контракта на адрес создателя контракта в сети Rinkeby
//npx hardhat rWithdraw --address <contract address> --network rinkeby  
task("rWithdraw", "Withdraw all money to Signer on Rinkeby")
  .addParam("address", "The contract address on Rinkeby")
  .setAction(async (taskArgs) => {
    const contract = require("./artifacts/contracts/Donation.sol/Donation.json");
    const provider = new ethers.providers.AlchemyProvider("rinkeby", ALCHEMY_API_KEY);
    const signer = new ethers.Wallet(RINKEBY_PRIVATE_KEY, provider);
    const donationContract = new ethers.Contract(
      taskArgs.address, 
      contract.abi, 
      signer);
    await donationContract.transferToCertainAddress(signer.address)
    
});


module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${RINKEBY_PRIVATE_KEY}`]
    }
  }
};
