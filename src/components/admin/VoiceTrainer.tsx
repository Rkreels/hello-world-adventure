
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { voiceTrainer } from '@/services/voiceTrainer';
import { toast } from 'sonner';

const VoiceTrainer = () => {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [currentElement, setCurrentElement] = useState<string | null>(null);
  const lastElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Check if speech synthesis is supported
    if (!('speechSynthesis' in window)) {
      toast.error('Text-to-speech is not supported in your browser');
      setIsVoiceEnabled(false);
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
      // Track cursor position internally but don't show visual cursor
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      const element = e.target as HTMLElement;
      
      // Skip if it's the same element or a child of the last element
      if (lastElementRef.current && 
          (element === lastElementRef.current || lastElementRef.current.contains(element))) {
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
      toast.info('Voice guidance enabled - hover over elements for instant guidance');
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

  return (
    <>
      <style>{`
        .voice-trainer-highlight {
          outline: 2px solid #10b981 !important;
          outline-offset: 1px !important;
          background-color: rgba(16, 185, 129, 0.05) !important;
          border-radius: 4px !important;
          position: relative !important;
          z-index: 1000 !important;
        }
      `}</style>

      <div className="fixed bottom-4 right-4 z-40">
        <div className="flex gap-2">
          <Button 
            variant={isVoiceEnabled ? "default" : "outline"}
            size="sm" 
            onClick={toggleVoice}
            className="shadow-lg transition-all duration-200 hover:scale-105"
          >
            {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
          
          {isVoiceEnabled && isPlaying && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={pauseResumeSpeech}
              className="shadow-lg transition-all duration-200 hover:scale-105"
            >
              {speechSynthesis.paused ? 'Resume' : 'Pause'}
            </Button>
          )}
        </div>
        
        {isVoiceEnabled && (
          <div className="mt-2 text-xs text-center text-gray-600 bg-white px-3 py-2 rounded-lg shadow-lg border">
            {isPlaying ? (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Speaking...
              </div>
            ) : (
              'Hover for instant guidance'
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default VoiceTrainer;
