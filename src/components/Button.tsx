import type {
	ReactNode,
	ButtonHTMLAttributes,
	AnchorHTMLAttributes,
} from 'react';

type Variant = 'sky' | 'flag' | 'terracotta' | 'ghost' | 'outline' | 'link';
type Size = 'sm' | 'md' | 'lg';

const base =
	'inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-[0.12em] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed group';

const variants: Record<Variant, string> = {
	sky: 'bg-sky text-white hover:bg-sky-dark active:translate-y-px focus-visible:ring-sky',
	flag: 'bg-flag text-white hover:bg-flag-dark active:translate-y-px focus-visible:ring-flag',
	terracotta:
		'bg-terracotta text-white hover:bg-terracotta-dark active:translate-y-px focus-visible:ring-terracotta',
	ghost: 'bg-transparent text-ink hover:bg-navy hover:text-white focus-visible:ring-navy',
	outline:
		'bg-transparent text-ink border-2 border-ink hover:bg-navy hover:text-white hover:border-navy focus-visible:ring-navy',
	link: 'bg-transparent text-sky hover:text-flag underline-offset-4 hover:underline px-0 py-0 h-auto focus-visible:ring-sky rounded-none',
};

const sizes: Record<Size, string> = {
	sm: 'h-9 px-4 text-[11px]',
	md: 'h-11 px-5 text-xs',
	lg: 'h-14 px-7 text-sm',
};

const linkSizes: Record<Size, string> = {
	sm: 'text-xs',
	md: 'text-sm',
	lg: 'text-base',
};

type ControlProps = {
	variant?: Variant;
	size?: Size;
	className?: string;
};

type ButtonAsButton = ControlProps & {
	as?: 'button';
	children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

type ButtonAsAnchor = ControlProps & {
	as: 'a';
	children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'>;

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button(props: ButtonProps) {
	const variant = props.variant ?? 'sky';
	const size = props.size ?? 'md';
	const { children, className = '' } = props;

	const composed = [
		base,
		variants[variant],
		variant === 'link' ? linkSizes[size] : sizes[size],
		className,
	]
		.join(' ')
		.trim();

	if (props.as === 'a') {
		const {
			as: _omit,
			variant: _v,
			size: _s,
			children: _c,
			className: _cn,
			...rest
		} = props;
		void _omit;
		void _v;
		void _s;
		void _c;
		void _cn;
		return (
			<a className={composed} {...rest}>
				{children}
				<ArrowMark />
			</a>
		);
	}

	const {
		as: _omit,
		variant: _v,
		size: _s,
		children: _c,
		className: _cn,
		...rest
	} = props;
	void _omit;
	void _v;
	void _s;
	void _c;
	void _cn;
	return (
		<button className={composed} {...rest}>
			{children}
			<ArrowMark />
		</button>
	);
}

function ArrowMark() {
	return (
		<svg
			viewBox="0 0 16 16"
			fill="none"
			aria-hidden="true"
			className="h-3 w-3 -mr-1 transition-transform duration-200 group-hover:translate-x-0.5"
		>
			<path
				d="M2.5 8h11M9 3.5L13.5 8 9 12.5"
				stroke="currentColor"
				strokeWidth="1.75"
				strokeLinecap="square"
				strokeLinejoin="miter"
			/>
		</svg>
	);
}
