import router from "@/router/index.js";

export const toUserPage = async function (id) {
	await router.push(`/user/${id}`)
}