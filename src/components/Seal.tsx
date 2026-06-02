type SealProps = {
	text: string;
	subtext?: string;
	number?: string;
	tone?: 'ink' | 'terracotta' | 'ochre' | 'moss' | 'navy';
	size?: 'sm' | 'md' | 'lg';
	className?: string;
};

const toneMap = {
	ink: { stroke: 'currentColor', text: 'currentColor', fill: 'transparent' },
	terracotta: {
		stroke: 'currentColor',
		text: 'currentColor',
		fill: 'transparent',
	},
	ochre: {
		stroke: 'currentColor',
		text: 'currentColor',
		fill: 'transparent',
	},
	moss: { stroke: 'currentColor', text: 'currentColor', fill: 'transparent' },
	navy: { stroke: 'currentColor', text: 'currentColor', fill: 'transparent' },
} as const;

const sizes = {
	sm: { px: 120, fontSize: 9.5, subFontSize: 7.5, numberSize: 26 },
	md: { px: 200, fontSize: 11, subFontSize: 8.5, numberSize: 42 },
	lg: { px: 280, fontSize: 13, subFontSize: 10, numberSize: 64 },
} as const;

export function Seal({
	text,
	subtext,
	number,
	tone = 'ink',
	size = 'md',
	className = '',
}: SealProps) {
	const s = sizes[size];
	const id = `seal-${text.replace(/\s+/g, '-').toLowerCase()}-${size}`;

	return (
		<div
			aria-hidden="true"
			className={[
				'stamp-rotate inline-flex items-center justify-center',
				`text-${tone}`,
				className,
			]
				.join(' ')
				.trim()}
			style={{ width: s.px, height: s.px }}
		>
			<svg viewBox="0 0 200 200" fill="none" className="h-full w-full">
				<defs>
					<path
						id={id}
						d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
					/>
				</defs>

				<circle
					cx="100"
					cy="100"
					r="92"
					stroke={toneMap[tone].stroke}
					strokeWidth="1.5"
					fill="none"
					opacity="0.5"
				/>
				<circle
					cx="100"
					cy="100"
					r="86"
					stroke={toneMap[tone].stroke}
					strokeWidth="0.75"
					fill="none"
					opacity="0.4"
				/>
				<circle
					cx="100"
					cy="100"
					r="62"
					stroke={toneMap[tone].stroke}
					strokeWidth="0.75"
					strokeDasharray="2 3"
					fill="none"
					opacity="0.55"
				/>

				<text
					fontFamily="Barlow Condensed, sans-serif"
					fontWeight="800"
					fontSize={s.fontSize}
					letterSpacing="3.6"
					fill={toneMap[tone].text}
				>
					<textPath href={`#${id}`} startOffset="0">
						{`${text}  ·  ${text}  ·  `}
					</textPath>
				</text>

				{number && (
					<text
						x="100"
						y="100"
						textAnchor="middle"
						dominantBaseline="central"
						fontFamily="Barlow Condensed, sans-serif"
						fontWeight="900"
						fontSize={s.numberSize}
						letterSpacing="-1"
						fill={toneMap[tone].text}
					>
						{number}
					</text>
				)}

				{subtext && (
					<text
						x="100"
						y="148"
						textAnchor="middle"
						fontFamily="JetBrains Mono, monospace"
						fontWeight="600"
						fontSize={s.subFontSize}
						letterSpacing="2"
						fill={toneMap[tone].text}
					>
						{subtext}
					</text>
				)}

				<g stroke={toneMap[tone].stroke} strokeWidth="1" opacity="0.5">
					<line x1="32" y1="100" x2="40" y2="100" />
					<line x1="160" y1="100" x2="168" y2="100" />
					<line x1="100" y1="32" x2="100" y2="40" />
					<line x1="100" y1="160" x2="100" y2="168" />
				</g>
			</svg>
		</div>
	);
}
