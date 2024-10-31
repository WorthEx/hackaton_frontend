import axios from "axios";

export default (url = 'https://www.googleapis.com/books/v1') => {
	const apiInstance = axios.create({
		baseURL: url,
	})
	apiInstance.interceptors.request.use(request => {
		console.log("Starting Request (Google Books):\n", request)
		return request
	})
	apiInstance.interceptors.response.use(response => {
			console.log(`Got response (Google Books):\n${response}`)
			return response;
		},
		error => {
			console.log(error)
			return Promise.reject(error.message);
		})
	return apiInstance
}