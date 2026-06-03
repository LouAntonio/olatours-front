import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from './Logo';

const NAV_ITEMS = [
	{ path: '/sobre', label: 'Sobre' },
	{ path: '/agenda', label: 'Agenda' },
	{ path: '/servicos', label: 'Serviços' },
	{ path: '/produtos', label: 'Produtos' },
];

export function SiteHeader() {
	const [open, setOpen] = useState(false);
	const location = useLocation();
	const isHome = location.pathname === '/';
	const [pastHero, setPastHero] = useState(!isHome);

	useEffect(() => {
		if (!isHome) return;

		const el = document.getElementById('capa');
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => setPastHero(!entry.isIntersecting),
			{ threshold: 0 },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [isHome]);

	const isGhost = isHome && !pastHero;

	return (
		<header
			className={[
				'fixed top-0 left-0 right-0 z-50 transition-shadow duration-300',
				isGhost
					? 'bg-transparent'
					: 'bg-white/95 backdrop-blur-md shadow-header',
			]
				.join(' ')
				.trim()}
		>
			<div className="mx-auto max-w-[1400px] px-5 sm:px-8 flex items-center justify-between h-16 sm:h-18">
				<Link
					to="/"
					className="flex items-center"
					aria-label="Ola Tours"
				>
					<Logo
						size="sm"
						className={
							isGhost ? '[filter:brightness(0)_invert(1)]' : ''
						}
					/>
				</Link>

				<nav className="hidden lg:flex items-center gap-8">
					{NAV_ITEMS.map((item) => (
						<NavLink
							key={item.path}
							to={item.path}
							className={({ isActive }) =>
								[
									'label-caps transition-colors',
									isActive
										? 'text-flag'
										: isGhost
											? 'text-white/80 hover:text-flag'
											: 'text-ink-soft hover:text-flag',
								]
									.join(' ')
									.trim()
							}
						>
							{item.label}
						</NavLink>
					))}
				</nav>

				<div className="flex items-center gap-3">
					<Link
						to="/contacto"
						className={`hidden md:inline-flex items-center gap-2 px-4 py-2 label-caps transition-colors rounded-sm ${
							isGhost
								? 'border border-flag/60 text-flag hover:bg-flag hover:text-white'
								: 'bg-flag text-white hover:bg-flag-dark'
						}`}
					>
						Contacto
					</Link>
					<button
						type="button"
						onClick={() => setOpen(!open)}
						className={`lg:hidden h-9 w-9 inline-flex items-center justify-center border transition-colors rounded-sm ${
							isGhost
								? 'border-white/30 text-white hover:bg-flag hover:text-white'
								: 'border-gray-border text-ink hover:bg-flag hover:text-white'
						}`}
						aria-label="Menu"
						aria-expanded={open}
					>
						<svg
							viewBox="0 0 16 16"
							fill="none"
							className="h-4 w-4"
							aria-hidden="true"
						>
							{open ? (
								<path
									d="M3 3l10 10M13 3L3 13"
									stroke="currentColor"
									strokeWidth="1.5"
								/>
							) : (
								<>
									<path
										d="M2 5h12M2 11h12"
										stroke="currentColor"
										strokeWidth="1.5"
									/>
								</>
							)}
						</svg>
					</button>
				</div>
			</div>

			{open && (
				<div className="lg:hidden border-t border-gray-border-soft bg-white">
					<nav className="mx-auto max-w-[1400px] px-5 sm:px-8 py-4 flex flex-col">
						{NAV_ITEMS.map((item) => (
							<Link
								key={item.path}
								to={item.path}
								onClick={() => setOpen(false)}
								className="flex items-baseline gap-3 py-3 border-b border-gray-border-soft last:border-0 text-ink hover:text-flag transition-colors"
							>
								<span className="font-display text-2xl font-black uppercase tracking-tight">
									{item.label}
								</span>
							</Link>
						))}
					</nav>
				</div>
			)}
		</header>
	);
}
