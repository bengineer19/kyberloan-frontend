<template>
  <div>
    <h1>Loans</h1>
    <p v-if="error">{{ error }}</p>
    <b-container>
      <div>
        <b-form @submit="onSubmit">
          <!-- <b-form-group
            id="exampleInputGroup1"
            label="Email address:"
            label-for="exampleInput1"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="exampleInput1"
              type="email"
              v-model="form.email"
              required
              placeholder="Enter email" />
          </b-form-group> -->

          <!-- <b-form-group id="exampleInputGroup3" label="Token:" label-for="exampleInput3">
            <b-form-select id="exampleInput3" :options="OMG" required v-model="form.food" />
          </b-form-group> -->

          <b-button type="submit" variant="primary">Execute contract</b-button>
        </b-form>
      </div>
    </b-container>
  </div>
</template>

<script>
import Web3 from 'web3'
import config from "../config"

 
var web3 = new Web3(new Web3.providers.HttpProvider(config.PROVIDER));

function testContract(event){
  console.log(event)
  var contract = new web3.eth.Contract(config.CONTRACT_ABI, config.DEMO_CONTRACT_ADDRESS);
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
    }
  },
  methods: {
    onSubmit(evt) {
      testContract(evt);
    }
  },
}
</script>

<style scoped>
</style>
