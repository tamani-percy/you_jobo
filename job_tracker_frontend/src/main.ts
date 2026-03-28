import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import NeoBrutalVue from 'neo-brutal-vue'
import 'neo-brutal-vue/dist/style.css'
import App from './App.vue'
import router from './router'
import {autoAnimatePlugin} from '@formkit/auto-animate/vue'
import VueApexCharts from 'vue3-apexcharts'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)

app.use(VueApexCharts)
app.use(createPinia())
app.use(router)
app.use(NeoBrutalVue, {prefix: 'Nb'})
app.use(autoAnimatePlugin)
app.use(VueQueryPlugin)
app.component('apexchart', VueApexCharts)

app.mount('#app')
