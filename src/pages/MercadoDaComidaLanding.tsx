import { type FormEvent, useId, useState } from 'react';
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
	'O passageiro deve apresentar-se no ponto de recolha com 15 minutos de antecedência.',
] as const;

const benefits = [
	'Transporte dedicado para o Mercado da Comida',
	'Reserva simples com pagamento por transferência',
	'Pontos de recolha em zonas estratégicas de Luanda',
	'Confirmação rápida para garantir o seu lugar',
] as const;

const container = {
	hidden: {},
	show: { transition: { staggerChildren: stagger.wide } },
};

const item = {
	hidden: { opacity: 0, y: 28 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: m.duration.slow, ease: m.ease.out },
	},
};

export function MercadoDaComidaLanding() {
	useDocumentTitle('Mercado da Comida');

	const [submitted, setSubmitted] = useState(false);
	const [sending, setSending] = useState(false);
	const [acceptedTerms, setAcceptedTerms] = useState(false);
	const [receiptFile, setReceiptFile] = useState<File | null>(null);
	const [selectedDays, setSelectedDays] = useState<string[]>([]);
	const formId = useId();

	const totalValue = selectedDays.length * 3000;

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const data = new FormData(form);
		setSending(true);
		try {
			const res = await fetch('/api/mercado-da-comida', {
				method: 'POST',
				body: data,
			});
			const json = await res.json();
			if (!json.success) throw new Error(json.message);
			setSubmitted(true);
		} catch (err) {
			alert(
				err instanceof Error
					? err.message
					: 'Erro ao enviar inscrição. Tente novamente.',
			);
		} finally {
			setSending(false);
		}
	}

	return (
		<div>
			<div className="min-h-dvh bg-[#f5c300] text-[#4a2611] overflow-hidden">
				<section className="relative isolate overflow-hidden">
					<div className="relative mx-auto flex h-dvh max-w-[1280px] flex-col items-center justify-center px-5 pb-10 pt-5 sm:px-8 sm:pb-12 sm:pt-8">
						<motion.div
							initial="hidden"
							animate="show"
							variants={container}
							className="flex flex-col items-center text-center"
						>
							<motion.div variants={item}>
								<div className="flex items-center justify-center gap-3">
									<span className="rounded-full border border-[#4a2611]/20 bg-[#fff0a8] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4a2611]">
										11ª edição
									</span>
									<span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a4a22]">
										Local: Praia da Nicha, Benfica
									</span>
								</div>

								<div className="mt-4">
									<p className="font-display text-[clamp(4rem,13vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.04em] text-[#4a2611]">
										Mercado da{' '}
										<span className="text-[#d04a21]">
											Comida
										</span>
									</p>
									<p className="mx-auto mt-2 max-w-2xl text-[1.05rem] leading-relaxed text-[#5d3014] sm:text-[1.15rem]">
										A OlaTours disponibiliza transporte
										dedicado para os visitantes do evento.
										Garanta o seu cartão e viaje com
										conforto, segurança e um serviço
										preparado para a experiência do Mercado
										da Comida.
									</p>
								</div>
							</motion.div>

							<motion.div variants={item}>
								<div className="relative mx-auto flex w-full max-w-[960px] flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-center">
									<img
										src="/mercadodacomida/Autocarro.png"
										alt="Autocarro OlaTours"
										className="w-full max-w-[600px] drop-shadow-[0_28px_40px_rgba(74,38,17,0.22)]"
									/>
									<img
										src="/mercadodacomida/logo.png"
										alt="OlaTours"
										className="h-36 w-auto object-contain lg:h-48"
									/>
								</div>
							</motion.div>
						</motion.div>
					</div>
				</section>
			</div>
			<div className="bg-transparent pb-16 sm:pb-20">
				<div className="mx-auto max-w-[80vw] -mt-32 rounded-[32px] border border-[#4a2611]/10 bg-[#fff1ad] px-6 pb-16 shadow-[0_32px_80px_-32px_rgba(0,0,0,0.32)] sm:px-10 sm:pb-20">
					<motion.div
						id="detalhes"
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: '-80px' }}
						variants={container}
						className="pt-10 sm:pt-14"
					>
						<div className="grid gap-4 lg:grid-cols-4">
							{benefits.map((benefit, index) => (
								<motion.div
									key={benefit}
									variants={item}
									className="rounded-[24px] border border-[#4a2611]/15 bg-[rgba(255,248,209,0.85)] px-5 py-5 shadow-[0_14px_30px_-24px_rgba(74,38,17,0.42)] backdrop-blur-sm"
								>
									<p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a4a22]">
										0{index + 1}
									</p>
									<p className="mt-2 text-base font-medium leading-relaxed text-[#4a2611]">
										{benefit}
									</p>
								</motion.div>
							))}
						</div>
					</motion.div>

					<div id="inscricao" className="relative mt-14">
						<div className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
							<div className="mx-auto max-w-3xl">
								<p className="font-display text-[clamp(2.2rem,5vw,4.6rem)] font-black uppercase leading-[0.88] tracking-[-0.04em] text-[#4a2611]">
									Formulário de inscrição.
								</p>
								<p className="mt-4 text-base leading-relaxed text-[#5d3014] sm:text-lg">
									Preencha os dados e efectue o pagamento por
									transferência bancária para garantir o seu
									cartão de transporte. Anexe o comprovativo
									em PDF.
								</p>

								<div className="mt-10">
									{submitted ? (
										<motion.div
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{
												duration: m.duration.slow,
												ease: m.ease.out,
											}}
											className="flex min-h-[320px] flex-col justify-center rounded-[32px] border border-[#4a2611]/15 bg-white/70 p-8 shadow-[0_22px_50px_-30px_rgba(74,38,17,0.42)] backdrop-blur-sm"
										>
											<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#b5482a]/10 text-[#b5482a]">
												<svg
													viewBox="0 0 24 24"
													fill="none"
													className="h-8 w-8"
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
											<h2 className="mt-6 font-display text-4xl font-black uppercase leading-tight text-[#4a2611] sm:text-5xl">
												Inscrição recebida.
											</h2>
											<p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[#5d3014] sm:text-lg">
												Receberá a confirmação e os
												horários de recolha após
												validação do pagamento. Obrigado
												por escolher a OlaTours.
											</p>
										</motion.div>
									) : (
										<motion.form
											initial="hidden"
											whileInView="show"
											viewport={{
												once: true,
												margin: '-80px',
											}}
											variants={container}
											onSubmit={handleSubmit}
											className="rounded-[32px] border border-[#4a2611]/15 bg-white/70 p-5 shadow-[0_22px_50px_-30px_rgba(74,38,17,0.42)] backdrop-blur-sm sm:p-8"
										>
											<motion.fieldset
												variants={item}
												className="space-y-4"
											>
												<legend className="font-display text-2xl font-black uppercase leading-tight text-[#4a2611]">
													Ponto de recolha
												</legend>
												<div className="grid gap-3 sm:grid-cols-2">
													{pickupPoints.map(
														(point) => (
															<label
																key={point}
																className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#4a2611]/12 bg-white/80 px-4 py-3 transition-colors hover:border-[#b5482a]/40 hover:bg-[#fff8d8]"
															>
																<input
																	type="radio"
																	name="ponto_recolha"
																	value={
																		point
																	}
																	required
																	className="h-4 w-4 shrink-0 appearance-none rounded-full border-2 border-[#a68a5e] checked:border-[#b5482a] checked:bg-[#b5482a] checked:shadow-[inset_0_0_0_2px_white]"
																/>
																<span className="text-sm font-medium text-[#4a2611]">
																	{point}
																</span>
															</label>
														),
													)}
												</div>
											</motion.fieldset>

											<motion.fieldset
												variants={item}
												className="mt-7 space-y-4"
											>
												<legend className="font-display text-2xl font-black uppercase leading-tight text-[#4a2611]">
													Dia(s) pretendido(s)
												</legend>
												<div className="grid gap-3 sm:grid-cols-2">
													{weekDays.map((day) => (
														<label
															key={day}
															className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#4a2611]/12 bg-white/80 px-4 py-3 transition-colors hover:border-[#b5482a]/40 hover:bg-[#fff8d8]"
														>
															<input
																type="checkbox"
																name="dias"
																value={day}
																checked={selectedDays.includes(
																	day,
																)}
																onChange={(
																	e,
																) => {
																	if (
																		e.target
																			.checked
																	) {
																		setSelectedDays(
																			(
																				prev,
																			) => [
																				...prev,
																				day,
																			],
																		);
																	} else {
																		setSelectedDays(
																			(
																				prev,
																			) =>
																				prev.filter(
																					(
																						currentDay,
																					) =>
																						currentDay !==
																						day,
																				),
																		);
																	}
																}}
																className="h-4 w-4 shrink-0 appearance-none rounded-sm border-2 border-[#a68a5e] checked:border-[#b5482a] checked:bg-[#b5482a]"
															/>
															<span className="text-sm font-medium text-[#4a2611]">
																{day}
															</span>
														</label>
													))}
												</div>
												{selectedDays.length > 0 && (
													<p className="text-right font-display text-lg font-black uppercase tracking-tight text-[#b5482a]">
														Total:{' '}
														{totalValue.toLocaleString(
															'pt-PT',
														)}{' '}
														Kz
													</p>
												)}
											</motion.fieldset>

											<motion.fieldset
												variants={item}
												className="mt-7 space-y-4"
											>
												<legend className="font-display text-2xl font-black uppercase leading-tight text-[#4a2611]">
													Dados do inscrito
												</legend>
												<div className="grid gap-5">
													<div className="grid gap-5 sm:grid-cols-2">
														<label className="grid gap-1.5">
															<span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7b4a26]">
																Nome completo
															</span>
															<input
																id={`${formId}-nome`}
																name="nome_completo"
																type="text"
																required
																placeholder="O seu nome completo"
																className="w-full rounded-2xl border border-[#4a2611]/12 bg-white px-4 py-3 text-[#4a2611] outline-none transition focus:border-[#b5482a] focus:ring-2 focus:ring-[#b5482a]/20"
															/>
														</label>
														<label className="grid gap-1.5">
															<span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7b4a26]">
																Nº do Bilhete de
																Identidade
															</span>
															<input
																id={`${formId}-bi`}
																name="bi"
																type="text"
																required
																placeholder="000000000 LA000"
																className="w-full rounded-2xl border border-[#4a2611]/12 bg-white px-4 py-3 text-[#4a2611] outline-none transition focus:border-[#b5482a] focus:ring-2 focus:ring-[#b5482a]/20"
															/>
														</label>
													</div>
													<div className="grid gap-5 sm:grid-cols-2">
														<label className="grid gap-1.5">
															<span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7b4a26]">
																Telefone /
																WhatsApp
															</span>
															<input
																id={`${formId}-telefone`}
																name="telefone"
																type="tel"
																required
																placeholder="+244 900 000 000"
																className="w-full rounded-2xl border border-[#4a2611]/12 bg-white px-4 py-3 text-[#4a2611] outline-none transition focus:border-[#b5482a] focus:ring-2 focus:ring-[#b5482a]/20"
															/>
														</label>
														<label className="grid gap-1.5">
															<span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7b4a26]">
																Contacto de
																emergência
															</span>
															<input
																id={`${formId}-emergencia`}
																name="contacto_emergencia"
																type="tel"
																required
																placeholder="+244 900 000 000"
																className="w-full rounded-2xl border border-[#4a2611]/12 bg-white px-4 py-3 text-[#4a2611] outline-none transition focus:border-[#b5482a] focus:ring-2 focus:ring-[#b5482a]/20"
															/>
														</label>
													</div>
												</div>
											</motion.fieldset>

											<motion.div
												variants={item}
												className="mt-7 grid gap-5"
											>
												<div className="rounded-[28px] border border-[#4a2611]/12 bg-white/80 p-5">
													<p className="font-display text-2xl font-black uppercase leading-tight text-[#4a2611]">
														Observações
													</p>
													<textarea
														id={`${formId}-observacoes`}
														name="observacoes"
														rows={4}
														placeholder="Alguma informação adicional que queira partilhar..."
														className="mt-4 w-full rounded-2xl border border-[#4a2611]/12 bg-white px-4 py-3 text-[#4a2611] outline-none transition focus:border-[#b5482a] focus:ring-2 focus:ring-[#b5482a]/20"
													/>
												</div>

												<div className="rounded-[28px] border border-[#4a2611]/12 bg-white/80 p-5">
													<p className="font-display text-2xl font-black uppercase leading-tight text-[#4a2611]">
														Dados para transferência
													</p>
													{selectedDays.length >
														0 && (
														<p className="mt-3 font-display text-lg font-black uppercase tracking-tight text-[#b5482a]">
															Total a pagar:{' '}
															{totalValue.toLocaleString(
																'pt-PT',
															)}{' '}
															Kz
														</p>
													)}
													<div className="mt-4 rounded-[24px] border border-[#4a2611]/12 bg-[#fff8d8] p-4">
														<p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7b4a26]">
															Beneficiário
														</p>
														<p className="mt-1 text-sm font-semibold text-[#4a2611]">
															OLA TOURS PREST
															SERVICO COMER GERAL
															LDA
														</p>
														<p className="mt-3 text-sm text-[#5d3014]">
															Conta:{' '}
															<span className="font-mono font-semibold text-[#4a2611]">
																&nbsp;171 456
																002 100 01
															</span>
														</p>
														<p className="text-sm text-[#5d3014]">
															IBAN:{' '}
															<span className="font-mono font-semibold text-[#4a2611]">
																&nbsp;AO06.0040.0000.7145.6002.1018.9
															</span>
														</p>
													</div>
													<label className="mt-4 flex cursor-pointer items-center gap-3 rounded-2xl border border-[#4a2611]/12 bg-white px-4 py-3 transition-colors hover:border-[#b5482a]/40 hover:bg-[#fffef0]">
														<input
															type="file"
															name="comprovativo"
															accept=".pdf"
															required
															onChange={(e) =>
																setReceiptFile(
																	e.target
																		.files?.[0] ??
																		null,
																)
															}
															className="hidden"
														/>
														<span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#b5482a]/10 text-[#b5482a]">
															<svg
																viewBox="0 0 24 24"
																fill="none"
																className="h-5 w-5"
																aria-hidden="true"
															>
																<path
																	d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM6 20V4h7v5h5v11H6z"
																	fill="currentColor"
																/>
															</svg>
														</span>
														<span className="text-sm font-medium text-[#4a2611]">
															{receiptFile
																? receiptFile.name
																: 'Selecionar comprovativo (PDF)'}
														</span>
													</label>
													<p className="mt-2 text-xs leading-relaxed text-[#7b4a26]">
														Apenas PDF, máximo 5 MB.
													</p>
												</div>

												<div className="rounded-[28px] border border-[#4a2611]/12 bg-white/80 p-5">
													<p className="font-display text-2xl font-black uppercase leading-tight text-[#4a2611]">
														Termos e condições
													</p>
													<div className="mt-4 space-y-3">
														{terms.map(
															(term, index) => (
																<div
																	key={term}
																	className="flex items-start gap-3 rounded-2xl border border-[#4a2611]/10 bg-[#fffaf0] px-4 py-3"
																>
																	<span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#b5482a]/10 text-[10px] font-bold text-[#b5482a]">
																		{index +
																			1}
																	</span>
																	<p className="text-sm leading-relaxed text-[#5d3014]">
																		{term}
																	</p>
																</div>
															),
														)}
													</div>
													<label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-[#4a2611]/12 bg-white px-4 py-3 transition-colors hover:border-[#b5482a]/40 hover:bg-[#fff8d8]">
														<input
															type="checkbox"
															required
															checked={
																acceptedTerms
															}
															onChange={(e) =>
																setAcceptedTerms(
																	e.target
																		.checked,
																)
															}
															className="mt-0.5 h-5 w-5 shrink-0 appearance-none rounded-sm border-2 border-[#a68a5e] checked:border-[#b5482a] checked:bg-[#b5482a]"
														/>
														<span className="text-sm leading-relaxed text-[#4a2611]">
															Declaro que li e
															aceito os termos e
															condições acima
															descritos.
														</span>
													</label>
												</div>

												<div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
													<Button
														as="button"
														variant="flag"
														size="lg"
														disabled={
															sending ||
															!acceptedTerms
														}
														className="w-full sm:w-auto"
														type="submit"
													>
														{sending
															? 'A enviar...'
															: 'Garantir cartão de transporte'}
													</Button>
													<p className="max-w-sm text-xs leading-relaxed text-[#7b4a26]">
														Os seus dados serão
														utilizados apenas para o
														processamento desta
														inscrição.
													</p>
												</div>
											</motion.div>
										</motion.form>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
