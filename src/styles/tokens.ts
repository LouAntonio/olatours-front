export const colors = {
	sky: '#1479C1',
	skyDark: '#0F5F9A',
	skyLight: '#E8F2FB',

	flag: '#B5482A',
	flagDark: '#8E3520',
	flagLight: '#F6E3D9',

	terracotta: '#B5482A',
	terracottaDark: '#8E3520',
	terracottaLight: '#F6E3D9',

	navy: '#1A2B4A',
	navyDark: '#101D35',
	navyLight: '#DDE3EE',

	ink: '#0B0F0A',
	inkSoft: '#3D4A5C',
	inkMute: '#7A8595',

	white: '#FFFFFF',
	cream: '#F9F6F0',
	cream50: '#FBF9F5',
	sand: '#E8E0D4',
	grayLight: '#F7F8FA',
	grayBorder: '#E4E7EC',
	grayBorderSoft: '#F0F2F5',
} as const;

export const fonts = {
	sans: '"Barlow", system-ui, -apple-system, "Segoe UI", sans-serif',
	display: '"Barlow Condensed", "Barlow", system-ui, sans-serif',
	editorial: '"EB Garamond", "Georgia", "Times New Roman", serif',
} as const;

export const motion = {
	duration: {
		fast: 0.18,
		base: 0.32,
		slow: 0.6,
		page: 0.9,
	},
	ease: {
		out: [0.16, 1, 0.3, 1] as [number, number, number, number],
		inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
		soft: [0.32, 0.72, 0, 1] as [number, number, number, number],
	},
} as const;

export const stagger = {
	tight: 0.04,
	base: 0.08,
	wide: 0.14,
} as const;
