const colors = require('tailwindcss/colors');

module.exports = {
	purge: {
		enabled: true,
		content: ['./index.html', './src/**/*.{vue,js,ts}'],
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
