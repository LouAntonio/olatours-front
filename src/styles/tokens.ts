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

	ochre: '#C8924A',
	ochreDark: '#A07330',
	ochreLight: '#F4E7D2',

	moss: '#3F4A35',
	mossDark: '#2A3324',
	mossLight: '#DFE2D8',

	navy: '#1A2B4A',
	navyDark: '#101D35',
	navyLight: '#DDE3EE',

	ink: '#0B0F0A',
	inkSoft: '#3D4A5C',
	inkMute: '#7A8595',

	paper: '#F4EFE6',
	paperWarm: '#EBE3D3',
	paperCard: '#FBF8F1',
	line: '#D8CFBE',
	lineSoft: '#E8E0CF',
} as const;

export const fonts = {
	sans: '"Barlow", system-ui, -apple-system, "Segoe UI", sans-serif',
	display: '"Barlow Condensed", "Barlow", system-ui, sans-serif',
	serif: '"Fraunces", "Barlow", Georgia, serif',
	mono: '"JetBrains Mono", ui-monospace, "SFMono-Regular", monospace',
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
