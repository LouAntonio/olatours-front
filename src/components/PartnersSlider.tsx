import { useState } from 'react';
import { motion } from 'motion/react';
import { motion as m, stagger } from '../styles/tokens';

type Partner = {
	name: string;
	initials: string;
	logoSrc: string;
};

const partners: Partner[] = [
	{
		name: 'Banco Mundial',
		initials: 'BM',
		logoSrc: 'https://logo.clearbit.com/worldbank.org',
	},
	{
		name: 'Unitel',
		initials: 'UN',
		logoSrc: 'https://logo.clearbit.com/unitel.ao',
	},
	{
		name: 'TAAG',
		initials: 'TG',
		logoSrc: 'https://logo.clearbit.com/taag.com',
	},
	{
		name: 'Standard Bank',
		initials: 'SB',
		logoSrc: 'https://logo.clearbit.com/standardbank.com',
	},
	{
		name: 'BFA',
		initials: 'BF',
		logoSrc: 'https://logo.clearbit.com/bfa.ao',
	},
	{
		name: 'Sonangol',
		initials: 'SN',
		logoSrc: 'https://logo.clearbit.com/sonangol.co.ao',
	},
	{
		name: 'Endiama',
		initials: 'ED',
		logoSrc: 'https://logo.clearbit.com/endiama.co.ao',
	},
	{
		name: 'BAI',
		initials: 'BA',
		logoSrc: 'https://logo.clearbit.com/bai.ao',
	},
	{
		name: 'BIC',
		initials: 'BC',
		logoSrc: 'https://logo.clearbit.com/bic.ao',
	},
	{
		name: 'PNUD',
		initials: 'PN',
		logoSrc: 'https://logo.clearbit.com/undp.org',
	},
	{ name: 'ZEE', initials: 'ZE', logoSrc: '' },
	{ name: 'Ministério do Turismo', initials: 'MT', logoSrc: '' },
];

function PartnerLogoFallback({
	initials,
	name,
}: {
	initials: string;
	name: string;
}) {
	return (
		<svg
			viewBox="0 0 120 48"
			className="h-10 sm:h-12 w-auto"
			role="img"
			aria-label={name}
		>
			<rect width="120" height="48" rx="6" className="fill-ink/5" />
			<text
				x="60"
				y="50%"
				dominantBaseline="central"
				textAnchor="middle"
				fontFamily="'Barlow Condensed', system-ui, sans-serif"
				fontSize="20"
				fontWeight="800"
				letterSpacing="0.12em"
				className="fill-ink-mute"
			>
				{initials}
			</text>
		</svg>
	);
}

function PartnerLogo({ partner }: { partner: Partner }) {
	const [failed, setFailed] = useState(false);

	if (!partner.logoSrc || failed) {
		return (
			<PartnerLogoFallback
				initials={partner.initials}
				name={partner.name}
			/>
		);
	}

	return (
		<img
			src={partner.logoSrc}
			alt={partner.name}
			onError={() => setFailed(true)}
			className="h-10 sm:h-12 w-auto object-contain"
			loading="lazy"
		/>
	);
}

export function PartnersSlider() {
	const sequence = [...partners, ...partners];

	return (
		<section className="relative bg-white py-16 sm:py-20 overflow-hidden">
			<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
				<motion.div
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, margin: '-80px' }}
					variants={{
						hidden: {},
						show: {
							transition: { staggerChildren: stagger.wide },
						},
					}}
				>
					<motion.div
						variants={{
							hidden: { opacity: 0, y: 20 },
							show: {
								opacity: 1,
								y: 0,
								transition: {
									duration: m.duration.base,
									ease: m.ease.out,
								},
							},
						}}
						className="flex items-center gap-4 mb-8 sm:mb-10"
					>
						<span className="h-px w-8 bg-flag/60" />
						<span className="label-caps text-ink-mute tracking-[0.15em]">
							PARCEIROS INSTITUCIONAIS
						</span>
						<span className="h-px flex-1 bg-gray-border" />
					</motion.div>
				</motion.div>
			</div>

			<div className="marquee-container py-6 sm:py-8">
				<div className="marquee-track-slow">
					{sequence.map((p, i) => (
						<div
							key={`${p.initials}-${i}`}
							className="partner-logo shrink-0 px-8 sm:px-12"
						>
							<PartnerLogo partner={p} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
