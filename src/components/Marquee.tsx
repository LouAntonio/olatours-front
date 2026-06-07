type MarqueeProps = {
	items: string[];
	tone?: 'sky' | 'flag' | 'ink' | 'navy';
	separator?: string;
	className?: string;
};

export function Marquee({
	items,
	tone: _tone = 'flag',
	separator = '✦',
	className = '',
}: MarqueeProps) {
	void _tone;
	const sequence = [...items, ...items];

	return (
		<section className="relative bg-navy py-20 sm:py-24 overflow-hidden grain">
			<div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
			<div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

			<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
				<div
					className={[
						'overflow-hidden border-y border-white/[0.12] py-4 sm:py-6',
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
									'text-white',
								].join(' ')}
							>
								<span>{item}</span>
								<span
									aria-hidden="true"
									className="opacity-40 text-2xl sm:text-3xl text-flag"
								>
									{separator}
								</span>
							</span>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
