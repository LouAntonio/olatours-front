import { Logo } from './components/Logo';
import { Marquee } from './components/Marquee';
import { SiteHeader } from './components/SiteHeader';
import { Cover } from './components/Cover';
import { WhyUs } from './components/WhyUs';
import { Services } from './components/Services';
import { Products } from './components/Products';
import { Testimonials } from './components/Testimonials';
import './App.css';

function App() {
	return (
		<div className="min-h-screen bg-white text-ink overflow-x-hidden">
			<SiteHeader />
			<main>
				<Cover />
				<WhyUs />
				<Marquee
					items={[
						'ANGOLA',
						'ÁFRICA',
						'NEGÓCIOS',
						'EXECUTIVO',
						'EXCELLENCE',
						'PONTUALIDADE',
						'PRIVACIDADE',
					]}
					tone="sky"
					separator="✦"
				/>
				<Services />
				<Products />
				<Testimonials />
			</main>
			<Footer />
		</div>
	);
}

export default App;

function Footer() {
	return (
		<footer className="bg-navy text-white border-t border-white/10">
			<div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-12 sm:py-16">
				<div className="grid grid-cols-12 gap-y-10 gap-x-6">
					<div className="col-span-12 lg:col-span-5">
						<Logo size="md" className="brightness-0 invert" />
						<p className="mt-5 max-w-sm text-base sm:text-lg leading-relaxed text-white/70">
							Ola Tours — vamos explorar. Operadora angolana de
							viagens corporativas, mobilidade executiva e
							facilitação de negócios.
						</p>
						<div className="mt-6 flex flex-col gap-1 label-caps text-white/50">
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
					/>
				</div>

				<div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/15 pt-6">
					<p className="label-caps text-white/45">
						© 2026 Ola Tours · Todos os direitos reservados
					</p>
					<p className="label-caps text-white/45">
						OLA TOURS CORPORATIVO · LUANDA · MMXXVI
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
}: {
	title: string;
	items: string[];
	className?: string;
}) {
	return (
		<div className={className}>
			<p className="label-caps text-white/50 mb-4">{title}</p>
			<ul className="space-y-2.5">
				{items.map((i) => (
					<li
						key={i}
						className="text-white/80 hover:text-flag transition-colors"
					>
						<span>{i}</span>
					</li>
				))}
			</ul>
		</div>
	);
}
