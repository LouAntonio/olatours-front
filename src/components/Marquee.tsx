type MarqueeProps = {
	items: string[];
	tone?: 'ink' | 'sky' | 'flag';
	separator?: string;
	className?: string;
};

const tones = {
	ink: 'text-ink',
	sky: 'text-sky',
	flag: 'text-flag',
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
				'overflow-hidden border-y border-ink/15 py-4 sm:py-6',
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
