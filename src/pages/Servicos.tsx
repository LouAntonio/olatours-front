import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Services } from '../components/Services';

export function Servicos() {
	useDocumentTitle('Serviços');

	return <Services />;
}
