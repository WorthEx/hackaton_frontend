import API from "@/apis/instances/API.js"

export default {
	login(loginData) {
		return API().post("/auth/login", loginData)
	},

	verifyRegistration(code) {
		return API().get(`/auth/verify?code=${code}`)
	}
}