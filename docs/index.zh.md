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

该API可以同时创建兼容TrueChain或以太坊网络的对象。其中部分方法例如`getSnail`只能在连接到TrueChain网络时使用。

``` JavaScript
var Web3 = require('web3')

// 连接到TrueChain网络
var web3 = new Web3('http://localhost:8545', 'etrue')
web3.eth.getBlockNumber().then(console.log)
// 打印相应的快链高度

console.log(web3.currentProvider.type)
// 打印: "etrue"

// 切换网络
// 当网络类型和连接到的节点不匹配时接口无法正常工作
web3.setProvider('http://localhost:8545', 'eth')
web3.eth.getBlockNumber().then(console.log)
// 返回错误: The method eth_blockNumber does not exist/is not available

console.log(web3.currentProvider.type)
// 打印: "eth"
```

## 文档

基本使用方式可以参考以太坊的web3说明文档，可以在[这里](http://web3js.readthedocs.io/en/1.0/)看到。对于开发中常用的接口和拓展的接口会在本文档中单独列出。

## 基本使用

### 初始化

和普通的web3一样，初始化web3对象需要提供相应的`Provider`以连接对等网络节点，包括`HttpProvider`、`WebsocketProvider`、`IpcProvider`。对于TrueChain网络可以使用官方提供的节点 https://rpc.truedapp.net ，该`HttpProvider`会始终保持在最新的网络上。

区别于以太坊web3，在设置Provider时需要提供网络的类型，其中`eth`代表以太坊网络，`etrue`代表TrueChain网络，不同网络的请求名称不通，无法混用。下文中所有接口的展示均默认连接TrueChain网络。

> 默认连接网络类型为`etrue`，因此也可以不做设置。

#### 输入

1. `Obejct || string` - `provider`：有效的连接节点信息
2. `string` - `type`：[可选]节点类型，可选的输入值为'eth'或者'etrue'，其余输入或者不输入都会认为时默认etrue网络

#### 示例

``` JavaScript
var Web3 = require('web3')
var web3 = new Web3('http://localhost:8545', 'eth')
// 连接到本地以太坊私有网络

web3.setProvider('https://rpc.truedapp.net')
// 连接到TrueChain当前主网

console.log(web3.currentProvider.type)
// 输出: "etrue"
```

### 导入账户

除了查询接口外，在网络上所有的请求都需要有一个账户，并且从相应的账户中扣取相应的费用。web3提供了`web3.eth.accounts.wallet`对象，可以将账户信息导入到该对象中，则之后所有的请求只要设置了与之账户信息相对应的`from`地址，则可以自动完成请求的签名。

> 除了导入账户外，也可以先构造交易体，再由用户的私钥进行签名，签名后的交易直接使用`web3.eth.sendSignedTransaction`发送即可。这种方法中可以将第二部签名分离出来，交由例如离线钱包、硬件钱包完成，使得整个外层应用不会接触到用户的私钥，更加的安全。  
> Web3本身也提供了相应的签名方法`web3.eth.signTransaction`。

创建账户可以keystore导入或者私钥导入，相应的方法为：`accounts.decrypt(keystoreJsonV3, password)`、`accounts.privateKeyToAccount(privateKey)`。

以上两个方法均会返回账户对象，通过`accounts.wallet.add(account)`方法将其添加至钱包中即可导入该账户。

#### 示例

``` JavaScript
const account = web3.eth.accounts.privateKeyToAccount('0x01')
console.log(account.address)
// "0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf"

web3.eth.accounts.wallet.add(account)
console.log(web3.eth.accounts.wallet)
// {
//  length: 1,
//  0: <account>,
//  0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf: <account>,
//  0x7e5f4552091a69125d5dfcb7b8c2659029395bdf: <account>,
//  ...
//}
```
