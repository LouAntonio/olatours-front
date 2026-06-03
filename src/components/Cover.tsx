import { motion } from 'motion/react';
import { AfricaMap } from './AfricaMap';
import { Badge } from './Badge';
import { Button } from './Button';
import { motion as m, stagger } from '../styles/tokens';

const coverStagger = {
	hidden: {},
	show: { transition: { staggerChildren: stagger.base, delayChildren: 0.1 } },
};

const coverItem = {
	hidden: { opacity: 0, y: 28 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: m.duration.base, ease: m.ease.out },
	},
};

const features = [
	{ label: 'Operação', value: 'Angola + Mundo', hint: '54 países' },
	{ label: 'Experiência', value: 'Desde 2014', hint: '10+ anos' },
	{ label: 'Resposta', value: '24h úteis', hint: 'Proposta personalizada' },
];

export function Cover() {
	return (
		<section
			id="capa"
			className="relative overflow-hidden bg-white pt-8 sm:pt-12 pb-16 sm:pb-24"
		>
			<div className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute top-0 right-0 w-[480px] h-[520px] opacity-[0.04]">
					<AfricaMap className="text-sky" />
				</div>
				<div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-sky-50 opacity-40 blur-3xl" />
				<div className="absolute -top-8 right-1/4 w-64 h-64 rounded-full bg-flag-50 opacity-30 blur-3xl" />
			</div>

			<div className="mx-auto max-w-[1400px] px-5 sm:px-8">
				<motion.div
					variants={coverStagger}
					initial="hidden"
					animate="show"
					className="grid grid-cols-12 gap-y-8 gap-x-6"
				>
					<motion.div
						variants={coverItem}
						className="col-span-12 flex items-center gap-3"
					>
						<span className="h-px w-10 sm:w-16 bg-sky" />
						<Badge variant="sky" dot>
							Viagens Corporativas · Mobilidade Executiva
						</Badge>
					</motion.div>

					<motion.div
						variants={coverItem}
						className="col-span-12 lg:col-span-8"
					>
						<h1 className="font-display font-black uppercase leading-[0.85] tracking-tight text-[clamp(3.5rem,11vw,9.5rem)]">
							<span className="block">Ola Tours</span>
							<span className="block relative">
								<span className="relative z-10 text-ink">
									Corporat
								</span>
								<span className="text-flag italic font-normal tracking-normal normal-case font-sans font-light">
									ivo.
								</span>
							</span>
						</h1>

						<div className="mt-6 max-w-2xl">
							<p className="text-xl sm:text-2xl leading-snug text-ink-soft">
								<span className="text-sky font-bold text-3xl align-text-top mr-1">
									“
								</span>
								Viagens corporativas, mobilidade executiva,
								investimento e facilitação de negócios em Angola
								e na África subsariana.
								<span className="text-sky font-bold text-3xl align-text-top ml-1">
									”
								</span>
							</p>
						</div>
					</motion.div>

					<motion.div
						variants={coverItem}
						className="col-span-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t-2 border-ink pt-6"
					>
						<p className="text-2xl sm:text-3xl text-ink max-w-xl">
							Vamos{' '}
							<span className="text-sky font-display font-black uppercase">
								explorar
							</span>
							.
						</p>
						<div className="flex flex-wrap items-center gap-3">
							<Button
								as="a"
								href="#contacto"
								variant="sky"
								size="lg"
							>
								Marcar uma reunião
							</Button>
							<Button
								as="a"
								href="#servicos"
								variant="outline"
								size="lg"
							>
								Ver serviços
							</Button>
						</div>
					</motion.div>

					<motion.div
						variants={coverItem}
						className="col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 border-t border-gray-border pt-5"
					>
						{features.map((f) => (
							<div
								key={f.label}
								className="flex items-center gap-3"
							>
								<span className="h-2 w-2 rounded-full bg-sky shrink-0" />
								<div>
									<p className="label-caps text-ink-mute">
										{f.label}
									</p>
									<p className="font-display text-xl sm:text-2xl font-black leading-tight text-ink">
										{f.value}
									</p>
									<p className="text-sm text-ink-mute">
										{f.hint}
									</p>
								</div>
							</div>
						))}
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
