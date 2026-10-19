import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { buildRobotsTxt, buildSitemapXml, localeFromLocation, renderHtmlMetadata, resolveSiteUrl } from './src/seo/site.ts'

function seoPlugin(siteUrl: string): Plugin {
  return {
    name: 'dnnnah-seo',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const rawUrl = ctx.originalUrl ?? '/'
        const queryIndex = rawUrl.indexOf('?')
        const search = queryIndex >= 0 ? rawUrl.slice(queryIndex) : ''
        const pathname = queryIndex >= 0 ? rawUrl.slice(0, queryIndex) : rawUrl
        const locale = localeFromLocation(pathname, search)
        return renderHtmlMetadata(html, locale, siteUrl)
      },
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const target = req as { url?: string }
        const rawUrl = target.url ?? '/'
        const queryIndex = rawUrl.indexOf('?')
        const pathname = queryIndex >= 0 ? rawUrl.slice(0, queryIndex) : rawUrl
        const search = queryIndex >= 0 ? rawUrl.slice(queryIndex) : ''
        if (pathname === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml; charset=utf-8')
          res.end(buildSitemapXml(siteUrl))
          return
        }
        if (pathname === '/robots.txt') {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.end(buildRobotsTxt(siteUrl))
          return
        }
        if (pathname === '/en' || pathname === '/en/' || pathname === '/en/index.html') {
          target.url = `/index.html${search}`
        }
        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        const target = req as { url?: string }
        const rawUrl = target.url ?? '/'
        const queryIndex = rawUrl.indexOf('?')
        const pathname = queryIndex >= 0 ? rawUrl.slice(0, queryIndex) : rawUrl
        const search = queryIndex >= 0 ? rawUrl.slice(queryIndex) : ''
        if ((pathname === '/' || pathname === '/index.html') && localeFromLocation(pathname, search) === 'en') {
          target.url = `/en/index.html${search}`
        }
        next()
      })
    },
    generateBundle: {
      order: 'post',
      handler(_, bundle) {
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemapXml(siteUrl) })
        this.emitFile({ type: 'asset', fileName: 'robots.txt', source: buildRobotsTxt(siteUrl) })
        const indexAsset = bundle['index.html']
        if (indexAsset && indexAsset.type === 'asset' && typeof indexAsset.source === 'string') {
          this.emitFile({
            type: 'asset',
            fileName: 'en/index.html',
            source: renderHtmlMetadata(indexAsset.source, 'en', siteUrl),
          })
        }
      },
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  const siteUrl = resolveSiteUrl(env.VITE_SITE_URL)
  return {
    plugins: [seoPlugin(siteUrl), react(), tailwindcss()],
  }
})
