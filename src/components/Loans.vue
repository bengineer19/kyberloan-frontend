<template>
  <div>
    <h1>Loans</h1>
    <p v-if="error">{{ error }}</p>
    <b-container>
      <b-card
      title="Create loan"
      style="max-width: 20rem;"
    >
      <b-card-text>
        Create a loan contract, specifying the amount of collateral to put up.
      </b-card-text>
      
      <b-form-group label-cols-sm="3" label="City:" label-align-sm="right" label-for="nestedCity">
        <b-form-input :id="collateral" :type="number" />
      </b-form-group>
      <br>
      <b-button v-on:click="onDeploy" variant="primary">Deploy new contract</b-button>
    </b-card>

      <br>
      <br>
      <b-button v-on:click="onExecute" variant="primary">Request new loan</b-button>
      <br>
    </b-container>
  </div>
</template>

<script>
import Web3 from 'web3'
import config from "../config"

 
var web3 = new Web3(new Web3.providers.HttpProvider(config.PROVIDER));


function deployContract(event) {
  console.log("deploying...")
  var contract = new web3.eth.Contract(config.CONTRACT_ABI, config.DEMO_CONTRACT_ADDRESS);

  contract.deploy({
    data: config.CONTRACT_BYTECODE,
    arguments: [config.KYBER_NETWORK_PROXY]
  })

  .send({
      from: config.DEMO_BORROWER_ADDRESS,
      gas: 1500000,
      gasPrice: '30000000000000'
  // }, (error, transactionHash) => { ... })
  })
  // .on('error', (error) => { ... })
  // .on('transactionHash', (transactionHash) => { ... })
  .on('receipt', (receipt) => {
    console.log(receipt.contractAddress)
    deployedContractAddr = receipt.contractAddress;
  })
  // .on('confirmation', (confirmationNumber, receipt) => { ... })
  .then((newContractInstance) => {
      console.log(newContractInstance.options.address)
  });
}

function execContract(event) {
  console.log(event)
  // var contract = new web3.eth.Contract(config.CONTRACT_ABI, config.DEMO_CONTRACT_ADDRESS);
  var contract = new web3.eth.Contract(config.CONTRACT_ABI, deployedContractAddr);
  console.log(contract)

  var tokenAddr = config.OMG_ADDRESS
  var destinationAddr = config.DEMO_LENDER_ADDRESS

  contract.methods.execSwap(tokenAddr, destinationAddr).send({
    from: config.DEMO_BORROWER_ADDRESS,
    value: Web3.utils.toWei('1', 'ether'),
    gas: 1000000
  })
  .then(function(res){
      console.log(res);
  }).catch(function(err) {
      console.log(err);
  });
}

export default {
  name: 'Loans',
  data: function(){
    return {
      // deployedContractAddr: "unknown"
    }
  },
  methods: {
    onExecute(evt) {
      execContract(evt);
    },
    onDeploy(evt) {
      deployContract(evt);
    }
  },
}
</script>

<style scoped>
</style>
