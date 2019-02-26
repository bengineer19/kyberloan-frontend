<template>
  <div>
    <h1>Lending</h1>

    <!-- Loan collateral seizure modal -->
    <b-modal id="withdrawModal" title="Withdraw collateral">
      <p>You are about to sieze the loan collateral.</p>
      <p>Which token would you like to liquidate the collateral in?</p>

      <b-dropdown id="ddown" text="Select token" class="m-md-2" variant="outline-primary">
        <b-dropdown-item>ETH</b-dropdown-item>
        <b-dropdown-item>OMG</b-dropdown-item>
        <b-dropdown-item>More tokens</b-dropdown-item>
      </b-dropdown>
      <div slot="modal-footer" class="w-100">
        <small class="text-muted float-left">Powered by Kyber</small>
        <!-- <p class="float-left">Powered by Kyber</p> -->
        <b-button id="ok-btn" class="float-right" variant="primary" @click="show=false">Withdraw</b-button>
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
                    v-bind:id="counter"
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
          <b-tab title="My outstanding loans">
            <b-card-group deck>
              <b-card v-for="(loan, counter) in registeredLoanList" v-bind:title="'Loan ' + (counter + 1)">
                <b-card-text>
                  <p>Loan detail: {{ loan.details }}</p>
                  <br>
                  <b-button variant="success">Loan fulfilled</b-button>
                  <br>
                  <br>
                  <b-button v-b-modal.withdrawModal variant="danger">Loan defaulted</b-button>
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

var deployedContractAddr = "unknown"

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
      newLoan: this.$emptyLoan,
      tabIndex: 0
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
    onLoanRegister(evt) {
      // evt.preventDefault();

      console.log(this.$store.getters.LOANLIST);
      // this.tabIndex++;
      // registerForLoan(evt);
      console.log("Registering for loan.");
      var loanId = event.srcElement.id;
      console.log("Loan id: ");
      console.log(loanId);
      var updatedLoanList = this.unregisteredLoanList;
      updatedLoanList[loanId].hasLenderRegistered = true;
      this.$store.commit('REGISTER_LOAN', loanId);
    },
  },
}
</script>

<style scoped>
  #create-form{
    text-align: left;
  }
</style>
