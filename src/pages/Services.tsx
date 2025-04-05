
import React from 'react';
import { Button } from '@/components/ui/button';
import { Monitor, Shield, Wrench, WifiIcon, Cpu, Database, Clock, CheckCircle2 } from 'lucide-react';
import AppBar from '@/components/AppBar';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AppBar />
      
      {/* Main content with padding for fixed header */}
      <div className="pt-16">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
          <div className="container mx-auto px-4 md:px-8 text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Nossas Soluções</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Oferecemos uma ampla gama de serviços de suporte técnico para atender às necessidades da sua empresa ou residência.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard 
                icon={<Monitor size={40} />}
                title="Suporte para Computadores"
                description="Reparos, manutenção e otimização de desktops e laptops para máximo desempenho."
              />
              <ServiceCard 
                icon={<Shield size={40} />}
                title="Segurança Digital"
                description="Proteção contra vírus, malware e outras ameaças digitais com soluções avançadas."
              />
              <ServiceCard 
                icon={<WifiIcon size={40} />}
                title="Configuração de Redes"
                description="Instalação e otimização de redes Wi-Fi e cabeadas para residências e empresas."
              />
              <ServiceCard 
                icon={<Wrench size={40} />}
                title="Manutenção Preventiva"
                description="Serviços regulares para evitar problemas futuros e prolongar a vida útil dos equipamentos."
              />
              <ServiceCard 
                icon={<Cpu size={40} />}
                title="Upgrades de Hardware"
                description="Melhore o desempenho do seu equipamento com atualizações de componentes."
              />
              <ServiceCard 
                icon={<Database size={40} />}
                title="Backup e Recuperação"
                description="Soluções para proteger seus dados importantes e recuperá-los em caso de perda."
              />
            </div>
          </div>
        </section>

        {/* Business Plans */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Planos para Empresas</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PlanCard 
                title="Básico"
                price="R$ 299,90"
                period="mensal"
                features={[
                  "Suporte remoto 8x5",
                  "1 visita mensal",
                  "Manutenção preventiva",
                  "Atendimento em até 24h"
                ]}
              />
              
              <PlanCard 
                title="Profissional"
                price="R$ 599,90"
                period="mensal"
                highlighted={true}
                features={[
                  "Suporte remoto 12x7",
                  "2 visitas mensais",
                  "Manutenção preventiva",
                  "Backup de dados",
                  "Atendimento prioritário em até 8h"
                ]}
              />
              
              <PlanCard 
                title="Empresarial"
                price="R$ 1.199,90"
                period="mensal"
                features={[
                  "Suporte remoto 24x7",
                  "Visitas ilimitadas",
                  "Manutenção preventiva",
                  "Backup de dados",
                  "Segurança avançada",
                  "Atendimento imediato"
                ]}
              />
            </div>
            
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">Precisa de um plano personalizado para sua empresa?</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Solicitar Orçamento
              </Button>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Pronto para resolver seus problemas técnicos?</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Nossa equipe de especialistas está preparada para ajudar com qualquer desafio tecnológico. Entre em contato hoje mesmo!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/support">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Solicitar Suporte
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  Falar com Especialista
                </Button>
              </Link>
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

// Service Card Component
const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg p-8 shadow-md transition-transform hover:transform hover:scale-105 flex flex-col h-full">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 flex-grow">{description}</p>
      <Link to="/support" className="mt-4 text-blue-600 hover:underline font-medium inline-flex items-center">
        Saiba mais
      </Link>
    </div>
  );
};

// Plan Card Component
const PlanCard = ({ title, price, period, features, highlighted = false }) => {
  return (
    <div className={`rounded-lg p-8 shadow-md flex flex-col h-full ${
      highlighted 
        ? 'bg-blue-600 text-white border-2 border-blue-700 transform scale-105' 
        : 'bg-white text-gray-800 border border-gray-200'
    }`}>
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <div className="flex justify-center items-baseline">
          <span className="text-3xl font-extrabold">{price}</span>
          <span className={`text-sm ml-1 ${highlighted ? 'text-blue-100' : 'text-gray-500'}`}>/{period}</span>
        </div>
      </div>
      
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Clock size={20} className={highlighted ? 'text-blue-200' : 'text-blue-600'} />
            <span className="ml-2">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button className={`mt-auto w-full ${
        highlighted 
          ? 'bg-white text-blue-600 hover:bg-blue-50' 
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}>
        Contratar Plano
      </Button>
    </div>
  );
};

export default Services;
