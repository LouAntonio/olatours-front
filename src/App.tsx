import { Routes, Route } from 'react-router-dom';
import { useScrollToTop } from './hooks/useScrollToTop';
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
import './App.css';

function App() {
	useScrollToTop();

	return (
		<div className="app-shell">
			<SiteHeader />
			<main className="flex-1">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/sobre" element={<Sobre />} />
					<Route path="/agenda" element={<Agenda />} />
					<Route path="/agenda/:id" element={<EventoDetalhe />} />
					<Route path="/servicos" element={<Servicos />} />
					<Route path="/produtos" element={<Produtos />} />
					<Route path="/contacto" element={<Contacto />} />
					<Route path="/carreiras" element={<Carreiras />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
}

export default App;
