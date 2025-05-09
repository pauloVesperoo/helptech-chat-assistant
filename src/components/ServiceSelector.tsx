
import React from 'react';
import ServiceButtons from './ServiceButtons';

interface ServiceSelectorProps {
  botState: string;
  onServiceClick: (serviceId: string) => void;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({ 
  botState, 
  onServiceClick 
}) => {
  const shouldShowButtons = (botState === 'greeting' || botState === 'main_menu');
  
  if (!shouldShowButtons) {
    return null;
  }

  return <ServiceButtons onServiceClick={onServiceClick} />;
};

export default ServiceSelector;
