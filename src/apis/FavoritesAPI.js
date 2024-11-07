import API from "@/apis/instances/API.js"

export default {
	addFavorite(bookId) {
		return API().post(`/user/add-favorite?bookId=${bookId}`)
	},
	deleteFavorite(bookId) {
		return API().delete("/user/delete-favorite", {bookId: bookId})
	},
	getFavorites() {
		return API().get("/user/get-favorites")
	},
}