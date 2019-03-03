<template>
  <div>
    <h1>Lending</h1>

    <!-- Loan collateral seizure modal -->
    <b-modal id="withdrawModal" title="Withdraw collateral">
      <p>You are about to sieze the loan collateral.</p>
      <p>Which token would you like to liquidate the collateral in?</p>

      <!-- Token options dropdown -->
      <b-form-select v-model="selectedToken" :options="tokenOptions"/>

      <div slot="modal-footer" class="w-100">
        <small class="text-muted float-left">Powered by Kyber</small>
        <!-- <p class="float-left">Powered by Kyber</p> -->
        <b-button id="ok-btn" class="float-right" variant="primary" @click="onLoanSieze($event)">Withdraw</b-button>
      </div>
    </b-modal>

    <b-container>
      <div>
        <b-tabs content-class="mt-3" v-model="tabIndex">
          <!--  -->
          <!-- TAB 1: Register as lender -->
          <!--  -->
          <b-tab title="Register as lender" active>
            <h4>Loan requests which you can accept as a lender</h4>
            <br>
            <b-card-group deck>
              <b-card 
                v-for="(loan, counter) in unregisteredLoanList"
                v-bind:title="'Loan ' + (counter + 1)"
              >
                <b-card-text>
                  <p>Loan detail: {{ loan.details }}</p>
                  <br>
                  <b-button 
                    variant="outline-primary" 
                    v-bind:id="loan.id"
                    v-on:click="onLoanRegister($event)"
                  >Accept loan</b-button>
                </b-card-text>
                <div slot="footer"><p>Loan Collateral: {{ loan.collateral }} ETH</p></div>
              </b-card>

            </b-card-group>
          </b-tab>

          <!--  -->
          <!-- TAB 2: Perform actions on existing loans -->
          <!--  -->
          <b-tab title="My accepted loans">
            <b-card-group deck>
              <b-card v-for="(loan, counter) in registeredLoanList" v-bind:title="'Loan ' + (counter + 1)">
                <b-card-text>
                  <p>Loan detail: {{ loan.details }}</p>
                  <br>
                  <b-button 
                    variant="success"
                    v-bind:id="loan.id"
                    v-on:click="onLoanFulfil($event)"  
                  >Loan fulfilled</b-button>
                  <br>
                  <br>
                  <b-button 
                    v-b-modal.withdrawModal variant="danger"
                    v-on:click="onSiezeModalLaunch($event)"
                    v-bind:id="loan.id"
                  >Loan defaulted</b-button>
                </b-card-text>
                <div slot="footer"><p>Loan Collateral: {{ loan.collateral }} ETH</p></div>
              </b-card>
            </b-card-group>
          </b-tab>
        </b-tabs>
      </div>

    </b-container>
  </div>
</template>

<script>
import Web3 from 'web3'
import config from "../config"

 
var web3 = new Web3(new Web3.providers.HttpProvider(config.PROVIDER));

function fulfilLoan(contractAddr) {
  var contract = new web3.eth.Contract(config.CONTRACT_ABI, contractAddr);

  contract.methods.borrower().call().then((r) => {console.log(r)});
  contract.methods.lender().call().then((r) => {console.log(r)});
  contract.methods.collateral().call().then((r) => {console.log(r)});

  contract.methods.returnCollateral().send({
    from: config.DEMO_LENDER_ADDRESS,
    gas: config.LOAN_GAS,
    gasPrice: web3.defaultGasPrice
  })
  .then(function(res){
    console.log(res);
  }).catch(function(err) {
    console.log(err);
  });
}

// Extract collateral and return it in required token
function siezeLoan(contractAddr, tokenAddr) {
  var contract = new web3.eth.Contract(config.CONTRACT_ABI, contractAddr);

  console.log("Address: ");
  console.log(tokenAddr);

  contract.methods.siezeCollateral(tokenAddr).send({
    from: config.DEMO_LENDER_ADDRESS,
    gas: config.LOAN_GAS,
    gasPrice: web3.defaultGasPrice
  })
  .then(function(res){
    console.log(res);
  }).catch(function(err) {
    console.log(err);
  });

}

function registerForLoan(contractAddr) {
  var contract = new web3.eth.Contract(config.CONTRACT_ABI, contractAddr);
  // Log value of contract.lenderRegistered
  contract.methods.lenderRegistered().call().then((r) => {console.log(r)});

  contract.methods.registerAsLender().send({
    from: config.DEMO_LENDER_ADDRESS,
    gas: config.LOAN_GAS,
    gasPrice: web3.defaultGasPrice
  })
  .then(function(res){
    console.log(res);
    // Log value of contract.lenderRegistered
    contract.methods.lenderRegistered().call().then((r) => {console.log(r)});
  }).catch(function(err) {
    console.log(err);
  });
}

export default {
  name: 'Loans',
  data: function(){
    return {
      newLoan: this.$emptyLoan,
      tabIndex: 0,
      activeModalLoanId: null,
      selectedToken: null,
      tokenOptions: [
        { value: null, text: 'Please select an option' },
        { value: config.ETH_ADDRESS, text: 'ETH' },
        { value: config.OMG_ADDRESS, text: 'OMG' },
      ]
    }
  },
  computed : {
    loanList(){
      return this.$store.getters.LOANLIST;
    },
    registeredLoanList(){
      return this.$store.getters.REGISTERED_LOANLIST;
    },
    unregisteredLoanList(){
      console.log(this.$store.getters.UNREGISTERED_LOANLIST);
      return this.$store.getters.UNREGISTERED_LOANLIST;
    },
  },
  methods: {
    getLoanById(loanId) {
      return this.$store.getters.GET_LOAN_BY_ID(loanId);
    },
    onLoanRegister(evt) {
      console.log("Registering for loan.");
      var loanId = event.srcElement.id;
      console.log("Loan id: ");
      console.log(loanId);

      // NOTE: get loanId as attribute not counter from v-for
      var loan = this.getLoanById(loanId);
      console.log(loan);

      registerForLoan(loan.contractAddr);
      this.$store.commit("REGISTER_LOAN", loanId);
    },
    onLoanFulfil(evt) {
      // NOTE: get loanId as attribute not counter from v-for
      var loanId = event.srcElement.id;
      var loan = this.getLoanById(loanId);

      fulfilLoan(loan.contractAddr);
      this.$store.commit("FULFIL_LOAN", loanId);
      this.$store.commit("REMOVE_LOAN", loanId);
    },
    onSiezeModalLaunch(evt) {
      this.activeModalLoanId = evt.srcElement.id;
    },
    onLoanSieze(evt) {
      console.log(this.selectedToken);
      var contractAddr = this.getLoanById(this.activeModalLoanId).contractAddr;
      siezeLoan(contractAddr, this.selectedToken);
    }
  },
}
</script>

<style scoped>
  #create-form{
    text-align: left;
  }
</style>
