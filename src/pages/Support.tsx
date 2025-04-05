import React from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle, MessageSquare, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import AppBar from '@/components/AppBar';
import { Link } from 'react-router-dom';

const Support = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AppBar />
      
      {/* Main content with padding for fixed header */}
      <div className="pt-16">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
          <div className="container mx-auto px-4 md:px-8 text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Suporte Técnico</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Estamos aqui para ajudar você a resolver todos os seus problemas técnicos de forma rápida e eficiente.
            </p>
          </div>
        </div>

        {/* Support Options */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Como Podemos Ajudar?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <SupportOption 
                icon={<MessageSquare size={40} />}
                title="Chat Online"
                description="Converse com um de nossos técnicos em tempo real para resolver problemas simples rapidamente."
                buttonText="Iniciar Chat"
                buttonLink="/"
              />
              
              <SupportOption 
                icon={<Phone size={40} />}
                title="Suporte por Telefone"
                description="Ligue para nossa central de atendimento e receba orientações por telefone."
                buttonText="(11) 5555-1234"
                buttonVariant="outline"
              />
              
              <SupportOption 
                icon={<HelpCircle size={40} />}
                title="Base de Conhecimento"
                description="Acesse nossa base de conhecimento com tutoriais e soluções para problemas comuns."
                buttonText="Ver Artigos"
                buttonLink="/blog"
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <FaqItem 
                question="Como faço para agendar um atendimento técnico?" 
                answer="Você pode agendar um atendimento técnico através do nosso chat online, por telefone ou preenchendo o formulário de contato em nosso site. Nossa equipe entrará em contato para confirmar a data e horário conforme nossa disponibilidade." 
              />
              
              <FaqItem 
                question="Quais são os horários de atendimento?" 
                answer="Nosso atendimento regular é de segunda a sexta, das 8h às 18h. Para clientes com planos empresariais, oferecemos suporte estendido conforme o contrato." 
              />
              
              <FaqItem 
                question="Vocês atendem a domicílio?" 
                answer="Sim, oferecemos atendimento a domicílio para problemas que não possam ser resolvidos remotamente. O valor da visita técnica varia conforme a região e complexidade do problema." 
              />
              
              <FaqItem 
                question="Como funciona o suporte remoto?" 
                answer="Nosso suporte remoto é realizado através de softwares seguros que permitem que nossos técnicos acessem seu computador com sua autorização para diagnosticar e resolver problemas sem necessidade de visita técnica." 
              />
              
              <FaqItem 
                question="Qual a garantia dos serviços?" 
                answer="Todos os nossos serviços possuem garantia de 30 dias. Se o mesmo problema persistir dentro desse período, realizaremos um novo atendimento sem custos adicionais." 
              />
            </div>
            
            <div className="text-center mt-12">
              <Link to="/blog">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  Ver todas as perguntas
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Entre em Contato</h2>
              
              <div className="bg-gray-50 rounded-lg p-8 shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Envie sua Mensagem</h3>
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                        <input
                          type="text"
                          id="name"
                          placeholder="Seu nome completo"
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          id="email"
                          placeholder="seu.email@exemplo.com"
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Assunto</label>
                        <input
                          type="text"
                          id="subject"
                          placeholder="Motivo do contato"
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                        <textarea
                          id="message"
                          rows={4}
                          placeholder="Descreva seu problema ou dúvida..."
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Enviar Mensagem
                      </Button>
                    </form>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Informações de Contato</h3>
                    <div className="space-y-6">
                      <ContactInfo 
                        icon={<Phone size={20} />}
                        title="Telefone"
                        content="(11) 5555-1234"
                      />
                      <ContactInfo 
                        icon={<Mail size={20} />}
                        title="Email"
                        content="suporte@helptech.com.br"
                      />
                      <ContactInfo 
                        icon={<Clock size={20} />}
                        title="Horário de Atendimento"
                        content="Segunda a Sexta, 8h às 18h"
                      />
                      <div className="pt-6 mt-6 border-t border-gray-200">
                        <h4 className="font-medium text-gray-700 mb-2">Atendimento Empresarial</h4>
                        <p className="text-gray-600">
                          Para clientes com contrato empresarial, oferecemos canais exclusivos de atendimento 24/7. Consulte seu gerente de conta.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-10">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold">HelpTech</h2>
                <p>Suporte Técnico Especializado</p>
              </div>
              <div className="text-center md:text-right">
                <p>© 2025 HelpTech - Todos os direitos reservados</p>
                <p className="mt-1">Atendimento de segunda a sexta, das 8h às 18h</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Support Option Component
const SupportOption = ({ 
  icon, 
  title, 
  description, 
  buttonText, 
  buttonLink = "#", 
  buttonVariant = "default" 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  buttonText: string; 
  buttonLink?: string; 
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"; 
}) => {
  return (
    <div className="bg-white rounded-lg p-8 shadow-md transition-transform hover:transform hover:scale-105 flex flex-col h-full">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 flex-grow">{description}</p>
      {buttonLink === "#" ? (
        <Button 
          variant={buttonVariant} 
          className={`mt-4 ${buttonVariant === "outline" ? "border-blue-600 text-blue-600" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {buttonText}
        </Button>
      ) : (
        <Link to={buttonLink} className="mt-4">
          <Button 
            variant={buttonVariant} 
            className={`w-full ${buttonVariant === "outline" ? "border-blue-600 text-blue-600" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {buttonText}
          </Button>
        </Link>
      )}
    </div>
  );
};

// FAQ Item Component
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="w-full px-6 py-4 text-left font-medium flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-6 py-4 bg-gray-50">
          <p className="text-gray-600">{answer}</p>
        </div>
      </div>
    </div>
  );
};

// Contact Info Component
const ContactInfo = ({ icon, title, content }) => {
  return (
    <div className="flex items-start">
      <div className="text-blue-600 mr-3">{icon}</div>
      <div>
        <h4 className="font-medium text-gray-700">{title}</h4>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
};

export default Support;
