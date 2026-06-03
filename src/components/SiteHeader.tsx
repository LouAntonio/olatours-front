import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Logo } from './Logo';
import { motion as m, stagger } from '../styles/tokens';

const NAV_ITEMS = [
	{ path: '/', label: 'Home' },
	{ path: '/sobre', label: 'Sobre' },
	{ path: '/agenda', label: 'Agenda' },
	{ path: '/servicos', label: 'Serviços' },
	{ path: '/produtos', label: 'Produtos' },
	{ path: '/carreiras', label: 'Carreiras' },
];

const drawerVariants = {
	hidden: { x: '100%' },
	show: {
		x: 0,
		transition: { duration: m.duration.slow, ease: m.ease.out },
	},
};

const overlayVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { duration: m.duration.base, ease: m.ease.out },
	},
};

const navContainerVariants = {
	hidden: {},
	show: {
		transition: { staggerChildren: stagger.base, delayChildren: 0.15 },
	},
};

const navItemVariants = {
	hidden: { opacity: 0, x: 40 },
	show: {
		opacity: 1,
		x: 0,
		transition: { duration: m.duration.base, ease: m.ease.out },
	},
};

const ctaVariants = {
	hidden: { opacity: 0, y: 20 },
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: m.duration.base,
			ease: m.ease.out,
			delay: 0.45,
		},
	},
};

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

	useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	const isGhost = isHome && !pastHero;

	function close() {
		setOpen(false);
	}

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
			<div className="mx-auto max-w-[1200px] px-5 sm:px-8 flex items-center justify-between h-16 sm:h-18">
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
						className={`lg:hidden relative h-11 w-11 inline-flex items-center justify-center rounded-sm transition-colors ${
							isGhost
								? 'text-white hover:bg-white/10'
								: 'text-ink hover:bg-gray-border-soft'
						}`}
						aria-label={open ? 'Fechar menu' : 'Abrir menu'}
						aria-expanded={open}
					>
						<span
							className={`absolute h-px w-5 transition-all duration-300 ${
								isGhost ? 'bg-white' : 'bg-current'
							} ${open ? 'top-1/2 rotate-45' : 'top-[15px]'}`}
						/>
						<span
							className={`absolute h-px w-5 transition-all duration-300 ${
								isGhost ? 'bg-white' : 'bg-current'
							} ${open ? 'top-1/2 -rotate-45' : 'top-[27px]'}`}
						/>
					</button>
				</div>
			</div>

			{open && (
				<motion.div
					variants={overlayVariants}
					initial="hidden"
					animate="show"
					className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] hidden md:block lg:hidden"
					onClick={close}
				/>
			)}

			<motion.div
				variants={drawerVariants}
				initial="hidden"
				animate={open ? 'show' : 'hidden'}
				className="fixed top-0 right-0 z-50 h-dvh w-full md:w-[420px] bg-navy flex flex-col lg:hidden overflow-y-auto"
				role="dialog"
				aria-modal="true"
				aria-label="Menu de navegação"
			>
				<div className="flex items-center justify-between px-5 sm:px-8 h-16 sm:h-18 shrink-0">
					<Logo
						size="sm"
						className="[filter:brightness(0)_invert(1)]"
					/>
					<button
						type="button"
						onClick={close}
						className="h-11 w-11 inline-flex items-center justify-center text-white/60 hover:text-white transition-colors rounded-sm hover:bg-white/10"
						aria-label="Fechar menu"
					>
						<svg
							viewBox="0 0 16 16"
							fill="none"
							className="h-4 w-4"
							aria-hidden="true"
						>
							<path
								d="M3 3l10 10M13 3L3 13"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
						</svg>
					</button>
				</div>

				<motion.nav
					variants={navContainerVariants}
					initial="hidden"
					animate={open ? 'show' : 'hidden'}
					className="flex-1 flex flex-col justify-center px-5 sm:px-8 gap-1"
				>
					{NAV_ITEMS.map((item, i) => (
						<motion.div key={item.path} variants={navItemVariants}>
							<Link
								to={item.path}
								onClick={close}
								className="group flex items-baseline gap-4 py-4 border-b border-white/10 last:border-0"
							>
								<span className="label-caps text-flag shrink-0 w-8 text-right tabular-nums">
									{String(i + 1).padStart(2, '0')}
								</span>
								<span className="font-display text-4xl sm:text-5xl font-black uppercase leading-[0.88] tracking-tight text-white group-hover:text-flag transition-colors duration-300">
									{item.label}
								</span>
							</Link>
						</motion.div>
					))}
				</motion.nav>

				<motion.div
					variants={ctaVariants}
					initial="hidden"
					animate={open ? 'show' : 'hidden'}
					className="shrink-0 px-5 sm:px-8 pb-8 sm:pb-10 pt-6"
				>
					<Link
						to="/contacto"
						onClick={close}
						className="inline-flex items-center justify-center gap-3 w-full px-6 py-4 bg-flag hover:bg-flag-dark text-white font-display text-lg font-bold uppercase tracking-wider transition-colors rounded-sm"
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
						Fale connosco
					</Link>
					<p className="mt-5 text-center text-white/20 text-xs label-caps">
						Ola Tours · Desde 2014
					</p>
				</motion.div>
			</motion.div>
		</header>
	);
}
