import { useParams, Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { motion } from 'motion/react';
import { motion as m, stagger } from '../styles/tokens';
import { useEventBySlug } from '../hooks/useEvents';

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

const accentMap: Record<string, { css: string; rgb: string }> = {
	flag: { css: 'var(--color-flag)', rgb: '181, 72, 42' },
	sky: { css: 'var(--color-sky)', rgb: '20, 121, 193' },
	navy: { css: 'var(--color-navy)', rgb: '26, 43, 74' },
};

const gradientMap: Record<string, string> = {
	flag: 'linear-gradient(135deg, #B5482A 0%, #1A2B4A 100%)',
	sky: 'linear-gradient(135deg, #1479C1 0%, #1A2B4A 100%)',
	navy: 'linear-gradient(135deg, #1A2B4A 0%, #B5482A 100%)',
};

function SkeletonHero() {
	return (
		<section className="bg-navy min-h-dvh flex items-center pt-16 sm:pt-20 pb-12 sm:pb-16 animate-pulse">
			<div className="mx-auto max-w-[1200px] px-5 sm:px-8 w-full">
				<div className="h-3 w-40 bg-white/10 rounded mb-8" />
				<div className="h-16 w-3/4 bg-white/10 rounded mb-4" />
				<div className="h-6 w-1/2 bg-white/10 rounded mb-8" />
				<div className="flex gap-4">
					<div className="h-8 w-28 bg-white/10 rounded" />
					<div className="h-8 w-28 bg-white/10 rounded" />
				</div>
			</div>
		</section>
	);
}

export function EventoDetalhe() {
	const { slug } = useParams<{ slug: string }>();
	const { data: evento, isLoading, isError } = useEventBySlug(slug ?? '');

	useDocumentTitle(evento ? evento.title : 'Evento');

	if (isLoading) {
		return <SkeletonHero />;
	}

	if (isError || !evento) {
		return (
			<section className="bg-navy min-h-dvh flex items-center pt-16 sm:pt-20 pb-12 sm:pb-16">
				<div className="mx-auto max-w-[1200px] px-5 sm:px-8 text-center">
					<h1 className="font-display font-black uppercase text-6xl text-white">
						Evento não encontrado
					</h1>
					<p className="mt-4 text-white/60 text-lg">
						O evento que procura não existe ou foi removido.
					</p>
					<Link
						to="/agenda"
						className="mt-8 inline-flex items-center gap-2 label-caps text-flag hover:text-flag/80 transition-colors"
					>
						← Voltar para Agenda
					</Link>
				</div>
			</section>
		);
	}

	const accent = accentMap[evento.accent];
	const heroImg = evento.photos?.[0]?.src;

	return (
		<>
			<section className="relative min-h-dvh flex items-center pt-16 sm:pt-20 pb-12 sm:pb-16 overflow-hidden">
				{heroImg ? (
					<div
						className="absolute inset-0 bg-cover bg-center"
						style={{ backgroundImage: `url(${heroImg})` }}
					/>
				) : (
					<div
						className="absolute inset-0"
						style={{ background: gradientMap[evento.accent] }}
					/>
				)}
				<div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy/95" />
				<div className="absolute inset-0 opacity-[0.03] grain" />

				<div className="pointer-events-none absolute top-0 right-0 w-48 h-48 sm:w-80 sm:h-80 border-r border-t border-white/[0.04] rounded-tr-[100px] corner-pulse" />

				<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 w-full">
					<div className="mb-8">
						<Link
							to="/agenda"
							className="inline-flex items-center gap-2 label-caps text-white/50 hover:text-flag transition-colors"
						>
							<svg
								viewBox="0 0 16 16"
								fill="none"
								className="h-3 w-3"
								aria-hidden="true"
							>
								<path
									d="M10 2.5L5.5 7 10 11.5"
									stroke="currentColor"
									strokeWidth="1.75"
									strokeLinecap="square"
								/>
							</svg>
							Voltar para Agenda
						</Link>
					</div>

					<div className="grid grid-cols-12 gap-6">
						<div className="col-span-12 lg:col-span-8">
							<div className="flex items-center gap-3 mb-6">
								<span className="h-px w-8 bg-flag/40" />
								<span className="label-caps text-flag tracking-[0.18em]">
									{evento.date}
								</span>
							</div>

							<h1 className="font-display font-black uppercase leading-[0.82] tracking-tight text-[clamp(3.5rem,10vw,8rem)] text-white">
								{evento.title}
							</h1>

							{evento.subtitle && (
								<p className="mt-4 text-xl sm:text-2xl leading-relaxed text-white/70 max-w-2xl">
									{evento.subtitle}
								</p>
							)}

							<div className="mt-8 flex flex-wrap gap-3">
								<span
									className="inline-flex items-center gap-2 px-3 py-1.5 label-caps text-white rounded-sm"
									style={{ background: accent.css }}
								>
									<span className="h-1.5 w-1.5 rounded-full bg-white/70" />
									{evento.type}
								</span>
								<span className="inline-flex items-center gap-2 px-3 py-1.5 label-caps text-ink-mute border border-white/15 rounded-sm">
									{evento.countryName}
								</span>
								<span className="inline-flex items-center gap-2 px-3 py-1.5 label-caps text-ink-mute border border-white/15 rounded-sm">
									{evento.dateLong}
								</span>
							</div>
						</div>

						<div className="col-span-12 lg:col-span-4 flex flex-col justify-end items-start sm:items-end pt-8 lg:pt-0">
							<div className="relative">
								<div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-flag/40" />
								<div className="border-l-2 border-flag pl-5">
									<p className="text-white/50 label-caps mb-2">
										EVENTO
									</p>
									<div className="flex flex-wrap gap-2">
										{[
											{
												label: evento.type,
												css: accent.css,
											},
											{
												label: evento.countryName,
												css: 'var(--color-white)',
											},
											{
												label: evento.date,
												css: 'var(--color-white)',
											},
										].map((p) => (
											<span
												key={p.label}
												className="label-caps px-2.5 py-1 border border-white/20 text-white/80 rounded-sm hover:border-flag hover:text-flag transition-colors"
											>
												{p.label}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{evento.fullDescription && (
				<section className="relative bg-white py-20 sm:py-28 overflow-hidden">
					<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
						<motion.div
							initial="hidden"
							whileInView="show"
							viewport={{ once: true, margin: '-80px' }}
							variants={container}
							className="grid grid-cols-12 gap-6 sm:gap-8"
						>
							<div className="col-span-12 lg:col-span-5">
								<motion.div variants={item}>
									<span className="accent-bar-flag block mb-4" />
									<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
										Detalhes do{' '}
										<span className="text-flag">
											evento
										</span>
										.
									</h2>
								</motion.div>
							</div>

							<div className="col-span-12 lg:col-span-7 lg:pt-2">
								{evento.fullDescription
									.split('\n\n')
									.map((paragraph, i) => (
										<motion.p
											key={i}
											variants={item}
											className={
												i === 0
													? 'text-xl sm:text-2xl leading-relaxed text-ink-soft'
													: 'mt-6 text-lg leading-relaxed text-ink-soft'
											}
										>
											{i === 0 && (
												<span className="float-left text-5xl sm:text-7xl font-editorial font-bold leading-none text-flag mr-3 mt-1">
													{paragraph.charAt(0)}
												</span>
											)}
											{i === 0
												? paragraph.slice(1)
												: paragraph}
										</motion.p>
									))}

								<motion.div
									variants={item}
									className="mt-10 flex items-center gap-4"
								>
									<span className="h-px flex-1 bg-gray-border" />
									<span className="label-caps text-ink-mute shrink-0">
										OLA TOURS · {evento.date}
									</span>
									<span className="h-px flex-1 bg-gray-border" />
								</motion.div>
							</div>
						</motion.div>
					</div>
				</section>
			)}

			{evento.details && evento.details.length > 0 && (
				<section className="relative bg-cream-50 py-20 sm:py-28 overflow-hidden">
					<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
						<div className="grid grid-cols-12 gap-6 mb-14 sm:mb-20">
							<div className="col-span-12 lg:col-span-5">
								<span className="accent-bar-flag block mb-4" />
								<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
									Ficha{' '}
									<span className="text-flag">técnica</span>.
								</h2>
							</div>
							<div className="col-span-12 lg:col-span-6 lg:col-start-7 flex items-end">
								<p className="text-xl sm:text-2xl leading-relaxed text-ink-soft border-l-2 border-flag pl-5">
									{evento.details.length} parâmetros
									registados para este evento — do protocolo à
									operação.
								</p>
							</div>
						</div>

						<motion.div
							initial="hidden"
							whileInView="show"
							viewport={{ once: true, margin: '-80px' }}
							variants={container}
							className="grid grid-cols-12 gap-5 sm:gap-6"
						>
							{evento.details.map((d) => (
								<motion.div
									key={d.label}
									variants={item}
									className="col-span-12 sm:col-span-6 lg:col-span-4"
								>
									<div className="relative border border-gray-border/60 rounded-lg overflow-hidden transition-all duration-500 card-elevated bg-white">
										<div className="p-5 sm:p-6">
											<p
												className="label-caps mb-1.5"
												style={{ color: accent.css }}
											>
												{d.label}
											</p>
											<p className="font-display text-xl sm:text-2xl font-black uppercase leading-tight tracking-tight text-ink">
												{d.value}
											</p>
										</div>
									</div>
								</motion.div>
							))}
						</motion.div>
					</div>
				</section>
			)}

			{evento.photos && evento.photos.length > 1 && (
				<section className="relative bg-white py-20 sm:py-28 overflow-hidden">
					<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
						<div className="grid grid-cols-12 gap-6 mb-14 sm:mb-20">
							<div className="col-span-12 lg:col-span-6">
								<span className="accent-bar-flag block mb-4" />
								<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
									Galeria de{' '}
									<span className="text-flag">imagens</span>.
								</h2>
							</div>
							<div className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-end">
								<p className="text-ink-mute text-sm sm:text-base leading-relaxed">
									Registo visual dos momentos que marcaram
									este evento institucional.
								</p>
							</div>
						</div>

						<motion.div
							initial="hidden"
							whileInView="show"
							viewport={{ once: true, margin: '-80px' }}
							variants={container}
							className="grid grid-cols-12 gap-5 sm:gap-6"
						>
							{evento.photos.map((photo, i) => (
								<motion.div
									key={i}
									variants={item}
									className={`col-span-12 ${i === 0 ? 'sm:col-span-8' : 'sm:col-span-4'} ${evento.photos && evento.photos.length > 2 && i === evento.photos.length - 1 ? 'sm:col-start-5' : ''} ${evento.photos && evento.photos.length === 2 && i === 1 ? 'sm:col-span-4' : ''}`}
									style={{
										aspectRatio: i === 0 ? '16/9' : '4/3',
									}}
								>
									<div className="relative h-full w-full overflow-hidden rounded-lg group">
										<img
											src={photo.src}
											alt={photo.alt}
											className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
										/>
										{photo.caption && (
											<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
												<p className="text-white text-sm leading-relaxed">
													{photo.caption}
												</p>
											</div>
										)}
									</div>
								</motion.div>
							))}
						</motion.div>
					</div>
				</section>
			)}
		</>
	);
}
