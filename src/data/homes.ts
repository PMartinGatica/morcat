/**
 * ============================================================
 *  MORCAT — MODELOS DE VIVIENDAS MODULARES
 * ============================================================
 *  Datos estructurados de cada modelo. La página
 *  /viviendas-modulares y /viviendas-modulares/[slug] se
 *  generan dinámicamente desde esta lista.
 *
 *  ⚠️  ESTADO ACTUAL: DATOS DEMO + IMÁGENES REALES DEL CLIENTE.
 *  - Las imágenes son renders provistos por MORCAT (procesados a
 *    src/assets/media). Reemplazar por fotos de obra cuando existan.
 *  - Los nombres, superficies y características siguen siendo
 *    referencias provisorias hasta recibir el catálogo definitivo.
 *  - No hay precios. `demo: true` activa el indicador DEMO.
 *  - Los planos reales disponibles son 21 m² (monoambiente) y 35 m²;
 *    el resto usa planos esquemáticos de referencia.
 * ============================================================
 */

export type HomeStatus = 'disponible' | 'nuevo' | 'consultar' | 'desarrollo';

export interface HomeModel {
  id: string;
  slug: string;
  name: string;
  /** Línea / serie comercial del modelo. */
  line: string;
  /** Superficie cubierta aproximada, en m². */
  surface: number;
  bedrooms: number;
  bathrooms: number;
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

export const HOMES: HomeModel[] = [
  {
    id: 'homero-a00',
    slug: 'homero-a00',
    name: 'HOMERO A00',
    line: 'Serie Austral',
    surface: 18,
    bedrooms: 1,
    bathrooms: 1,
    description:
      'Modelo compacto pensado para terrenos chicos, refugios de fin de semana o primera vivienda. Un solo ambiente integrado con baño completo, optimizado para reducir la superficie a construir sin resignar confort.',
    shortDescription:
      'Vivienda modular compacta de 18 m²: un ambiente integrado y baño completo.',
    coverImage: 'modulares/neblinoso',
    gallery: ['modulares/neblinoso', 'modulares/exterior-02', 'modulares/atardecer', 'modulares/bosque-01'],
    floorPlans: ['plan-18'],
    features: [
      'Estructura industrializada',
      'Baño completo integrado',
      'Producción en fábrica, montaje en terreno',
      'Diseño pensado para el clima del sur',
    ],
    status: 'consultar',
    featured: false,
    demo: true,
  },
  {
    id: 'homero-a01',
    slug: 'homero-a01',
    name: 'HOMERO A01',
    line: 'Serie Austral',
    surface: 21,
    bedrooms: 1,
    bathrooms: 1,
    description:
      'El modelo de referencia de MORCAT para viviendas individuales. Un dormitorio, baño y espacio de estar integrado, con la posibilidad de adaptar la distribución según el terreno y el uso que le quieras dar.',
    shortDescription:
      'Vivienda modular de 21 m² con dormitorio, baño y espacio integrado.',
    coverImage: 'modulares/bosque-01',
    gallery: ['modulares/bosque-01', 'modulares/cabana-andina', 'modulares/exterior-02', 'modulares/atardecer'],
    floorPlans: ['modulares/plano-21'],
    features: [
      '1 dormitorio + baño completo',
      'Espacio de estar integrado',
      'Estructura industrializada',
      'Adaptable al terreno',
      'Producción en fábrica, montaje en terreno',
    ],
    status: 'disponible',
    featured: true,
    demo: true,
  },
  {
    id: 'austral-a00',
    slug: 'austral-a00',
    name: 'AUSTRAL A00',
    line: 'Serie Austral',
    surface: 25,
    bedrooms: 2,
    bathrooms: 1,
    description:
      'Modelo versátil de 25 m² diseñado para adaptarse a diferentes necesidades. Dos dormitorios, baño y espacios que se pueden personalizar según el terreno y el uso. Una solución moderna y eficiente.',
    shortDescription:
      'Vivienda modular de 25 m² con dos dormitorios y baño completo.',
    coverImage: 'modulares/austral-a00',
    gallery: ['modulares/austral-a00', 'modulares/atardecer', 'modulares/exterior-02', 'modulares/neblinoso'],
    floorPlans: ['plan-25'],
    features: [
      '2 dormitorios + baño completo',
      'Diseño moderno y eficiente',
      'Estructura industrializada',
      'Adaptable al terreno',
      'Producción en fábrica, montaje en terreno',
    ],
    status: 'disponible',
    featured: true,
    demo: true,
  },
  {
    id: 'nexa-austral-a00',
    slug: 'nexa-austral-a00',
    name: 'NEXA AUSTRAL A00',
    line: 'Serie Austral',
    surface: 35,
    bedrooms: 2,
    bathrooms: 1,
    description:
      'Un paso más de superficie para vivir con mayor amplitud: dos dormitorios, baño y una cocina-comedor generosa. Pensado como vivienda principal en lote propio.',
    shortDescription:
      'Vivienda modular de 35 m² con dos dormitorios, baño y cocina-comedor amplia.',
    coverImage: 'modulares/nexa-austral-a00',
    gallery: ['modulares/nexa-austral-a00', 'nordicas/montanoso', 'nordicas/paisaje', 'nordicas/otono'],
    floorPlans: ['nordicas/plano-35'],
    features: [
      '2 dormitorios + baño',
      'Cocina-comedor amplia',
      'Estructura industrializada',
      'Pensada como vivienda principal',
      'Producción en fábrica, montaje en terreno',
    ],
    status: 'consultar',
    featured: true,
    demo: true,
  },
  {
    id: 'beagle-d01',
    slug: 'beagle-d01',
    name: 'BEAGLE D01',
    line: 'Serie Beagle',
    surface: 45,
    bedrooms: 3,
    bathrooms: 2,
    description:
      'El modelo más amplio del catálogo demo: tres dormitorios y dos baños para familias que necesitan espacio real. Permite sumar módulos o personalizar la distribución completa.',
    shortDescription:
      'Vivienda modular de 45 m² con tres dormitorios y dos baños.',
    coverImage: 'nordicas/bosque-08',
    gallery: ['nordicas/bosque-08', 'nordicas/bosque', 'nordicas/montanoso', 'nordicas/paisaje'],
    floorPlans: ['plan-45'],
    features: [
      '3 dormitorios + 2 baños',
      'Máxima superficie del catálogo',
      'Estructura industrializada',
      'Posibilidad de ampliación por módulos',
      'Producción en fábrica, montaje en terreno',
    ],
    status: 'desarrollo',
    featured: false,
    demo: true,
  },
];

/** Resuelve un modelo por slug. */
export function getHomeBySlug(slug: string): HomeModel | undefined {
  return HOMES.find((h) => h.slug === slug);
}

/** Rangos usados por el filtro del catálogo. */
export type SurfaceRange = 'all' | 'small' | 'medium' | 'large';

export const SURFACE_RANGES: { id: SurfaceRange; label: string; test: (s: number) => boolean }[] = [
  { id: 'all', label: 'Todos', test: () => true },
  { id: 'small', label: 'Hasta 25 m²', test: (s) => s <= 25 },
  { id: 'medium', label: '25–40 m²', test: (s) => s > 25 && s <= 40 },
  { id: 'large', label: 'Más de 40 m²', test: (s) => s > 40 },
];

export const HOME_STATUS_LABEL: Record<HomeStatus, string> = {
  disponible: 'Disponible',
  nuevo: 'Nuevo',
  consultar: 'A consultar',
  desarrollo: 'En desarrollo',
};
