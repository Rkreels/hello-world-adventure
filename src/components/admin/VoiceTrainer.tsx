
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Volume2, VolumeX, Pause, Play, Settings, Minimize2, Maximize2 } from 'lucide-react';
import { voiceTrainer } from '@/services/voiceTrainer';
import { toast } from 'sonner';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';

const VoiceTrainer = () => {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentElement, setCurrentElement] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [volume, setVolume] = useState([0.9]);
  const [speechRate, setSpeechRate] = useState([1.0]);
  const lastElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Check if speech synthesis is supported
    if (!('speechSynthesis' in window)) {
      toast.error('Text-to-speech is not supported in your browser');
      setIsVoiceEnabled(false);
      return;
    }

    // Update playing state more frequently for better responsiveness
    const interval = setInterval(() => {
      setIsPlaying(speechSynthesis.speaking);
    }, 100);

    // Initialize page guidance immediately
    if (isVoiceEnabled) {
      voiceTrainer.initializePageGuidance();
    }

    return () => clearInterval(interval);
  }, [isVoiceEnabled]);

  useEffect(() => {
    if (!isVoiceEnabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const element = e.target as HTMLElement;
      
      // Skip if it's the same element or a child of the last element
      if (lastElementRef.current && 
          (element === lastElementRef.current || lastElementRef.current.contains(element))) {
        return;
      }

      // Skip voice trainer elements to avoid feedback loops
      if (element.closest('.voice-trainer-controls')) {
        return;
      }

      // Stop current speech immediately when hovering over a new element
      voiceTrainer.stopCurrentSpeech();
      
      // Start guidance immediately without delay
      const elementInfo = voiceTrainer.getElementInfo(element);
      
      if (elementInfo && elementInfo !== currentElement) {
        setCurrentElement(elementInfo);
        lastElementRef.current = element;
        voiceTrainer.guideElement(element);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const element = e.target as HTMLElement;
      
      // Skip voice trainer elements
      if (element.closest('.voice-trainer-controls')) {
        return;
      }
      
      voiceTrainer.handleElementClick(element);
    };

    const handleLocationChange = () => {
      // Reset tracking when page changes
      setCurrentElement(null);
      lastElementRef.current = null;
      
      setTimeout(() => {
        voiceTrainer.handlePageChange();
      }, 500);
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('click', handleClick);
    window.addEventListener('popstate', handleLocationChange);

    // Listen for React Router navigation
    const originalPushState = history.pushState;
    history.pushState = function(...args) {
      originalPushState.apply(history, args);
      handleLocationChange();
    };

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('popstate', handleLocationChange);
      history.pushState = originalPushState;
    };
  }, [isVoiceEnabled, currentElement]);

  const toggleVoice = () => {
    if (isVoiceEnabled) {
      voiceTrainer.stopCurrentSpeech();
      setIsVoiceEnabled(false);
      toast.info('Voice guidance disabled');
    } else {
      setIsVoiceEnabled(true);
      voiceTrainer.initializePageGuidance();
      toast.success('Voice guidance enabled - hover over elements for instant guidance');
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

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume);
    // Note: Volume changes will apply to new utterances
  };

  const handleRateChange = (newRate: number[]) => {
    setSpeechRate(newRate);
    // Note: Rate changes will apply to new utterances
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50 voice-trainer-controls">
        <Button
          onClick={() => setIsMinimized(false)}
          className="h-12 w-12 rounded-full shadow-lg bg-green-600 hover:bg-green-700"
          size="icon"
        >
          <Volume2 className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 voice-trainer-controls">
      <Card className="w-80 sm:w-96 shadow-xl border-2 border-green-200 bg-white/95 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-sm">Voice Guide</span>
            </div>
            <div className="flex gap-1">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Settings className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Voice Settings</SheetTitle>
                    <SheetDescription>
                      Customize your voice guidance experience
                    </SheetDescription>
                  </SheetHeader>
                  <div className="space-y-6 mt-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Volume: {Math.round(volume[0] * 100)}%
                      </label>
                      <Slider
                        value={volume}
                        onValueChange={handleVolumeChange}
                        max={1}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Speech Rate: {speechRate[0]}x
                      </label>
                      <Slider
                        value={speechRate}
                        onValueChange={handleRateChange}
                        max={2}
                        min={0.5}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                    <div className="text-xs text-gray-600">
                      <p className="mb-2"><strong>Tips:</strong></p>
                      <ul className="space-y-1 list-disc list-inside">
                        <li>Hover over elements for instant guidance</li>
                        <li>Click buttons to hear confirmation</li>
                        <li>Navigate with keyboard for accessibility</li>
                        <li>Use Escape key to stop current speech</li>
                      </ul>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="h-8 w-8 p-0"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-2 mb-3">
            <Button
              variant={isVoiceEnabled ? "default" : "outline"}
              size="sm"
              onClick={toggleVoice}
              className="flex-1 transition-all duration-200 hover:scale-105"
            >
              {isVoiceEnabled ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />}
              {isVoiceEnabled ? 'Enabled' : 'Disabled'}
            </Button>

            {isVoiceEnabled && isPlaying && (
              <Button
                variant="outline"
                size="sm"
                onClick={pauseResumeSpeech}
                className="transition-all duration-200 hover:scale-105"
              >
                {speechSynthesis.paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </Button>
            )}
          </div>

          <div className="text-center">
            {isVoiceEnabled ? (
              isPlaying ? (
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium">Speaking...</span>
                  <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                      <div
                        key={i}
                        className="w-1 h-3 bg-green-500 rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-xs text-gray-600">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Hover for instant guidance
                </div>
              )
            ) : (
              <div className="text-xs text-gray-400">Voice guidance disabled</div>
            )}
          </div>

          {currentElement && isVoiceEnabled && (
            <div className="mt-3 p-2 bg-green-50 rounded-lg border border-green-200">
              <div className="text-xs text-green-700 font-medium truncate">
                Current: {currentElement.split('-').pop()?.replace(/-/g, ' ')}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceTrainer;
