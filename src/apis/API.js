import axios from "axios";
import string_constants from "@/string_constants.js";

export default (url = 'http://127.0.0.1:6969') => {
	const apiInstance = axios.create({
		baseURL: url,
		headers: {
			"Content-Type": "application/json",
		},
	})
	apiInstance.interceptors.request.use(request => {
		if (
			localStorage.getItem(string_constants.accessToken) != null &&
			localStorage.getItem(string_constants.accessToken) !== "null"
		) {
			request.headers.Authorization = `Bearer ${localStorage.getItem(string_constants.accessToken)}`
			console.log("Added auth token!")
		}
		console.log("Starting Request:\n", request)
		return request
	})
	apiInstance.interceptors.response.use(response => {
			console.log(`Got response:\n${response}`)
			return response;
		},
		error => {
			console.log(error)
			return Promise.reject(error.message);
		})
	return apiInstance
}