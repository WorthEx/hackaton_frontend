import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import VueAxios from "vue-axios";
import axios from "axios";

const app = createApp(App)
	.use(VueAxios, axios)
	.use(createPinia())
	.use(router)


app.mount('#app')
