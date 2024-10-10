import router from "@/router/index.js";
import string_constants from "@/string_constants.js";
import {jwtDecode} from "jwt-decode";

export const toUserPage = async function (id) {
	await router.push(`/user/${id}`)
}

export const tokenSaved = () => {
	return (
		localStorage.getItem(string_constants.accessToken) != null &&
		localStorage.getItem(string_constants.accessToken) !== "null" &&
		localStorage.getItem(string_constants.accessToken) !== undefined &&
		localStorage.getItem(string_constants.accessToken) !== "undefined" &&
		localStorage.getItem(string_constants.accessToken) !== "")
}

export const logout = async () => {
	localStorage.removeItem(string_constants.accessToken)
	localStorage.removeItem(string_constants.username)
	localStorage.removeItem(string_constants.firstname)
	localStorage.removeItem(string_constants.lastname)
	localStorage.removeItem(string_constants.email)
	await router.push("/sign-in")
}

export const toAccountPageLink = () => {
	const usernameFromToken = jwtDecode(localStorage.getItem(string_constants.accessToken)).sub
	return `/user/${usernameFromToken}`
}