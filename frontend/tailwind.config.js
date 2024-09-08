/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		container: {
			padding: {
				xs: "1rem",
				md: "2rem",
				lg: "6rem",
				xl: "10rem",
				// xxl: "10rem"
			},
		},
	},
	plugins: [],
};
