import {createRouter, createWebHistory} from "vue-router"

const routes = [
	{
		path: "/",
		name: "Home",
		component: () => import("@/components/pages/HomePage.vue"),
	},
	{
		path: "/sign-in",
		name: "Sign in",
		component: () => import("@/components/pages/SignInPage.vue"),
	},
	// {
	// 	path: "/sign-up",
	// 	name: "Sign up",
	// 	component: () => import("@/components/pages/SignUpPage.vue"),
	// },
	// {
	// 	path: "/books",
	// 	name: "Books",
	// 	component: () => import("@/components/pages/Books.vue"),
	// },
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
			}
		}
		return {
			top: 0,
			behavior: "smooth",
		}
	},
})

export default router
