import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { motion as m } from '../styles/tokens';

type Tone = 'sky' | 'flag' | 'ink' | 'paper';

const tones: Record<Tone, { bg: string; ink: string; accent: string }> = {
	sky: { bg: 'bg-sky', ink: 'text-paper-card', accent: 'text-paper-card/80' },
	flag: {
		bg: 'bg-flag',
		ink: 'text-paper-card',
		accent: 'text-paper-card/80',
	},
	ink: { bg: 'bg-ink', ink: 'text-paper-card', accent: 'text-paper-card/70' },
	paper: {
		bg: 'bg-paper-card',
		ink: 'text-ink',
		accent: 'text-ink-soft',
	},
};

type CardProps = {
	code: string;
	city: string;
	country: string;
	departure: string;
	duration: string;
	price: string;
	tag?: string;
	tone?: Tone;
	className?: string;
};

export function DestinationCard({
	code,
	city,
	country,
	departure,
	duration,
	price,
	tag,
	tone = 'sky',
	className = '',
}: CardProps) {
	const t = tones[tone];

	return (
		<motion.article
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-80px' }}
			transition={{ duration: m.duration.base, ease: m.ease.out }}
			className={[
				'group relative isolate flex flex-col justify-between overflow-hidden p-6 sm:p-8 min-h-[280px] sm:min-h-[340px] border border-ink/10 hover:shadow-[0_18px_40px_-16px_rgba(11,19,32,0.28)] transition-shadow',
				t.bg,
				t.ink,
				className,
			]
				.join(' ')
				.trim()}
		>
			<div className="flex items-start justify-between gap-4">
				<div className="flex flex-col gap-1">
					<span className={['label-caps', t.accent].join(' ')}>
						{code} · {duration}
					</span>
					<CityPlate code={code} tone={tone} />
				</div>
				{tag && (
					<span
						className={[
							'label-caps px-2 py-1 border',
							tone === 'paper'
								? 'border-ink text-ink'
								: 'border-current text-current',
						].join(' ')}
					>
						{tag}
					</span>
				)}
			</div>

			<div className="relative z-10 mt-12">
				<h3 className="font-display text-4xl sm:text-5xl font-black leading-[0.9] tracking-tight">
					{city}
				</h3>
				<p className={['mt-2 label-caps', t.accent].join(' ')}>
					{country}
				</p>
			</div>

			<div className="relative z-10 mt-8 flex items-end justify-between gap-4">
				<div>
					<p className={['label-caps', t.accent].join(' ')}>
						A partir de
					</p>
					<p className="font-display text-2xl sm:text-3xl font-black leading-none mt-1">
						{price}
					</p>
				</div>
				<div className="text-right">
					<p className={['label-caps', t.accent].join(' ')}>
						Embarque
					</p>
					<p className="font-display text-base sm:text-lg font-bold mt-1">
						{departure}
					</p>
				</div>
			</div>

			<CornerHatch />
		</motion.article>
	);
}

function CityPlate({ code, tone }: { code: string; tone: Tone }) {
	const color = tone === 'paper' ? '#0B1320' : '#FAF7F2';
	return (
		<svg
			viewBox="0 0 240 48"
			fill="none"
			aria-hidden="true"
			className="h-8 sm:h-10 w-auto mt-1"
		>
			<g stroke={color} strokeWidth="1.25" fill="none">
				<line x1="0" y1="44" x2="240" y2="44" />
				<line x1="0" y1="40" x2="240" y2="40" />
			</g>
			<text
				x="0"
				y="30"
				fill={color}
				fontFamily="Barlow Condensed, sans-serif"
				fontWeight="900"
				fontSize="26"
				letterSpacing="3"
			>
				{code}
			</text>
		</svg>
	);
}

function CornerHatch() {
	return (
		<svg
			viewBox="0 0 200 200"
			fill="none"
			aria-hidden="true"
			className="pointer-events-none absolute -right-12 -bottom-12 h-48 w-48 opacity-30"
		>
			<g stroke="currentColor" strokeWidth="1">
				{Array.from({ length: 18 }).map((_, i) => (
					<line
						key={i}
						x1={i * 12}
						y1="0"
						x2="220"
						y2={220 - i * 12}
					/>
				))}
			</g>
		</svg>
	);
}

type StatCardProps = {
	number: string;
	label: string;
	hint?: ReactNode;
};

export function StatCard({ number, label, hint }: StatCardProps) {
	return (
		<div className="flex flex-col gap-3 border-t-2 border-ink pt-5">
			<span className="font-display text-5xl sm:text-6xl font-black leading-none tracking-tight">
				{number}
			</span>
			<span className="label-caps text-ink-soft">{label}</span>
			{hint && (
				<p className="text-sm text-ink-soft leading-relaxed">{hint}</p>
			)}
		</div>
	);
}
