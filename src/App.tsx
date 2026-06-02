import { Logo } from './components/Logo';
import { Marquee } from './components/Marquee';
import { DossierHeader } from './components/DossierHeader';
import { Cover } from './components/Cover';
import { Agenda } from './components/Agenda';
import { WhyUs } from './components/WhyUs';
import { Services } from './components/Services';
import { Products } from './components/Products';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import './App.css';

function App() {
	return (
		<div className="min-h-screen bg-paper text-ink overflow-x-hidden">
			<DossierHeader />
			<main>
				<Cover />
				<Agenda />
				<WhyUs />
				<Marquee
					items={[
						'BORDERS',
						'BUSINESS',
						'BESPOKE',
						'DISCRETION',
						'EXCELLENCE',
						'PUNCTUALITY',
					]}
					tone="ink"
					separator="✦"
					className="border-y-2 border-ink bg-paper"
				/>
				<Services />
				<Products />
				<Testimonials />
				<Contact />
			</main>
			<Footer />
		</div>
	);
}

export default App;

function Footer() {
	return (
		<footer className="bg-ink text-paper-card border-t-2 border-paper">
			<div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-12 sm:py-16">
				<div className="grid grid-cols-12 gap-y-10 gap-x-6">
					<div className="col-span-12 lg:col-span-5">
						<Logo size="md" className="brightness-0 invert" />
						<p className="mt-5 max-w-sm font-serif text-base sm:text-lg leading-relaxed text-paper/70 italic">
							Ola Tours — vamos explorar. Operadora angolana de
							viagens corporativas, mobilidade executiva e
							facilitação de negócios.
						</p>
						<div className="mt-6 flex flex-col gap-1 mono-caps text-paper/55">
							<span>EST. 2014 · LUANDA · ANGOLA</span>
							<span>NIF / ALV. TURISMO Nº 0089 / 2023</span>
						</div>
					</div>

					<FooterCol
						className="col-span-6 sm:col-span-3 lg:col-span-2"
						title="Serviços"
						items={[
							'Negócios',
							'Investimento',
							'Transporte & Frota',
						]}
					/>
					<FooterCol
						className="col-span-6 sm:col-span-3 lg:col-span-2"
						title="Produtos"
						items={['Mobilidade', 'Missões', 'Eventos']}
					/>
					<FooterCol
						className="col-span-12 sm:col-span-6 lg:col-span-3"
						title="Contacto"
						items={[
							'info@olatours.co.ao',
							'+244 940 818 664',
							'www.olatours.co.ao',
							'Luanda · Angola',
						]}
						mono
					/>
				</div>

				<div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-paper/15 pt-6">
					<p className="mono-caps text-paper/45">
						© 2026 Ola Tours · Todos os direitos reservados
					</p>
					<p className="mono-caps text-paper/45">
						DOSSIER Nº 01 / 26 · PT-AO
					</p>
				</div>
			</div>
		</footer>
	);
}

function FooterCol({
	title,
	items,
	className = '',
	mono = false,
}: {
	title: string;
	items: string[];
	className?: string;
	mono?: boolean;
}) {
	return (
		<div className={className}>
			<p className="mono-caps text-paper/50 mb-4">{title}</p>
			<ul className="space-y-2.5">
				{items.map((i) => (
					<li
						key={i}
						className={[
							mono
								? 'font-mono text-sm text-paper/80'
								: 'text-paper/85',
							'hover:text-terracotta transition-colors',
						].join(' ')}
					>
						<a href="#contacto">{i}</a>
					</li>
				))}
			</ul>
		</div>
	);
}
