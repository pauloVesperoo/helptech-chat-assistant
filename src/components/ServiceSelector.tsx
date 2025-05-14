
import React from 'react';
import ServiceButtons from './ServiceButtons';

interface ServiceSelectorProps {
  botState: string;
  useOpenAI: boolean;
  onServiceClick: (serviceId: string) => void;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({ 
  botState, 
  useOpenAI, 
  onServiceClick 
}) => {
  const shouldShowButtons = (botState === 'greeting' || botState === 'main_menu') && !useOpenAI;
  
  if (!shouldShowButtons) {
    return null;
  }

  return <ServiceButtons onServiceClick={onServiceClick} />;
};

export default ServiceSelector;
