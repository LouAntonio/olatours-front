type AfricaMapProps = {
	className?: string;
	highlightColor?: string;
	showLuanda?: boolean;
	showLabels?: boolean;
};

const AFRICA_PATH =
	'M 532 128 ' +
	'C 506 110, 478 112, 462 132 ' +
	'C 448 150, 442 172, 432 192 ' +
	'C 420 218, 402 240, 388 264 ' +
	'C 374 290, 364 318, 352 346 ' +
	'C 340 374, 326 402, 318 432 ' +
	'C 312 458, 314 484, 322 510 ' +
	'C 332 538, 348 562, 362 588 ' +
	'C 372 606, 374 626, 372 646 ' +
	'C 370 668, 374 690, 384 710 ' +
	'C 398 736, 416 758, 436 778 ' +
	'C 460 802, 488 822, 518 836 ' +
	'C 548 850, 580 856, 612 854 ' +
	'C 644 850, 674 838, 700 820 ' +
	'C 724 802, 744 778, 758 752 ' +
	'C 772 724, 780 694, 788 664 ' +
	'C 796 632, 804 600, 808 568 ' +
	'C 812 534, 812 500, 808 466 ' +
	'C 802 432, 792 400, 780 370 ' +
	'C 770 344, 762 320, 760 294 ' +
	'C 758 270, 760 246, 758 222 ' +
	'C 754 200, 744 180, 728 166 ' +
	'C 712 152, 692 144, 670 140 ' +
	'C 648 136, 626 134, 604 132 ' +
	'C 580 130, 556 130, 532 128 Z';

const LUANDA = { x: 442, y: 472 };
const LUANDA_RING = { x: 442, y: 472, r: 12 };
const CITIES = [
	{ name: 'LUANDA', x: 442, y: 472, primary: true },
	{ name: 'DAR ES SALAAM', x: 692, y: 506, primary: false },
	{ name: 'NAIROBI', x: 698, y: 470, primary: false },
	{ name: 'CIDADE DO CABO', x: 588, y: 836, primary: false },
	{ name: 'CAIRO', x: 626, y: 220, primary: false },
	{ name: 'LAGOS', x: 440, y: 412, primary: false },
];

export function AfricaMap({
	className = '',
	highlightColor = 'currentColor',
	showLuanda = true,
	showLabels = false,
}: AfricaMapProps) {
	return (
		<svg
			viewBox="0 0 900 900"
			fill="none"
			aria-hidden="true"
			className={['block w-full h-full', className].join(' ').trim()}
		>
			<defs>
				<pattern
					id="africa-dots"
					x="0"
					y="0"
					width="14"
					height="14"
					patternUnits="userSpaceOnUse"
				>
					<circle
						cx="2"
						cy="2"
						r="0.8"
						fill={highlightColor}
						opacity="0.18"
					/>
				</pattern>
				<clipPath id="africa-clip">
					<path d={AFRICA_PATH} />
				</clipPath>
			</defs>

			<path
				d={AFRICA_PATH}
				fill="url(#africa-dots)"
				stroke={highlightColor}
				strokeWidth="1.2"
				strokeLinejoin="round"
				opacity="0.95"
			/>

			<g clipPath="url(#africa-clip)" opacity="0.5">
				<line
					x1="0"
					y1="250"
					x2="900"
					y2="250"
					stroke={highlightColor}
					strokeWidth="0.5"
					strokeDasharray="3 4"
				/>
				<line
					x1="0"
					y1="450"
					x2="900"
					y2="450"
					stroke={highlightColor}
					strokeWidth="0.5"
					strokeDasharray="3 4"
				/>
				<line
					x1="0"
					y1="650"
					x2="900"
					y2="650"
					stroke={highlightColor}
					strokeWidth="0.5"
					strokeDasharray="3 4"
				/>
			</g>

			<g
				clipPath="url(#africa-clip)"
				stroke={highlightColor}
				strokeWidth="0.5"
				opacity="0.18"
			>
				<line x1="0" y1="450" x2="900" y2="450" />
				<line x1="442" y1="100" x2="442" y2="900" />
			</g>

			<g
				stroke={highlightColor}
				strokeWidth="0.6"
				opacity="0.35"
				fill="none"
			>
				<path
					d="M 780 480 Q 820 540, 870 600 Q 880 660, 860 700"
					strokeDasharray="2 3"
				/>
				<path
					d="M 580 838 Q 640 870, 700 850 Q 740 830, 770 800"
					strokeDasharray="2 3"
					opacity="0.4"
				/>
			</g>

			{showLabels &&
				CITIES.map((c) => (
					<g key={c.name} opacity={c.primary ? 1 : 0.6}>
						<circle
							cx={c.x}
							cy={c.y}
							r={c.primary ? 3 : 2}
							fill={highlightColor}
						/>
						<text
							x={c.x + 8}
							y={c.y - 6}
							fontFamily="JetBrains Mono, monospace"
							fontWeight="600"
							fontSize="9"
							letterSpacing="1.4"
							fill={highlightColor}
						>
							{c.name}
						</text>
					</g>
				))}

			{showLuanda && (
				<g>
					<circle
						cx={LUANDA_RING.x}
						cy={LUANDA_RING.y}
						r={LUANDA_RING.r}
						fill="none"
						stroke={highlightColor}
						strokeWidth="1.5"
						className="pulse-ring"
					/>
					<circle
						cx={LUANDA.x}
						cy={LUANDA.y}
						r="5"
						fill={highlightColor}
						className="pulse-dot"
					/>
					<circle
						cx={LUANDA.x}
						cy={LUANDA.y}
						r="9"
						fill="none"
						stroke={highlightColor}
						strokeWidth="1"
					/>
				</g>
			)}
		</svg>
	);
}

export { AFRICA_PATH, LUANDA, CITIES };
