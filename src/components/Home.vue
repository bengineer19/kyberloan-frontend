<template>
    <div>
        <!-- <h1>Kyber Loan</h1> -->
        <p v-if="error">{{ error }}</p>
        <b-container>
          <b-jumbotron>
            <template slot="header">Kyber Loan demo</template>

            <template slot="lead">
              This is an interface to a proof-of-concept smart loan contract built on the Kyber network.
            </template>

            <hr class="my-4" />

            <p>
              This a demo, so you can switch between "borrowing" and "lending" areas without logging in/out or changing accounts. 
            </p>
            <p>This is simply for ease of use as a demo.</p>

            <b-button class="nav-button" variant="primary" href="/info">Account summaries</b-button>
            <b-button class="nav-button" variant="success" href="/borrow">Borrowing</b-button>
            <b-button class="nav-button" variant="success" href="/lend">Lending</b-button>
          </b-jumbotron>
        </b-container>
    </div>
</template>

<script>
import config from "../config"

export default {
  name: 'Home',
}

</script>

<style scoped>
  .nav-button {
    margin-left: 10px;
  }
</style>
