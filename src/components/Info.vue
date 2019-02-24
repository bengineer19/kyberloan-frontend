<template>
    <div>
        <h1>Info</h1>
        <p v-if="error">{{ error }}</p>
        <b-container>
          <b-card-group deck>
            <b-card 
              border-variant="primary"
              header-bg-variant="primary"
              header-text-variant="white"
              bg-variant="light" 
              header="Lender account info">
              <b-card-text>
                <p>Eth Balance: {{ lenderBalanceETH }} Eth</p>
                <p>OMG Balance: {{ lenderBalanceOMG }} OMG</p>
                <p>Address: {{ lenderAddress }}</p>
              </b-card-text>
            </b-card>

            <b-card 
              border-variant="primary"
              header-bg-variant="primary"
              header-text-variant="white"
              bg-variant="light" 
              header="Borrower account info">
              <b-card-text>
                <p>Balance: {{ borrowerBalance }} Eth</p>
                <p>Address: {{ borrowerAddress }}</p>
              </b-card-text>
            </b-card>
          </b-card-group>

          <br>
          <br>
          <b-button @click="resetState" variant="outline-warning">Reset demo</b-button>
        </b-container>
    </div>
</template>

<script>
import Web3 from 'web3'
import config from "../config"

var web3 = new Web3(new Web3.providers.HttpProvider(config.PROVIDER));

var OMGInstance = new web3.eth.Contract(config.OMG_ABI, config.OMG_ADDRESS);

export default {
  name: 'Info',
  data: function(){
    return {
      error: null,
      borrowerAddress: config.DEMO_BORROWER_ADDRESS,
      borrowerBalance: "Fetching balance ...",
      lenderAddress: config.DEMO_LENDER_ADDRESS,
      lenderBalanceETH: "Fetching balance ...",
      lenderBalanceOMG: "Fetching balance ...",
      contractAddress: config.DEMO_CONTRACT_ADDRESS,
    }
  },
  methods: {
    resetState(event){
      this.$store.commit('RESET_STATE');
    }
  },

  async beforeMount(){
    web3.eth.getBalance(config.DEMO_BORROWER_ADDRESS)
    .then(b => Web3.utils.fromWei(b, 'ether'))
    .then(b => this.borrowerBalance = b)
    .catch(err => {
        this.error = err.statusCode;
      });

    web3.eth.getBalance(config.DEMO_LENDER_ADDRESS)
    .then(b => Web3.utils.fromWei(b, 'ether'))
    .then(b => this.lenderBalanceETH = b)
    .catch(err => {
        this.error = err.statusCode;
      });

    var OMGBalance = await OMGInstance.methods.balanceOf(config.DEMO_LENDER_ADDRESS).call()
    this.lenderBalanceOMG = web3.utils.fromWei(OMGBalance)

    return;
  }
}

</script>

<style scoped>
</style>
