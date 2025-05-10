export interface TextSettings {
  text: string;
  font: string;
  fontSize: number;
  lineHeight: number;
  characterSpacing: number;
  rotation: number;
  curve: number;
  shadow: {
    enabled: boolean;
    color: string;
    blur: number;
    offsetX: number;
    offsetY: number;
  };
  outline: {
    enabled: boolean;
    color: string;
    width: number;
  };
  color: {
    type: 'solid' | 'gradient' | 'pattern';
    value?: string;
    gradientType: 'linear' | 'radial' | 'conic';
    gradientStart?: string;
    gradientEnd?: string;
    pattern?: File;
    opacity: number;
  };
} 