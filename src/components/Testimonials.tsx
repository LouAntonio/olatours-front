import { motion } from 'motion/react';
import { Seal } from './Seal';
import { motion as m, stagger } from '../styles/tokens';

type Testimonial = {
	id: string;
	quote: string;
	name: string;
	title: string;
	country: string;
	passNo: string;
	valid: string;
	visitDate: string;
	sealText: string;
	sealNumber: string;
	tone: 'terracotta' | 'moss';
};

const testimonials: Testimonial[] = [
	{
		id: 'ssh',
		quote: 'Eu e minha equipa fomos muito bem tratados durante a minha estadia em Angola. Agradeço a todos os envolvidos na organização da nossa estadia.',
		name: 'Samia Suluhu Hassan',
		title: 'Presidente da República da Tanzânia',
		country: 'TZA',
		passNo: 'OTC / 24 / 0042',
		valid: 'PERMANENTE',
		visitDate: 'JUL · 2024',
		sealText: 'VISITA · ESTADO',
		sealNumber: '01',
		tone: 'terracotta',
	},
	{
		id: 'nd',
		quote: 'A equipa da Ola Tours foi muito profissional, pontual e compartilhou comigo informações interessantes sobre a história de Angola durante a nossa visita ao Museu da Escravatura em Luanda.',
		name: 'Ndiamé Diop',
		title: 'Vice-presidente regional do Banco Mundial para África Oriental e Austral',
		country: 'WBG',
		passNo: 'OTC / 24 / 0117',
		valid: 'PERMANENTE',
		visitDate: 'OUT · 2024',
		sealText: 'INSTITUIÇÃO · WBG',
		sealNumber: '02',
		tone: 'moss',
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

export function Testimonials() {
	return (
		<section
			id="testemunhos"
			className="relative bg-paper-warm py-20 sm:py-28 overflow-hidden paper-grain"
		>
			<div className="mx-auto max-w-[1400px] px-5 sm:px-8">
				<div className="grid grid-cols-12 gap-6 mb-14 sm:mb-20">
					<div className="col-span-12 lg:col-span-4">
						<div className="flex items-center gap-3 mb-6">
							<span className="font-display text-2xl sm:text-3xl font-black text-terracotta leading-none">
								06
							</span>
							<span className="h-px w-12 sm:w-20 bg-ink" />
							<span className="eyebrow text-ink-soft">
								Testemunhos
							</span>
						</div>
						<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
							O que <span className="text-terracotta">dizem</span>{' '}
							<span className="font-serif italic font-medium text-ink-soft normal-case tracking-normal">
								os nossos clientes.
							</span>
						</h2>
					</div>

					<div className="col-span-12 lg:col-span-7 lg:col-start-6 lg:pt-2">
						<p className="font-serif text-xl sm:text-2xl leading-relaxed text-ink-soft italic border-l-2 border-terracotta pl-5">
							O feedback dos nossos clientes é importante para
							nós, para que possamos continuar a prestar um
							serviço especializado. Dois excerpts. Duas
							chancelas.
						</p>
						<div className="mt-6 mono-caps text-ink-mute flex items-center gap-3">
							<span className="h-px w-10 bg-ink/40" />
							<span>FONTE · DIRECTA · AUTORIZADA</span>
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
					{testimonials.map((t) => (
						<Passport key={t.id} t={t} />
					))}
				</motion.div>
			</div>
		</section>
	);
}

function Passport({ t }: { t: Testimonial }) {
	const toneText = t.tone === 'terracotta' ? 'text-terracotta' : 'text-moss';
	const toneBg = t.tone === 'terracotta' ? 'bg-terracotta' : 'bg-moss';

	return (
		<motion.article
			variants={item}
			className="col-span-12 lg:col-span-6 bg-paper-card border border-ink/15 relative overflow-hidden"
		>
			<div
				className={[
					'flex items-center justify-between gap-2 px-6 sm:px-8 py-3 border-b border-ink/15',
					toneBg,
				].join(' ')}
			>
				<div className="flex items-center gap-3 mono-caps text-paper">
					<span className="h-1.5 w-1.5 rounded-full bg-paper pulse-dot" />
					<span>CARTA DE VISITA · {t.country}</span>
				</div>
				<span className="mono-caps text-paper/80">Nº {t.passNo}</span>
			</div>

			<div className="grid grid-cols-12 gap-4 p-6 sm:p-8">
				<div className="col-span-12 sm:col-span-3 flex sm:flex-col items-center sm:items-start gap-3 sm:gap-4 pb-4 sm:pb-0 sm:pr-4 sm:border-r sm:border-ink/15">
					<div className={toneText}>
						<Seal
							text={t.sealText}
							number={t.sealNumber}
							size="sm"
							tone={t.tone}
						/>
					</div>
				</div>

				<div className="col-span-12 sm:col-span-9">
					<svg
						viewBox="0 0 80 60"
						fill="none"
						aria-hidden="true"
						className="h-12 sm:h-14 w-auto mb-4"
					>
						<text
							x="0"
							y="55"
							fontFamily="Fraunces, serif"
							fontWeight="700"
							fontSize="80"
							fill="currentColor"
							className={toneText}
						>
							”
						</text>
					</svg>

					<blockquote className="font-serif text-xl sm:text-2xl leading-[1.4] text-ink">
						{t.quote}
					</blockquote>

					<div className="mt-6 pt-5 border-t border-ink/15 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
						<div>
							<p className="font-display text-lg sm:text-xl font-black leading-tight text-ink">
								{t.name}
							</p>
							<p className="mt-1 text-sm text-ink-soft leading-snug">
								{t.title}
							</p>
						</div>
						<dl className="grid grid-cols-2 gap-2 sm:gap-3 mono-caps text-ink-mute sm:justify-self-end sm:text-right">
							<dt className="col-span-1 sm:col-span-2">VISITA</dt>
							<dd className="col-span-1 sm:col-span-2 text-ink -mt-1.5">
								{t.visitDate}
							</dd>
							<dt>VALIDADE</dt>
							<dd>{t.valid}</dd>
						</dl>
					</div>
				</div>
			</div>

			<div className="perforation h-1" />

			<div className="px-6 sm:px-8 py-3 flex items-center justify-between mono-caps text-ink-mute bg-paper-warm/40">
				<span>STAMP · {t.country}</span>
				<span className="hidden sm:inline">
					OLA TOURS CORPORATIVO · LUANDA
				</span>
				<span className="text-ink">{t.passNo.split(' / ').pop()}</span>
			</div>
		</motion.article>
	);
}
