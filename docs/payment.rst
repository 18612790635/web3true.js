
.. include:: include_announcement.rst

=====
Gas代付交易
=====

交易的手续费（gas）代付是TrueChain网络的特性。基于这种代付机制，允许在构造交易时使交易的发起方（from）和实际的gas扣费地址不同。这一方案可以使得DAPP等应用的新用户不需要理解繁琐的区块链网络账户、经济系统，而直接采用应用提供者或者第三方提供的代付服务，来完成例如数据上链、登记、投票等轻量级的合约调用。

gas代付交易相比与原始的以太坊交易，在交易的结构、签名过程、发送方式上都略有调整。

.. --------------
.. 目录链接
.. --------------

.. :ref:`测试目录1 <web3t-test1>`

.. :ref:`测试目录2 <web3t-test2>`

------------------------------------------------------------------------------

.. _web3t-tx:

交易结构
============

和以太坊交易结构相比，TrueChain网络的交易增加了两个可选字段：

  - ``fee`` - ``String``: 交易额外向矿工支付的费用。在未来这个字段会允许智能合约内部进行查询，以便于一些具有较高价值的ST项目合约可以设置用户手续费的下限。
  - ``payment`` - ``32 Bytes``: 交易的代付账号。如果该字段非空并且签名有效，则仅在扣除gas费用时，会使用代付者账户的余额而不是 ``from`` 账户的余额。

为了便于区分，我们称这种在TrueChain网络中特有的交易成为True交易，相应的在web3t中与之相关的方法或属性名都会带有True以作区分。

.. note:: 由于新增的代付交易需要两次签名，所以没有提供例如 ``web3t.eth.sendTrueTransaction()`` 的直接签发交易的方法。使用者需要先调用相应方法对交易进行签名，再调用 ``web3t.eth.sendSignedTrueTransaction()`` 方法发送至节点。

------------------------------------------------------------------------------

.. _web3t-sign:

交易签名
============

web3t.js拓展了 ``web3t.eth.accounts`` 对象，更新了 ``signTransaction()`` 方法，并且新增了 ``signPrePaymentTransaction()`` 和 ``signPaymentTransaction()`` 方法。
这些方法同样可以直接在 ``Account`` 对象中访问。

.. _signtransaction:

----------
signTransaction
----------

基于web3.js的 `相应方法 <https://web3js.readthedocs.io/en/1.0/web3-eth-accounts.html#signtransaction>`_，在输入参数中新增了可选参数：

  - ``fee`` - ``String``: 交易额外向矿工支付的费用。以wei为单位，默认为0。
  - ``payment`` - ``String``: 交易的代付账号。默认为空。

签名成功后的回调函数或Promise传递的对象中增加了新的字段：

  - ``trueHash`` - ``String``: 新增两个交易参数后的消息hash。
  - ``trueRawTransaction`` - ``String``: 新增两个交易参数后签名的RLP编码交易，如果不需要代付签名，则可以直接使用 :ref:`web3t.eth.sendSignedTrueTransaction() <sendsignedtruetransaction>` 发送。

另外方法本身仍然会直接忽略 ``fee`` 和 ``payment`` 参数进行原始以太坊交易的签名，并生成兼容的签名交易信息。

例如：

.. code-block:: javascript

  web3t.eth.accounts.signTransaction({
    to: '0xF0109fC8DF283027b6285cc889F5aA624EaC1F55',
    value: '1000000000',
    gas: '2000000',
    gas: '21000',
    gasPrice: '1000000',
    chainId: '10'
  }, '0x01')
  .then(console.log);
  > {
      messageHash: '0xf1413fa2ca399e47a9187c8a2c9d40995ed86eec9c0dfbec5e25d035b0591d5c',
      v: '0x37'
      r: '0xd68d03f1322153dca7b7b10743f1c943b610afb5c758d6bcebab60550082b3ea'
      s: '0x69cfecacb4948b4d6cf7ede85c12131021b26750518062de2d02a523d5f153e'
      rawTransaction: '0xf86882029a830f424082520894f0109fc8df283027b6285cc889f5aa624eac1f55843b9aca008037a0d68d03f1322153dca7b7b10743f1c943b610afb5c758d6bcebab60550082b3eaa0069cfecacb4948b4d6cf7ede85c12131021b26750518062de2d02a523d5f153e'
      trueHash: '0x94dbb887ecd895d880a832ddfb3b167170be2e5a68d701e88d30c34cae816c9d'
      trueRawTransaction: '0xf86a82029a830f424082520894f0109fc8df283027b6285cc889f5aa624eac1f55843b9aca0080808038a03f943d51d7721446ca9754e282f906a9f765e227eaaa975d5d40fb259bcbd446a02770aac09f2224bce567da4e93f9b075e565105dafa369bbf0546d4f2355fc9c'
  }

------------------------------------------------------------------------------

.. _web3t-send:

交易发送
============

.. _sendsignedtruetransaction:

----------
sendSignedTrueTransaction
----------

调用该方法来向节点发送一个签名过后的True交易
