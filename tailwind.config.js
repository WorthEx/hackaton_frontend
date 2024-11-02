/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{vue,js,ts,jsx,tsx,html}", "./index.html", "./public/**/*.html"],
	theme: {
		extend: {
			screens: {
				'qhd': '2550px',
			},
		},
		fontFamily: {
			sans: ['Roboto', 'sans-serif'],
		}
	},
	plugins: [
		require('tailwindcss-animated')
	],
}

