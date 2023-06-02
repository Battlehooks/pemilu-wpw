import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import CRUD from './CRUDView.vue'
import VueCookies from 'vue-cookies'

const app = createApp(App)

app.use(router)
app.use(VueCookies)

app.mount('#app')
