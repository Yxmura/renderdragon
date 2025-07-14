import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface DiscordPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onNeverShowAgain: () => void;
}

const DiscordPopup = ({ isOpen, onClose, onNeverShowAgain }: DiscordPopupProps) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="pixel-corners bg-background border-primary text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle className="font-vt323 text-2xl text-primary">
                  {t('join_title')}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {t('join_desc')}
                </DialogDescription>
              </DialogHeader>
              <div className="my-4 flex justify-center">
                <img 
                  src="/assets/discord_icon.png" 
                  alt="Discord Icon" 
                  className="w-16 h-16" 
                />
              </div>
              <DialogFooter className="gap-2 sm:justify-center">
                <Button 
                  onClick={() => window.open('https://discord.renderdragon.org', '_blank')}
                  className="pixel-corners bg-cow-purple hover:bg-cow-purple-dark"
                >
                  {t('join_now')}
                </Button>
                <Button 
                  onClick={() => {
                    onNeverShowAgain();
                    onClose();
                  }} 
                  variant="outline" 
                  className="pixel-corners"
                >
                  {t('never_show')}
                </Button>
              </DialogFooter>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default React.memo(DiscordPopup);
