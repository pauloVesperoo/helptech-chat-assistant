import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatInterface from '@/components/ChatInterface';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const MapsNearby = ({ latitude, longitude, query }) => (
  <iframe
    width="100%"
    height="400"
    style={{ border: 0 }}
    loading="lazy"
    allowFullScreen
    src={`https://www.google.com/maps/embed/v1/search?key=AIzaSyCHTWtF-R4ccWdeOaOHBbJmGrZwRp69Ipc&q=${encodeURIComponent(query)}&center=${latitude},${longitude}&zoom=14`}
  />
);

const Dashboard = () => {
  const { user } = useAuth();
  const [profileData, setProfile] = useState(undefined);
  const [activeTab, setActiveTab] = useState('chat');
  const [userLocation, setUserLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [cep, setCep] = useState('');
  const [loadingCep, setLoadingCep] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
        .then(({ data }) => setProfile(data));
    } else {
      setProfile(null);
    }
  }, [user]);

  const firstName = profileData?.full_name
    ? profileData.full_name.split(' ')[0]
    : user?.email?.split('@')[0] || 'Usuário';

  // Função para buscar latitude/longitude pelo CEP usando ViaCEP + Nominatim
  const buscarLocalizacaoPorCep = async () => {
    setLoadingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) throw new Error('CEP não encontrado');
      const endereco = `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}`;
      const geoResp = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`);
      const geoData = await geoResp.json();
      if (geoData.length === 0) throw new Error('Localização não encontrada');
      setUserLocation({
        latitude: geoData[0].lat,
        longitude: geoData[0].lon,
      });
      setShowMap(true);
    } catch (err) {
      alert('Não foi possível encontrar a localização para o CEP informado.');
    }
    setLoadingCep(false);
  };

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

      <div className="container mx-auto px-4 py-8">
        {/* Topo restaurado */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Olá, {firstName}</h1>
            <p className="text-gray-600">Bem-vindo ao seu assistente virtual</p>
          </div>
          {/* Exemplo de botão de configuração de API, se existir */}
          {/* <Button className="bg-indigo-600 hover:bg-indigo-700">Configurar API</Button> */}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="chat">Assistente Virtual</TabsTrigger>
              <TabsTrigger value="locations">Localizar Estabelecimentos</TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="h-[600px] overflow-auto">
              <ChatInterface />
            </TabsContent>

            <TabsContent value="locations" className="h-[600px] overflow-auto">
              <div className="max-w-xl mx-auto pt-8">
                <div className="bg-indigo-50 rounded-lg shadow p-6">
                  <h2 className="text-2xl font-bold text-indigo-700 mb-2 text-center">
                    Encontre Assistências Técnicas Próximas
                  </h2>
                  <p className="text-gray-600 mb-6 text-center">
                    Digite seu CEP para localizar estabelecimentos que podem te ajudar com serviços de informática.
                  </p>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      buscarLocalizacaoPorCep();
                    }}
                    className="flex flex-col sm:flex-row items-center gap-3 mb-6"
                  >
                    <input
                      type="text"
                      id="cep"
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                      placeholder="Ex: 01001-000"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                      maxLength={9}
                      required
                    />
                    <button
                      type="submit"
                      disabled={loadingCep || cep.length < 8}
                      className={`px-6 py-2 rounded-md text-white font-semibold transition ${
                        loadingCep || cep.length < 8
                          ? 'bg-indigo-300 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-700'
                      }`}
                    >
                      {loadingCep ? 'Buscando...' : 'Buscar'}
                    </button>
                  </form>
                  {showMap && userLocation && (
                    <div className="bg-white rounded-lg shadow p-4">
                      <h3 className="text-lg font-medium mb-2 text-indigo-700">
                        Assistências próximas ao CEP <span className="font-mono">{cep}</span>
                      </h3>
                      <MapsNearby
                        latitude={userLocation.latitude}
                        longitude={userLocation.longitude}
                        query="assistência técnica computador"
                      />
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Resultados fornecidos pelo Google Maps.
                      </p>
                    </div>
                  )}
                  {!showMap && (
                    <div className="text-center text-gray-400 mt-8">
                      <svg className="mx-auto mb-2" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="24" cy="24" r="22" strokeDasharray="4 2" />
                        <path d="M24 14v10l6 6" strokeLinecap="round" />
                      </svg>
                      <span>O mapa aparecerá aqui após a busca.</span>
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

export default Dashboard;
