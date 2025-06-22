
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { voiceTrainer } from '@/services/voiceTrainer';
import { toast } from 'sonner';

const VoiceTrainer = () => {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentElement, setCurrentElement] = useState<string | null>(null);
  const lastElementRef = useRef<HTMLElement | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      toast.error('Voice guidance not supported in this browser');
      setIsVoiceEnabled(false);
      return;
    }

    const interval = setInterval(() => {
      const speaking = speechSynthesis.speaking;
      const paused = speechSynthesis.paused;
      setIsPlaying(speaking && !paused);
    }, 150);

    if (isVoiceEnabled) {
      voiceTrainer.initializePageGuidance();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        voiceTrainer.stopCurrentSpeech();
        setCurrentElement(null);
        toast.info('Voice guidance stopped');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      document.removeEventListener('keydown', handleKeyDown);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [isVoiceEnabled]);

  useEffect(() => {
    if (!isVoiceEnabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const element = e.target as HTMLElement;
      
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      
      if (lastElementRef.current && 
          (element === lastElementRef.current || lastElementRef.current.contains(element))) {
        return;
      }

      if (element.closest('.voice-trainer-controls')) {
        return;
      }

      const rect = element.getBoundingClientRect();
      if (rect.width < 20 || rect.height < 20) {
        return;
      }

      voiceTrainer.stopCurrentSpeech();
      setCurrentElement(null);
      
      hoverTimeoutRef.current = setTimeout(() => {
        const elementInfo = voiceTrainer.getElementInfo(element);
        
        if (elementInfo && elementInfo !== currentElement) {
          setCurrentElement(elementInfo);
          lastElementRef.current = element;
          voiceTrainer.guideElement(element);
        }
      }, 100);
    };

    const handleClick = (e: MouseEvent) => {
      const element = e.target as HTMLElement;
      
      if (element.closest('.voice-trainer-controls')) {
        return;
      }
      
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      
      voiceTrainer.handleElementClick(element);
    };

    const handleLocationChange = () => {
      voiceTrainer.stopCurrentSpeech();
      setCurrentElement(null);
      lastElementRef.current = null;
      
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      
      setTimeout(() => {
        voiceTrainer.handlePageChange();
      }, 150);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('click', handleClick);
    window.addEventListener('popstate', handleLocationChange);

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    
    history.pushState = function(...args) {
      originalPushState.apply(history, args);
      handleLocationChange();
    };
    
    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args);
      handleLocationChange();
    };

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('popstate', handleLocationChange);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, [isVoiceEnabled, currentElement]);

  const toggleVoice = () => {
    if (isVoiceEnabled) {
      voiceTrainer.stopCurrentSpeech();
      setIsVoiceEnabled(false);
      setCurrentElement(null);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      toast.info('Voice guidance disabled');
    } else {
      setIsVoiceEnabled(true);
      voiceTrainer.initializePageGuidance();
      toast.success('Voice guidance enabled');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 voice-trainer-controls">
      <Button
        variant={isVoiceEnabled ? "default" : "outline"}
        size="sm"
        onClick={toggleVoice}
        className={`h-10 w-10 p-0 rounded-full shadow-lg ${
          isVoiceEnabled 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-white hover:bg-gray-50 text-gray-600 border-2'
        }`}
        title={isVoiceEnabled ? "Disable voice guidance" : "Enable voice guidance"}
      >
        {isVoiceEnabled ? (
          <Volume2 className={`h-5 w-5 ${isPlaying ? 'animate-pulse' : ''}`} />
        ) : (
          <VolumeX className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};

export default VoiceTrainer;
