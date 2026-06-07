import {
	type FormEvent,
	useState,
	useId,
	useRef,
	type ChangeEvent,
} from 'react';
import { motion } from 'motion/react';
import { motion as m, stagger } from '../styles/tokens';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Button } from '../components/Button';

type Tone = 'flag' | 'sky' | 'navy';

const values: {
	n: string;
	title: string;
	body: string;
	accent: Tone;
}[] = [
	{
		n: '01',
		title: 'Crescimento',
		body: 'Investimos no desenvolvimento da nossa equipa com formações contínuas, workshops e planos de carreira claros. Aqui, o seu crescimento é uma prioridade.',
		accent: 'flag',
	},
	{
		n: '02',
		title: 'Impacto Real',
		body: 'Trabalhe em operações que movem pessoas e negócios — desde executivos a delegações institucionais — em Angola e além-fronteiras.',
		accent: 'sky',
	},
	{
		n: '03',
		title: 'Estabilidade',
		body: 'Empresa sólida, com contratos institucionais de longo prazo e uma década de experiência no mercado. A Ola Tours veio para ficar e crescer.',
		accent: 'navy',
	},
	{
		n: '04',
		title: 'Cultura Angolana',
		body: 'Equipa jovem, dinâmica e profundamente angolana. Levamos o nome de Angola ao mundo com orgulho, profissionalismo e paixão pelo que fazemos.',
		accent: 'flag',
	},
];

const areas = [
	'Operações',
	'Transporte Executivo',
	'Eventos & Protocolo',
	'Administração',
	'Comercial & Vendas',
	'Marketing & Comunicação',
	'Recursos Humanos',
	'Tecnologia',
];

const accentMap: Record<Tone, { css: string; rgb: string }> = {
	flag: { css: 'var(--color-flag)', rgb: '181, 72, 42' },
	sky: { css: 'var(--color-sky)', rgb: '20, 121, 193' },
	navy: { css: 'var(--color-navy)', rgb: '26, 43, 74' },
};

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

export function Carreiras() {
	useDocumentTitle('Carreiras');

	const [submitted, setSubmitted] = useState(false);
	const [fileName, setFileName] = useState<string | null>(null);
	const fileRef = useRef<HTMLInputElement>(null);
	const formId = useId();

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		setSubmitted(true);
	}

	function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (file) {
			setFileName(file.name);
		}
	}

	return (
		<>
			<section className="relative bg-navy min-h-dvh flex items-center pt-16 sm:pt-20 pb-12 sm:pb-16 overflow-hidden grain">
				<div className="pointer-events-none absolute top-0 right-0 w-48 h-48 sm:w-80 sm:h-80 border-r border-t border-white/[0.04] rounded-tr-[100px] corner-pulse" />

				<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
					<div className="grid grid-cols-12 gap-6">
						<div className="col-span-12 lg:col-span-8">
							<div className="flex items-center gap-3 mb-6">
								<span className="h-px w-8 bg-flag/40" />
								<span className="label-caps text-flag tracking-[0.18em]">
									RECRUTAMENTO · CANDIDATURA ESPONTÂNEA
								</span>
							</div>

							<h1 className="font-display font-black uppercase leading-[0.82] tracking-tight text-[clamp(3.5rem,10vw,8rem)] text-white">
								Faça <span className="text-flag">parte</span>
							</h1>

							<p className="mt-6 text-lg sm:text-xl leading-relaxed text-white/70 max-w-2xl">
								Junte-se à equipa que move pessoas e negócios em
								Angola e no mundo. Estamos à procura de talento
								comprometido com a excelência, a pontualidade e
								o orgulho de servir.
							</p>

							<div className="mt-8 flex flex-wrap gap-4">
								<a
									href="#candidatura"
									className="inline-flex items-center gap-2 px-6 py-3 bg-flag hover:bg-flag-dark text-white font-display text-base font-bold uppercase tracking-wider transition-colors rounded-sm"
								>
									Candidatar-se
								</a>
								<a
									href="mailto:carreiras@olatours.co.ao"
									className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 hover:border-flag/60 text-white/80 hover:text-flag font-display text-base font-bold uppercase tracking-wider transition-colors rounded-sm"
								>
									carreiras@olatours.co.ao
								</a>
							</div>
						</div>

						<div className="col-span-12 lg:col-span-4 flex flex-col justify-end items-start sm:items-end pt-8 lg:pt-0">
							<div className="relative">
								<div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-flag/40" />
								<div className="border-l-2 border-flag pl-5">
									<p className="text-white/50 label-caps mb-2">
										VALORES
									</p>
									<div className="flex flex-wrap gap-2">
										{[
											'CRESCIMENTO',
											'IMPACTO',
											'ESTABILIDADE',
											'CULTURA',
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

			<section className="relative bg-white py-20 sm:py-28 overflow-hidden">
				<div className="mx-auto max-w-[1200px] px-5 sm:px-8">
					<div className="grid grid-cols-12 gap-6 mb-14 sm:mb-20">
						<div className="col-span-12 lg:col-span-6">
							<span className="accent-bar-flag block mb-4" />
							<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
								Porquê a{' '}
								<span className="text-flag">Ola Tours</span>?
							</h2>
						</div>
						<div className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-end">
							<p className="text-ink-mute text-sm sm:text-base leading-relaxed">
								Não procuramos apenas colaboradores — procuramos
								pessoas que queiram crescer connosco e fazer
								parte de uma história que está só a começar.
							</p>
						</div>
					</div>

					<motion.div
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: '-100px' }}
						variants={container}
						className="grid grid-cols-12 gap-5 sm:gap-6"
					>
						{values.map((v) => {
							const accent = accentMap[v.accent];
							return (
								<motion.article
									key={v.n}
									variants={item}
									className="col-span-12 sm:col-span-6 lg:col-span-3 group"
								>
									<div className="relative bg-white border border-gray-border rounded-b-lg overflow-hidden transition-all duration-500 card-elevated h-full">
										<div
											className="h-1.5 w-full"
											style={{ background: accent.css }}
										/>

										<div className="p-6 sm:p-8">
											<div className="flex items-center justify-between mb-4">
												<span
													className="label-caps"
													style={{
														color: accent.css,
													}}
												>
													{v.n}
												</span>
												<span
													className="h-2 w-2 rounded-full"
													style={{
														background: accent.css,
													}}
												/>
											</div>

											<h3 className="font-display text-2xl sm:text-3xl font-black uppercase leading-tight tracking-tight text-ink">
												{v.title}
											</h3>

											<div className="rule my-4" />

											<p className="text-ink-soft leading-relaxed text-sm sm:text-base">
												{v.body}
											</p>
										</div>
									</div>
								</motion.article>
							);
						})}
					</motion.div>
				</div>
			</section>

			<section className="relative bg-gray-light py-20 sm:py-28 overflow-hidden">
				<div className="pointer-events-none absolute inset-0 opacity-[0.02]">
					<div className="corporate-grid h-full w-full" />
				</div>

				<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
					<div className="grid grid-cols-12 gap-6 mb-14 sm:mb-20">
						<div className="col-span-12 lg:col-span-6">
							<span className="accent-bar-flag block mb-4" />
							<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
								Áreas onde{' '}
								<span className="text-flag">recrutamos</span>.
							</h2>
						</div>
						<div className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-end">
							<p className="text-ink-mute text-sm sm:text-base leading-relaxed">
								Não encontrou a sua área? Candidate-se na mesma
								— estamos sempre abertos a talento excepcional.
							</p>
						</div>
					</div>

					<motion.div
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: '-80px' }}
						variants={container}
						className="flex flex-wrap gap-3 sm:gap-4"
					>
						{areas.map((area) => (
							<motion.div key={area} variants={item}>
								<span className="inline-block px-5 py-3 border border-gray-border bg-white rounded-sm font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-ink hover:border-flag/40 hover:text-flag transition-colors cursor-default">
									{area}
								</span>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			<section
				id="candidatura"
				className="relative bg-white py-20 sm:py-28 overflow-hidden"
			>
				<div className="mx-auto max-w-[1200px] px-5 sm:px-8">
					<motion.div
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: '-80px' }}
						variants={item}
						className="bg-white border border-gray-border rounded-b-lg overflow-hidden card-elevated max-w-3xl mx-auto"
					>
						<div className="h-1.5 w-full bg-flag" />

						<div className="p-6 sm:p-8 lg:p-10">
							<p className="label-caps text-ink-mute mb-1">
								CANDIDATURA ESPONTÂNEA
							</p>
							<p className="font-display text-2xl sm:text-3xl font-black text-ink leading-tight mb-6">
								Envie-nos a sua{' '}
								<span className="text-flag">candidatura</span>
							</p>

							{submitted ? (
								<div className="text-center py-12">
									<div className="w-14 h-14 rounded-full bg-flag/10 flex items-center justify-center mx-auto mb-5">
										<svg
											viewBox="0 0 24 24"
											fill="none"
											className="h-7 w-7 text-flag"
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
										Candidatura enviada
									</p>
									<p className="text-ink-mute mt-2 max-w-sm mx-auto">
										Recebemos a sua candidatura. Entraremos
										em contacto caso o seu perfil se
										enquadre nas nossas necessidades.
									</p>
									<p className="text-ink-mute text-sm mt-6">
										Para anexar o CV, envie para{' '}
										<a
											href="mailto:carreiras@olatours.co.ao"
											className="text-flag hover:text-flag-dark underline underline-offset-2 transition-colors"
										>
											carreiras@olatours.co.ao
										</a>
									</p>
								</div>
							) : (
								<form
									action="mailto:carreiras@olatours.co.ao"
									method="POST"
									encType="text/plain"
									onSubmit={handleSubmit}
									className="space-y-5"
								>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
										<div>
											<label
												htmlFor={`${formId}-name`}
												className="label-caps text-ink-mute block mb-1.5"
											>
												Nome *
											</label>
											<input
												id={`${formId}-name`}
												name="nome"
												type="text"
												required
												className="w-full px-4 py-3 border border-gray-border rounded-sm bg-white text-ink placeholder:text-ink-mute/50 focus:outline-none focus:border-flag focus:ring-1 focus:ring-flag/30 transition-all"
												placeholder="O seu nome completo"
											/>
										</div>
										<div>
											<label
												htmlFor={`${formId}-email`}
												className="label-caps text-ink-mute block mb-1.5"
											>
												Email *
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
												placeholder="+244 900 000 000"
											/>
										</div>
										<div>
											<label
												htmlFor={`${formId}-area`}
												className="label-caps text-ink-mute block mb-1.5"
											>
												Área de Interesse *
											</label>
											<select
												id={`${formId}-area`}
												name="area"
												required
												defaultValue=""
												className="w-full px-4 py-3 border border-gray-border rounded-sm bg-white text-ink focus:outline-none focus:border-flag focus:ring-1 focus:ring-flag/30 transition-all"
											>
												<option value="" disabled>
													Seleccionar
												</option>
												{areas.map((a) => (
													<option key={a}>{a}</option>
												))}
											</select>
										</div>
									</div>

									<div>
										<label
											htmlFor={`${formId}-linkedin`}
											className="label-caps text-ink-mute block mb-1.5"
										>
											LinkedIn / Portfólio
										</label>
										<input
											id={`${formId}-linkedin`}
											name="linkedin"
											type="url"
											className="w-full px-4 py-3 border border-gray-border rounded-sm bg-white text-ink placeholder:text-ink-mute/50 focus:outline-none focus:border-flag focus:ring-1 focus:ring-flag/30 transition-all"
											placeholder="https://linkedin.com/in/seu-perfil"
										/>
									</div>

									<div>
										<label
											htmlFor={`${formId}-message`}
											className="label-caps text-ink-mute block mb-1.5"
										>
											Mensagem *
										</label>
										<textarea
											id={`${formId}-message`}
											name="mensagem"
											rows={4}
											required
											className="w-full px-4 py-3 border border-gray-border rounded-sm bg-white text-ink placeholder:text-ink-mute/50 focus:outline-none focus:border-flag focus:ring-1 focus:ring-flag/30 transition-all resize-none"
											placeholder="Conte-nos um pouco sobre si, a sua experiência e por que gostaria de fazer parte da Ola Tours."
										/>
									</div>

									<div>
										<p className="label-caps text-ink-mute block mb-1.5">
											Curriculum Vitae
										</p>
										<div
											onClick={() =>
												fileRef.current?.click()
											}
											onKeyDown={(e) => {
												if (
													e.key === 'Enter' ||
													e.key === ' '
												) {
													fileRef.current?.click();
												}
											}}
											role="button"
											tabIndex={0}
											className="w-full px-4 py-6 border-2 border-dashed border-gray-border rounded-sm bg-gray-light/30 hover:bg-gray-light hover:border-flag/40 focus:border-flag transition-all cursor-pointer text-center group"
										>
											<svg
												viewBox="0 0 24 24"
												fill="none"
												className="h-6 w-6 mx-auto mb-2 text-ink-mute group-hover:text-flag transition-colors"
												aria-hidden="true"
											>
												<path
													d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
													stroke="currentColor"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
											{fileName ? (
												<p className="font-display text-base font-bold text-flag">
													{fileName}
												</p>
											) : (
												<>
													<p className="font-display text-base font-bold text-ink-mute group-hover:text-ink transition-colors">
														Clique para seleccionar
														o CV
													</p>
													<p className="text-xs text-ink-mute/70 mt-1">
														PDF, DOC ou DOCX (máx.
														5MB)
													</p>
												</>
											)}
										</div>
										<input
											ref={fileRef}
											type="file"
											accept=".pdf,.doc,.docx"
											onChange={handleFileChange}
											className="hidden"
										/>
										<p className="text-xs text-ink-mute/70 mt-2">
											O ficheiro será enviado
											separadamente para o nosso email de
											RH.
										</p>
									</div>

									<Button
										as="button"
										variant="flag"
										size="lg"
										className="w-full sm:w-auto"
									>
										Enviar candidatura
									</Button>
								</form>
							)}

							{!submitted && (
								<div className="mt-8 pt-6 border-t border-gray-border">
									<p className="label-caps text-ink-mute mb-2">
										Prefere enviar por email?
									</p>
									<a
										href="mailto:carreiras@olatours.co.ao?subject=Candidatura%20Espont%C3%A2nea%20-%20Ola%20Tours"
										className="inline-flex items-center gap-2 text-flag hover:text-flag-dark font-display text-lg font-bold transition-colors"
									>
										<svg
											viewBox="0 0 16 16"
											fill="none"
											className="h-4 w-4 shrink-0"
											aria-hidden="true"
										>
											<path
												d="M2 4l6 4 6-4M2 4v8a1 1 0 001 1h10a1 1 0 001-1V4M2 4l6 4 6-4"
												stroke="currentColor"
												strokeWidth="1.5"
											/>
										</svg>
										carreiras@olatours.co.ao
									</a>
									<p className="text-xs text-ink-mute/70 mt-1">
										Inclua o seu CV em anexo e responderemos
										em até 5 dias úteis.
									</p>
								</div>
							)}
						</div>
					</motion.div>
				</div>
			</section>
		</>
	);
}
