type MarqueeProps = {
	items: string[];
	tone?: 'sky' | 'flag' | 'ink' | 'navy';
	separator?: string;
	className?: string;
};

const tones = {
	sky: 'text-sky',
	flag: 'text-flag',
	ink: 'text-ink',
	navy: 'text-navy',
};

export function Marquee({
	items,
	tone = 'ink',
	separator = '✦',
	className = '',
}: MarqueeProps) {
	const sequence = [...items, ...items];

	return (
		<div
			className={[
				'overflow-hidden border-y border-gray-border py-4 sm:py-6 bg-white',
				className,
			]
				.join(' ')
				.trim()}
		>
			<div className="marquee-track">
				{sequence.map((item, i) => (
					<span
						key={i}
						className={[
							'flex items-center gap-6 sm:gap-10 pr-6 sm:pr-10 shrink-0',
							'font-display font-black uppercase',
							'text-3xl sm:text-5xl md:text-6xl leading-none tracking-tight',
							tones[tone],
						].join(' ')}
					>
						<span>{item}</span>
						<span
							aria-hidden="true"
							className="opacity-60 text-2xl sm:text-3xl"
						>
							{separator}
						</span>
					</span>
				))}
			</div>
		</div>
	);
}
