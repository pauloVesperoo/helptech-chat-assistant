
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatInterface from '@/components/ChatInterface';
import { supabase } from '@/integrations/supabase/client';
import { formatDate } from '@/utils/formatUtils';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';

const Dashboard = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('chat');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data, error } = await supabase
          .from('appointments')
          .select('*')
          .order('date', { ascending: true })
          .order('time', { ascending: true });
          
        if (error) throw error;
        setAppointments(data || []);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'confirmed': return 'Confirmado';
      case 'completed': return 'Concluído';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-2">Olá, {profile?.full_name || 'Cliente'}</h1>
        <p className="text-gray-600 mb-8">Bem-vindo ao seu painel de controle</p>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="chat">Assistente Virtual</TabsTrigger>
              <TabsTrigger value="appointments">Meus Agendamentos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="h-[600px] flex">
              <ChatInterface />
            </TabsContent>
            
            <TabsContent value="appointments">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : appointments.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4">Seus Agendamentos</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="py-2 px-4 text-left">Serviço</th>
                          <th className="py-2 px-4 text-left">Data</th>
                          <th className="py-2 px-4 text-left">Horário</th>
                          <th className="py-2 px-4 text-left">Status</th>
                          <th className="py-2 px-4 text-left">Detalhes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointments.map((appointment) => (
                          <tr key={appointment.id} className="border-b">
                            <td className="py-3 px-4">{appointment.service_type}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                {formatDate(appointment.date)}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Clock size={16} />
                                {appointment.time}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge 
                                className={`font-normal ${getStatusColor(appointment.status)}`}
                              >
                                {getStatusText(appointment.status)}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">
                              {appointment.details || "Sem detalhes adicionais"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600">
                      Para agendar novos serviços, utilize nosso Assistente Virtual na aba "Assistente Virtual".
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-lg text-gray-600">
                    Você ainda não tem agendamentos.
                    <br />
                    Use nosso assistente virtual para agendar um serviço.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
