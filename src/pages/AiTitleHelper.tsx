import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

/**
 * Simple placeholder page to resolve missing import error.
 * Replace this with real AI Title Helper implementation when ready.
 */
const AiTitleHelper = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>AI Title Helper - Renderdragon</title>
        <meta name="description" content="Generate engaging video titles with AI." />
      </Helmet>
      <Navbar />
      <main className="flex-grow pt-24 pb-16 flex items-center justify-center cow-grid-bg">
        <h1 className="text-4xl md:text-5xl font-vt323 text-center">
          AI Title Helper Coming Soon
        </h1>
      </main>
      <Footer />
    </div>
  );
};

export default AiTitleHelper;