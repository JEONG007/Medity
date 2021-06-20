const { web3 } = window
const selectedAddress = web3.eth.defaultAccount
$(document).ready(function() {


   const CoinRegistryContractAddress = '0xfaDE1e9250105c906B3700b3D95408538AF11dA7';
   const CoinRegistryContractABI =[
      {
         "constant": false,
         "inputs": [
            {
               "name": "_spender",
               "type": "address"
            },
            {
               "name": "_value",
               "type": "uint256"
            }
         ],
         "name": "approve",
         "outputs": [
            {
               "name": "success",
               "type": "bool"
            }
         ],
         "payable": false,
         "stateMutability": "nonpayable",
         "type": "function"
      },
      {
         "constant": false,
         "inputs": [
            {
               "name": "_spender",
               "type": "address"
            },
            {
               "name": "_value",
               "type": "uint256"
            },
            {
               "name": "_extraData",
               "type": "bytes"
            }
         ],
         "name": "approveAndCall",
         "outputs": [
            {
               "name": "success",
               "type": "bool"
            }
         ],
         "payable": false,
         "stateMutability": "nonpayable",
         "type": "function"
      },
      {
         "constant": false,
         "inputs": [
            {
               "name": "_to",
               "type": "address"
            },
            {
               "name": "_value",
               "type": "uint256"
            }
         ],
         "name": "transfer",
         "outputs": [
            {
               "name": "success",
               "type": "bool"
            }
         ],
         "payable": false,
         "stateMutability": "nonpayable",
         "type": "function"
      },
      {
         "constant": false,
         "inputs": [
            {
               "name": "_from",
               "type": "address"
            },
            {
               "name": "_to",
               "type": "address"
            },
            {
               "name": "_value",
               "type": "uint256"
            }
         ],
         "name": "transferFrom",
         "outputs": [
            {
               "name": "success",
               "type": "bool"
            }
         ],
         "payable": false,
         "stateMutability": "nonpayable",
         "type": "function"
      },
      {
         "inputs": [],
         "payable": false,
         "stateMutability": "nonpayable",
         "type": "constructor"
      },
      {
         "payable": true,
         "stateMutability": "payable",
         "type": "fallback"
      },
      {
         "anonymous": false,
         "inputs": [
            {
               "indexed": true,
               "name": "_from",
               "type": "address"
            },
            {
               "indexed": true,
               "name": "_to",
               "type": "address"
            },
            {
               "indexed": false,
               "name": "_value",
               "type": "uint256"
            }
         ],
         "name": "Transfer",
         "type": "event"
      },
      {
         "anonymous": false,
         "inputs": [
            {
               "indexed": true,
               "name": "_owner",
               "type": "address"
            },
            {
               "indexed": true,
               "name": "_spender",
               "type": "address"
            },
            {
               "indexed": false,
               "name": "_value",
               "type": "uint256"
            }
         ],
         "name": "Approval",
         "type": "event"
      },
      {
         "constant": true,
         "inputs": [
            {
               "name": "_owner",
               "type": "address"
            },
            {
               "name": "_spender",
               "type": "address"
            }
         ],
         "name": "allowance",
         "outputs": [
            {
               "name": "remaining",
               "type": "uint256"
            }
         ],
         "payable": false,
         "stateMutability": "view",
         "type": "function"
      },
      {
         "constant": true,
         "inputs": [
            {
               "name": "_owner",
               "type": "address"
            }
         ],
         "name": "balanceOf",
         "outputs": [
            {
               "name": "balance",
               "type": "uint256"
            }
         ],
         "payable": false,
         "stateMutability": "view",
         "type": "function"
      },
      {
         "constant": true,
         "inputs": [],
         "name": "decimals",
         "outputs": [
            {
               "name": "",
               "type": "uint8"
            }
         ],
         "payable": false,
         "stateMutability": "view",
         "type": "function"
      },
      {
         "constant": true,
         "inputs": [],
         "name": "fundsWallet",
         "outputs": [
            {
               "name": "",
               "type": "address"
            }
         ],
         "payable": false,
         "stateMutability": "view",
         "type": "function"
      },
      {
         "constant": true,
         "inputs": [],
         "name": "name",
         "outputs": [
            {
               "name": "",
               "type": "string"
            }
         ],
         "payable": false,
         "stateMutability": "view",
         "type": "function"
      },
      {
         "constant": true,
         "inputs": [],
         "name": "symbol",
         "outputs": [
            {
               "name": "",
               "type": "string"
            }
         ],
         "payable": false,
         "stateMutability": "view",
         "type": "function"
      },
      {
         "constant": true,
         "inputs": [],
         "name": "totalEthInWei",
         "outputs": [
            {
               "name": "",
               "type": "uint256"
            }
         ],
         "payable": false,
         "stateMutability": "view",
         "type": "function"
      },
      {
         "constant": true,
         "inputs": [],
         "name": "totalSupply",
         "outputs": [
            {
               "name": "",
               "type": "uint256"
            }
         ],
         "payable": false,
         "stateMutability": "view",
         "type": "function"
      },
      {
         "constant": true,
         "inputs": [],
         "name": "unitsOneEthCanBuy",
         "outputs": [
            {
               "name": "",
               "type": "uint256"
            }
         ],
         "payable": false,
         "stateMutability": "view",
         "type": "function"
      },
      {
         "constant": true,
         "inputs": [],
         "name": "version",
         "outputs": [
            {
               "name": "",
               "type": "string"
            }
         ],
         "payable": false,
         "stateMutability": "view",
         "type": "function"
      }
   ]
  
   let Address  =  document.getElementById('myaccount').value;
   console.log(Address);
   let contractcoin = web3.eth.contract(CoinRegistryContractABI).at(CoinRegistryContractAddress);
   contractcoin.balanceOf(Address, function(err, result) {
       if (err)
          return showError("Smart contract call failed: " + err);
      console.log(result);
      document.getElementById('balance').innerText = result;

     });
    $('#iceCoffee').click(function() {Transfer("iceCoffee")});
    $('#hotCoffee').click(function() {Transfer("hotCoffee")});
    $('#minCho').click(function() {Transfer("minCho")});
    $('#earlGrey').click(function() {Transfer("earlGrey")});
    $('#bananaCream').click(function() {Transfer("bananaCream")});
    $('#milkTea').click(function() {Transfer("milkTea")});
     async function Transfer(item) {
        if (window.ethereum)
           try {
              await window.ethereum.enable();
           } catch (err) {
              return showError("Access to your Ethereum account rejected.");
           }
        if (typeof web3 === 'undefined')
           return showError("Please install MetaMask to access the Ethereum Web3 injected API from your Web browser.");
        console.log(item);
        let price = document.getElementById(item).value;
        console.log(price);
        let contractcoin = web3.eth.contract(CoinRegistryContractABI).at(CoinRegistryContractAddress);
        contractcoin.transfer('0x429f1D5aE2d81489dC16Ea507084d23D8e8AE9C3',price, function(err, result) {
        if (err)
           return showError("Smart contract call failed: " + err);
          
        });
    }
    async function transferFrom(){

        //transferFrom(address _from, address _to, uint256 _value) returns (bool success) {}
    }
    
})