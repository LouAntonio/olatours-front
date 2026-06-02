import { motion } from 'motion/react';
import { Logo } from './components/Logo';
import { Button } from './components/Button';
import { Badge } from './components/Badge';
import { DestinationCard } from './components/Card';
import { SectionLabel } from './components/SectionLabel';
import { Marquee } from './components/Marquee';
import { motion as m, stagger } from './styles/tokens';
import './App.css';

const heroStagger = {
	hidden: {},
	show: { transition: { staggerChildren: stagger.base, delayChildren: 0.1 } },
};

const heroItem = {
	hidden: { opacity: 0, y: 28 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: m.duration.base, ease: m.ease.out },
	},
};

function App() {
	return (
		<div className="min-h-screen bg-paper text-ink overflow-x-hidden">
			<Header />
			<main>
				<Hero />
				<Destinations />
				<Marquee
					items={[
						'RIO',
						'LISBOA',
						'TÓQUIO',
						'BUENOS AIRES',
						'CIDADE DO MÉXICO',
						'MADRI',
					]}
					tone="ink"
					separator="✺"
					className="border-y-2 border-ink"
				/>
				<HowItWorks />
				<Manifesto />
				<Marquee
					items={[
						'EDIÇÃO 01',
						'VERÃO 2026',
						'Nº 1479',
						'BOARDING PASS',
						'OLATOURS',
					]}
					tone="flag"
					separator="●"
				/>
			</main>
			<Footer />
		</div>
	);
}

export default App;

function Header() {
	return (
		<header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/85 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8">
				<div className="flex items-center gap-4">
					<Logo size="sm" />
					<span className="hidden sm:inline-flex label-caps text-ink-soft border-l border-ink/15 pl-4">
						Nº 1479 · Edição 01
					</span>
				</div>

				<nav className="hidden md:flex items-center gap-8">
					{['Destinos', 'Como funciona', 'Roteiros', 'Contato'].map(
						(label) => (
							<a
								key={label}
								href={`#${label.toLowerCase().replace(/\s/g, '-')}`}
								className="label-caps text-ink hover:text-flag transition-colors"
							>
								{label}
							</a>
						),
					)}
				</nav>

				<div className="flex items-center gap-3">
					<button
						type="button"
						className="hidden sm:inline-flex label-caps text-ink-soft hover:text-ink transition-colors"
					>
						PT · EN
					</button>
					<Button size="sm" variant="primary">
						Reservar
					</Button>
				</div>
			</div>
		</header>
	);
}

function Hero() {
	return (
		<section className="relative pt-12 sm:pt-20 pb-20 sm:pb-28">
			<div className="mx-auto max-w-[1400px] px-5 sm:px-8">
				<motion.div
					variants={heroStagger}
					initial="hidden"
					animate="show"
					className="grid grid-cols-12 gap-y-10 gap-x-6"
				>
					<motion.div
						variants={heroItem}
						className="col-span-12 flex items-center gap-3"
					>
						<span className="h-px w-12 bg-ink" />
						<Badge variant="ink" dot>
							Edição 01 · Verão 2026 · Embarques abertos
						</Badge>
					</motion.div>

					<motion.h1
						variants={heroItem}
						className="col-span-12 font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(3.5rem,12vw,11rem)]"
					>
						<span className="block">Viajar é</span>
						<span className="block">
							dizer{' '}
							<span className="relative inline-block text-flag">
								olá
								<svg
									viewBox="0 0 320 24"
									aria-hidden="true"
									className="absolute -bottom-2 left-0 h-3 w-full"
								>
									<path
										d="M2 14 Q 80 2, 160 10 T 318 6"
										stroke="currentColor"
										strokeWidth="4"
										strokeLinecap="square"
										fill="none"
									/>
								</svg>
							</span>{' '}
							<span className="text-sky">para</span>
						</span>
						<span className="block">o mundo.</span>
					</motion.h1>

					<motion.p
						variants={heroItem}
						className="col-span-12 md:col-span-6 md:col-start-1 text-lg sm:text-xl text-ink-soft leading-relaxed max-w-xl"
					>
						Roteiros curados, voos com tarifa transparente e
						concierge local em 24 cidades. Embarque em 48 horas —
						sem formulário de 14 páginas.
					</motion.p>

					<motion.div
						variants={heroItem}
						className="col-span-12 md:col-span-5 md:col-start-8 flex flex-wrap items-center gap-3 md:justify-end"
					>
						<Button variant="primary" size="lg">
							Explorar destinos
						</Button>
						<Button
							variant="outline"
							size="lg"
							as="a"
							href="#como-funciona"
						>
							Ver como funciona
						</Button>
					</motion.div>

					<motion.div
						variants={heroItem}
						className="col-span-12 mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 border-t-2 border-ink pt-6"
					>
						<Stat
							figure="24"
							label="Cidades operadas"
							hint="América Latina, Europa, Ásia"
						/>
						<Stat
							figure="48h"
							label="Tempo médio de embarque"
							hint="Da busca ao portão"
						/>
						<Stat
							figure="0%"
							label="Taxa de alteração"
							hint="Cancele até 7 dias antes"
						/>
						<Stat
							figure="Nº1"
							label="Em satisfação do cliente"
							hint="Pesquisa 2025,旅行者协会"
						/>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}

function Stat({
	figure,
	label,
	hint,
}: {
	figure: string;
	label: string;
	hint: string;
}) {
	return (
		<div className="flex flex-col gap-1">
			<span className="font-display text-4xl sm:text-5xl font-black leading-none tracking-tight">
				{figure}
			</span>
			<span className="label-caps text-ink mt-2">{label}</span>
			<span className="text-xs text-ink-soft leading-snug">{hint}</span>
		</div>
	);
}

function Destinations() {
	return (
		<section id="destinos" className="py-20 sm:py-28 bg-paper">
			<div className="mx-auto max-w-[1400px] px-5 sm:px-8">
				<div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 sm:mb-16">
					<SectionLabel
						number="01"
						title="Destinos em destaque"
						hint="Uma seleção quinzenal de partidas — curada por quem realmente viaja."
					/>
					<div className="flex items-center gap-3">
						<button
							type="button"
							className="label-caps px-3 py-2 border border-ink hover:bg-ink hover:text-paper-card transition-colors"
						>
							Todos
						</button>
						{['América', 'Europa', 'Ásia'].map((f) => (
							<button
								key={f}
								type="button"
								className="label-caps px-3 py-2 text-ink-soft hover:text-ink transition-colors"
							>
								{f}
							</button>
						))}
					</div>
				</div>

				<div className="grid grid-cols-12 gap-5 sm:gap-6">
					<DestinationCard
						className="col-span-12 lg:col-span-7 min-h-[420px] sm:min-h-[480px]"
						tone="sky"
						code="GRU → LIS"
						city="Lisboa"
						country="Portugal · 03 noites"
						departure="Sex 14h"
						duration="9h 35m"
						price="R$ 4.280"
						tag="Novo"
					/>
					<DestinationCard
						className="col-span-12 sm:col-span-6 lg:col-span-5 min-h-[420px] sm:min-h-[480px]"
						tone="flag"
						code="GIG → CDM"
						city="Cidade do México"
						country="México · 04 noites"
						departure="Sáb 22h"
						duration="11h 10m"
						price="R$ 3.640"
					/>
					<DestinationCard
						className="col-span-12 sm:col-span-6 lg:col-span-4 min-h-[360px]"
						tone="ink"
						code="POA → NRT"
						city="Tóquio"
						country="Japão · 06 noites"
						departure="Dom 01h"
						duration="26h 40m"
						price="R$ 7.920"
						tag="Best seller"
					/>
					<DestinationCard
						className="col-span-12 sm:col-span-6 lg:col-span-4 min-h-[360px]"
						tone="paper"
						code="BSB → EZE"
						city="Buenos Aires"
						country="Argentina · 02 noites"
						departure="Qui 18h"
						duration="3h 25m"
						price="R$ 1.180"
					/>
					<DestinationCard
						className="col-span-12 sm:col-span-6 lg:col-span-4 min-h-[360px]"
						tone="sky"
						code="REC → MAD"
						city="Madri"
						country="Espanha · 05 noites"
						departure="Ter 17h"
						duration="8h 50m"
						price="R$ 5.420"
						tag="Última hora"
					/>
				</div>
			</div>
		</section>
	);
}

function HowItWorks() {
	return (
		<section
			id="como-funciona"
			className="py-20 sm:py-28 bg-ink text-paper-card relative overflow-hidden"
		>
			<Watermark />
			<div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
				<SectionLabel
					number="02"
					title="Como funciona"
					hint="Três passos. Sem letras miúdas. Sem surpresas na fatura."
				/>

				<div className="mt-12 sm:mt-16 grid grid-cols-12 gap-x-6 gap-y-12 sm:gap-y-16">
					{steps.map((s, i) => (
						<motion.div
							key={s.number}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-80px' }}
							transition={{
								duration: m.duration.base,
								delay: i * 0.08,
								ease: m.ease.out,
							}}
							className="col-span-12 md:col-span-4 relative pl-8 md:pl-12"
						>
							<span className="absolute left-0 top-1 font-display text-7xl sm:text-8xl font-black text-flag leading-none">
								{s.number}
							</span>
							{i < steps.length - 1 && (
								<span
									aria-hidden="true"
									className="hidden md:block absolute left-[1.65rem] top-24 h-[calc(100%-3rem)] w-px bg-paper-card/20"
								/>
							)}
							<div className="md:pt-4">
								<h3 className="font-display text-3xl sm:text-4xl font-black leading-tight">
									{s.title}
								</h3>
								<p className="mt-3 text-paper-card/75 leading-relaxed max-w-sm">
									{s.body}
								</p>
							</div>
						</motion.div>
					))}
				</div>

				<div className="mt-16 sm:mt-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-paper-card/15 pt-8">
					<p className="font-display text-2xl sm:text-3xl font-bold max-w-md leading-tight">
						Pronto para o próximo{' '}
						<span className="text-flag">olá</span>?
					</p>
					<Button variant="flag" size="lg">
						Reservar agora
					</Button>
				</div>
			</div>
		</section>
	);
}

function Watermark() {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 1400 600"
			className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
		>
			<text
				x="50%"
				y="50%"
				textAnchor="middle"
				dominantBaseline="middle"
				fontFamily="Barlow Condensed, sans-serif"
				fontWeight="900"
				fontSize="380"
				letterSpacing="-10"
				fill="#FAF7F2"
			>
				OLATOURS
			</text>
		</svg>
	);
}

const steps = [
	{
		number: '01',
		title: 'Escolha o destino',
		body: 'Filtre por data, companhia ou vibe. Toda tarifa mostra o preço final — taxas, assento e bagagem inclusos.',
	},
	{
		number: '02',
		title: 'Receba o roteiro',
		body: 'Em 24h, um concierge local monta seu itinerário com cafés, mirantes e o que ninguém conta nos blogs.',
	},
	{
		number: '03',
		title: 'Embarque sem stress',
		body: 'Check-in automático, suporte 24/7 em português e um cartão postal na mala. Volte quando quiser.',
	},
];

function Manifesto() {
	return (
		<section className="py-20 sm:py-28 bg-paper">
			<div className="mx-auto max-w-[1400px] px-5 sm:px-8">
				<div className="grid grid-cols-12 gap-6">
					<div className="col-span-12 lg:col-span-4">
						<SectionLabel
							number="03"
							title="Manifesto"
							hint="Por que a OlaTours existe."
						/>
					</div>

					<div className="col-span-12 lg:col-span-8">
						<blockquote className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight text-ink">
							<span className="text-flag">“</span>
							Viajar devia ser um{' '}
							<span className="text-sky">sim</span> — não uma
							planilha. A gente desenha cada roteiro como se fosse
							para um amigo, e opera como se cada mala fosse a
							nossa.
							<span className="text-flag">”</span>
						</blockquote>

						<div className="mt-8 flex items-center gap-4">
							<div className="h-px w-12 bg-ink" />
							<div>
								<p className="font-display text-lg font-bold leading-none">
									Marina & Caio
								</p>
								<p className="label-caps text-ink-soft mt-1">
									Co-fundadores · OlaTours
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function Footer() {
	return (
		<footer className="bg-ink text-paper-card">
			<div className="mx-auto max-w-[1400px] px-5 sm:px-8 pt-20 pb-10">
				<div className="grid grid-cols-12 gap-y-12 gap-x-6">
					<div className="col-span-12 lg:col-span-5">
						<Logo size="lg" className="brightness-0 invert" />
						<p className="mt-6 max-w-sm text-paper-card/70 leading-relaxed">
							OlaTours é uma operadora de viagens curadas com base
							em São Paulo. CNPJ 00.000.000/0001-00.
						</p>
					</div>

					<FooterCol
						className="col-span-6 sm:col-span-4 lg:col-span-2"
						title="Destinos"
						items={[
							'Lisboa',
							'Tóquio',
							'Cidade do México',
							'Madri',
							'Buenos Aires',
						]}
					/>
					<FooterCol
						className="col-span-6 sm:col-span-4 lg:col-span-2"
						title="Empresa"
						items={['Sobre', 'Time', 'Carreiras', 'Imprensa']}
					/>
					<FooterCol
						className="col-span-12 sm:col-span-4 lg:col-span-3"
						title="Contato"
						items={[
							'ola@olatours.travel',
							'+55 11 4000-0000',
							'R. Augusta, 1500',
							'Seg–Sex · 9h–19h',
						]}
					/>
				</div>

				<div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-paper-card/15 pt-6">
					<p className="label-caps text-paper-card/50">
						© 2026 OlaTours · Todos os direitos reservados
					</p>
					<div className="flex items-center gap-6">
						{['Instagram', 'YouTube', 'Spotify'].map((s) => (
							<a
								key={s}
								href="#"
								className="label-caps text-paper-card/70 hover:text-flag transition-colors"
							>
								{s}
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}

function FooterCol({
	title,
	items,
	className = '',
}: {
	title: string;
	items: string[];
	className?: string;
}) {
	return (
		<div className={className}>
			<p className="label-caps text-paper-card/50 mb-4">{title}</p>
			<ul className="space-y-2.5">
				{items.map((i) => (
					<li
						key={i}
						className="text-paper-card/85 hover:text-flag transition-colors"
					>
						<a href="#">{i}</a>
					</li>
				))}
			</ul>
		</div>
	);
}
