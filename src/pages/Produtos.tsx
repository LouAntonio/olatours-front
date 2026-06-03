import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Products } from '../components/Products';

export function Produtos() {
	useDocumentTitle('Produtos');

	return <Products />;
}
