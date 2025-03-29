
import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from './ui/button';

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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds - minutes * 60);
    return `${minutes}:${secondsRemainder.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const loadWaveSurfer = async () => {
      if (containerRef.current && !wavesurferRef.current) {
        try {
          // Dynamic import of wavesurfer.js
          const WaveSurfer = (await import('wavesurfer.js')).default;
          
          // Create WaveSurfer instance
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
            responsive: true,
          });
          
          // Load audio file
          wavesurfer.load(audioUrl);
          
          // Handle events
          wavesurfer.on('ready', () => {
            wavesurferRef.current = wavesurfer;
            setDuration(formatTime(wavesurfer.getDuration()));
            setIsLoaded(true);
          });
          
          wavesurfer.on('audioprocess', () => {
            setCurrentTime(formatTime(wavesurfer.getCurrentTime()));
          });
          
          wavesurfer.on('finish', () => {
            setIsPlaying(false);
          });
          
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
  
  return (
    <div className="audio-player-container">
      <div 
        ref={containerRef} 
        className="wavesurfer-container"
      ></div>
      
      <div className="audio-controls">
        <Button 
          onClick={togglePlayPause}
          className="audio-play-pause"
          disabled={!isLoaded}
          size="icon"
          variant="ghost"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </Button>
        
        <div className="audio-time">
          {currentTime} / {duration}
        </div>
      </div>
    </div>
  );
};

export default WaveSurferPlayer;
