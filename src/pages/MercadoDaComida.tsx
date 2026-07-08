import { type FormEvent, useState, useId } from 'react';
import { motion } from 'motion/react';
import { motion as m, stagger } from '../styles/tokens';
import { Button } from '../components/Button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const pickupPoints = [
	'Mutamba',
	'Gamek',
	'Zango',
	'Via Expresso / Kilamba',
	'Benfica',
	'4 de Fevereiro',
	'Futungo',
] as const;

const weekDays = ['Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'] as const;

const terms = [
	'A inscrição só é válida após confirmação do pagamento.',
	'O cartão de transporte é pessoal e intransmissível.',
	'Os horários de recolha serão comunicados após a inscrição.',
	'Em caso de desistência, consulte a política de reembolso da OlaTours.',
	'O passageiro deve apresentar-se no ponto de recolha com 15 minutos de antecedência.',
] as const;

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

export function MercadoDaComida() {
	useDocumentTitle('Mercado da Comida');

	const [submitted, setSubmitted] = useState(false);
	const [sending, setSending] = useState(false);
	const [acceptedTerms, setAcceptedTerms] = useState(false);
	const formId = useId();

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		setSending(true);
		try {
			await new Promise((r) => setTimeout(r, 1200));
			setSubmitted(true);
		} catch {
			alert('Erro ao enviar inscrição. Tente novamente.');
		} finally {
			setSending(false);
		}
	}

	return (
		<>
			{/* ===== HERO ===== */}
			<section className="relative min-h-dvh flex items-center pt-16 sm:pt-20 pb-12 sm:pb-16 overflow-hidden bg-gradient-to-br from-navy via-navy-dark to-ink">
				<div
					className="pointer-events-none absolute inset-0 opacity-[0.07] bg-contain bg-center bg-no-repeat"
					style={{
						backgroundImage:
							"url('/mercadodacomida/Autocarro.png')",
					}}
				/>
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-navy-dark/30" />
				<div className="pointer-events-none absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 border-r border-t border-flag/10 rounded-tr-[120px] corner-pulse" />
				<div className="pointer-events-none absolute bottom-0 left-0 w-48 h-48 border-l border-b border-flag/10 rounded-bl-[80px]" />

				<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 w-full">
					<div className="grid grid-cols-12 gap-6 items-center">
						<div className="col-span-12 lg:col-span-7">
							<div className="mb-6">
								<span className="label-caps text-flag tracking-[0.18em]">
									TRANSPORTE
								</span>
							</div>

							<h1 className="font-display font-black uppercase leading-[0.82] tracking-tight text-[clamp(3rem,9vw,7rem)] text-white">
								Mercado da{' '}
								<span className="text-flag">Comida</span>
							</h1>

							<p className="mt-6 text-lg sm:text-xl leading-relaxed text-white/70 max-w-2xl">
								A OlaTours disponibiliza um serviço de
								transporte dedicado para os visitantes do evento
								Mercado da Comida. Preencha o formulário abaixo
								para garantir o seu cartão de transporte.
							</p>

							<div className="mt-8 flex flex-wrap gap-3">
								{[
									'IDA E VOLTA',
									'3.500 KZ',
									'QUINTA–DOMINGO',
								].map((tag) => (
									<span
										key={tag}
										className="label-caps px-3 py-1.5 border border-white/15 text-white/70 rounded-sm hover:border-flag/60 hover:text-flag transition-colors"
									>
										{tag}
									</span>
								))}
							</div>
						</div>

						<div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end pt-8 lg:pt-0">
							<img
								src="/mercadodacomida/logo.png"
								alt="OlaTours"
								className="w-full max-w-sm h-auto object-contain opacity-90"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* ===== INFO ===== */}
			<section className="relative bg-cream-50 py-20 sm:py-28 overflow-hidden">
				<div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.02] select-none">
					<div className="absolute top-[20%] left-[5%] w-32 h-32 rotate-45 rounded-2xl border-2 border-flag" />
					<div className="absolute bottom-[15%] right-[8%] w-24 h-24 rotate-45 rounded-xl border-2 border-sky" />
				</div>

				<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
					<motion.div
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: '-80px' }}
						variants={container}
						className="grid grid-cols-12 gap-6 mb-14 sm:mb-20"
					>
						<div className="col-span-12 lg:col-span-6">
							<motion.div variants={item}>
								<span className="accent-bar-flag block mb-4" />
								<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2rem,5vw,4rem)]">
									Informações do{' '}
									<span className="text-flag">serviço</span>.
								</h2>
							</motion.div>
						</div>
						<div className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-end">
							<motion.p
								variants={item}
								className="text-ink-mute text-sm sm:text-base leading-relaxed"
							>
								Transporte confortável e seguro para o evento
								mais saboroso de Luanda.
							</motion.p>
						</div>
					</motion.div>

					<motion.div
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: '-80px' }}
						variants={container}
						className="grid grid-cols-12 gap-5 sm:gap-6"
					>
						{[
							{
								label: 'Valor do cartão',
								value: '3.500 Kz',
								hint: 'ida e volta, por pessoa',
								icon: (
									<svg
										viewBox="0 0 24 24"
										fill="none"
										className="h-6 w-6"
										aria-hidden="true"
									>
										<path
											d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"
											fill="currentColor"
										/>
									</svg>
								),
							},
							{
								label: 'Funcionamento',
								value: 'Quinta–Domingo',
								hint: 'durante o evento',
								icon: (
									<svg
										viewBox="0 0 24 24"
										fill="none"
										className="h-6 w-6"
										aria-hidden="true"
									>
										<path
											d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"
											fill="currentColor"
										/>
									</svg>
								),
							},
							{
								label: 'Validade',
								value: 'Exclusivo evento',
								hint: 'válido nos dias do Mercado da Comida',
								icon: (
									<svg
										viewBox="0 0 24 24"
										fill="none"
										className="h-6 w-6"
										aria-hidden="true"
									>
										<path
											d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"
											fill="currentColor"
										/>
									</svg>
								),
							},
							{
								label: 'Pagamento',
								value: 'Multicaixa / Numerário',
								hint: 'transferência bancária ou no acto do levantamento',
								icon: (
									<svg
										viewBox="0 0 24 24"
										fill="none"
										className="h-6 w-6"
										aria-hidden="true"
									>
										<path
											d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"
											fill="currentColor"
										/>
									</svg>
								),
							},
						].map((info) => (
							<motion.div
								key={info.label}
								variants={item}
								className="col-span-6 sm:col-span-3"
							>
								<div className="relative bg-white border border-gray-border/60 rounded-lg p-5 sm:p-6 h-full card-elevated group">
									<div className="text-flag mb-3 group-hover:scale-110 transition-transform duration-500">
										{info.icon}
									</div>
									<p className="label-caps text-ink-mute mb-1.5">
										{info.label}
									</p>
									<p className="font-display text-lg sm:text-xl font-black text-ink leading-tight">
										{info.value}
									</p>
									<p className="mt-1.5 text-xs text-ink-mute leading-relaxed">
										{info.hint}
									</p>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* ===== FORM SECTION ===== */}
			<section className="relative bg-white py-20 sm:py-28 overflow-hidden">
				<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
					<motion.div
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: '-80px' }}
						variants={container}
						className="grid grid-cols-12 gap-6 mb-14 sm:mb-20"
					>
						<div className="col-span-12 lg:col-span-6">
							<motion.div variants={item}>
								<span className="accent-bar-flag block mb-4" />
								<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2rem,5vw,4rem)]">
									Formulário de{' '}
									<span className="text-flag">inscrição</span>
									.
								</h2>
							</motion.div>
						</div>
						<div className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-end">
							<motion.p
								variants={item}
								className="text-ink-mute text-sm sm:text-base leading-relaxed"
							>
								Garanta o seu lugar. Preencha todos os campos
								para emissão do cartão de transporte.
							</motion.p>
						</div>
					</motion.div>

					{submitted ? (
						<motion.div
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: m.duration.slow,
								ease: m.ease.out,
							}}
							className="max-w-2xl mx-auto text-center py-16 sm:py-24"
						>
							<div className="w-16 h-16 rounded-full bg-flag/10 flex items-center justify-center mx-auto mb-6">
								<svg
									viewBox="0 0 24 24"
									fill="none"
									className="h-8 w-8 text-flag"
									aria-hidden="true"
								>
									<path
										d="M5 13l4 4L19 7"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
							<h3 className="font-display text-3xl sm:text-4xl font-black text-ink uppercase leading-tight">
								Inscrição recebida
							</h3>
							<p className="mt-4 text-lg text-ink-mute max-w-md mx-auto leading-relaxed">
								Receberá a confirmação e os horários de recolha
								após validação do pagamento. Obrigado por
								escolher a OlaTours.
							</p>
						</motion.div>
					) : (
						<motion.form
							initial="hidden"
							whileInView="show"
							viewport={{ once: true, margin: '-80px' }}
							variants={container}
							onSubmit={handleSubmit}
							className="max-w-3xl mx-auto"
						>
							{/* PICKUP POINTS */}
							<motion.fieldset
								variants={item}
								className="border border-gray-border/60 rounded-lg p-6 sm:p-8 mb-6"
							>
								<legend className="font-display text-xl sm:text-2xl font-black text-flag uppercase leading-tight px-2">
									Ponto de Recolha
								</legend>
								<p className="label-caps text-ink-mute mb-5 mt-2">
									Assinale o ponto de recolha e regresso
									pretendido:
								</p>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
									{pickupPoints.map((point) => (
										<label
											key={point}
											className="flex items-center gap-3 px-4 py-3 border border-gray-border/60 rounded-sm cursor-pointer hover:border-flag/40 hover:bg-flag/[0.02] transition-all group"
										>
											<input
												type="radio"
												name="ponto_recolha"
												value={point}
												required
												className="appearance-none w-4 h-4 border-2 border-gray-border rounded-full checked:border-flag checked:bg-flag checked:shadow-[inset_0_0_0_2px_white] transition-all shrink-0 mt-0.5"
											/>
											<span className="text-sm sm:text-base text-ink font-medium group-hover:text-flag transition-colors">
												{point}
											</span>
										</label>
									))}
								</div>
							</motion.fieldset>

							{/* DAYS */}
							<motion.fieldset
								variants={item}
								className="border border-gray-border/60 rounded-lg p-6 sm:p-8 mb-6"
							>
								<legend className="font-display text-xl sm:text-2xl font-black text-flag uppercase leading-tight px-2">
									Dia(s) Pretendido(s)
								</legend>
								<p className="label-caps text-ink-mute mb-5 mt-2">
									Assinale o(s) dia(s) em que pretende
									utilizar o transporte:
								</p>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
									{weekDays.map((day) => (
										<label
											key={day}
											className="flex items-center gap-3 px-4 py-3 border border-gray-border/60 rounded-sm cursor-pointer hover:border-flag/40 hover:bg-flag/[0.02] transition-all group"
										>
											<input
												type="checkbox"
												name="dias"
												value={day}
												className="appearance-none w-4 h-4 border-2 border-gray-border rounded-sm checked:border-flag checked:bg-flag shrink-0 mt-0.5 transition-all"
											/>
											<span className="text-sm sm:text-base text-ink font-medium group-hover:text-flag transition-colors">
												{day}
											</span>
										</label>
									))}
								</div>
							</motion.fieldset>

							{/* PERSONAL DATA */}
							<motion.fieldset
								variants={item}
								className="border border-gray-border/60 rounded-lg p-6 sm:p-8 mb-6"
							>
								<legend className="font-display text-xl sm:text-2xl font-black text-flag uppercase leading-tight px-2">
									Dados do Inscrito
								</legend>

								<div className="mt-6 space-y-5">
									<div>
										<label
											htmlFor={`${formId}-nome`}
											className="label-caps text-ink-mute block mb-1.5"
										>
											Nome completo
										</label>
										<input
											id={`${formId}-nome`}
											name="nome_completo"
											type="text"
											required
											className="w-full px-4 py-3 border border-gray-border rounded-sm bg-white text-ink placeholder:text-ink-mute/50 focus:outline-none focus:border-flag focus:ring-1 focus:ring-flag/30 transition-all"
											placeholder="O seu nome completo"
										/>
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
										<div>
											<label
												htmlFor={`${formId}-bi`}
												className="label-caps text-ink-mute block mb-1.5"
											>
												Nº do Bilhete de Identidade
											</label>
											<input
												id={`${formId}-bi`}
												name="bi"
												type="text"
												required
												className="w-full px-4 py-3 border border-gray-border rounded-sm bg-white text-ink placeholder:text-ink-mute/50 focus:outline-none focus:border-flag focus:ring-1 focus:ring-flag/30 transition-all"
												placeholder="000000000 LA000"
											/>
										</div>
										<div>
											<label
												htmlFor={`${formId}-nascimento`}
												className="label-caps text-ink-mute block mb-1.5"
											>
												Data de nascimento
											</label>
											<input
												id={`${formId}-nascimento`}
												name="data_nascimento"
												type="date"
												required
												className="w-full px-4 py-3 border border-gray-border rounded-sm bg-white text-ink focus:outline-none focus:border-flag focus:ring-1 focus:ring-flag/30 transition-all"
											/>
										</div>
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
										<div>
											<label
												htmlFor={`${formId}-telefone`}
												className="label-caps text-ink-mute block mb-1.5"
											>
												Nº de telefone / WhatsApp
											</label>
											<input
												id={`${formId}-telefone`}
												name="telefone"
												type="tel"
												required
												className="w-full px-4 py-3 border border-gray-border rounded-sm bg-white text-ink placeholder:text-ink-mute/50 focus:outline-none focus:border-flag focus:ring-1 focus:ring-flag/30 transition-all"
												placeholder="+244 900 000 000"
											/>
										</div>
										<div>
											<label
												htmlFor={`${formId}-email`}
												className="label-caps text-ink-mute block mb-1.5"
											>
												E-mail
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
												htmlFor={`${formId}-municipio`}
												className="label-caps text-ink-mute block mb-1.5"
											>
												Município de residência
											</label>
											<input
												id={`${formId}-municipio`}
												name="municipio"
												type="text"
												required
												className="w-full px-4 py-3 border border-gray-border rounded-sm bg-white text-ink placeholder:text-ink-mute/50 focus:outline-none focus:border-flag focus:ring-1 focus:ring-flag/30 transition-all"
												placeholder="Ex: Luanda"
											/>
										</div>
										<div>
											<label
												htmlFor={`${formId}-emergencia`}
												className="label-caps text-ink-mute block mb-1.5"
											>
												Contacto de emergência
											</label>
											<input
												id={`${formId}-emergencia`}
												name="contacto_emergencia"
												type="tel"
												required
												className="w-full px-4 py-3 border border-gray-border rounded-sm bg-white text-ink placeholder:text-ink-mute/50 focus:outline-none focus:border-flag focus:ring-1 focus:ring-flag/30 transition-all"
												placeholder="+244 900 000 000"
											/>
										</div>
									</div>
								</div>
							</motion.fieldset>

							{/* OBSERVATIONS */}
							<motion.div
								variants={item}
								className="border border-gray-border/60 rounded-lg p-6 sm:p-8 mb-6"
							>
								<p className="font-display text-xl sm:text-2xl font-black text-flag uppercase leading-tight mb-5">
									Observações
								</p>
								<textarea
									id={`${formId}-observacoes`}
									name="observacoes"
									rows={4}
									className="w-full px-4 py-3 border border-gray-border rounded-sm bg-white text-ink placeholder:text-ink-mute/50 focus:outline-none focus:border-flag focus:ring-1 focus:ring-flag/30 transition-all resize-none"
									placeholder="Alguma informação adicional que queira partilhar..."
								/>
							</motion.div>

							{/* TERMS */}
							<motion.fieldset
								variants={item}
								className="border border-gray-border/60 rounded-lg p-6 sm:p-8 mb-6"
							>
								<legend className="font-display text-xl sm:text-2xl font-black text-flag uppercase leading-tight px-2">
									Termos e Condições
								</legend>

								<div className="mt-6 space-y-3">
									{terms.map((term, i) => (
										<div
											key={i}
											className="flex items-start gap-3"
										>
											<span className="w-5 h-5 rounded-full bg-flag/10 text-flag flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
												{i + 1}
											</span>
											<p className="text-sm sm:text-base text-ink-soft leading-relaxed">
												{term}
											</p>
										</div>
									))}
								</div>

								<label className="flex items-start gap-3 mt-6 pt-6 border-t border-gray-border/60 cursor-pointer group">
									<input
										type="checkbox"
										required
										checked={acceptedTerms}
										onChange={(e) =>
											setAcceptedTerms(e.target.checked)
										}
										className="appearance-none w-5 h-5 border-2 border-gray-border rounded-sm checked:border-flag checked:bg-flag shrink-0 mt-0.5 transition-all"
									/>
									<span className="text-sm sm:text-base text-ink font-medium group-hover:text-flag transition-colors leading-relaxed">
										Declaro que li e aceito os termos e
										condições acima descritos.
									</span>
								</label>
							</motion.fieldset>

							{/* SUBMIT */}
							<motion.div
								variants={item}
								className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
							>
								<Button
									as="button"
									variant="flag"
									size="lg"
									disabled={sending || !acceptedTerms}
									className="w-full sm:w-auto"
									type="submit"
								>
									{sending
										? 'A enviar...'
										: 'Garantir cartão de transporte'}
								</Button>
								<p className="text-xs text-ink-mute leading-relaxed">
									Os seus dados estão seguros e serão
									utilizados apenas para este serviço.
								</p>
							</motion.div>
						</motion.form>
					)}
				</div>
			</section>

			{/* ===== CONTACT ===== */}
			<section className="relative bg-navy py-16 sm:py-20 overflow-hidden grain">
				<div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

				<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
					<motion.div
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: '-80px' }}
						variants={container}
						className="grid grid-cols-12 gap-6 items-center"
					>
						<motion.div
							variants={item}
							className="col-span-12 lg:col-span-8"
						>
							<span className="label-caps text-flag tracking-[0.18em]">
								CONTACTOS PARA INSCRIÇÃO
							</span>
							<h3 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2rem,4vw,3.5rem)] text-white mt-3">
								Tem dúvidas?{' '}
								<span className="text-flag">Fale connosco</span>
								.
							</h3>
						</motion.div>

						<motion.div
							variants={item}
							className="col-span-12 lg:col-span-4 flex flex-col gap-3"
						>
							<a
								href="tel:+244940818664"
								className="flex items-center gap-3 px-5 py-4 border border-white/10 rounded-sm hover:border-flag/50 hover:bg-white/[0.03] transition-all group"
							>
								<svg
									viewBox="0 0 24 24"
									fill="none"
									className="h-5 w-5 text-flag shrink-0"
									aria-hidden="true"
								>
									<path
										d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
										fill="currentColor"
									/>
								</svg>
								<div>
									<p className="label-caps text-white/40 text-[10px]">
										TELEFONE
									</p>
									<p className="font-display text-base sm:text-lg font-black text-white group-hover:text-flag transition-colors">
										+244 940 818 664
									</p>
								</div>
							</a>

							<a
								href="mailto:info@olatours.co.ao"
								className="flex items-center gap-3 px-5 py-4 border border-white/10 rounded-sm hover:border-flag/50 hover:bg-white/[0.03] transition-all group"
							>
								<svg
									viewBox="0 0 24 24"
									fill="none"
									className="h-5 w-5 text-flag shrink-0"
									aria-hidden="true"
								>
									<path
										d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
										fill="currentColor"
									/>
								</svg>
								<div>
									<p className="label-caps text-white/40 text-[10px]">
										EMAIL
									</p>
									<p className="font-display text-base sm:text-lg font-black text-white group-hover:text-flag transition-colors">
										info@olatours.co.ao
									</p>
								</div>
							</a>
						</motion.div>
					</motion.div>
				</div>
			</section>
		</>
	);
}
