/**
 * MORCAT — Convención DEMO vs REAL.
 *
 * Todo dato no confirmado debe tener `demo: true` en su fuente.
 * Este módulo centraliza CUÁNDO se muestra el indicador.
 * - En desarrollo (astro dev) siempre se muestra.
 * - En producción depende de FEATURES.showDemoBadges.
 */
import { FEATURES } from '../../config/features';

export function isDemoVisible(): boolean {
  return import.meta.env.DEV || FEATURES.showDemoBadges;
}

export const DEMO_NOTE =
  'Contenido de demostración — pendiente de confirmación por MORCAT.';

export const DEMO_LABEL = 'DEMO CONTENT';
