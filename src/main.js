import { createApp } from 'vue'
import App from './App.vue'
import './styles/bootstrap.min.css'
import store from './store'

createApp(App)
.use(store)
.mount('#app')
