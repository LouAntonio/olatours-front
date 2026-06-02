import { motion } from 'motion/react';
import { Button } from './Button';
import { motion as m, stagger } from '../styles/tokens';

type Product = {
	n: '01' | '02' | '03';
	code: string;
	brand: string;
	title: string;
	intro: string;
	features: string[];
};

const products: Product[] = [
	{
		n: '01',
		code: 'OLA · MC',
		brand: 'Ola Mobilidade Corporativa',
		title: 'Transporte executivo sob contrato.',
		intro: 'Para equipas e executivos que precisam de pontualidade diária, motoristas de confiança e relatórios mensais.',
		features: [
			'Transporte Executivo',
			'Transfers Aeroporto ↔ Hotel',
			'Motoristas profissionais que falam inglês',
			'Relatórios de serviço mensais',
		],
	},
	{
		n: '02',
		code: 'OLA · ME',
		brand: 'Ola Missões Empresariais',
		title: 'Delegações que chegam prontas.',
		intro: 'Uma missão empresarial em Angola começa muito antes do avião. Trata-se de logística, agenda e acesso — tudo alinhado.',
		features: [
			'Organização de delegações empresariais',
			'Agendamento de reuniões estratégicas',
			'Visitas a projectos e Zonas Económicas Especiais',
			'Logística completa: hotel, transporte e protocolo',
		],
	},
	{
		n: '03',
		code: 'OLA · ED',
		brand: 'Ola Eventos e Delegações',
		title: 'Eventos onde o detalhe é o produto.',
		intro: 'Conferências, cimeiras, recepções oficiais. Operamos o evento no terreno enquanto os nossos clientes aparecem no momento certo.',
		features: [
			'Logística completa de eventos',
			'Trabalho em campo',
			'Protocolo e recepção',
		],
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

export function Products() {
	return (
		<section
			id="produtos"
			className="relative bg-ink text-paper py-20 sm:py-28 overflow-hidden"
		>
			<div className="pointer-events-none absolute -left-40 top-20 w-[640px] h-[640px] opacity-[0.05]">
				<svg viewBox="0 0 600 600" fill="none">
					<text
						x="50%"
						y="50%"
						textAnchor="middle"
						dominantBaseline="middle"
						fontFamily="Barlow Condensed, sans-serif"
						fontWeight="900"
						fontSize="160"
						letterSpacing="-4"
						fill="#F4EFE6"
					>
						PRODUTOS
					</text>
				</svg>
			</div>

			<div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
				<div className="grid grid-cols-12 gap-6 mb-14 sm:mb-20">
					<div className="col-span-12 lg:col-span-5">
						<div className="flex items-center gap-3 mb-6">
							<span className="font-display text-2xl sm:text-3xl font-black text-terracotta leading-none">
								05
							</span>
							<span className="h-px w-12 sm:w-20 bg-paper" />
							<span className="eyebrow text-paper/70">
								Produtos
							</span>
						</div>
						<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
							Os nossos{' '}
							<span className="text-terracotta">produtos</span>.
						</h2>
					</div>

					<div className="col-span-12 lg:col-span-7 lg:pt-2">
						<p className="font-serif text-xl sm:text-2xl leading-relaxed text-paper/70 italic border-l-2 border-terracotta pl-5">
							Os nossos produtos garantem o melhor retorno sobre o
							investimento no sector de viagens. Três formatos. Um
							padrão.
						</p>
						<div className="mt-6 mono-caps text-paper/50 flex items-center gap-3">
							<span className="h-px w-10 bg-paper/40" />
							<span>ROI · PREVISIBILIDADE · ESCALA</span>
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
					{products.map((p, idx) => (
						<ProductCard key={p.n} product={p} index={idx} />
					))}
				</motion.div>

				<div className="mt-16 sm:mt-20 border-t border-paper/15 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
					<div>
						<p className="font-display text-2xl sm:text-3xl font-black leading-tight max-w-md">
							Pronto para o próximo{' '}
							<span className="text-terracotta">olá</span>?
						</p>
						<p className="mt-2 text-paper/60 max-w-md">
							Conte-nos a operação. Enviamos uma proposta em 48h.
						</p>
					</div>
					<Button
						as="a"
						href="#contacto"
						variant="terracotta"
						size="lg"
					>
						Pedir proposta
					</Button>
				</div>
			</div>
		</section>
	);
}

function ProductCard({ product, index }: { product: Product; index: number }) {
	const isFeature = index === 0;

	return (
		<motion.article
			variants={item}
			className={[
				'group col-span-12 md:col-span-4 relative p-6 sm:p-8 border transition-all duration-300',
				isFeature
					? 'bg-terracotta text-paper border-terracotta md:col-span-4 md:row-span-1'
					: 'bg-paper text-ink border-paper/15',
			].join(' ')}
		>
			<div className="flex items-start justify-between gap-3 mb-6">
				<div className="flex items-baseline gap-3">
					<span
						className={[
							'font-display text-6xl sm:text-7xl font-black leading-none',
							isFeature ? 'text-paper' : 'text-terracotta',
						].join(' ')}
					>
						{product.n}
					</span>
					<span
						className={[
							'mono-caps',
							isFeature ? 'text-paper/70' : 'text-ink-mute',
						].join(' ')}
					>
						{product.code}
					</span>
				</div>
				{isFeature && (
					<span className="label-caps px-2 py-1 border border-paper text-paper">
						Best seller
					</span>
				)}
			</div>

			<p
				className={[
					'mono-caps mb-3',
					isFeature ? 'text-paper/70' : 'text-terracotta',
				].join(' ')}
			>
				{product.brand}
			</p>

			<h3 className="font-display text-2xl sm:text-3xl font-black leading-[1.05] tracking-tight">
				{product.title}
			</h3>

			<p
				className={[
					'mt-4 leading-relaxed',
					isFeature ? 'text-paper/85' : 'text-ink-soft',
				].join(' ')}
			>
				{product.intro}
			</p>

			<div
				className={[
					'mt-6 h-px w-full',
					isFeature ? 'bg-paper/40' : 'bg-ink/15',
				].join(' ')}
			/>

			<p
				className={[
					'mono-caps mt-5 mb-3',
					isFeature ? 'text-paper/70' : 'text-ink-soft',
				].join(' ')}
			>
				O que inclui
			</p>

			<ul className="space-y-2.5">
				{product.features.map((f) => (
					<li
						key={f}
						className={[
							'flex items-start gap-3 leading-relaxed',
							isFeature ? 'text-paper' : 'text-ink',
						].join(' ')}
					>
						<span
							className={[
								'mt-1 inline-block h-1.5 w-1.5 shrink-0',
								isFeature ? 'bg-paper' : 'bg-terracotta',
							].join(' ')}
						/>
						<span className="flex-1">{f}</span>
					</li>
				))}
			</ul>

			<div
				className={[
					'mt-7 pt-5 border-t flex items-center justify-between',
					isFeature
						? 'border-paper/30 text-paper/70'
						: 'border-ink/10 text-ink-mute',
				].join(' ')}
			>
				<span className="mono-caps">PRODUTO {product.n} / 03</span>
				<svg
					viewBox="0 0 24 24"
					fill="none"
					aria-hidden="true"
					className={[
						'h-5 w-5 transition-transform group-hover:translate-x-1',
						isFeature ? 'text-paper' : 'text-ink',
					].join(' ')}
				>
					<path
						d="M5 12h14M13 6l6 6-6 6"
						stroke="currentColor"
						strokeWidth="1.5"
					/>
				</svg>
			</div>
		</motion.article>
	);
}
