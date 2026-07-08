import { useState } from 'react';
import {
	useUsers,
	useCreateUser,
	useDeleteUser,
} from '../../hooks/useUsers.ts';
import { useAuthStore } from '../../stores/auth.ts';

export function AdminUsers() {
	const currentUser = useAuthStore((s) => s.user);
	const { data: users, isLoading, isError } = useUsers();
	const createUser = useCreateUser();
	const deleteUser = useDeleteUser();
	const [showForm, setShowForm] = useState(false);
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [formError, setFormError] = useState('');

	async function handleCreate(e: React.FormEvent) {
		e.preventDefault();
		setFormError('');
		try {
			await createUser.mutateAsync({ name, surname, email, password });
			setName('');
			setSurname('');
			setEmail('');
			setPassword('');
			setShowForm(false);
		} catch (err: unknown) {
			const msg =
				err instanceof Error ? err.message : 'Erro ao criar utilizador';
			setFormError(msg);
		}
	}

	async function handleDelete(id: string, userEmail: string) {
		if (!window.confirm(`Eliminar o utilizador ${userEmail}?`)) return;
		try {
			await deleteUser.mutateAsync(id);
		} catch {
			alert('Erro ao eliminar utilizador');
		}
	}

	return (
		<div>
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="font-display text-3xl font-black uppercase text-ink tracking-tight">
						Utilizadores
					</h1>
					<p className="mt-1 text-ink-mute text-sm">
						{users
							? `${users.length} administrador(es)`
							: 'Gerir administradores'}
					</p>
				</div>
				<button
					type="button"
					onClick={() => setShowForm(!showForm)}
					className="inline-flex items-center gap-2 px-4 py-2.5 bg-flag hover:bg-flag-dark text-white label-caps text-sm rounded-sm transition-colors"
				>
					<svg
						viewBox="0 0 16 16"
						fill="none"
						className="h-3.5 w-3.5"
					>
						<path
							d="M8 3v10M3 8h10"
							stroke="currentColor"
							strokeWidth="1.5"
						/>
					</svg>
					Novo Admin
				</button>
			</div>

			{showForm && (
				<form
					onSubmit={handleCreate}
					className="mb-8 bg-white border border-gray-border/60 rounded-lg p-5 space-y-4"
				>
					<h2 className="label-caps text-ink-mute text-xs uppercase tracking-wider">
						Novo Administrador
					</h2>

					{formError && (
						<div className="bg-red-50 border border-red-200 rounded-sm px-4 py-3 text-red-700 text-sm">
							{formError}
						</div>
					)}

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<label className="label-caps text-ink-mute text-xs block mb-1">
								Nome *
							</label>
							<input
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="w-full border border-gray-border/60 rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-flag transition-colors"
							/>
						</div>
						<div>
							<label className="label-caps text-ink-mute text-xs block mb-1">
								Sobrenome *
							</label>
							<input
								required
								value={surname}
								onChange={(e) => setSurname(e.target.value)}
								className="w-full border border-gray-border/60 rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-flag transition-colors"
							/>
						</div>
						<div>
							<label className="label-caps text-ink-mute text-xs block mb-1">
								Email *
							</label>
							<input
								required
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full border border-gray-border/60 rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-flag transition-colors"
							/>
						</div>
						<div>
							<label className="label-caps text-ink-mute text-xs block mb-1">
								Palavra-passe *
							</label>
							<input
								required
								type="password"
								minLength={6}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full border border-gray-border/60 rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-flag transition-colors"
							/>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<button
							type="submit"
							disabled={createUser.isPending}
							className="px-4 py-2 bg-flag hover:bg-flag-dark disabled:opacity-50 text-white label-caps text-sm rounded-sm transition-colors"
						>
							{createUser.isPending ? 'A criar...' : 'Criar'}
						</button>
						<button
							type="button"
							onClick={() => setShowForm(false)}
							className="px-4 py-2 bg-white border border-gray-border/60 hover:bg-gray-border-soft text-ink label-caps text-sm rounded-sm transition-colors"
						>
							Cancelar
						</button>
					</div>
				</form>
			)}

			{isLoading ? (
				<div className="bg-white border border-gray-border/60 rounded-lg overflow-hidden">
					<div className="p-6 space-y-4">
						{[1, 2, 3].map((i) => (
							<div
								key={i}
								className="h-12 bg-gray-border/40 animate-pulse rounded"
							/>
						))}
					</div>
				</div>
			) : isError ? (
				<div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700 text-sm">
					Erro ao carregar utilizadores.
				</div>
			) : users && users.length > 0 ? (
				<div className="bg-white border border-gray-border/60 rounded-lg overflow-hidden">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b border-gray-border/60 bg-cream-50">
								<th className="text-left px-4 py-3 label-caps text-ink-mute text-[10px]">
									Nome
								</th>
								<th className="text-left px-4 py-3 label-caps text-ink-mute text-[10px] hidden sm:table-cell">
									Email
								</th>
								<th className="text-left px-4 py-3 label-caps text-ink-mute text-[10px] hidden md:table-cell">
									Registo
								</th>
								<th className="text-right px-4 py-3 label-caps text-ink-mute text-[10px]">
									Ações
								</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr
									key={user.id}
									className="border-b border-gray-border/30 hover:bg-cream-50/50 transition-colors"
								>
									<td className="px-4 py-3.5">
										<p className="font-semibold text-ink">
											{user.name} {user.surname}
										</p>
									</td>
									<td className="px-4 py-3.5 text-ink-mute hidden sm:table-cell">
										{user.email}
									</td>
									<td className="px-4 py-3.5 text-ink-mute hidden md:table-cell">
										{user.createdAt
											? new Date(
													user.createdAt,
												).toLocaleDateString('pt-PT')
											: '-'}
									</td>
									<td className="px-4 py-3.5 text-right">
										{currentUser?.id !== user.id && (
											<button
												type="button"
												onClick={() =>
													handleDelete(
														user.id,
														user.email,
													)
												}
												disabled={deleteUser.isPending}
												className="label-caps text-[10px] text-red-500 hover:text-red-600 transition-colors disabled:opacity-50"
											>
												Eliminar
											</button>
										)}
										{currentUser?.id === user.id && (
											<span className="label-caps text-[10px] text-ink-mute">
												Você
											</span>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<div className="bg-white border border-gray-border/60 rounded-lg p-10 text-center">
					<p className="text-ink-mute text-sm">
						Nenhum utilizador encontrado.
					</p>
				</div>
			)}
		</div>
	);
}
