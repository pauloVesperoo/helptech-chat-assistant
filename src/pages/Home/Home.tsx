
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { ArrowRight, Bot, Laptop, Shield, Network, Wrench, Users, Calendar, PhoneCall, CheckCircle } from 'lucide-react';

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
    content: 'A HelpTech é uma empresa especializada em soluções tecnológicas, oferecendo suporte técnico de alta qualidade para computadores, notebooks, tablets e smartphones. Nossa equipe de profissionais altamente capacitados está pronta para resolver qualquer problema tecnológico com rapidez e eficiência.'
  });
  
  const [servicesContent, setServicesContent] = useState<ServicesContent>({
    title: 'Nossos Serviços',
    services: [
      {
        name: 'Formatação de Computadores',
        description: 'Reinstalação do sistema operacional e programas essenciais, recuperando o desempenho do seu equipamento.',
        icon: 'Laptop',
        price: 'R$ 120,00'
      },
      {
        name: 'Remoção de Vírus',
        description: 'Eliminação de malwares e proteção do sistema contra futuras infecções.',
        icon: 'Shield',
        price: 'R$ 100,00'
      },
      {
        name: 'Configuração de Redes',
        description: 'Instalação e configuração de redes Wi-Fi e cabeadas para residências e empresas.',
        icon: 'Network',
        price: 'R$ 150,00'
      },
      {
        name: 'Reparo de Hardware',
        description: 'Diagnóstico e conserto de problemas físicos em computadores e notebooks.',
        icon: 'Wrench',
        price: 'R$ 180,00'
      }
    ]
  });

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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
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

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{aboutContent.title}</h2>
          <div className="max-w-3xl mx-auto text-lg text-center leading-relaxed">
            <p>{aboutContent.content}</p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Equipe Especializada</h3>
              <p className="text-gray-600">Técnicos altamente qualificados para resolver qualquer problema.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Calendar size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Atendimento Rápido</h3>
              <p className="text-gray-600">Agendamentos realizados em até 24 horas após o contato.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <PhoneCall size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Suporte Remoto</h3>
              <p className="text-gray-600">Assistência remota para problemas simples e diagnósticos iniciais.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{servicesContent.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesContent.services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
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

      {/* Benefícios Section */}
      <section id="benefits" className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Por Que Escolher a HelpTech?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="text-blue-600">
                <CheckCircle size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Atendimento Personalizado</h3>
                <p className="text-gray-600">Compreendemos as necessidades específicas de cada cliente e oferecemos soluções sob medida.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="text-blue-600">
                <CheckCircle size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Rapidez no Diagnóstico</h3>
                <p className="text-gray-600">Nossos técnicos são treinados para identificar problemas rapidamente, economizando seu tempo.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="text-blue-600">
                <CheckCircle size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Garantia de Serviço</h3>
                <p className="text-gray-600">Oferecemos garantia em todos os nossos serviços, assegurando sua tranquilidade.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="text-blue-600">
                <CheckCircle size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Preços Justos</h3>
                <p className="text-gray-600">Trabalhamos com preços transparentes e competitivos, sem surpresas na fatura final.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Acesse seu assistente virtual section */}
      <section id="virtual-assistant" className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Acesse Seu Assistente Virtual</h2>
              <p className="text-lg mb-8">
                Precisa de ajuda imediata? Nosso assistente virtual está disponível 24/7 para responder suas dúvidas, 
                diagnosticar problemas comuns e agendar visitas técnicas sem que você precise esperar.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" />
                  <span>Diagnóstico inicial gratuito</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" />
                  <span>Agendamento facilitado</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" />
                  <span>Dicas para resolver problemas simples</span>
                </li>
              </ul>
              <Link to="/dashboard">
                <Button 
                  size="lg"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Bot size={20} />
                  Começar Agora
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                <div className="bg-blue-600 text-white p-3 rounded-t-md flex items-center">
                  <Bot size={20} className="mr-2" />
                  <h3 className="font-medium">Assistente HelpTech</h3>
                </div>
                <div className="p-4 h-64 bg-gray-50 rounded-b-md flex flex-col justify-end">
                  <div className="bg-blue-100 text-blue-800 p-3 rounded-lg rounded-bl-none inline-block max-w-[80%] mb-3">
                    Olá! Como posso ajudar você hoje?
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg rounded-br-none inline-block max-w-[80%] ml-auto mb-3">
                    Meu computador está muito lento.
                  </div>
                  <div className="bg-blue-100 text-blue-800 p-3 rounded-lg rounded-bl-none inline-block max-w-[80%]">
                    Entendi! Vamos diagnosticar o problema. O computador está assim há quanto tempo?
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 border-t mt-3">
                  <Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex-grow text-center">
                    Falar com o assistente
                  </Link>
                </div>
              </div>
            </div>
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
  );
};

export default Home;
