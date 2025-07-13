import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Download, Upload } from 'lucide-react';
import { useResources } from '@/hooks/useResources';
import { Resource } from '@/types/resources';
import { TextSettings } from '@/types/textGenerator';
import TextPreview from '@/components/text-generator/TextPreview';
import { toast } from 'sonner';
import TextGeneratorControlsSkeleton from '@/components/skeletons/TextGeneratorControlsSkeleton';

const TextGenerator = () => {
  const { t } = useTranslation('textGenerator');
  const { resources, isLoading: isLoadingResources } = useResources();
  const [fonts, setFonts] = useState<Resource[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [settings, setSettings] = useState<TextSettings>({
    text: t('defaults.text'),
    font: t('defaults.font'),
    fontSize: 21,
    lineHeight: 1.2,
    characterSpacing: 0,
    rotation: 0,
    curve: 0,
    shadow: {
      enabled: false,
      offsetX: 2,
      offsetY: 2,
      blur: 2,
      color: '#000000',
    },
    outline: {
      enabled: false,
      width: 1,
      color: '#000000',
    },
    color: {
      type: 'solid',
      value: '#ffffff',
      gradientType: 'linear',
      gradientStart: '#ffffff',
      gradientEnd: '#000000',
      opacity: 1,
    },
  });

  useEffect(() => {
    // Filter fonts from resources
    const fontResources = resources.filter(r => r.category === 'fonts');
    setFonts(fontResources);
  }, [resources]);

  const handleTextChange = (value: string) => {
    setSettings(prev => ({ ...prev, text: value }));
  };

  const handleFontChange = (value: string) => {
    setSettings(prev => ({ ...prev, font: value }));
  };

  const handleColorTypeChange = (value: 'solid' | 'gradient') => {
    setSettings(prev => ({
      ...prev,
      color: { ...prev.color, type: value }
    }));
  };

  const handleDownload = async () => {
    if (!canvasRef.current) return;

    try {
      // Create a temporary link element
      const link = document.createElement('a');
      link.download = 'minecraft-text.png';
      
      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvasRef.current?.toBlob((blob) => {
          if (blob) resolve(blob);
        }, 'image/png');
      });

      // Create object URL and trigger download
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.click();

      // Clean up
      URL.revokeObjectURL(url);
      
      toast.success(t('downloadSuccess'));
    } catch (error) {
      console.error('Error downloading text:', error);
      toast.error(t('downloadError'));
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('seo.title')} - Renderdragon</title>
        <meta name="description" content={t('seo.description')} />
        <meta property="og:title" content={`${t('seo.title')} - Renderdragon`} />
        <meta property="og:description" content={t('seo.description')} />
        <meta property="og:image" content="https://renderdragon.org/ogimg/text-generator.png" />
        <meta property="og:url" content="https://renderdragon.org/text-generator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${t('seo.title')} - Renderdragon`} />
        <meta name="twitter:image" content="https://renderdragon.org/ogimg/text-generator.png" />
      </Helmet>

      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 cow-grid-bg custom-scrollbar">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-vt323 mb-8 text-center">
              <span className="text-cow-purple">{t('title')}</span> {t('subtitle')}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Preview Section */}
              <div className="pixel-card p-6 bg-black/50 min-h-[400px] flex items-center ">
                <TextPreview settings={settings} canvasRef={canvasRef} />
              </div>

              {/* Controls Section */}
              {isLoadingResources ? <TextGeneratorControlsSkeleton /> : (
              <div className="space-y-6">
                {/* Text Input */}
                <div className="space-y-2">
                  <Label>{t('controls.text')}</Label>
                  <Input
                    value={settings.text}
                    onChange={(e) => handleTextChange(e.target.value)}
                    placeholder={t('placeholders.text')}
                  />
                </div>

                {/* Font Selection */}
                <div className="space-y-2">
                  <Label>{t('controls.font')}</Label>
                  <Select value={settings.font} onValueChange={handleFontChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('placeholders.selectFont')} />
                    </SelectTrigger>
                    <SelectContent>
                      {fonts.map((font) => (
                        <SelectItem key={font.id} value={font.title}>
                          {font.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Font Size */}
                <div className="space-y-2">
                  <Label>{t('controls.fontSize', { size: settings.fontSize })}</Label>
                  <Slider
                    value={[settings.fontSize]}
                    onValueChange={([value]) => setSettings(prev => ({ ...prev, fontSize: value }))}
                    min={8}
                    max={128}
                    step={1}
                  />
                </div>

                {/* Line Height */}
                <div className="space-y-2">
                  <Label>{t('controls.lineHeight', { height: settings.lineHeight })}</Label>
                  <Slider
                    value={[settings.lineHeight]}
                    onValueChange={([value]) => setSettings(prev => ({ ...prev, lineHeight: value }))}
                    min={0.8}
                    max={2}
                    step={0.1}
                  />
                </div>

                {/* Character Spacing */}
                <div className="space-y-2">
                  <Label>{t('controls.characterSpacing', { spacing: settings.characterSpacing })}</Label>
                  <Slider
                    value={[settings.characterSpacing]}
                    onValueChange={([value]) => setSettings(prev => ({ ...prev, characterSpacing: value }))}
                    min={-5}
                    max={20}
                    step={1}
                  />
                </div>

                {/* Rotation */}
                <div className="space-y-2">
                  <Label>{t('controls.rotation', { degrees: settings.rotation })}</Label>
                  <Slider
                    value={[settings.rotation]}
                    onValueChange={([value]) => setSettings(prev => ({ ...prev, rotation: value }))}
                    min={-180}
                    max={180}
                    step={1}
                  />
                </div>

                {/* Curve */}
                <div className="space-y-2">
                  <Label>{t('controls.curve', { degrees: settings.curve })}</Label>
                  <Slider
                    value={[settings.curve]}
                    onValueChange={([value]) => setSettings(prev => ({ ...prev, curve: value }))}
                    min={-180}
                    max={180}
                    step={1}
                  />
                </div>

                {/* Shadow Controls */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={settings.shadow.enabled}
                      onCheckedChange={(checked) =>
                        setSettings(prev => ({
                          ...prev,
                          shadow: { ...prev.shadow, enabled: checked }
                        }))
                      }
                    />
                    <Label>{t('controls.shadow')}</Label>
                  </div>

                  {settings.shadow.enabled && (
                    <div className="space-y-4 pl-6">
                      <div className="space-y-2">
                        <Label>{t('controls.shadowOffsetX', { offset: settings.shadow.offsetX })}</Label>
                        <Slider
                          value={[settings.shadow.offsetX]}
                          onValueChange={([value]) =>
                            setSettings(prev => ({
                              ...prev,
                              shadow: { ...prev.shadow, offsetX: value }
                            }))
                          }
                          min={-20}
                          max={20}
                          step={1}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>{t('controls.shadowOffsetY', { offset: settings.shadow.offsetY })}</Label>
                        <Slider
                          value={[settings.shadow.offsetY]}
                          onValueChange={([value]) =>
                            setSettings(prev => ({
                              ...prev,
                              shadow: { ...prev.shadow, offsetY: value }
                            }))
                          }
                          min={-20}
                          max={20}
                          step={1}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>{t('controls.shadowBlur', { blur: settings.shadow.blur })}</Label>
                        <Slider
                          value={[settings.shadow.blur]}
                          onValueChange={([value]) =>
                            setSettings(prev => ({
                              ...prev,
                              shadow: { ...prev.shadow, blur: value }
                            }))
                          }
                          min={0}
                          max={20}
                          step={1}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>{t('controls.shadowColor')}</Label>
                        <Input
                          type="color"
                          value={settings.shadow.color}
                          onChange={(e) =>
                            setSettings(prev => ({
                              ...prev,
                              shadow: { ...prev.shadow, color: e.target.value }
                            }))
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Outline Controls */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={settings.outline.enabled}
                      onCheckedChange={(checked) =>
                        setSettings(prev => ({
                          ...prev,
                          outline: { ...prev.outline, enabled: checked }
                        }))
                      }
                    />
                    <Label>{t('controls.outline')}</Label>
                  </div>

                  {settings.outline.enabled && (
                    <div className="space-y-4 pl-6">
                      <div className="space-y-2">
                        <Label>{t('controls.outlineWidth', { width: settings.outline.width })}</Label>
                        <Slider
                          value={[settings.outline.width]}
                          onValueChange={([value]) =>
                            setSettings(prev => ({
                              ...prev,
                              outline: { ...prev.outline, width: value }
                            }))
                          }
                          min={1}
                          max={10}
                          step={1}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>{t('controls.outlineColor')}</Label>
                        <Input
                          type="color"
                          value={settings.outline.color}
                          onChange={(e) =>
                            setSettings(prev => ({
                              ...prev,
                              outline: { ...prev.outline, color: e.target.value }
                            }))
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Color Controls */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>{t('controls.colorType')}</Label>
                    <Select
                      value={settings.color.type}
                      onValueChange={(value: 'solid' | 'gradient') => handleColorTypeChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('placeholders.selectColorType')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solid">{t('colorTypes.solid')}</SelectItem>
                        <SelectItem value="gradient">{t('colorTypes.gradient')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {settings.color.type === 'solid' && (
                    <div className="space-y-2">
                      <Label>{t('controls.color')}</Label>
                      <Input
                        type="color"
                        value={settings.color.value}
                        onChange={(e) =>
                          setSettings(prev => ({
                            ...prev,
                            color: { ...prev.color, value: e.target.value }
                          }))
                        }
                      />
                    </div>
                  )}

                  {settings.color.type === 'gradient' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Label>{t('controls.gradientType')}</Label>
                        <Select
                          value={settings.color.gradientType || 'linear'}
                          onValueChange={(value) => setSettings(prev => ({
                            ...prev,
                            color: {
                              ...prev.color,
                              gradientType: value as 'linear' | 'radial' | 'conic'
                            }
                          }))}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={t('placeholders.selectGradientType')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="linear">{t('gradientTypes.linear')}</SelectItem>
                            <SelectItem value="radial">{t('gradientTypes.radial')}</SelectItem>
                            <SelectItem value="conic">{t('gradientTypes.conic')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>{t('controls.startColor')}</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={settings.color.gradientStart || '#ffffff'}
                              onChange={(e) => setSettings(prev => ({
                                ...prev,
                                color: {
                                  ...prev.color,
                                  gradientStart: e.target.value
                                }
                              }))}
                              className="w-12 h-10 p-1"
                            />
                            <Input
                              type="text"
                              value={settings.color.gradientStart || '#ffffff'}
                              onChange={(e) => setSettings(prev => ({
                                ...prev,
                                color: {
                                  ...prev.color,
                                  gradientStart: e.target.value
                                }
                              }))}
                              className="flex-1"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>{t('controls.endColor')}</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={settings.color.gradientEnd || '#000000'}
                              onChange={(e) => setSettings(prev => ({
                                ...prev,
                                color: {
                                  ...prev.color,
                                  gradientEnd: e.target.value
                                }
                              }))}
                              className="w-12 h-10 p-1"
                            />
                            <Input
                              type="text"
                              value={settings.color.gradientEnd || '#000000'}
                              onChange={(e) => setSettings(prev => ({
                                ...prev,
                                color: {
                                  ...prev.color,
                                  gradientEnd: e.target.value
                                }
                              }))}
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>{t('controls.opacity', { opacity: settings.color.opacity })}</Label>
                    <Slider
                      value={[settings.color.opacity]}
                      onValueChange={([value]) =>
                        setSettings(prev => ({
                          ...prev,
                          color: { ...prev.color, opacity: value }
                        }))
                      }
                      min={0}
                      max={1}
                      step={0.1}
                    />
                  </div>
                </div>

                {/* Download Button */}
                <Button
                  className="w-full pixel-corners bg-cow-purple hover:bg-cow-purple/80"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {t('downloadButton')}
                </Button>
              </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default TextGenerator;