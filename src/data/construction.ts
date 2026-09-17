/**
 * ============================================================
 *  MORCAT — PROCESO DE CONSTRUCCIÓN Y SISTEMAS CONSTRUCTIVOS
 * ============================================================
 *  Contenido educativo de /construccion y de la HOME.
 *
 *  ⚠️  Las descripciones de sistemas son genéricas y de
 *  conocimiento público; NO afirman capacidades técnicas
 *  específicas de MORCAT. La sección "detalles técnicos"
 *  queda preparada para cargar datos reales después
 *  (aislación, estructura, revestimientos, fundaciones,
 *  eficiencia térmica, materiales).
 * ============================================================
 */

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export const CONSTRUCTION_PROCESS: ProcessStep[] = [
  {
    index: '01',
    title: 'Idea',
    description:
      'Empezamos escuchando: qué querés construir, en qué terreno, para qué uso y con qué presupuesto.',
  },
  {
    index: '02',
    title: 'Diseño',
    description:
      'Traducimos la idea a un programa de necesidades y a una propuesta arquitectónica adaptada al entorno.',
  },
  {
    index: '03',
    title: 'Proyecto',
    description:
      'Definimos planos, sistema constructivo, materiales y alcance para que la obra esté bien planteada antes de empezar.',
  },
  {
    index: '04',
    title: 'Construcción',
    description:
      'Ejecutamos la obra con control de avance y comunicación constante con vos.',
  },
  {
    index: '05',
    title: 'Entrega',
    description:
      'Entregamos la obra terminada, con los detalles revisados y la documentación del proyecto.',
  },
];

export interface ConstructionSystem {
  id: string;
  name: string;
  description: string;
  /** Icono (clave de la librería local de iconos). */
  icon: string;
  /** Imagen real del cliente (clave de src/assets/media). */
  image?: string;
  demo: boolean;
}

export const CONSTRUCTION_SYSTEMS: ConstructionSystem[] = [
  {
    id: 'tradicional',
    name: 'Construcción tradicional',
    description:
      'Obra húmeda ejecutada en el terreno: fundaciones, mampostería o muros, y resolución en obra. Máxima flexibilidad para proyectos a medida.',
    icon: 'brick',
    demo: false,
  },
  {
    id: 'steel-frame',
    name: 'Steel frame',
    description:
      'Estructura de perfiles de acero galvanizado livianos, con paneles y aislación en seco. Construcción más rápida, precisa y limpia.',
    icon: 'frame',
    demo: false,
  },
  {
    id: 'wood-frame',
    name: 'Wood frame',
    description:
      'Estructura de madera entramada, un sistema clásico en la Patagonia, muy eficiente para aislación y buen comportamiento térmico.',
    icon: 'wood',
    demo: false,
  },
  {
    id: 'industrializado',
    name: 'Sistemas industrializados',
    description:
      'Componentes fabricados en taller y montados en terreno: módulos y paneles que reducen tiempos y dependencia del clima.',
    icon: 'module',
    image: 'nordicas/platea-flotante',
    demo: false,
  },
];

/**
 * Multimedia real del cliente para las páginas de construcción.
 * Imágenes: claves de src/assets/media · Videos: public/media/videos.
 */
export const CONSTRUCTION_MEDIA = {
  /** Detalle de platea flotante (sistema industrializado). */
  plateaFlotante: 'nordicas/platea-flotante',
  /** Plano y alzado del dúplex (propuesta del cliente). */
  planoDuplex: 'duplex/plano-alzado',
  /** Video: montaje/construcción de un módulo. */
  videoMontaje: 'construccion-timelapse',
  /** Video: exterior del dúplex. */
  videoDuplex: 'exterior-duplex',
} as const;

/**
 * Detalles técnicos por sistema — PARA CARGAR CUANDO MORCAT
 * provea la información real (aislación, estructura,
 * revestimientos, fundaciones, eficiencia térmica, materiales).
 */
export const SYSTEM_TECHNICAL_PLACEHOLDER: Record<string, string[]> = {
  tradicional: ['Pendiente de carga técnica.'],
  'steel-frame': ['Pendiente de carga técnica.'],
  'wood-frame': ['Pendiente de carga técnica.'],
  industrializado: ['Pendiente de carga técnica.'],
};

/** Líneas de negocio que se muestran en /construccion. */
export interface ConstructionLine {
  title: string;
  description: string;
}

export const CONSTRUCTION_LINES: ConstructionLine[] = [
  {
    title: 'Casas',
    description:
      'Viviendas individuales a medida, desde el diseño inicial hasta la obra terminada.',
  },
  {
    title: 'Dúplex',
    description:
      'Dos unidades en un mismo volumen, ideales para alquilar, compartir o vender.',
  },
  {
    title: 'Ampliaciones',
    description:
      'Sumar metros cuadrados a una vivienda existente: nuevos ambientes, entrepisos o refuncionalización.',
  },
  {
    title: 'Proyectos personalizados',
    description:
      'Diseño y construcción de proyectos únicos, adaptados al terreno, al clima y a tu forma de vivir.',
  },
  {
    title: 'Sistemas industrializados',
    description:
      'Aplicamos componentes modulares y paneles cuando el proyecto se beneficia de la producción en taller.',
  },
  {
    title: 'Construcción tradicional',
    description:
      'Obra ejecutada en terreno con métodos convencionales, cuando el proyecto lo requiere.',
  },
];
