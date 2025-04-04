
import React from 'react';
import { Service } from '../data/faqData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, DollarSign } from 'lucide-react';

interface ServiceInfoProps {
  service: Service;
}

const ServiceInfo: React.FC<ServiceInfoProps> = ({ service }) => {
  return (
    <Card className="my-4">
      <CardHeader className="bg-helptech text-white rounded-t-lg">
        <CardTitle>{service.name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <CardDescription className="text-base mb-4">{service.description}</CardDescription>
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
          <DollarSign size={16} />
          <span>Faixa de preço: {service.priceRange}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Clock size={16} />
          <span>Tempo estimado: {service.estimatedTime}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceInfo;
