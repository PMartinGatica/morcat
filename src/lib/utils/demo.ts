/**
 * MORCAT — Convención DEMO vs REAL.
 *
 * Todo dato no confirmado debe tener `demo: true` en su fuente.
 * Este módulo centraliza CUÁNDO se muestra el indicador.
 * Depende solo de FEATURES.showDemoBadges (igual en dev y producción).
 */
import { FEATURES } from '../../config/features';

export function isDemoVisible(): boolean {
  return FEATURES.showDemoBadges;
}

export const DEMO_NOTE =
  'Contenido de demostración — pendiente de confirmación por MORCAT.';

export const DEMO_LABEL = 'DEMO CONTENT';
