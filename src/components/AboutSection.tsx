
import React from 'react';
import { CheckCircle, Users, Award, Clock } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Quem Somos</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Há mais de 10 anos oferecendo soluções tecnológicas de qualidade e atendimento personalizado
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=600&h=400" 
                  alt="Equipe HelpTech" 
                  className="rounded-lg shadow-xl w-full h-auto"
                />
              </div>
              <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 -z-10 w-4/5 h-4/5 bg-blue-100 rounded-lg"></div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Nossa História</h3>
            <p className="text-gray-600">
              Fundada em 2015, a <span className="font-semibold text-blue-600">HelpTech</span> nasceu da paixão 
              por tecnologia e da percepção da necessidade de um suporte técnico que fosse realmente 
              acessível e compreensível para todos os usuários, independentemente do seu nível de conhecimento técnico.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="text-blue-600 mt-1">
                  <CheckCircle size={22} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Atendimento Personalizado</h4>
                  <p className="text-gray-600">Cada cliente é único e merece uma solução adaptada às suas necessidades específicas.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-blue-600 mt-1">
                  <CheckCircle size={22} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Tecnologia de Ponta</h4>
                  <p className="text-gray-600">Utilizamos as ferramentas e técnicas mais modernas para diagnósticos precisos e soluções eficazes.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-blue-600 mt-1">
                  <CheckCircle size={22} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Transparência Total</h4>
                  <p className="text-gray-600">Explicamos cada etapa do processo e garantimos preços justos, sem surpresas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-blue-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
            <div className="text-blue-600 flex justify-center mb-4">
              <Users size={40} />
            </div>
            <h3 className="text-4xl font-bold text-blue-700">2500+</h3>
            <p className="text-gray-700 mt-2">Clientes Satisfeitos</p>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
            <div className="text-blue-600 flex justify-center mb-4">
              <Award size={40} />
            </div>
            <h3 className="text-4xl font-bold text-blue-700">98%</h3>
            <p className="text-gray-700 mt-2">Taxa de Resolução</p>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
            <div className="text-blue-600 flex justify-center mb-4">
              <Clock size={40} />
            </div>
            <h3 className="text-4xl font-bold text-blue-700">1h</h3>
            <p className="text-gray-700 mt-2">Tempo Médio de Resposta</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
