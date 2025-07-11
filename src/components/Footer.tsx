import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import Logo from './Logo';
import HyperpingBadge from '@/components/ui/StatusBadge';

const Footer = () => {
  const { t } = useTranslation();
  const [cartClicked, setCartClicked] = useState(false);
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const currentYear = new Date().getFullYear();

  const handleCartClick = () => {
    if (cartClicked) return;
    
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
    
    myConfetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.8 }
    });
    
    setTimeout(() => {
      document.body.removeChild(canvas);
    }, 3000);
    
    toast(t('footer.madeByToastTitle'), {
      description: t('footer.madeByToastDescription'),
      position: "bottom-center",
      duration: 3000,
    });
    
    setCartClicked(true);
    
    if (cartButtonRef.current) {
      cartButtonRef.current.style.transform = 'translateX(150%)';
    }
  };

  return (
    <footer className="bg-cow-dark text-white overflow-x-hidden">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-xl font-bold mb-4"
            >
              <div className="flex items-center justify-center">
                <Logo size="sm" />
              </div>
              <span className="font-pixel">Renderdragon</span>
            </Link>
            
            <p className="text-white/70 mb-6 max-w-md">
              {t('footer.description')}
            </p>
            
            <div className="flex space-x-4 mb-3">
              <a 
                href="https://discord.renderdragon.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                aria-label="Discord"
              >
                <img className="w-6 h-6" src="/assets/discord_icon.png" alt="Discord" loading="lazy" />
              </a>
              
              <a 
                href="https://x.com/_renderdragon" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                aria-label="Twitter"
              >
                <img className="w-6 h-6" src="/assets/twitter_icon.png" alt="Twitter" loading="lazy" />
              </a>
              
              <a 
                href="https://www.youtube.com/channel/UCOheNYpPEHcS2ljttRmllxg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                aria-label="YouTube"
              >
                <img className="w-6 h-6" src="/assets/youtube_icon.png" alt="YouTube" loading="lazy" />
              </a>
              
              <a 
                href="https://github.com/Yxmura/renderdragon" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                aria-label="GitHub"
              >
                <img className="w-6 h-6" src="/assets/github_icon.png" alt="GitHub" loading="lazy" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-vt323 mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tos" className="text-white/70 hover:text-white transition-colors">
                  {t('footer.termsOfService')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white/70 hover:text-white transition-colors">
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
            </ul>
            
            <h3 className="text-lg font-vt323 mb-4 mt-6">{t('footer.navigate')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition-colors">
                  {t('footer.home')}
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-white/70 hover:text-white transition-colors">
                  {t('footer.resourcesHub')}
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-white/70 hover:text-white transition-colors">
                  {t('footer.guides')}
                </Link>
              </li>
              <li>
                <Link to="/utilities" className="text-white/70 hover:text-white transition-colors">
                  {t('footer.utilities')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-white transition-colors">
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-vt323 mb-4">{t('footer.tools')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/gappa" className="text-white/70 hover:text-white transition-colors">
                  {t('footer.musicCopyrightChecker')}
                </Link>
              </li>
              <li>
                <Link to="/background-generator" className="text-white/70 hover:text-white transition-colors">
                  {t('footer.backgroundGenerator')}
                </Link>
              </li>
              <li>
                <Link to="/player-renderer" className="text-white/70 hover:text-white transition-colors">
                  {t('footer.playerRenderer')}
                </Link>
              </li>
              <li>
                <Link to="/renderbot" className="text-white/70 hover:text-white transition-colors">
                  {t('footer.renderbot')}
                </Link>
              </li>
              <li>
                <Link to="/text-generator" className="text-white/70 hover:text-white transition-colors">
                  {t('footer.textGenerator')}
                </Link>
              </li>
              <li>
                <Link to="/generators" className="text-white/70 hover:text-white transition-colors">
                  {t('footer.contentGenerators')}
                </Link>
              </li>
              <li>
                <Link to="/youtube-downloader" className="text-white/70 hover:text-white transition-colors flex items-center">
                  <span>{t('footer.youtubeDownloader')}</span>
                  <span className="ml-1 px-1.5 py-0.5 bg-cow-purple text-white text-[10px] rounded align-middle">{t('footer.newTag')}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Link to="/faq" className="text-white/70 hover:text-white transition-colors text-sm relative">
              {t('footer.faq')}
            </Link>
            
            <Link to="/tos" className="text-white/70 hover:text-white transition-colors text-sm">
              {t('footer.terms')}
            </Link>
            
            <Link to="/privacy" className="text-white/70 hover:text-white transition-colors text-sm">
              {t('footer.privacy')}
            </Link>

            <Link to="/renderbot" className="text-white/70 hover:text-white transition-colors text-sm">
              {t('footer.renderbot')}
            </Link>

            <HyperpingBadge status="online" />

            <div className="text-white/70 text-sm">
              <span className="mr-4">{t('footer.notAssociated')}</span>
              <a href="https://www.flaticon.com/free-icons/pixel" title="pixel icons" className="hover:text-white transition-colors">{t('footer.iconCredit')}</a>
            </div>
          </div>

          <div className="flex items-center">
            <p className="text-white/70 text-sm">
              {t('footer.copyright', { year: currentYear })}
            </p>
            
            <button 
              ref={cartButtonRef}
              onClick={handleCartClick}
              className="ml-4 p-2 bg-white/10 hover:bg-white/20 rounded-md transition-all duration-1000"
              disabled={cartClicked}
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);