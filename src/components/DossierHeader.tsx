import { useEffect, useState } from 'react';
import { Logo } from './Logo';

const SECTIONS = [
	{ id: 'capa', label: 'Capa', n: '01' },
	{ id: 'agenda', label: 'Agenda', n: '02' },
	{ id: 'porque-nos', label: 'Porquê Nós', n: '03' },
	{ id: 'servicos', label: 'Serviços', n: '04' },
	{ id: 'produtos', label: 'Produtos', n: '05' },
	{ id: 'testemunhos', label: 'Testemunhos', n: '06' },
	{ id: 'contacto', label: 'Contacto', n: '07' },
];

export function DossierHeader() {
	const [active, setActive] = useState('capa');
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						setActive(e.target.id);
					}
				}
			},
			{ rootMargin: '-40% 0px -55% 0px', threshold: 0 },
		);
		for (const s of SECTIONS) {
			const el = document.getElementById(s.id);
			if (el) observer.observe(el);
		}
		return () => observer.disconnect();
	}, []);

	const activeSection = SECTIONS.find((s) => s.id === active);

	return (
		<header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b-2 border-ink">
			<div className="border-b border-ink/15 dossier-tick">
				<div className="mx-auto max-w-[1400px] px-5 sm:px-8 flex items-center justify-between h-7">
					<div className="flex items-center gap-3 mono-caps text-ink-soft">
						<span className="hidden sm:inline">
							DOSSIER Nº 01 / 26
						</span>
						<span className="sm:hidden">Nº 01 / 26</span>
					</div>
					<div className="flex items-center gap-3 mono-caps text-ink-soft">
						<span className="hidden sm:inline">LUANDA ↔ MUNDO</span>
						<span className="hidden md:inline-flex items-center gap-2">
							<span className="h-1.5 w-1.5 rounded-full bg-terracotta pulse-dot" />
							VALIDADO
						</span>
					</div>
				</div>
			</div>

			<div className="mx-auto max-w-[1400px] px-5 sm:px-8 flex items-center justify-between h-16">
				<a
					href="#capa"
					className="flex items-center gap-3"
					aria-label="Ola Tours Corporativo — capa"
				>
					<Logo size="sm" />
					<span className="hidden md:inline-flex flex-col leading-none">
						<span className="font-display text-sm font-black tracking-wider text-ink uppercase">
							Ola Tours
						</span>
						<span className="mono-caps text-ink-soft mt-0.5">
							Corporativo · 2026
						</span>
					</span>
				</a>

				<nav className="hidden lg:flex items-center gap-7">
					{SECTIONS.slice(1).map((s) => (
						<a
							key={s.id}
							href={`#${s.id}`}
							className={[
								'label-caps transition-colors',
								active === s.id
									? 'text-terracotta'
									: 'text-ink hover:text-terracotta',
							]
								.join(' ')
								.trim()}
						>
							<span className="text-ink-mute mr-1.5 font-mono text-[10px]">
								{s.n}
							</span>
							{s.label}
						</a>
					))}
				</nav>

				<div className="flex items-center gap-3">
					<a
						href="#contacto"
						className="hidden md:inline-flex items-center gap-2 label-caps text-ink hover:text-terracotta transition-colors"
					>
						<span className="h-1.5 w-1.5 rounded-full bg-terracotta pulse-dot" />
						Marcar reunião
					</a>
					<button
						type="button"
						onClick={() => setOpen(!open)}
						className="lg:hidden h-9 w-9 inline-flex items-center justify-center border border-ink text-ink hover:bg-ink hover:text-paper transition-colors"
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

			{activeSection && (
				<div className="hidden md:block border-t border-ink/10 bg-paper-warm/40">
					<div className="mx-auto max-w-[1400px] px-5 sm:px-8 flex items-center justify-between h-6">
						<span className="mono-caps text-ink-soft">
							SECÇÃO {activeSection.n} / 07 —{' '}
							{activeSection.label.toUpperCase()}
						</span>
						<span className="mono-caps text-ink-mute">
							{String(
								SECTIONS.findIndex((s) => s.id === active) + 1,
							).padStart(2, '0')}{' '}
							· 07
						</span>
					</div>
				</div>
			)}

			{open && (
				<div className="lg:hidden border-t border-ink/15 bg-paper">
					<nav className="mx-auto max-w-[1400px] px-5 sm:px-8 py-4 flex flex-col">
						{SECTIONS.map((s) => (
							<a
								key={s.id}
								href={`#${s.id}`}
								onClick={() => setOpen(false)}
								className={[
									'flex items-baseline gap-3 py-3 border-b border-ink/10 last:border-0',
									active === s.id
										? 'text-terracotta'
										: 'text-ink',
								]
									.join(' ')
									.trim()}
							>
								<span className="font-mono text-xs text-ink-mute">
									{s.n}
								</span>
								<span className="font-display text-2xl font-black uppercase tracking-tight">
									{s.label}
								</span>
							</a>
						))}
					</nav>
				</div>
			)}
		</header>
	);
}
