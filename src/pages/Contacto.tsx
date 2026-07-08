import { type FormEvent, useState, useId } from 'react';
import { motion } from 'motion/react';
import { motion as m, stagger } from '../styles/tokens';
import { Button } from '../components/Button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

type Tone = 'navy' | 'sky' | 'flag';

type Contact = {
	key: string;
	label: string;
	lines: string[];
	href?: string;
	tone: Tone;
};

const contacts: Contact[] = [
	{
		key: 'morada',
		label: 'Morada',
		lines: [
			'Travessa Neves F.B.P.F Machado 19',
			'Bairro Ingombotas, Luanda',
			'Angola',
		],
		tone: 'navy',
	},
	{
		key: 'email',
		label: 'Email',
		lines: ['info@olatours.co.ao'],
		href: 'mailto:info@olatours.co.ao',
		tone: 'sky',
	},
	{
		key: 'redes',
		label: 'Redes Sociais',
		lines: [],
		tone: 'flag',
	},
	{
		key: 'telefone',
		label: 'Telefone',
		lines: ['+244 940 818 664'],
		href: 'tel:+244940818664',
		tone: 'flag',
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

const accentMap: Record<Tone, { css: string; rgb: string }> = {
	navy: { css: 'var(--color-navy)', rgb: '26, 43, 74' },
	sky: { css: 'var(--color-sky)', rgb: '20, 121, 193' },
	flag: { css: 'var(--color-flag)', rgb: '181, 72, 42' },
};

const container = {
	hidden: {},
	show: { transition: { staggerChildren: stagger.wide } },
};

const item = {
	hidden: { opacity: 0, y: 24 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: m.duration.slow, ease: m.ease.out },
	},
};

export function Contacto() {
	useDocumentTitle('Contacto');

	const [submitted, setSubmitted] = useState(false);
	const [sending, setSending] = useState(false);
	const formId = useId();

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const data = new FormData(form);
		setSending(true);
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: data.get('nome'),
					email: data.get('email'),
					phone: data.get('telefone'),
					subject: data.get('assunto'),
					message: data.get('mensagem'),
				}),
			});
			const json = await res.json();
			if (!json.success) throw new Error(json.message);
			setSubmitted(true);
		} catch (err) {
			alert(err instanceof Error ? err.message : 'Erro ao enviar mensagem');
		} finally {
			setSending(false);
		}
	}

	return (
		<>
			{/* ===== HERO ===== */}
			<section className="relative bg-navy min-h-dvh flex items-center pt-16 sm:pt-20 pb-12 sm:pb-16 overflow-hidden grain">
				<div className="pointer-events-none absolute top-0 right-0 w-48 h-48 sm:w-80 sm:h-80 border-r border-t border-white/[0.04] rounded-tr-[100px] corner-pulse" />

				<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
					<div className="grid grid-cols-12 gap-6">
						<div className="col-span-12 lg:col-span-8">
							<div className="flex items-center gap-3 mb-6">
								<span className="h-px w-8 bg-flag/40" />
								<span className="label-caps text-flag tracking-[0.18em]">
									CONTACTO · LUANDA · GLOBAL
								</span>
							</div>

							<h1 className="font-display font-black uppercase leading-[0.82] tracking-tight text-[clamp(3.5rem,10vw,8rem)] text-white">
								<span className="text-flag">Contacto</span>
							</h1>

							<p className="mt-6 text-lg sm:text-xl leading-relaxed text-white/70 max-w-2xl">
								Estamos em Luanda, mas operamos para todo o
								mundo. Fale connosco e descubra como podemos
								tornar a sua próxima operação mais simples,
								discreta e eficiente.
							</p>
						</div>

						<div className="col-span-12 lg:col-span-4 flex flex-col justify-end items-start sm:items-end pt-8 lg:pt-0">
							<div className="relative">
								<div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-flag/40" />
								<div className="border-l-2 border-flag pl-5">
									<p className="text-white/50 label-caps mb-2">
										CONTACTOS
									</p>
									<div className="flex flex-wrap gap-2">
										{[
											'EMAIL',
											'TELEFONE',
											'REDES SOCIAIS',
										].map((p) => (
											<span
												key={p}
												className="label-caps px-2.5 py-1 border border-white/20 text-white/80 rounded-sm hover:border-flag hover:text-flag transition-colors"
											>
												{p}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ===== CONTACT GRID + FORM ===== */}
			<section className="relative bg-cream-50 py-20 sm:py-28 overflow-hidden">
				<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
					<div className="grid grid-cols-12 gap-6 mb-14 sm:mb-20">
						<div className="col-span-12 lg:col-span-6">
							<span className="accent-bar-flag block mb-4" />
							<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
								Fale <span className="text-flag">connosco</span>
								.
							</h2>
						</div>
						<div className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-end">
							<p className="text-ink-mute text-sm sm:text-base leading-relaxed">
								Preencha o formulário ou contacte-nos
								diretamente. Respondemos em até 48h.
							</p>
						</div>
					</div>

					<div className="grid grid-cols-12 gap-5 sm:gap-6">
						{/* Contact cards */}
						<div className="col-span-12 lg:col-span-6">
							<motion.div
								initial="hidden"
								whileInView="show"
								viewport={{ once: true, margin: '-80px' }}
								variants={container}
								className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 items-start"
							>
								{contacts.map((c) => {
									const accent = accentMap[c.tone];
									return (
										<motion.div
											key={c.key}
											variants={item}
											className="relative bg-white border border-gray-border/60 rounded-lg overflow-hidden transition-all duration-500 card-elevated"
										>
											<div className="p-5 sm:p-6">
												{c.key === 'redes' ? (
													<>
														<div
															className="mb-3"
															style={{
																color: accent.css,
															}}
														>
															<svg
																viewBox="0 0 24 24"
																fill="none"
																className="h-5 w-5"
																aria-hidden="true"
															>
																<path
																	d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"
																	fill="currentColor"
																/>
															</svg>
														</div>

														<p className="label-caps text-ink-mute mb-3">
															{c.label}
														</p>

														<div className="space-y-2.5">
															{socials.map(
																(s) => (
																	<a
																		key={
																			s.label
																		}
																		href={
																			s.href
																		}
																		target="_blank"
																		rel="noopener noreferrer"
																		className="flex items-center justify-between px-3.5 py-2.5 border border-gray-border/60 rounded-sm hover:border-flag/40 hover:bg-flag/[0.02] transition-all group/link"
																	>
																		<div>
																			<p className="label-caps text-ink-mute text-[10px]">
																				{
																					s.label
																				}
																			</p>
																			<p className="font-display text-base sm:text-lg font-black text-ink mt-0.5">
																				{
																					s.handle
																				}
																			</p>
																		</div>
																		<svg
																			viewBox="0 0 24 24"
																			fill="none"
																			aria-hidden="true"
																			className="h-4 w-4 text-ink-mute group-hover/link:text-flag group-hover/link:translate-x-0.5 transition-all"
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
																),
															)}
														</div>
													</>
												) : (
													<>
														<div
															className="mb-3"
															style={{
																color: accent.css,
															}}
														>
															{c.key ===
																'morada' && (
																<svg
																	viewBox="0 0 24 24"
																	fill="none"
																	className="h-5 w-5"
																	aria-hidden="true"
																>
																	<path
																		d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
																		fill="currentColor"
																	/>
																</svg>
															)}
															{c.key ===
																'email' && (
																<svg
																	viewBox="0 0 24 24"
																	fill="none"
																	className="h-5 w-5"
																	aria-hidden="true"
																>
																	<path
																		d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
																		fill="currentColor"
																	/>
																</svg>
															)}
															{c.key ===
																'telefone' && (
																<svg
																	viewBox="0 0 24 24"
																	fill="none"
																	className="h-5 w-5"
																	aria-hidden="true"
																>
																	<path
																		d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
																		fill="currentColor"
																	/>
																</svg>
															)}
														</div>

														<p className="label-caps text-ink-mute mb-1.5">
															{c.label}
														</p>

														{c.href ? (
															<a
																href={c.href}
																className="font-display text-lg sm:text-xl font-black text-ink hover:text-flag transition-colors leading-tight"
															>
																{c.lines[0]}
															</a>
														) : (
															c.lines.map(
																(line, j) => (
																	<p
																		key={j}
																		className="font-display text-lg sm:text-xl font-black text-ink leading-tight"
																	>
																		{line}
																	</p>
																),
															)
														)}
													</>
												)}
											</div>
										</motion.div>
									);
								})}
							</motion.div>
						</div>

						{/* Form */}
						<div className="col-span-12 lg:col-span-6">
							<motion.div
								initial="hidden"
								whileInView="show"
								viewport={{ once: true, margin: '-80px' }}
								variants={item}
								className="bg-white border border-gray-border/60 rounded-lg overflow-hidden card-elevated"
							>
								<div className="p-6 sm:p-8">
									<p className="label-caps text-ink-mute mb-1">
										FORMULÁRIO
									</p>
									<p className="font-display text-2xl sm:text-3xl font-black text-ink leading-tight mb-6">
										Envie-nos uma{' '}
										<span className="text-flag">
											mensagem
										</span>
									</p>

									{submitted ? (
										<div className="text-center py-12">
											<div className="w-12 h-12 rounded-full bg-flag/10 flex items-center justify-center mx-auto mb-4">
												<svg
													viewBox="0 0 24 24"
													fill="none"
													className="h-6 w-6 text-flag"
													aria-hidden="true"
												>
													<path
														d="M5 13l4 4L19 7"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</div>
											<p className="font-display text-2xl font-black text-ink">
												Mensagem enviada
											</p>
											<p className="text-ink-mute mt-2">
												Responderemos em até 48h.
											</p>
										</div>
									) : (
										<form
											onSubmit={handleSubmit}
											className="space-y-5"
										>
											<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
												<div>
													<label
														htmlFor={`${formId}-name`}
														className="label-caps text-ink-mute block mb-1.5"
													>
														Nome
													</label>
													<input
														id={`${formId}-name`}
														name="nome"
														type="text"
														required
														className="w-full px-4 py-3 border border-gray-border rounded-sm bg-white text-ink placeholder:text-ink-mute/50 focus:outline-none focus:border-flag focus:ring-1 focus:ring-flag/30 transition-all"
														placeholder="O seu nome"
													/>
												</div>
												<div>
													<label
														htmlFor={`${formId}-email`}
														className="label-caps text-ink-mute block mb-1.5"
													>
														Email
													</label>
													<input
														id={`${formId}-email`}
														name="email"
														type="email"
														required
														className="w-full px-4 py-3 border border-gray-border rounded-sm bg-white text-ink placeholder:text-ink-mute/50 focus:outline-none focus:border-flag focus:ring-1 focus:ring-flag/30 transition-all"
														placeholder="seu@email.com"
													/>
												</div>
											</div>

											<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
												<div>
													<label
														htmlFor={`${formId}-phone`}
														className="label-caps text-ink-mute block mb-1.5"
													>
														Telefone
													</label>
													<input
														id={`${formId}-phone`}
														name="telefone"
														type="tel"
														className="w-full px-4 py-3 border border-gray-border rounded-sm bg-white text-ink placeholder:text-ink-mute/50 focus:outline-none focus:border-flag focus:ring-1 focus:ring-flag/30 transition-all"
														placeholder="+244"
													/>
												</div>
												<div>
													<label
														htmlFor={`${formId}-subject`}
														className="label-caps text-ink-mute block mb-1.5"
													>
														Assunto
													</label>
													<select
														id={`${formId}-subject`}
														name="assunto"
														required
														defaultValue=""
														className="w-full px-4 py-3 border border-gray-border rounded-sm bg-white text-ink focus:outline-none focus:border-flag focus:ring-1 focus:ring-flag/30 transition-all"
													>
														<option
															value=""
															disabled
														>
															Seleccionar
														</option>
														<option>
															Turismo de Negócios
														</option>
														<option>
															Turismo de
															Investimento
														</option>
														<option>
															Transporte & Frota
														</option>
														<option>Outro</option>
													</select>
												</div>
											</div>

											<div>
												<label
													htmlFor={`${formId}-message`}
													className="label-caps text-ink-mute block mb-1.5"
												>
													Mensagem
												</label>
												<textarea
													id={`${formId}-message`}
													name="mensagem"
													rows={4}
													required
													className="w-full px-4 py-3 border border-gray-border rounded-sm bg-white text-ink placeholder:text-ink-mute/50 focus:outline-none focus:border-flag focus:ring-1 focus:ring-flag/30 transition-all resize-none"
													placeholder="Como podemos ajudar?"
												/>
											</div>

											<Button
												as="button"
												variant="flag"
												size="lg"
												disabled={sending}
												className="w-full sm:w-auto"
											>
												{sending ? 'A enviar...' : 'Enviar mensagem'}
											</Button>
										</form>
									)}
								</div>
							</motion.div>
						</div>
					</div>

					{/* ===== MAP ===== */}
					<motion.div
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: '-100px' }}
						variants={item}
						className="mt-5 sm:mt-6 bg-white border border-gray-border/60 rounded-lg overflow-hidden card-elevated"
					>
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.6917203068256!2d13.2321762!3d-8.815004400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f3b9ac28ac0b%3A0xc9c28295fdc7e888!2sOlatours!5e0!3m2!1spt-PT!2sao!4v1780525942521!5m2!1spt-PT!2sao"
							width="100%"
							height="400"
							style={{ border: 0 }}
							allowFullScreen
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
							title="Olatours - Luanda"
							className="w-full h-72 sm:h-96 align-bottom"
						/>
					</motion.div>
				</div>
			</section>
		</>
	);
}
