import type { ReactNode } from 'react';

type Variant =
	| 'sky'
	| 'flag'
	| 'terracotta'
	| 'ochre'
	| 'moss'
	| 'navy'
	| 'ink'
	| 'outline'
	| 'paper';

const variants: Record<Variant, string> = {
	sky: 'bg-sky text-paper-card',
	flag: 'bg-flag text-paper-card',
	terracotta: 'bg-terracotta text-paper-card',
	ochre: 'bg-ochre text-ink',
	moss: 'bg-moss text-paper-card',
	navy: 'bg-navy text-paper-card',
	ink: 'bg-ink text-paper-card',
	outline: 'bg-transparent text-ink border border-ink',
	paper: 'bg-paper-card text-ink border border-line',
};

type BadgeProps = {
	children: ReactNode;
	variant?: Variant;
	dot?: boolean;
	className?: string;
};

export function Badge({
	children,
	variant = 'ink',
	dot = false,
	className = '',
}: BadgeProps) {
	return (
		<span
			className={[
				'inline-flex items-center gap-2 px-2.5 py-1 label-caps',
				variants[variant],
				className,
			]
				.join(' ')
				.trim()}
		>
			{dot && (
				<span
					aria-hidden="true"
					className="h-1.5 w-1.5 rounded-full bg-current"
				/>
			)}
			{children}
		</span>
	);
}
