import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.ts';
import { Logo } from '../../components/Logo.tsx';

const NAV_ITEMS = [
	{ path: '/ot', label: 'Dashboard', end: true },
	{ path: '/ot/eventos', label: 'Eventos', end: false },
	{ path: '/ot/usuarios', label: 'Utilizadores', end: false },
];

export function AdminLayout() {
	const navigate = useNavigate();
	const { user, isAuthenticated, isInitialized, logout, hydrate } =
		useAuthStore();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	useEffect(() => {
		hydrate();
	}, [hydrate]);

	useEffect(() => {
		if (isInitialized && !isAuthenticated) {
			navigate('/ot/login');
		}
	}, [isInitialized, isAuthenticated, navigate]);

	if (!isInitialized || !isAuthenticated) {
		return (
			<div className="min-h-dvh bg-navy flex items-center justify-center">
				<div className="w-8 h-8 border-2 border-flag border-t-transparent rounded-full animate-spin" />
			</div>
		);
	}

	async function handleLogout() {
		try {
			await fetch('/api/auth/logout', {
				method: 'POST',
				credentials: 'include',
			});
		} catch {
			/* ignore */
		}
		logout();
		navigate('/ot/login');
	}

	return (
		<div className="min-h-dvh bg-cream-50 flex">
			<aside
				className={`fixed inset-y-0 left-0 z-40 w-64 bg-navy flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:z-auto`}
			>
				<div className="flex items-center justify-between h-16 px-5 border-b border-white/10 shrink-0">
					<Logo
						size="sm"
						className="[filter:brightness(0)_invert(1)]"
					/>
					<button
						type="button"
						onClick={() => setSidebarOpen(false)}
						className="lg:hidden text-white/60 hover:text-white"
						aria-label="Fechar menu"
					>
						<svg
							viewBox="0 0 16 16"
							fill="none"
							className="h-4 w-4"
						>
							<path
								d="M3 3l10 10M13 3L3 13"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
						</svg>
					</button>
				</div>

				<nav className="flex-1 px-3 py-4 space-y-1">
					{NAV_ITEMS.map((item) => (
						<NavLink
							key={item.path}
							to={item.path}
							end={item.end}
							onClick={() => setSidebarOpen(false)}
							className={({ isActive }) =>
								`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm label-caps transition-colors ${
									isActive
										? 'bg-flag/20 text-flag'
										: 'text-white/60 hover:text-white hover:bg-white/5'
								}`
							}
						>
							{item.label}
						</NavLink>
					))}
				</nav>

				<div className="border-t border-white/10 px-3 py-4 shrink-0">
					<div className="px-3 mb-2">
						<p className="text-white/80 text-sm font-semibold truncate">
							{user?.name} {user?.surname}
						</p>
						<p className="text-white/40 text-xs truncate">
							{user?.email}
						</p>
					</div>
					<NavLink
						to="/ot/perfil"
						onClick={() => setSidebarOpen(false)}
						className={({ isActive }) =>
							`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm label-caps transition-colors ${
								isActive
									? 'bg-flag/20 text-flag'
									: 'text-white/40 hover:text-white hover:bg-white/5'
							}`
						}
					>
						<svg
							viewBox="0 0 16 16"
							fill="none"
							className="h-3.5 w-3.5"
						>
							<path
								d="M8 8a3 3 0 100-6 3 3 0 000 6zm-5 6a5 5 0 0110 0"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
						</svg>
						Perfil
					</NavLink>
					<button
						type="button"
						onClick={handleLogout}
						className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm label-caps text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
					>
						<svg
							viewBox="0 0 16 16"
							fill="none"
							className="h-3.5 w-3.5"
						>
							<path
								d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M11 11l3-3-3-3M14 8H6"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
						</svg>
						Sair
					</button>
				</div>
			</aside>

			{sidebarOpen && (
				<div
					className="fixed inset-0 z-30 bg-black/40 lg:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			<div className="flex-1 flex flex-col min-w-0">
				<header className="h-16 bg-white border-b border-gray-border/60 flex items-center px-5 shrink-0">
					<button
						type="button"
						onClick={() => setSidebarOpen(true)}
						className="lg:hidden mr-3 text-ink hover:text-flag transition-colors"
						aria-label="Abrir menu"
					>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							className="h-5 w-5"
						>
							<path
								d="M3 6h18M3 12h18M3 18h18"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
						</svg>
					</button>
					<div className="flex items-center gap-2 text-sm text-ink-mute">
						<span className="w-2 h-2 rounded-full bg-green-500" />
						Admin
					</div>
				</header>
				<main className="flex-1 p-5 sm:p-8 overflow-auto">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
