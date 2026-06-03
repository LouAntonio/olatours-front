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
			className="relative bg-navy text-white py-20 sm:py-28 overflow-hidden"
		>
			<div className="pointer-events-none absolute inset-0 opacity-[0.03]">
				<div className="corporate-grid h-full w-full" />
			</div>

			<div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
				<div className="grid grid-cols-12 gap-6 mb-14 sm:mb-20">
					<div className="col-span-12 lg:col-span-5">
						<span className="accent-bar-flag block mb-4" />
						<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
							Os nossos{' '}
							<span className="text-flag">produtos</span>.
						</h2>
					</div>

					<div className="col-span-12 lg:col-span-7 lg:pt-2">
						<p className="text-xl sm:text-2xl leading-relaxed text-white/70 border-l-2 border-flag pl-5">
							Os nossos produtos garantem o melhor retorno sobre o
							investimento no sector de viagens. Três formatos. Um
							padrão.
						</p>
						<div className="mt-6 label-caps text-white/50 flex items-center gap-3">
							<span className="dash-flag" />
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

				<div className="mt-16 sm:mt-20 border-t border-white/15 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
					<div>
						<p className="font-display text-2xl sm:text-3xl font-black leading-tight max-w-md">
							Pronto para o próximo{' '}
							<span className="text-flag">olá</span>?
						</p>
						<p className="mt-2 text-white/60 max-w-md">
							Conte-nos a operação. Enviamos uma proposta em 48h.
						</p>
					</div>
					<Button as="a" href="#contacto" variant="flag" size="lg">
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
				'group col-span-12 md:col-span-4 relative p-6 sm:p-8 border rounded-lg transition-all duration-300',
				isFeature
					? 'bg-sky text-white border-sky'
					: 'bg-white text-ink border-white/15',
			].join(' ')}
		>
			<div className="flex items-start justify-between gap-3 mb-6">
				<div className="flex items-baseline gap-3">
					<span
						className={[
							'font-display text-6xl sm:text-7xl font-black leading-none',
							isFeature ? 'text-white/80' : 'text-flag',
						].join(' ')}
					>
						{product.n}
					</span>
					<span
						className={[
							'label-caps',
							isFeature ? 'text-white/70' : 'text-ink-mute',
						].join(' ')}
					>
						{product.code}
					</span>
				</div>
				{isFeature && (
					<span className="label-caps px-2 py-1 border border-white/60 text-white/90 rounded-sm">
						Best seller
					</span>
				)}
			</div>

			<p
				className={[
					'label-caps mb-3',
					isFeature ? 'text-white/70' : 'text-flag',
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
					isFeature ? 'text-white/85' : 'text-ink-soft',
				].join(' ')}
			>
				{product.intro}
			</p>

			<div
				className={[
					'mt-6 h-px w-full',
					isFeature ? 'bg-white/40' : 'bg-gray-border',
				].join(' ')}
			/>

			<p
				className={[
					'label-caps mt-5 mb-3',
					isFeature ? 'text-white/70' : 'text-ink-mute',
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
							isFeature ? 'text-white' : 'text-ink',
						].join(' ')}
					>
						<span
							className={[
								'mt-2 inline-block h-1 w-2 shrink-0 rounded-sm',
								isFeature ? 'bg-white' : 'bg-flag',
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
						? 'border-white/30 text-white/70'
						: 'border-gray-border text-ink-mute',
				].join(' ')}
			>
				<span className="label-caps">PRODUTO {product.n} / 03</span>
				<svg
					viewBox="0 0 24 24"
					fill="none"
					aria-hidden="true"
					className={[
						'h-5 w-5 transition-transform group-hover:translate-x-1',
						isFeature ? 'text-white' : 'text-flag',
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
