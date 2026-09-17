/** MORCAT — Formateo de datos para UI. */

export function formatSurface(m2: number): string {
  return `${m2} m²`;
}

export function formatMeters(m2: number | null): string | null {
  return m2 == null ? null : `${m2} m²`;
}

export function formatAreaRange(min: number, max: number): string {
  return `${min}–${max} m²`;
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}
