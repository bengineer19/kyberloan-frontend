<template>
    <div>
        <h1>Info</h1>
        <p>Balance: {{ balance }}</p>
    </div>
</template>

<script>
import Web3 from 'web3'
import config from "../config"

var web3 = new Web3(new Web3.providers.HttpProvider(config.PROVIDER));

var accountAddr = web3.eth.accounts[config.DEFAULT_ACCOUNT]
web3.eth.defaultAccount = accountAddr;

web3.eth.getBalance(accountAddr, (err, wei) => {
  var balance = web3.utils.fromWei(wei, 'ether')
})

export default {
  name: 'Info',
}

</script>

<style scoped>
</style>
