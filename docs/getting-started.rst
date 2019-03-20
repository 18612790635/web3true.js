
.. include:: include_announcement.rst

.. _start:

=====
开始使用
=====

关于web3.js库的结构，请查阅web3 1.0官方文档。web3t.js仅在web3-eth模块下新增了部分方法。

.. _adding-web3t:

添加web3t.js
=============

.. index:: npm

我们建议使用npm安装web3t.js到你的项目中。（目前还不可使用）

- npm: ``npm install web3t``

或者从我们的git下载源码编译，或直接使用其中的 ``web3t.min.js`` 文件

- github: `https://github.com/truechain/web3.js <https://github.com/truechain/web3.js>`_

.. _init-web3t:

初始化Web3t对象
=============

和初始化web3对象一致，初始化web3t对象时需要设置节点链接的提供者（provider）。如同面向以太坊的浏览器插件MetaMask会在全局提供一个 ``ethereumProvider`` 对象一样，如果用户使用我们的浏览器插件 `GreenBelt <https://chrome.google.com/webstore/detail/greenbelt/cgmhechlnfbnfcnomkmcillkgnipocfh?hl=zh-CN>`_。你可以检查全局是否存在可用的 ``web3t.currentProvider``，否则你需要自己提供一个可用的远端或者本地节点。
与web3.js不同的是，初始化Web3t对象时还可以传入一个可选的字符串类型变量来指定链接网络的类型。目前的可选值为 ``'true'`` 或 ``'eth'`` 默认为 ``'true'``。部分属于TrueChain网络特有的方法会在选择网络类型为 ``'eth'`` 时被禁用。

.. code-block:: javascript

  const Web3t = require('web3t');

  const web3t = new Web3t(web3t.currentProvider || "http://localhost:8545", 'true');

现在你就已经创建了一个web3t对象.

.. note:: 为了和很多会在全局注册web3对象的以太坊工具区分，我们选择并且强烈建议开发者使用后缀 ``t`` 来区分面向两个不同网络的工具。虽然web3t本身是完全兼容以太坊网络的接口的，这意味着当你需要开发一个同时在两个链上交互的应用时，你可以仅引入一个web3t.js。另一方面，为了开发者能够较快的迭代项目至TrueChain网络，我们并没有修改web3t下各模块的名称，以便于代码可以不用做过多改动直接迁移。（我们仍然使用例如 ``web3t.eth.getBlock()`` 而不是 ``web3t.etrue.getBlock()``）
