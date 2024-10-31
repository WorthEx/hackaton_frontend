import GoogleBooksAPI from "@/apis/instances/GoogleBooksAPI.js";
import {stringToQueryParameter} from "@/utils.js";
import string_constants from "@/string_constants.js";

export default {
	search({query, startIndex = 0, order = string_constants.order.relevance}) {
		return GoogleBooksAPI().get(`/volumes?
		q=${stringToQueryParameter(query)}
		&orderBy=${order}
		&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}
		&startIndex=${startIndex}
		&maxResults=12`)
	},
	getFiction({startIndex = 0, order = string_constants.order.relevance}) {
		return GoogleBooksAPI().get(`/volumes?
		q=subject:fiction
		&orderBy=${order}
		&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}
		&startIndex=${startIndex}
		&maxResults=12`)
	}
}