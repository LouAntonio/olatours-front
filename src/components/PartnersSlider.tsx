import { motion } from 'motion/react';
import { motion as m, stagger } from '../styles/tokens';

type Partner = {
	initials: string;
	name: string;
	color: 'flag' | 'navy' | 'sky';
};

const partners: Partner[] = [
	{ initials: 'MT', name: 'Ministério do Turismo', color: 'flag' },
	{ initials: 'BM', name: 'Banco Mundial', color: 'sky' },
	{ initials: 'UN', name: 'Unitel', color: 'navy' },
	{ initials: 'TG', name: 'TAAG', color: 'flag' },
	{ initials: 'SB', name: 'Standard Bank', color: 'sky' },
	{ initials: 'BF', name: 'BFA', color: 'navy' },
	{ initials: 'SN', name: 'Sonangol', color: 'flag' },
	{ initials: 'ED', name: 'Endiama', color: 'sky' },
	{ initials: 'ZE', name: 'ZEE', color: 'navy' },
	{ initials: 'BA', name: 'BAI', color: 'flag' },
	{ initials: 'BC', name: 'BIC', color: 'sky' },
	{ initials: 'PN', name: 'PNUD', color: 'navy' },
];

const colorMap: Record<string, { bg: string; text: string }> = {
	flag: { bg: 'bg-flag/10', text: 'text-flag' },
	navy: { bg: 'bg-navy/10', text: 'text-navy' },
	sky: { bg: 'bg-sky/10', text: 'text-sky' },
};

export function PartnersSlider() {
	const sequence = [...partners, ...partners];

	return (
		<section className="relative bg-navy py-16 sm:py-20 overflow-hidden">
			<div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
			<div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

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
						<span className="label-caps text-white/50 tracking-[0.15em]">
							PARCEIROS INSTITUCIONAIS
						</span>
						<span className="h-px flex-1 bg-white/10" />
					</motion.div>

					<motion.p
						variants={{
							hidden: { opacity: 0, y: 20 },
							show: {
								opacity: 1,
								y: 0,
								transition: {
									duration: m.duration.base,
									ease: m.ease.out,
									delay: 0.1,
								},
							},
						}}
						className="font-display text-2xl sm:text-3xl font-black uppercase leading-tight tracking-tight text-white max-w-2xl"
					>
						Confiança que construímos ao lado das
						principais instituições.
					</motion.p>
				</motion.div>
			</div>

			<div className="mt-10 sm:mt-12 border-y border-white/[0.08] py-5 sm:py-6">
				<div className="marquee-track-slow">
					{sequence.map((p, i) => {
						const c = colorMap[p.color];
						return (
							<div
								key={`${p.initials}-${i}`}
								className="flex items-center gap-6 sm:gap-10 pr-6 sm:pr-10 shrink-0"
							>
								<div className="flex items-center gap-4 sm:gap-5">
									<div
										className={`${c.bg} flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-lg`}
									>
										<span
											className={`${c.text} font-display text-lg sm:text-xl font-black leading-none tracking-tight`}
										>
											{p.initials}
										</span>
									</div>
									<div className="flex flex-col">
										<span className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-white/90 whitespace-nowrap">
											{p.name}
										</span>
									</div>
								</div>
								<span
									aria-hidden="true"
									className="text-white/15 text-lg"
								>
									/
								</span>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
