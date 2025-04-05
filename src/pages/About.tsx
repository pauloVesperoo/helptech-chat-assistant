
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, Award, Clock, Building, CheckCircle, Star } from 'lucide-react';
import AppBar from '@/components/AppBar';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AppBar />
      
      {/* Main content with padding for fixed header */}
      <div className="pt-16">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
          <div className="container mx-auto px-4 md:px-8 text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Sobre a HelpTech</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Conheça nossa história, valores e a equipe por trás das soluções tecnológicas que transformam negócios e facilitam o dia a dia.
            </p>
          </div>
        </div>

        {/* Company Story */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80" 
                  alt="Equipe HelpTech" 
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Nossa História</h2>
                <p className="text-gray-700 mb-4">
                  Fundada em 2015, a HelpTech nasceu da paixão por tecnologia e da identificação de uma necessidade crescente por serviços de suporte técnico eficientes e acessíveis, tanto para empresas quanto para usuários domésticos.
                </p>
                <p className="text-gray-700 mb-4">
                  O que começou como uma pequena operação com apenas 3 profissionais, hoje se tornou uma referência no mercado de suporte técnico, contando com mais de 50 especialistas e atendendo milhares de clientes em todo o país.
                </p>
                <p className="text-gray-700">
                  Nossa missão é desmistificar a tecnologia e torná-la uma aliada no dia a dia de pessoas e empresas, oferecendo soluções rápidas, eficientes e personalizadas para cada necessidade.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values and Mission */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Nossos Valores</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ValueCard 
                icon={<Users size={40} />}
                title="Pessoas em Primeiro Lugar"
                description="Acreditamos que a tecnologia existe para servir às pessoas, e não o contrário. Nosso foco está sempre em proporcionar a melhor experiência humana possível."
              />
              
              <ValueCard 
                icon={<Award size={40} />}
                title="Excelência Técnica"
                description="Buscamos constantemente o aperfeiçoamento técnico de nossa equipe, investindo em treinamentos e certificações para oferecer um serviço de altíssima qualidade."
              />
              
              <ValueCard 
                icon={<Clock size={40} />}
                title="Agilidade e Eficiência"
                description="Entendemos o valor do tempo de nossos clientes e trabalhamos para resolver problemas da forma mais rápida e eficiente possível."
              />
            </div>
            
            <div className="mt-16 bg-white rounded-lg p-8 shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-center">Nossa Missão</h3>
              <p className="text-gray-700 text-lg text-center max-w-3xl mx-auto">
                "Tornar a tecnologia acessível e confiável para todos, através de um suporte técnico humanizado, ágil e de excelência, contribuindo para a transformação digital de pessoas e empresas."
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-4">Nossa Equipe</h2>
            <p className="text-gray-700 text-center max-w-2xl mx-auto mb-12">
              Conheça os especialistas que fazem da HelpTech uma referência em soluções tecnológicas.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <TeamMember 
                name="Carlos Silva"
                role="CEO & Fundador"
                image="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"
              />
              
              <TeamMember 
                name="Ana Oliveira"
                role="Diretora de Operações"
                image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"
              />
              
              <TeamMember 
                name="Pedro Santos"
                role="Gerente de Suporte Técnico"
                image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"
              />
              
              <TeamMember 
                name="Juliana Costa"
                role="Especialista em Segurança"
                image="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"
              />
            </div>
            
            <div className="text-center mt-12">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Conheça Toda a Equipe
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">O Que Nossos Clientes Dizem</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Testimonial 
                quote="A equipe da HelpTech resolveu um problema crítico em nossa rede que estava afetando toda a empresa. Atendimento rápido e profissional!"
                author="Marcela Souza"
                company="Diretora de TI, TechCorp"
                rating={5}
              />
              
              <Testimonial 
                quote="Contratei o plano empresarial e foi o melhor investimento que fizemos. O suporte é incrível e a equipe sempre nos ajuda a implementar as melhores soluções."
                author="Roberto Almeida"
                company="CEO, Inovativa Sistemas"
                rating={5}
              />
              
              <Testimonial 
                quote="Meu computador estava extremamente lento e achei que precisaria comprar um novo. A HelpTech conseguiu otimizá-lo e agora ele funciona como novo!"
                author="Fernanda Lima"
                company="Advogada"
                rating={4}
              />
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Nossos Parceiros</h2>
            
            <div className="flex flex-wrap justify-center items-center gap-12">
              <div className="grayscale hover:grayscale-0 transition-all">
                <img 
                  src="https://placeholder.pics/svg/200x80/DEDEDE/555555/Microsoft" 
                  alt="Microsoft" 
                  className="h-16 w-auto"
                />
              </div>
              <div className="grayscale hover:grayscale-0 transition-all">
                <img 
                  src="https://placeholder.pics/svg/200x80/DEDEDE/555555/Dell" 
                  alt="Dell" 
                  className="h-16 w-auto"
                />
              </div>
              <div className="grayscale hover:grayscale-0 transition-all">
                <img 
                  src="https://placeholder.pics/svg/200x80/DEDEDE/555555/HP" 
                  alt="HP" 
                  className="h-16 w-auto"
                />
              </div>
              <div className="grayscale hover:grayscale-0 transition-all">
                <img 
                  src="https://placeholder.pics/svg/200x80/DEDEDE/555555/Cisco" 
                  alt="Cisco" 
                  className="h-16 w-auto"
                />
              </div>
              <div className="grayscale hover:grayscale-0 transition-all">
                <img 
                  src="https://placeholder.pics/svg/200x80/DEDEDE/555555/Intel" 
                  alt="Intel" 
                  className="h-16 w-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Junte-se aos Nossos Clientes Satisfeitos</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Experimente nossos serviços e descubra como podemos ajudar sua empresa ou residência com soluções tecnológicas personalizadas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  Ver Nossos Serviços
                </Button>
              </Link>
              <Link to="/support">
                <Button variant="outline" className="border-white text-white hover:bg-blue-700">
                  Falar com um Especialista
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

// Value Card Component
const ValueCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg p-8 shadow-md transition-transform hover:transform hover:scale-105 flex flex-col h-full">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// Team Member Component
const TeamMember = ({ name, role, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:transform hover:scale-105">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-64 object-cover object-center"
      />
      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-gray-600">{role}</p>
      </div>
    </div>
  );
};

// Testimonial Component
const Testimonial = ({ quote, author, company, rating }) => {
  return (
    <div className="bg-white rounded-lg p-8 shadow-md flex flex-col h-full">
      <div className="flex mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={18} fill="#FFC107" color="#FFC107" />
        ))}
        {[...Array(5 - rating)].map((_, i) => (
          <Star key={i + rating} size={18} color="#E5E7EB" />
        ))}
      </div>
      <p className="text-gray-700 italic mb-6 flex-grow">"{quote}"</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-gray-600 text-sm">{company}</p>
      </div>
    </div>
  );
};

export default About;
