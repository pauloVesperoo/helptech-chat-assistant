
import React from 'react';
import ChatInterface from '@/components/ChatInterface';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 bg-gray-100">
      <header className="mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-helptech mb-2">HelpTech</h1>
        <p className="text-gray-600">Suporte Técnico Especializado para Computadores e Dispositivos Móveis</p>
      </header>
      
      <div className="flex-1 w-full max-w-2xl mx-auto">
        <ChatInterface />
      </div>
      
      <footer className="mt-6 text-center text-sm text-gray-500">
        <p>© 2025 HelpTech - Todos os direitos reservados</p>
        <p className="mt-1">Atendimento de segunda a sexta, das 8h às 18h</p>
      </footer>
    </div>
  );
};

export default Index;
