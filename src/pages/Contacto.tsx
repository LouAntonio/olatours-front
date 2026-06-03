import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { motion } from 'motion/react';
import { motion as m, stagger } from '../styles/tokens';

const contacts = [
	{
		key: 'morada',
		label: 'Morada',
		lines: [
			'Travessa Neves F.B.P.F Machado 19',
			'Bairro Ingombotas, Luanda',
			'Angola',
		],
		icon: (
			<svg
				viewBox="0 0 24 24"
				fill="none"
				className="h-6 w-6"
				aria-hidden="true"
			>
				<path
					d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
					fill="currentColor"
				/>
			</svg>
		),
	},
	{
		key: 'email',
		label: 'Email',
		lines: ['info@olatours.co.ao'],
		href: 'mailto:info@olatours.co.ao',
		icon: (
			<svg
				viewBox="0 0 24 24"
				fill="none"
				className="h-6 w-6"
				aria-hidden="true"
			>
				<path
					d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
					fill="currentColor"
				/>
			</svg>
		),
	},
	{
		key: 'telefone',
		label: 'Telefone',
		lines: ['+244 940 818 664'],
		href: 'tel:+244940818664',
		icon: (
			<svg
				viewBox="0 0 24 24"
				fill="none"
				className="h-6 w-6"
				aria-hidden="true"
			>
				<path
					d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
					fill="currentColor"
				/>
			</svg>
		),
	},
];

const socials = [
	{
		label: 'Instagram',
		handle: '@olatoursao',
		href: 'https://instagram.com/olatoursao',
	},
	{
		label: 'TikTok',
		handle: '@kelvinsjohn',
		href: 'https://tiktok.com/@kelvinsjohn',
	},
];

const container = {
	hidden: {},
	show: { transition: { staggerChildren: stagger.wide } },
};

const item = {
	hidden: { opacity: 0, y: 24 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: m.duration.base, ease: m.ease.out },
	},
};

export function Contacto() {
	useDocumentTitle('Contacto');

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
								<span className="text-flag">Contacto</span>
							</h1>
							<p className="mt-6 text-lg sm:text-xl leading-relaxed text-white/70 max-w-2xl">
								Estamos em Luanda, mas operamos para todo o
								mundo. Fale connosco e descubra como podemos
								tornar a sua próxima operação mais simples,
								discreta e eficiente.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="relative bg-white py-20 sm:py-28">
				<div className="mx-auto max-w-[1400px] px-5 sm:px-8">
					<motion.div
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: '-80px' }}
						variants={container}
						className="grid grid-cols-12 gap-6 sm:gap-8"
					>
						<div className="col-span-12 lg:col-span-6">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
								{contacts.map((c) => (
									<motion.div
										key={c.key}
										variants={item}
										className="bg-gray-light border border-gray-border rounded-lg p-6 sm:p-8 hover:shadow-card-hover transition-shadow"
									>
										<div className="text-flag mb-4">
											{c.icon}
										</div>
										<p className="label-caps text-ink-mute mb-2">
											{c.label}
										</p>
										{c.href ? (
											<a
												href={c.href}
												className="font-display text-xl sm:text-2xl font-black text-ink hover:text-flag transition-colors leading-tight"
											>
												{c.lines[0]}
											</a>
										) : (
											c.lines.map((line, i) => (
												<p
													key={i}
													className="font-display text-xl sm:text-2xl font-black text-ink leading-tight"
												>
													{line}
												</p>
											))
										)}
									</motion.div>
								))}
							</div>
						</div>

						<div className="col-span-12 lg:col-span-5 lg:col-start-8">
							<motion.div
								variants={item}
								className="bg-navy text-white border border-navy rounded-lg p-8 sm:p-10"
							>
								<p className="label-caps text-white/50 mb-2">
									REDES SOCIAIS
								</p>
								<p className="font-display text-2xl sm:text-3xl font-black leading-tight text-white mb-6">
									Siga-nos e acompanhe
								</p>
								<div className="space-y-4">
									{socials.map((s) => (
										<a
											key={s.label}
											href={s.href}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center justify-between px-5 py-4 border border-white/15 rounded-lg hover:bg-white/5 transition-colors group"
										>
											<div>
												<p className="label-caps text-white/50">
													{s.label}
												</p>
												<p className="font-display text-xl font-black text-white mt-0.5">
													{s.handle}
												</p>
											</div>
											<svg
												viewBox="0 0 24 24"
												fill="none"
												aria-hidden="true"
												className="h-5 w-5 text-white/40 group-hover:text-flag group-hover:translate-x-0.5 transition-all"
											>
												<path
													d="M7 17L17 7M17 7H7M17 7v10"
													stroke="currentColor"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</a>
									))}
								</div>
								<div className="mt-6 pt-5 border-t border-white/15">
									<p className="text-white/40 text-sm leading-relaxed">
										Reservados · Profissionais · Discretos
									</p>
								</div>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</section>
		</>
	);
}
