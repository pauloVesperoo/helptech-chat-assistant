
export interface FAQ {
  question: string;
  answer: string;
}

export const faqList: FAQ[] = [
  {
    question: "Quais são os serviços oferecidos pela HelpTech?",
    answer: "Oferecemos diversos serviços de suporte técnico, incluindo formatação de PC, remoção de vírus, configuração de rede e reparo de hardware para computadores e dispositivos móveis."
  },
  {
    question: "Quanto custa uma formatação de PC?",
    answer: "O preço da formatação de PC varia de acordo com o tipo de serviço necessário. Uma formatação básica com instalação do Windows custa a partir de R$100. Para um orçamento personalizado, informe mais detalhes sobre seu equipamento."
  },
  {
    question: "Como posso agendar um atendimento?",
    answer: "Você pode agendar um atendimento diretamente pelo nosso chat, informando o tipo de serviço, data e horário desejados. Também aceitamos agendamentos por telefone ou WhatsApp."
  },
  {
    question: "Vocês atendem em domicílio?",
    answer: "Sim, oferecemos atendimento em domicílio para maior comodidade. O valor da visita técnica varia conforme a região e é combinado no momento do agendamento."
  },
  {
    question: "Qual o prazo para conclusão dos serviços?",
    answer: "O prazo varia de acordo com o serviço. Formatações simples geralmente são concluídas em 24h, enquanto reparos de hardware podem levar de 2 a 5 dias úteis, dependendo da disponibilidade de peças."
  },
  {
    question: "Vocês oferecem garantia?",
    answer: "Sim, todos os nossos serviços possuem garantia. Serviços de software têm garantia de 30 dias e reparos de hardware de 90 dias."
  },
  {
    question: "Meu computador está lento, o que pode ser?",
    answer: "Computadores lentos podem ter diversas causas, como vírus, excesso de programas instalados, pouco espaço em disco ou hardware desatualizado. Podemos realizar um diagnóstico completo para identificar o problema específico."
  },
  {
    question: "Vocês recuperam dados de HD com defeito?",
    answer: "Sim, oferecemos serviço de recuperação de dados para HDs com defeito. A taxa de sucesso depende do tipo e gravidade do problema, mas temos alta taxa de recuperação na maioria dos casos."
  }
];

export interface Service {
  id: string;
  name: string;
  description: string;
  priceRange: string;
  estimatedTime: string;
}

export const servicesList: Service[] = [
  {
    id: "formatting",
    name: "Formatação de PC",
    description: "Reinstalação do sistema operacional, drivers e programas básicos. Inclui backup de dados (quando possível) e configuração inicial.",
    priceRange: "R$100 - R$200",
    estimatedTime: "24h - 48h"
  },
  {
    id: "virus",
    name: "Remoção de Vírus",
    description: "Varredura completa do sistema, eliminação de malwares, vírus, spywares e outros programas maliciosos. Inclui otimização do sistema.",
    priceRange: "R$80 - R$150",
    estimatedTime: "24h - 72h"
  },
  {
    id: "network",
    name: "Configuração de Rede",
    description: "Instalação e configuração de roteadores, repetidores, switches e demais equipamentos de rede. Otimização de sinal Wi-Fi e solução de problemas de conectividade.",
    priceRange: "R$70 - R$180",
    estimatedTime: "1h - 4h"
  },
  {
    id: "hardware",
    name: "Reparo de Hardware",
    description: "Diagnóstico e conserto de componentes de hardware danificados. Substituição de peças, upgrade de componentes e limpeza interna.",
    priceRange: "R$100 - R$500+",
    estimatedTime: "2 - 5 dias úteis"
  }
];
