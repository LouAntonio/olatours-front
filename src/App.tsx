import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useScrollToTop } from './hooks/useScrollToTop';
import { useAuthStore } from './stores/auth';
import { SiteHeader } from './components/SiteHeader';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Sobre } from './pages/Sobre';
import { Agenda } from './pages/Agenda';
import { EventoDetalhe } from './pages/EventoDetalhe';
import { Servicos } from './pages/Servicos';
import { Produtos } from './pages/Produtos';
import { Contacto } from './pages/Contacto';
import { Carreiras } from './pages/Carreiras';
import { MercadoDaComida } from './pages/MercadoDaComida';
import { NotFound } from './pages/NotFound';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminEvents } from './pages/admin/AdminEvents';
import { AdminEventForm } from './pages/admin/AdminEventForm';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminProfile } from './pages/admin/AdminProfile';
import './App.css';

function App() {
	useScrollToTop();
	const hydrate = useAuthStore((s) => s.hydrate);

	useEffect(() => {
		hydrate();
	}, [hydrate]);

	return (
		<div className="app-shell">
			<Routes>
				<Route path="/ot/login" element={<AdminLogin />} />
				<Route path="/ot" element={<AdminLayout />}>
					<Route index element={<AdminDashboard />} />
					<Route path="eventos" element={<AdminEvents />} />
					<Route path="eventos/novo" element={<AdminEventForm />} />
					<Route
						path="eventos/:slug/editar"
						element={<AdminEventForm />}
					/>
					<Route path="usuarios" element={<AdminUsers />} />
					<Route path="perfil" element={<AdminProfile />} />
				</Route>
				<Route
					path="*"
					element={
						<>
							<SiteHeader />
							<main className="flex-1">
								<Routes>
									<Route path="/" element={<Home />} />
									<Route path="/sobre" element={<Sobre />} />
									<Route
										path="/agenda"
										element={<Agenda />}
									/>
									<Route
										path="/agenda/:slug"
										element={<EventoDetalhe />}
									/>
									<Route
										path="/servicos"
										element={<Servicos />}
									/>
									<Route
										path="/produtos"
										element={<Produtos />}
									/>
									<Route
										path="/contacto"
										element={<Contacto />}
									/>
									<Route
										path="/carreiras"
										element={<Carreiras />}
									/>
									<Route
										path="/mercado-da-comida"
										element={<MercadoDaComida />}
									/>
									<Route path="*" element={<NotFound />} />
								</Routes>
							</main>
							<Footer />
						</>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
