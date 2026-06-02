import { motion } from 'motion/react';
import { AfricaMap } from './AfricaMap';
import { Seal } from './Seal';
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

export function Cover() {
	return (
		<section
			id="capa"
			className="relative overflow-hidden bg-paper pt-12 sm:pt-16 pb-20 sm:pb-28 paper-grain"
		>
			<div className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute -top-20 -right-24 w-[520px] h-[520px] opacity-[0.07]">
					<AfricaMap className="text-ink" />
				</div>
			</div>

			<div className="mx-auto max-w-[1400px] px-5 sm:px-8">
				<motion.div
					variants={coverStagger}
					initial="hidden"
					animate="show"
					className="grid grid-cols-12 gap-y-10 gap-x-6"
				>
					<motion.div
						variants={coverItem}
						className="col-span-12 flex items-center justify-between gap-4"
					>
						<div className="flex items-center gap-3">
							<span className="h-px w-10 sm:w-16 bg-ink" />
							<Badge variant="ink" dot>
								Dossier Corporativo · Edição 2026
							</Badge>
						</div>
						<span className="hidden sm:inline-flex mono-caps text-ink-soft">
							REF · OTC / 26 / 001
						</span>
					</motion.div>

					<motion.div
						variants={coverItem}
						className="col-span-12 lg:col-span-9"
					>
						<p className="mono-caps text-terracotta mb-4">
							[ Apresentação Institucional ]
						</p>
						<h1 className="font-display font-black uppercase leading-[0.85] tracking-tight text-[clamp(3.5rem,11vw,9.5rem)]">
							<span className="block">Ola Tours</span>
							<span className="block relative">
								<span className="relative z-10 text-ink">
									Corporat
								</span>
								<span className="text-terracotta italic font-serif font-medium tracking-normal normal-case">
									ivo.
								</span>
							</span>
						</h1>

						<div className="mt-8 max-w-2xl">
							<p className="font-serif text-xl sm:text-2xl leading-snug text-ink-soft italic">
								<span className="text-terracotta not-italic font-display font-black text-3xl sm:text-4xl align-text-top mr-1">
									“
								</span>
								Viagens corporativas, mobilidade executiva,
								investimento e facilitação de negócios em Angola
								e na África subsariana.
								<span className="text-terracotta not-italic font-display font-black text-3xl sm:text-4xl align-text-top ml-1">
									”
								</span>
							</p>
						</div>
					</motion.div>

					<motion.div
						variants={coverItem}
						className="col-span-12 lg:col-span-3 flex lg:justify-end items-start"
					>
						<div className="text-terracotta">
							<Seal
								text="OLA TOURS · LUANDA"
								subtext="EST. 2014"
								number="01"
								tone="terracotta"
								size="md"
							/>
						</div>
					</motion.div>

					<motion.div
						variants={coverItem}
						className="col-span-12 mt-2 border-t-2 border-ink pt-6 grid grid-cols-12 gap-6"
					>
						<MetaField
							className="col-span-6 sm:col-span-3"
							label="Emitido em"
							value="Luanda"
							hint="AGO · 2026"
						/>
						<MetaField
							className="col-span-6 sm:col-span-3"
							label="Validade"
							value="Indeterminada"
							hint="ACTUALIZAÇÃO ANUAL"
						/>
						<MetaField
							className="col-span-6 sm:col-span-3"
							label="Operação"
							value="África + Mundo"
							hint="54 PAÍSES"
						/>
						<MetaField
							className="col-span-6 sm:col-span-3"
							label="Confidencialidade"
							value="Total"
							hint="NDA · GDPR"
						/>
					</motion.div>

					<motion.div
						variants={coverItem}
						className="col-span-12 mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-ink/15 pt-5"
					>
						<p className="font-serif text-2xl sm:text-3xl text-ink italic max-w-xl">
							Vamos{' '}
							<span className="text-terracotta not-italic font-display font-black uppercase">
								explorar
							</span>
							.
						</p>
						<div className="flex flex-wrap items-center gap-3">
							<Button
								as="a"
								href="#contacto"
								variant="terracotta"
								size="lg"
							>
								Marcar uma reunião
							</Button>
							<Button
								as="a"
								href="#agenda"
								variant="outline"
								size="lg"
							>
								Ver agenda
							</Button>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}

function MetaField({
	label,
	value,
	hint,
	className = '',
}: {
	label: string;
	value: string;
	hint: string;
	className?: string;
}) {
	return (
		<div className={className}>
			<p className="mono-caps text-ink-soft mb-1.5">{label}</p>
			<p className="font-display text-xl sm:text-2xl font-black leading-none text-ink">
				{value}
			</p>
			<p className="mono-caps text-ink-mute mt-1.5">{hint}</p>
		</div>
	);
}
