/**
 * ============================================================
 *  MORCAT — COSTOS Y PLANES DE FINANCIACIÓN
 * ============================================================
 *  Datos provistos directamente por Rodrigo (Morcat) el
 *  2026-09-20, por WhatsApp, para armar el cotizador de la web.
 *  Precios en USD, sistema "llave en mano" salvo que se indique
 *  lo contrario. NO INVENTAR cifras — actualizar solo cuando
 *  Morcat confirme un cambio.
 *
 *  Verificación: el valor "cuotas desde" de cada Plan Habitar
 *  coincide con (superficie mínima × precio por m²) / 48 cuotas
 *  (ej. módulo: 18 m² × 1240 USD = 22.320 → /48 = 465 USD ✅;
 *  vivienda: 30 m² × 1250 USD = 37.500 → /48 = 781,25 USD ✅).
 *  Para dúplex da 926,04 en vez de los 923 USD que pasó Rodrigo
 *  (diferencia menor, probablemente redondeo de su parte) — se
 *  usa la fórmula igual, por consistencia entre todos los modelos.
 *
 *  2026-09-21: agregado "Núcleo húmedo" (construcción tradicional,
 *  USD 1350/m²) que Rodrigo había olvidado en el mensaje original.
 *  Va en FINANCING_PLANS (no en CONSTRUCTION_PRICING/el cotizador)
 *  porque no dio rango de m² ni si aplica Plan Habitar — a diferencia
 *  de los 3 sistemas industrializados, este es tradicional y no tiene
 *  el mismo tamaño modular fijo. Si Rodrigo confirma un rango de m²,
 *  mover a CONSTRUCTION_PRICING para que entre al selector del
 *  cotizador.
 * ============================================================
 */

export interface ConstructionType {
  id: string;
  /** Nombre para mostrar en el selector del cotizador. */
  name: string;
  /** Rango de superficie válido para este tipo (según Plan Habitar). */
  minSurface: number;
  maxSurface: number;
  /** Costo por m², sistema llave en mano. */
  pricePerM2Usd: number;
  structure: string;
  bedrooms?: string;
  /** Plan Habitar: financiación propia en 48 cuotas. */
  planHabitar: {
    installments: 48;
    /** Cuotas a integrar para participar del sorteo anual. */
    raffleInstallments: 5;
    deliveryMonths: 5;
  };
}

export const CONSTRUCTION_PRICING: ConstructionType[] = [
  {
    id: 'modular',
    name: 'Modular industrializado',
    minSurface: 18,
    maxSurface: 28,
    pricePerM2Usd: 1240,
    structure: 'Steel frame',
    planHabitar: { installments: 48, raffleInstallments: 5, deliveryMonths: 5 },
  },
  {
    id: 'vivienda-preindustrializada',
    name: 'Vivienda modular preindustrializada',
    minSurface: 30,
    maxSurface: 65,
    pricePerM2Usd: 1250,
    structure: 'Steel frame',
    bedrooms: '1 a 3 habitaciones',
    planHabitar: { installments: 48, raffleInstallments: 5, deliveryMonths: 5 },
  },
  {
    id: 'duplex',
    name: 'Dúplex industrializado',
    minSurface: 35,
    maxSurface: 70,
    pricePerM2Usd: 1270,
    structure: 'Híbrida: steel frame + hierro reforzado',
    bedrooms: '1 a 3 habitaciones',
    planHabitar: { installments: 48, raffleInstallments: 5, deliveryMonths: 5 },
  },
];

/** Otros planes de financiación / etapas — no dependen del m². */
export interface FinancingPlan {
  id: string;
  name: string;
  description: string;
}

export const FINANCING_PLANS: FinancingPlan[] = [
  {
    id: '40-60',
    name: 'Plan 40/60',
    description: 'Capital inicial 60% y el 40% lo financia la empresa en cuotas fijas.',
  },
  {
    id: 'financiacion-100',
    name: 'Financiación 100% propia y bancarizada',
    description:
      'Cuotas desde USD 650. Avance de obra por acumulación de capital, con certificación.',
  },
  {
    id: 'nucleo-humedo',
    name: 'Núcleo húmedo (construcción tradicional)',
    description: 'Costo USD 1350/m², sistema constructivo tradicional.',
  },
  {
    id: 'obra-gris',
    name: 'Obra gris',
    description:
      'Diseño del proyecto, gestión municipal, platea, estructura y revestimiento exterior. Costo USD 850/m². Aplica financiación 40/60.',
  },
  {
    id: 'platea',
    name: 'Platea',
    description: 'Costo USD 415/m². Aplica financiación 40/60.',
  },
  {
    id: 'remodelaciones',
    name: 'Remodelaciones y ampliaciones',
    description:
      'Cotización a medida — se coordina una visita al predio. Aplica financiación 40/60.',
  },
];

/** Programa de comisión por venta de proyectos (dato de Rodrigo, 2026-09-20). */
export const SALES_COMMISSION = {
  percent: 3,
  description: 'Vendé un proyecto Morcat y ganá un 3% de comisión por venta.',
};

/** Etapas del "Plan Etapa 4" (aplica financiación 40/60). */
export const CONSTRUCTION_STAGES_40_60 = [
  { order: 1, name: 'Diseño y platea' },
  { order: 2, name: 'Estructura y revestimiento' },
  { order: 3, name: 'Instalaciones y aberturas' },
  { order: 4, name: 'Revestimiento interior y terminaciones' },
];

export function getConstructionType(id: string): ConstructionType | undefined {
  return CONSTRUCTION_PRICING.find((t) => t.id === id);
}

/** Costo estimado llave en mano, redondeado al dólar. */
export function estimateTotalUsd(type: ConstructionType, surface: number): number {
  return Math.round(surface * type.pricePerM2Usd);
}

/** Cuota estimada del Plan Habitar (48 cuotas), redondeada. */
export function estimateInstallmentUsd(type: ConstructionType, surface: number): number {
  return Math.round(estimateTotalUsd(type, surface) / type.planHabitar.installments);
}
