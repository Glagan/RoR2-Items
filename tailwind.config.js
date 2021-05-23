module.exports = {
	purge: ['index.html', 'src/**/*.ts', 'src/**/*.vue'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				common: '#4f6372',
				'common-light': '#3e4e5b',
				uncommon: '#235a11',
				'uncommon-light': '#23d160',
				rare: '#952d2b',
				'rare-light': '#e3502b',
				unique: '#758623',
				'unique-light': '#dbe621',
				lunar: '#074c69',
				'lunar-light': '#40dff7',
				equipment: '#a06b17',
				'equipment-light': '#df9834',
			},
			width: {
				'32p': '32%',
				'48p': '48%',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
