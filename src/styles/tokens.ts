export const colors = {
	sky: '#1479C1',
	skyDark: '#0F5F9A',
	skyLight: '#E8F2FB',
	flag: '#E60012',
	flagDark: '#B8000E',
	flagLight: '#FDECEE',
	ink: '#0B1320',
	inkSoft: '#3D4A5C',
	inkMute: '#7A8595',
	paper: '#FAF7F2',
	paperCard: '#FFFFFF',
	line: '#E5E0D8',
	lineSoft: '#F0EBE2',
} as const;

export const fonts = {
	sans: '"Barlow", system-ui, -apple-system, "Segoe UI", sans-serif',
	display: '"Barlow Condensed", "Barlow", system-ui, sans-serif',
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
