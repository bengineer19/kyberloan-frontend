import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage, // or window.sessionStorage or localForage
})

var initialState = {
  loanList: [],
  currentLoanId: 0
}

export const store = new Vuex.Store({
  state: initialState,

  getters : {
    LOANLIST: state => {
      return state.loanList;
    },
    REGISTERED_LOANLIST: state => {
      return state.loanList.filter(loan => loan.hasLenderRegistered);
    },
    UNREGISTERED_LOANLIST: state => {
      return state.loanList.filter(loan => loan.hasLenderRegistered == false);
    },
    GET_LOAN_BY_ID: (state) => (id) => {
      return state.loanList.find(loan => loan.id == id)
    }
  },
  mutations: {
    RESET_STATE (state) {
      Object.assign(state, initialState);
    },
    ADD_LOAN: (state, _loan) => {
      // Deep copy
      let loan = JSON.parse(JSON.stringify(_loan));
      loan.id = state.currentLoanId;
      state.currentLoanId += 1;
      state.loanList.push(loan);
    },
    // Set loan as lender registered
    REGISTER_LOAN: (state, loanId) => {
      let loanIndex = state.loanList.findIndex(loan => loan.id == loanId);
      state.loanList[loanIndex].hasLenderRegistered = true;
    },
    // Set loan as fulfilled
    FULFIL_LOAN: (state, loanId) => {
      let loanIndex = state.loanList.findIndex(loan => loan.id == loanId);
      state.loanList[loanIndex].fulfilled = true;
    },
    REMOVE_LOAN: (state, loanId) => {
      let loanIndex = state.loanList.findIndex(loan => loan.id == loanId);
      state.loanList.splice(loanIndex, 1);
    }
  },
  actions : {
    SAVE_NEW_LOAN: async (context, payload) => {
        // let { data } = await Axios.post('')
        context.commit('ADD_LOAN', payload)
    },
  },
  plugins: [vuexLocalStorage.plugin]
})