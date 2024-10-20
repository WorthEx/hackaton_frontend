import {createRouter, createWebHistory} from "vue-router"

const routes = [
	{
		path: "/",
		name: "Home",
		component: () => import("@/components/pages/HomePage.vue"),
	},
	{
		path: "/sign-up",
		name: "Sign up",
		component: () => import("@/components/pages/SignUpPage.vue"),
	},
	{
		path: "/sign-in",
		name: "Sign In",
		component: () => import("@/components/pages/SignInPage.vue"),
	},
	{
		path: "/user/:userId",
		name: "Account page",
		component: () => import("@/components/pages/AccountPage.vue"),
	},
	// {
	// 	path: "/books",
	// 	name: "Books",
	// 	component: () => import("@/components/pages/Books.vue"),
	// },
	{
		path: "/auth/verify",
		name: "Change password",
		component: () => import("@/components/pages/RegistrationConfirmation.vue"),
	},
	{
		path: "/:pathMatch(.*)*",
		name: "NotFound",
		component: () => import("@/components/pages/NotFound.vue"),
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes: routes,
	scrollBehavior: (to) => {
		if (to.hash) {
			return {
				el: to.hash,
				behavior: "smooth"
			}
		}
		return new Promise((resolve) => {
			resolve({
				left: 0, top: 0,
				behavior: "smooth",
			})
		})
	},
})

export default router
