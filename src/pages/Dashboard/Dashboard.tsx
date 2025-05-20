
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatInterface from '@/components/ChatInterface';

const Dashboard = () => {
  const { profile, user } = useAuth();
  const [activeTab, setActiveTab] = useState('chat');
  
  // Debug to check values
  useEffect(() => {
    console.log("Dashboard - Profile:", profile);
    console.log("Dashboard - User:", user);
  }, [profile, user]);

  // Use full_name from profile if available, otherwise use first part of email
  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'Usuário';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-2">Olá, {displayName}</h1>
        <p className="text-gray-600 mb-8">Bem-vindo ao seu painel de controle</p>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="chat">Assistente Virtual</TabsTrigger>
              <TabsTrigger value="appointments">Meus Agendamentos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="h-[600px] flex">
              <ChatInterface />
            </TabsContent>
            
            <TabsContent value="appointments">
              <div className="text-center py-8">
                <p className="text-lg text-gray-600">
                  Você ainda não tem agendamentos.
                  <br />
                  Use nosso assistente virtual para agendar um serviço.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
