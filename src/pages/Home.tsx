import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Cover } from '../components/Cover';
import { WhyUs } from '../components/WhyUs';
import { Testimonials } from '../components/Testimonials';

export function Home() {
	useDocumentTitle('Home');

	return (
		<>
			<Cover />
			<WhyUs />
			<Testimonials />
		</>
	);
}
