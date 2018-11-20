# Web3.js - TrueChain Plus ver

This is the TrueChain JavaScript API developed based on the Ethereum version.

## Installation

webpack config

```JSON
{
  "dependencies": {
    "web3": "github:truechain/web3.js#1.0"
  }
}
```

install

```
npm install web3
```

or update

```
npm update web3
```

## Usage

```JavaScript
var Web3 = require('web3');

// connect to TrueChain network
var web3 = new Web3('http://localhost:8545', 'etrue')
web3.eth.getBlockNumber().then(console.log)
// print: block number

console.log(web3.currentProvider.type)
// print: "etrue"

// switch network type
// incorrect network correspondence can cause methods to fail!
web3.setProvider('http://localhost:8545', 'eth')
web3.eth.getBlockNumber().then(console.log)
// Returned error: The method eth_blockNumber does not exist/is not available

console.log(web3.currentProvider.type)
// print: "eth"
```

## Documentation
Ethereum-version documentation can be found at [read the docs][docs]. Most methods are called in the same way.

[docs]: http://web3js.readthedocs.io/en/1.0/
