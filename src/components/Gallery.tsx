import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { motion as m, stagger } from '../styles/tokens';

type GalleryItem = {
	src: string;
	alt: string;
};

const IMAGES: GalleryItem[] = [
	{
		src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=75',
		alt: 'Durban International Convention Centre',
	},
	{
		src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=75',
		alt: 'Estádio de futebol',
	},
	{
		src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=75',
		alt: 'ExCeL London',
	},
	{
		src: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=75',
		alt: 'Agricultura e tecnologia',
	},
	{
		src: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&q=75',
		alt: 'Feira multissetorial em Maputo',
	},
	{
		src: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=600&q=75',
		alt: 'Bangkok cityscape',
	},
	{
		src: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=75',
		alt: 'Safari africano',
	},
	{
		src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=75',
		alt: 'Praia de Cabo Ledo',
	},
	{
		src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=75',
		alt: 'Natureza e aventura',
	},
	{
		src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&q=75',
		alt: 'Quedas de Calandula',
	},
	{
		src: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=75',
		alt: 'Deserto do Namibe',
	},
	{
		src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=75',
		alt: 'Serra da Leba',
	},
	{
		src: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=600&q=75',
		alt: 'Costa de Benguela',
	},
	{
		src: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=75',
		alt: 'Dubai skyline',
	},
	{
		src: 'https://images.unsplash.com/photo-1569949381669-ecf31ae8f613?w=600&q=75',
		alt: 'Luanda skyline',
	},
	{
		src: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&q=75',
		alt: 'Business meeting',
	},
	{
		src: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=75',
		alt: 'Safari adventure',
	},
	{
		src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=75',
		alt: 'Team building',
	},
	{
		src: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=600&q=75',
		alt: 'Travel experience',
	},
];

function shuffle<T>(arr: T[]): T[] {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

export function Gallery() {
	const [items] = useState(() => shuffle(IMAGES));
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	const current = selectedIndex !== null ? items[selectedIndex] : null;
	const total = items.length;

	useEffect(() => {
		if (selectedIndex === null) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setSelectedIndex(null);
				return;
			}
			if (e.key === 'ArrowLeft') {
				setSelectedIndex((prev) =>
					prev !== null ? (prev - 1 + total) % total : null,
				);
				return;
			}
			if (e.key === 'ArrowRight') {
				setSelectedIndex((prev) =>
					prev !== null ? (prev + 1) % total : null,
				);
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [selectedIndex, total]);

	useEffect(() => {
		if (selectedIndex !== null) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [selectedIndex]);

	return (
		<>
			<section className="relative bg-cream-50 py-20 sm:py-28 overflow-hidden">
				<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
					<motion.div
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: '-80px' }}
						variants={{
							hidden: {},
							show: {
								transition: { staggerChildren: stagger.wide },
							},
						}}
					>
						<motion.div
							variants={{
								hidden: { opacity: 0, y: 20 },
								show: {
									opacity: 1,
									y: 0,
									transition: {
										duration: m.duration.base,
										ease: m.ease.out,
									},
								},
							}}
							className="flex items-center gap-4 mb-8 sm:mb-10"
						>
							<span className="h-px w-8 bg-sky/60" />
							<span className="label-caps text-ink-mute tracking-[0.15em]">
								GALERIA
							</span>
							<span className="h-px flex-1 bg-gray-border" />
						</motion.div>

						<motion.h2
							variants={{
								hidden: { opacity: 0, y: 20 },
								show: {
									opacity: 1,
									y: 0,
									transition: {
										duration: m.duration.base,
										ease: m.ease.out,
										delay: 0.1,
									},
								},
							}}
							className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2rem,5vw,3.5rem)] text-ink max-w-2xl mb-12 sm:mb-16"
						>
							Momentos que{' '}
							<span className="text-flag">definem</span> a nossa
							jornada.
						</motion.h2>
					</motion.div>
				</div>

				<div className="gallery-grid mx-auto max-w-[1200px] px-5 sm:px-8">
					{items.map((img, i) => (
						<motion.div
							key={`${img.src}-${i}`}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-50px' }}
							transition={{
								duration: m.duration.slow,
								ease: m.ease.out,
								delay: i * 0.04,
							}}
							onClick={() => setSelectedIndex(i)}
							className="gallery-item group relative overflow-hidden rounded-lg cursor-zoom-in"
						>
							<img
								src={img.src}
								alt={img.alt}
								loading="lazy"
								className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-500 pointer-events-none" />
						</motion.div>
					))}
				</div>
			</section>

			<AnimatePresence>
				{selectedIndex !== null && current && (
					<motion.div
						key="lightbox"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{
							duration: m.duration.base,
							ease: m.ease.out,
						}}
						onClick={() => setSelectedIndex(null)}
						className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 lightbox-overlay"
					>
						<button
							onClick={() => setSelectedIndex(null)}
							className="fixed top-4 right-4 sm:top-6 sm:right-6 lightbox-btn z-10"
							aria-label="Fechar"
						>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								className="h-5 w-5"
							>
								<path d="M6 6l12 12M18 6l-12 12" />
							</svg>
						</button>

						<button
							onClick={(e) => {
								e.stopPropagation();
								setSelectedIndex((prev) =>
									prev !== null
										? (prev - 1 + total) % total
										: null,
								);
							}}
							className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 lightbox-btn z-10"
							aria-label="Anterior"
						>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								className="h-5 w-5"
							>
								<path d="M15 6l-6 6 6 6" />
							</svg>
						</button>

						<AnimatePresence mode="wait">
							<motion.div
								key={selectedIndex}
								initial={{ opacity: 0, scale: 0.93 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.93 }}
								transition={{
									duration: m.duration.slow,
									ease: m.ease.out,
								}}
								onClick={(e) => e.stopPropagation()}
								className="max-h-[85vh] max-w-[90vw] w-auto h-auto"
							>
								<img
									src={current.src.replace(
										'w=600&q=75',
										'w=1200&q=80',
									)}
									alt={current.alt}
									className="relative w-auto h-auto max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl select-none"
									draggable={false}
								/>
							</motion.div>
						</AnimatePresence>

						<button
							onClick={(e) => {
								e.stopPropagation();
								setSelectedIndex((prev) =>
									prev !== null ? (prev + 1) % total : null,
								);
							}}
							className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 lightbox-btn z-10"
							aria-label="Seguinte"
						>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								className="h-5 w-5"
							>
								<path d="M9 6l6 6-6 6" />
							</svg>
						</button>

						<span className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 label-caps text-white/40 tracking-wider z-10">
							{String(selectedIndex + 1).padStart(2, '0')} /{' '}
							{String(total).padStart(2, '0')}
						</span>

						{current.alt && (
							<span className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 text-white/50 text-sm max-w-xs leading-relaxed z-10 hidden sm:block">
								{current.alt}
							</span>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
