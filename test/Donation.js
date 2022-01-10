const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Donation", function () {
  let donation;
  let accounts;

  //хук выполняемый перед каждым тестом (присваиваем аккаунты HardHat и создаём экземпляр контракта)
  beforeEach(async () => {
    accounts = await ethers.getSigners();
    const Donation = await ethers.getContractFactory("Donation");
    donation = await Donation.deploy();
    await donation.deployed();
  });
  
  //проверка, что контракт задеплоен
  it('Checking a contract is deployed', () => { 
    assert(donation.address);
  });

  //проверка, что контракт создан владельцем
  it("Checking contract creater is an owner", async function () {
    expect(await donation.owner()).to.equal(accounts[0].address);
  });

  //проверка что только owner может вывести денежные средства
  it("Checking that only owner can withdraw ", async function () {
    //проверяем что, создатель контракта может выполнить функцию вывода
    await donation.connect(accounts[0]).transferToCertainAddress(accounts[0].address)
    //проверяем что, другие аккаунты не могут выполнить функцию вывода
    let a = 0;
    try {
    await donation.connect(accounts[1]).transferToCertainAddress(accounts[1].address)
    a = 1;
    } catch(err) {
    }
    if (a == 1) {
     assert(false, "Checking that only owner can withdraw money")
    } 
  });

  //проверка, что баланс контракта равен сумме пожертвований
  it("Checking that balance of contract is equal donation's summ", async function () {
    const contract = require("C:/Projects/Hard Hat/artifacts/contracts/Donation.sol/Donation.json");

    const donationContract = new ethers.Contract(
      donation.address, 
      contract.abi, 
      accounts[0]);
    await donationContract
    
    const tx = {
      to: donation.address,
      value: ethers.utils.parseEther('0.01')
    }
    const send1Tx = await accounts[0].sendTransaction(tx)
    const send2Tx = await accounts[1].sendTransaction(tx)
    await send1Tx.wait()
    await send2Tx.wait()
    const balance = await ethers.provider.getBalance(donation.address)
    expect(ethers.utils.formatEther(balance)).to.equal('0.02')
  });
});

 
