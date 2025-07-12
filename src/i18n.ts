import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Cookies from 'js-cookie';

// Define the resources object with all translations
const resources = {
  en: {
    translation: {
      join_title: 'Join our Discord!',
      join_desc:
        'Get help, share your creations, and get the latest news from the Renderdragon community.',
      join_now: 'Join Now',
      never_show: 'Never show again',
      browse_tab: 'Browse Resources',
      favorites_tab: 'Favorites',
      no_favorites: 'No favorites yet',
      start_exploring:
        'Start exploring resources and add them to your favorites!',
      navbar: {
        home: 'Home',
        contact: 'Contact',
        resources: 'Resources',
        resourcesHub: 'Resources Hub',
        guides: 'Guides',
        utilities: 'Utilities',
        community: 'Community',
        tools: 'Tools',
        musicCopyrightChecker: 'Music Copyright Checker',
        backgroundGenerator: 'Background Generator',
        playerRenderer: 'Player Renderer',
        textGenerator: 'Text Generator',
        youtubeDownloader: 'YouTube Downloader',
        contentGenerators: 'Content Generators',
        newTag: 'NEW',
        signIn: 'Sign In',
        signOut: 'Sign Out',
        myFavorites: 'My Favorites',
        darkMode: 'Dark Mode',
        lightMode: 'Light Mode',
        becomePartner: 'Become a Partner',
      },
      footer: {
        description:
          'Empowering Minecraft content creators with the free resources, tools, and guides. 100% free, no strings attached.',
        legal: 'Legal Notice',
        termsOfService: 'Terms of Service',
        privacyPolicy: 'Privacy Policy',
        navigate: 'Navigate',
        home: 'Home',
        resourcesHub: 'Resources Hub',
        guides: 'Guides',
        utilities: 'Utilities',
        community: 'Community',
        tools: 'Tools',
        musicCopyrightChecker: 'Music Copyright Checker',
        backgroundGenerator: 'Background Generator',
        playerRenderer: 'Player Renderer',
        textGenerator: 'Text Generator',
        youtubeDownloader: 'YouTube Downloader',
        contentGenerators: 'Content Generators',
        newTag: 'NEW',
        signIn: 'Sign In',
        signOut: 'Sign Out',
        myFavorites: 'My Favorites',
        darkMode: 'Dark Mode',
        lightMode: 'Light Mode',
        becomePartner: 'Become a Partner',
        faq: 'FAQ',
        terms: 'Terms',
        privacy: 'Privacy',
        notAssociated: 'Not associated with Mojang or Microsoft',
        iconCredit: 'Flaticon',
        copyright: '© {{year}} Renderdragon. All rights reserved.',
        language: 'Language',
        renderbot: 'Renderbot',
        madeByToastTitle: 'Website made by Team Wheels',
        madeByToastDescription: 'Thanks for visiting Renderdragon!',
      },
      home: {
        title: 'Renderdragon - Tools & Resources for Minecraft Content Creators',
        description:
          'Your ultimate toolkit for creating Minecraft YouTube content. Get free tools, assets, music, and guides, all ad-free.',
        ogTitle:
          'Renderdragon - Ad-Free Tools & Resources for Minecraft Content Creators',
        ogDescription:
          'Your ultimate toolkit for creating Minecraft YouTube content. Get free tools, assets, music, and guides, all ad-free.',
        twitterTitle:
          'Renderdragon - Tools & Resources for Minecraft Content Creators',
      },
      hero: {
        unlockYour: 'UNLOCK YOUR',
        creationPotential: 'CREATION POTENTIAL',
        description:
          'Tools, textures, sounds, inspiration, and everything in between, handmade for Minecraft creators.',
        browseResources: 'Browse Resources',
        checkMusicCopyright: 'Check Music Copyright',
        freeBadge: '100% Free. No strings attached.',
      },
      featuredResources: {
        title: 'Featured',
        titleHighlight: 'Resources',
        description:
          'Discover our most popular free resources to level up your content creation',
        viewAll: 'View All Resources',
      },
      popularTools: {
        title: 'Popular',
        titleHighlight: 'Tools',
        description: 'Free tools to streamline your content creation workflow',
        tools: {
          musicCopyright: {
            title: 'Music Copyright Checker',
            description: 'Check if music tracks are safe to use in your videos',
          },
          videoDownloader: {
            title: 'Video Downloader',
            description: 'Download videos and audio from various platforms',
          },
          backgroundGenerator: {
            title: 'Background Generator',
            description:
              'Create unique backgrounds for your videos and streams',
          },
          playerRenderer: {
            title: 'Player Renderer',
            description:
              'Get your Minecraft skin rendered in 3D for thumbnails or videos',
          },
        },
        tryItNow: 'Try it now →',
      },
      partnership: {
        title: 'Proudly Partnered With',
        description:
          'We collaborate with innovative communities and projects that share our passion for creativity and growth.',
        partners: {
          creatorsKingdom: {
            name: "Creators' Kingdom",
            description: 'A community built on creativity and teamwork.',
          },
          progersKitchen: {
            name: "Proger's Kitchen",
            description:
              'A vibrant community for creators to give and receive feedback.',
          },
          decourSmp: {
            name: 'Decour SMP',
            description:
              'A non-economy based Lifesteal SMP with helpful plugins.',
          },
        },
        becomePartner: 'Become a Partner',
      },
      donateButton: {
        donate: 'Donate',
        support: 'Support Renderdragon',
        description: 'Donations are our only source of revenue',
        whyDonate: 'Why donate?',
        reasons: {
          free: 'Keep all assets 100% free for everyone',
          develop: 'Help us develop more tools and assets',
          community: 'Support the Minecraft creator community',
        },
      },
      resourcesHub: {
        meta: {
          title: 'Resources Hub - Renderdragon',
          description:
            'Explore and download free assets for Minecraft content creation, including thumbnails, overlays, sound effects, and more.',
        },
        title: 'Resources Hub',
        description:
          'Your one-stop destination for high-quality, free-to-use assets for your content creation journey.',
        tabs: {
          browse: 'Browse Resources',
          favorites: 'My Favorites',
        },
        toast: {
          download_success: 'Resource downloaded successfully!',
          download_error: 'Error downloading resource.',
        },
        scrollToTop: 'Scroll to top',
      },
      resourcesList: {
        noResourcesFound: 'No resources found',
        noResourcesMatch: 'No resources match your search for "{{query}}".',
        noFavoritesMessage:
          "You haven't favorited any resources yet. Click the heart on a resource to save it here!",
        noResourcesInCategory:
          'There are currently no resources in the {{category}} category.',
        clearFilters: 'Clear Filters',
        contributeResources: 'Contribute Resources',
        checkOldSite: 'Check out the old site',
        loading: 'Loading...',
        loadMore: 'Load More',
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
          a_z: 'A-Z',
          z_a: 'Z-A',
        },
      },
      testimonials: {
        whatCreatorsSay: 'What <1>Creators</1> Say About Us',
        dontTakeOurWord:
          "Don't just take our word for it - hear from the content creators who use our tools every day",
        yFuryRole: 'Minecraft YouTuber & Streamer',
        yFuryContent: 'I love the resources because they are hard to find',
        jkingnickRole: 'Minecraft Youtuber',
        jkingnickContent:
          'Website looks very professional and seems to be a really cool idea for content creators like myself',
        alphaReturnsRole: 'Minecraft Youtuber and Thumbnail Designer',
        alphaReturnsContent:
          'Renderdragon is a really good tool with great assets that can be useful for pretty much any YouTuber (small or big)',
        itsProgerRole: 'Minecraft YouTuber and Thumbnail Designer',
        itsProgerContent:
          "I really like renderdragon, it's one of the only and best websites for Minecraft content creators. I really like the style, assets, tools and the whole team working on this amazing project. I'll use it for every single video that I make in the future",
      },
    },
  },
  es: {
    translation: {
      join_title: '¡Únete a nuestro Discord!',
      join_desc:
        'Obtén ayuda, comparte tus creaciones y recibe las últimas noticias de la comunidad de Renderdragon.',
      join_now: 'Unirse ahora',
      never_show: 'No mostrar de nuevo',
      browse_tab: 'Explorar recursos',
      favorites_tab: 'Favoritos',
      no_favorites: 'Aún no hay favoritos',
      start_exploring:
        '¡Comienza a explorar recursos y agrégalos a tus favoritos!',
      navbar: {
        home: 'Inicio',
        contact: 'Contacto',
        resources: 'Recursos',
        resourcesHub: 'Centro de recursos',
        guides: 'Guías',
        utilities: 'Utilidades',
        community: 'Comunidad',
        tools: 'Herramientas',
        musicCopyrightChecker: 'Verificador de copyright de música',
        backgroundGenerator: 'Generador de fondos',
        playerRenderer: 'Renderizador de jugador',
        textGenerator: 'Generador de texto',
        youtubeDownloader: 'Descargador de YouTube',
        contentGenerators: 'Generadores de contenido',
        newTag: 'NUEVO',
        signIn: 'Iniciar sesión',
        signOut: 'Cerrar sesión',
        myFavorites: 'Mis favoritos',
        darkMode: 'Modo oscuro',
        lightMode: 'Modo claro',
        becomePartner: 'Hazte socio',
      },
      footer: {
        description:
          'Empoderando a los creadores de contenido de Minecraft con recursos, herramientas y guías gratuitas. 100% gratis, sin condiciones.',
        legal: 'Aviso legal',
        termsOfService: 'Términos de servicio',
        privacyPolicy: 'Política de privacidad',
        navigate: 'Navegar',
        home: 'Inicio',
        resourcesHub: 'Centro de recursos',
        guides: 'Guías',
        utilities: 'Utilidades',
        contact: 'Contacto',
        tools: 'Herramientas',
        musicCopyrightChecker: 'Verificador de copyright de música',
        backgroundGenerator: 'Generador de fondos',
        playerRenderer: 'Renderizador de jugador',
        renderbot: 'Renderbot',
        textGenerator: 'Generador de texto',
        contentGenerators: 'Generadores de contenido',
        youtubeDownloader: 'Descargador de YouTube',
        newTag: 'NUEVO',
        faq: 'Preguntas frecuentes',
        terms: 'Términos',
        privacy: 'Privacidad',
        notAssociated: 'No afiliado con Mojang o Microsoft',
        iconCredit: 'Flaticon',
        copyright: ' 2023 Renderdragon',
        madeByToastTitle: 'Sitio web hecho por Team Wheels',
        madeByToastDescription: '¡Gracias por visitar Renderdragon!',
      },
      home: {
        title: 'Renderdragon - Herramientas y Recursos para Creadores de Minecraft',
        description:
          'Tu caja de herramientas definitiva para crear contenido de Minecraft en YouTube. Obtén herramientas, recursos, música y guías gratis, sin anuncios.',
        ogTitle:
          'Renderdragon - Herramientas y Recursos sin anuncios para Creadores de Minecraft',
        ogDescription:
          'Tu caja de herramientas definitiva para crear contenido de Minecraft en YouTube. Obtén herramientas, recursos, música y guías gratis, sin anuncios.',
        twitterTitle:
          'Renderdragon - Herramientas y Recursos para Creadores de Minecraft',
      },
      hero: {
        unlockYour: 'DESBLOQUEA TU',
        creationPotential: 'POTENCIAL CREATIVO',
        description:
          'Herramientas, texturas, sonidos, inspiración y todo hecho a mano para creadores de Minecraft.',
        browseResources: 'Explorar recursos',
        checkMusicCopyright: 'Verificar copyright de música',
        freeBadge: '100% Gratis. Sin condiciones.',
      },
      featuredResources: {
        title: 'Destacados',
        titleHighlight: 'Recursos',
        description:
          'Descubre nuestros recursos gratuitos más populares para mejorar tu creación de contenido',
        viewAll: 'Ver todos los recursos',
      },
      popularTools: {
        title: 'Populares',
        titleHighlight: 'Herramientas',
        description:
          'Herramientas gratuitas para optimizar tu flujo de creación de contenido',
        tools: {
          musicCopyright: {
            title: 'Verificador de copyright de música',
            description:
              'Verifica si las pistas musicales son seguras para usar en tus videos',
          },
          videoDownloader: {
            title: 'Descargador de videos',
            description: 'Descarga videos y audio de varias plataformas',
          },
          backgroundGenerator: {
            title: 'Generador de fondos',
            description:
              'Crea fondos personalizados para tus miniaturas y overlays',
          },
          playerRenderer: {
            title: 'Renderizador de jugador',
            description:
              'Obtén tu skin de Minecraft renderizada en 3D para miniaturas o videos',
          },
        },
        tryItNow: 'Pruébalo ahora →',
      },
      partnership: {
        title: 'Orgullosamente en colaboración con',
        description:
          'Colaboramos con comunidades y proyectos innovadores que comparten nuestra pasión por la creatividad y el crecimiento.',
        partners: {
          creatorsKingdom: {
            name: 'Creators Kingdom',
            description: 'Comunidad de creadores de Minecraft.',
          },
          decourSmp: {
            name: 'Decour SMP',
            description:
              'Un SMP Lifesteal sin economía con plugins útiles.',
          },
        },
        becomePartner: 'Hazte socio',
      },
      donateButton: {
        donate: 'Donar',
        support: 'Apoyar Renderdragon',
        description: 'Las donaciones son nuestra única fuente de ingresos',
        whyDonate: '¿Por qué donar?',
        reasons: {
          free: 'Mantener todos los recursos 100% gratuitos para todos',
          develop: 'Ayudar a desarrollar más herramientas y recursos',
          community: 'Apoyar a la comunidad de creadores de Minecraft',
        },
      },
      resourcesHub: {
        meta: {
          title: 'Centro de recursos - Renderdragon',
          description:
            'Explora y descarga recursos gratuitos para la creación de contenido de Minecraft, incluyendo miniaturas, overlays, efectos de sonido y más.',
        },
        title: 'Centro de recursos',
        description:
          'Tu destino único para recursos gratuitos y de alta calidad para tu viaje de creación de contenido.',
        tabs: {
          browse: 'Explorar recursos',
          favorites: 'Mis favoritos',
        },
        toast: {
          download_success: '¡Recurso descargado con éxito!',
          download_error: 'Error al descargar el recurso.',
        },
        scrollToTop: 'Volver arriba',
      },
      resourcesList: {
        noResourcesFound: 'No se encontraron recursos',
        noResourcesMatch:
          'No se encontraron recursos que coincidan con tu búsqueda de "{{query}}".',
        noFavoritesMessage:
          'Aún no has agregado ningún recurso a favoritos. ¡Haz clic en el corazón de un recurso para agregarlo aquí!',
        noResourcesInCategory:
          'Actualmente no hay recursos en la categoría {{category}}.',
        clearFilters: 'Limpiar filtros',
        contributeResources: 'Contribuir recursos',
        checkOldSite: 'Ver el sitio antiguo',
        loading: 'Cargando...',
        loadMore: 'Cargar más',
      },
      resourceFilters: {
        searchPlaceholder: 'Buscar recursos...',
        clearSearch: 'Limpiar búsqueda',
        filterTitleMobile: 'Filtros',
        filterByCategory: 'Filtrar por categoría',
        all: 'Todos',
        music: 'Música',
        sfx: 'SFX',
        images: 'Imágenes',
        animations: 'Animaciones',
        fonts: 'Fuentes',
        presets: 'Presets',
        selectPreset: 'Seleccionar tipo de preset',
        allPresets: 'Todos los presets',
        davinciPresets: 'DaVinci Resolve',
        adobePresets: 'Adobe',
        sortBy: 'Ordenar por',
        sortOptions: {
          newest: 'Más reciente',
          popular: 'Popular',
          a_z: 'A-Z',
          z_a: 'Z-A',
        },
      },
      testimonials: {
        whatCreatorsSay: 'Lo que dicen los <1>Creadores</1> sobre nosotros',
        dontTakeOurWord:
          'No te fíes solo de nuestra palabra: escucha a los creadores de contenido que usan nuestras herramientas a diario',
        yFuryRole: 'YouTuber y Streamer de Minecraft',
        yFuryContent: 'Me encantan los recursos porque son difíciles de encontrar',
        jkingnickRole: 'YouTuber de Minecraft',
        jkingnickContent:
          'El sitio web es muy profesional y parece una gran idea para creadores de contenido como yo',
        alphaReturnsRole: 'YouTuber y diseñador de miniaturas de Minecraft',
        alphaReturnsContent:
          'Renderdragon es una herramienta muy buena con excelentes recursos útiles para prácticamente cualquier YouTuber (grande o pequeño)',
        itsProgerRole: 'YouTuber y diseñador de miniaturas de Minecraft',
        itsProgerContent:
          'Me gusta mucho renderdragon, es uno de los únicos y mejores sitios para creadores de contenido de Minecraft. Me gusta mucho el estilo, los recursos, las herramientas y todo el equipo que trabaja en este increíble proyecto. Lo usaré para cada video que haga en el futuro',
      },
    },
  },

  fr: {
    translation: {
      join_title: 'Rejoignez notre Discord !',
      join_desc:
        "Obtenez de l'aide, partagez vos créations et recevez les dernières nouvelles de la communauté Renderdragon.",
      join_now: 'Rejoindre maintenant',
      never_show: 'Ne plus afficher',
      browse_tab: 'Parcourir les ressources',
      favorites_tab: 'Favoris',
      no_favorites: 'Aucun favori pour le moment',
      start_exploring:
        'Commencez à explorer les ressources et ajoutez-les à vos favoris !',
      navbar: {
        home: 'Accueil',
        contact: 'Contact',
        resources: 'Ressources',
        resourcesHub: 'Centre de ressources',
        guides: 'Guides',
        utilities: 'Utilitaires',
        community: 'Communauté',
        tools: 'Outils',
        musicCopyrightChecker: "Vérificateur de droits d'auteur de musique",
        backgroundGenerator: "Générateur d'arrière-plans",
        playerRenderer: 'Rendu de joueur',
        textGenerator: 'Générateur de texte',
        youtubeDownloader: 'Téléchargeur YouTube',
        contentGenerators: 'Générateurs de contenu',
        newTag: 'NOUVEAU',
        signIn: 'Connexion',
        signOut: 'Déconnexion',
        myFavorites: 'Mes favoris',
        darkMode: 'Mode sombre',
        lightMode: 'Mode clair',
        becomePartner: 'Devenir partenaire',
      },
      footer: {
        description:
          'Donner du pouvoir aux créateurs de contenu Minecraft avec des ressources, outils et guides gratuits. 100% gratuit, sans conditions.',
        legal: 'Mentions légales',
        termsOfService: "Conditions d'utilisation",
        privacyPolicy: 'Politique de confidentialité',
        navigate: 'Naviguer',
        home: 'Accueil',
        resourcesHub: 'Centre de ressources',
        guides: 'Guides',
        utilities: 'Utilitaires',
        contact: 'Contact',
        tools: 'Outils',
        musicCopyrightChecker: "Vérificateur de droits d'auteur de musique",
        backgroundGenerator: "Générateur d'arrière-plans",
        playerRenderer: 'Rendu de joueur',
        renderbot: 'Renderbot',
        textGenerator: 'Générateur de texte',
        contentGenerators: 'Générateurs de contenu',
        youtubeDownloader: 'Téléchargeur YouTube',
        newTag: 'NOUVEAU',
        faq: 'FAQ',
        terms: 'Conditions',
        privacy: 'Confidentialité',
        notAssociated: 'Non affilié à Mojang ou Microsoft',
        iconCredit: 'Flaticon',
        copyright: ' 2023 Renderdragon',
        madeByToastTitle: 'Site web réalisé par Team Wheels',
        madeByToastDescription: 'Merci de visiter Renderdragon !',
      },
      home: {
        title: 'Renderdragon - Outils & Ressources pour créateurs Minecraft',
        description:
          'Votre boîte à outils ultime pour créer du contenu Minecraft sur YouTube. Obtenez des outils, des ressources, de la musique et des guides gratuits, sans publicité.',
        ogTitle:
          'Renderdragon - Outils & Ressources sans publicité pour créateurs Minecraft',
        ogDescription:
          'Votre boîte à outils ultime pour créer du contenu Minecraft sur YouTube. Obtenez des outils, des ressources, de la musique et des guides gratuits, sans publicité.',
        twitterTitle:
          'Renderdragon - Outils & Ressources pour créateurs Minecraft',
      },
      hero: {
        unlockYour: 'DÉBLOQUEZ VOTRE',
        creationPotential: 'POTENTIEL CRÉATIF',
        description:
          "Outils, textures, sons, inspiration et tout ce qu'il faut, faits main pour les créateurs Minecraft.",
        browseResources: 'Parcourir les ressources',
        checkMusicCopyright: "Vérifier les droits d'auteur de musique",
        freeBadge: '100% Gratuit. Sans conditions.',
      },
      featuredResources: {
        title: 'À la une',
        titleHighlight: 'Ressources',
        description:
          'Découvrez nos ressources gratuites les plus populaires pour améliorer votre création de contenu',
        viewAll: 'Voir toutes les ressources',
      },
      popularTools: {
        title: 'Populaires',
        titleHighlight: 'Outils',
        description:
          'Outils gratuits pour optimiser votre flux de création de contenu',
        tools: {
          musicCopyright: {
            title: "Vérificateur de droits d'auteur de musique",
            description:
              'Vérifiez si les pistes musicales sont sûres à utiliser dans vos vidéos',
          },
          videoDownloader: {
            title: 'Téléchargeur de vidéos',
            description: 'Téléchargez des vidéos et de l\'audio depuis diverses plateformes',
          },
          backgroundGenerator: {
            title: "Générateur d'arrière-plans",
            description:
              'Créez des arrière-plans personnalisés pour vos miniatures et overlays',
          },
          playerRenderer: {
            title: 'Rendu de joueur',
            description:
              'Obtenez votre skin Minecraft rendu en 3D pour miniatures ou vidéos',
          },
        },
        tryItNow: 'Essayez-le maintenant →',
      },
      partnership: {
        title: 'Fièrement partenaire avec',
        description:
          'Nous collaborons avec des communautés et projets innovants qui partagent notre passion pour la créativité et le croissance.',
        partners: {
          creatorsKingdom: {
            name: 'Creators Kingdom',
            description: 'Communauté de créateurs Minecraft.',
          },
          decourSmp: {
            name: 'Decour SMP',
            description:
              'Un SMP Lifesteal sans économie avec des plugins utiles.',
          },
        },
        becomePartner: 'Devenir partenaire',
      },
      donateButton: {
        donate: 'Faire un don',
        support: 'Soutenir Renderdragon',
        description: 'Les dons sont notre seule source de revenus',
        whyDonate: 'Pourquoi donner ?',
        reasons: {
          free: 'Garder toutes les ressources 100% gratuites pour tous',
          develop: "Aider à développer plus d'outils et de ressources",
          community: 'Soutenir la communauté des créateurs Minecraft',
        },
      },
      resourcesHub: {
        meta: {
          title: 'Centre de ressources - Renderdragon',
          description:
            'Explorez et téléchargez des ressources gratuites pour la création de contenu Minecraft, y compris miniatures, overlays, effets sonores et plus.',
        },
        title: 'Centre de ressources',
        description:
          'Votre destination unique pour des ressources de haute qualité et gratuites pour votre parcours de création de contenu.',
        tabs: {
          browse: 'Parcourir les ressources',
          favorites: 'Mes favoris',
        },
        toast: {
          download_success: 'Ressource téléchargée avec succès !',
          download_error: 'Erreur lors du téléchargement de la ressource.',
        },
        scrollToTop: 'Retour en haut',
      },
      resourcesList: {
        noResourcesFound: 'Aucune ressource trouvée',
        noResourcesMatch:
          'Aucune ressource ne correspond à votre recherche pour "{{query}}".',
        noFavoritesMessage:
          "Vous n'avez encore ajouté aucune ressource en favori. Cliquez sur le cœur d'une ressource pour l'ajouter ici !",
        noResourcesInCategory:
          "Il n'y a actuellement aucune ressource dans la catégorie {{category}}.",
        clearFilters: 'Effacer les filtres',
        contributeResources: 'Contribuer des ressources',
        checkOldSite: "Voir l'ancien site",
        loading: 'Chargement...',
        loadMore: 'Charger plus',
      },
      resourceFilters: {
        searchPlaceholder: 'Rechercher des ressources...',
        clearSearch: 'Effacer la recherche',
        filterTitleMobile: 'Filtres',
        filterByCategory: 'Filtrer par catégorie',
        all: 'Tous',
        music: 'Musique',
        sfx: 'SFX',
        images: 'Images',
        animations: 'Animations',
        fonts: 'Polices',
        presets: 'Presets',
        selectPreset: 'Sélectionner le type de preset',
        allPresets: 'Tous les presets',
        davinciPresets: 'DaVinci Resolve',
        adobePresets: 'Adobe',
        sortBy: 'Trier par',
        sortOptions: {
          newest: 'Le plus récent',
          popular: 'Populaire',
          a_z: 'A-Z',
          z_a: 'Z-A',
        },
      },
      testimonials: {
        whatCreatorsSay: 'Ce que disent les <1>Créateurs</1> à propos de nous',
        dontTakeOurWord:
          "Ne vous fiez pas qu'à notre parole - écoutez les créateurs de contenu qui utilisent nos outils au quotidien",
        yFuryRole: 'YouTuber & Streamer Minecraft',
        yFuryContent: 'J`adore les ressources car elles sont difficiles à trouver',
        jkingnickRole: 'YouTuber Minecraft',
        jkingnickContent:
          'Le site web est très professionnel et semble être une super idée pour les créateurs de contenu comme moi',
        alphaReturnsRole: 'YouTuber et designer de miniatures Minecraft',
        alphaReturnsContent:
          'Renderdragon est un très bon outil avec d`excellentes ressources utiles pour pratiquement tout YouTuber (petit ou grand)',
        itsProgerRole: 'YouTuber et designer de miniatures Minecraft',
        itsProgerContent:
          'J`aime beaucoup renderdragon, c`est l`un des seuls et meilleurs sites pour les créateurs de contenu Minecraft. J`aime beaucoup le style, les ressources, les outils et toute l`équipe qui travaille sur ce projet incroyable. Je l`utiliserai pour chaque vidéo que je ferai à l`avenir',
      },
    },
  },
  nl: {
    translation: {
      join_title: 'Word lid van onze Discord!',
      join_desc:
        'Krijg hulp, deel je creaties en ontvang het laatste nieuws van de Renderdragon-community.',
      join_now: 'Nu lid worden',
      never_show: 'Niet meer tonen',
      browse_tab: 'Blader door bronnen',
      favorites_tab: 'Favorieten',
      no_favorites: 'Nog geen favorieten',
      start_exploring:
        'Begin met het verkennen van bronnen en voeg ze toe aan je favorieten!',
      navbar: {
        home: 'Home',
        contact: 'Contact',
        resources: 'Bronnen',
        resourcesHub: 'Bronnenhub',
        guides: 'Gidsen',
        utilities: 'Hulpprogramma`s',
        community: 'Community',
        tools: 'Tools',
        musicCopyrightChecker: 'Muziek Copyright Checker',
        backgroundGenerator: 'Achtergrond Generator',
        playerRenderer: 'Speler Renderer',
        textGenerator: 'Tekst Generator',
        youtubeDownloader: 'YouTube Downloader',
        contentGenerators: 'Content Generators',
        newTag: 'NIEUW',
        signIn: 'Inloggen',
        signOut: 'Uitloggen',
        myFavorites: 'Mijn favorieten',
        darkMode: 'Donkere modus',
        lightMode: 'Lichte modus',
        becomePartner: 'Word partner',
      },
      footer: {
        description:
          'Minecraft content creators versterken met gratis bronnen, tools en gidsen. 100% gratis, zonder voorwaarden.',
        legal: 'Juridisch',
        termsOfService: 'Servicevoorwaarden',
        privacyPolicy: 'Privacybeleid',
        navigate: 'Navigeren',
        home: 'Home',
        resourcesHub: 'Bronnenhub',
        guides: 'Gidsen',
        utilities: 'Hulpprogramma`s',
        contact: 'Contact',
        tools: 'Tools',
        musicCopyrightChecker: 'Muziek Copyright Checker',
        backgroundGenerator: 'Achtergrond Generator',
        playerRenderer: 'Speler Renderer',
        renderbot: 'Renderbot',
        textGenerator: 'Tekst Generator',
        contentGenerators: 'Content Generators',
        youtubeDownloader: 'YouTube Downloader',
        newTag: 'NIEUW',
        faq: 'FAQ',
        terms: 'Voorwaarden',
        privacy: 'Privacy',
        notAssociated: 'Niet geassocieerd met Mojang of Microsoft',
        iconCredit: 'Flaticon',
        copyright: ' {{year}} Renderdragon',
        madeByToastTitle: 'Website gemaakt door Team Wheels',
        madeByToastDescription: 'Bedankt voor het bezoeken van Renderdragon!',
      },
      home: {
        title: 'Renderdragon - Tools & Bronnen voor Minecraft-makers',
        description:
          'Jouw ultieme toolkit voor het maken van Minecraft-content op YouTube. Krijg gratis tools, bronnen, muziek en gidsen, zonder advertenties.',
        ogTitle:
          'Renderdragon - Tools & Bronnen zonder advertenties voor Minecraft-makers',
        ogDescription:
          'Jouw ultieme toolkit voor het maken van Minecraft-content op YouTube. Krijg gratis tools, bronnen, muziek en gidsen, zonder advertenties.',
        twitterTitle:
          'Renderdragon - Tools & Bronnen voor Minecraft-makers',
      },
      hero: {
        unlockYour: 'ONTGRENDEL JE',
        creationPotential: 'CREATIEVE POTENTIEEL',
        description:
          'Tools, textures, geluiden, inspiratie en alles wat je nodig hebt, handgemaakt voor Minecraft-creators.',
        browseResources: 'Blader door bronnen',
        checkMusicCopyright: 'Controleer muziek copyright',
        freeBadge: '100% Gratis. Geen voorwaarden.',
      },
      featuredResources: {
        title: 'Uitgelicht',
        titleHighlight: 'Bronnen',
        description:
          'Ontdek onze populairste gratis bronnen om je contentcreatie te verbeteren',
        viewAll: 'Bekijk alle bronnen',
      },
      popularTools: {
        title: 'Populaire',
        titleHighlight: 'Tools',
        description: 'Gratis tools om je contentcreatie te optimaliseren',
        tools: {
          musicCopyright: {
            title: 'Muziek Copyright Checker',
            description:
              'Controleer of muzieknummers veilig zijn om te gebruiken in je video`s',
          },
          videoDownloader: {
            title: 'Video Downloader',
            description: 'Download video\'s en audio van verschillende platforms',
          },
          backgroundGenerator: {
            title: 'Achtergrond Generator',
            description:
              'Maak aangepaste achtergronden voor je thumbnails en overlays',
          },
          playerRenderer: {
            title: 'Speler Renderer',
            description:
              'Laat je Minecraft-skin renderen in 3D voor thumbnails of video`s',
          },
        },
        tryItNow: 'Probeer het nu →',
      },
      partnership: {
        title: 'Trots partner van',
        description:
          'We werken samen met innovatieve communities en projecten die onze passie voor creativiteit en groei delen.',
        partners: {
          creatorsKingdom: {
            name: 'Creators Kingdom',
            description: 'Minecraft creators community.',
          },
          decourSmp: {
            name: 'Decour SMP',
            description:
              'Een Lifesteal SMP zonder economie met handige plugins.',
          },
        },
        becomePartner: 'Word partner',
      },
      donateButton: {
        donate: 'Doneren',
        support: 'Steun Renderdragon',
        description: 'Donaties zijn onze enige inkomstenbron',
        whyDonate: 'Waarom doneren?',
        reasons: {
          free: 'Houd alle bronnen 100% gratis voor iedereen',
          develop: 'Help meer tools en bronnen te ontwikkelen',
          community: 'Steun de Minecraft-creators community',
        },
      },
      resourcesHub: {
        meta: {
          title: 'Bronnenhub - Renderdragon',
          description:
            'Verken en download gratis bronnen voor het maken van Minecraft-content, inclusief thumbnails, overlays, geluidseffecten en meer.',
        },
        title: 'Bronnenhub',
        description:
          'Jouw one-stop-bestemming voor hoogwaardige en gratis bronnen voor je contentcreatie-reis.',
        tabs: {
          browse: 'Blader door bronnen',
          favorites: 'Mijn favorieten',
        },
        toast: {
          download_success: 'Bron succesvol gedownload!',
          download_error: 'Fout bij het downloaden van bron.',
        },
        scrollToTop: 'Terug naar boven',
      },
      resourcesList: {
        noResourcesFound: 'Geen bronnen gevonden',
        noResourcesMatch:
          'Geen bronnen gevonden voor je zoekopdracht naar "{{query}}".',
        noFavoritesMessage:
          'Je hebt nog geen bronnen als favoriet toegevoegd. Klik op het hartje bij een bron om deze hier toe te voegen!',
        noResourcesInCategory:
          'Er zijn momenteel geen bronnen in de categorie {{category}}.',
        clearFilters: 'Filters wissen',
        contributeResources: 'Bronnen bijdragen',
        checkOldSite: 'Bekijk de oude site',
        loading: 'Laden...',
        loadMore: 'Meer laden',
      },
      resourceFilters: {
        searchPlaceholder: 'Zoek bronnen...',
        clearSearch: 'Zoekopdracht wissen',
        filterTitleMobile: 'Filters',
        filterByCategory: 'Filter op categorie',
        all: 'Alle',
        music: 'Muziek',
        sfx: 'SFX',
        images: 'Afbeeldingen',
        animations: 'Animaties',
        fonts: 'Lettertypen',
        presets: 'Presets',
        selectPreset: 'Selecteer preset-type',
        allPresets: 'Alle presets',
        davinciPresets: 'DaVinci Resolve',
        adobePresets: 'Adobe',
        sortBy: 'Sorteren op',
        sortOptions: {
          newest: 'Nieuwste',
          popular: 'Populair',
          a_z: 'A-Z',
          z_a: 'Z-A',
        },
      },
      testimonials: {
        whatCreatorsSay: 'Wat <1>Creators</1> over ons zeggen',
        dontTakeOurWord:
          'Geloof niet alleen ons - luister naar de content creators die onze tools dagelijks gebruiken',
        yFuryRole: 'Minecraft YouTuber & Streamer',
        yFuryContent: 'Ik hou van de bronnen omdat ze moeilijk te vinden zijn',
        jkingnickRole: 'Minecraft YouTuber',
        jkingnickContent:
          'De website ziet er erg professioneel uit en lijkt een geweldig idee voor content creators zoals ik',
        alphaReturnsRole: 'Minecraft YouTuber en Thumbnail Designer',
        alphaReturnsContent:
          'Renderdragon is een hele goede tool met geweldige bronnen die nuttig kunnen zijn voor vrijwel elke YouTuber (groot of klein)',
        itsProgerRole: 'Minecraft YouTuber en Thumbnail Designer',
        itsProgerContent:
          'Ik vind renderdragon echt leuk, het is een van de enige en beste websites voor Minecraft content creators. Ik vind de stijl, de bronnen, de tools en het hele team dat aan dit geweldige project werkt erg leuk. Ik zal het gebruiken voor elke video die ik in de toekomst maak',
      },
    },
  },
};

// Language detection configuration
const languageDetector = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: (callback: (lng: string) => void) => {
    // 1. Check URL parameter first
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lng');
    
    if (urlLang && ['en', 'es', 'fr', 'nl'].includes(urlLang)) {
      return callback(urlLang);
    }

    // 2. Check localStorage
    const storedLang = localStorage.getItem('i18nextLng');
    if (storedLang && ['en', 'es', 'fr', 'nl'].includes(storedLang)) {
      return callback(storedLang);
    }

    // 3. Check cookie
    const cookieLang = Cookies.get('i18next');
    if (cookieLang && ['en', 'es', 'fr', 'nl'].includes(cookieLang)) {
      return callback(cookieLang);
    }

    // 4. Detect browser/region language
    const browserLang = navigator.language || (navigator as any).userLanguage || 'en';
    const langCode = browserLang.split('-')[0].toLowerCase();
    
    // Region-specific overrides
    const regionSpecificLangs: Record<string, string> = {
      'be': 'nl', // Belgium -> Dutch
      'ca': 'fr', // Canada -> French
      'ch': 'fr', // Switzerland -> French
      'lu': 'fr', // Luxembourg -> French
      'ar': 'es', // Argentina -> Spanish
      'mx': 'es', // Mexico -> Spanish
      'co': 'es', // Colombia -> Spanish
    };

    // Check if we have a region-specific override
    const region = browserLang.split('-')[1]?.toUpperCase();
    if (region && region in regionSpecificLangs) {
      return callback(regionSpecificLangs[region]);
    }

    // Fallback to browser language or English
    const supportedLangs = ['en', 'es', 'fr', 'nl'];
    const detectedLang = supportedLangs.includes(langCode) ? langCode : 'en';
    
    // Save detected language to localStorage and cookie
    localStorage.setItem('i18nextLng', detectedLang);
    Cookies.set('i18next', detectedLang, { expires: 365 });
    
    callback(detectedLang);
  },
  cacheUserLanguage: (lng: string) => {
    // Save language preference to both localStorage and cookie
    localStorage.setItem('i18nextLng', lng);
    Cookies.set('i18next', lng, { expires: 365 });
  }
};

// Configure i18next
i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'es', 'fr', 'nl'],
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    cleanCode: true,
    
    // Detection settings
    detection: {
      order: ['querystring', 'localStorage', 'cookie', 'navigator'],
      caches: ['localStorage', 'cookie'],
      lookupQuerystring: 'lng',
      lookupLocalStorage: 'i18nextLng',
      lookupCookie: 'i18next',
    },
    
    // Cache settings
    saveMissing: false,
    
    // Language matching
    lowerCaseLng: true,
    
    // Interpolation
    interpolation: {
      escapeValue: false,
    },
    
    // React settings
    react: {
      useSuspense: true,
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'b', 'span'],
    },
  });

// Handle language changes
i18n.on('languageChanged', (lng) => {
  // Update HTML lang attribute
  document.documentElement.setAttribute('lang', lng);
  
  // Save to both localStorage and cookie
  localStorage.setItem('i18nextLng', lng);
  Cookies.set('i18next', lng, { expires: 365 });
});

export default i18n;