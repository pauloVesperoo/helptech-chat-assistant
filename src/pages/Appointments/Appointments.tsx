import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const firstName = profile?.full_name?.split(' ')[0] || 'Usuário';
  
  // Aqui teríamos a lógica para buscar os agendamentos do usuário
  const [appointments] = useState([]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Meus Agendamentos</h1>
            <p className="text-gray-600">Gerencie seus serviços agendados</p>
          </div>
          <Button 
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Agendar Novo Serviço
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          {appointments.length > 0 ? (
            <div>
              {/* Aqui viriam os agendamentos do usuário */}
            </div>
          ) : (
            <Card className="border-dashed border-2 border-gray-200">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Calendar className="w-16 h-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">Sem agendamentos</h3>
                <p className="text-gray-500 mb-6 max-w-md">
                  Você ainda não tem nenhum serviço agendado. Utilize nosso assistente virtual para agendar um serviço.
                </p>
                <Button 
                  onClick={() => navigate('/dashboard')} 
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Agendar Agora
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
