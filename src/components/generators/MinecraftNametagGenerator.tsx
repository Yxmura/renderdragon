import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import html2canvas from 'html2canvas';

const MinecraftNametagGenerator = () => {
  const [playerName, setPlayerName] = useState('');
  const nametagContainerRef = useRef<HTMLDivElement>(null);

  const renderNametag = () => {
    // The preview updates automatically through state
  };

  const exportAsPNG = () => {
    if (nametagContainerRef.current) {
      html2canvas(nametagContainerRef.current, {
        scale: 3,
        logging: false,
        useCORS: true,
        backgroundColor: null,
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'minecraft-nametag.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="playerName">Player Name</Label>
            <Input
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter player name"
              maxLength={16}
              className="pixel-corners"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-vt323">Rendered Nametag</h2>
        <div className="flex flex-col items-center gap-4">
          <Card 
            ref={nametagContainerRef}
            className="px-4 py-2 pixel-corners bg-black/40 flex items-center justify-center min-w-[60px] h-12 border-0"
          >
            <div className="flex items-center justify-center h-full">
              {playerName ? (
                <span 
                  className="font-minecraftia text-[28px] text-white leading-[1] whitespace-nowrap"
                  style={{
                    textShadow: `
                      1px 0 0 #000000,
                      -1px 0 0 #000000,
                      0 1px 0 #000000,
                      0 -1px 0 #000000
                    `,
                    WebkitFontSmoothing: 'none',
                    MozOsxFontSmoothing: 'grayscale',
                    imageRendering: 'crisp-edges',
                    transform: 'translateY(6px)'
                  }}
                >
                  {playerName}
                </span>
              ) : (
                <span className="text-muted-foreground">Enter a name to render</span>
              )}
            </div>
          </Card>
          <div className="flex gap-4 w-full">
            <Button 
              onClick={exportAsPNG} 
              className="flex-1 pixel-btn-primary"
              disabled={!playerName}
            >
              Export as PNG
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinecraftNametagGenerator; 