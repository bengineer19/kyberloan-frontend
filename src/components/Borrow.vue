<template>
  <div>
    <h1>Borrow</h1>
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
          <!-- TAB 2: Existing loan request -->
          <!--  -->
          <b-tab title="My open requests">
            <b-card-group deck>
              <b-card v-for="(loan, counter) in $loanList" v-bind:title="'Loan ' + (counter + 1)">
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

function createLoan(newLoan) {
  console.log("Creating new loan offer")
  console.log(newLoan.details);
  console.log(newLoan.collateral);

}

export default {
  name: 'Loans',
  data: function(){
    return {
      newLoan: this.$emptyLoan,
      tabIndex: 0
    }
  },
  methods: {
    onLoanCreate(evt) {
      evt.preventDefault();

      createLoan(this.newLoan)
      // Add to record of loans
      this.$loanList.push(this.newLoan);
      console.log("Current loanList: ");
      console.log(this.$loanList);
      this.tabIndex++;
    },
  },
}
</script>

<style scoped>
  #create-form{
    text-align: left;
  }
</style>
