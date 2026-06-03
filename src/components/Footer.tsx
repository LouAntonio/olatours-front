import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

const navItems = [
	{ path: '/sobre', label: 'Sobre' },
	{ path: '/agenda', label: 'Agenda' },
	{ path: '/servicos', label: 'Serviços' },
	{ path: '/produtos', label: 'Produtos' },
	{ path: '/contacto', label: 'Contacto' },
];

export function Footer() {
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
						title="Navegação"
					>
						{navItems.map((item) => (
							<li key={item.path}>
								<Link
									to={item.path}
									className="text-white/80 hover:text-flag transition-colors"
								>
									{item.label}
								</Link>
							</li>
						))}
					</FooterCol>

					<FooterCol
						className="col-span-12 sm:col-span-6 lg:col-span-3"
						title="Contacto"
					>
						<li>
							<a
								href="mailto:info@olatours.co.ao"
								className="text-white/80 hover:text-flag transition-colors"
							>
								info@olatours.co.ao
							</a>
						</li>
						<li>
							<a
								href="tel:+244940818664"
								className="text-white/80 hover:text-flag transition-colors"
							>
								+244 940 818 664
							</a>
						</li>
						<li>
							<span className="text-white/70 text-sm leading-relaxed block">
								Travessa Neves F.B.P.F Machado 19
								<br />
								Bairro Ingombotas, Luanda
							</span>
						</li>
					</FooterCol>

					<FooterCol
						className="col-span-6 sm:col-span-3 lg:col-span-2"
						title="Redes"
					>
						<li>
							<a
								href="https://instagram.com/olatoursao"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white/80 hover:text-flag transition-colors"
							>
								IG: @olatoursao
							</a>
						</li>
						<li>
							<a
								href="https://tiktok.com/@kelvinsjohn"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white/80 hover:text-flag transition-colors"
							>
								TikTok: @kelvinsjohn
							</a>
						</li>
					</FooterCol>
				</div>

				<div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/15 pt-6">
					<p className="label-caps text-white/45">
						© 2026 Ola Tours · Todos os direitos reservados
					</p>
					<p className="label-caps text-white/45">
						Desenvolvido por{' '}
						<a
							href="https://mediaguideagency.vercel.app"
							target="_blank"
							rel="noopener noreferrer"
							className="text-flag hover:text-flag/80 transition-colors underline underline-offset-2"
						>
							Media Guide Agency
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
}

function FooterCol({
	title,
	children,
	className = '',
}: {
	title: string;
	children: ReactNode;
	className?: string;
}) {
	return (
		<div className={className}>
			<p className="label-caps text-white/50 mb-4">{title}</p>
			<ul className="space-y-2.5">{children}</ul>
		</div>
	);
}
