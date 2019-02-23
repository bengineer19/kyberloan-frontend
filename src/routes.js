import Loans from './components/Loans.vue'
import Info from './components/Info.vue'
import Borrow from './components/Borrow.vue'
import Lend from './components/Lend.vue'


export const routes = [
    {
        path: '',
        name: 'loans',
        component: Loans
    },
    {
        path: '/info',
        name: 'info',
        component: Info
    },
    {
        path: '/borrow',
        name: 'borrow',
        component: Borrow
    },
    {
        path: '/lend',
        name: 'lend',
        component: Lend
    },
]
