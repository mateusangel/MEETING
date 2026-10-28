export interface RegistrationFormData {
  // Informações do Casal
  maridoNome: string;
  esposaNome: string;
  maridoNascimento: string;
  esposaNascimento: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  estadoCivil: string;
  dataCasamento: string;
  grupoDeVida: string;
  liderGVC: string;
  telefoneLiderGVC: string;

  // Informações dos Filhos
  temFilhos: string;
  quantosFilhos: string;
  filho1: string;
  filho2: string;
  filho3: string;

  // Telefones / Redes
  maridoCelular: string;
  esposaCelular: string;
  maridoEmail: string;
  esposaEmail: string;
  maridoRedeSocial: string;
  esposaRedeSocial: string;

  // Informações Pessoais - Marido
  maridoProfissao: string;
  maridoMembroIgreja: string;
  maridoQualIgreja: string;
  maridoAfastado: string;
  maridoDieta: string;

  // Informações Pessoais - Esposa
  esposaProfissao: string;
  esposaMembroIgreja: string;
  esposaQualIgreja: string;
  esposaAfastada: string;
  esposaDieta: string;

  // Filiação Marido
  maridoPaiNome: string;
  maridoMaeNome: string;
  maridoPaisTelefones: string;

  // Filiação Esposa
  esposaPaiNome: string;
  esposaMaeNome: string;
  esposaPaisTelefones: string;

  // Visita
  visitaDiaSemana: string;
  visitaHorario: string;

  // Pesquisa
  comoSoube: string;
  amigoNome: string;
  amigoTelefone: string;

  // Confirmação
  termoAceito: boolean;
}

export interface StoredRegistration {
  id: string;
  voucherCode: string;
  createdAt: string;
  data: RegistrationFormData;
  syncedToGoogleForms: boolean;
  paymentStatus: 'pending' | 'completed';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'banquete' | 'louvor' | 'comunhao' | 'local';
  imageSrc: string;
  webpSrc: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
