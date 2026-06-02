type LogoProps = {
	variant?: 'full' | 'mark';
	size?: 'sm' | 'md' | 'lg';
	src?: string;
	alt?: string;
	className?: string;
};

const sizes = {
	sm: { full: 'h-7', mark: 'h-7' },
	md: { full: 'h-9', mark: 'h-9' },
	lg: { full: 'h-12', mark: 'h-12' },
};

export function Logo({
	variant = 'full',
	size = 'md',
	src = '/images/olatours.png',
	alt = 'OlaTours',
	className = '',
}: LogoProps) {
	const heightClass = sizes[size][variant];
	const widthClass = variant === 'full' ? 'w-auto' : 'aspect-square w-auto';

	return (
		<img
			src={src}
			alt={alt}
			className={`${heightClass} ${widthClass} block object-contain select-none ${className}`}
			draggable={false}
		/>
	);
}
