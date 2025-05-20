import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { ArrowRight, Bot, Laptop, Shield, Network, Wrench, PhoneCall, Calendar, CheckCircle, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import AppBar from '@/components/AppBar';
import ChatInterface from '@/components/ChatInterface';
import AboutSection from '@/components/AboutSection';

interface HeroContent {
  title: string;
  subtitle: string;
  buttonText: string;
}

interface AboutContent {
  title: string;
  content: string;
}

interface Service {
  name: string;
  description: string;
  icon: string;
  price: string;
}

interface ServicesContent {
  title: string;
  services: Service[];
}

const Home = () => {
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: 'HelpTech - Suporte Técnico Especializado',
    subtitle: 'Soluções em tecnologia para seu negócio e residência',
    buttonText: 'Fale com nosso assistente'
  });
  
  const [aboutContent, setAboutContent] = useState<AboutContent>({
    title: 'Quem Somos',
    content: 'A HelpTech é uma empresa especializada em soluções tecnológicas, oferecendo suporte técnico de alta qualidade para computadores, notebooks, tablets e smartphones.'
  });
  
  const [servicesContent, setServicesContent] = useState<ServicesContent>({
    title: 'O que fazemos',
    services: [
      {
        name: 'Formatação de Computadores',
        description: 'Reinstalação do sistema operacional e programas essenciais',
        icon: 'Laptop',
        price: 'R$ 120,00'
      },
      {
        name: 'Remoção de Vírus',
        description: 'Eliminação de malwares e proteção do sistema',
        icon: 'Shield',
        price: 'R$ 100,00'
      }
    ]
  });

  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const { data: heroData } = await supabase
          .from('site_settings')
          .select('content')
          .eq('section', 'home_hero')
          .single();
          
        const { data: aboutData } = await supabase
          .from('site_settings')
          .select('content')
          .eq('section', 'about_us')
          .single();
          
        const { data: servicesData } = await supabase
          .from('site_settings')
          .select('content')
          .eq('section', 'services')
          .single();
        
        // Use proper type checking and casting
        if (heroData && typeof heroData.content === 'object' && !Array.isArray(heroData.content)) {
          const content = heroData.content as Record<string, any>;
          if ('title' in content && 'subtitle' in content && 'buttonText' in content) {
            setHeroContent({
              title: content.title as string,
              subtitle: content.subtitle as string,
              buttonText: content.buttonText as string
            });
          }
        }
        
        if (aboutData && typeof aboutData.content === 'object' && !Array.isArray(aboutData.content)) {
          const content = aboutData.content as Record<string, any>;
          if ('title' in content && 'content' in content) {
            setAboutContent({
              title: content.title as string,
              content: content.content as string
            });
          }
        }
        
        if (servicesData && typeof servicesData.content === 'object' && !Array.isArray(servicesData.content)) {
          const content = servicesData.content as Record<string, any>;
          if ('title' in content && 'services' in content && Array.isArray(content.services)) {
            setServicesContent({
              title: content.title as string,
              services: content.services.map((service: any) => ({
                name: service.name as string,
                description: service.description as string,
                icon: service.icon as string,
                price: service.price as string
              }))
            });
          }
        }
      } catch (error) {
        console.error('Erro ao carregar configurações do site:', error);
      }
    };
    
    fetchSiteSettings();
  }, []);

  const getIconComponent = (iconName: string, size = 40) => {
    switch (iconName) {
      case 'Laptop': return <Laptop size={size} />;
      case 'Shield': return <Shield size={size} />;
      case 'Network': return <Network size={size} />;
      case 'Wrench': return <Wrench size={size} />;
      default: return <Bot size={size} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* AppBar */}
      <AppBar onChatClick={() => setShowChat(true)} />
      
      {/* Main content with padding for fixed header */}
      <div className="pt-16">
        {/* Hero Section */}
        <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{heroContent.title}</h1>
                <p className="text-xl md:text-2xl mb-6">{heroContent.subtitle}</p>
                <Link to="/dashboard">
                  <Button 
                    size="lg" 
                    className="flex items-center gap-2 bg-white text-blue-700 hover:bg-gray-100"
                  >
                    <Bot size={20} />
                    {heroContent.buttonText}
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&h=400" 
                  alt="Suporte técnico" 
                  className="rounded-lg shadow-lg max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </header>

        {/* About Section - Nova seção melhorada */}
        <AboutSection />
        
        {/* AI Assistant Preview Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">Conheça Nosso Assistente Virtual</h2>
            <p className="text-lg text-center max-w-3xl mx-auto mb-12">
              Nosso assistente virtual inteligente está disponível 24/7 para ajudar com diagnósticos técnicos, 
              recomendações e agendamento de serviços. Experimente agora!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
                <div className="bg-blue-600 rounded-t-lg p-3 text-white mb-4">
                  <div className="flex items-center gap-2">
                    <Bot size={20} />
                    <span className="font-semibold">Assistente HelpTech</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-blue-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-sm">Olá! Como posso ajudar com seu computador hoje?</p>
                  </div>
                  
                  <div className="bg-gray-100 p-3 rounded-lg rounded-tr-none ml-auto max-w-[80%]">
                    <p className="text-sm">Meu notebook está esquentando muito e ficando lento.</p>
                  </div>
                  
                  <div className="bg-blue-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-sm">Isso pode indicar problema de refrigeração ou acúmulo de poeira. Posso agendar uma limpeza e manutenção para você.</p>
                  </div>
                  
                  <div className="bg-gray-100 p-3 rounded-lg rounded-tr-none ml-auto max-w-[80%]">
                    <p className="text-sm">Sim, por favor. Quais horários estão disponíveis?</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-blue-700">Como Nosso Assistente Pode Ajudar:</h3>
                
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-700">
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Diagnósticos Inteligentes</h4>
                      <p className="text-gray-600">Análise de problemas comuns em computadores, smartphones e rede Wi-Fi com soluções precisas e personalizadas.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-700">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Agendamento Simples</h4>
                      <p className="text-gray-600">Marque visitas técnicas ou serviços remotos diretamente pelo chat, escolhendo data e horário que melhor se adaptem à sua rotina.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-700">
                      <CheckCircle size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Acompanhamento Completo</h4>
                      <p className="text-gray-600">Receba atualizações sobre o status do seu atendimento e recomendações de manutenção preventiva para seus dispositivos.</p>
                    </div>
                  </div>
                </div>
                
                <Link to="/dashboard">
                  <Button className="mt-4 flex items-center gap-2">
                    <Bot size={18} />
                    Falar com o Assistente
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">{servicesContent.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {servicesContent.services.map((service, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg p-6 shadow-md transition-transform hover:transform hover:scale-105"
                >
                  <div className="text-blue-600 mb-4">
                    {getIconComponent(service.icon)}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <p className="font-bold text-blue-600">{service.price}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/dashboard">
                <Button 
                  className="flex items-center gap-2"
                >
                  <Bot size={18} />
                  Falar com um Especialista
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Como Funciona Nosso Atendimento</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-700">
                  <MessageSquare size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Descreva o Problema</h3>
                <p className="text-gray-600">Converse com nosso assistente virtual e explique o problema que está enfrentando.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-700">
                  <Bot size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Receba Diagnóstico</h3>
                <p className="text-gray-600">Nosso assistente fará perguntas específicas para entender e diagnosticar o problema.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-700">
                  <Calendar size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Agende o Serviço</h3>
                <p className="text-gray-600">Escolha a data e horário mais convenientes para o atendimento técnico.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-700">
                  <Wrench size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">4. Solução Garantida</h3>
                <p className="text-gray-600">Nossos técnicos especializados resolverão seu problema com qualidade e garantia.</p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/dashboard">
                <Button 
                  size="lg"
                  className="flex items-center gap-2"
                >
                  <Bot size={20} />
                  Começar Agora
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-10 mt-auto">
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

export default Home;
