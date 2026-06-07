export type Accent = 'flag' | 'sky' | 'navy';

export interface EventPhoto {
	src: string;
	alt: string;
	caption?: string;
}

export interface EventDetail {
	label: string;
	value: string;
}

export interface Evento {
	id: number;
	title: string;
	subtitle?: string;
	description: string;
	fullDescription?: string;
	date: string;
	dateLong: string;
	type: string;
	country: string;
	countryName: string;
	accent: Accent;
	photos?: EventPhoto[];
	details?: EventDetail[];
	featured: boolean;
}

const eventos: Evento[] = [
	{
		id: 1,
		title: "Africa's Travel Indaba",
		subtitle: 'Meetings Africa',
		description:
			'Uma das maiores feiras de marketing turístico da África. Reúne expositores de produtos turísticos africanos e compradores globais.',
		fullDescription:
			"A Africa's Travel Indaba é um dos maiores eventos de marketing turístico do continente africano, realizado anualmente em Durban, África do Sul. A edição de 2026 reunirá centenas de expositores de toda a África, apresentando desde safaris de luxo e destinos de praia até soluções inovadoras de turismo tecnológico.\n\nO evento é uma plataforma essencial para empresas africanas que procuram facilitar o acesso ao mercado global, estabelecendo conexões com compradores internacionais, operadores turísticos e agentes de viagens. Para a Ola Tours, representa uma oportunidade estratégica de posicionar Angola como destino turístico corporativo e de lazer no panorama africano.",
		date: 'MAI · 2026',
		dateLong: '11 a 14 de Maio de 2026',
		type: 'Feira de Turismo',
		country: 'ZAF',
		countryName: 'África do Sul',
		accent: 'sky',
		details: [
			{ label: 'Local', value: 'Durban - África do Sul' },
			{ label: 'Segmento', value: 'Marketing Turístico' },
			{
				label: 'Participantes',
				value: 'Expositores e compradores globais',
			},
			{ label: 'Objectivo', value: 'Acesso ao mercado global' },
		],
		photos: [
			{ src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', alt: 'Durban International Convention Centre', caption: 'Durban — África do Sul' },
		],
		featured: true,
	},
	{
		id: 2,
		title: 'Mundial de Futebol 2026',
		subtitle: 'FIFA World Cup 2026',
		description:
			'Primeiro mundial com 48 seleções e 104 partidas, em 16 cidades-sede no Canadá, EUA e México.',
		fullDescription:
			'O Campeonato do Mundo FIFA de 2026 será o maior de sempre, com um formato inédito de 48 seleções distribuídas por 12 grupos de quatro equipas, totalizando 104 partidas. Pela primeira vez, o torneio será coorganizado por três países: Canadá, Estados Unidos e México, com 16 cidades-sede.\n\nA Ola Tours acompanha este evento global como oportunidade de facilitar pacotes de viagens corporativas e logística para delegações, patrocinadores e grupos de adeptos institucionais. A dimensão do evento exige coordenação multinacional, mobilidade entre cidades e gestão de alojamento para grandes grupos.',
		date: 'JUN · 2026',
		dateLong: '11 de Junho a 19 de Julho de 2026',
		type: 'Evento Desportivo',
		country: 'USA',
		countryName: 'EUA · Canadá · México',
		accent: 'flag',
		details: [
			{
				label: 'Formato',
				value: '48 seleções · 12 grupos · 104 partidas',
			},
			{ label: 'Cidades-sede', value: '16 cidades' },
			{ label: 'Países', value: 'Canadá · EUA · México' },
			{ label: 'Segmento', value: 'Turismo desportivo e corporativo' },
		],
		photos: [
			{ src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80', alt: 'Estádio de futebol', caption: 'Mundial 2026 — Canadá · EUA · México' },
		],
		featured: true,
	},
	{
		id: 3,
		title: 'Business Travel Show Europe',
		subtitle: 'Gestão de viagens corporativas',
		description:
			'O maior evento de gestão de viagens corporativas da Europa, focado em gestores de viagens, tecnologia e fornecedores globais.',
		fullDescription:
			'O Business Travel Show Europe é o principal evento do continente dedicado à gestão de viagens corporativas, realizado no ExCeL London. Reúne gestores de viagens, fornecedores de tecnologia, operadores hoteleiros e companhias aéreas para dois dias de networking, conferências e exposição de soluções.\n\nPara a Ola Tours, a participação neste evento é estratégica para estabelecer parcerias com fornecedores globais, conhecer as últimas tendências em tecnologia de gestão de viagens e posicionar Angola como destino emergente para viagens corporativas em África.',
		date: 'JUN · 2026',
		dateLong: '24 e 25 de Junho de 2026',
		type: 'Feira Corporativa',
		country: 'GBR',
		countryName: 'Reino Unido',
		accent: 'sky',
		details: [
			{ label: 'Local', value: 'ExCeL London - Reino Unido' },
			{ label: 'Segmento', value: 'Viagens Corporativas' },
			{ label: 'Foco', value: 'Tecnologia e fornecedores globais' },
			{
				label: 'Público',
				value: 'Gestores de viagens e industry leaders',
			},
		],
		photos: [
			{ src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80', alt: 'ExCeL London', caption: 'ExCeL London — Reino Unido' },
		],
		featured: true,
	},
	{
		id: 4,
		title: 'Agribusiness Global Trade Summit',
		subtitle: 'Cúpula global de fornecimento agrícola',
		description:
			'Fórum global de fornecimento para os setores de proteção de cultivos, saúde vegetal e tecnologia agrícola. Focado em networking e parcerias estratégicas.',
		fullDescription:
			'O Agribusiness Global Trade Summit é o principal fórum internacional para os setores de proteção de cultivos, saúde vegetal e tecnologia agrícola. Realizado em Las Vegas, o evento reúne decisores da indústria, fornecedores e investidores para dois dias de networking, negociações e parcerias estratégicas.\n\nPara a Ola Tours, a participação neste evento representa a oportunidade de facilitar a logística de delegações angolanas e internacionais interessadas no agronegócio, sector prioritário para a diversificação da economia angolana.',
		date: 'AGO · 2026',
		dateLong: '5 e 6 de Agosto de 2026',
		type: 'Cimeira de Negócios',
		country: 'USA',
		countryName: 'Estados Unidos',
		accent: 'navy',
		details: [
			{ label: 'Local', value: 'Las Vegas - Nevada, EUA' },
			{ label: 'Sector', value: 'Agronegócio e Tecnologia Agrícola' },
			{ label: 'Foco', value: 'Networking e parcerias estratégicas' },
			{ label: 'Público', value: 'Fornecedores e investidores globais' },
		],
		photos: [
			{ src: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80', alt: 'Agricultura e tecnologia', caption: 'Las Vegas — Nevada, EUA' },
		],
		featured: true,
	},
	{
		id: 5,
		title: 'FACIM',
		subtitle: 'Feira Internacional de Maputo',
		description:
			'61ª edição da feira multissetorial que promove trocas comerciais e integração da economia de Moçambique no mundo.',
		fullDescription:
			'A FACIM - Feira Internacional de Maputo - é o maior evento multissetorial de Moçambique, realizado anualmente em Ricatla, Marracuene. A sua 61ª edição promove trocas comerciais, exposição de produtos e serviços, e integração da economia moçambicana no mercado global, abrangendo agricultura, indústria, tecnologia e turismo.\n\nPara a Ola Tours, a FACIM é uma plataforma de proximidade com o mercado da África Austral e uma oportunidade para apresentar soluções de mobilidade executiva e facilitação de negócios a empresas moçambicanas e internacionais presentes na feira.',
		date: 'AGO · 2026',
		dateLong: '31 de Agosto a 6 de Setembro de 2026',
		type: 'Feira Multissetorial',
		country: 'MOZ',
		countryName: 'Moçambique',
		accent: 'flag',
		details: [
			{ label: 'Local', value: 'Ricatla, Marracuene - Moçambique' },
			{ label: 'Edição', value: '61ª' },
			{
				label: 'Sectores',
				value: 'Agricultura · Indústria · Tecnologia',
			},
			{
				label: 'Objectivo',
				value: 'Trocas comerciais e integração global',
			},
		],
		photos: [
			{ src: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80', alt: 'Feira multissetorial em Maputo', caption: 'Ricatla, Marracuene — Moçambique' },
		],
		featured: true,
	},
	{
		id: 6,
		title: 'IT&CMA & CTW APAC',
		subtitle: 'MICE & Corporate Travel Asia',
		description:
			'Principal feira da Ásia-Pacífico para a indústria de reuniões, incentivos, conferências e exposições (MICE) e viagens corporativas.',
		fullDescription:
			'A IT&CMA (Incentive Travel & Convention Meetings Asia) e a CTW APAC (Corporate Travel World Asia-Pacific) são os maiores eventos da região Ásia-Pacífico dedicados à indústria MICE e viagens corporativas. Realizados em Banguecoque, Tailândia, reúnem compradores, fornecedores e profissionais do sector de toda a Ásia.\n\nPara a Ola Tours, o evento representa uma porta de entrada para o mercado asiático, permitindo estabelecer parcerias com operadores locais, apresentar Angola como destino MICE emergente e aprender com as melhores práticas de uma das regiões mais dinâmicas do turismo corporativo mundial.',
		date: 'SET · 2026',
		dateLong: '22 a 24 de Setembro de 2026',
		type: 'Feira MICE',
		country: 'THA',
		countryName: 'Tailândia',
		accent: 'sky',
		details: [
			{ label: 'Local', value: 'Bangkok - Tailândia' },
			{ label: 'Segmento', value: 'MICE e Viagens Corporativas' },
			{
				label: 'Foco',
				value: 'Reuniões · Incentivos · Conferências · Exposições',
			},
			{
				label: 'Público',
				value: 'Compradores e fornecedores da Ásia-Pacífico',
			},
		],
		photos: [
			{ src: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=80', alt: 'Bangkok — Tailândia', caption: 'Bangkok — Tailândia' },
		],
		featured: true,
	},
	{
		id: 7,
		title: 'Ola Safari',
		subtitle: 'Experiência de safari',
		description: 'Um dia de safari inesquecível com a Ola Tours.',
		date: '04 de Fev · 2026',
		dateLong: '4 de Fevereiro de 2026',
		type: 'Experiência',
		country: 'ANG',
		countryName: 'Angola',
		accent: 'flag',
		photos: [
			{ src: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80', alt: 'Safari africano', caption: 'Experiência de safari' },
		],
		featured: false,
	},
	{
		id: 8,
		title: 'Ola Cabo Ledo',
		subtitle: 'Praia e lazer',
		description: 'Dia de praia e descontracção em Cabo Ledo.',
		date: '14 de Fev · 2026',
		dateLong: '14 de Fevereiro de 2026',
		type: 'Lazer',
		country: 'ANG',
		countryName: 'Angola',
		accent: 'sky',
		photos: [
			{ src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', alt: 'Praia de Cabo Ledo', caption: 'Cabo Ledo — Angola' },
		],
		featured: false,
	},
	{
		id: 9,
		title: 'Ola Cabo Ledo + Show da Praça do Amor',
		subtitle: 'Praia e música ao vivo',
		description:
			'Cabo Ledo com o show especial da Praça do Amor - dois dias de praia e animação.',
		date: '14 e 15 de Fev · 2026',
		dateLong: '14 e 15 de Fevereiro de 2026',
		type: 'Lazer',
		country: 'ANG',
		countryName: 'Angola',
		accent: 'flag',
		photos: [
			{ src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', alt: 'Praia e música ao vivo', caption: 'Cabo Ledo — Angola' },
		],
		featured: false,
	},
	{
		id: 10,
		title: 'Especial Safari, Rio e Cavalo',
		subtitle: 'Aventura ao ar livre',
		description:
			'Safari, rio e cavalo - uma experiência completa de contacto com a natureza.',
		date: '14 a 17 de Fev · 2026',
		dateLong: '14 a 17 de Fevereiro de 2026',
		type: 'Experiência',
		country: 'ANG',
		countryName: 'Angola',
		accent: 'navy',
		photos: [
			{ src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', alt: 'Natureza e aventura', caption: 'Angola' },
		],
		featured: false,
	},
	{
		id: 11,
		title: 'Ola Cabo Ledo',
		subtitle: 'Praia e lazer',
		description: 'Mais um dia de praia e descontracção em Cabo Ledo.',
		date: '21 de Mar · 2026',
		dateLong: '21 de Março de 2026',
		type: 'Lazer',
		country: 'ANG',
		countryName: 'Angola',
		accent: 'sky',
		photos: [
			{ src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', alt: 'Praia de Cabo Ledo', caption: 'Cabo Ledo — Angola' },
		],
		featured: false,
	},
	{
		id: 12,
		title: 'Ola Malanje',
		subtitle: 'Turismo de natureza',
		description:
			'Roteiro por Malanje com visitas às Quedas de Calandula e paisagens naturais.',
		date: '21 e 23 de Mar · 2026',
		dateLong: '21 a 23 de Março de 2026',
		type: 'Viagem',
		country: 'ANG',
		countryName: 'Angola',
		accent: 'navy',
		photos: [
			{ src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80', alt: 'Quedas de Calandula', caption: 'Malanje — Angola' },
		],
		featured: false,
	},
	{
		id: 13,
		title: 'Ola Cabo Ledo',
		subtitle: 'Praia e lazer',
		description: 'Dia de praia em Cabo Ledo com a Ola Tours.',
		date: '04 de Abr · 2026',
		dateLong: '4 de Abril de 2026',
		type: 'Lazer',
		country: 'ANG',
		countryName: 'Angola',
		accent: 'sky',
		photos: [
			{ src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', alt: 'Praia de Cabo Ledo', caption: 'Cabo Ledo — Angola' },
		],
		featured: false,
	},
	{
		id: 14,
		title: 'Ola Namibe',
		subtitle: 'Deserto e litoral',
		description:
			'Roteiro pelo Namibe com visitas ao Deserto do Namibe e paisagens costeiras.',
		date: '02 a 05 de Abr · 2026',
		dateLong: '2 a 5 de Abril de 2026',
		type: 'Viagem',
		country: 'ANG',
		countryName: 'Angola',
		accent: 'flag',
		photos: [
			{ src: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80', alt: 'Deserto do Namibe', caption: 'Namibe — Angola' },
		],
		featured: false,
	},
	{
		id: 15,
		title: 'Ola Cabo Ledo',
		subtitle: 'Praia e lazer',
		description: 'Dia de praia em Cabo Ledo.',
		date: '02 de Mai · 2026',
		dateLong: '2 de Maio de 2026',
		type: 'Lazer',
		country: 'ANG',
		countryName: 'Angola',
		accent: 'sky',
		photos: [
			{ src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', alt: 'Praia de Cabo Ledo', caption: 'Cabo Ledo — Angola' },
		],
		featured: false,
	},
	{
		id: 16,
		title: 'Ola Lubango',
		subtitle: 'Serra e paisagem',
		description:
			'Roteiro pelo Lubango com visita à Serra da Leba e ao Cristo Rei.',
		date: '30 de Abr a 03 de Mai · 2026',
		dateLong: '30 de Abril a 3 de Maio de 2026',
		type: 'Viagem',
		country: 'ANG',
		countryName: 'Angola',
		accent: 'navy',
		photos: [
			{ src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', alt: 'Serra da Leba', caption: 'Lubango — Angola' },
		],
		featured: false,
	},
	{
		id: 17,
		title: 'Ola Benguela',
		subtitle: 'Costa e cultura',
		description:
			'Roteiro por Benguela com visitas às praias e centro histórico.',
		date: '17 a 20 de Set · 2026',
		dateLong: '17 a 20 de Setembro de 2026',
		type: 'Viagem',
		country: 'ANG',
		countryName: 'Angola',
		accent: 'flag',
		photos: [
			{ src: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=800&q=80', alt: 'Costa de Benguela', caption: 'Benguela — Angola' },
		],
		featured: false,
	},
	{
		id: 18,
		title: 'Ola Cabo Ledo',
		subtitle: 'Praia e lazer',
		description: 'Dia de praia em Cabo Ledo.',
		date: '19 de Set · 2026',
		dateLong: '19 de Setembro de 2026',
		type: 'Lazer',
		country: 'ANG',
		countryName: 'Angola',
		accent: 'sky',
		photos: [
			{ src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', alt: 'Praia de Cabo Ledo', caption: 'Cabo Ledo — Angola' },
		],
		featured: false,
	},
	{
		id: 19,
		title: 'Ola Malanje',
		subtitle: 'Turismo de natureza',
		description:
			'Roteiro por Malanje com visitas às Quedas de Calandula e Kalandula.',
		date: '31 de Out a 02 de Nov · 2026',
		dateLong: '31 de Outubro a 2 de Novembro de 2026',
		type: 'Viagem',
		country: 'ANG',
		countryName: 'Angola',
		accent: 'navy',
		photos: [
			{ src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80', alt: 'Quedas de Calandula', caption: 'Malanje — Angola' },
		],
		featured: false,
	},
	{
		id: 20,
		title: 'Ola Safari',
		subtitle: 'Experiência de safari',
		description: 'Mais um dia de safari inesquecível com a Ola Tours.',
		date: '11 de Nov · 2026',
		dateLong: '11 de Novembro de 2026',
		type: 'Experiência',
		country: 'ANG',
		countryName: 'Angola',
		accent: 'flag',
		photos: [
			{ src: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80', alt: 'Safari africano', caption: 'Experiência de safari' },
		],
		featured: false,
	},
	{
		id: 21,
		title: 'Réveillon 2027 · Dubai',
		subtitle: 'Viagem Internacional de Réveillon',
		description:
			'Viagem internacional de Réveillon para Dubai. Festa de Ano Novo no luxo do Dubai.',
		date: '30 de Dez a 03 de Jan · 2027',
		dateLong: '30 de Dezembro de 2026 a 3 de Janeiro de 2027',
		type: 'Viagem Internacional',
		country: 'ARE',
		countryName: 'Dubai - Emirados Árabes Unidos',
		accent: 'flag',
		photos: [
			{ src: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80', alt: 'Dubai skyline', caption: 'Dubai — Emirados Árabes Unidos' },
		],
		featured: true,
	},
];

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchEventos(): Promise<Evento[]> {
	await delay(500);
	return eventos;
}

export async function fetchEventoById(id: number): Promise<Evento | null> {
	await delay(300);
	return eventos.find((e) => e.id === id) ?? null;
}
