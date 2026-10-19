import { messages, resolveLocale, type Locale } from '../i18n/messages.ts'
import type { Project } from '../components/projects/content.ts'

export const DEFAULT_SITE_URL = 'https://dnnnah.dev'

export function resolveSiteUrl(raw?: string): string {
  const trimmed = raw?.trim().replace(/\/+$/, '')
  return trimmed && /^https?:\/\/[^/\s]+$/i.test(trimmed) ? trimmed : DEFAULT_SITE_URL
}

export function localeFromSearch(search: string): Locale {
  return resolveLocale(new URLSearchParams(search).get('lang') ?? undefined)
}

export function localeFromLocation(pathname: string, search: string): Locale {
  const param = new URLSearchParams(search).get('lang')
  if (param !== null) return resolveLocale(param)
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es'
}

export function buildLanguageUrl(siteUrl: string, locale: Locale): string {
  const base = resolveSiteUrl(siteUrl)
  return locale === 'en' ? `${base}/?lang=en` : `${base}/`
}

export function buildSeoMetadata(locale: Locale, rawSiteUrl?: string, project?: Project) {
  const siteUrl = resolveSiteUrl(rawSiteUrl)
  const t = messages[locale]
  const title = project ? `${project.name} — DNNNAH` : `${t.title} | DNNNAH`
  const description = project ? project.summary[locale] : t.description
  const esUrl = buildLanguageUrl(siteUrl, 'es')
  const enUrl = buildLanguageUrl(siteUrl, 'en')
  const canonical = locale === 'en' ? enUrl : esUrl
  const ogLocale = locale === 'es' ? 'es_MX' : 'en_US'
  const ogAlternateLocale = locale === 'es' ? 'en_US' : 'es_MX'
  const imageUrl = `${siteUrl}/og-image.png`
  return { siteUrl, title, description, esUrl, enUrl, canonical, ogLocale, ogAlternateLocale, imageUrl }
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

export function renderHtmlMetadata(html: string, locale: Locale, rawSiteUrl?: string): string {
  const meta = buildSeoMetadata(locale, rawSiteUrl)
  return html
    .replace(/<html lang="[^"]*">/, `<html lang="${locale}">`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeAttr(meta.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${escapeAttr(meta.canonical)}" />`)
    .replace(/<link rel="alternate" hreflang="es" href="[^"]*" \/>/, `<link rel="alternate" hreflang="es" href="${escapeAttr(meta.esUrl)}" />`)
    .replace(/<link rel="alternate" hreflang="en" href="[^"]*" \/>/, `<link rel="alternate" hreflang="en" href="${escapeAttr(meta.enUrl)}" />`)
    .replace(/<link rel="alternate" hreflang="x-default" href="[^"]*" \/>/, `<link rel="alternate" hreflang="x-default" href="${escapeAttr(meta.esUrl)}" />`)
    .replace(/<meta property="og:locale" content="[^"]*" \/>/, `<meta property="og:locale" content="${meta.ogLocale}" />`)
    .replace(/<meta property="og:locale:alternate" content="[^"]*" \/>/, `<meta property="og:locale:alternate" content="${meta.ogAlternateLocale}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${escapeAttr(meta.canonical)}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeAttr(meta.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeAttr(meta.description)}" />`)
    .replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${escapeAttr(meta.imageUrl)}" />`)
    .replace(/<meta property="og:image:alt" content="[^"]*" \/>/, `<meta property="og:image:alt" content="${escapeAttr(meta.title)}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`)
    .replace(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${escapeAttr(meta.imageUrl)}" />`)
    .replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`)
}

export function buildSitemapXml(rawSiteUrl?: string): string {
  const siteUrl = resolveSiteUrl(rawSiteUrl)
  const esUrl = buildLanguageUrl(siteUrl, 'es')
  const enUrl = buildLanguageUrl(siteUrl, 'en')
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    '  <url>',
    `    <loc>${esUrl}</loc>`,
    `    <xhtml:link rel="alternate" hreflang="es" href="${esUrl}" />`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${esUrl}" />`,
    '    <changefreq>monthly</changefreq>',
    '    <priority>1.0</priority>',
    '  </url>',
    '  <url>',
    `    <loc>${enUrl}</loc>`,
    `    <xhtml:link rel="alternate" hreflang="es" href="${esUrl}" />`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${esUrl}" />`,
    '    <changefreq>monthly</changefreq>',
    '    <priority>0.9</priority>',
    '  </url>',
    '</urlset>',
    '',
  ].join('\n')
}

export function buildRobotsTxt(rawSiteUrl?: string): string {
  const siteUrl = resolveSiteUrl(rawSiteUrl)
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
}
