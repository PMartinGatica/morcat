/**
 * ============================================================
 *  MORCAT — PROYECTOS / PORTFOLIO
 * ============================================================
 *  Solo quedan los dos proyectos puntuales confirmados por el
 *  cliente: 'Línea Homero' y 'Dúplex Austral'. El resto de los
 *  nombres que había antes (Refugio del Canal, Estudio Austral,
 *  Vivienda Paso Garibaldi, Nave Industrial, Desarrollo
 *  Inmobiliario, Valle Andino, Barrio Norte Residencial) eran
 *  inventados y se sacaron — no existen como obras reales.
 *
 *  - `location` queda en 'Tierra del Fuego' (el único dato cierto).
 *  - `status`/`completion` no se muestran en el sitio: no está
 *    confirmado en qué etapa está cada obra.
 *  - `gallery` tiene una sola foto de referencia por proyecto
 *    (no una galería grande): son renders, no fotos de obra
 *    terminada, y no hay que mostrarlos como si fuera un
 *    portfolio extenso.
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
      'Vivienda individual de diseño propio entre árboles de lenga, pensada para integrarse al bosque con una huella mínima.',
    gallery: ['modulares/cabana-andina'],
    completion: null,
    surface: null,
    featured: true,
    demo: false,
  },
  {
    id: 'duplex-austral',
    slug: 'duplex-austral',
    name: 'Dúplex Austral',
    location: 'Tierra del Fuego',
    type: 'Dúplex',
    status: 'En obra',
    description:
      'Dúplex de dos unidades en altura, con accesos independientes.',
    gallery: ['duplex/duplex-austral'],
    completion: 40,
    surface: null,
    featured: true,
    demo: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export const PROJECT_STATUS_ORDER: ProjectStatus[] = ['En obra', 'Proyecto', 'Finalizado'];
