import axios from "axios";
import string_constants from "@/string_constants.js";
import {tokenSaved} from "@/utils.js";

export default (url = 'https://librarybackend-production-41fd.up.railway.app') => {
	const apiInstance = axios.create({
		baseURL: url,
		headers: {
			"Content-Type": "application/json",
		},
	})
	apiInstance.interceptors.request.use(request => {
		if (tokenSaved()) {
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