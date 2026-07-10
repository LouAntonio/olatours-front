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
	const [numPessoas, setNumPessoas] = useState('1');
	const [outroNumero, setOutroNumero] = useState(2);
	const [acompanhantes, setAcompanhantes] = useState<string[]>([]);
	const [temMenores, setTemMenores] = useState('nao');
	const [idadesMenores, setIdadesMenores] = useState<number[]>([]);
	const formId = useId();

	const totalPessoas =
		numPessoas === 'outro' ? outroNumero : Number(numPessoas);
	const totalValue = selectedDays.length * 3000 * totalPessoas;

	function handleNumPessoasChange(value: string) {
		setNumPessoas(value);
		const total = value === 'outro' ? outroNumero : Number(value);
		const needed = Math.max(0, total - 1);
		setAcompanhantes((prev) => {
			if (prev.length === needed) return prev;
			if (prev.length < needed)
				return [...prev, ...Array(needed - prev.length).fill('')];
			return prev.slice(0, needed);
		});
	}

	function handleOutroNumeroChange(value: number) {
		const clamped = Math.max(2, value);
		setOutroNumero(clamped);
		const needed = clamped - 1;
		setAcompanhantes((prev) => {
			if (prev.length === needed) return prev;
			if (prev.length < needed)
				return [...prev, ...Array(needed - prev.length).fill('')];
			return prev.slice(0, needed);
		});
	}

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const data = new FormData(form);
		const total = totalPessoas;
		data.set('num_pessoas', String(total));
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
			<div className="min-h-dvh bg-[#f5c300] text-[#4a2611]">
				<section className="relative isolate">
					<div className="relative mx-auto flex min-h-dvh max-w-[1280px] flex-col items-center justify-center px-5 pb-10 pt-5 sm:px-8 sm:pb-12 sm:pt-8">
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
								<div className="relative mx-auto flex w-full max-w-[960px] flex-col items-center md:gap-6 lg:flex-row lg:items-center lg:justify-center">
									<img
										src="/mercadodacomida/Autocarro.png"
										alt="Autocarro OlaTours"
										className="w-full max-w-[600px] drop-shadow-[0_28px_40px_rgba(74,38,17,0.22)]"
									/>
									<img
										src="/mercadodacomida/logo.png"
										alt="OlaTours"
										className="h-50 w-auto object-contain sm:h-65 lg:h-75"
									/>
								</div>
							</motion.div>
						</motion.div>
					</div>
				</section>
			</div>
			<div className="bg-transparent pb-16 sm:pb-20">
				<div className="mx-auto max-w-[92vw] -mt-20 rounded-[32px] border border-[#4a2611]/10 bg-[#fff1ad] px-4 pb-16 shadow-[0_32px_80px_-32px_rgba(0,0,0,0.32)] sm:max-w-[80vw] sm:-mt-32 sm:px-6 sm:pb-20 lg:px-10">
					<motion.div
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: '-80px' }}
						variants={container}
						className="pt-10 sm:pt-14"
					>
						<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
							{[
								{
									label: 'Valor do cartão',
									highlight: '3.000 Kz',
									text: ' — por pessoa, por dia',
									accent: '#b5482a',
									icon: (
										<svg
											viewBox="0 0 24 24"
											fill="none"
											aria-hidden="true"
											className="h-6 w-6"
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
									highlight: 'Quinta–Domingo',
									text: ', durante o evento',
									accent: '#d04a21',
									icon: (
										<svg
											viewBox="0 0 24 24"
											fill="none"
											aria-hidden="true"
											className="h-6 w-6"
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
									highlight: 'Exclusivo evento',
									text: ', válido nos dias do Mercado da Comida',
									accent: '#8a4a22',
									icon: (
										<svg
											viewBox="0 0 24 24"
											fill="none"
											aria-hidden="true"
											className="h-6 w-6"
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
									highlight: 'Transferência',
									text: ' — apenas transferência bancária',
									accent: '#a68a5e',
									icon: (
										<svg
											viewBox="0 0 24 24"
											fill="none"
											aria-hidden="true"
											className="h-6 w-6"
										>
											<path
												d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"
												fill="currentColor"
											/>
										</svg>
									),
								},
							].map((card) => (
								<motion.div
									key={card.label}
									variants={item}
									className="group relative overflow-hidden rounded-b-[24px] rounded-t-none border border-t-0 border-[#4a2611]/12 bg-white/80 shadow-[0_14px_30px_-24px_rgba(74,38,17,0.42)] backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(74,38,17,0.5)] cursor-pointer"
								>
									<div
										className="h-1.5 w-full transition-all group-hover:h-2"
										style={{ backgroundColor: card.accent }}
									/>
									<div className="p-5 sm:p-6">
										<div className="mb-4 flex items-center justify-between">
											<span
												className="flex h-9 w-9 items-center justify-center rounded-xl"
												style={{
													color: card.accent,
													backgroundColor: `${card.accent}12`,
												}}
											>
												{card.icon}
											</span>
										</div>
										<h3 className="font-display text-xl font-black uppercase leading-tight tracking-[-0.02em] text-[#4a2611]">
											{card.label}
										</h3>
										<p className="mt-2 text-sm leading-relaxed text-[#5d3014]">
											<strong
												className="font-semibold"
												style={{ color: card.accent }}
											>
												{card.highlight}
											</strong>
											{card.text}
										</p>
									</div>
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
											className="rounded-[32px] border border-[#4a2611]/15 bg-white/70 p-4 shadow-[0_22px_50px_-30px_rgba(74,38,17,0.42)] backdrop-blur-sm sm:p-5 lg:p-8"
										>
											<motion.fieldset
												variants={item}
												className="space-y-4"
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

											<motion.fieldset
												variants={item}
												className="mt-7 space-y-4"
											>
												<legend className="font-display text-2xl font-black uppercase leading-tight text-[#4a2611]">
													Quantas pessoas vão aderir?
												</legend>
												<div className="grid gap-3 sm:grid-cols-2">
													{['1', '2', '3', '4'].map(
														(n) => (
															<label
																key={n}
																className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#4a2611]/12 bg-white/80 px-4 py-3 transition-colors hover:border-[#b5482a]/40 hover:bg-[#fff8d8]"
															>
																<input
																	type="radio"
																	name="num_pessoas"
																	value={n}
																	checked={
																		numPessoas ===
																		n
																	}
																	onChange={() =>
																		handleNumPessoasChange(
																			n,
																		)
																	}
																	className="h-4 w-4 shrink-0 appearance-none rounded-full border-2 border-[#a68a5e] checked:border-[#b5482a] checked:bg-[#b5482a] checked:shadow-[inset_0_0_0_2px_white]"
																/>
																<span className="text-sm font-medium text-[#4a2611]">
																	{n === '1'
																		? 'Uma'
																		: n ===
																			  '2'
																			? 'Duas'
																			: n ===
																				  '3'
																				? 'Três'
																				: 'Quatro'}
																</span>
															</label>
														),
													)}
													<label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#4a2611]/12 bg-white/80 px-4 py-3 transition-colors hover:border-[#b5482a]/40 hover:bg-[#fff8d8]">
														<input
															type="radio"
															name="num_pessoas"
															value="outro"
															checked={
																numPessoas ===
																'outro'
															}
															onChange={() =>
																handleNumPessoasChange(
																	'outro',
																)
															}
															className="h-4 w-4 shrink-0 appearance-none rounded-full border-2 border-[#a68a5e] checked:border-[#b5482a] checked:bg-[#b5482a] checked:shadow-[inset_0_0_0_2px_white]"
														/>
														<span className="text-sm font-medium text-[#4a2611]">
															Outro
														</span>
													</label>
												</div>
												{numPessoas === 'outro' && (
													<label className="grid gap-1.5">
														<span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7b4a26]">
															Quantas pessoas?
														</span>
														<input
															type="number"
															min={2}
															value={outroNumero}
															onChange={(e) =>
																handleOutroNumeroChange(
																	Number(
																		e.target
																			.value,
																	),
																)
															}
															className="w-full rounded-2xl border border-[#4a2611]/12 bg-white px-4 py-3 text-[#4a2611] outline-none transition focus:border-[#b5482a] focus:ring-2 focus:ring-[#b5482a]/20"
														/>
													</label>
												)}
											</motion.fieldset>

											{totalPessoas > 1 && (
												<motion.fieldset
													initial={{
														opacity: 0,
														y: 20,
													}}
													animate={{
														opacity: 1,
														y: 0,
													}}
													transition={{
														duration:
															m.duration.slow,
														ease: m.ease.out,
													}}
													className="mt-7 space-y-4"
												>
													<legend className="font-display text-2xl font-black uppercase leading-tight text-[#4a2611]">
														Acompanhantes
													</legend>
													<p className="text-sm leading-relaxed text-[#5d3014]">
														Nome completo das
														pessoas que o(a) vão
														acompanhar?
													</p>
													<div className="grid gap-4">
														{Array.from(
															{
																length: Math.max(
																	0,
																	totalPessoas -
																		1,
																),
															},
															(_, i) => (
																<label
																	key={i}
																	className="grid gap-1.5"
																>
																	<span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7b4a26]">
																		{i + 1}ª
																		pessoa
																	</span>
																	<input
																		type="text"
																		name="acompanhantes"
																		required
																		value={
																			acompanhantes[
																				i
																			] ||
																			''
																		}
																		onChange={(
																			e,
																		) => {
																			const novo =
																				[
																					...acompanhantes,
																				];
																			novo[
																				i
																			] =
																				e.target.value;
																			setAcompanhantes(
																				novo,
																			);
																		}}
																		placeholder="Nome completo"
																		className="w-full rounded-2xl border border-[#4a2611]/12 bg-white px-4 py-3 text-[#4a2611] outline-none transition focus:border-[#b5482a] focus:ring-2 focus:ring-[#b5482a]/20"
																	/>
																</label>
															),
														)}
													</div>
												</motion.fieldset>
											)}

											{totalPessoas > 1 && (
												<motion.fieldset
													initial={{
														opacity: 0,
														y: 20,
													}}
													animate={{
														opacity: 1,
														y: 0,
													}}
													transition={{
														duration:
															m.duration.slow,
														ease: m.ease.out,
													}}
													className="mt-7 space-y-4"
												>
													<legend className="font-display text-2xl font-black uppercase leading-tight text-[#4a2611]">
														Menores de idade
													</legend>
													<p className="text-sm leading-relaxed text-[#5d3014]">
														Será acompanhado por
														menores de idade?
													</p>
													<div className="grid gap-3 sm:grid-cols-2">
														<label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#4a2611]/12 bg-white/80 px-4 py-3 transition-colors hover:border-[#b5482a]/40 hover:bg-[#fff8d8]">
															<input
																type="radio"
																name="tem_menores"
																value="sim"
																checked={
																	temMenores ===
																	'sim'
																}
																onChange={() =>
																	setTemMenores(
																		'sim',
																	)
																}
																className="h-4 w-4 shrink-0 appearance-none rounded-full border-2 border-[#a68a5e] checked:border-[#b5482a] checked:bg-[#b5482a] checked:shadow-[inset_0_0_0_2px_white]"
															/>
															<span className="text-sm font-medium text-[#4a2611]">
																Sim
															</span>
														</label>
														<label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#4a2611]/12 bg-white/80 px-4 py-3 transition-colors hover:border-[#b5482a]/40 hover:bg-[#fff8d8]">
															<input
																type="radio"
																name="tem_menores"
																value="nao"
																checked={
																	temMenores ===
																	'nao'
																}
																onChange={() => {
																	setTemMenores(
																		'nao',
																	);
																	setIdadesMenores(
																		[],
																	);
																}}
																className="h-4 w-4 shrink-0 appearance-none rounded-full border-2 border-[#a68a5e] checked:border-[#b5482a] checked:bg-[#b5482a] checked:shadow-[inset_0_0_0_2px_white]"
															/>
															<span className="text-sm font-medium text-[#4a2611]">
																Não
															</span>
														</label>
													</div>
													{temMenores === 'sim' && (
														<div className="space-y-4">
															<p className="text-sm font-medium text-[#4a2611]">
																Informe a idade
																dos menores de
																idade que irão
																acompanha-lo(a)
															</p>
															{idadesMenores.map(
																(idade, i) => (
																	<div
																		key={i}
																		className="flex items-center gap-3"
																	>
																		<label className="grid flex-1 gap-1.5">
																			<span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7b4a26]">
																				{i +
																					1}

																				º
																				menor
																				—
																				idade
																			</span>
																			<input
																				type="number"
																				name="idades_menores"
																				required
																				min={
																					0
																				}
																				max={
																					17
																				}
																				value={
																					idade ||
																					''
																				}
																				onChange={(
																					e,
																				) => {
																					const novo =
																						[
																							...idadesMenores,
																						];
																					novo[
																						i
																					] =
																						Number(
																							e
																								.target
																								.value,
																						);
																					setIdadesMenores(
																						novo,
																					);
																				}}
																				placeholder="Idade"
																				className="w-full rounded-2xl border border-[#4a2611]/12 bg-white px-4 py-3 text-[#4a2611] outline-none transition focus:border-[#b5482a] focus:ring-2 focus:ring-[#b5482a]/20"
																			/>
																		</label>
																		{idadesMenores.length >
																			1 && (
																			<button
																				type="button"
																				onClick={() => {
																					const novo =
																						idadesMenores.filter(
																							(
																								_,
																								j,
																							) =>
																								j !==
																								i,
																						);
																					setIdadesMenores(
																						novo,
																					);
																				}}
																				className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 transition hover:bg-red-200"
																			>
																				<svg
																					viewBox="0 0 24 24"
																					fill="none"
																					className="h-5 w-5"
																					aria-hidden="true"
																				>
																					<path
																						d="M18 6L6 18M6 6l12 12"
																						stroke="currentColor"
																						strokeWidth="2.5"
																						strokeLinecap="round"
																					/>
																				</svg>
																			</button>
																		)}
																	</div>
																),
															)}
															{idadesMenores.length <
																totalPessoas -
																	1 && (
																<button
																	type="button"
																	onClick={() =>
																		setIdadesMenores(
																			[
																				...idadesMenores,
																				0,
																			],
																		)
																	}
																	className="inline-flex items-center gap-2 rounded-2xl border border-[#4a2611]/12 bg-white/80 px-4 py-2 text-sm font-medium text-[#4a2611] transition-colors hover:border-[#b5482a]/40 hover:bg-[#fff8d8]"
																>
																	+ Adicionar
																	menor
																</button>
															)}
														</div>
													)}
												</motion.fieldset>
											)}

											<motion.fieldset
												variants={item}
												className="mt-7 space-y-4"
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
													<p className="text-left font-display text-lg font-black uppercase tracking-tight text-[#b5482a] sm:text-right">
														Total:{' '}
														{totalValue.toLocaleString(
															'pt-PT',
														)}{' '}
														Kz{' '}
														<span className="text-sm font-normal lowercase">
															(3.000 Kz ×{' '}
															{
																selectedDays.length
															}{' '}
															{selectedDays.length ===
															1
																? 'dia'
																: 'dias'}{' '}
															× {totalPessoas}{' '}
															{totalPessoas === 1
																? 'pessoa'
																: 'pessoas'}
															)
														</span>
													</p>
												)}
											</motion.fieldset>

											<motion.div
												variants={item}
												className="mt-7 grid gap-5"
											>
												<div className="overflow-hidden rounded-[28px] border border-[#4a2611]/12 bg-white/80 p-4 sm:p-5">
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

												<div className="overflow-hidden rounded-[28px] border border-[#4a2611]/12 bg-white/80 p-4 sm:p-5">
													<p className="font-display text-2xl font-black uppercase leading-tight text-[#4a2611]">
														Dados para transferência
													</p>
													{selectedDays.length >
														0 && (
														<p className="mt-3 text-left font-display text-lg font-black uppercase tracking-tight text-[#b5482a] sm:text-right">
															Total a pagar:{' '}
															{totalValue.toLocaleString(
																'pt-PT',
															)}{' '}
															Kz{' '}
															<span className="text-sm font-normal lowercase">
																(3.000 Kz ×{' '}
																{
																	selectedDays.length
																}{' '}
																{selectedDays.length ===
																1
																	? 'dia'
																	: 'dias'}{' '}
																× {totalPessoas}{' '}
																{totalPessoas ===
																1
																	? 'pessoa'
																	: 'pessoas'}
																)
															</span>
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
														<p className="text-sm text-[#5d3014]">
															IBAN:{' '}
															<span className="font-mono font-semibold break-all text-[#4a2611]">
																&nbsp;AO06.0040.0000.7145.6002.1018.9
															</span>
														</p>
													</div>
													<label className="mt-4 flex min-w-0 cursor-pointer items-center gap-3 rounded-2xl border border-[#4a2611]/12 bg-white px-4 py-3 transition-colors hover:border-[#b5482a]/40 hover:bg-[#fffef0]">
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
														<span className="truncate max-w-[180px] text-sm font-medium text-[#4a2611] sm:max-w-[300px]">
															{receiptFile
																? receiptFile.name
																: 'Selecionar comprovativo (PDF)'}
														</span>
													</label>
													<p className="mt-2 text-xs leading-relaxed text-[#7b4a26]">
														Apenas PDF, máximo 5 MB.
													</p>
												</div>

												<div className="overflow-hidden rounded-[28px] border border-[#4a2611]/12 bg-white/80 p-4 sm:p-5">
													<p className="font-display text-2xl font-black uppercase leading-tight text-[#4a2611]">
														Termos e condições
													</p>
													<div className="mt-4 space-y-3">
														{terms.map(
															(term, index) => (
																<div
																	key={term}
																	className="flex min-w-0 items-start gap-3 rounded-2xl border border-[#4a2611]/10 bg-[#fffaf0] px-4 py-3"
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
													<label className="mt-5 flex min-w-0 cursor-pointer items-start gap-3 rounded-2xl border border-[#4a2611]/12 bg-white px-4 py-3 transition-colors hover:border-[#b5482a]/40 hover:bg-[#fff8d8]">
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
