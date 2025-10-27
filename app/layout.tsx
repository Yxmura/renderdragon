import type { Metadata } from 'next';
import '@/index.css';
import '@/global.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Renderdragon - Minecraft Content Creator Tools & Assets',
  description: 'Your ultimate toolkit for creating Minecraft YouTube content. Get free tools, assets, music, and guides—all ad-free.',
  keywords: 'Minecraft, YouTube, Content Creator, Tools, Assets, Free, Music, SFX, Animations, Fonts, Images, Premiere Pro Presets, DaVinci Resolve Presets, AI Title Helper, YouTube Downloader, Copyright Checker, Renderdragon',
  authors: [{ name: 'Team Wheels' }],
  verification: {
    google: '_1Znm2uL6EbALUvDw11BNaWNKQQ716QK-tixIKVEf3c',
  },
  icons: {
    icon: 'https://renderdragon.org/renderdragon.png',
  },
  openGraph: {
    title: 'Renderdragon - Minecraft YouTube Tools & Assets',
    description: 'Your ultimate toolkit for creating Minecraft YouTube content. Get free tools, assets, music, and guides—all ad-free.',
    type: 'website',
    url: 'https://renderdragon.org',
    siteName: 'Renderdragon',
    images: [
      {
        url: 'https://renderdragon.org/ogimg.png',
        alt: 'Renderdragon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@renderdragon',
    title: 'Renderdragon - Minecraft YouTube Tools & Assets',
    description: 'Your ultimate toolkit for creating Minecraft YouTube content. Get free tools, assets, music, and guides—all ad-free.',
    images: ['https://renderdragon.org/ogimg.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://renderdragon.org" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=Chakra+Petch:wght@300;400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
