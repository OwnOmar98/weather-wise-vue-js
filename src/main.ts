import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { vuetify } from './plugins/vuetify/vuetify.plugin'
import { pinia } from './plugins'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
