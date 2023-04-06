import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {createPinia} from 'pinia'
const store = createPinia()
const app = createApp(App);
app.use(router).use(ElementPlus).use(store).mount('#app')
