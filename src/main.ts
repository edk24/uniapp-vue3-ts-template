import { createSSRApp } from "vue";
import './styles/index.scss'

import App from "./App.vue";

import uView from '@/uni_modules/vk-uview-ui'

// pinia
import { createPinia } from 'pinia'
const pinia = createPinia()


export function createApp() {
    const app = createSSRApp(App);
    app.use(pinia)
    app.use(uView)


    return {
        app,
    };
}
