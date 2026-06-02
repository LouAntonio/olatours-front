type SectionLabelProps = {
	number: string;
	title: string;
	hint?: string;
	className?: string;
	align?: 'left' | 'right';
};

export function SectionLabel({
	number,
	title,
	hint,
	className = '',
	align = 'left',
}: SectionLabelProps) {
	return (
		<div
			className={[
				'flex flex-col gap-3',
				align === 'right'
					? 'items-end text-right'
					: 'items-start text-left',
				className,
			]
				.join(' ')
				.trim()}
		>
			<div
				className={[
					'flex items-center gap-3',
					align === 'right' ? 'flex-row-reverse' : 'flex-row',
				].join(' ')}
			>
				<span className="font-display text-2xl sm:text-3xl font-black text-flag leading-none">
					{number}
				</span>
				<span className="h-px w-12 sm:w-20 bg-ink" aria-hidden="true" />
				<span className="eyebrow text-ink-soft">{title}</span>
			</div>
			{hint && (
				<p className="text-ink-soft text-sm max-w-md leading-relaxed">
					{hint}
				</p>
			)}
		</div>
	);
}
