import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DonateButton from '@/components/DonateButton';
import { Helmet } from 'react-helmet-async';

const FAQ = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{t('faq.meta.title')}</title>
        <meta name="description" content={t('faq.meta.description')} />
        <meta property="og:title" content={t('faq.meta.ogTitle')} />
        <meta property="og:description" content={t('faq.meta.ogDescription')} />
        <meta property="og:image" content="https://renderdragon.org/ogimg/faq.png" />
        <meta property="og:url" content="https://renderdragon.org/faq" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('faq.meta.twitterTitle')} />
        <meta name="twitter:image" content="https://renderdragon.org/ogimg/faq.png" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 cow-grid-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-vt323 mb-8 text-center">
              {t('faq.title.part1')} <span className="text-cow-purple">{t('faq.title.part2')}</span>
            </h1>

            <div className="pixel-card space-y-6">
              <div className="space-y-8 text-muted-foreground">
                <div>
                  <h2 className="text-2xl font-vt323 text-foreground mb-4">{t('faq.sections.general')}</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-2">{t('faq.questions.free.title')}</h3>
                      <p>{t('faq.questions.free.answer')}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-2">{t('faq.questions.credit.title')}</h3>
                      <p>{t('faq.questions.credit.answer')}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-2">{t('faq.questions.commercial.title')}</h3>
                      <p>{t('faq.questions.commercial.answer')}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-vt323 text-foreground mb-4">{t('faq.sections.technical')}</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-2">What file formats do you support?</h3>
                      <p>We provide resources in various formats including PNG, MP3, WAV, PSD, and more. Each resource specifies its available formats.</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-2">Are the tools compatible with my device?</h3>
                      <p>Our tools are web-based and work on any modern browser, regardless of your operating system (Windows, Mac, Linux, etc.).</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-2">What if I encounter technical issues?</h3>
                      <p>If you experience any technical problems, please reach out through our Discord server or contact page. Our team is here to help!</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-vt323 text-foreground mb-4">Resource Usage</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-2">Can I modify the resources?</h3>
                      <p>Yes, you're free to modify our resources to suit your needs. We encourage creativity!</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-2">Are there any usage restrictions?</h3>
                      <p>The only restriction is reselling or redistributing our resources as-is. Please don't claim our resources as your own or share them on other platforms.</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-2">What about copyright claims?</h3>
                      <p>We strive to provide copyright-safe resources, but it's always good practice to check the specific terms for each resource, especially for music and sound effects.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-vt323 text-foreground mb-4">Contact & Support</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-2">How can I get help?</h3>
                      <p>Join our Discord server for quick support, or use the Contact page for specific inquiries. We typically respond within 48 hours.</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-2">Can I suggest new features or resources?</h3>
                      <p>Absolutely! We love hearing from our community. Share your suggestions on our Discord server or through the Contact page.</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-2">How can I support Renderdragon?</h3>
                      <p>The best ways to support us are spreading the word, giving credit when using our resources, and considering a donation if you'd like to contribute financially.</p>
                    </div>
                  </div>
                </div>
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
export default FAQ;