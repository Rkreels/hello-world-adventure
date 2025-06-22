
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Pause, Play, Settings, X } from 'lucide-react';
import { voiceTrainer } from '@/services/voiceTrainer';
import { toast } from 'sonner';

const VoiceTrainer = () => {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentElement, setCurrentElement] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.9);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [showSettings, setShowSettings] = useState(false);
  const lastElementRef = useRef<HTMLElement | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      toast.error('Text-to-speech is not supported in your browser');
      setIsVoiceEnabled(false);
      return;
    }

    const interval = setInterval(() => {
      const speaking = speechSynthesis.speaking;
      const paused = speechSynthesis.paused;
      setIsPlaying(speaking && !paused);
      setIsPaused(speaking && paused);
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
    voiceTrainer.updateSettings({ volume, speechRate });
  }, [volume, speechRate]);

  useEffect(() => {
    if (!isVoiceEnabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const element = e.target as HTMLElement;
      
      // Clear existing timeout
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      
      // Skip if it's the same element or a child of the last element
      if (lastElementRef.current && 
          (element === lastElementRef.current || lastElementRef.current.contains(element))) {
        return;
      }

      // Skip voice trainer elements to avoid feedback loops
      if (element.closest('.voice-trainer-controls')) {
        return;
      }

      // Skip very small or insignificant elements
      const rect = element.getBoundingClientRect();
      if (rect.width < 20 || rect.height < 20) {
        return;
      }

      // Stop current speech immediately when hovering over a new element
      voiceTrainer.stopCurrentSpeech();
      setCurrentElement(null);
      
      // Add small delay for smoother interaction
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
      
      // Clear hover timeout on click
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

    // Add event listeners with passive option for better performance
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('click', handleClick);
    window.addEventListener('popstate', handleLocationChange);

    // Listen for React Router navigation
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
      toast.success('Voice guidance enabled - hover over elements for comprehensive guidance');
    }
  };

  const pauseResumeSpeech = () => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause();
      setIsPaused(true);
      toast.info('Speech paused');
    } else if (speechSynthesis.paused) {
      speechSynthesis.resume();
      setIsPaused(false);
      toast.info('Speech resumed');
    }
  };

  const stopSpeech = () => {
    voiceTrainer.stopCurrentSpeech();
    setCurrentElement(null);
    toast.info('Speech stopped');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 voice-trainer-controls">
      {/* Compact floating controls */}
      <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border-2 border-green-200 p-2">
        {/* Main toggle */}
        <Button
          variant={isVoiceEnabled ? "default" : "outline"}
          size="sm"
          onClick={toggleVoice}
          className="h-8 w-8 p-0"
          title={isVoiceEnabled ? "Disable voice guidance" : "Enable voice guidance"}
        >
          {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </Button>

        {/* Pause/Resume/Stop controls - only show when voice is enabled */}
        {isVoiceEnabled && (
          <>
            {(isPlaying || isPaused) && (
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={pauseResumeSpeech}
                  className="h-8 w-8 p-0"
                  title={isPaused ? "Resume speech" : "Pause speech"}
                >
                  {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={stopSpeech}
                  className="h-8 w-8 p-0"
                  title="Stop speech"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Settings toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="h-8 w-8 p-0"
              title="Voice settings"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Status indicator */}
        <div className="flex items-center gap-1">
          {isVoiceEnabled ? (
            isPlaying ? (
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 font-medium">Speaking</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-blue-600 font-medium">Ready</span>
              </div>
            )
          ) : (
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              <span className="text-xs text-gray-400">Off</span>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced settings panel */}
      {showSettings && isVoiceEnabled && (
        <div className="absolute bottom-full right-0 mb-2 w-72 bg-white rounded-lg shadow-lg border p-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Volume: {Math.round(volume * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Speech Rate: {speechRate}x
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={speechRate}
                onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded">
              <p className="mb-2 font-medium">Voice Training Features:</p>
              <ul className="space-y-1 text-xs">
                <li>• Hover for instant, comprehensive guidance</li>
                <li>• Press Escape to stop speech immediately</li>
                <li>• Click elements for action confirmation</li>
                <li>• Function-specific detailed instructions</li>
                <li>• Context-aware business guidance</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceTrainer;
