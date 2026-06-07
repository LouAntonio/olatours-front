import type { ReactNode } from 'react';

type Variant = 'sky' | 'flag' | 'navy' | 'outline' | 'white';

const variants: Record<Variant, string> = {
	sky: 'bg-sky/10 text-sky border border-sky/20',
	flag: 'bg-flag text-white',
	navy: 'bg-navy/10 text-navy border border-navy/20',
	outline: 'bg-transparent text-ink border border-gray-border',
	white: 'bg-white text-ink border border-gray-border',
};

type BadgeProps = {
	children: ReactNode;
	variant?: Variant;
	dot?: boolean;
	className?: string;
};

export function Badge({
	children,
	variant = 'navy',
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
