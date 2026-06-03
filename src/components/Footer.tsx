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
			<div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-12 sm:py-16">
				<div className="grid grid-cols-12 gap-y-10 gap-x-6">
					<div className="col-span-12 lg:col-span-5">
						<Logo size="md" className="brightness-0 invert" />
						<p className="mt-5 max-w-sm text-base sm:text-lg leading-relaxed text-white/70">
							Ola Tours - vamos explorar. Operadora angolana de
							viagens corporativas, mobilidade executiva e
							facilitação de negócios.
						</p>
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
							<div className="flex items-center gap-3">
								<a
									href="https://instagram.com/olatoursao"
									target="_blank"
									rel="noopener noreferrer"
									className="text-white/60 hover:text-flag transition-colors"
									aria-label="Instagram"
								>
									<svg
										viewBox="0 0 24 24"
										fill="none"
										className="h-5 w-5"
										aria-hidden="true"
									>
										<path
											d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
											fill="currentColor"
										/>
									</svg>
								</a>
								<a
									href="https://tiktok.com/@kelvinsjohn"
									target="_blank"
									rel="noopener noreferrer"
									className="text-white/60 hover:text-flag transition-colors"
									aria-label="TikTok"
								>
									<svg
										viewBox="0 0 24 24"
										fill="none"
										className="h-5 w-5"
										aria-hidden="true"
									>
										<path
											d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.6 2.89 2.89 0 01-2.88-2.89 2.89 2.89 0 012.88-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.99 15.4a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.31a8.16 8.16 0 004.77 1.52v-3.4a4.86 4.86 0 01-1.85.26z"
											fill="currentColor"
										/>
									</svg>
								</a>
							</div>
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
