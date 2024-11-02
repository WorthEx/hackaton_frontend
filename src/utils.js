import router from "@/router/index.js";
import string_constants from "@/string_constants.js";
import {jwtDecode} from "jwt-decode";

export const tokenSaved = () => {
	return (
		localStorage.getItem(string_constants.accessToken) != null &&
		localStorage.getItem(string_constants.accessToken) !== "null" &&
		localStorage.getItem(string_constants.accessToken) !== undefined &&
		localStorage.getItem(string_constants.accessToken) !== "undefined" &&
		localStorage.getItem(string_constants.accessToken) !== "")
}

export const logout = async () => {
	localStorage.clear()
	sessionStorage.clear()
	await router.push("/sign-in")
}

export const toAccountPageLink = () => {
	const usernameFromToken = jwtDecode(localStorage.getItem(string_constants.accessToken)).sub
	return `/user/${usernameFromToken}`
}

export const stringToQueryParameter = (string) => {
	return string.replace(/\s+/g, "+")
}