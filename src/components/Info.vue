<template>
    <div>
        <h1>Info</h1>
        <p v-if="error">{{ error }}</p>
        <b-container>
          <b-card bg-variant="light" header="Account info" >
            <b-card-text>
              <p>Balance: {{ balance }} Eth</p>
              <p>Address: {{ address }}</p>
            </b-card-text>
          </b-card>
        </b-container>
        <!-- <p>Test: {{ result }}</p> -->
    </div>
</template>

<script>
import Web3 from 'web3'
import config from "../config"


var web3 = new Web3(new Web3.providers.HttpProvider(config.PROVIDER));

// var balance = "Undefined"

var contract = new web3.eth.Contract(config.ABI, config.DEMO_ACCOUNT_ADDRESS);
console.log(contract)
// var result = contract.methods.hi.call()
// console.log(result)

// web3.eth.getBalance(config.DEMO_ACCOUNT_ADDRESS).then(function(result){ balance = result })

export default {
  name: 'Info',
  data: function(){
    return {
      error: null,
      address: config.DEMO_ACCOUNT_ADDRESS,
      balance: "hmm",
      // result: result
    }
  },
  async beforeMount(){
    web3.eth.getBalance(config.DEMO_ACCOUNT_ADDRESS)
    .then(b => Web3.utils.fromWei(b, 'ether'))
    .then(b => this.balance = b)
    .catch(err => {
        this.error = err.statusCode;
      });

    return;
  }
}

</script>

<style scoped>
</style>
