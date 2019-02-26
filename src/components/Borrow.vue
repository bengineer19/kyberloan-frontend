<template>
  <div>
    <h1>Borrowing</h1>
    <b-container>

      <div>
        <b-tabs content-class="mt-3" v-model="tabIndex">
          <!--  -->
          <!-- TAB 1: Loan creation -->
          <!--  -->
          <b-tab title="Create loan offer" active>
            <br>
            <b-form @submit="onLoanCreate" id="create-form">
              <b-form-group
                id="details"
                label="Loan details"
                label-for="details"
                description="Give a description of the actual loan exchange"
              >
                <b-form-input id="details" v-model="newLoan.details" required placeholder="Enter loan details"/>
              </b-form-group>

              <b-form-group
                id="collateral"
                label="Loan collateral (ETH)"
                label-for="collateral"
                description="Enter the amount of collateral put up for the loan"
              >
                <b-form-input id="collateral" type="number" v-model="newLoan.collateral" required placeholder="Enter loan collateral (currently ETH only)"/>
              </b-form-group>

              <b-button type="submit" variant="primary">Submit</b-button>
            </b-form>
          </b-tab>

          <!--  -->
          <!-- TAB 2: Existing loan requests -->
          <!--  -->
          <b-tab title="My open requests">
            <b-card-group deck>
              <b-card v-for="(loan, counter) in unregisteredLoanList" v-bind:title="'Loan ' + (counter + 1)">
                <b-card-text>
                  <p>Loan detail: {{ loan.details }}</p>
                  <br>
                  <b-button variant="outline-primary">Withdraw loan request</b-button>
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
 

function createLoan(newLoan) {
  console.log("Creating new contract...")
  var contract = new web3.eth.Contract(config.CONTRACT_ABI, config.DEMO_CONTRACT_ADDRESS);

  return contract.deploy({
    data: config.CONTRACT_BYTECODE,
    arguments: [config.KYBER_NETWORK_PROXY, newLoan.collateral]
  })
  .send({
      from: config.DEMO_BORROWER_ADDRESS,
      gas: 1500000,
      gasPrice: '3000000000000'
  })
  .then();
}

function payCollateral(ETHAmount, contractAddr) {
  var contract = new web3.eth.Contract(config.CONTRACT_ABI, contractAddr);

  contract.methods.payCollateral().send({
    from: config.DEMO_BORROWER_ADDRESS,
    value: Web3.utils.toWei(ETHAmount.toString(), 'ether'),
    gas: config.COLLATERAL_GAS,
  })
  .then(function(res){
    console.log(res);
  }).catch(function(err) {
    // TODO: error here if insufficient funds
    console.log(err);
  });
}


export default {
  name: 'Loans',
  data: function(){
    return {
      newLoan: this.$emptyLoan,
      collateral: 0,
      details: "",
      tabIndex: 0
    }
  },
  computed : {
    loanList(){
      return this.$store.getters.LOANLIST
    },
    unregisteredLoanList(){
      return this.$store.getters.UNREGISTERED_LOANLIST;
    },
  },
  methods: {
    onLoanCreate(evt) {
      evt.preventDefault();

      console.log("Getting contract addr: ");
      // Create contract on chain
      createLoan(this.newLoan)
      .then(inst => {
        let newContractAddr = inst.options.address

        payCollateral(this.collateral, newContractAddr);
        
        // Add to record of loans
        this.newLoan.contractAddr = newContractAddr;
        this.$store.dispatch('SAVE_LOAN', this.newLoan);
        this.tabIndex++;
      })
    },
  },
}
</script>

<style scoped>
  #create-form{
    text-align: left;
  }
</style>
