
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { formatDate } from '@/utils/formatUtils';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, Calendar, User, X, Settings, MessageSquare } from 'lucide-react';
import ChatInterface from '@/components/ChatInterface';

const AdminDashboard = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAppointments: 0,
    pendingAppointments: 0
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch appointments
        const { data: appointmentsData, error: appointmentsError } = await supabase
          .from('appointments')
          .select('*, profiles(full_name, email)')
          .order('date', { ascending: true })
          .order('time', { ascending: true });
          
        if (appointmentsError) throw appointmentsError;
        
        // Fetch users
        const { data: usersData, error: usersError } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (usersError) throw usersError;
        
        // Set data
        setAppointments(appointmentsData || []);
        setUsers(usersData || []);
        
        // Calculate stats
        setStats({
          totalUsers: usersData?.length || 0,
          totalAppointments: appointmentsData?.length || 0,
          pendingAppointments: appointmentsData?.filter(app => app.status === 'pending')?.length || 0
        });
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        toast({
          title: "Erro ao carregar dados",
          description: "Ocorreu um erro ao carregar os dados. Por favor, tente novamente.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', appointmentId);
        
      if (error) throw error;
      
      // Update local state without refetching
      setAppointments(appointments.map(app => 
        app.id === appointmentId ? { ...app, status: newStatus } : app
      ));
      
      toast({
        title: "Status atualizado",
        description: `O status do agendamento foi alterado para ${getStatusText(newStatus)}.`,
        variant: "default",
      });
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast({
        title: "Erro ao atualizar",
        description: "Ocorreu um erro ao atualizar o status. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

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

  if (profile?.role !== 'admin') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
          <Settings size={48} className="mx-auto mb-4 text-gray-400" />
          <h1 className="text-2xl font-bold mb-4">Acesso Negado</h1>
          <p className="text-gray-600 mb-6">
            Você não tem permissão para acessar esta página. Esta área é restrita apenas para administradores.
          </p>
          <Button asChild>
            <a href="/">Voltar para a Página Inicial</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
        <p className="text-gray-600 mb-8">Gerenciamento completo do sistema</p>
        
        <div className="bg-white rounded-lg shadow-md">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="p-4 border-b w-full flex overflow-x-auto">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="users">Usuários</TabsTrigger>
              <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
              <TabsTrigger value="ai-assistant">Assistente IA</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <User className="text-blue-500" size={20} />
                      Usuários
                    </CardTitle>
                    <CardDescription>Total de usuários no sistema</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{stats.totalUsers}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="text-green-500" size={20} />
                      Agendamentos
                    </CardTitle>
                    <CardDescription>Total de agendamentos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{stats.totalAppointments}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="text-yellow-500" size={20} />
                      Pendentes
                    </CardTitle>
                    <CardDescription>Agendamentos pendentes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{stats.pendingAppointments}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Agendamentos Recentes</h3>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : appointments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="py-2 px-4 text-left">Cliente</th>
                          <th className="py-2 px-4 text-left">Serviço</th>
                          <th className="py-2 px-4 text-left">Data</th>
                          <th className="py-2 px-4 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointments.slice(0, 5).map((appointment) => (
                          <tr key={appointment.id} className="border-b">
                            <td className="py-3 px-4">{appointment.profiles?.full_name || 'Cliente'}</td>
                            <td className="py-3 px-4">{appointment.service_type}</td>
                            <td className="py-3 px-4">{formatDate(appointment.date)}</td>
                            <td className="py-3 px-4">
                              <Badge 
                                className={`font-normal ${getStatusColor(appointment.status)}`}
                              >
                                {getStatusText(appointment.status)}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center py-4 text-gray-500">Nenhum agendamento encontrado</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="users">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Usuários do Sistema</h2>
                
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : users.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="py-2 px-4 text-left">Nome</th>
                          <th className="py-2 px-4 text-left">Email</th>
                          <th className="py-2 px-4 text-left">Função</th>
                          <th className="py-2 px-4 text-left">Data de Cadastro</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-b">
                            <td className="py-3 px-4">{user.full_name || 'N/A'}</td>
                            <td className="py-3 px-4">{user.email}</td>
                            <td className="py-3 px-4">
                              <Badge 
                                className={user.role === 'admin' 
                                  ? 'bg-purple-100 text-purple-800' 
                                  : 'bg-blue-100 text-blue-800'
                                }
                              >
                                {user.role === 'admin' ? 'Administrador' : 'Cliente'}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">{formatDate(user.created_at)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center py-4 text-gray-500">Nenhum usuário encontrado</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="appointments">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Gerenciar Agendamentos</h2>
                
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : appointments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="py-2 px-4 text-left">Cliente</th>
                          <th className="py-2 px-4 text-left">Serviço</th>
                          <th className="py-2 px-4 text-left">Data</th>
                          <th className="py-2 px-4 text-left">Horário</th>
                          <th className="py-2 px-4 text-left">Status</th>
                          <th className="py-2 px-4 text-left">Detalhes</th>
                          <th className="py-2 px-4 text-left">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointments.map((appointment) => (
                          <tr key={appointment.id} className="border-b">
                            <td className="py-3 px-4">{appointment.profiles?.full_name || 'Cliente'}</td>
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
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                {appointment.status === 'pending' && (
                                  <>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      className="flex items-center gap-1 text-xs"
                                      onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                                    >
                                      <Check size={12} />
                                      Confirmar
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 border-red-200 hover:border-red-300"
                                      onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                                    >
                                      <X size={12} />
                                      Cancelar
                                    </Button>
                                  </>
                                )}
                                {appointment.status === 'confirmed' && (
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="flex items-center gap-1 text-xs"
                                    onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                                  >
                                    <Check size={12} />
                                    Concluir
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center py-4 text-gray-500">Nenhum agendamento encontrado</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="ai-assistant" className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MessageSquare className="text-blue-500" size={24} />
                Assistente de IA
              </h2>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-gray-600">
                  Use este assistente para testar interações, responder perguntas e gerenciar configurações
                  do assistente virtual do chat. Esta versão de administrador permite que você teste todas as funções.
                </p>
              </div>
              
              <div className="h-[500px]">
                <ChatInterface />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
