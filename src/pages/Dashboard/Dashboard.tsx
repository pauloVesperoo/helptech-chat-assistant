
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatInterface from '@/components/ChatInterface';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('chat');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appointmentsError, setAppointmentsError] = useState(null);

  // Separate fetching of appointments into its own effect
  useEffect(() => {
    if (profile?.id) {
      fetchAppointments();
    } else {
      setLoading(false);
    }
  }, [profile]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setAppointmentsError(null);
      
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', profile?.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setAppointmentsError(error.message || 'Erro ao carregar agendamentos');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pendente</Badge>;
      case 'confirmed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Confirmado</Badge>;
      case 'canceled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Cancelado</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Concluído</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Safely handle tab change to prevent errors
  const handleTabChange = (value) => {
    // Only change tab if it's different from the current one
    if (value !== activeTab) {
      setActiveTab(value);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-2">Olá, {profile?.full_name || 'Cliente'}</h1>
        <p className="text-gray-600 mb-8">Bem-vindo ao seu painel de controle</p>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
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
                  <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                </div>
              ) : appointmentsError ? (
                <div className="text-center py-8">
                  <p className="text-red-500">{appointmentsError}</p>
                  <button 
                    onClick={fetchAppointments}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Tentar novamente
                  </button>
                </div>
              ) : appointments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-lg text-gray-600">
                    Você ainda não tem agendamentos.
                    <br />
                    Use nosso assistente virtual para agendar um serviço.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Serviço</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Hora</TableHead>
                        <TableHead>Detalhes</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell className="font-medium">{appointment.service_type}</TableCell>
                          <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                          <TableCell>{appointment.time}</TableCell>
                          <TableCell className="max-w-xs truncate">{appointment.details}</TableCell>
                          <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
