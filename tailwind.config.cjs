/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				paper:       'oklch(97% 0.009 62)',
				parchment:   'oklch(94% 0.011 58)',
				sand:        'oklch(89% 0.038 62)',
				ink:         'oklch(20% 0.015 50)',
				'ink-muted': 'oklch(48% 0.02 50)',
				terracotta:  'oklch(40% 0.1 30)',
				'dark-warm': 'oklch(18% 0.018 50)',
				'cream-soft':'oklch(93% 0.01 62)',
			},
			fontFamily: {
				serif: ['Alegreya', 'Georgia', 'serif'],
				sans:  ['Alegreya Sans', 'system-ui', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
