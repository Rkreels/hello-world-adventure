
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mic, MicOff, Play, Square, Settings, HelpCircle, Volume2 } from 'lucide-react';
import { voiceTrainer, VoiceTrainerConfig } from '@/services/voiceTrainer';
import { toast } from 'sonner';

const VoiceTrainer = () => {
  const [isConfigured, setIsConfigured] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [config, setConfig] = useState<VoiceTrainerConfig>({
    apiKey: '',
    voiceId: '9BWtsMINqrJLrRacOk9x', // Aria voice
    model: 'eleven_multilingual_v2'
  });
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    // Check if configuration exists in localStorage
    const savedConfig = localStorage.getItem('voiceTrainerConfig');
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      setConfig(parsedConfig);
      voiceTrainer.initialize(parsedConfig);
      setIsConfigured(true);
    }
  }, []);

  const handleSaveConfig = () => {
    if (!config.apiKey.trim()) {
      toast.error('Please enter your ElevenLabs API key');
      return;
    }

    localStorage.setItem('voiceTrainerConfig', JSON.stringify(config));
    voiceTrainer.initialize(config);
    setIsConfigured(true);
    setShowConfig(false);
    toast.success('Voice trainer configured successfully');
  };

  const startTraining = async (moduleId: string) => {
    if (!isConfigured) {
      toast.error('Please configure the voice trainer first');
      setShowConfig(true);
      return;
    }

    try {
      setIsTraining(true);
      await voiceTrainer.startModuleTraining(moduleId);
      toast.success(`Started training for ${moduleId}`);
    } catch (error) {
      console.error('Training error:', error);
      toast.error('Failed to start training. Please check your API key.');
      setIsTraining(false);
    }
  };

  const stopTraining = () => {
    voiceTrainer.stopTraining();
    setIsTraining(false);
    toast.info('Training stopped');
  };

  const continueTraining = async () => {
    try {
      await voiceTrainer.executeNextStep();
    } catch (error) {
      console.error('Training error:', error);
      toast.error('Training error occurred');
      setIsTraining(false);
    }
  };

  const trainingModules = [
    { id: 'dashboard', title: 'Dashboard', description: 'Learn the main dashboard' },
    { id: 'categories', title: 'Categories', description: 'Manage product categories' },
    { id: 'products', title: 'Products', description: 'Product management' },
    { id: 'orders', title: 'Orders', description: 'Process customer orders' },
    { id: 'customers', title: 'Customers', description: 'Customer management' },
    { id: 'inventory', title: 'Inventory', description: 'Stock management' },
    { id: 'marketing', title: 'Marketing', description: 'Coupons and promotions' },
    { id: 'reports', title: 'Reports', description: 'Analytics and reporting' },
  ];

  const voiceOptions = [
    { id: '9BWtsMINqrJLrRacOk9x', name: 'Aria' },
    { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah' },
    { id: 'CwhRBWXzGAHq8TQ4Fs17', name: 'Roger' },
    { id: 'FGY2WhTYpPnrIDTdsKH5', name: 'Laura' },
  ];

  return (
    <>
      <style>{`
        .voice-trainer-highlight {
          outline: 3px solid #10b981 !important;
          outline-offset: 2px !important;
          background-color: rgba(16, 185, 129, 0.1) !important;
          border-radius: 4px !important;
          animation: pulse 2s infinite !important;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>

      <Card className="fixed bottom-4 right-4 w-80 z-50 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Volume2 className="h-4 w-4" />
            Voice Trainer
            <Dialog open={showConfig} onOpenChange={setShowConfig}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Voice Trainer Configuration</DialogTitle>
                  <DialogDescription>
                    Configure your ElevenLabs API settings for voice guidance.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="apiKey">ElevenLabs API Key</Label>
                    <Input
                      id="apiKey"
                      type="password"
                      placeholder="Enter your API key"
                      value={config.apiKey}
                      onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="voice">Voice</Label>
                    <Select value={config.voiceId} onValueChange={(value) => setConfig({ ...config, voiceId: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {voiceOptions.map((voice) => (
                          <SelectItem key={voice.id} value={voice.id}>
                            {voice.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="model">Model</Label>
                    <Select value={config.model} onValueChange={(value) => setConfig({ ...config, model: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eleven_multilingual_v2">Multilingual v2 (Best Quality)</SelectItem>
                        <SelectItem value="eleven_turbo_v2_5">Turbo v2.5 (Fast)</SelectItem>
                        <SelectItem value="eleven_turbo_v2">Turbo v2 (English Only)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleSaveConfig} className="w-full">
                    Save Configuration
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {!isConfigured ? (
            <div className="text-center py-4">
              <HelpCircle className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-3">
                Configure your ElevenLabs API key to start voice training
              </p>
              <Button onClick={() => setShowConfig(true)} size="sm">
                Configure Now
              </Button>
            </div>
          ) : (
            <>
              {isTraining ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Button onClick={continueTraining} size="sm" className="flex-1">
                      <Play className="h-4 w-4 mr-1" />
                      Continue
                    </Button>
                    <Button onClick={stopTraining} variant="outline" size="sm">
                      <Square className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-center text-gray-600">
                    Training in progress...
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-xs text-gray-600 mb-3">
                    Choose a module to learn:
                  </p>
                  <div className="grid grid-cols-2 gap-1 max-h-48 overflow-y-auto">
                    {trainingModules.map((module) => (
                      <Button
                        key={module.id}
                        variant="outline"
                        size="sm"
                        className="text-xs p-2 h-auto flex-col items-start"
                        onClick={() => startTraining(module.id)}
                      >
                        <span className="font-medium">{module.title}</span>
                        <span className="text-gray-500 text-[10px]">{module.description}</span>
                      </Button>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default VoiceTrainer;
