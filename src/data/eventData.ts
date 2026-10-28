import { FAQItem, GalleryItem } from '../types';

export const EVENT_DETAILS = {
  edition: '72º',
  title: '72º Encontro de Casais INVA',
  subtitle: 'Ministério Famílias Integradas · Igreja Nova Vida de Alcântara',
  headline: 'O Casamento é uma Aliança Eterna: Dois Dias Para Renovar Seu Amor e Fortalecer Sua Família',
  description:
    'Ficha de Inscrição para o Casal participar do Encontro de Casais da Igreja Nova Vida de Alcântara que será realizado nos dias 01 e 02 de maio de 2027 no Casarão Terra Santa em Itaboraí / RJ.',
  datesText: '01 e 02 de Maio de 2027',
  datesISO: '2027-05-01T08:00:00-03:00',
  venueName: 'Casarão Terra Santa',
  venueLocation: 'Itaboraí — Rio de Janeiro / RJ',
  investmentText: '1º Lote Aberto',
  investmentCents: 99000,
  batchText: '1º Lote Exclusivo',
  paymentInfo: 'A inscrição pode ser parcelada em até 12x no cartão via PagBank.',
  paymentUrl: 'https://sacola.pagbank.com.br/7f90fb8d-0ea8-44f9-b11f-b73ca1e192c6',
  googleFormUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSdqNGkkPI3t3RMG3p52te3z68oAIR5cYRvKf8OOPrJbqpBtbA/formResponse',
  bibleVerse: {
    text: '“Por isso, deixa o homem pai e mãe e se une à sua mulher, tornando-se os dois uma só carne.”',
    reference: 'Gênesis 2:24',
  },
  contact: {
    church: 'Igreja Nova Vida de Alcântara',
    ministry: 'Ministério Famílias Integradas (MFI)',
    address: 'Rua Nestor Pinto Alves, 181 — Alcântara, São Gonçalo — RJ',
    phone: '(21) 2010-0804',
    whatsapp: '(21) 98868-1942',
    whatsappRaw: '5521988681942',
    email: 'encontrodecasais.inva@gmail.com',
    instagramUrl: 'https://www.instagram.com',
  },
  videoPreviewUrl: 'https://drive.google.com/file/d/1Xsk_rq4UHtlZVTHkunw8y6WuFQeNRYWG/preview',
};

// Exact Google Form field IDs extracted from the official form
export const GOOGLE_FORM_ENTRIES = {
  // Informações do Casal
  maridoNome: 'entry.692936624',
  esposaNome: 'entry.677279803',
  maridoNascimento: 'entry.480467751',
  esposaNascimento: 'entry.1271830798',
  endereco: 'entry.516139326',
  numero: 'entry.1180529286',
  bairro: 'entry.1453742086',
  cidade: 'entry.213701653',
  estado: 'entry.1080779676',
  estadoCivil: 'entry.788570593',
  dataCasamento: 'entry.705556063',
  grupoDeVida: 'entry.1185659101',
  liderGVC: 'entry.1393114660',
  telefoneLiderGVC: 'entry.1802493382',

  // Filhos
  temFilhos: 'entry.911631785',
  quantosFilhos: 'entry.1890569957',
  filho1: 'entry.1588474724',
  filho2: 'entry.1284648721',
  filho3: 'entry.1028890445',

  // Telefones / Redes
  maridoCelular: 'entry.1065957409',
  esposaCelular: 'entry.1967791119',
  maridoEmail: 'entry.825811077',
  esposaEmail: 'entry.1305666844',
  maridoRedeSocial: 'entry.1668201653',
  esposaRedeSocial: 'entry.231518344',

  // Informações Pessoais Marido
  maridoProfissao: 'entry.153129303',
  maridoMembroIgreja: 'entry.813243003',
  maridoQualIgreja: 'entry.656774526',
  maridoAfastado: 'entry.1339124841',
  maridoDieta: 'entry.1600351032',

  // Informações Pessoais Esposa
  esposaProfissao: 'entry.214209975',
  esposaMembroIgreja: 'entry.1356413409',
  esposaQualIgreja: 'entry.789323757',
  esposaAfastada: 'entry.804737113',
  esposaDieta: 'entry.2081808601',

  // Filiação Marido
  maridoPaiNome: 'entry.1488108611',
  maridoMaeNome: 'entry.2043348551',
  maridoPaisTelefones: 'entry.1811176013',

  // Filiação Esposa
  esposaPaiNome: 'entry.1382739092',
  esposaMaeNome: 'entry.1704024955',
  esposaPaisTelefones: 'entry.1903049788',

  // Visita
  visitaDiaSemana: 'entry.1698649355',
  visitaHorario: 'entry.1764435793',

  // Pesquisa
  comoSoube: 'entry.2042283744',
  amigoNome: 'entry.143489481',
  amigoTelefone: 'entry.1696565585',

  // Finalizar
  finalizarInscricao: 'entry.813843091',
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: 'Comunhão e Celebração dos Casais',
    category: 'comunhao',
    imageSrc: '/assets/opt/DSCF6094.jpg',
    webpSrc: '/assets/opt/DSCF6094.webp',
    description: 'Encerramento emocionante com todas as famílias reunidas celebrando a restauração e a união conjugal.',
  },
  {
    id: '2',
    title: 'Jantar de Gala & Ambiente Romântico',
    category: 'banquete',
    imageSrc: '/assets/opt/31052025-WAG_8974.jpg',
    webpSrc: '/assets/opt/31052025-WAG_8974.webp',
    description: 'Noite inesquecível com decoração intimista, iluminação especial e jantar exclusivo para cada casal.',
  },
  {
    id: '3',
    title: 'Ministrações e Adoração Profunda',
    category: 'louvor',
    imageSrc: '/assets/opt/31052025-WAG_9297.jpg',
    webpSrc: '/assets/opt/31052025-WAG_9297.webp',
    description: 'Momentos tocantes de oração a dois, quebra de barreiras e alinhamento do lar com a Palavra.',
  },
  {
    id: '4',
    title: 'Amor, Cumplicidade e Renovação',
    category: 'comunhao',
    imageSrc: '/assets/opt/31052025-WAG_8925.jpg',
    webpSrc: '/assets/opt/31052025-WAG_8925.webp',
    description: 'Sorrisos e reconciliação em uma atmosfera repleta da presença do Espírito Santo.',
  },
  {
    id: '5',
    title: 'Aliança Firmada no Altar',
    category: 'louvor',
    imageSrc: '/assets/opt/31052025-WAG_9395.jpg',
    webpSrc: '/assets/opt/31052025-WAG_9395.webp',
    description: 'Casais orando um pelo outro, renovando votos e recebendo a unção pastoral sobre o casamento.',
  },
  {
    id: '6',
    title: 'Paz e Natureza no Casarão Terra Santa',
    category: 'local',
    imageSrc: '/assets/opt/DSCF5987.jpg',
    webpSrc: '/assets/opt/DSCF5987.webp',
    description: 'Ambiente cercado de verde, tranquilidade e estrutura perfeita para descanso a dois.',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'O que está incluso na vaga do casal no 1º Lote?',
    answer:
      'A vaga é válida para o CASAL e inclui a estadia completa durante os dois dias no Casarão Terra Santa em Itaboraí/RJ, todas as refeições (café da manhã colonial, almoço com sabor caseiro, coquetéis e o Jantar Romântico de Gala dos Namorados), kit do casal com materiais de apoio e participação em todas as palestras, dinâmicas e ministrações pastorais.',
  },
  {
    question: 'Como e quando tenho acesso ao link de pagamento?',
    answer:
      'O link oficial de pagamento é liberado imediatamente na tela após o preenchimento da ficha de inscrição. Você poderá parcelar em até 12x no cartão de crédito através da Sacola Oficial do PagBank ou realizar o pagamento à vista.',
  },
  {
    question: 'Quem pode participar do Encontro de Casais?',
    answer:
      'Todos os casais: casados civilmente, noivos ou em união estável que desejam alinhar seu relacionamento segundo o coração de Deus. Casais que estão passando por crises ou casais que já vivem em harmonia e querem fortalecer ainda mais a aliança são muito bem-vindos.',
  },
  {
    question: 'Podemos levar filhos pequenos ou bebês?',
    answer:
      'Para que o casal viva uma experiência 100% focada um no outro e aproveite ao máximo cada dinâmica, ministração e momento de descanso sem distrações, o encontro é exclusivo para o casal, sem a presença de crianças.',
  },
  {
    question: 'O que devemos levar na bagagem?',
    answer:
      'Roupas confortáveis para as palestras diurnas e momentos ao ar livre, roupas especiais para o Jantar de Gala dos Casais no sábado à noite, itens de higiene pessoal e a sua Bíblia.',
  },
  {
    question: 'Minha inscrição é confirmada na hora?',
    answer:
      'Sim! Ao enviar a ficha em nosso site, os dados são imediatamente registrados na planilha oficial do Ministério de Famílias Integradas e um comprovante de inscrição é gerado na tela com código único para você guardar ou enviar à secretaria do evento.',
  },
];

export const WHAT_IS_INCLUDED = [
  'Hospedagem completa no Casarão Terra Santa (Itaboraí/RJ)',
  'Alimentação completa durante os 2 dias (café, almoço e coffee breaks)',
  'Jantar de Gala Exclusivo à luz de velas para os casais',
  'Acesso a todas as ministrações, palestras e dinâmicas',
  'Kit oficial do casal com material e brindes comemorativos',
  'Momentos de aconselhamento pastoral e oração individual',
];
