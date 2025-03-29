
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

interface GuideCompleteButtonProps {
  guideId: string;
}

const GuideCompleteButton = ({ guideId }: GuideCompleteButtonProps) => {
  const [completing, setCompleting] = useState(false);
  const navigate = useNavigate();

  const handleComplete = () => {
    setCompleting(true);
    
    // Create a canvas for the confetti
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '999';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    
    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true
    });
    
    // First burst of confetti
    myConfetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5, x: 0.5 },
      colors: ['#9b87f5', '#ffffff', '#7E69AB'],
      shapes: ['square', 'circle'],
    });
    
    // Second burst after a delay
    setTimeout(() => {
      myConfetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0.6, x: 0.5 },
        colors: ['#9b87f5', '#ffffff', '#7E69AB'],
        shapes: ['square', 'circle']
      });
    }, 700);
    
    // Show a success toast
    toast.success("Guide completed!", {
      description: "Congratulations on completing this guide!",
      duration: 4000,
    });
    
    // Clean up and navigate after animation
    setTimeout(() => {
      document.body.removeChild(canvas);
      navigate('/guides');
    }, 3000);
  };

  return (
    <Button
      className="guide-complete-button flex items-center space-x-2"
      onClick={handleComplete}
      disabled={completing}
    >
      <Check className="h-5 w-5" />
      <span>{completing ? "Completing..." : "Complete Guide"}</span>
    </Button>
  );
};

export default GuideCompleteButton;
