const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers, waffle } = require("hardhat");

describe("Attack", function () {
    it("Should change the owner of the Good contract", async function () {
        // Deploy the helper contract
        const helperContract = await ethers.getContractFactory("Helper");
        const _helperContact = await helperContract.deploy();
        await _helperContact.deployed();
        console.log("Helper Contract's Address:", _helperContact.address);

       // Deploy the good contract
       const goodContract = await ethers.getContractFactory("Good");
       const _goodContact = await goodContract.deploy(_helperContact.address);
       await _goodContact.deployed();
       console.log("Good Contract's Address:", _goodContact.address);

       // Deploy the Attack contract
       const attackContract = await ethers.getContractFactory("Attack");
       const _attackContact = await attackContract.deploy(_goodContact.address);
       await _attackContact.deployed();
       console.log("Attack Contract's Address:", _attackContact.address);

        // Now let's attack the good contract

        // Start the attack
        let tx = await _attackContact.attack();
        await tx.wait();

        expect(await _goodContact.owner()).to.equal(_attackContact.address);
    })
} )