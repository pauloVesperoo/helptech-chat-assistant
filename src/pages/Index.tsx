
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, Laptop, Shield, Wrench, PhoneCall, Calendar, Check } from 'lucide-react';
import ChatInterface from '@/components/ChatInterface';
import { Link } from 'react-router-dom';
import AppBar from '@/components/AppBar';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  if (showChat) {
    return (
      <div className="min-h-screen flex flex-col p-4 md:p-8 bg-gray-100">
        <div className="mb-4">
          <Button 
            variant="outline" 
            onClick={() => setShowChat(false)}
            className="flex items-center gap-2"
          >
            <ArrowRight className="rotate-180" size={16} />
            Voltar para a página inicial
          </Button>
        </div>
        
        <div className="flex-1 w-full max-w-2xl mx-auto">
          <ChatInterface />
        </div>
        
        <footer className="mt-6 text-center text-sm text-gray-500">
          <p>© 2025 HelpTech - Todos os direitos reservados</p>
          <p className="mt-1">Atendimento de segunda a sexta, das 8h às 18h</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* AppBar */}
      <AppBar onChatClick={() => setShowChat(true)} />
      
      {/* Main content with padding for fixed header */}
      <div className="pt-16">
        {/* Hero Section */}
        <header id="home" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">HelpTech</h1>
                <p className="text-xl md:text-2xl mb-6">Suporte Técnico Especializado para Computadores e Dispositivos Móveis</p>
                <p className="mb-8">Solução rápida e eficiente para todos os seus problemas tecnológicos</p>
                <Button 
                  size="lg" 
                  onClick={() => setShowChat(true)}
                  className="flex items-center gap-2 bg-white text-blue-700 hover:bg-gray-100"
                >
                  <Bot size={20} />
                  Falar com um Especialista
                </Button>
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

        {/* Assistant Preview Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-6">Conheça Nosso Assistente Virtual</h2>
            <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
              Resolva seus problemas técnicos e agende serviços de forma rápida e prática com o nosso assistente virtual inteligente.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="bg-gray-100 rounded-lg p-6 shadow-md max-w-md mx-auto">
                <div className="bg-blue-600 rounded-t-lg p-4 text-white mb-4">
                  <div className="flex items-center gap-2">
                    <Bot size={20} />
                    <span className="font-bold">Assistente HelpTech</span>
                  </div>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg rounded-tl-none mb-3 max-w-[80%]">
                  <p className="text-sm">Olá! Como posso ajudar você hoje com seu computador ou dispositivo?</p>
                </div>
                <div className="bg-gray-200 p-3 rounded-lg rounded-tr-none mb-3 ml-auto max-w-[80%]">
                  <p className="text-sm">Meu computador está muito lento. O que posso fazer?</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                  <p className="text-sm">Posso ajudar com isso! Vamos verificar algumas possíveis causas e agendar uma manutenção se necessário.</p>
                </div>
              </div>
              
              <div className="flex flex-col space-y-6">
                <h3 className="text-2xl font-semibold text-blue-700">Recursos do Assistente:</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Check size={20} className="text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Diagnóstico Inteligente</h4>
                      <p className="text-gray-600">Identificação rápida de problemas comuns em computadores e dispositivos.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Check size={20} className="text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Agendamento de Serviços</h4>
                      <p className="text-gray-600">Marque atendimentos técnicos diretamente pelo chat, sem complicações.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Check size={20} className="text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Suporte 24/7</h4>
                      <p className="text-gray-600">Assistência virtual disponível a qualquer hora para ajudar com suas dúvidas.</p>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={() => setShowChat(true)}
                  className="flex items-center gap-2 mt-6 w-fit"
                >
                  <Bot size={18} />
                  Iniciar Conversa Agora
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <Bot size={32} className="text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">1. Converse com o Assistente</h3>
                  <p className="text-gray-600">Descreva seu problema ou necessidade para nosso assistente virtual inteligente.</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <Wrench size={32} className="text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">2. Obtenha Diagnóstico</h3>
                  <p className="text-gray-600">Receba uma avaliação inicial e recomendações para resolver seu problema.</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <Calendar size={32} className="text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">3. Agende um Serviço</h3>
                  <p className="text-gray-600">Se necessário, agende facilmente um atendimento técnico para resolver seu problema.</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-center mt-12">
              <Button 
                onClick={() => setShowChat(true)}
                size="lg"
                className="flex items-center gap-2"
              >
                <Bot size={20} />
                Experimentar Agora
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicos" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Nossos Serviços</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ServiceCard 
                icon={<Laptop size={40} />}
                title="Formatação de Computadores"
                description="Restauramos seu computador ao estado original, removendo vírus e melhorando o desempenho."
              />
              <ServiceCard 
                icon={<Shield size={40} />}
                title="Remoção de Vírus"
                description="Eliminamos qualquer malware, spyware ou vírus que esteja comprometendo seu dispositivo."
              />
              <ServiceCard 
                icon={<Bot size={40} />}
                title="Configuração de Redes"
                description="Configuramos e otimizamos sua rede Wi-Fi ou cabeada para máxima performance."
              />
              <ServiceCard 
                icon={<Wrench size={40} />}
                title="Reparo de Hardware"
                description="Consertamos peças quebradas ou defeituosas em seu computador ou dispositivo móvel."
              />
            </div>
            <div className="text-center mt-12">
              <Button 
                onClick={() => setShowChat(true)}
                className="flex items-center gap-2 mx-auto bg-blue-600 hover:bg-blue-700"
              >
                <Bot size={18} />
                Falar com um Especialista
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contato" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Entre em Contato</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="bg-white rounded-lg p-8 shadow-md flex-1">
                <h3 className="text-xl font-semibold mb-4">Informações de Contato</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <PhoneCall size={20} className="text-blue-600" />
                    <span>(11) 5555-1234</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Bot size={20} className="text-blue-600" />
                    <span>contato@helptech.com.br</span>
                  </div>
                  <p className="pt-4">
                    Atendimento de segunda a sexta, das 8h às 18h
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex flex-col items-center">
                <p className="text-lg mb-6 text-center">
                  Precisa de ajuda imediata? Fale com nosso assistente virtual!
                </p>
                <Button 
                  size="lg" 
                  onClick={() => setShowChat(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Bot size={20} />
                  Falar com um Especialista
                </Button>
              </div>
            </div>
          </div>
        </section>

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
    <div className="bg-white rounded-lg p-6 shadow-md transition-transform hover:transform hover:scale-105">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Index;
