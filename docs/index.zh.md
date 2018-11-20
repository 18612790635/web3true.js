# TrueChain网络Web3说明文档

该JavaScript API基于[以太坊的web3.js](https://github.com/ethereum/web3.js)开发，在保留了web3原有接口的情况下，增加了兼容TrueChain主网的设置和新的接口。

## 安装

有三种方法可以安装该API包：

### 使用webpack管理

推荐使用这种方法，可以在开发中灵活的在TrueChain和以太坊版本web3.js之间切换，方便版本控制。

在配置文件package.json中增加（或更改原web3.js配置）

``` json
{
  "dependencies": {
    "web3": "github:truechain/web3.js#master"
  }
}
```

之后安装或更新：

``` bash
npm install web3

npm update web3
```

### 直接下载

可以直接下载使用dist目录下的[`web3.min.js`](../dist/web3.min/js)。

``` html
<script src='web3.min.js' />
<script>
  const web3 = new Web3('http://127.0.0.1:8545')
</script>
```

### 下载编译

clone整个仓库并且自己编译，相比于直接下载可以更加灵活控制版本并且进行一定的微调。

``` bash
git clone https://github.com/truechain/web3.js.git

cd web3.js

npm i
npm run build
```

使用本地dist路径下的`web3.js`或`web3.min.js`即可。

## 使用

该API可以同时创建兼容TrueChain或以太坊网络的对象。

``` JavaScript
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

## 文档

基本使用方式可以参考以太坊的web3说明文档，可以在[这里](http://web3js.readthedocs.io/en/1.0/)看到。