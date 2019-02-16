import Loans from './components/Loans.vue'
import Info from './components/Info.vue'


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
]
