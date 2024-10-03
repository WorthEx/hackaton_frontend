import API from "./API.js"

export default {
	login(loginData) {
		return API().post("/auth/login", loginData)
	},

	verifyRegistration(code) {
		return API().get(`/auth/verify?code=${code}`)
	}
}