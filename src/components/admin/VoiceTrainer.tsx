
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, Play, Square, Volume2, VolumeX, Pause, MousePointer } from 'lucide-react';
import { voiceTrainer } from '@/services/voiceTrainer';
import { toast } from 'sonner';

const VoiceTrainer = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [currentModule, setCurrentModule] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    // Check if speech synthesis is supported
    if (!('speechSynthesis' in window)) {
      toast.error('Text-to-speech is not supported in your browser');
      setIsVoiceEnabled(false);
    }

    // Update training state periodically
    const interval = setInterval(() => {
      const trainingActive = voiceTrainer.isTrainingActive();
      const module = voiceTrainer.getCurrentModule();
      const step = voiceTrainer.getCurrentStep();
      
      setIsTraining(trainingActive);
      setCurrentModule(module);
      setCurrentStep(step);
      setIsPlaying(speechSynthesis.speaking);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const startTraining = async (moduleId: string) => {
    if (!isVoiceEnabled) {
      toast.error('Voice guidance is not available in your browser');
      return;
    }

    try {
      setIsTraining(true);
      await voiceTrainer.startModuleTraining(moduleId);
      toast.success(`Started training for ${getModuleTitle(moduleId)}`);
    } catch (error) {
      console.error('Training error:', error);
      toast.error('Failed to start training. Please try again.');
      setIsTraining(false);
    }
  };

  const stopTraining = () => {
    voiceTrainer.stopTraining();
    setIsTraining(false);
    setCurrentModule(null);
    setCurrentStep(0);
    setShowCursor(false);
    toast.info('Training stopped');
  };

  const continueTraining = async () => {
    try {
      const result = await voiceTrainer.executeNextStep();
      if (result && result.cursorPosition) {
        setCursorPosition(result.cursorPosition);
        setShowCursor(true);
        setTimeout(() => setShowCursor(false), 3000);
      }
    } catch (error) {
      console.error('Training error:', error);
      toast.error('Training error occurred');
      setIsTraining(false);
    }
  };

  const pauseResumeSpeech = () => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause();
      toast.info('Speech paused');
    } else if (speechSynthesis.paused) {
      speechSynthesis.resume();
      toast.info('Speech resumed');
    }
  };

  const toggleVoice = () => {
    if (isVoiceEnabled) {
      voiceTrainer.stopCurrentSpeech();
      setIsVoiceEnabled(false);
      toast.info('Voice guidance disabled');
    } else {
      setIsVoiceEnabled(true);
      toast.info('Voice guidance enabled');
    }
  };

  const getModuleTitle = (moduleId: string): string => {
    const titles: Record<string, string> = {
      dashboard: 'Dashboard',
      categories: 'Categories',
      products: 'Products',
      orders: 'Orders',
      customers: 'Customers',
      inventory: 'Inventory',
      marketing: 'Marketing',
      reports: 'Reports',
    };
    return titles[moduleId] || moduleId;
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

  return (
    <>
      <style>{`
        .voice-trainer-highlight {
          outline: 3px solid #10b981 !important;
          outline-offset: 2px !important;
          background-color: rgba(16, 185, 129, 0.1) !important;
          border-radius: 4px !important;
          animation: pulse 2s infinite !important;
          position: relative !important;
          z-index: 1000 !important;
        }
        
        .voice-trainer-highlight::before {
          content: '';
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          background: linear-gradient(45deg, #10b981, #34d399);
          border-radius: 8px;
          z-index: -1;
          opacity: 0.3;
          animation: glow 2s infinite alternate;
        }
        
        .voice-trainer-cursor {
          position: fixed;
          width: 20px;
          height: 20px;
          background: #10b981;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: all 0.5s ease;
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.8);
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes glow {
          0% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }
      `}</style>

      {showCursor && (
        <div 
          className="voice-trainer-cursor"
          style={{
            left: cursorPosition.x,
            top: cursorPosition.y,
          }}
        >
          <MousePointer className="h-4 w-4 text-white" />
        </div>
      )}

      <div className="fixed top-4 right-4 w-80 z-40">
        <Card className="shadow-lg border-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              Voice Trainer
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleVoice}
                className="ml-auto"
              >
                {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {!isVoiceEnabled ? (
              <div className="text-center py-4">
                <VolumeX className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-3">
                  Voice guidance is disabled
                </p>
                <Button onClick={toggleVoice} size="sm">
                  Enable Voice
                </Button>
              </div>
            ) : (
              <>
                {isTraining ? (
                  <div className="space-y-2">
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600">
                        Training: {getModuleTitle(currentModule || '')}
                      </p>
                      <p className="text-xs text-gray-500">
                        Step {currentStep + 1}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={continueTraining} size="sm" className="flex-1">
                        <Play className="h-4 w-4 mr-1" />
                        Continue
                      </Button>
                      {isPlaying && (
                        <Button onClick={pauseResumeSpeech} variant="outline" size="sm">
                          <Pause className="h-4 w-4" />
                        </Button>
                      )}
                      <Button onClick={stopTraining} variant="outline" size="sm">
                        <Square className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-center text-gray-600">
                      {isPlaying ? 'Speaking...' : 'Click Continue for next step'}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-3">
                      <Volume2 className="h-8 w-8 mx-auto text-green-600 mb-2" />
                      <p className="text-xs text-gray-600">
                        Choose a module to learn with voice guidance:
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-1 max-h-48 overflow-y-auto">
                      {trainingModules.map((module) => (
                        <Button
                          key={module.id}
                          variant="outline"
                          size="sm"
                          className="text-xs p-2 h-auto flex-col items-start hover:bg-green-50 hover:border-green-200"
                          onClick={() => startTraining(module.id)}
                        >
                          <span className="font-medium">{module.title}</span>
                          <span className="text-gray-500 text-[10px]">{module.description}</span>
                        </Button>
                      ))}
                    </div>
                    <div className="text-center pt-2 border-t">
                      <p className="text-[10px] text-gray-500">
                        🎧 Using browser text-to-speech for natural voice guidance
                      </p>
                    </div>
                  </>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default VoiceTrainer;
