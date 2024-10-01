import API from "./API.js"

export default {
	login(loginData) {
		return API().post("/auth/login", loginData)
	}
}