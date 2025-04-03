
import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Card } from './ui/card';

interface WaveSurferPlayerProps {
  audioUrl: string;
  waveColor?: string;
  progressColor?: string;
}

const WaveSurferPlayer = ({ 
  audioUrl, 
  waveColor = 'rgba(155, 135, 245, 0.5)', 
  progressColor = 'rgba(155, 135, 245, 1)' 
}: WaveSurferPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [isLoaded, setIsLoaded] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const previousVolume = useRef(1);

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds - minutes * 60);
    return `${minutes}:${secondsRemainder.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const loadWaveSurfer = async () => {
      if (containerRef.current && !wavesurferRef.current) {
        setIsLoading(true);
        try {
          // Dynamic import of wavesurfer.js
          const WaveSurfer = (await import('wavesurfer.js')).default;
          
          // Create WaveSurfer instance with improved options
          const wavesurfer = WaveSurfer.create({
            container: containerRef.current,
            waveColor: waveColor,
            progressColor: progressColor,
            height: 80,
            barWidth: 2,
            barGap: 1,
            barRadius: 2,
            cursorWidth: 0,
            normalize: true,
            backend: 'WebAudio',
            hideScrollbar: true,
            responsive: true,
            interact: true,
            minPxPerSec: 50,
          });
          
          // Load audio file
          wavesurfer.load(audioUrl);
          
          // Handle events
          wavesurfer.on('ready', () => {
            wavesurferRef.current = wavesurfer;
            setDuration(formatTime(wavesurfer.getDuration()));
            setIsLoaded(true);
            setIsLoading(false);
          });
          
          wavesurfer.on('audioprocess', () => {
            setCurrentTime(formatTime(wavesurfer.getCurrentTime()));
          });
          
          wavesurfer.on('finish', () => {
            setIsPlaying(false);
          });
          
          wavesurfer.on('error', (err: any) => {
            console.error('WaveSurfer error:', err);
            setIsLoading(false);
          });
          
          // Enable seeking
          wavesurfer.on('seek', () => {
            setCurrentTime(formatTime(wavesurfer.getCurrentTime()));
          });
          
          return () => {
            if (wavesurferRef.current) {
              wavesurferRef.current.destroy();
            }
          };
        } catch (error) {
          console.error('Error loading WaveSurfer:', error);
          setIsLoaded(false);
          setIsLoading(false);
        }
      }
    };
    
    loadWaveSurfer();
    
    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [audioUrl, waveColor, progressColor]);
  
  const togglePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = () => {
    if (wavesurferRef.current) {
      if (isMuted) {
        wavesurferRef.current.setVolume(previousVolume.current);
        setVolume(previousVolume.current);
      } else {
        previousVolume.current = volume;
        wavesurferRef.current.setVolume(0);
        setVolume(0);
      }
      setIsMuted(!isMuted);
    }
  };
  
  const handleVolumeChange = (newVolume: number[]) => {
    const volumeValue = newVolume[0];
    setVolume(volumeValue);
    setIsMuted(volumeValue === 0);
    
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(volumeValue);
    }
  };

  return (
    <Card className="p-4 bg-background/50 backdrop-blur border-muted-foreground/10">
      {isLoading ? (
        <div className="flex items-center justify-center h-24">
          <div className="wavesurfer-loading-animation">
            <div></div><div></div><div></div><div></div>
          </div>
        </div>
      ) : (
        <>
          <div 
            ref={containerRef} 
            className="wavesurfer-container cursor-pointer mb-4"
          ></div>
          
          <div className="audio-controls flex items-center space-x-4">
            <Button 
              onClick={togglePlayPause}
              className="audio-play-pause"
              disabled={!isLoaded}
              size="icon"
              variant="ghost"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
            </Button>
            
            <div className="audio-time text-xs text-muted-foreground min-w-[70px]">
              {currentTime} / {duration}
            </div>
            
            <div className="volume-control flex items-center space-x-2 flex-grow">
              <Button
                onClick={toggleMute}
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                <span className="sr-only">{isMuted ? 'Unmute' : 'Mute'}</span>
              </Button>
              
              <div className="volume-slider w-24">
                <Slider
                  value={[volume]}
                  min={0}
                  max={1}
                  step={0.1}
                  onValueChange={handleVolumeChange}
                />
              </div>
            </div>
          </div>

          <style jsx global>{`
            .wavesurfer-loading-animation {
              display: inline-block;
              position: relative;
              width: 80px;
              height: 80px;
            }
            .wavesurfer-loading-animation div {
              position: absolute;
              top: 33px;
              width: 13px;
              height: 13px;
              border-radius: 50%;
              background: rgba(155, 135, 245, 0.8);
              animation-timing-function: cubic-bezier(0, 1, 1, 0);
            }
            .wavesurfer-loading-animation div:nth-child(1) {
              left: 8px;
              animation: wavesurfer-loading-animation1 0.6s infinite;
            }
            .wavesurfer-loading-animation div:nth-child(2) {
              left: 8px;
              animation: wavesurfer-loading-animation2 0.6s infinite;
            }
            .wavesurfer-loading-animation div:nth-child(3) {
              left: 32px;
              animation: wavesurfer-loading-animation2 0.6s infinite;
            }
            .wavesurfer-loading-animation div:nth-child(4) {
              left: 56px;
              animation: wavesurfer-loading-animation3 0.6s infinite;
            }
            @keyframes wavesurfer-loading-animation1 {
              0% {
                transform: scale(0);
              }
              100% {
                transform: scale(1);
              }
            }
            @keyframes wavesurfer-loading-animation3 {
              0% {
                transform: scale(1);
              }
              100% {
                transform: scale(0);
              }
            }
            @keyframes wavesurfer-loading-animation2 {
              0% {
                transform: translate(0, 0);
              }
              100% {
                transform: translate(24px, 0);
              }
            }
          `}</style>
        </>
      )}
    </Card>
  );
};

export default WaveSurferPlayer;
