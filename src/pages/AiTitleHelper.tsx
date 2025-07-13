import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

/**
 * AI Title Helper component that generates engaging video titles using AI.
 */
const AiTitleHelper = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{t('aiTitleHelper.seo.title')}</title>
        <meta name="description" content={t('aiTitleHelper.seo.description')} />
      </Helmet>
      <Navbar />
      <main className="flex-grow pt-24 pb-16 flex items-center justify-center cow-grid-bg">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-vt323 text-center mb-6">
              {t('aiTitleHelper.pageTitle')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t('aiTitleHelper.comingSoon')}
            </p>
          </div>
          
          {/* Placeholder for future implementation */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-2xl font-vt323 mb-4">
              {t('aiTitleHelper.form.title')}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t('aiTitleHelper.form.description')}
            </p>
            
            <div className="space-y-4">
              <div>
                <textarea
                  className="w-full p-3 border rounded-md bg-background text-foreground min-h-[120px]"
                  placeholder={t('aiTitleHelper.form.inputPlaceholder')}
                  disabled
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  disabled
                >
                  {t('aiTitleHelper.form.generateButton')}
                </button>
              </div>
              
              <div className="mt-6 p-4 bg-muted/30 rounded-md">
                <h3 className="font-medium mb-2">{t('aiTitleHelper.form.tips')}</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• {t('aiTitleHelper.form.tip1')}</li>
                  <li>• {t('aiTitleHelper.form.tip2')}</li>
                  <li>• {t('aiTitleHelper.form.tip3')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AiTitleHelper;
