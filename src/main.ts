import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
const pinia = createPinia()
import router from './router/router'
import mitt from 'mitt'
import ENGLISH from './locales/en'
import KHMER from './locales/kh'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const emitter = mitt()
const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    globalInjection: true,
    messages: {
        en: ENGLISH,
        kh: KHMER
    }
})

const app = createApp(App)
app.component('VueDatePicker', VueDatePicker);
app.use(pinia) // Ensure Pinia is used before accessing any stores
app.provide('emitter', emitter)
app.use(i18n)
app.use(router)
app.mount('#app')

