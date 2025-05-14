
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AdminDashboard = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
        <p className="text-gray-600 mb-8">Gerenciamento completo do sistema</p>
        
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
                  <CardHeader className="pb-2">
                    <CardTitle>Usuários</CardTitle>
                    <CardDescription>Total de usuários no sistema</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">0</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Agendamentos</CardTitle>
                    <CardDescription>Total de agendamentos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">0</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Pendentes</CardTitle>
                    <CardDescription>Agendamentos pendentes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">0</p>
                  </CardContent>
                </Card>
              </div>
              <p className="text-center mt-10 text-gray-500">
                Em breve, mais estatísticas e gráficos serão implementados aqui.
              </p>
            </TabsContent>
            
            <TabsContent value="users">
              <div className="p-6 text-center">
                <p className="text-gray-500">Lista de usuários será implementada aqui.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="appointments">
              <div className="p-6 text-center">
                <p className="text-gray-500">Lista de agendamentos será implementada aqui.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="site">
              <div className="p-6 text-center">
                <p className="text-gray-500">Editor de configurações do site será implementado aqui.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="ai-assistant">
              <div className="p-6 text-center">
                <p className="text-gray-500">Assistente de IA com Function Calling será implementado aqui.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
