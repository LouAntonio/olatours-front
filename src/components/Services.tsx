import { motion } from 'motion/react';
import { motion as m, stagger } from '../styles/tokens';

type Service = {
	n: 'I' | 'II' | 'III';
	key: string;
	title: string;
	intro: string;
	points: string[];
	tag: string;
	tone: 'sky' | 'navy' | 'flag';
};

const services: Service[] = [
	{
		n: 'I',
		key: 'negocios',
		title: 'Turismo de Negócios',
		intro: 'A logística discreta que faz uma visita oficial parecer simples — porque nós tratamos do que não se vê.',
		points: [
			'Transporte executivo dedicado',
			'Gestão de logística para delegações',
			'Auxílio em eventos e conferências empresariais',
			'Recepção e protocolo em aeroporto',
		],
		tag: 'EXECUTIVO',
		tone: 'sky',
	},
	{
		n: 'II',
		key: 'investimento',
		title: 'Turismo de Investimento',
		intro: 'Abrimos portas institucionais em Angola e na África subsariana para quem decide onde o capital se aplica.',
		points: [
			'Atracção de investidores e fundos',
			'Reuniões com decisores institucionais',
			'Abertura de portas governamentais',
			'Visitas estratégicas a projectos e ZEE',
		],
		tag: 'INSTITUCIONAL',
		tone: 'navy',
	},
	{
		n: 'III',
		key: 'frota',
		title: 'Transporte & Frota',
		intro: 'Operação mensal, traslados de aeroporto e suporte em conferências — para equipas que precisam de pontualidade todos os dias.',
		points: [
			'Transporte mensal para funcionários',
			'Traslados executivos aeroporto ↔ hotel',
			'Suporte em conferências e feiras',
			'Relatórios de serviço mensais',
		],
		tag: 'OPERACIONAL',
		tone: 'flag',
	},
];

const container = {
	hidden: {},
	show: { transition: { staggerChildren: stagger.wide } },
};

const item = {
	hidden: { opacity: 0, y: 32 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: m.duration.slow, ease: m.ease.out },
	},
};

const toneStyles: Record<
	Service['tone'],
	{ accent: string; rule: string; chip: string; num: string }
> = {
	sky: {
		accent: 'text-sky',
		rule: 'bg-sky',
		chip: 'bg-sky text-white',
		num: 'text-sky',
	},
	navy: {
		accent: 'text-navy',
		rule: 'bg-navy',
		chip: 'bg-navy text-white',
		num: 'text-navy',
	},
	flag: {
		accent: 'text-flag',
		rule: 'bg-flag',
		chip: 'bg-flag text-white',
		num: 'text-flag',
	},
};

export function Services() {
	return (
		<section
			id="servicos"
			className="relative bg-white py-20 sm:py-28 overflow-hidden"
		>
			<div className="mx-auto max-w-[1400px] px-5 sm:px-8">
				<div className="grid grid-cols-12 gap-6 mb-14 sm:mb-20">
					<div className="col-span-12 lg:col-span-5">
						<span className="accent-bar block mb-4" />
						<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
							O que <span className="text-sky">fazemos</span>.
						</h2>
					</div>

					<div className="col-span-12 lg:col-span-7 lg:pt-2">
						<p className="text-xl sm:text-2xl leading-relaxed text-ink-soft border-l-2 border-sky pl-5">
							Em todos os serviços que prestamos, prezamos pela
							pontualidade, privacidade e excelência. Três
							práticas. Zero atalhos.
						</p>
						<div className="mt-6 flex flex-wrap items-center gap-3">
							<span className="label-caps text-ink-mute">
								Princípios:
							</span>
							{['Pontualidade', 'Privacidade', 'Excelência'].map(
								(p, i) => (
									<span
										key={p}
										className="label-caps px-2.5 py-1 border border-gray-border text-ink rounded-sm"
									>
										0{i + 1} {p}
									</span>
								),
							)}
						</div>
					</div>
				</div>

				<motion.div
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, margin: '-80px' }}
					variants={container}
					className="grid grid-cols-12 gap-6 sm:gap-8"
				>
					{services.map((s) => (
						<ServiceCard key={s.key} service={s} />
					))}
				</motion.div>
			</div>
		</section>
	);
}

function ServiceCard({ service }: { service: Service }) {
	const t = toneStyles[service.tone];

	return (
		<motion.article
			variants={item}
			className="group col-span-12 md:col-span-4 bg-white border border-gray-border rounded-lg relative overflow-hidden hover:shadow-card-hover transition-shadow"
		>
			<div className="p-6 sm:p-8 flex flex-col h-full">
				<div className="flex items-start justify-between gap-3 mb-6">
					<div className="flex items-baseline gap-2">
						<span
							className={[
								'font-display text-6xl sm:text-7xl font-black leading-none',
								t.num,
							].join(' ')}
						>
							{service.n}
						</span>
						<span className="label-caps text-ink-mute">
							SERVIÇO / 03
						</span>
					</div>
					<span
						className={[
							'label-caps px-2 py-1 rounded-sm',
							t.chip,
						].join(' ')}
					>
						{service.tag}
					</span>
				</div>

				<h3 className="font-display text-2xl sm:text-3xl font-black uppercase leading-[1] tracking-tight text-ink">
					{service.title}
				</h3>

				<p className="mt-4 text-ink-soft leading-relaxed">
					{service.intro}
				</p>

				<div className={['mt-7 h-px w-full', t.rule].join(' ')} />

				<ul className="mt-6 space-y-3">
					{service.points.map((p, i) => (
						<li
							key={p}
							className="flex items-start gap-3 text-ink leading-relaxed"
						>
							<span
								className={[
									'label-caps mt-1 shrink-0 w-6',
									t.accent,
								].join(' ')}
							>
								0{i + 1}
							</span>
							<span>{p}</span>
						</li>
					))}
				</ul>

				<div className="mt-8 pt-5 border-t border-gray-border flex items-center justify-between">
					<span className="label-caps text-ink-mute">
						{service.tag}
					</span>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						aria-hidden="true"
						className="h-5 w-5 text-ink-mute group-hover:text-sky group-hover:translate-x-1 transition-all"
					>
						<path
							d="M5 12h14M13 6l6 6-6 6"
							stroke="currentColor"
							strokeWidth="1.5"
						/>
					</svg>
				</div>
			</div>

			<div
				className={[
					'absolute top-0 right-0 w-1.5 h-12',
					service.tone === 'sky'
						? 'bg-sky'
						: service.tone === 'navy'
							? 'bg-navy'
							: 'bg-flag',
				].join(' ')}
			/>
		</motion.article>
	);
}
