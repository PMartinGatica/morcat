/**
 * ============================================================
 *  MORCAT — PROYECTOS / PORTFOLIO
 * ============================================================
 *  Obras terminadas, en ejecución y proyectos futuros.
 *  Se genera dinámicamente /proyectos y /proyectos/[slug].
 *
 *  ⚠️  ESTADO ACTUAL: DATOS DEMO.
 *  - Nombres, ubicaciones y estados son provisorios hasta
 *    recibir el portfolio real de MORCAT.
 *  - `completion` (% avance) y `surface` (m²) pueden ser null.
 *  - gallery usa claves de ilustraciones demo; reemplazar por
 *    rutas reales cuando existan: '/images/projects/<slug>.webp'.
 * ============================================================
 */

export type ProjectStatus = 'Proyecto' | 'En obra' | 'Finalizado';

export interface Project {
  id: string;
  slug: string;
  name: string;
  location: string;
  type: string;
  status: ProjectStatus;
  description: string;
  gallery: string[];
  /** Avance en % (null si no hay dato). */
  completion: number | null;
  /** Superficie en m² (null si no hay dato). */
  surface: number | null;
  featured: boolean;
  demo: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: 'casa-bosque-sur',
    slug: 'casa-bosque-sur',
    name: 'Casa Bosque Sur',
    location: 'Valle de Andorra, Ushuaia',
    type: 'Casa',
    status: 'Proyecto',
    description:
      'Vivienda individual de diseño propio entre árboles de lenga, pensada para integrarse al bosque con una huella mínima. El proyecto se encuentra en etapa de definición y presupuesto.',
    gallery: ['modulares/cabana-andina', 'nordicas/bosque', 'modulares/neblinoso'],
    completion: null,
    surface: null,
    featured: true,
    demo: true,
  },
  {
    id: 'duplex-kuar',
    slug: 'duplex-kuar',
    name: 'Dúplex Kuar',
    location: 'Ushuaia',
    type: 'Dúplex',
    status: 'En obra',
    description:
      'Dúplex de dos unidades en altura, con accesos independientes. Actualmente en ejecución; se publicarán fotos de avance de obra cuando estén disponibles.',
    gallery: ['duplex/terrazas-jardines', 'duplex/semi-rural', 'duplex/linea-940'],
    completion: 40,
    surface: null,
    featured: true,
    demo: true,
  },
  {
    id: 'refugio-del-canal',
    slug: 'refugio-del-canal',
    name: 'Refugio del Canal',
    location: 'Costa del Canal Beagle, Ushuaia',
    type: 'Vivienda modular',
    status: 'Proyecto',
    description:
      'Refugio modular de uso estacional sobre la costa del Canal Beagle. Ejemplo del sistema industrializado aplicado a terrenos de difícil acceso.',
    gallery: ['nordicas/otono', 'nordicas/montanoso', 'modulares/atardecer'],
    completion: null,
    surface: 35,
    featured: false,
    demo: true,
  },
  {
    id: 'estudio-austral',
    slug: 'estudio-austral',
    name: 'Estudio Austral',
    location: 'Zona centro, Ushuaia',
    type: 'Ampliación',
    status: 'Finalizado',
    description:
      'Ampliación de un estudio comercial en zona céntrica: nuevo acceso, mejoras de aislación y refuncionalización del espacio interior.',
    gallery: ['modulares/exterior-02', 'nordicas/paisaje'],
    completion: 100,
    surface: null,
    featured: false,
    demo: true,
  },
  {
    id: 'vivienda-paso-garibaldi',
    slug: 'vivienda-paso-garibaldi',
    name: 'Vivienda Paso Garibaldi',
    location: 'Ruta 3, cercanías de Ushuaia',
    type: 'Casa',
    status: 'Proyecto',
    description:
      'Vivienda familiar en entorno de estepa y montaña. Proyecto a medida con foco en resistencia al viento y eficiencia térmica.',
    gallery: ['nordicas/paisaje', 'duplex/semi-rural'],
    completion: null,
    surface: null,
    featured: false,
    demo: true,
  },
  {
    id: 'nave-industrial',
    slug: 'nave-industrial',
    name: 'Nave Industrial',
    location: 'Parque Industrial, Ushuaia',
    type: 'Construcción',
    status: 'Finalizado',
    description:
      'Construcción de nave liviana para uso industrial en el Parque Industrial de Ushuaia. Obra ejecutada con sistema de estructura metálica.',
    gallery: ['duplex/panoramica', 'modulares/exterior-02'],
    completion: 100,
    surface: null,
    featured: false,
    demo: true,
  },
  {
    id: 'costa-beagle-residencial',
    slug: 'costa-beagle-residencial',
    name: 'Costa Beagle Residencial',
    location: 'Costa del Canal Beagle, Ushuaia',
    type: 'Desarrollo inmobiliario',
    status: 'Proyecto',
    description:
      'Desarrollo de viviendas en conjunto sobre la costa del Canal Beagle. El proyecto se encuentra en etapa de definición: se publicarán los detalles cuando estén confirmados.',
    gallery: ['desarrollo/render-01', 'desarrollo/render-02', 'modulares/neblinoso'],
    completion: null,
    surface: null,
    featured: true,
    demo: true,
  },
  {
    id: 'valle-andino',
    slug: 'valle-andino',
    name: 'Valle Andino',
    location: 'Valle de Andorra, Ushuaia',
    type: 'Desarrollo inmobiliario',
    status: 'Proyecto',
    description:
      'Propuesta de desarrollo residencial en el Valle de Andorra, con foco en viviendas de baja densidad integradas al bosque.',
    gallery: ['desarrollo/volumetria', 'desarrollo/render-03', 'nordicas/montanoso'],
    completion: null,
    surface: null,
    featured: false,
    demo: true,
  },
  {
    id: 'barrio-norte',
    slug: 'barrio-norte',
    name: 'Barrio Norte Residencial',
    location: 'Ushuaia',
    type: 'Desarrollo inmobiliario',
    status: 'Proyecto',
    description:
      'Desarrollo de dúplex y viviendas individuales en la zona norte de Ushuaia. En evaluación de factibilidad.',
    gallery: ['desarrollo/render-03', 'desarrollo/render-02', 'duplex/linea-940'],
    completion: null,
    surface: null,
    featured: false,
    demo: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export const PROJECT_STATUS_ORDER: ProjectStatus[] = ['En obra', 'Proyecto', 'Finalizado'];
