/**
 * MORCAT — Datos estructurados (JSON-LD).
 *
 * Regla: solo schemas semánticamente correctos. No se inventan
 * ratings, reseñas, precios ni fechas. `foundingDate` y otros
 * campos opcionales solo se emiten si existen datos reales.
 */
import { SITE, absoluteUrl } from '../../config/site';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export interface Crumb {
  name: string;
  path: string;
}

/** Organización + GeneralContractor (subclase correcta de LocalBusiness). */
export function organizationSchema() {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'GeneralContractor'],
    '@id': `${SITE.domain}/#organization`,
    name: SITE.legalName,
    legalName: SITE.legalName,
    url: SITE.domain,
    logo: absoluteUrl('/images/logo/logo-morcat-placeholder.svg'),
    image: absoluteUrl('/images/logo/logo-morcat-placeholder.svg'),
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address,
      addressLocality: SITE.city,
      addressRegion: SITE.province,
      addressCountry: 'AR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.latitude,
      longitude: SITE.longitude,
    },
    areaServed: [
      { '@type': 'Place', name: SITE.city },
      { '@type': 'Place', name: SITE.province },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: DAYS,
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: [SITE.instagram, SITE.facebook].filter(Boolean),
  };

  if (SITE.foundingDate) schema.foundingDate = SITE.foundingDate;
  return schema;
}

/** WebSite (sin SearchAction: no hay buscador interno). */
export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.domain}/#website`,
    url: SITE.domain,
    name: SITE.companyName,
    description: 'Constructora y desarrolladora inmobiliaria en Ushuaia, Tierra del Fuego.',
    publisher: { '@id': `${SITE.domain}/#organization` },
    inLanguage: 'es-AR',
  };
}

/** BreadcrumbList para páginas internas. */
export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}
