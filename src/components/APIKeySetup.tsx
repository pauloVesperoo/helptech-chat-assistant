
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

interface APIKeySetupProps {
  apiKey: string;
  onSaveKey: (key: string) => void;
}

const APIKeySetup: React.FC<APIKeySetupProps> = ({ apiKey, onSaveKey }) => {
  const [key, setKey] = useState(apiKey);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    onSaveKey(key);
    setOpen(false);
    toast({
      title: "Chave da API salva",
      description: "Sua chave da API foi salva localmente e será usada para as próximas conversas.",
      variant: "default",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          {apiKey ? "Configurar API" : "Conectar com ChatGPT"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Configurar API do ChatGPT</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-500 mb-4">
            Insira sua chave de API da OpenAI para usar o ChatGPT. 
            Esta chave será armazenada apenas no seu navegador e não é enviada para nossos servidores.
          </p>
          <div className="flex flex-col gap-4">
            <Input
              type="password"
              placeholder="sk-..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              Não tem uma chave? <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Crie uma no site da OpenAI</a>
            </p>
            <Button onClick={handleSave} disabled={!key || key.length < 10}>
              Salvar Chave
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default APIKeySetup;
