import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import VueAxios from "vue-axios";
import axios from "axios";
import Vue3Toastify, {toast} from 'vue3-toastify';
import "vue3-toastify/dist/index.css"

const app = createApp(App)
	.use(VueAxios, axios)
	.use(createPinia())
	.use(router)
	.use(Vue3Toastify, {
		position: "top-right",
		type: "default",
		theme: "dark",
		autoClose: 2500,
		transition: toast.TRANSITIONS.BOUNCE
	})

app.mount('#app')
