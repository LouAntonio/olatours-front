import { Routes, Route } from 'react-router-dom';
import { SiteHeader } from './components/SiteHeader';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Sobre } from './pages/Sobre';
import { Agenda } from './pages/Agenda';
import { Servicos } from './pages/Servicos';
import { Produtos } from './pages/Produtos';
import { Contacto } from './pages/Contacto';
import './App.css';

function App() {
	return (
		<div className="app-shell">
			<SiteHeader />
			<main className="flex-1">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/sobre" element={<Sobre />} />
					<Route path="/agenda" element={<Agenda />} />
					<Route path="/servicos" element={<Servicos />} />
					<Route path="/produtos" element={<Produtos />} />
					<Route path="/contacto" element={<Contacto />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
}

export default App;
