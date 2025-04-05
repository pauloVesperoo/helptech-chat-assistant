
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Calendar, Clock, User, ChevronRight, Tag, ArrowRight } from 'lucide-react';
import AppBar from '@/components/AppBar';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample categories for filter
  const categories = [
    "Todos", "Computadores", "Segurança", "Redes", "Software", "Hardware", "Dicas", "Tutoriais"
  ];
  
  const [activeCategory, setActiveCategory] = useState("Todos");
  
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "10 Dicas para Aumentar a Vida Útil do seu Notebook",
      excerpt: "Aprenda como cuidar adequadamente do seu notebook e prolongar sua vida útil com estas dicas essenciais de manutenção.",
      category: "Computadores",
      author: "Carlos Silva",
      date: "03 de abril, 2025",
      readTime: "8 min de leitura",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80",
      tags: ["Notebooks", "Manutenção", "Dicas"]
    },
    {
      id: 2,
      title: "Como Proteger seu Computador Contra Ransomware",
      excerpt: "O ransomware continua sendo uma das maiores ameaças à segurança digital. Saiba como se proteger efetivamente deste tipo de ataque.",
      category: "Segurança",
      author: "Ana Oliveira",
      date: "28 de março, 2025",
      readTime: "12 min de leitura",
      image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80",
      tags: ["Segurança", "Ransomware", "Proteção"]
    },
    {
      id: 3,
      title: "Configurando uma Rede Wi-Fi Segura e Eficiente",
      excerpt: "Um guia passo a passo para configurar sua rede Wi-Fi doméstica, garantindo segurança e velocidade máxima para todos os dispositivos.",
      category: "Redes",
      author: "Pedro Santos",
      date: "20 de março, 2025",
      readTime: "10 min de leitura",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80",
      tags: ["Wi-Fi", "Redes", "Tutorial"]
    },
    {
      id: 4,
      title: "Sinais de que é Hora de Trocar de Computador",
      excerpt: "Seu computador está lento ou apresentando problemas frequentes? Descubra os sinais que indicam que pode ser hora de investir em um novo equipamento.",
      category: "Hardware",
      author: "Juliana Costa",
      date: "15 de março, 2025",
      readTime: "7 min de leitura",
      image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80",
      tags: ["Hardware", "Computadores", "Upgrade"]
    },
    {
      id: 5,
      title: "As Melhores Ferramentas de Produtividade para Home Office",
      excerpt: "Conheça as ferramentas e aplicativos que podem transformar seu home office e aumentar significativamente sua produtividade no trabalho remoto.",
      category: "Software",
      author: "Roberto Almeida",
      date: "10 de março, 2025",
      readTime: "9 min de leitura",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80",
      tags: ["Software", "Produtividade", "Home Office"]
    },
    {
      id: 6,
      title: "Tutorial: Backup Completo de Seus Arquivos Importantes",
      excerpt: "Um guia detalhado para criar um sistema de backup robusto e eficiente para proteger seus documentos e arquivos importantes contra perdas.",
      category: "Tutoriais",
      author: "Fernando Mendes",
      date: "05 de março, 2025",
      readTime: "15 min de leitura",
      image: "https://images.unsplash.com/photo-1618044733300-9472054094ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80",
      tags: ["Backup", "Tutorial", "Segurança de Dados"]
    }
  ];
  
  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "Todos" || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AppBar />
      
      {/* Main content with padding for fixed header */}
      <div className="pt-16">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
          <div className="container mx-auto px-4 md:px-8 text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Blog HelpTech</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Dicas, tutoriais e novidades sobre tecnologia, segurança e suporte técnico para manter você sempre bem informado.
            </p>
          </div>
        </div>

        {/* Search and Categories */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Search Bar */}
              <div className="w-full md:w-1/3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Pesquisar artigos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                </div>
              </div>
              
              {/* Categories */}
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <section className="py-8 bg-white">
            <div className="container mx-auto px-4 md:px-8">
              <div className="bg-blue-50 rounded-xl overflow-hidden shadow-lg">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2">
                    <img 
                      src={filteredPosts[0].image} 
                      alt={filteredPosts[0].title} 
                      className="w-full h-80 lg:h-full object-cover object-center"
                    />
                  </div>
                  <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-blue-600 mb-3">
                      <Tag size={16} />
                      <span className="text-sm font-medium">{filteredPosts[0].category}</span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-4">{filteredPosts[0].title}</h2>
                    <p className="text-gray-600 mb-6">{filteredPosts[0].excerpt}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 mb-6 gap-4">
                      <div className="flex items-center">
                        <User size={16} className="mr-1" />
                        <span>{filteredPosts[0].author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        <span>{filteredPosts[0].date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        <span>{filteredPosts[0].readTime}</span>
                      </div>
                    </div>
                    <Button className="w-fit flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                      Ler artigo <ChevronRight size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-2xl font-bold mb-8">Artigos Recentes</h2>
            
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">Nenhum artigo encontrado para sua pesquisa.</p>
                <Button 
                  className="mt-4 bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('Todos');
                  }}
                >
                  Limpar Filtros
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.slice(1).map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            )}
            
            {filteredPosts.length > 0 && (
              <div className="text-center mt-12">
                <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                  Ver Mais Artigos <ArrowRight size={16} />
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Assine Nossa Newsletter</h2>
              <p className="text-blue-100">
                Receba dicas, tutoriais e novidades sobre tecnologia diretamente no seu email.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="flex-grow p-3 rounded-lg focus:outline-none text-gray-800"
              />
              <Button className="whitespace-nowrap bg-white text-blue-600 hover:bg-blue-50">
                Assinar Agora
              </Button>
            </div>
            
            <p className="text-sm text-blue-200 text-center mt-4">
              Ao se inscrever, você concorda com nossa política de privacidade. Não enviamos spam.
            </p>
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

// Blog Post Card Component
const BlogPostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col h-full transition-transform hover:transform hover:scale-105">
      <img 
        src={post.image} 
        alt={post.title} 
        className="w-full h-48 object-cover object-center"
      />
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-blue-600 mb-2">
          <Tag size={14} />
          <span className="text-xs font-medium">{post.category}</span>
        </div>
        
        <h3 className="text-xl font-bold mb-3">{post.title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{post.excerpt}</p>
        
        <div className="flex flex-wrap items-center text-xs text-gray-500 mb-4 gap-3">
          <div className="flex items-center">
            <User size={14} className="mr-1" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{post.readTime}</span>
          </div>
        </div>
        
        <Button variant="outline" className="w-full mt-auto border-blue-600 text-blue-600 hover:bg-blue-50 flex items-center justify-center gap-2">
          Ler artigo <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Blog;
