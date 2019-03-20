# Web3t.js - TrueChain Plus ver

This is the TrueChain JavaScript API developed based on the Ethereum version.

## Installation

install

```
npm install web3true
```

or update

```
npm update web3true
```

## Usage

```JavaScript
var Web3t = require('web3true');

// connect to TrueChain network
var web3t = new Web3t('http://localhost:8545', 'etrue')
web3t.eth.getBlockNumber().then(console.log)
// print: block number

console.log(web3t.currentProvider.type)
// print: "etrue"

// switch network type
// incorrect network correspondence can cause methods to fail!
web3t.setProvider('http://localhost:8545', 'eth')
web3t.eth.getBlockNumber().then(console.log)
// Returned error: The method eth_blockNumber does not exist/is not available

console.log(web3t.currentProvider.type)
// print: "eth"
```

## Documentation
The features for the TrueChain network can be seen in this [document][docs] (Chinese)
Ethereum-version documentation can be found at [read the docs][eth-docs]. Most methods are called in the same way.

[docs]: https://web3tjs.readthedocs.io/zh/latest/
[eth-docs]: http://web3js.readthedocs.io/en/1.0/
