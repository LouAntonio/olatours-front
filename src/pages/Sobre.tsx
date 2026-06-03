import { motion } from 'motion/react';
import { motion as m, stagger } from '../styles/tokens';

const milestones = [
	{
		year: '2014',
		title: 'Fundação',
		body: 'A Ola Tours nasce em Luanda com a missão de elevar o padrão do turismo corporativo em Angola.',
	},
	{
		year: '2023',
		title: 'Reconhecimento Nacional',
		body: 'Eleita a melhor empresa de turismo em Angola no Startup Summit, promovido pelo Ministério da Economia.',
	},
	{
		year: '2024',
		title: 'Operação Internacional',
		body: 'Recepção de altas delegações — incluindo a Presidente da Tanzânia e o Vice-Presidente do Banco Mundial para África.',
	},
	{
		year: '2025',
		title: 'Confiança Institucional',
		body: 'Escolhida como uma das empresas em que os investidores podem confiar, pelo Ministério do Turismo.',
	},
];

const values = [
	{
		n: '01',
		title: 'Pontualidade',
		body: 'O tempo dos nossos clientes é o nosso activo mais valioso. Cada operação cumpre o minuto prometido.',
		color: 'border-flag',
	},
	{
		n: '02',
		title: 'Privacidade',
		body: 'NDA por defeito. Protocolo por princípio. Discrição absoluta em todas as operações.',
		color: 'border-navy',
	},
	{
		n: '03',
		title: 'Excelência',
		body: 'Cada serviço tem dono, plano B e relatório final. Não entregamos menos do que o melhor.',
		color: 'border-sky',
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

export function Sobre() {
	return (
		<>
			<section className="relative bg-navy pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden">
				<div className="pointer-events-none absolute inset-0 opacity-[0.03]">
					<div className="corporate-grid h-full w-full" />
				</div>
				<div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
					<div className="grid grid-cols-12 gap-6">
						<div className="col-span-12 lg:col-span-7">
							<span className="accent-bar-flag block mb-4" />
							<h1 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(3rem,8vw,7rem)] text-white">
								Sobre a{' '}
								<span className="text-flag">Ola Tours</span>
							</h1>
							<p className="mt-6 text-lg sm:text-xl leading-relaxed text-white/70 max-w-2xl">
								Somos uma empresa angolana especializada em
								viagens corporativas, logística executiva e
								facilitação de negócios. Operamos onde outros
								improvisam — e entregamos onde outros prometem.
							</p>
						</div>
						<div className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col justify-end">
							<div className="border-l-2 border-flag pl-5">
								<p className="text-white/50 label-caps">
									DESDE 2014
								</p>
								<p className="font-display text-3xl sm:text-4xl font-black text-white leading-tight mt-1">
									Luanda <span className="text-flag">·</span>{' '}
									Angola
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="relative bg-white py-20 sm:py-28">
				<div className="mx-auto max-w-[1400px] px-5 sm:px-8">
					<div className="grid grid-cols-12 gap-6 sm:gap-8">
						<div className="col-span-12 lg:col-span-5">
							<span className="accent-bar-flag block mb-4" />
							<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
								A nossa{' '}
								<span className="text-flag">história</span>.
							</h2>
						</div>
						<div className="col-span-12 lg:col-span-7 lg:pt-2">
							<p className="text-xl sm:text-2xl leading-relaxed text-ink-soft">
								A Ola Tours nasceu em 2014, em Luanda, da
								convicção de que o turismo corporativo em Angola
								merecia um padrão mais elevado. Não se tratava
								apenas de transporte — tratava-se de confiança,
								pontualidade e um conhecimento profundo do
								terreno.
							</p>
							<p className="mt-6 text-xl sm:text-2xl leading-relaxed text-ink-soft">
								Hoje, operamos em 54 países, recebemos Chefes de
								Estado e delegações do Banco Mundial, e somos
								reconhecidos institucionalmente como uma
								referência no sector. Mas o nosso foco continua
								o mesmo: fazer com que cada viagem seja uma
								extensão natural da estratégia de quem a
								contrata.
							</p>
							<div className="mt-8 flex items-center gap-3">
								<span className="label-caps text-ink-mute">
									OLA TOURS · DESDE 2014
								</span>
								<span className="h-px w-8 bg-gray-border" />
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="relative bg-gray-light py-20 sm:py-28 overflow-hidden">
				<div className="mx-auto max-w-[1400px] px-5 sm:px-8">
					<div className="grid grid-cols-12 gap-6 mb-14 sm:mb-20">
						<div className="col-span-12 lg:col-span-5">
							<span className="accent-bar-flag block mb-4" />
							<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
								Marcos{' '}
								<span className="text-flag">importantes</span>.
							</h2>
						</div>
					</div>

					<motion.div
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: '-100px' }}
						variants={container}
						className="relative"
					>
						<div className="absolute left-[27px] top-0 bottom-0 w-px bg-gray-border hidden sm:block" />
						{milestones.map((m) => (
							<motion.div
								key={m.year}
								variants={item}
								className="relative flex flex-col sm:flex-row gap-4 sm:gap-8 pb-12 sm:pb-14 last:pb-0"
							>
								<div className="hidden sm:flex flex-col items-center shrink-0 w-14">
									<div className="w-14 h-14 rounded-full bg-navy text-white flex items-center justify-center font-display text-sm font-black leading-none z-10 border-4 border-gray-light">
										{m.year}
									</div>
								</div>
								<div className="sm:hidden mb-2">
									<span className="inline-flex items-center label-caps bg-navy text-white px-3 py-1 rounded-sm">
										{m.year}
									</span>
								</div>
								<div className="flex-1 bg-white border border-gray-border rounded-lg p-6 sm:p-8 hover:shadow-card-hover transition-shadow">
									<h3 className="font-display text-2xl sm:text-3xl font-black uppercase leading-tight tracking-tight text-ink mb-3">
										{m.title}
									</h3>
									<p className="text-ink-soft leading-relaxed text-lg">
										{m.body}
									</p>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			<section className="relative bg-navy py-16 sm:py-20">
				<div className="mx-auto max-w-[1400px] px-5 sm:px-8">
					<div className="grid grid-cols-12 gap-6 sm:gap-8">
						{[
							{
								label: 'Experiência',
								value: 'Desde 2014',
								hint: '10+ anos',
							},
							{
								label: 'Operação',
								value: '54 países',
								hint: 'Angola + Mundo',
							},
							{
								label: 'Clientes',
								value: '1000+',
								hint: 'Empresas e instituições',
							},
							{
								label: 'Reconhecimento',
								value: '2 prémios',
								hint: '2023 · 2025',
							},
						].map((s) => (
							<div
								key={s.label}
								className="col-span-6 sm:col-span-3 text-center border border-white/15 rounded-lg py-8 sm:py-10 px-4"
							>
								<p className="label-caps text-white/40 mb-2">
									{s.label}
								</p>
								<p className="font-display text-4xl sm:text-5xl font-black leading-tight text-white">
									{s.value}
								</p>
								<p className="mt-1 text-xs text-white/40">
									{s.hint}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="relative bg-white py-20 sm:py-28">
				<div className="mx-auto max-w-[1400px] px-5 sm:px-8">
					<div className="grid grid-cols-12 gap-6 mb-14 sm:mb-20">
						<div className="col-span-12 lg:col-span-5">
							<span className="accent-bar-flag block mb-4" />
							<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
								Os nossos{' '}
								<span className="text-flag">princípios</span>.
							</h2>
						</div>
						<div className="col-span-12 lg:col-span-7 lg:pt-2">
							<p className="text-xl sm:text-2xl leading-relaxed text-ink-soft border-l-2 border-flag pl-5">
								Três práticas. Zero atalhos. Em todos os
								serviços que prestamos, prezamos pela
								pontualidade, privacidade e excelência.
							</p>
						</div>
					</div>

					<motion.div
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: '-80px' }}
						variants={container}
						className="grid grid-cols-12 gap-6 sm:gap-8"
					>
						{values.map((v) => (
							<motion.article
								key={v.n}
								variants={item}
								className={`col-span-12 md:col-span-4 bg-white border border-gray-border rounded-lg overflow-hidden hover:shadow-card-hover transition-shadow border-t-4 ${v.color}`}
							>
								<div className="p-6 sm:p-8">
									<span className="font-display text-5xl sm:text-6xl font-black text-ink leading-none block mb-5">
										{v.n}
									</span>
									<h3 className="font-display text-2xl sm:text-3xl font-black uppercase leading-tight tracking-tight text-ink">
										{v.title}
									</h3>
									<p className="mt-4 text-ink-soft leading-relaxed">
										{v.body}
									</p>
								</div>
							</motion.article>
						))}
					</motion.div>
				</div>
			</section>
		</>
	);
}
