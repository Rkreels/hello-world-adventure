
import { useState, useEffect, useRef } from 'react';
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
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      const element = e.target as HTMLElement;
      
      // Skip if it's the same element or a child of the last element
      if (lastElementRef.current && 
          (element === lastElementRef.current || lastElementRef.current.contains(element))) {
        return;
      }

      // Clear any existing timeout
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }

      // Stop current speech immediately when hovering over a new element
      voiceTrainer.stopCurrentSpeech();
      
      // Set new timeout with reduced delay for faster response
      hoverTimeoutRef.current = setTimeout(() => {
        const elementInfo = voiceTrainer.getElementInfo(element);
        
        if (elementInfo && elementInfo !== currentElement) {
          setCurrentElement(elementInfo);
          lastElementRef.current = element;
          voiceTrainer.guideElement(element);
          setShowCursor(true);
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, 200); // Reduced from 800ms to 200ms for faster response
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
      }, 500); // Reduced delay for faster page guidance
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
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
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
          outline: 3px solid #10b981 !important;
          outline-offset: 2px !important;
          background-color: rgba(16, 185, 129, 0.15) !important;
          border-radius: 6px !important;
          animation: pulse 1.5s infinite !important;
          position: relative !important;
          z-index: 1000 !important;
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.4) !important;
        }
        
        .voice-trainer-highlight::before {
          content: '';
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          background: linear-gradient(45deg, #10b981, #34d399, #6ee7b7);
          border-radius: 8px;
          z-index: -1;
          opacity: 0.4;
          animation: glow 1s infinite alternate;
        }
        
        .voice-trainer-cursor {
          position: fixed;
          width: 24px;
          height: 24px;
          background: linear-gradient(45deg, #10b981, #34d399);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: all 0.2s ease;
          box-shadow: 0 0 25px rgba(16, 185, 129, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
        }
        
        @keyframes glow {
          0% { opacity: 0.4; }
          100% { opacity: 0.7; }
        }
      `}</style>

      {showCursor && (
        <div 
          className="voice-trainer-cursor"
          style={{
            left: cursorPosition.x - 12,
            top: cursorPosition.y - 12,
          }}
        >
          <MousePointer className="h-3 w-3 text-white" />
        </div>
      )}

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
