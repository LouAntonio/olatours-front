import { useState } from 'react';
import { useAuthStore } from '../../stores/auth.ts';
import { useUpdateProfile, useChangePassword } from '../../hooks/useUsers.ts';

export function AdminProfile() {
	const user = useAuthStore((s) => s.user);
	const updateProfile = useUpdateProfile();
	const changePassword = useChangePassword();

	const [name, setName] = useState(user?.name ?? '');
	const [surname, setSurname] = useState(user?.surname ?? '');
	const [email, setEmail] = useState(user?.email ?? '');
	const [profileMsg, setProfileMsg] = useState('');
	const [profileError, setProfileError] = useState('');

	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [pwdMsg, setPwdMsg] = useState('');
	const [pwdError, setPwdError] = useState('');

	async function handleProfileSubmit(e: React.FormEvent) {
		e.preventDefault();
		setProfileMsg('');
		setProfileError('');
		try {
			await updateProfile.mutateAsync({ name, surname, email });
			setProfileMsg('Perfil atualizado com sucesso');
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : 'Erro ao atualizar perfil';
			setProfileError(msg);
		}
	}

	async function handlePasswordSubmit(e: React.FormEvent) {
		e.preventDefault();
		setPwdMsg('');
		setPwdError('');

		if (newPassword !== confirmPassword) {
			setPwdError('As palavras-passe não coincidem');
			return;
		}
		if (newPassword.length < 6) {
			setPwdError('A nova palavra-passe deve ter pelo menos 6 caracteres');
			return;
		}

		try {
			await changePassword.mutateAsync({ currentPassword, newPassword });
			setPwdMsg('Palavra-passe alterada com sucesso');
			setCurrentPassword('');
			setNewPassword('');
			setConfirmPassword('');
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : 'Erro ao alterar palavra-passe';
			setPwdError(msg);
		}
	}

	return (
		<div className="max-w-2xl">
			<div className="mb-8">
				<h1 className="font-display text-3xl font-black uppercase text-ink tracking-tight">
					O meu Perfil
				</h1>
				<p className="mt-1 text-ink-mute text-sm">
					Gerir os seus dados de acesso
				</p>
			</div>

			<form onSubmit={handleProfileSubmit} className="mb-8 bg-white border border-gray-border/60 rounded-lg p-5 space-y-4">
				<h2 className="label-caps text-ink-mute text-xs uppercase tracking-wider">Dados do Perfil</h2>

				{profileMsg && (
					<div className="bg-green-50 border border-green-200 rounded-sm px-4 py-3 text-green-700 text-sm">{profileMsg}</div>
				)}
				{profileError && (
					<div className="bg-red-50 border border-red-200 rounded-sm px-4 py-3 text-red-700 text-sm">{profileError}</div>
				)}

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div>
						<label className="label-caps text-ink-mute text-xs block mb-1">Nome</label>
						<input required value={name} onChange={(e) => setName(e.target.value)}
							className="w-full border border-gray-border/60 rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-flag transition-colors" />
					</div>
					<div>
						<label className="label-caps text-ink-mute text-xs block mb-1">Sobrenome</label>
						<input required value={surname} onChange={(e) => setSurname(e.target.value)}
							className="w-full border border-gray-border/60 rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-flag transition-colors" />
					</div>
					<div className="sm:col-span-2">
						<label className="label-caps text-ink-mute text-xs block mb-1">Email</label>
						<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
							className="w-full border border-gray-border/60 rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-flag transition-colors" />
					</div>
				</div>

				<button type="submit" disabled={updateProfile.isPending}
					className="px-4 py-2 bg-flag hover:bg-flag-dark disabled:opacity-50 text-white label-caps text-sm rounded-sm transition-colors">
					{updateProfile.isPending ? 'A guardar...' : 'Guardar alterações'}
				</button>
			</form>

			<form onSubmit={handlePasswordSubmit} className="bg-white border border-gray-border/60 rounded-lg p-5 space-y-4">
				<h2 className="label-caps text-ink-mute text-xs uppercase tracking-wider">Alterar Palavra-passe</h2>

				{pwdMsg && (
					<div className="bg-green-50 border border-green-200 rounded-sm px-4 py-3 text-green-700 text-sm">{pwdMsg}</div>
				)}
				{pwdError && (
					<div className="bg-red-50 border border-red-200 rounded-sm px-4 py-3 text-red-700 text-sm">{pwdError}</div>
				)}

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div>
						<label className="label-caps text-ink-mute text-xs block mb-1">Palavra-passe atual</label>
						<input required type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
							className="w-full border border-gray-border/60 rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-flag transition-colors" />
					</div>
					<div>
						<label className="label-caps text-ink-mute text-xs block mb-1">Nova palavra-passe</label>
						<input required type="password" minLength={6} value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
							className="w-full border border-gray-border/60 rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-flag transition-colors" />
					</div>
					<div className="sm:col-span-2">
						<label className="label-caps text-ink-mute text-xs block mb-1">Confirmar nova palavra-passe</label>
						<input required type="password" minLength={6} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
							className="w-full border border-gray-border/60 rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-flag transition-colors" />
					</div>
				</div>

				<button type="submit" disabled={changePassword.isPending}
					className="px-4 py-2 bg-flag hover:bg-flag-dark disabled:opacity-50 text-white label-caps text-sm rounded-sm transition-colors">
					{changePassword.isPending ? 'A alterar...' : 'Alterar palavra-passe'}
				</button>
			</form>
		</div>
	);
}
