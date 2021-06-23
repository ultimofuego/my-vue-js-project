import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from "vue3-apexcharts"

import './styles/bootstrap.min.css'
import './styles/bootstrap-grid.min.css'
import './styles/myStyles.scss'

import store from './store'

import MyForm from './components/MyForm'
import MyTable from './components/MyTable'
import Loader from './components/Loader'


const app = createApp(App)
app.component('my-form', MyForm)
app.component('my-table', MyTable)
app.component('Loader', Loader)

app.use(store)
app.use(router)
app.use(VueApexCharts)

app.mount('#app')
