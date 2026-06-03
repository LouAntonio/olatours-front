import { Cover } from '../components/Cover';
import { WhyUs } from '../components/WhyUs';
import { Marquee } from '../components/Marquee';
import { Testimonials } from '../components/Testimonials';

export function Home() {
	return (
		<>
			<Cover />
			<WhyUs />
			<Marquee
				items={[
					'ANGOLA',
					'ÁFRICA',
					'NEGÓCIOS',
					'EXECUTIVO',
					'EXCELLENCE',
					'PONTUALIDADE',
					'PRIVACIDADE',
				]}
				tone="flag"
				separator="✦"
			/>
			<Testimonials />
		</>
	);
}
