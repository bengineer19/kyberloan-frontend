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
                <p>Address: {{ lenderAddress }}</p>
                <p><strong>Eth Balance: {{ lenderETHBalance }} Eth</strong></p>
                <p v-for="token in lenderTokens">{{ token.name }}: {{ token.balance }}</p>
              </b-card-text>
            </b-card>

            <b-card 
              border-variant="primary"
              header-bg-variant="primary"
              header-text-variant="white"
              bg-variant="light" 
              header="Borrower account info">
              <b-card-text>
                <p>Address: {{ borrowerAddress }}</p>
                <p><strong>Eth Balance: {{ borrowerETHBalance }} Eth</strong></p>
                <p v-for="token in borrowerTokens">{{ token.name }}: {{ token.balance }}</p>
              </b-card-text>
            </b-card>
          </b-card-group>

          <br>
          <br>
          <b-button @click="resetState" variant="outline-warning">Reset front-end demo</b-button>
        </b-container>
    </div>
</template>

<script>
import Web3 from 'web3'
import config from "../config"

var web3 = new Web3(new Web3.providers.HttpProvider(config.PROVIDER));

export default {
  name: 'Info',
  data: function(){
    return {
      error: null,
      lenderTokens: [],
      borrowerTokens: [],
      borrowerAddress: config.DEMO_BORROWER_ADDRESS,
      borrowerETHBalance: "Fetching balance ...",
      lenderAddress: config.DEMO_LENDER_ADDRESS,
      lenderETHBalance: "Fetching balance ...",
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
    .then(b => this.borrowerETHBalance = parseFloat(b).toFixed(2))
    .catch(err => {
      this.error = err.statusCode;
    });

    web3.eth.getBalance(config.DEMO_LENDER_ADDRESS)
    .then(b => Web3.utils.fromWei(b, 'ether'))
    .then(b => this.lenderETHBalance = parseFloat(b).toFixed(2))
    .catch(err => {
      this.error = err.statusCode;
    });

    for (var i = 0; i < config.liquidationTokens.length; i++) {
      var token = config.liquidationTokens[i];
      var tokenInstance = new web3.eth.Contract(token.abi, token.addr);

      var lenderBalance = await tokenInstance.methods.balanceOf(config.DEMO_LENDER_ADDRESS).call();
      var decimals = await tokenInstance.methods.decimals().call();
      lenderBalance = (lenderBalance / 10**decimals).toFixed(2);
      this.lenderTokens.push({name: token.name, balance: lenderBalance});
      var borrowerBalance = await tokenInstance.methods.balanceOf(config.DEMO_BORROWER_ADDRESS).call();
      decimals = await tokenInstance.methods.decimals().call();
      borrowerBalance = (borrowerBalance / 10**decimals).toFixed(2);
      this.borrowerTokens.push({name: token.name, balance: borrowerBalance});
    }

    return;
  }
}

</script>

<style scoped>
</style>
