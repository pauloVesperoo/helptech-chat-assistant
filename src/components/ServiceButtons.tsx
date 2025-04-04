
import React from 'react';
import { servicesList } from '../data/faqData';
import { Button } from './ui/button';
import { Laptop, Shield, Network, Tool } from 'lucide-react';

interface ServiceButtonsProps {
  onServiceClick: (serviceId: string) => void;
}

const ServiceButtons: React.FC<ServiceButtonsProps> = ({ onServiceClick }) => {
  // Mapear ícones para serviços
  const getServiceIcon = (serviceId: string) => {
    switch (serviceId) {
      case 'formatting':
        return <Laptop size={18} />;
      case 'virus':
        return <Shield size={18} />;
      case 'network':
        return <Network size={18} />;
      case 'hardware':
        return <Tool size={18} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 border-t bg-gray-50">
      <p className="text-sm text-gray-600 mb-2 text-center">Nossos serviços:</p>
      <div className="grid grid-cols-2 gap-2">
        {servicesList.map((service) => (
          <Button
            key={service.id}
            variant="outline"
            size="sm"
            className="flex items-center justify-start text-left text-xs md:text-sm"
            onClick={() => onServiceClick(service.id)}
          >
            {getServiceIcon(service.id)}
            <span className="ml-2 truncate">{service.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ServiceButtons;
