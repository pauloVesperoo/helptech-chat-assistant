
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Users, Calendar, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o usuário é admin
    if (profile && profile.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [profile, navigate]);

  // Se ainda não carregou o perfil ou não é admin, não mostrar o dashboard
  if (!profile || profile.role !== 'admin') {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-1 flex justify-center items-center">
          <Alert variant="destructive" className="w-full max-w-lg">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Acesso Restrito</AlertTitle>
            <AlertDescription>
              Esta página é restrita para administradores do sistema.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
            <p className="text-gray-600">Gerenciamento completo do sistema</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md">
          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="p-4 border-b w-full flex overflow-x-auto">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="users">Usuários</TabsTrigger>
              <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
              <TabsTrigger value="site">Configurações do Site</TabsTrigger>
              <TabsTrigger value="ai-assistant">Assistente IA</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle className="text-sm font-medium">Usuários</CardTitle>
                      <CardDescription>Total de usuários</CardDescription>
                    </div>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">10</p>
                    <p className="text-xs text-muted-foreground">+2 desde o último mês</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle className="text-sm font-medium">Agendamentos</CardTitle>
                      <CardDescription>Total de serviços</CardDescription>
                    </div>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">24</p>
                    <p className="text-xs text-muted-foreground">+5 desde a semana passada</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
                      <CardDescription>Serviços aguardando</CardDescription>
                    </div>
                    <Settings className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">7</p>
                    <p className="text-xs text-muted-foreground">Necessitam de aprovação</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Atividade Recente</h3>
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="flex items-center justify-between py-3 px-4">
                          <div>
                            <p className="font-medium">Agendamento #{Math.floor(Math.random() * 1000)}</p>
                            <p className="text-sm text-muted-foreground">Usuário solicitou serviço de formatação</p>
                          </div>
                          <p className="text-sm text-muted-foreground">há {Math.floor(Math.random() * 24)} horas</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="users">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Lista de Usuários</h3>
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {[
                        { name: "Admin", email: "admin@helptech.com", role: "admin" },
                        { name: "João Silva", email: "joao@exemplo.com", role: "client" },
                        { name: "Maria Santos", email: "maria@exemplo.com", role: "client" },
                        { name: "Carlos Oliveira", email: "carlos@exemplo.com", role: "client" },
                        { name: "Ana Pereira", email: "ana@exemplo.com", role: "client" }
                      ].map((user, index) => (
                        <div key={index} className="flex items-center justify-between py-3 px-4">
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            user.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {user.role === 'admin' ? 'Admin' : 'Cliente'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="appointments">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Lista de Agendamentos</h3>
                <p className="text-gray-500">Implementação completa em breve.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="site">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Configurações do Site</h3>
                <p className="text-gray-500">Implementação completa em breve.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="ai-assistant">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Configurações do Assistente IA</h3>
                <p className="text-gray-500">Implementação completa em breve.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
