import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DonateButton from '@/components/DonateButton';

const TOS = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{t('tos.meta.title')}</title>
        <meta name="description" content={t('tos.meta.description')} />
        <meta property="og:title" content={t('tos.meta.ogTitle')} />
        <meta property="og:description" content={t('tos.meta.ogDescription')} />
        <meta property="og:image" content="https://renderdragon.org/ogimg/tos.png" />
        <meta property="og:url" content="https://renderdragon.org/tos" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('tos.meta.twitterTitle')} />
        <meta name="twitter:image" content="https://renderdragon.org/ogimg/tos.png" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 cow-grid-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-vt323 mb-8 text-center">
              {t('tos.title.part1')} <span className="text-cow-purple">{t('tos.title.part2')}</span>
            </h1>

            <div className="pixel-card space-y-6">
              <div className="space-y-4 text-muted-foreground">
                <section>
                  <h2 className="text-2xl font-vt323 text-foreground">1. {t('tos.sections.acceptance.title')}</h2>
                  <p>{t('tos.sections.acceptance.content')}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-vt323 text-foreground">2. {t('tos.sections.resources.title')}</h2>
                  <p>{t('tos.sections.resources.content')}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-vt323 text-foreground">3. {t('tos.sections.liability.title')}</h2>
                  <p>{t('tos.sections.liability.content')}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-vt323 text-foreground">4. {t('tos.sections.copyright.title')}</h2>
                  <p>{t('tos.sections.copyright.content')}</p>
                  <p>{t('tos.sections.copyright.additional')}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-vt323 text-foreground">5. {t('tos.sections.issues.title')}</h2>
                  <p>{t('tos.sections.issues.intro')}</p>
                  <p>{t('tos.sections.issues.ownership')}</p>
                  <p>{t('tos.sections.issues.liability')}</p>
                  <p>{t('tos.sections.issues.reporting')}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-vt323 text-foreground">6. {t('tos.sections.conduct.title')}</h2>
                  <p>{t('tos.sections.conduct.intro')}</p>
                  <ul className="list-disc pl-6 space-y-1">
                    {(t('tos.sections.conduct.rules', { returnObjects: true }) as string[]).map((rule, index) => (
                      <li key={index}>{rule}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-vt323 text-foreground">7. {t('tos.sections.changes.title')}</h2>
                  <p>{t('tos.sections.changes.content')}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-vt323 text-foreground">8. {t('tos.sections.contact.title')}</h2>
                  <p>{t('tos.sections.contact.content')} <a href="https://renderdragon.org" className="underline">renderdragon.org</a>.</p>
                </section>

                <p className="text-sm border-t border-border pt-4 mt-8">
                  {t('tos.lastUpdated')}: {t('common.april')} 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <DonateButton />
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default TOS;