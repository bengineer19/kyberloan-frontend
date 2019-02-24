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
    }
  },
  mutations: {
    RESET_STATE (state) {
      Object.assign(state, initialState);
    },
    SET_LOANLIST: (state, payload) => {
      state.loanList = payload
    },
    ADD_LOAN: (state, payload) => {
      state.loanList.push(payload)
    },
    // Set loan as lender registered
    REGISTER_LOAN: (state, loanIndex) => {
      state.loanList[loanIndex].hasLenderRegistered = true;
    }
  },
  actions : {
    SAVE_LOAN: async (context, payload) => {
        // let { data } = await Axios.post('http://yourwebsite.com/api/todo')
        context.commit('ADD_LOAN', payload)
    },
  },
  plugins: [vuexLocalStorage.plugin]
})