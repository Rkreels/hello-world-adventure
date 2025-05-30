
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, MousePointer } from 'lucide-react';
import { voiceTrainer } from '@/services/voiceTrainer';
import { toast } from 'sonner';

const VoiceTrainer = () => {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [currentElement, setCurrentElement] = useState<string | null>(null);

  useEffect(() => {
    // Check if speech synthesis is supported
    if (!('speechSynthesis' in window)) {
      toast.error('Text-to-speech is not supported in your browser');
      setIsVoiceEnabled(false);
    }

    // Update playing state periodically
    const interval = setInterval(() => {
      setIsPlaying(speechSynthesis.speaking);
    }, 500);

    // Initialize page guidance
    if (isVoiceEnabled) {
      voiceTrainer.initializePageGuidance();
    }

    return () => clearInterval(interval);
  }, [isVoiceEnabled]);

  useEffect(() => {
    if (!isVoiceEnabled) return;

    let hoverTimeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        const element = e.target as HTMLElement;
        const elementInfo = voiceTrainer.getElementInfo(element);
        
        if (elementInfo && elementInfo !== currentElement) {
          setCurrentElement(elementInfo);
          voiceTrainer.guideElement(element);
          setShowCursor(true);
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, 800); // Wait 800ms before starting guidance
    };

    const handleClick = (e: MouseEvent) => {
      const element = e.target as HTMLElement;
      voiceTrainer.handleElementClick(element);
    };

    const handleLocationChange = () => {
      setTimeout(() => {
        voiceTrainer.handlePageChange();
      }, 1000); // Wait for page to load
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
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
      clearTimeout(hoverTimeout);
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
      toast.info('Voice guidance enabled - hover over elements for guidance');
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
          transition: all 0.3s ease;
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
            left: cursorPosition.x - 10,
            top: cursorPosition.y - 10,
          }}
        >
          <MousePointer className="h-4 w-4 text-white" />
        </div>
      )}

      <div className="fixed bottom-4 right-4 z-40">
        <div className="flex gap-2">
          <Button 
            variant={isVoiceEnabled ? "default" : "outline"}
            size="sm" 
            onClick={toggleVoice}
            className="shadow-lg"
          >
            {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
          
          {isVoiceEnabled && isPlaying && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={pauseResumeSpeech}
              className="shadow-lg"
            >
              {speechSynthesis.paused ? 'Resume' : 'Pause'}
            </Button>
          )}
        </div>
        
        {isVoiceEnabled && (
          <div className="mt-2 text-xs text-center text-gray-600 bg-white px-2 py-1 rounded shadow">
            {isPlaying ? 'Speaking...' : 'Hover for guidance'}
          </div>
        )}
      </div>
    </>
  );
};

export default VoiceTrainer;
