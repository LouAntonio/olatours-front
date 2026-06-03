import { motion } from 'motion/react';
import { AfricaMap } from './AfricaMap';
import { Button } from './Button';
import { motion as m, stagger } from '../styles/tokens';

const staggerC = {
	hidden: {},
	show: { transition: { staggerChildren: stagger.base } },
};

export function Contact() {
	return (
		<section
			id="contacto"
			className="relative bg-ink text-white py-20 sm:py-28 overflow-hidden"
		>
			<div className="pointer-events-none absolute inset-0 opacity-[0.04]">
				<div className="corporate-grid h-full w-full" />
			</div>

			<div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
				<div className="grid grid-cols-12 gap-6 mb-12 sm:mb-16">
					<div className="col-span-12 lg:col-span-4">
						<span className="accent-bar block mb-4" />
						<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.75rem,7vw,5.5rem)]">
							Vamos <span className="text-sky">explorar</span>
							<span className="text-sky">.</span>
						</h2>
					</div>

					<div className="col-span-12 lg:col-span-7 lg:col-start-6 lg:pt-2">
						<p className="text-xl sm:text-2xl leading-relaxed text-white/70 border-l-2 border-sky pl-5">
							Uma operação a planear, uma delegação a receber, um
							investidor a trazer a Angola? Escreva-nos.
							Respondemos em 24h, com proposta e referência de
							contacto.
						</p>
					</div>
				</div>

				<div className="grid grid-cols-12 gap-6 sm:gap-10">
					<motion.div
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: '-80px' }}
						variants={staggerC}
						className="col-span-12 lg:col-span-7 border-t-2 border-white/20 pt-8"
					>
						<dl className="grid grid-cols-1">
							<ContactRow
								label="Email"
								value="info@olatours.co.ao"
								href="mailto:info@olatours.co.ao"
								detail="Resposta em 24h úteis"
							/>
							<ContactRow
								label="Telefone"
								value="+244 940 818 664"
								href="tel:+244940818664"
								detail="Seg–Sex · 08h00–19h00 (WAT)"
							/>
							<ContactRow
								label="Website"
								value="www.olatours.co.ao"
								href="https://www.olatours.co.ao"
								detail="Dossier completo · PT / EN"
							/>
							<ContactRow
								label="Operação"
								value="Luanda · Angola"
								detail="Cobertura: 54 países africanos"
								noLink
							/>
						</dl>

						<div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t border-white/15 pt-6">
							<p className="font-display text-lg font-bold text-white/85 max-w-xs">
								Pronto para marcar uma reunião?
							</p>
							<Button
								as="a"
								href="mailto:info@olatours.co.ao?subject=Opera%C3%A7%C3%A3o%20corporativa"
								variant="sky"
								size="lg"
							>
								Escrever agora
							</Button>
						</div>
					</motion.div>

					<motion.aside
						initial={{ opacity: 0, scale: 0.96 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true, margin: '-80px' }}
						transition={{
							duration: m.duration.slow,
							ease: m.ease.out,
						}}
						className="col-span-12 lg:col-span-5 relative"
					>
						<div className="aspect-square w-full max-w-[460px] mx-auto lg:ml-auto relative">
							<div className="absolute inset-0 border border-white/15 rounded-lg" />
							<div className="absolute inset-0 flex items-center justify-center p-8">
								<AfricaMap
									className="text-white"
									showLabels
									showLuanda
								/>
							</div>
							<div className="absolute top-4 left-4 label-caps text-white/60">
								HQ · LUANDA
							</div>
							<div className="absolute bottom-4 right-4 label-caps text-white/60">
								8°50'S · 13°14'E
							</div>
						</div>

						<div className="mt-6 grid grid-cols-3 gap-3 label-caps text-white/60">
							<div>
								<p className="text-white text-2xl font-display font-black">
									54
								</p>
								<p>Países africanos</p>
							</div>
							<div>
								<p className="text-white text-2xl font-display font-black">
									24h
								</p>
								<p>Resposta</p>
							</div>
							<div>
								<p className="text-white text-2xl font-display font-black">
									10+
								</p>
								<p>Anos de operação</p>
							</div>
						</div>
					</motion.aside>
				</div>
			</div>
		</section>
	);
}

function ContactRow({
	label,
	value,
	href,
	detail,
	noLink,
}: {
	label: string;
	value: string;
	href?: string;
	detail?: string;
	noLink?: boolean;
}) {
	const Inner = (
		<>
			<div className="col-span-12 sm:col-span-4 flex items-center gap-3">
				<span className="h-1.5 w-1.5 rounded-full bg-sky" />
				<span className="label-caps text-white/80">{label}</span>
			</div>
			<div className="col-span-12 sm:col-span-5">
				<p className="font-display text-2xl sm:text-3xl font-black leading-tight text-white">
					{value}
				</p>
			</div>
			<div className="col-span-12 sm:col-span-3 sm:text-right">
				{detail && <p className="label-caps text-white/50">{detail}</p>}
			</div>
		</>
	);

	if (noLink || !href) {
		return (
			<div className="grid grid-cols-12 gap-y-2 items-baseline py-5 sm:py-6 border-b border-white/10 group">
				{Inner}
			</div>
		);
	}

	return (
		<a
			href={href}
			className="grid grid-cols-12 gap-y-2 items-baseline py-5 sm:py-6 border-b border-white/10 hover:bg-white/[0.04] -mx-3 px-3 transition-colors group"
		>
			{Inner}
		</a>
	);
}
