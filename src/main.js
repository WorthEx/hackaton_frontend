import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import VueAxios from "vue-axios";
import axios from "axios";

const apiInstance = axios.create({
	baseURL: "http://127.0.0.1:8000",
	headers: {
		"Content-Type": "application/json",
	},
})

const app = createApp(App)
	.use(VueAxios, axios)
	.use(createPinia())
	.use(router)
app.config.globalProperties.$axios = apiInstance


app.mount('#app')
