/**
 * ============================================================
 *  MORCAT — MODELOS DE VIVIENDAS MODULARES
 * ============================================================
 *  Cada modelo es una familia (Homero, Nexa Austral…) con sus
 *  opciones de superficie. La página /viviendas-modulares y
 *  /viviendas-modulares/[slug] se generan desde esta lista.
 *
 *  Fotos: carpetas del Drive de MORCAT (src/assets/media/modelos/<slug>/).
 *  Superficies, dormitorios y baños: planilla de MORCAT (pestaña
 *  Modelos, 2026-10-21). Un dato sin definir se muestra como "Consultar".
 *  No hay precios ni planos (los planos quedaron desactualizados y
 *  se sacaron hasta tener versión final).
 * ============================================================
 */

export type HomeStatus = 'disponible' | 'nuevo' | 'consultar' | 'desarrollo';

/** Una opción de superficie dentro de un modelo. */
export interface HomeVariant {
  /** Código de la planilla de MORCAT (A00, A01, B00…). */
  code?: string;
  /** Superficie cubierta aproximada, en m². */
  surface: number;
  /** 0 = monoambiente. Sin definir = a confirmar. */
  bedrooms?: number;
  /** Sin definir = a confirmar. */
  bathrooms?: number;
  /** Foto de referencia de esa medida. */
  image?: string;
  /** Fotos adicionales de esa medida (se muestran en carrusel junto a `image`). */
  images?: string[];
}

export interface HomeModel {
  id: string;
  slug: string;
  name: string;
  /** Línea / serie comercial del modelo. */
  line: string;
  /** Opciones de superficie (vacío = a confirmar). */
  variants: HomeVariant[];
  description: string;
  shortDescription: string;
  /** Clave de ilustración (demo) o ruta '/images/...' (foto real). */
  coverImage: string;
  gallery: string[];
  floorPlans: string[];
  features: string[];
  status: HomeStatus;
  featured: boolean;
  demo: boolean;
}

/** Claves de fotos de un modelo dentro de src/assets/media/modelos/<slug>/. */
const photos = (slug: string, names: string[]): string[] => names.map((n) => `modelos/${slug}/${n}`);

const BASE_FEATURES = [
  'Estructura industrializada',
  'Producción en fábrica, montaje en terreno',
  'Diseño pensado para el clima del sur',
];

export const HOMES: HomeModel[] = [
  {
    id: 'homero',
    slug: 'homero',
    name: 'Homero',
    line: 'Modular compacto',
    variants: [
      { code: 'A00', surface: 18, bedrooms: 0, bathrooms: 1, image: 'modelos/homero/homero-18' },
      { code: 'A01', surface: 21, bedrooms: 0, bathrooms: 1, image: 'modelos/homero/homero-21' },
      { code: 'A01B', surface: 24.5, bedrooms: 1, bathrooms: 1, image: 'modelos/homero/homero-25' },
      {
        code: 'A02',
        surface: 28,
        bedrooms: 1,
        bathrooms: 1,
        image: 'modelos/homero/homero-28-noche',
        images: ['modelos/homero/homero-28-noche', 'modelos/homero/homero-28-planta'],
      },
    ],
    description:
      'La línea modular compacta de MORCAT. Pensada para terrenos chicos, refugios de fin de semana, primera vivienda o alquiler. Todas las medidas comparten el mismo sistema industrializado: elegís el tamaño según tu terreno y el uso que le quieras dar.',
    shortDescription: 'Línea modular compacta, disponible en varias medidas.',
    coverImage: 'modelos/homero/homero-28-noche',
    gallery: photos('homero', [
      'homero-28-noche',
      'homero-18',
      'homero-18-piedra',
      'homero-21',
      'homero-21-bosque',
      'homero-21-negra',
      'homero-25',
      'homero-25-blanca',
      'homero-28-piedra',
      'homero-28-conjunto',
      'homero-30',
      'homero-28-interior',
      'homero-28-interior-02',
    ]),
    floorPlans: [],
    features: [...BASE_FEATURES, 'Varias medidas con el mismo sistema', 'Ideal para terrenos chicos'],
    status: 'consultar',
    featured: true,
    demo: false,
  },
  {
    id: 'nexa-austral',
    slug: 'nexa-austral',
    name: 'Nexa Austral',
    line: 'Línea Austral',
    variants: [
      { code: 'A00', surface: 30, bedrooms: 1, bathrooms: 1 },
      { code: 'A01', surface: 35, bedrooms: 1, bathrooms: 1 },
      { code: 'A02', surface: 49, bedrooms: 2, bathrooms: 1 },
      { code: 'A03', surface: 60, bedrooms: 3, bathrooms: 1 },
    ],
    description:
      'Vivienda modular de líneas simples con alero y deck de madera, disponible en distintas terminaciones: negra, blanca o roja. Pensada como vivienda principal, con opciones de superficie según lo que necesites.',
    shortDescription: 'Vivienda modular con deck y terminaciones a elección.',
    coverImage: 'modelos/nexa-austral/nexa-negra',
    gallery: photos('nexa-austral', [
      'nexa-negra',
      'nexa-blanca',
      'nexa-negra-02',
      'nexa-roja',
      'nexa-montana',
      'nexa-deck',
      'nexa-atardecer',
      'nexa-interior',
      'nexa-interior-02',
      'nexa-corte',
    ]),
    floorPlans: [],
    features: [...BASE_FEATURES, 'Terminaciones a elección', 'Pensada como vivienda principal'],
    status: 'consultar',
    featured: true,
    demo: false,
  },
  {
    id: 'nordica-austral',
    slug: 'nordica-austral',
    name: 'Nórdica Austral',
    line: 'Línea Austral',
    variants: [
      { code: 'A00', surface: 30, bedrooms: 1, bathrooms: 1 },
      { code: 'A01', surface: 35, bedrooms: 1, bathrooms: 1 },
      { code: 'A02', surface: 49, bedrooms: 2, bathrooms: 1 },
      { code: 'A03', surface: 60, bedrooms: 3, bathrooms: 1 },
    ],
    description:
      'Diseño de inspiración nórdica con grandes ventanales para aprovechar la luz y el paisaje del sur. La línea crece en superficie manteniendo el mismo diseño.',
    shortDescription: 'Inspiración nórdica, grandes ventanales y mucha luz.',
    coverImage: 'modelos/nordica-austral/nordica-alpina',
    gallery: photos('nordica-austral', [
      'nordica-alpina',
      'nordica-atardecer',
      'nordica-montana',
      'nordica-nieve',
      'nordica-fogon',
      'nordica-bosque',
      'nordica-noche',
      'nordica-blanca',
      'nordica-patagonia',
      'nordica-madera',
    ]),
    floorPlans: [],
    features: [...BASE_FEATURES, 'Grandes ventanales', 'Crece en superficie sin cambiar el diseño'],
    status: 'consultar',
    featured: false,
    demo: false,
  },
  {
    id: 'duplex-austral',
    slug: 'duplex-austral',
    name: 'Dúplex Austral',
    line: 'Dúplex industrializado',
    variants: [
      { code: 'A01', surface: 53, bedrooms: 2, bathrooms: 1 },
      { code: 'A02', surface: 57.7, bedrooms: 2, bathrooms: 1 },
      { code: 'A03', surface: 67, bedrooms: 2, bathrooms: 2 },
      { code: 'A04', surface: 76, bedrooms: 3, bathrooms: 2 },
    ],
    description:
      'Vivienda en dos plantas con sistema industrializado: más superficie en el mismo lote. Ideal para familias o para quienes quieren separar las áreas sociales de los dormitorios.',
    shortDescription: 'Dúplex industrializado en dos plantas.',
    coverImage: 'modelos/duplex-austral/duplex-austral-montana',
    gallery: photos('duplex-austral', [
      'duplex-austral-montana',
      'duplex-austral-blanca',
      'duplex-austral-escalera',
      'duplex-austral-nieve',
      'duplex-austral-madera',
      'duplex-austral-madera-02',
      'duplex-austral-invernadero',
      'duplex-austral-bosque',
      'duplex-austral-barrio',
      'duplex-austral-invierno',
      'duplex-austral-corte',
    ]),
    floorPlans: [],
    features: [...BASE_FEATURES, 'Dos plantas', 'Más superficie en el mismo lote'],
    status: 'consultar',
    featured: true,
    demo: false,
  },
  {
    id: 'duplex-beagle',
    slug: 'duplex-beagle',
    name: 'Dúplex Beagle',
    line: 'Dúplex industrializado',
    variants: [
      { code: 'A00', surface: 66, bedrooms: 2, bathrooms: 1 },
      { code: 'A01', surface: 80, bedrooms: 3, bathrooms: 2 },
    ],
    description:
      'Dúplex industrializado de líneas contemporáneas, con volúmenes en chapa negra y madera. Pensado para familias que necesitan más dormitorios sin ocupar todo el lote.',
    shortDescription: 'Dúplex contemporáneo en chapa negra y madera.',
    coverImage: 'modelos/duplex-beagle/beagle-negra',
    gallery: photos('duplex-beagle', [
      'beagle-negra',
      'beagle-amplia',
      'beagle-madera',
      'beagle-cubo',
      'beagle-jardin',
      'beagle-blanca',
      'beagle-balcon',
      'beagle-vidriada',
      'beagle-bosque',
      'beagle-interior',
      'beagle-corte',
      'beagle-corte-02',
    ]),
    floorPlans: [],
    features: [...BASE_FEATURES, 'Dos plantas', 'Hasta 3 dormitorios'],
    status: 'consultar',
    featured: false,
    demo: false,
  },
  {
    id: 'american-small-family',
    slug: 'american-small-family',
    name: 'American Small Family',
    line: 'Modular',
    variants: [
      { code: 'B00', surface: 35, bedrooms: 1, bathrooms: 1 },
      { code: 'B01', surface: 49, bedrooms: 2, bathrooms: 1 },
      { code: 'B02', surface: 65, bedrooms: 3, bathrooms: 1 },
    ],
    description:
      'Vivienda modular de estilo americano pensada para familias chicas, con techo a dos aguas y estructura industrializada.',
    shortDescription: 'Vivienda modular para familias chicas.',
    coverImage: 'modelos/american-small-family/american-negra',
    gallery: photos('american-small-family', [
      'american-negra',
      'american-blanca',
      'american-pilotes',
      'american-estructura',
    ]),
    floorPlans: [],
    features: [...BASE_FEATURES, 'Techo a dos aguas'],
    status: 'consultar',
    featured: false,
    demo: false,
  },
  {
    id: 'cabana-del-bosque',
    slug: 'cabana-del-bosque',
    name: 'Cabaña del Bosque',
    line: 'Modular',
    variants: [{ surface: 30, bedrooms: 1, bathrooms: 1 }],
    description:
      'Cabañas modulares pensadas para el bosque: desde volúmenes simples con deck hasta diseños a dos aguas. Una opción para refugio, turismo o complejos de cabañas.',
    shortDescription: 'Cabañas modulares para el bosque y el turismo.',
    coverImage: 'modelos/cabana-del-bosque/cabana-bosque',
    gallery: photos('cabana-del-bosque', [
      'cabana-bosque',
      'cabana-deck',
      'cabana-a-nieve',
      'cabana-a-montana',
      'cabana-conjunto',
      'cabana-gemelas',
      'cabana-pareja',
      'cabana-roja',
    ]),
    floorPlans: [],
    features: [...BASE_FEATURES, 'Ideal para refugio o turismo'],
    status: 'consultar',
    featured: false,
    demo: false,
  },
  {
    id: 'modulo-scandinavian',
    slug: 'modulo-scandinavian',
    name: 'Módulo Scandinavian',
    line: 'Modular',
    variants: [{ surface: 31, bedrooms: 1, bathrooms: 1 }],
    description:
      'Módulo de estilo escandinavo que combina chapa negra con revestimiento claro. Líneas simples y volumen compacto.',
    shortDescription: 'Módulo de estilo escandinavo.',
    coverImage: 'modelos/modulo-scandinavian/scandinavian',
    gallery: photos('modulo-scandinavian', ['scandinavian']),
    floorPlans: [],
    features: [...BASE_FEATURES],
    status: 'consultar',
    featured: false,
    demo: false,
  },
  {
    id: 'modulo-yamanas',
    slug: 'modulo-yamanas',
    name: 'Módulo Yámanas',
    line: 'Modular',
    variants: [{ surface: 28, bedrooms: 1, bathrooms: 1 }],
    description:
      'Módulo de líneas simples con galería de madera, pensado para vivienda o refugio.',
    shortDescription: 'Módulo con galería de madera.',
    coverImage: 'modelos/modulo-yamanas/yamanas-negra',
    gallery: photos('modulo-yamanas', ['yamanas-negra', 'yamanas-deck', 'yamanas-nieve']),
    floorPlans: [],
    features: [...BASE_FEATURES, 'Galería de madera'],
    status: 'consultar',
    featured: false,
    demo: false,
  },
  {
    id: 'modulo-kuar',
    slug: 'modulo-kuar',
    name: 'Módulo Kuar',
    line: 'Modular',
    variants: [{ surface: 32, bedrooms: 2, bathrooms: 1 }],
    description:
      'Módulo con techo a dos aguas, grandes aberturas y deck de madera. Dos dormitorios, baño, estar comedor y cocina integrados.',
    shortDescription: 'Módulo de 2 dormitorios con deck.',
    coverImage: 'modelos/modulo-kuar/kuar-exterior',
    gallery: photos('modulo-kuar', ['kuar-exterior', 'kuar-plano']),
    floorPlans: [],
    features: [...BASE_FEATURES, 'Grandes aberturas'],
    status: 'consultar',
    featured: false,
    demo: false,
  },
];

/** Resuelve un modelo por slug. */
export function getHomeBySlug(slug: string): HomeModel | undefined {
  return HOMES.find((h) => h.slug === slug);
}

/** Superficie con coma decimal: 86.3 → "86,3 m²". */
export function surfaceLabel(m2: number): string {
  return `${m2.toLocaleString('es-AR')} m²`;
}

/** Rango de superficies del modelo ("18 a 28 m²"), o "Consultar". */
export function surfacesLabel(model: Pick<HomeModel, 'variants'>): string {
  const surfaces = model.variants.map((v) => v.surface).sort((a, b) => a - b);
  if (surfaces.length === 0) return 'Consultar';
  const min = surfaces[0];
  const max = surfaces[surfaces.length - 1];
  return min === max ? surfaceLabel(min) : `${min.toLocaleString('es-AR')} a ${surfaceLabel(max)}`;
}

/** Dormitorios para mostrar: 0 = monoambiente, sin dato = consultar. */
export function bedroomsLabel(variant: Pick<HomeVariant, 'bedrooms'>): string {
  if (variant.bedrooms === undefined) return 'Consultar';
  if (variant.bedrooms === 0) return 'Monoambiente';
  return `${variant.bedrooms} dormitorio${variant.bedrooms > 1 ? 's' : ''}`;
}

/** Baños para mostrar, sin dato = consultar. */
export function bathroomsLabel(variant: Pick<HomeVariant, 'bathrooms'>): string {
  if (variant.bathrooms === undefined) return 'Consultar';
  return `${variant.bathrooms} baño${variant.bathrooms > 1 ? 's' : ''}`;
}

export const HOME_STATUS_LABEL: Record<HomeStatus, string> = {
  disponible: 'Disponible',
  nuevo: 'Nuevo',
  consultar: 'A consultar',
  desarrollo: 'En desarrollo',
};
