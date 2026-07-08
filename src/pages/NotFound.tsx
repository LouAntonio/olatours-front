import { motion } from 'motion/react';
import { motion as m, stagger } from '../styles/tokens';
import { Button } from '../components/Button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const container = {
	hidden: {},
	show: { transition: { staggerChildren: stagger.wide } },
};

const item = {
	hidden: { opacity: 0, y: 40 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: m.duration.slow, ease: m.ease.out },
	},
};

export function NotFound() {
	useDocumentTitle('Página não encontrada');

	return (
		<section className="relative min-h-dvh flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy via-navy-dark to-ink grain">
			{/* Background decorative elements */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
				<div className="absolute -top-32 -right-32 w-80 h-80 rotate-45 rounded-[3rem] border border-flag/5" />
				<div className="absolute -bottom-40 -left-24 w-96 h-96 rotate-45 rounded-[4rem] border border-sky/5" />
				<div className="absolute top-[30%] right-[15%] w-16 h-16 rotate-45 rounded-xl border border-flag/10" />
				<div className="absolute bottom-[25%] left-[10%] w-12 h-12 rotate-45 rounded-lg border border-flag/10" />

				{/* Grid lines evoking map coordinates */}
				<svg
					className="absolute inset-0 w-full h-full opacity-[0.03]"
					aria-hidden="true"
				>
					<defs>
						<pattern
							id="grid"
							width="80"
							height="80"
							patternUnits="userSpaceOnUse"
						>
							<path
								d="M 80 0 L 0 0 0 80"
								fill="none"
								stroke="white"
								strokeWidth="0.5"
							/>
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#grid)" />
				</svg>

				{/* Compass-inspired arcs */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/[0.02]" />
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/[0.03]" />
			</div>

			<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 w-full py-20">
				<motion.div
					initial="hidden"
					animate="show"
					variants={container}
					className="flex flex-col items-center text-center"
				>
					{/* 404 */}
					<motion.div variants={item} className="relative">
						<div className="absolute inset-0 flex items-center justify-center opacity-[0.04] select-none">
							<span className="font-display font-black text-[clamp(12rem,40vw,28rem)] text-white leading-none tracking-tighter">
								404
							</span>
						</div>
						<span className="relative font-display font-black text-[clamp(8rem,25vw,18rem)] text-flag leading-none tracking-tighter block">
							404
						</span>
					</motion.div>

					{/* Subtitle */}
					<motion.div variants={item} className="mt-4 sm:mt-6">
						<span className="label-caps text-sky tracking-[0.18em]">
							ERRO · ROTA NÃO ENCONTRADA
						</span>
					</motion.div>

					{/* Heading */}
					<motion.h1
						variants={item}
						className="mt-6 font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2rem,4.5vw,3.5rem)] text-white"
					>
						Perdeste-te no <span className="text-flag">mapa</span>?
					</motion.h1>

					{/* Body */}
					<motion.p
						variants={item}
						className="mt-5 text-lg sm:text-xl leading-relaxed text-white/60 max-w-lg"
					>
						O destino que procuras não está no nosso roteiro.
						Acontece aos melhores exploradores. Volta ao início e
						recomeça a viagem.
					</motion.p>

					{/* Decorative dash */}
					<motion.div
						variants={item}
						className="mt-8 w-12 h-0.5 rounded-full bg-flag/40"
					/>

					{/* CTA */}
					<motion.div variants={item} className="mt-10">
						<Button
							as="a"
							variant="flag"
							size="lg"
							href="/"
							className="tracking-[0.15em]"
						>
							Voltar ao início
						</Button>
					</motion.div>

					{/* Coordinates hint */}
					<motion.p
						variants={item}
						className="mt-16 font-mono text-[11px] text-white/15 tracking-widest select-none"
					>
						08°50'S 13°14'E · ALTITUDE: PERDIDA
					</motion.p>
				</motion.div>
			</div>
		</section>
	);
}
