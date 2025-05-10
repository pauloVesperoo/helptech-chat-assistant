import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { formatDate } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { sendMessageToOpenAI } from '@/utils/openaiService';
import { Loader2, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminDashboard = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [diagnostics, setDiagnostics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminQuery, setAdminQuery] = useState('');
  const [adminResponse, setAdminResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Stats
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAppointments: 0,
    pendingAppointments: 0
  });

  useEffect(() => {
    if (profile?.id) {
      fetchDashboardData();
    }
  }, [profile]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch appointments
      const { data: appointmentsData } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });
        
      // Fetch users
      const { data: usersData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
        
      // Fetch diagnostics
      const { data: diagnosticsData } = await supabase
        .from('diagnostics')
        .select('*')
        .order('created_at', { ascending: false });
      
      setAppointments(appointmentsData || []);
      setUsers(usersData || []);
      setDiagnostics(diagnosticsData || []);
      
      // Calculate stats
      setStats({
        totalUsers: usersData?.length || 0,
        totalAppointments: appointmentsData?.length || 0,
        pendingAppointments: appointmentsData?.filter(a => a.status === 'pending')?.length || 0
      });
      
    } catch (error) {
      console.error('Error fetching admin dashboard data:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os dados do painel. Por favor, tente novamente.",
        variant: "destructive"
      });
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

  const updateAppointmentStatus = async (id, status) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Status atualizado",
        description: `Status do agendamento alterado para ${status}`,
        variant: "default"
      });
      
      // Refresh data
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível atualizar o status do agendamento",
        variant: "destructive"
      });
    }
  };

  const handleAdminQuery = async () => {
    if (!adminQuery.trim()) return;
    
    setIsProcessing(true);
    try {
      const adminPrompt = `Você é um assistente administrativo do sistema HelpTech, com acesso a informações sobre:
- ${stats.totalUsers} usuários
- ${stats.totalAppointments} agendamentos (${stats.pendingAppointments} pendentes)

Responda a consulta do administrador de forma profissional e informativa, baseado nos dados fornecidos.
Se a consulta do administrador parecer um comando para executar alguma ação no sistema, descreva o que seria feito, mas explique que é necessário usar a interface do sistema para realizar ações.

Consulta do administrador: "${adminQuery}"`;

      const response = await sendMessageToOpenAI(
        [{ role: 'system', content: adminPrompt }], 
        localStorage.getItem('openai_api_key') || ''
      );
      
      setAdminResponse(response);
    } catch (error) {
      console.error('Error processing admin query:', error);
      toast({
        title: "Erro de processamento",
        description: "Não foi possível processar sua consulta. Verifique sua chave da API.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const updateDiagnosticStatus = async (id, resolved) => {
    try {
      const { error } = await supabase
        .from('diagnostics')
        .update({ resolved })
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Status atualizado",
        description: `Diagnóstico marcado como ${resolved ? 'resolvido' : 'não resolvido'}`,
        variant: "default"
      });
      
      // Refresh data
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating diagnostic status:', error);
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível atualizar o status do diagnóstico",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
            <p className="text-gray-600">Gerenciamento completo do sistema</p>
          </div>
          
          <Button 
            onClick={fetchDashboardData}
            variant="outline" 
            className="flex items-center gap-2"
            disabled={loading}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Atualizar
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md">
          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="p-4 border-b w-full flex overflow-x-auto">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="users">Usuários</TabsTrigger>
              <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
              <TabsTrigger value="diagnostics">Diagnósticos</TabsTrigger>
              <TabsTrigger value="ai-assistant">Assistente IA</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Usuários</CardTitle>
                    <CardDescription>Total de usuários no sistema</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{stats.totalUsers}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Agendamentos</CardTitle>
                    <CardDescription>Total de agendamentos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{stats.totalAppointments}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Pendentes</CardTitle>
                    <CardDescription>Agendamentos pendentes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{stats.pendingAppointments}</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Agendamentos Recentes</h2>
                {loading ? (
                  <div className="flex justify-center p-6">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : appointments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Serviço</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {appointments.slice(0, 5).map((appointment) => (
                          <TableRow key={appointment.id}>
                            <TableCell className="font-medium">{appointment.service_type}</TableCell>
                            <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                            <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">Nenhum agendamento encontrado</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="users">
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Usuários do Sistema</h2>
                {loading ? (
                  <div className="flex justify-center p-6">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : users.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Perfil</TableHead>
                          <TableHead>Data de Cadastro</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.full_name || "—"}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge className={user.role === 'admin' ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}>
                                {user.role === 'admin' ? 'Administrador' : 'Cliente'}
                              </Badge>
                            </TableCell>
                            <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">Nenhum usuário encontrado</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="appointments">
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Todos os Agendamentos</h2>
                {loading ? (
                  <div className="flex justify-center p-6">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : appointments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Serviço</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Hora</TableHead>
                          <TableHead>Detalhes</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Ações</TableHead>
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
                            <TableCell>
                              <div className="flex gap-2">
                                {appointment.status === 'pending' && (
                                  <>
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                                      onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                                    >
                                      Confirmar
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
                                      onClick={() => updateAppointmentStatus(appointment.id, 'canceled')}
                                    >
                                      Cancelar
                                    </Button>
                                  </>
                                )}
                                {appointment.status === 'confirmed' && (
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                                    onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                                  >
                                    Concluir
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">Nenhum agendamento encontrado</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="diagnostics">
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Diagnósticos Realizados</h2>
                {loading ? (
                  <div className="flex justify-center p-6">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : diagnostics.length > 0 ? (
                  <div className="space-y-6">
                    {diagnostics.map((diagnostic) => (
                      <Card key={diagnostic.id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">Problema Reportado</CardTitle>
                            <Badge variant={diagnostic.resolved ? "outline" : "secondary"} className={diagnostic.resolved ? "bg-green-100 text-green-800" : ""}>
                              {diagnostic.resolved ? "Resolvido" : "Aberto"}
                            </Badge>
                          </div>
                          <CardDescription>{new Date(diagnostic.created_at).toLocaleString()}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-1">Problema:</h4>
                            <p className="text-gray-700 whitespace-pre-wrap">{diagnostic.problem_reported}</p>
                          </div>
                          
                          {diagnostic.solution_generated && (
                            <div>
                              <h4 className="font-medium mb-1">Solução Gerada:</h4>
                              <p className="text-gray-700 whitespace-pre-wrap">{diagnostic.solution_generated}</p>
                            </div>
                          )}
                          
                          <div className="flex justify-end pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateDiagnosticStatus(diagnostic.id, !diagnostic.resolved)}
                            >
                              {diagnostic.resolved ? "Marcar como não resolvido" : "Marcar como resolvido"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">Nenhum diagnóstico encontrado</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="ai-assistant">
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Assistente IA para Administradores</h2>
                
                <div className="space-y-4">
                  <div>
                    <p className="mb-2">Faça perguntas sobre os dados do sistema ou peça ajuda:</p>
                    <div className="flex gap-2">
                      <Textarea 
                        value={adminQuery}
                        onChange={(e) => setAdminQuery(e.target.value)}
                        placeholder="Ex: Quantos agendamentos temos pendentes? Como faço para..."
                        className="min-h-[100px]"
                      />
                    </div>
                    <Button 
                      onClick={handleAdminQuery} 
                      className="mt-2"
                      disabled={isProcessing || !adminQuery.trim() || !localStorage.getItem('openai_api_key')}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        "Enviar Consulta"
                      )}
                    </Button>
                  </div>
                  
                  {!localStorage.getItem('openai_api_key') && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-yellow-800">
                      <p>⚠️ Você precisa configurar sua chave da API OpenAI para usar esta funcionalidade.</p>
                    </div>
                  )}
                  
                  {adminResponse && (
                    <div className="bg-gray-50 rounded-md border p-4 mt-4">
                      <h3 className="font-medium text-lg mb-2">Resposta:</h3>
                      <p className="whitespace-pre-wrap">{adminResponse}</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
