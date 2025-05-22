import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatInterface from '@/components/ChatInterface';
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { user } = useAuth();
  const [profileData, setProfile] = useState(undefined);
  const [activeTab, setActiveTab] = useState('chat');

  useEffect(() => {
    console.log('Usuário atual:', user);
    console.log('user.id:', user?.id);
    if (user) {
      supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error('Erro ao buscar perfil:', error);
          } else {
            console.log('Perfil encontrado:', data);
          }
          setProfile(data);
        });
    } else {
      setProfile(null);
    }
  }, [user]);

  const firstName = profileData?.full_name
    ? profileData.full_name.split(' ')[0]
    : user?.email?.split('@')[0] || 'Usuário';

  if (profileData === undefined) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-1 flex items-center justify-center">
          <span className="text-gray-500 text-lg">Carregando...</span>
        </div>
      </div>
    );
  }

  if (profileData === null) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-1 flex items-center justify-center">
          <span className="text-red-500 text-lg">Perfil não encontrado.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-2">Olá, {firstName}</h1>
        <p className="text-gray-600 mb-8">Bem-vindo ao seu assistente virtual</p>

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
