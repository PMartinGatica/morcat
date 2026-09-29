/**
 * ============================================================
 *  MORCAT — LANDING PAGES DE CAMPAÑA (/promo/[slug])
 * ============================================================
 *  Cada entrada genera una landing independiente para campañas
 *  de Meta Ads, Instagram Ads, Facebook Ads o Google Ads.
 *
 *  OBJETIVO: convertir tráfico pago en consultas comerciales
 *  (WhatsApp como conversión principal, formulario como
 *  secundaria). Sin navegación corporativa: cero puntos de fuga.
 *
 *  ⚠️  REGLAS DE CONTENIDO:
 *  - No se inventan precios, cuotas, tasas, plazos, garantías,
 *    características constructivas, ni cifras de trayectoria.
 *  - Si el dato no existe → copy prudente o "DEMO CONTENT".
 * ============================================================
 */

export interface PromoFaq {
  question: string;
  answer: string;
}

export interface PromoStep {
  index: string;
  title: string;
  description: string;
}

export interface PromoUseCase {
  title: string;
  description: string;
  icon: string;
}

export interface Promo {
  slug: string;

  /* ---------- SEO ---------- */
  seoTitle: string;
  seoDescription: string;

  /* ---------- HERO ---------- */
  hero: {
    eyebrow: string;
    titleLines: string[];
    accentLine?: string;
    subtitle: string;
    cta: string;
    secondaryCta: string;
    image: string;
    /** Nota de superficies (solo si los datos lo confirman). */
    note?: string;
    footnote?: string;
  };

  /* ---------- CONFIANZA INMEDIATA ---------- */
  trustItems: string[];

  /* ---------- PROBLEMA / PROPUESTA ---------- */
  problem: {
    eyebrow: string;
    title: string;
    accentLine: string;
    body: string[];
    note: string;
    /** Visual: transición plano → volumen → vivienda. */
    visuals: string[];
  };

  /* ---------- CATÁLOGO ---------- */
  modelsHeading: {
    title: string;
    accentLine: string;
    subtitle: string;
  };
  /** Slugs de modelos a destacar (de src/data/homes.ts). */
  featuredHomeSlugs: string[];
  modelsCta: string;
  modelsSecondaryCta: string;

  /* ---------- PLANOS ---------- */
  floorPlans: {
    eyebrow: string;
    title: string;
    accentLine: string;
    subtitle: string;
    zoomLabel: string;
  };

  /* ---------- SHOWCASE (video + fotos) ---------- */
  showcase: {
    eyebrow: string;
    title: string;
    accentLine: string;
    subtitle: string;
    videos: { video: string; poster: string; alt: string; caption: string }[];
    images: string[];
  };

  /* ---------- CASOS DE USO ---------- */
  useCases: {
    eyebrow: string;
    title: string;
    accentLine: string;
    items: PromoUseCase[];
    disclaimer: string;
  };

  /* ---------- PERSONALIZACIÓN ---------- */
  personalization: {
    eyebrow: string;
    title: string;
    accentLine: string;
    copy: string;
    categories: string[];
    note: string;
  };

  /* ---------- PROCESO ---------- */
  process: {
    eyebrow: string;
    title: string;
    accentLine: string;
    steps: PromoStep[];
    note: string;
  };

  /* ---------- TIERRA DEL FUEGO ---------- */
  south: {
    eyebrow: string;
    title: string;
    accentLine: string;
    body: string[];
    cta: string;
    image: string;
  };

  /* ---------- FINANCIACIÓN ---------- */
  financing: {
    eyebrow: string;
    title: string;
    accentLine: string;
    copy: string;
    cta: string;
  };

  /* ---------- CONFIANZA MORCAT ---------- */
  trustSection: {
    eyebrow: string;
    title: string;
    accentLine: string;
    body: string;
    corporateLinkLabel: string;
  };

  /* ---------- FAQ ---------- */
  faqs: PromoFaq[];

  /* ---------- FORMULARIO ---------- */
  form: {
    title: string;
    accentLine: string;
    subtitle: string;
    submitLabel: string;
  };

  /* ---------- CTA FINAL ---------- */
  finalCta: {
    title: string;
    accentLine: string;
    text: string;
    primaryCta: string;
    secondaryCta: string;
  };
}

export const PROMOS: Promo[] = [
  {
    slug: 'viviendas-modulares',
    seoTitle:
      'Viviendas Industrializadas en Tierra del Fuego | Pedí información — MORCAT Constructora',
    seoDescription:
      'Viviendas modulares diseñadas para Tierra del Fuego. Pedí información y consultá qué modelo se adapta mejor a tu proyecto.',

    hero: {
      eyebrow: 'VIVIENDAS INDUSTRIALIZADAS · TIERRA DEL FUEGO',
      titleLines: ['TU PRÓXIMA', 'VIVIENDA'],
      accentLine: 'EMPIEZA ACÁ.',
      subtitle:
        'Modelos compactos y funcionales pensados para vivir, ampliar o desarrollar proyectos en Tierra del Fuego.',
      cta: 'VER MODELOS',
      secondaryCta: 'CONSULTAR POR WHATSAPP',
      image: 'modulares/cabana-andina',
      note: 'Modelos de 18 a 45 m²',
      footnote: '*Superficies y configuraciones sujetas al modelo seleccionado.',
    },

    trustItems: ['Diseño', 'Construcción', 'Proyecto', 'Acompañamiento'],

    problem: {
      eyebrow: 'La propuesta',
      title: 'MENOS METROS.',
      accentLine: 'MÁS INTENCIÓN.',
      body: [
        'Una vivienda compacta no tiene por qué sentirse chica.',
        'Cada metro debe responder a una necesidad: descansar, cocinar, trabajar, guardar y disfrutar el espacio.',
        'MORCAT desarrolla modelos con diferentes superficies y distribuciones para adaptarse a distintos proyectos.',
      ],
      note: 'Las distribuciones y características de cada modelo se publican tal como están cargadas en el catálogo.',
      visuals: ['modulares/plano-21', 'nordicas/platea-flotante', 'modulares/bosque-01'],
    },

    modelsHeading: {
      title: 'ELEGÍ EL PUNTO',
      accentLine: 'DE PARTIDA.',
      subtitle:
        'Explorá los modelos disponibles y encontrá la superficie que mejor se adapte a tu proyecto.',
    },
    featuredHomeSlugs: ['homero-a00', 'homero-a01', 'austral-a00', 'nexa-austral-a00', 'beagle-d01'],
    modelsCta: 'VER MODELO',
    modelsSecondaryCta: 'CONSULTAR',

    floorPlans: {
      eyebrow: 'Distribución',
      title: 'MIRÁ CÓMO',
      accentLine: 'SE APROVECHA CADA METRO.',
      subtitle:
        'Planos esquemáticos de referencia. La distribución final se adapta a tu terreno y necesidades.',
      zoomLabel: 'AMPLIAR PLANO',
    },

    showcase: {
      eyebrow: 'Recorré una vivienda',
      title: 'MIRALA POR',
      accentLine: 'DENTRO Y POR FUERA.',
      subtitle:
        'Un recorrido rápido por el interior y el exterior de las viviendas. Videos e imágenes de referencia de MORCAT.',
      videos: [
        {
          video: 'interior-hogar',
          poster: 'posters/interior-hogar',
          alt: 'Interior de una vivienda modular MORCAT',
          caption: 'Interior · recorrido de referencia',
        },
        {
          video: 'orbital-nordicas',
          poster: 'posters/orbital-nordicas',
          alt: 'Vista orbital del exterior de una vivienda nórdica',
          caption: 'Exterior · vista orbital',
        },
      ],
      images: ['modulares/atardecer', 'nordicas/otono', 'modulares/exterior-02'],
    },

    useCases: {
      eyebrow: 'Casos de uso',
      title: 'UNA BASE.',
      accentLine: 'DISTINTOS PROYECTOS.',
      items: [
        {
          title: 'VIVIENDA',
          description: 'Una solución compacta para comenzar.',
          icon: 'home',
        },
        {
          title: 'AMPLIACIÓN',
          description: 'Sumar superficie a un proyecto existente.',
          icon: 'ruler',
        },
        {
          title: 'ALOJAMIENTO',
          description: 'Unidades para proyectos turísticos.',
          icon: 'mountain',
        },
        {
          title: 'INVERSIÓN',
          description: 'Unidades destinadas a proyectos inmobiliarios.',
          icon: 'layers',
        },
      ],
      disclaimer:
        'Casos de uso posibles según el proyecto — no implica que MORCAT ya los haya desarrollado todos.',
    },

    personalization: {
      eyebrow: 'Personalización',
      title: 'UN MODELO',
      accentLine: 'NO TIENE QUE SER UNA LIMITACIÓN.',
      copy: 'Los modelos funcionan como punto de partida. Cada proyecto se analiza según el uso, las necesidades y el terreno.',
      categories: ['Distribución', 'Terminaciones', 'Superficie', 'Implantación'],
      note: 'Consultanos qué alternativas de adaptación están disponibles para cada modelo.',
    },

    process: {
      eyebrow: 'El proceso',
      title: 'DE LA CONSULTA',
      accentLine: 'AL PROYECTO.',
      steps: [
        {
          index: '01',
          title: 'ELEGÍ UN MODELO',
          description: 'Revisás el catálogo y elegís el modelo que mejor se adapta a tu necesidad.',
        },
        {
          index: '02',
          title: 'CONTANOS TU PROYECTO',
          description: 'Uso previsto, presupuesto estimado y terreno: todo lo que ayude a entender tu caso.',
        },
        {
          index: '03',
          title: 'EVALUAMOS LA IMPLANTACIÓN',
          description: 'Analizamos el terreno y las condiciones del lugar para la propuesta.',
        },
        {
          index: '04',
          title: 'DEFINIMOS LA PROPUESTA',
          description: 'Modelo, adaptaciones, alcance y presupuesto del proyecto puntual.',
        },
        {
          index: '05',
          title: 'CONSTRUCCIÓN',
          description: 'Producción y montaje con seguimiento de avance.',
        },
        {
          index: '06',
          title: 'ENTREGA',
          description: 'Vivienda terminada, con los detalles revisados.',
        },
      ],
      note: 'No publicamos plazos estándar: dependen del modelo, el terreno y las condiciones de cada proyecto.',
    },

    south: {
      eyebrow: 'Tierra del Fuego',
      title: 'PENSADAS',
      accentLine: 'PARA TIERRA DEL FUEGO.',
      body: [
        'Construir en Tierra del Fuego requiere pensar el proyecto desde su entorno.',
        'Diseño, implantación, materiales y sistema constructivo deben analizarse según cada ubicación.',
      ],
      cta: 'CONTANOS DÓNDE QUERÉS CONSTRUIR',
      image: 'modulares/neblinoso',
    },

    financing: {
      eyebrow: 'Financiación',
      title: 'CONSULTÁ OPCIONES',
      accentLine: 'DE FINANCIACIÓN.',
      copy: 'Consultanos por las alternativas disponibles para el modelo que te interesa. Te pasamos la información vigente.',
      cta: 'CONSULTAR FINANCIACIÓN',
    },

    trustSection: {
      eyebrow: 'Confianza',
      title: 'QUIÉN ESTÁ',
      accentLine: 'DETRÁS DEL PROYECTO.',
      body: 'MORCAT CONSTRUCTORA SRL es una empresa constructora y desarrolladora inmobiliaria de Tierra del Fuego. Nuestra experiencia se construye obra a obra, en el lugar más austral del mundo.',
      corporateLinkLabel: 'CONOCÉ MORCAT',
    },

    faqs: [
      {
        question: '¿Los modelos pueden adaptarse?',
        answer:
          'Sí, los modelos funcionan como punto de partida y se analizan según el terreno y el uso. Consultanos qué alternativas de adaptación están disponibles para cada modelo.',
      },
      {
        question: '¿Necesito tener terreno?',
        answer:
          'Para definir una propuesta concreta necesitamos conocer el terreno. Si todavía no tenés lote, igual podemos orientarte sobre qué conviene buscar.',
      },
      {
        question: '¿Qué incluye la vivienda?',
        answer:
          'Cada vivienda se define según el proyecto: estructura, cerramientos y terminaciones varían por modelo y configuración. Te pasamos el detalle de lo que incluye la propuesta puntual.',
      },
      {
        question: '¿En qué zonas de Tierra del Fuego trabajan?',
        answer:
          'La empresa desarrolla su actividad en Tierra del Fuego. Consultanos por tu ubicación puntual.',
      },
      {
        question: '¿Puedo ver los planos?',
        answer:
          'Los planos de distribución se muestran acá y en la ficha de cada modelo. Los planos definitivos de tu proyecto se entregan en la etapa de proyecto.',
      },
      {
        question: '¿Existen opciones de financiación?',
        answer:
          'Consultá por las opciones de financiación disponibles para el modelo que te interesa; te pasamos la información vigente.',
      },
      {
        question: '¿Cuánto demora la construcción?',
        answer:
          'El plazo depende del modelo, las características del proyecto y las condiciones de implantación. Contactanos para evaluar tu caso.',
      },
      {
        question: '¿Cómo solicito una cotización?',
        answer:
          'Completá el formulario o escribinos por WhatsApp con el modelo que te interesa y el terreno, y te enviamos la información disponible.',
      },
    ],

    form: {
      title: 'CONTANOS',
      accentLine: 'QUÉ ESTÁS BUSCANDO.',
      subtitle:
        'Completá pocos datos y te contactamos con la información disponible para tu proyecto.',
      submitLabel: 'QUIERO RECIBIR INFORMACIÓN',
    },

    finalCta: {
      title: 'EL PRÓXIMO',
      accentLine: 'PROYECTO PUEDE SER EL TUYO.',
      text: 'Contanos qué estás buscando y te ayudamos a encontrar el modelo adecuado para tu proyecto.',
      primaryCta: 'HABLAR POR WHATSAPP',
      secondaryCta: 'ENVIAR CONSULTA',
    },
  },
];

export function getPromoBySlug(slug: string): Promo | undefined {
  return PROMOS.find((p) => p.slug === slug);
}
