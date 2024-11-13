import API from "@/apis/instances/API.js"

export default {
	sendReview(reviewData) {
		return API().post("/review/add", reviewData)
	},
	getReviewsByBook(bookId) {
		return API().get(`/review/by-knigga?bookId=${bookId}`)
	}
}