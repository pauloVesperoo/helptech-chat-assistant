
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AppBar = ({ onChatClick }: { onChatClick?: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-600">HelpTech</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Início
            </Link>
            <Link to="/#servicos" className="text-gray-700 hover:text-blue-600 font-medium">
              Serviços
            </Link>
            <Link to="/#contato" className="text-gray-700 hover:text-blue-600 font-medium">
              Contato
            </Link>
          </nav>

          {/* Contact and Chat Button */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center gap-2 text-gray-700">
              <PhoneCall size={18} className="text-blue-600" />
              <span>(11) 5555-1234</span>
            </div>
            {onChatClick && (
              <Button 
                onClick={onChatClick}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Iniciar Chat
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden bg-white shadow-md transition-all duration-300 overflow-hidden",
        isMenuOpen ? "max-h-screen py-4" : "max-h-0"
      )}>
        <div className="container mx-auto px-4">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link 
              to="/#servicos" 
              className="text-gray-700 hover:text-blue-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Serviços
            </Link>
            <Link 
              to="/#contato" 
              className="text-gray-700 hover:text-blue-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
            <div className="flex items-center gap-2 text-gray-700 py-2">
              <PhoneCall size={18} className="text-blue-600" />
              <span>(11) 5555-1234</span>
            </div>
            {onChatClick && (
              <Button 
                onClick={() => {
                  onChatClick();
                  setIsMenuOpen(false);
                }}
                className="bg-blue-600 hover:bg-blue-700 w-full"
              >
                Iniciar Chat
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AppBar;
