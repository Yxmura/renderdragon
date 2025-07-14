import i18n, { i18n as I18nType } from 'i18next';
import { initReactI18next, useTranslation as useI18nTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

// Type for our translation resources
type TranslationResources = {
  translation: Record<string, unknown>;
};

type I18nResources = {
  en: TranslationResources;
  es: TranslationResources;
  fr: TranslationResources;
  nl: TranslationResources;
};

// Language detection configuration
const createLanguageDetector = () => ({
  type: 'languageDetector' as const,
  async: true,
  detect: (callback: (lng: string) => void) => {
    const supportedLngs = ['en', 'es', 'fr', 'nl'];
    let detectedLng = 'en';

    if (typeof window === 'undefined') {
      return callback(detectedLng);
    }

    // Check URL parameter first
    const params = new URLSearchParams(window.location.search);
    const urlLng = params.get('lng');
    if (urlLng && supportedLngs.includes(urlLng)) {
      detectedLng = urlLng;
      return callback(detectedLng);
    }

    // Check localStorage
    const localStorageLng = localStorage.getItem('i18nextLng');
    if (localStorageLng && supportedLngs.some(lng => localStorageLng.startsWith(lng))) {
      detectedLng = localStorageLng.split('-')[0];
      return callback(detectedLng);
    }

    // Check cookie
    const cookieLng = Cookies.get('i18next');
    if (cookieLng && supportedLngs.some(lng => cookieLng.startsWith(lng))) {
      detectedLng = cookieLng.split('-')[0];
      return callback(detectedLng);
    }

    // Check browser language
    const browserLng = navigator.language || (navigator as Navigator & { userLanguage?: string }).userLanguage;
    if (browserLng) {
      const browserLngCode = browserLng.split('-')[0];
      if (supportedLngs.includes(browserLngCode)) {
        detectedLng = browserLngCode;
      }
    }

    callback(detectedLng);
  },
  init: () => {},
  cacheUserLanguage: (lng: string) => {
    if (typeof window !== 'undefined') {
      try {
        const isHttps = window.location.protocol === 'https:';
        const cookieOptions: Cookies.CookieAttributes = { 
          expires: 365,
          sameSite: 'Lax' as const,
          secure: isHttps,
          path: '/'
        };
        Cookies.set('i18next', lng, cookieOptions);
        localStorage.setItem('i18nextLng', lng);
      } catch (e) {
        console.warn('Failed to save language preference', e);
      }
    }
  },
});

// Initialize i18next
const initializeI18n = async (): Promise<I18nType> => {
  try {
    await i18n
      .use(initReactI18next)
      .use(createLanguageDetector() as import('i18next').Module)
      .init({
        resources: {
          en: { 
            translation: {
              noFavoritesMessage: "You haven't favorited any resources yet. Click the heart on a resource to save it here!",
              noResourcesInCategory: 'There are currently no resources in the {{category}} category.',
              clearFilters: 'Clear Filters',
              contributeResources: 'Contribute Resources',
              checkOldSite: 'Check out the old site',
              loading: 'Loading...',
              loadMore: 'Load More',
              community: {
                seo: {
                  title: 'Community Resources',
                  description: 'Find tutorials, resources, and communities for Minecraft content creation, video editing, and thumbnail design.'
                },
                title: {
                  prefix: 'Creator',
                  highlight: 'Community'
                },
                description: 'Connect with other creators, get feedback, and find resources in these active Discord communities.',
                tabs: {
                  tutorials: 'Tutorials',
                  servers: 'Discord Servers'
                },
                tutorials: {
                  1: {
                    name: 'How to Make Thumbnails',
                    description: 'Learn how to create eye-catching Minecraft thumbnails that get clicks'
                  },
                  2: {
                    name: 'How to Edit in Premiere Pro',
                    description: 'Tutorials for editing Minecraft videos in Adobe Premiere Pro & After Effects'
                  },
                  3: {
                    name: 'How to Edit in DaVinci Resolve',
                    description: 'Tutorials for editing Minecraft videos in DaVinci Resolve'
                  }
                },
                servers: {
                  title: 'Recommended Discord Servers',
                  description: 'Join these communities to connect with other creators, get feedback, and learn new skills.',
                  joinButton: 'Join Server',
                  serverIconAlt: '{name} server icon',
                  servers: {
                    1: {
                      description: 'Creator Coaster server will be your best friend throughout your content creation journey, with professional editors & artists ready to help with anything you need!'
                    },
                    2: {
                      description: 'The Minecraft Design Hub is run by qualified designers with extensive background in the GFX industry, offering designs, games, and community support.'
                    },
                    3: {
                      description: 'Thumbnailers is a thriving community for Minecraft thumbnail designers of all skill levels, offering resources and feedback to improve your designs.'
                    },
                    4: {
                      description: 'EditHub is the ultimate content creation hub for editors, designers, and creators looking to grow and improve their skills.'
                    },
                    5: {
                      description: 'Our official Discord server where you can suggest assets, contact us for questions or suggestions, and connect with the community.'
                    }
                  }
                },
                categories: {
                  editing: 'editing',
                  design: 'design'
                },
                common: {
                  videoCount: '{{count}} videos',
                  members: 'members',
                  creator: 'By {{creator}}',
                  playVideo: 'Play video',
                  watchOnYouTube: 'Watch on YouTube',
                  joinServer: 'Join Server',
                  byCreator: 'By {{creator}}'
                },
                toast: {
                  description: 'You\'ll be redirected to Discord'
                }
              },
              resourceFilters: {
                searchPlaceholder: 'Search for resources...',
                clearSearch: 'Clear search',
                filterTitleMobile: 'Filters',
                filterByCategory: 'Filter by category',
                all: 'All',
                music: 'Music',
                sfx: 'SFX',
                images: 'Images',
                animations: 'Animations',
                fonts: 'Fonts',
                presets: 'Presets',
                selectPreset: 'Select preset type',
                allPresets: 'All Presets',
                davinciPresets: 'DaVinci Resolve',
                adobePresets: 'Adobe',
                sortBy: 'Sort by',
                sortOptions: {
                  newest: 'Newest',
                  popular: 'Popular',
                },
                downloads: 'downloads',
                attribution: 'Attribution',
                credit_warning: 'Please credit the creator when using this resource',
                credit_text: 'Resource by {{author}}',
                credit_copied: 'Credit copied to clipboard!',
                copied: 'Copied',
                copy: 'Copy',
                no_attribution_required: 'No attribution required',
                previous: 'Previous',
                next: 'Next',
                previous_resource: 'Previous resource',
                next_resource: 'Next resource',
                download_resource: 'Download Resource',
                download_agreement: 'By downloading, you agree to our Terms of Service',
                credit_required: 'Credit required',
                no_credit_needed: 'No credit needed',
                play_preview: 'Play preview',
                pause_preview: 'Pause preview',
                no_preview_available: 'No preview available',
                font: 'Font',
                no_preset_preview: 'Sorry, there\'s no preview for this preset.',
                help_create_previews: 'You can help out creating previews for presets by joining our Discord!',
                preview_not_available: 'Preview not available for this type.',
                join_our_discord: 'Join our Discord'
              }
            }
          },
          es: { 
            translation: {
              community: {
                seo: {
                  title: 'Recursos de la Comunidad',
                  description: 'Encuentra tutoriales, recursos y comunidades para la creación de contenido de Minecraft, edición de video y diseño de miniaturas.'
                },
                title: {
                  prefix: 'Creador',
                  highlight: 'Comunidad'
                },
                description: 'Conéctate con otros creadores, obtén comentarios y encuentra recursos en estas comunidades activas de Discord.',
                tabs: {
                  tutorials: 'Tutoriales',
                  servers: 'Servidores de Discord'
                },
                tutorials: {
                  1: {
                    name: 'Cómo Hacer Miniaturas',
                    description: 'Aprende a crear miniaturas atractivas para Minecraft que generen clics'
                  },
                  2: {
                    name: 'Cómo Editar en Premiere Pro',
                    description: 'Tutoriales para editar videos de Minecraft en Adobe Premiere Pro y After Effects'
                  },
                  3: {
                    name: 'Cómo Editar en DaVinci Resolve',
                    description: 'Tutoriales para editar videos de Minecraft en DaVinci Resolve'
                  }
                },
                servers: {
                  title: 'Servidores de Discord Recomendados',
                  description: 'Únete a estas comunidades para conectar con otros creadores, obtener comentarios y aprender nuevas habilidades.',
                  joinButton: 'Unirse al Servidor',
                  serverIconAlt: 'Icono del servidor {name}',
                  servers: {
                    1: {
                      description: 'El servidor Creator Coaster será tu mejor amigo durante tu viaje de creación de contenido, con editores profesionales y artistas listos para ayudarte con lo que necesites.'
                    },
                    2: {
                      description: 'Minecraft Design Hub está dirigido por diseñadores calificados con amplia experiencia en la industria GFX, ofreciendo diseños, juegos y soporte comunitario.'
                    },
                    3: {
                      description: 'Thumbnailers es una próspera comunidad para diseñadores de miniaturas de Minecraft de todos los niveles, que ofrece recursos y comentarios para mejorar tus diseños.'
                    },
                    4: {
                      description: 'EditHub es el centro definitivo de creación de contenido para editores, diseñadores y creadores que buscan crecer y mejorar sus habilidades.'
                    },
                    5: {
                      description: 'Nuestro servidor oficial de Discord donde puedes sugerir recursos, contactarnos con preguntas o sugerencias y conectarte con la comunidad.'
                    }
                  }
                },
                categories: {
                  editing: 'edición',
                  design: 'diseño'
                },
                common: {
                  videoCount: '{{count}} videos',
                  members: 'miembros',
                  creator: 'Por {{creator}}',
                  playVideo: 'Reproducir video',
                  watchOnYouTube: 'Ver en YouTube',
                  joinServer: 'Unirse al Servidor',
                  byCreator: 'Por {{creator}}'
                },
                toast: {
                  description: 'Serás redirigido a Discord'
                }
              }
            } 
          },
          fr: { 
            translation: {
              community: {
                seo: {
                  title: 'Ressources Communautaires',
                  description: 'Trouvez des tutoriels, des ressources et des communautés pour la création de contenu Minecraft, le montage vidéo et la conception de miniatures.'
                },
                title: {
                  prefix: 'Communauté de',
                  highlight: 'Créateurs'
                },
                description: 'Connectez-vous avec d\'autres créateurs, obtenez des commentaires et trouvez des ressources dans ces communautés Discord actives.',
                tabs: {
                  tutorials: 'Tutoriels',
                  servers: 'Serveurs Discord'
                },
                tutorials: {
                  1: {
                    name: 'Comment Créer des Miniatures',
                    description: 'Apprenez à créer des miniatures accrocheuses pour Minecraft qui attirent les clics'
                  },
                  2: {
                    name: 'Comment Monter dans Premiere Pro',
                    description: 'Tutoriels pour monter des vidéos Minecraft dans Adobe Premiere Pro et After Effects'
                  },
                  3: {
                    name: 'Comment Monter dans DaVinci Resolve',
                    description: 'Tutoriels pour monter des vidéos Minecraft dans DaVinci Resolve'
                  }
                },
                servers: {
                  title: 'Serveurs Discord Recommandés',
                  description: 'Rejoignez ces communautés pour vous connecter avec d\'autres créateurs, obtenir des commentaires et acquérir de nouvelles compétences.',
                  joinButton: 'Rejoindre le Serveur',
                  serverIconAlt: 'Icône du serveur {name}',
                  servers: {
                    1: {
                      description: 'Le serveur Creator Coaster sera votre meilleur ami tout au long de votre parcours de création de contenu, avec des éditeurs professionnels et des artistes prêts à vous aider dans tous vos besoins !'
                    },
                    2: {
                      description: 'Minecraft Design Hub est géré par des designers qualifiés avec une vaste expérience dans l\'industrie du GFX, offrant des designs, des jeux et un soutien communautaire.'
                    },
                    3: {
                      description: 'Thumbnailers est une communauté florissante pour les concepteurs de miniatures Minecraft de tous niveaux, offrant des ressources et des commentaires pour améliorer vos créations.'
                    },
                    4: {
                      description: 'EditHub est le centre ultime de création de contenu pour les monteurs, designers et créateurs cherchant à se développer et à améliorer leurs compétences.'
                    },
                    5: {
                      description: 'Notre serveur Discord officiel où vous pouvez suggérer des ressources, nous contacter pour des questions ou des suggestions et vous connecter avec la communauté.'
                    }
                  }
                },
                categories: {
                  editing: 'montage',
                  design: 'conception'
                },
                common: {
                  videoCount: '{{count}} vidéos',
                  members: 'membres',
                  creator: 'Par {{creator}}',
                  playVideo: 'Lire la vidéo',
                  watchOnYouTube: 'Regarder sur YouTube',
                  joinServer: 'Rejoindre le Serveur',
                  byCreator: 'Par {{creator}}'
                },
                toast: {
                  description: 'Vous serez redirigé vers Discord'
                }
              }
            } 
          },
          nl: { 
            translation: {
              community: {
                seo: {
                  title: 'Communitybronnen',
                  description: 'Vind tutorials, bronnen en communities voor het maken van Minecraft-inhoud, videobewerking en het ontwerpen van miniaturen.'
                },
                title: {
                  prefix: 'Maker',
                  highlight: 'Community'
                },
                description: 'Maak verbinding met andere makers, krijg feedback en vind bronnen in deze actieve Discord-community\'s.',
                tabs: {
                  tutorials: 'Tutorials',
                  servers: 'Discord-servers'
                },
                tutorials: {
                  1: {
                    name: 'Hoe Maak Je Miniaturen',
                    description: 'Leer hoe je opvallende Minecraft-miniaturen maakt die klikken genereren'
                  },
                  2: {
                    name: 'Hoe Bewerk Je in Premiere Pro',
                    description: 'Tutorials voor het bewerken van Minecraft-video\'s in Adobe Premiere Pro en After Effects'
                  },
                  3: {
                    name: 'Hoe Bewerk Je in DaVinci Resolve',
                    description: 'Tutorials voor het bewerken van Minecraft-video\'s in DaVinci Resolve'
                  }
                },
                servers: {
                  title: 'Aanbevolen Discord-servers',
                  description: 'Sluit je aan bij deze communities om in contact te komen met andere makers, feedback te krijgen en nieuwe vaardigheden te leren.',
                  joinButton: 'Word Lid',
                  serverIconAlt: '{name} serverpictogram',
                  servers: {
                    1: {
                      description: 'De Creator Coaster-server wordt je beste vriend tijdens je reis als contentmaker, met professionele editors en artiesten die je graag helpen met alles wat je nodig hebt!'
                    },
                    2: {
                      description: 'Minecraft Design Hub wordt gerund door gekwalificeerde ontwerpers met uitgebreide ervaring in de GFX-industrie, die ontwerpen, games en gemeenschapsondersteuning bieden.'
                    },
                    3: {
                      description: 'Thumbnailers is een bloeiende community voor Minecraft-miniatuurontwerpers van alle niveaus, die bronnen en feedback biedt om je ontwerpen te verbeteren.'
                    },
                    4: {
                      description: 'EditHub is de ultieme hub voor contentcreatie voor editors, ontwerpers en makers die hun vaardigheden willen ontwikkelen en verbeteren.'
                    },
                    5: {
                      description: 'Onze officiële Discord-server waar je middelen kunt voorstellen, contact met ons kunt opnemen voor vragen of suggesties en verbinding kunt maken met de community.'
                    }
                  }
                },
                categories: {
                  editing: 'bewerken',
                  design: 'ontwerp'
                },
                common: {
                  videoCount: '{{count}} video\'s',
                  members: 'leden',
                  creator: 'Door {{creator}}',
                  playVideo: 'Video afspelen',
                  watchOnYouTube: 'Bekijken op YouTube',
                  joinServer: 'Word Lid',
                  byCreator: 'Door {{creator}}'
                },
                toast: {
                  description: 'Je wordt doorgestuurd naar Discord'
                }
              }
            } 
          },
        } as I18nResources,
        fallbackLng: 'en',
        supportedLngs: ['en', 'es', 'fr', 'nl'],
        debug: process.env.NODE_ENV === 'development',
        interpolation: {
          escapeValue: false, // React already escapes values
        },
        react: {
          useSuspense: false,
        },
      });
    return i18n;
  } catch (error) {
    console.error('Failed to initialize i18n:', error);
    return i18n;
  }
};

// Initialize i18n when this module is imported
let initializationPromise: Promise<I18nType> | null = null;

export const getI18n = (): Promise<I18nType> => {
  if (!initializationPromise) {
    initializationPromise = initializeI18n();
  }
  return initializationPromise;
};

export { initializeI18n };

// Re-export useTranslation with proper typing
export const useTranslation = useI18nTranslation;

// Initialize i18n
getI18n().catch(console.error);

// Set up language change handler in the browser
if (typeof window !== 'undefined') {
  i18n.on('languageChanged', (lng: string) => {
    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', lng);
    
    // Save to both localStorage and cookie
    try {
      localStorage.setItem('i18nextLng', lng);
      const isHttps = window.location.protocol === 'https:';
      const cookieOptions: Cookies.CookieAttributes = { 
        expires: 365,
        sameSite: 'Lax' as const,
        secure: isHttps,
        path: '/'
      };
      Cookies.set('i18next', lng, cookieOptions);
    } catch (e) {
      console.warn('Failed to save language preference', e);
    }
  });
}

export default i18n;