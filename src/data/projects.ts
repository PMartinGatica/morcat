/**
 * ============================================================
 *  MORCAT — PROYECTOS / PORTFOLIO
 * ============================================================
 *  Obras terminadas, en ejecución y proyectos futuros.
 *  Se genera dinámicamente /proyectos y /proyectos/[slug].
 *
 *  ⚠️  ESTADO ACTUAL: DATOS DEMO — NO CONFIRMADOS POR MORCAT.
 *  - `location` se dejó en 'Tierra del Fuego' (el único dato cierto)
 *    porque las localidades específicas que había antes (Valle de
 *    Andorra, Costa del Canal Beagle, Parque Industrial, etc.) eran
 *    inventadas. No reemplazar por otra localidad específica sin
 *    confirmarla con Rodrigo.
 *  - `status` (Proyecto/En obra/Finalizado) y `completion` (% avance)
 *    NO se muestran en el sitio (ver proyectos/index.astro y
 *    proyectos/[slug].astro) porque no sabemos cuál es el estado real
 *    de cada obra. El campo queda en el dato por si se confirma más
 *    adelante, pero no se renderiza.
 *  - Todos los nombres son provisorios excepto 'Línea Homero' y
 *    'Dúplex Austral' (indicados explícitamente por el cliente). El
 *    resto (Refugio del Canal, Estudio Austral, Vivienda Paso
 *    Garibaldi, Nave Industrial, Desarrollo Inmobiliario, Valle
 *    Andino, Barrio Norte Residencial) son nombres de relleno.
 *  - `surface` (m²) pueden ser null; los valores no-null tampoco están
 *    confirmados.
 *  - gallery usa fotos/renders que NO están confirmados como
 *    correspondientes a cada proyecto real.
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
    id: 'linea-homero',
    slug: 'linea-homero',
    name: 'Línea Homero',
    location: 'Tierra del Fuego',
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
    id: 'duplex-austral',
    slug: 'duplex-austral',
    name: 'Dúplex Austral',
    location: 'Tierra del Fuego',
    type: 'Dúplex',
    status: 'En obra',
    description:
      'Dúplex de dos unidades en altura, con accesos independientes. Actualmente en ejecución; se publicarán fotos de avance de obra cuando estén disponibles.',
    gallery: ['duplex/duplex-austral', 'duplex/hero-vela', 'duplex/atardecer-madera', 'duplex/linea-modelos', 'duplex/terrazas-jardines', 'duplex/semi-rural', 'duplex/linea-940'],
    completion: 40,
    surface: null,
    featured: true,
    demo: true,
  },
  {
    id: 'refugio-del-canal',
    slug: 'refugio-del-canal',
    name: 'Refugio del Canal',
    location: 'Tierra del Fuego',
    type: 'Vivienda modular',
    status: 'Proyecto',
    description:
      'Refugio modular de uso estacional, pensado para terrenos de difícil acceso. Ejemplo del sistema industrializado aplicado a este tipo de proyectos.',
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
    location: 'Tierra del Fuego',
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
    location: 'Tierra del Fuego',
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
    location: 'Tierra del Fuego',
    type: 'Construcción',
    status: 'Finalizado',
    description:
      'Construcción de nave liviana para uso industrial. Obra ejecutada con sistema de estructura metálica.',
    gallery: ['duplex/panoramica', 'modulares/exterior-02'],
    completion: 100,
    surface: null,
    featured: false,
    demo: true,
  },
  {
    id: 'desarrollo-inmobiliario',
    slug: 'desarrollo-inmobiliario',
    name: 'Desarrollo Inmobiliario',
    location: 'Tierra del Fuego',
    type: 'Desarrollo inmobiliario',
    status: 'Proyecto',
    description:
      'Desarrollo de viviendas en conjunto. El proyecto se encuentra en etapa de definición: se publicarán los detalles cuando estén confirmados.',
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
    location: 'Tierra del Fuego',
    type: 'Desarrollo inmobiliario',
    status: 'Proyecto',
    description:
      'Propuesta de desarrollo residencial con foco en viviendas de baja densidad integradas al bosque.',
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
    location: 'Tierra del Fuego',
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
