import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../../stores/auth.ts';
import { Logo } from '../../components/Logo.tsx';
import type { ApiResponse, AuthResponse } from '../../types/api.ts';

export function AdminLogin() {
	const navigate = useNavigate();
	const login = useAuthStore((s) => s.login);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError('');
		setLoading(true);
		try {
			const { data } = await axios.post<ApiResponse<AuthResponse>>('/api/auth/login', { email, password });
			if (data.success) {
				login(data.data.user, data.data.accessToken, data.data.refreshToken);
				navigate('/ot');
			}
		} catch (err: unknown) {
			if (axios.isAxiosError(err) && err.response?.data?.message) {
				setError(err.response.data.message);
			} else {
				setError('Erro ao conectar ao servidor');
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-dvh bg-navy flex items-center justify-center p-5">
			<div className="w-full max-w-sm">
				<div className="text-center mb-8">
					<div className="flex justify-center mb-4">
						<Logo size="md" className="[filter:brightness(0)_invert(1)]" />
					</div>
					<h1 className="font-display text-3xl font-black uppercase text-white tracking-tight">
						Painel Admin
					</h1>
					<p className="mt-2 text-white/50 text-sm">Ola Tours · Administração</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					{error && (
						<div className="bg-red-500/10 border border-red-500/30 rounded-sm px-4 py-3 text-red-400 text-sm">
							{error}
						</div>
					)}

					<div>
						<label htmlFor="email" className="label-caps text-white/60 text-xs block mb-1.5">
							Email
						</label>
						<input
							id="email"
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full bg-white/10 border border-white/20 rounded-sm px-4 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-flag transition-colors"
							placeholder="admin@olatours.co.ao"
						/>
					</div>

					<div>
						<label htmlFor="password" className="label-caps text-white/60 text-xs block mb-1.5">
							Palavra-passe
						</label>
						<input
							id="password"
							type="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full bg-white/10 border border-white/20 rounded-sm px-4 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-flag transition-colors"
							placeholder="••••••••"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-flag hover:bg-flag-dark disabled:opacity-50 text-white font-display font-bold uppercase tracking-wider py-3 rounded-sm transition-colors text-sm"
					>
						{loading ? 'A entrar...' : 'Entrar'}
					</button>
				</form>
			</div>
		</div>
	);
}
