
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AppBar from '@/components/AppBar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ChatInterface from '@/components/ChatInterface';
import { Computer, Shield, Wifi, Wrench, ChevronRight, MessageSquare, Users, Check } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  
  const handleChatClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setChatOpen(true);
    }
  };
  
  const services = [
    {
      icon: <Computer className="h-12 w-12 text-blue-500" />,
      title: "Formatação de Computadores",
      description: "Formatação completa com backup de dados e reinstalação do sistema operacional."
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-500" />,
      title: "Remoção de Vírus",
      description: "Eliminação de vírus, malware e outros programas maliciosos do seu computador."
    },
    {
      icon: <Wifi className="h-12 w-12 text-blue-500" />,
      title: "Configuração de Redes",
      description: "Instalação e configuração de redes domésticas e empresariais."
    },
    {
      icon: <Wrench className="h-12 w-12 text-blue-500" />,
      title: "Reparo de Hardware",
      description: "Diagnóstico e reparo de problemas de hardware em computadores e notebooks."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <AppBar onChatClick={handleChatClick} />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Soluções em Tecnologia para o seu dia a dia
            </h1>
            <p className="text-lg md:text-xl mb-6 text-blue-100">
              Resolvemos seus problemas técnicos com rapidez e eficiência. Suporte especializado para computadores e dispositivos móveis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleChatClick} 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Falar com assistente virtual
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-blue-600"
                onClick={() => navigate('/services')}
              >
                Ver serviços
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="/placeholder.svg" 
              alt="Suporte Técnico" 
              className="rounded-lg shadow-lg max-w-full h-auto"
              width={500}
              height={300}
            />
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nossos Serviços</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg"
              >
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">{service.title}</h3>
                <p className="text-gray-600 text-center">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button 
              onClick={() => navigate('/services')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Ver todos os serviços
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Por que escolher a HelpTech?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Equipe Qualificada</h3>
              <p className="text-gray-600">
                Nossa equipe é composta por profissionais certificados e com vasta experiência no mercado de TI.
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Garantia de Serviço</h3>
              <p className="text-gray-600">
                Oferecemos garantia para todos os nossos serviços, assegurando a qualidade do nosso trabalho.
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Suporte Contínuo</h3>
              <p className="text-gray-600">
                Disponibilizamos canais de atendimento eficientes para resolver suas dúvidas a qualquer momento.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Virtual Assistant CTA Section */}
      <section className="py-12 md:py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Acesse Nosso Assistente Virtual
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Tire suas dúvidas, agende serviços e resolva problemas simples de forma rápida e eficiente com nossa tecnologia de atendimento automatizado.
          </p>
          <Button 
            onClick={handleChatClick} 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            Iniciar Chat
            <MessageSquare className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">HelpTech</h3>
              <p className="text-gray-400">Soluções em tecnologia para o seu dia a dia</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-3">Serviços</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Formatação</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Remoção de Vírus</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Redes</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Hardware</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">Empresa</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Sobre Nós</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Contato</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Carreiras</a></li>
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h4 className="text-lg font-semibold mb-3">Contato</h4>
                <p className="text-gray-400 mb-2">contato@helptech.com</p>
                <p className="text-gray-400 mb-2">(11) 5555-1234</p>
                <p className="text-gray-400">São Paulo, SP</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p className="text-gray-400">© {new Date().getFullYear()} HelpTech. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
      
      {/* Chat Dialog */}
      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogContent className="sm:max-w-[500px] h-[80vh] flex flex-col p-0">
          <div className="flex-1 overflow-hidden">
            <ChatInterface />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
