import {createRouter, createWebHistory} from 'vue-router'
import MyForm from './components/MyForm'
import MyTable from './components/MyTable'

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/addrow', component: MyForm },
        {path: '/', component: MyTable} //localhost:port/addRow
    ]
})