import axios from "axios";

export default (url = 'https://openlibrary.org') => {
	const apiInstance = axios.create({
		baseURL: url,
		headers: {
			"User-Agent": "KarRUSL/1.0 (7hecakeis4.l1e@gmail.com)",
		},
	})
	apiInstance.interceptors.request.use(request => {
		console.log("Starting Request (OpenLibrary):\n", request)
		return request
	})
	apiInstance.interceptors.response.use(response => {
			console.log(`Got response (OpenLibrary):\n${response}`)
			return response;
		},
		error => {
			console.log(error)
			return Promise.reject(error.message);
		})
	return apiInstance
}