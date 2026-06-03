import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { motion as m, stagger } from '../styles/tokens';

const events = [
	{
		date: 'JUL · 2024',
		title: 'Visita Presidencial',
		subtitle: 'Recepção de Sua Excelência Samia Suluhu Hassan',
		description:
			'Presidente da República da Tanzânia. Recepção oficial, logística completa e acompanhamento durante toda a estadia em Luanda.',
		country: 'TZA',
		type: 'Visita Oficial',
	},
	{
		date: 'OUT · 2024',
		title: 'Missão Banco Mundial',
		subtitle: 'Recepção de Ndiamé Diop',
		description:
			'Vice-presidente regional do Banco Mundial para África Oriental e Austral. Facilitação de reuniões institucionais e logística executiva.',
		country: 'WBG',
		type: 'Missão Institucional',
	},
	{
		date: 'MAI · 2025',
		title: 'Cimeira de Investimento',
		subtitle: 'Facilitação de negócios e investimento estrangeiro',
		description:
			'Encontro com potenciais investidores e decisores institucionais. Abertura de portas governamentais e visitas a Zonas Económicas Especiais.',
		country: 'ANG',
		type: 'Investimento',
	},
];

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

export function Agenda() {
	useDocumentTitle('Agenda');

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
								Agenda de{' '}
								<span className="text-flag">Eventos</span>
							</h1>
							<p className="mt-6 text-lg sm:text-xl leading-relaxed text-white/70 max-w-2xl">
								A Ola Tours já recebeu Chefes de Estado, altos
								representantes de instituições financeiras
								internacionais e delegações empresariais.
								Conheça os eventos que marcaram a nossa agenda.
							</p>
						</div>
						<div className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col justify-end">
							<div className="border-l-2 border-flag pl-5">
								<p className="text-white/50 label-caps">
									EVENTOS · 2024–2025
								</p>
								<p className="font-display text-3xl sm:text-4xl font-black text-white leading-tight mt-1">
									Alto{' '}
									<span className="text-flag">perfil</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="relative bg-gray-light py-20 sm:py-28 overflow-hidden">
				<div className="mx-auto max-w-[1400px] px-5 sm:px-8">
					<motion.div
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: '-100px' }}
						variants={container}
						className="relative"
					>
						{events.map((event, i) => (
							<motion.div
								key={i}
								variants={item}
								className="relative pb-12 sm:pb-16 last:pb-0"
							>
								<div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
									<div className="sm:w-44 shrink-0 pt-1">
										<span className="label-caps text-flag font-bold block">
											{event.date}
										</span>
									</div>
									<div className="flex-1 bg-white border border-gray-border rounded-lg overflow-hidden hover:shadow-card-hover transition-shadow">
										<div className="bg-navy px-6 sm:px-8 py-3 flex items-center justify-between gap-2">
											<div className="flex items-center gap-3 label-caps text-white">
												<span className="h-1.5 w-1.5 rounded-full bg-flag pulse-dot" />
												<span>
													{event.type} ·{' '}
													{event.country}
												</span>
											</div>
										</div>
										<div className="p-6 sm:p-8">
											<h3 className="font-display text-2xl sm:text-3xl font-black uppercase leading-tight tracking-tight text-ink">
												{event.title}
											</h3>
											<p className="mt-2 text-ink-soft text-lg">
												{event.subtitle}
											</p>
											<p className="mt-3 text-ink-mute leading-relaxed">
												{event.description}
											</p>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			<section className="relative bg-white py-20 sm:py-28">
				<div className="mx-auto max-w-[1400px] px-5 sm:px-8 text-center">
					<span className="accent-bar-flag block mx-auto mb-4" />
					<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
						O próximo evento{' '}
						<span className="text-flag">pode ser o seu</span>.
					</h2>
					<p className="mt-6 text-xl sm:text-2xl leading-relaxed text-ink-soft max-w-2xl mx-auto">
						Conte-nos a sua visão. Organizamos a logística, o
						protocolo e a recepção — para que a sua delegação só
						precise de aparecer.
					</p>
					<div className="mt-10">
						<Button
							as="a"
							href="/contacto"
							variant="flag"
							size="lg"
						>
							Solicitar evento
						</Button>
					</div>
				</div>
			</section>
		</>
	);
}
