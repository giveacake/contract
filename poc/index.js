const { ethers } = require("ethers");

// GiveCake Abi
const cake_abi = [
    // Read-Only Functions
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",

    // Authenticated Functions
    "function transfer(address to, uint amount) returns (bool)",

    // Events
    "event Transfer(address indexed from, address indexed to, uint amount)",

    // transferFrom function
    "function transferFrom(address sender, address recipient, uint256 amount) returns (bool)",

    // isBlackListed check
    "_isBlacklisted(address) returns (bool"
];

// connect binance smartchain
// get provider
const url = "https://bsc-dataseed.binance.org/";
const provider = new ethers.providers.JsonRpcProvider(url);

// your privateKey
const privateKey = "0x123123123"

// address
// 0x04686f85F8184Aaf4De30f063E4FF1257bD020d2


// GiveCake Contract address
const contractAddr = '0x106eadb44566c32132b027684f9c5b3c26d404b8';
const contractAbi = cake_abi;


const sendGiveToken = async (receiver, amount) => {
    
    // Generate Wallet fo interaction
    const wallet = new ethers.Wallet(privateKey, provider);
    
    let giveContract = new ethers.Contract(
        contractAddr,
        contractAbi,
        wallet
    );

    let isBlockList = await giveContract._isBlacklisted(wallet.address)
    // check if the address is on the blacklist
    if(!isBlockList){
        // options for change gasLimit 
        let options = {
            // choice your gas limit 
            gasLimit: 85000,
            to: receiver
        }
        try {
            console.log("waiting send transaction")
            const tx = await giveContract.transfer(options, parseUnits(amount));
            await tx.wait();

            // gasPrice
            const gasPrice = await ethers.providers.getGasPrice()

            console.log("result of sending transaction ", tx);
            console.log("gas price:", gasPrice);
        } catch (error) {
            console.log("error...", error)
        }
    }
    
}

// try function
sendGiveToken('0x04686f85F8184Aaf4De30f063E4FF1257bD020d2','66666.57568181818181819');

