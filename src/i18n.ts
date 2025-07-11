import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      join_title: 'Join our Discord!',
      join_desc: 'Get help, share your creations, and get the latest updates from the Renderdragon community.',
      join_now: 'Join Now',
      never_show: 'Never Show Again',
      browse_tab: 'Browse Resources',
      favorites_tab: 'Favorites',
      no_favorites: 'No favorites yet',
      start_exploring: 'Start exploring resources and add them to your favorites!',
      navbar: {
        home: "Home",
        contact: "Contact",
        resources: "Resources",
        resourcesHub: "Resources Hub",
        guides: "Guides",
        utilities: "Utilities",
        community: "Community",
        tools: "Tools",
        musicCopyrightChecker: "Music Copyright Checker",
        backgroundGenerator: "Background Generator",
        playerRenderer: "Player Renderer",
        textGenerator: "Text Generator",
        youtubeDownloader: "YouTube Downloader",
        contentGenerators: "Content Generators",
        newTag: "NEW",
        signIn: "Sign In",
        signOut: "Sign Out",
        myFavorites: "My Favorites",
        darkMode: "Dark Mode",
        lightMode: "Light Mode",
        becomePartner: "Become a Partner"
      },
      footer: {
        description: "Empowering Minecraft content creators with free resources, tools, and guides. 100% free, no strings attached.",
        legal: "Legal",
        termsOfService: "Terms of Service",
        privacyPolicy: "Privacy Policy",
        navigate: "Navigate",
        home: "Home",
        resourcesHub: "Resources Hub",
        guides: "Guides",
        utilities: "Utilities",
        contact: "Contact",
        tools: "Tools",
        musicCopyrightChecker: "Music Copyright Checker",
        backgroundGenerator: "Background Generator",
        playerRenderer: "Player Renderer",
        renderbot: "Renderbot",
        textGenerator: "Text Generator",
        contentGenerators: "Content Generators",
        youtubeDownloader: "YouTube Downloader",
        newTag: "NEW",
        faq: "FAQ",
        terms: "Terms",
        privacy: "Privacy",
        notAssociated: "Not associated with Mojang or Microsoft",
        iconCredit: "Flaticon",
        copyright: "© {{year}} Renderdragon",
        madeByToastTitle: "Website made by Team Wheels",
        madeByToastDescription: "Thanks for visiting Renderdragon!"
      },
      home: {
        title: "Renderdragon - Tools & Resources for Minecraft Content Creators",
        description: "Your ultimate toolkit for creating Minecraft YouTube content. Get free tools, assets, music, and guides—all ad-free.",
        ogTitle: "Renderdragon - Ad-free Tools & Resources for Minecraft Content Creators",
        ogDescription: "Your ultimate toolkit for creating Minecraft YouTube content. Get free tools, assets, music, and guides—all ad-free.",
        twitterTitle: "Renderdragon - Tools & Resources for Minecraft Content Creators"
      },
      hero: {
        unlockYour: "UNLOCK YOUR",
        creationPotential: "CREATION POTENTIAL",
        description: "Tools, textures, sounds, inspiration and everything in between — hand-crafted for Minecraft creators.",
        browseResources: "Browse Resources",
        checkMusicCopyright: "Check Music Copyright",
        freeBadge: "100% Free. No strings attached."
      },
      featuredResources: {
        title: "Featured",
        titleHighlight: "Resources",
        description: "Discover our most popular free resources to enhance your content creation",
        viewAll: "View All Resources"
      },
      popularTools: {
        title: "Popular",
        titleHighlight: "Tools",
        description: "Free tools to streamline your content creation workflow",
        tools: {
          musicCopyright: {
            title: "Music Copyright Checker",
            description: "Check if music tracks are safe to use in your videos"
          },
          aiTitle: {
            title: "AI Title Assistant",
            description: "Generate catchy titles for your YouTube videos"
          },
          backgroundGenerator: {
            title: "Background Generator",
            description: "Create unique backgrounds for your videos and streams"
          },
          playerRenderer: {
            title: "Player Renderer",
            description: "Get your Minecraft skin rendered in 3D for thumbnails or videos"
          }
        },
        tryItNow: "Try it now →"
      },
      partnership: {
        title: "Proudly Partnered With",
        description: "We collaborate with innovative communities and projects that share our passion for creativity and growth.",
        partners: {
          creatorsKingdom: {
            name: "Creators' Kingdom",
            description: "A community built on creativity and teamwork."
          },
          progersKitchen: {
            name: "Proger's Kitchen",
            description: "A vibrant community for creators to give and receive feedback."
          },
          decourSmp: {
            name: "Decour SMP",
            description: "A non-economy based Lifesteal SMP with helpful plugins."
          }
        },
        becomePartner: "Become a Partner"
      },
      donateButton: {
        donate: "Donate",
        support: "Support Renderdragon",
        description: "Donations are our only source of income",
        whyDonate: "Why Donate?",
        reasons: {
          free: "Keep all resources 100% free for everyone",
          develop: "Help us develop more tools and assets",
          community: "Support the Minecraft creator community"
        }
      },
      resourcesHub: {
        meta: {
          title: "Resources Hub - Renderdragon",
          description: "Browse and download free Minecraft content creation resources including thumbnails, overlays, sound effects, and more."
        },
        title: "Resources Hub",
        description: "Your one-stop shop for high-quality, free resources for your content creation journey.",
        tabs: {
          browse: "Browse Resources",
          favorites: "My Favorites"
        },
        toast: {
          download_success: "Resource downloaded successfully!",
          download_error: "Failed to download resource."
        },
        scrollToTop: "Scroll to top"
      },
      resourcesList: {
        noResourcesFound: "No resources found",
        noResourcesMatch: "No resources match your search for \"{{query}}\".",
        noFavoritesMessage: "You haven't added any favorites yet. Click the heart on a resource to save it here!",
        noResourcesInCategory: "There are currently no resources in the {{category}} category.",
        clearFilters: "Clear Filters",
        contributeResources: "Contribute Resources",
        checkOldSite: "Check Old Site",
        loading: "Loading...",
        loadMore: "Load More"
      },
      resourceFilters: {
        searchPlaceholder: "Search for resources...",
        clearSearch: "Clear search",
        filterTitleMobile: "Filters",
        filterByCategory: "Filter by category",
        all: "All",
        music: "Music",
        sfx: "SFX",
        images: "Images",
        animations: "Animations",
        fonts: "Fonts",
        presets: "Presets",
        selectPreset: "Select preset type",
        allPresets: "All Presets",
        davinciPresets: "DaVinci Resolve",
        adobePresets: "Adobe",
        sortBy: "Sort by",
        sortOptions: {
          newest: "Newest",
          popular: "Popular",
          a_z: "A-Z",
          z_a: "Z-A"
        }
      },
      testimonials: {
        whatCreatorsSay: "What <1>Creators</1> Say About Us",
        dontTakeOurWord: "Don't just take our word for it - hear from the content creators who use our tools every day",
        yFuryRole: "Minecraft YouTuber & Streamer",
        yFuryContent: "I love the assets cause they are harddd to find",
        jkingnickRole: "Minecraft Youtuber",
        jkingnickContent: "Website looks very professional and seems to be a really cool idea for content creators like myself",
        alphaReturnsRole: "Minecraft Youtuber and Thumbnail Designer",
        alphaReturnsContent: "Renderdragon is a really good tool with great assets that can be useful for pretty much any YouTuber (small or big)",
        itsProgerRole: "Minecraft YouTuber and Thumbnail Designer",
        itsProgerContent: "I really like renderdragon, it's one of the only and best websites for Minecraft content creators. I really like the style, assets, tools and the whole team working on this amazing project. I'll use it for every single video that I make in the future"
      }
    },
  },
  es: {
    translation: {
      join_title: '¡Únete a nuestro Discord!',
      join_desc: 'Obtén ayuda, comparte tus creaciones y recibe las últimas novedades de la comunidad de Renderdragon.',
      join_now: 'Únete ahora',
      never_show: 'No mostrar de nuevo',
      browse_tab: 'Explorar recursos',
      favorites_tab: 'Favoritos',
      no_favorites: 'Aún no hay favoritos',
      start_exploring: '¡Empieza a explorar recursos y añádelos a tus favoritos!',
      navbar: {
        home: "Inicio",
        contact: "Contacto",
        resources: "Recursos",
        resourcesHub: "Centro de Recursos",
        guides: "Guías",
        utilities: "Utilidades",
        community: "Comunidad",
        tools: "Herramientas",
        musicCopyrightChecker: "Verificador de Copyright de Música",
        backgroundGenerator: "Generador de Fondos",
        playerRenderer: "Renderizador de Jugador",
        textGenerator: "Generador de Texto",
        youtubeDownloader: "Descargador de YouTube",
        contentGenerators: "Generadores de Contenido",
        newTag: "NUEVO",
        signIn: "Iniciar Sesión",
        signOut: "Cerrar Sesión",
        myFavorites: "Mis Favoritos",
        darkMode: "Modo Oscuro",
        lightMode: "Modo Claro",
        becomePartner: "Conviértete en Socio"
      },
      footer: {
        description: "Empoderando a los creadores de contenido de Minecraft con recursos, herramientas y guías gratuitos. 100% gratis, sin compromisos.",
        legal: "Legal",
        termsOfService: "Términos de Servicio",
        privacyPolicy: "Política de Privacidad",
        navigate: "Navegar",
        home: "Inicio",
        resourcesHub: "Centro de Recursos",
        guides: "Guías",
        utilities: "Utilidades",
        contact: "Contacto",
        tools: "Herramientas",
        musicCopyrightChecker: "Verificador de Copyright de Música",
        backgroundGenerator: "Generador de Fondos",
        playerRenderer: "Renderizador de Jugador",
        renderbot: "Renderbot",
        textGenerator: "Generador de Texto",
        contentGenerators: "Generadores de Contenido",
        youtubeDownloader: "Descargador de YouTube",
        newTag: "NUEVO",
        faq: "FAQ",
        terms: "Términos",
        privacy: "Privacidad",
        notAssociated: "No asociado con Mojang o Microsoft",
        iconCredit: "Flaticon",
        copyright: "© {{year}} Renderdragon",
        madeByToastTitle: "Sitio web hecho por Team Wheels",
        madeByToastDescription: "¡Gracias por visitar Renderdragon!"
      },
      home: {
        title: "Renderdragon - Herramientas y Recursos para Creadores de Contenido de Minecraft",
        description: "Tu kit de herramientas definitivo para crear contenido de YouTube de Minecraft. Obtén herramientas, recursos, música y guías gratis, todo sin anuncios.",
        ogTitle: "Renderdragon - Herramientas y Recursos sin anuncios para Creadores de Contenido de Minecraft",
        ogDescription: "Tu kit de herramientas definitivo para crear contenido de YouTube de Minecraft. Obtén herramientas, recursos, música y guías gratis, todo sin anuncios.",
        twitterTitle: "Renderdragon - Herramientas y Recursos para Creadores de Contenido de Minecraft"
      },
      hero: {
        unlockYour: "DESBLOQUEA TU",
        creationPotential: "POTENCIAL DE CREACIÓN",
        description: "Herramientas, texturas, sonidos, inspiración y todo lo demás, hecho a mano para los creadores de Minecraft.",
        browseResources: "Explorar Recursos",
        checkMusicCopyright: "Verificar Copyright de Música",
        freeBadge: "100% Gratis. Sin compromisos."
      },
      featuredResources: {
        title: "Recursos",
        titleHighlight: "Destacados",
        description: "Descubre nuestros recursos gratuitos más populares para mejorar tu creación de contenido",
        viewAll: "Ver Todos los Recursos"
      },
      popularTools: {
        title: "Herramientas",
        titleHighlight: "Populares",
        description: "Herramientas gratuitas para agilizar tu flujo de trabajo de creación de contenido",
        tools: {
          musicCopyright: {
            title: "Verificador de Copyright de Música",
            description: "Comprueba si las pistas de música son seguras para usar en tus videos"
          },
          aiTitle: {
            title: "Asistente de Títulos con IA",
            description: "Genera títulos atractivos para tus videos de YouTube"
          },
          backgroundGenerator: {
            title: "Generador de Fondos",
            description: "Crea fondos únicos para tus videos y transmisiones"
          },
          playerRenderer: {
            title: "Renderizador de Jugador",
            description: "Obtén tu skin de Minecraft renderizada en 3D para miniaturas o videos"
          }
        },
        tryItNow: "Pruébalo ahora →"
      },
      partnership: {
        title: "Orgullosamente Asociados Con",
        description: "Colaboramos con comunidades y proyectos innovadores que comparten nuestra pasión por la creatividad y el crecimiento.",
        partners: {
          creatorsKingdom: {
            name: "Creators' Kingdom",
            description: "Una comunidad construida sobre la creatividad y el trabajo en equipo."
          },
          progersKitchen: {
            name: "Proger's Kitchen",
            description: "Una comunidad vibrante para que los creadores den y reciban comentarios."
          },
          decourSmp: {
            name: "Decour SMP",
            description: "Un Lifesteal SMP no basado en la economía con plugins útiles."
          }
        },
        becomePartner: "Conviértete en Socio"
      },
      donateButton: {
        donate: "Donar",
        support: "Apoya a Renderdragon",
        description: "Las donaciones son nuestra única fuente de ingresos",
        whyDonate: "¿Por qué donar?",
        reasons: {
          free: "Mantener todos los recursos 100% gratis para todos",
          develop: "Ayúdanos a desarrollar más herramientas y activos",
          community: "Apoya a la comunidad de creadores de Minecraft"
        }
      },
      resourcesHub: {
        meta: {
          title: "Centro de Recursos - Renderdragon",
          description: "Explora y descarga recursos gratuitos para la creación de contenido de Minecraft, incluyendo miniaturas, superposiciones, efectos de sonido y más."
        },
        title: "Centro de Recursos",
        description: "Tu lugar único para recursos de alta calidad y gratuitos para tu viaje de creación de contenido.",
        tabs: {
          browse: "Explorar Recursos",
          favorites: "Mis Favoritos"
        },
        toast: {
          download_success: "¡Recurso descargado con éxito!",
          download_error: "Error al descargar el recurso."
        },
        scrollToTop: "Desplazarse hacia arriba"
      },
      resourcesList: {
        noResourcesFound: "No se encontraron recursos",
        noResourcesMatch: "No hay recursos que coincidan con tu búsqueda de \"{{query}}\".",
        noFavoritesMessage: "Aún no has añadido ningún favorito. ¡Haz clic en el corazón de un recurso para guardarlo aquí!",
        noResourcesInCategory: "Actualmente no hay recursos en la categoría {{category}}.",
        clearFilters: "Limpiar Filtros",
        contributeResources: "Contribuir Recursos",
        checkOldSite: "Visitar Sitio Antiguo",
        loading: "Cargando...",
        loadMore: "Cargar Más"
      },
      resourceFilters: {
        searchPlaceholder: "Buscar recursos...",
        clearSearch: "Limpiar búsqueda",
        filterTitleMobile: "Filtros",
        filterByCategory: "Filtrar por categoría",
        all: "Todos",
        music: "Música",
        sfx: "SFX",
        images: "Imágenes",
        animations: "Animaciones",
        fonts: "Fuentes",
        presets: "Presets",
        selectPreset: "Seleccionar tipo de preset",
        allPresets: "Todos los Presets",
        davinciPresets: "DaVinci Resolve",
        adobePresets: "Adobe",
        sortBy: "Ordenar por",
        sortOptions: {
          newest: "Más nuevos",
          popular: "Populares",
          a_z: "A-Z",
          z_a: "Z-A"
        }
      },
      testimonials: {
        whatCreatorsSay: "Qué Dicen los <1>Creadores</1> Sobre Nosotros",
        dontTakeOurWord: "No te fíes solo de nuestra palabra - escucha a los creadores de contenido que usan nuestras herramientas todos los días",
        yFuryRole: "YouTuber y Streamer de Minecraft",
        yFuryContent: "Me encantan los recursos porque son difíciles de encontrar",
        jkingnickRole: "Youtuber de Minecraft",
        jkingnickContent: "El sitio web se ve muy profesional y parece una idea genial para creadores de contenido como yo",
        alphaReturnsRole: "Youtuber y Diseñador de Miniaturas de Minecraft",
        alphaReturnsContent: "Renderdragon es una herramienta realmente buena con excelentes recursos que pueden ser útiles para casi cualquier YouTuber (pequeño o grande)",
        itsProgerRole: "YouTuber y Diseñador de Miniaturas de Minecraft",
        itsProgerContent: "Me gusta mucho Renderdragon, es uno de los únicos y mejores sitios web para creadores de contenido de Minecraft. Me gusta mucho el estilo, los recursos, las herramientas y todo el equipo que trabaja en este increíble proyecto. Lo usaré para cada video que haga en el futuro"
      }
    }
  },
  fr: {
    translation: {
      // ... existing translations ...
      resourcesHub: {
        // ... existing translations ...
        resourcesList: {
          noResourcesFound: "Aucune ressource trouvée",
          noResourcesMatch: "Aucune ressource ne correspond à votre recherche pour \"{{query}}\".",
          noFavoritesMessage: "Vous n'avez pas encore ajouté de favoris. Cliquez sur le cœur d'une ressource pour la sauvegarder ici !",
          noResourcesInCategory: "Il n'y a actuellement aucune ressource dans la catégorie {{category}}.",
          clearFilters: "Effacer les filtres",
          contributeResources: "Contribuer des ressources",
          checkOldSite: "Voir le site ancien",
          loading: "Chargement...",
          loadMore: "Charger plus"
        },
        // ... existing translations ...
        },
                scrollToTop: "Faire défiler vers le haut"
      },
      resourceFilters: {
        searchPlaceholder: "Rechercher des ressources...",
        clearSearch: "Effacer la recherche",
        filterTitleMobile: "Filtres",
        filterByCategory: "Filtrer par catégorie",
        all: "Tous",
        music: "Musique",
        sfx: "SFX",
        images: "Images",
        animations: "Animations",
        fonts: "Polices",
        presets: "Préréglages",
        selectPreset: "Sélectionner le type de préréglage",
        allPresets: "Tous les Préréglages",
        davinciPresets: "DaVinci Resolve",
        adobePresets: "Adobe",
                sortBy: "Trier par",
        sortOptions: {
          newest: "Les plus récents",
          popular: "Populaires",
          a_z: "A-Z",
          z_a: "Z-A"
        }
      },
      testimonials: {
        whatCreatorsSay: "Ce que les <1>Créateurs</1> Disent de Nous",
        dontTakeOurWord: "Ne nous croyez pas sur parole - écoutez les créateurs de contenu qui utilisent nos outils tous les jours",
        yFuryRole: "YouTuber et Streamer Minecraft",
        yFuryContent: "J'adore les ressources car elles sont difficiles à trouver",
        jkingnickRole: "Youtuber Minecraft",
        jkingnickContent: "Le site web a l'air très professionnel et semble être une idée vraiment cool pour les créateurs de contenu comme moi",
        alphaReturnsRole: "Youtuber et Concepteur de Miniatures Minecraft",
        alphaReturnsContent: "Renderdragon est un très bon outil avec d'excellentes ressources qui peuvent être utiles pour pratiquement n'importe quel YouTuber (petit ou grand)",
        itsProgerRole: "YouTuber et Concepteur de Miniatures Minecraft",
        itsProgerContent: "J'aime beaucoup Renderdragon, c'est l'un des seuls et des meilleurs sites web pour les créateurs de contenu Minecraft. J'aime beaucoup le style, les ressources, les outils et toute l'équipe qui travaille sur ce projet incroyable. Je l'utiliserai pour chaque vidéo que je ferai à l'avenir"
      }
    },
  },
  nl: {
    translation: {
      join_title: 'Word lid van onze Discord!',
      join_desc: 'Krijg hulp, deel je creaties en ontvang de laatste updates van de Renderdragon-community.',
      join_now: 'Nu deelnemen',
      never_show: 'Niet meer tonen',
      browse_tab: 'Blader door bronnen',
      favorites_tab: 'Favorieten',
      no_favorites: 'Nog geen favorieten',
      start_exploring: 'Begin met verkennen en voeg bronnen toe aan je favorieten!',
      "load_more": "Meer laden",
      "search_placeholder": "Zoek bronnen...",
      "clear_search": "Zoekopdracht wissen",
      "filter_by_category": "Filter op categorie",
      "sort_by": "Sorteer op",
      "all_category": "Alle",
      "music_category": "Muziek",
      "sfx_category": "SFX",
      "images_category": "Afbeeldingen",
      "animations_category": "Animaties",
      "fonts_category": "Lettertypen",
      "presets_category": "Presets",
      "all_presets": "Alle Presets",
      "davinci_presets": "Davinci Resolve",
      "adobe_presets": "Premiere Pro & AE",
      "sort_newest": "Nieuwste",
      "sort_popular": "Populair",
      "sort_a_z": "A-Z",
      "sort_z_a": "Z-A",
      "no_resources_found": "Geen bronnen gevonden",
      "no_resources_match": "Geen bronnen gevonden voor uw zoekopdracht \"{{query}}\"",
      "no_resources_in_category": "Geen bronnen gevonden in de categorie \"{{category}}\"",
      "no_favorites_message": "U heeft nog geen favoriete bronnen",
      "clear_filters": "Filters wissen",
      "contribute_resources": "Draag bronnen bij",
      "check_old_site": "Bekijk onze oude site",
      "loading": "Laden...",
      "no_preview": "Geen voorbeeld",
      "downloads": "downloads",
      "attribution": "Naamsvermelding",
      "credit_warning": "Gelieve deze auteur te vermelden in uw beschrijving:",
      "credit_text": "Credit: {{author}}",
      "copy": "Kopiëren",
      "copied": "Gekopieerd",
      "no_attribution_required": "Geen naamsvermelding vereist! U bent vrij om deze bron te gebruiken zonder naamsvermelding.",
      "download_resource": "Bron downloaden",
      "previous": "Vorige",
      "next": "Volgende",
      "download_agreement": "Door te downloaden gaat u akkoord met onze gebruiksvoorwaarden. Het vermelden van \"Renderdragon\" is optioneel maar wordt gewaardeerd!",
      "select_preset_type": "Selecteer presattype",
      "filter_title_mobile": "Filter",
      navbar: {
        home: "Thuis",
        contact: "Contact",
        resources: "Bronnen",
        resourcesHub: "Bronnenhub",
        guides: "Gidsen",
        utilities: "Hulpprogramma's",
        community: "Gemeenschap",
        tools: "Gereedschap",
        musicCopyrightChecker: "Muziek Auteursrecht Checker",
        backgroundGenerator: "Achtergrond Generator",
        playerRenderer: "Speler Renderer",
        textGenerator: "Tekst Generator",
        youtubeDownloader: "YouTube Downloader",
        contentGenerators: "Content Generatoren",
        newTag: "NIEUW",
        signIn: "Inloggen",
        signOut: "Uitloggen",
        myFavorites: "Mijn Favorieten",
        darkMode: "Donkere Modus",
        lightMode: "Lichte Modus",
        becomePartner: "Word Partner"
      },
      footer: {
        description: "Minecraft-contentmakers voorzien van gratis bronnen, tools en gidsen. 100% gratis, zonder verplichtingen.",
        legal: "Juridisch",
        termsOfService: "Servicevoorwaarden",
        privacyPolicy: "Privacybeleid",
        navigate: "Navigeren",
        home: "Thuis",
        resourcesHub: "Bronnenhub",
        guides: "Gidsen",
        utilities: "Hulpprogramma's",
        contact: "Contact",
        tools: "Gereedschap",
        musicCopyrightChecker: "Muziek Auteursrecht Checker",
        backgroundGenerator: "Achtergrond Generator",
        playerRenderer: "Speler Renderer",
        renderbot: "Renderbot",
        textGenerator: "Tekst Generator",
        contentGenerators: "Content Generatoren",
        youtubeDownloader: "YouTube Downloader",
        newTag: "NIEUW",
        faq: "FAQ",
        terms: "Voorwaarden",
        privacy: "Privacy",
        notAssociated: "Niet geassocieerd met Mojang of Microsoft",
        iconCredit: "Flaticon",
        copyright: "© {{year}} Renderdragon",
        madeByToastTitle: "Website gemaakt door Team Wheels",
        madeByToastDescription: "Bedankt voor het bezoeken van Renderdragon!"
      },
      home: {
        title: "Renderdragon - Tools & Hulpbronnen voor Minecraft Content Creators",
        description: "Je ultieme toolkit voor het maken van Minecraft YouTube-content. Krijg gratis tools, middelen, muziek en gidsen—allemaal advertentievrij.",
        ogTitle: "Renderdragon - Advertentievrije Tools & Hulpbronnen voor Minecraft Content Creators",
        ogDescription: "Je ultieme toolkit voor het maken van Minecraft YouTube-content. Krijg gratis tools, middelen, muziek en gidsen—allemaal advertentievrij.",
        twitterTitle: "Renderdragon - Tools & Hulpbronnen voor Minecraft Content Creators"
      },
      hero: {
        unlockYour: "ONTGRENDEL JE",
        creationPotential: "CREATIEPOTENTIEEL",
        description: "Tools, texturen, geluiden, inspiratie en alles daartussenin — handgemaakt voor Minecraft-makers.",
        browseResources: "Blader door Bronnen",
        checkMusicCopyright: "Controleer Muziek Auteursrecht",
        freeBadge: "100% Gratis. Zonder verplichtingen."
      },
      featuredResources: {
        title: "Uitgelichte",
        titleHighlight: "Bronnen",
        description: "Ontdek onze meest populaire gratis bronnen om je contentcreatie te verbeteren",
        viewAll: "Bekijk Alle Bronnen"
      },
      popularTools: {
        title: "Populaire",
        titleHighlight: "Tools",
        description: "Gratis tools om je workflow voor het maken van content te stroomlijnen",
        tools: {
          musicCopyright: {
            title: "Muziek Auteursrecht Checker",
            description: "Controleer of muzieknummers veilig zijn om in je video's te gebruiken"
          },
          aiTitle: {
            title: "AI Titel Helper",
            description: "Genereer pakkende titels voor je YouTube-video's"
          },
          backgroundGenerator: {
            title: "Achtergrond Generator",
            description: "Creëer unieke achtergronden voor je video's en streams"
          },
          playerRenderer: {
            title: "Speler Renderer",
            description: "Krijg je Minecraft-skin in 3D gerenderd voor thumbnails of video's"
          }
        },
        tryItNow: "Probeer het nu →"
      },
      partnership: {
        title: "Met trots partner van",
        description: "We werken samen met innovatieve gemeenschappen en projecten die onze passie voor creativiteit en groei delen.",
        partners: {
          creatorsKingdom: {
            name: "Creators' Kingdom",
            description: "Een gemeenschap gebouwd op creativiteit en teamwork."
          },
          progersKitchen: {
            name: "Proger's Kitchen",
            description: "Een levendige gemeenschap voor makers om feedback te geven en te krijgen."
          },
          decourSmp: {
            name: "Decour SMP",
            description: "Een niet op economie gebaseerde Lifesteal SMP met handige plugins."
          }
        },
        becomePartner: "Word een partner"
      },
      donateButton: {
        donate: "Doneren",
        support: "Steun Renderdragon",
        description: "Donaties zijn onze enige bron van inkomsten",
        whyDonate: "Waarom doneren?",
        reasons: {
          free: "Houd alle bronnen 100% gratis voor iedereen",
          develop: "Help ons meer tools en middelen te ontwikkelen",
          community: "Ondersteun de Minecraft-creatorgemeenschap"
        }
      },
      resourcesHub: {
        meta: {
          title: "Bronnenhub - Renderdragon",
          description: "Blader en download gratis Minecraft-contentcreatiebronnen, waaronder miniaturen, overlays, geluidseffecten en meer."
        },
        title: "Bronnenhub",
        description: "Jouw alles-in-één-winkel voor hoogwaardige, gratis bronnen voor je contentcreatie-reis.",
        tabs: {
          browse: "Blader door Bronnen",
          favorites: "Mijn Favorieten"
        },
        toasts: {
          downloadStarting: {
            title: "Download starten...",
            description: "Renderdragon vermelden is optioneel maar wordt gewaardeerd!"
          },
          downloadError: "Download-URL niet beschikbaar."
        },
                scrollToTop: "Naar boven scrollen"
      },
      resourcesList: {
        noResourcesFound: "Geen bronnen gevonden",
        noResourcesMatch: "Geen bronnen komen overeen met je zoekopdracht voor \"{{query}}\".",
        noFavoritesMessage: "Je hebt nog geen favorieten toegevoegd. Klik op het hartje van een bron om het hier op te slaan!",
        noResourcesInCategory: "Er zijn momenteel geen bronnen in de categorie {{category}}.",
        clearFilters: "Filters wissen",
        contributeResources: "Bronnen bijdragen",
        checkOldSite: "Oude site bekijken",
        loading: "Laden...",
        loadMore: "Meer laden"
      },
      resourceFilters: {
        searchPlaceholder: "Zoek naar bronnen...",
        clearSearch: "Zoekopdracht wissen",
        filterTitleMobile: "Filters",
        filterByCategory: "Filteren op categorie",
        all: "Alle",
        music: "Muziek",
        sfx: "SFX",
        images: "Afbeeldingen",
        animations: "Animaties",
        fonts: "Lettertypen",
        presets: "Presets",
        selectPreset: "Selecteer presetype",
        allPresets: "Alle Presets",
        davinciPresets: "DaVinci Resolve",
        adobePresets: "Adobe",
                sortBy: "Sorteer op",
        sortOptions: {
          newest: "Nieuwste",
          popular: "Populairste",
          a_z: "A-Z",
          z_a: "Z-A"
        }
      },
      testimonials: {
        whatCreatorsSay: "Wat <1>Creators</1> Over Ons Zeggen",
        dontTakeOurWord: "Geloof ons niet op ons woord - hoor van de content creators die onze tools elke dag gebruiken",
        yFuryRole: "Minecraft YouTuber & Streamer",
        yFuryContent: "Ik ben dol op de assets omdat ze moeilijk te vinden zijn",
        jkingnickRole: "Minecraft Youtuber",
        jkingnickContent: "De website ziet er erg professioneel uit en lijkt een heel cool idee voor content creators zoals ik",
        alphaReturnsRole: "Minecraft Youtuber en Thumbnail Designer",
        alphaReturnsContent: "Renderdragon is een echt goede tool met geweldige assets die nuttig kunnen zijn voor vrijwel elke YouTuber (klein of groot)",
        itsProgerRole: "Minecraft YouTuber en Thumbnail Designer",
        itsProgerContent: "Ik vind Renderdragon erg leuk, het is een van de weinige en beste websites voor Minecraft-content creators. Ik hou echt van de stijl, de assets, de tools en het hele team dat aan dit geweldige project werkt. Ik zal het gebruiken voor elke video die ik in de toekomst maak"
      }
    }
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes
    },
    react: {
      useSuspense: true,
    },
    detection: {
      // Order and from where user language should be detected
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['cookie'],
    },
  });

export default i18n;
