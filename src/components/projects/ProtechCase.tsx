import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { MockFrame } from 'react-mockframe'
import 'react-mockframe/styles/mockframe-iphones.css'
import type { Locale } from '../../i18n/messages'
import sellerCatalogGrid from '../../../capturas-funcionalidades/protech/catalogo-mobile.webp'
import sellerOrderSearch from '../../../capturas-funcionalidades/protech/pedido-monster-mobile.webp'
import { projects } from './content'
import './protech-case.css'

type FlowStep = { title: string; detail: string }

const copy = {
  es: {
    back: 'Volver a proyectos',
    filebar: 'projects/protech.md',
    paidWork: 'Freelance · remunerado',
    inUse: 'En uso · aproximadamente 4 meses al documentar este caso',
    heroTitle: 'De archivos dispersos a un catálogo para ventas.',
    heroLead: 'Protech es una PWA para consultar flyers de audio y accesorios automotrices, ver información comercial y preparar solicitudes de pedido. Empezó como catálogo digital y creció a partir del trabajo diario de vendedores y clientes mayoristas.',
    roleLabel: 'Mi papel',
    roleValue: 'Desarrollo individual con agentes de IA; decisiones, integración y validación a mi cargo.',
    stackLabel: 'Tecnologías',
    problemTitle: 'Encontrar un producto requería buscar en varios lugares.',
    problemBody: 'Los flyers estaban repartidos en miles de carpetas de Google Drive. Las listas de precios vivían aparte y algunos flyers o precios aparecían en conversaciones de WhatsApp. En una visita o por teléfono, el vendedor repetía la búsqueda entre esas fuentes antes de poder mostrar opciones y preparar el pedido.',
    sourceLabels: ['Google Drive', 'Listas de precios', 'WhatsApp'],
    sourceCaption: 'La información comercial no estaba reunida en una sola consulta.',
    originTitle: 'El MVP empezó con el catálogo.',
    originBody: 'Recibí la lista de precios y enlaces a carpetas de imágenes. Junto con un vendedor definí las necesidades y convertimos primero el flujo de consulta en un boceto funcional. Después el alcance sumó precios, existencias y preparación de pedidos.',
    sketchTime: '≈ 2 semanas',
    sketchLabel: 'Boceto funcional',
    mvpTime: '≈ 1 mes',
    mvpLabel: 'MVP con precios',
    timelineNote: 'Los tiempos son aproximados e incluyen ajustes de diseño, normalización de datos y cambios solicitados durante el desarrollo.',
    accessTitle: 'Una misma fuente, distintos accesos.',
    accessIntro: 'La experiencia cambia según quién consulta, sin perder el catálogo compartido.',
    publicLabel: 'Visita pública',
    publicBody: 'Búsqueda global, filtros por marca, medida, tipo de producto, Top 300 y promociones; flyers para compartir o descargar.',
    customerLabel: 'Cliente registrado',
    customerBody: 'Precios y promociones por categoría mayorista, referencias retail y online, y unidades por caja. La categoría se asigna según su relación con el vendedor y puede ajustarse al cotizar, incluso para clientes no registrados.',
    sellerLabel: 'Vendedor',
    sellerBody: 'Todos los precios y existencias, búsqueda por stock y preparación de cotizaciones por unidad o caja. El sistema advierte cuando la cantidad supera el stock disponible.',
    adminLabel: 'Administración',
    adminBody: 'Dashboard para productos, precios, descuentos, flyers y usuarios. Los vendedores instalan la PWA en la pantalla de inicio; el cliente puede abrir el catálogo desde la web.',
    mobileTitle: 'Pensada para consultar desde el teléfono.',
    mobileIntro: 'La empresa pidió primero una web. Al revisar el trabajo de ventas, propuse una PWA: el vendedor la instala en su pantalla de inicio y el cliente puede consultar el catálogo sin descargar una aplicación.',
    phoneHint: 'Desliza dentro de la pantalla para recorrer la captura.',
    catalogScreenTitle: 'Catálogo en cuadrícula',
    catalogScreenBody: 'La cuadrícula presenta los flyers con sus SKU y semáforos de stock: verde ≥100, amarillo 20–99 y rojo <20.',
    orderScreenTitle: 'Búsqueda para cotizar',
    orderScreenBody: 'El vendedor busca productos y los agrega a la solicitud. Después completa los datos y genera un PDF con precio retail para compartirlo con el área de pedidos por WhatsApp; el documento facilita el proceso, pero no confirma una compra.',
    catalogAlt: 'Captura móvil del catálogo de audio en vista de cuadrícula, con imágenes de productos, SKU y controles para agregarlos al pedido.',
    orderAlt: 'Captura móvil de una búsqueda de productos Monster para cotizar, con imágenes de flyers y controles para agregarlos al pedido.',
    dataTitle: 'El catálogo necesitaba una base de datos que conectara cada pieza.',
    dataIntro: 'Supabase es la plataforma backend del proyecto y PostgreSQL es su base de datos relacional. Esa estructura importa porque un mismo flyer puede representar varios SKU; cada SKU conserva su propio precio y existencia.',
    modelLabel: 'Relación conceptual · sin datos reales',
    flyerNode: 'Flyer',
    flyerDetail: 'Imagen WebP en Cloudinary',
    skuNodeA: 'SKU A',
    skuNodeB: 'SKU B',
    ownData: 'Precio y existencia propios',
    modelNote: 'El flyer agrupa variantes; el SKU identifica la unidad que se consulta o agrega al pedido.',
    postgresTitle: 'Supabase y PostgreSQL',
    postgresBody: 'PostgreSQL es la base relacional: ordena productos, SKU, precios por categoría, existencias, clientes y vendedores. Supabase gestiona el proyecto y facilita el acceso a esa base desde la aplicación. Trabajé con políticas RLS para que los permisos por perfil se aplicaran en el nivel de los datos.',
    rlsLabel: 'RLS',
    rlsBody: 'Reglas dentro de PostgreSQL que delimitan qué registros puede consultar o modificar cada perfil.',
    stockFlowTitle: 'Existencias y recién llegados',
    stockSteps: [
      { title: 'Dropbox de la empresa', detail: 'Archivo de existencias actualizado cada día.' },
      { title: 'Edge Function', detail: 'Función que corre en el servidor, lee el archivo y aplica la actualización.' },
      { title: 'PostgreSQL en Supabase', detail: 'La disponibilidad queda vinculada a cada SKU.' },
      { title: 'Catálogo PWA', detail: 'El vendedor consulta el semáforo de stock.' },
    ] as FlowStep[],
    arrivalNote: 'Otra Edge Function mantiene la selección de recién llegados y su vigencia, con un mínimo de productos visibles.',
    scriptsTitle: 'Scripts para ordenar y cargar el catálogo.',
    scriptsIntro: 'La preparación de los datos fue parte central del proyecto. Renombré y agrupé flyers por SKU, marca y catálogo; convertí las imágenes JPEG a WebP y usé los nombres de los PDF y los SKU como referencia cuando los nombres originales no coincidían.',
    scriptsTasks: [
      'Extraer precios y nombres a partir de la base de SKU.',
      'Normalizar los nombres de flyers y asignar su marca.',
      'Preparar cargas de nombres, precios, masters, descuentos y flyers.',
      'Organizar las imágenes WebP en Cloudinary por marca y catálogo.',
    ],
    scriptsNote: 'Al principio ejecutaba cada proceso desde el entorno de Python. Los scripts grandes eran difíciles de optimizar; dividirlos en tareas pequeñas funcionó mejor. Después los integré al dashboard para lanzarlos con un botón.',
    adminNoImage: 'El panel de administración se describe aquí sin capturas para no exponer datos del negocio.',
    aiTitle: 'Código asistido por IA, decisiones dirigidas por mí.',
    aiBody: 'Los agentes ayudaron a escribir la mayor parte del código. Yo mantuve la conversación con el vendedor, prioricé requisitos, evalué qué era viable, integré las piezas y validé el resultado. Para la base de datos, Claude también me sirvió de guía para entender diagramas, RLS, Edge Functions y conceptos de PostgreSQL que al inicio conocía de forma básica.',
    learningTitle: 'Aprender mientras el producto evolucionaba.',
    learningBody: 'Una carga incorrecta llegó a obligarme a reconstruir la base de datos. La experiencia me llevó a entender mejor qué estaba cambiando y a dividir los scripts en pasos manejables; no asumí que el código generado por IA estuviera listo sin revisarlo.',
    impactTitle: 'El ahorro que reporta el equipo.',
    impactLead: '30 de 42 vendedores reportaron ahorrar tiempo con la herramienta.',
    impactBody: 'Según los vendedores, buscar y mostrar productos y precios les ahorraba al menos una hora; preparar un pedido tomaba más de 80% menos tiempo.',
    impactNote: 'Son estimaciones comunicadas por vendedores, no resultados medidos con analítica del producto. Algunos de los demás vendedores todavía no usan la PWA.',
    scopeTitle: 'Lo que queda como siguiente posibilidad.',
    scopeBody: 'Notificaciones de promociones o nuevos productos, pedidos por voz y videos dentro de algunas fichas quedaron pendientes de aprobación; no forman parte de las funciones actuales.',
    footer: 'Freelance remunerado · Proyecto individual · PWA en uso',
  },
  en: {
    back: 'Back to projects',
    filebar: 'projects/protech.md',
    paidWork: 'Freelance · paid work',
    inUse: 'In use · approximately 4 months when this case was documented',
    heroTitle: 'From scattered files to a catalog built for sales.',
    heroLead: 'Protech is a PWA for browsing automotive audio and accessories flyers, checking commercial information and preparing order requests. It began as a digital catalog and grew from the daily work of sellers and wholesale customers.',
    roleLabel: 'My role',
    roleValue: 'Independent development with AI agents; I owned decisions, integration and validation.',
    stackLabel: 'Technologies',
    problemTitle: 'Finding a product meant searching in several places.',
    problemBody: 'Flyers were spread across thousands of Google Drive folders. Price lists lived elsewhere, and some flyers or prices surfaced in WhatsApp conversations. During a store visit or a phone call, a seller repeated that search across sources before showing options and preparing an order.',
    sourceLabels: ['Google Drive', 'Price lists', 'WhatsApp'],
    sourceCaption: 'Commercial information was not available in one search.',
    originTitle: 'The MVP started with the catalog.',
    originBody: 'I received a price list and links to image folders. Working with a seller, I defined the needs and first turned product lookup into a functional sketch. The scope later expanded to prices, stock and order preparation.',
    sketchTime: '≈ 2 weeks',
    sketchLabel: 'Functional sketch',
    mvpTime: '≈ 1 month',
    mvpLabel: 'MVP with pricing',
    timelineNote: 'These are approximate timelines and include design changes, data normalization and requests that came in during development.',
    accessTitle: 'One shared catalog, different access.',
    accessIntro: 'The experience adapts to each audience while using the same product catalog.',
    publicLabel: 'Public visitor',
    publicBody: 'Global search and filters for brand, size, product type, Top 300 and promotions; flyers can be shared or downloaded.',
    customerLabel: 'Registered customer',
    customerBody: 'Wholesale category pricing and promotions, retail and online references, and units per box. The category follows the customer–seller relationship and can be set while quoting, even for an unregistered customer.',
    sellerLabel: 'Seller',
    sellerBody: 'All prices and stock, stock filtering, and quotes by unit or case. The app warns when the requested quantity exceeds available stock.',
    adminLabel: 'Administration',
    adminBody: 'A dashboard for products, prices, discounts, flyers and users. Sellers install the PWA on their home screen; customers can open the catalog on the web.',
    mobileTitle: 'Built for product lookup on a phone.',
    mobileIntro: 'The company first asked for a website. After reviewing the sales workflow, I proposed a PWA: sellers install it on their home screen, while customers can browse without downloading an app.',
    phoneHint: 'Scroll inside the screen to explore the capture.',
    catalogScreenTitle: 'Grid catalog',
    catalogScreenBody: 'The grid presents flyers with their SKUs and stock signals: green ≥100, yellow 20–99 and red <20.',
    orderScreenTitle: 'Search for a quote',
    orderScreenBody: 'Sellers find products and add them to a request, then generate a PDF showing the retail price to share with the order team over WhatsApp. It facilitates the process but does not confirm a purchase.',
    catalogAlt: 'Mobile capture of the audio catalog in grid view, with product images, SKUs and controls to add them to a request.',
    orderAlt: 'Mobile capture of a Monster product search for a quote, with flyer images and controls to add them to a request.',
    dataTitle: 'The catalog needed a database that connected each piece.',
    dataIntro: 'Supabase is the project’s backend platform, and PostgreSQL is its relational database. That structure matters because one flyer can represent several SKUs; each SKU keeps its own price and stock.',
    modelLabel: 'Conceptual relationship · no real data',
    flyerNode: 'Flyer',
    flyerDetail: 'WebP image on Cloudinary',
    skuNodeA: 'SKU A',
    skuNodeB: 'SKU B',
    ownData: 'Its own price and stock',
    modelNote: 'A flyer groups variants; the SKU identifies the item someone can inspect or add to a request.',
    postgresTitle: 'Supabase and PostgreSQL',
    postgresBody: 'PostgreSQL is the relational database for products, SKUs, category prices, stock, customers and sellers. Supabase manages the project and provides ways for the app to access that database. I worked with RLS policies so profile permissions could be applied at the data level.',
    rlsLabel: 'RLS',
    rlsBody: 'Rules inside PostgreSQL that define which records each profile can read or change.',
    stockFlowTitle: 'Stock and new arrivals',
    stockSteps: [
      { title: 'Company Dropbox', detail: 'A stock file is updated each day.' },
      { title: 'Edge Function', detail: 'A server-side function reads the file and applies the update.' },
      { title: 'PostgreSQL on Supabase', detail: 'Availability stays linked to each SKU.' },
      { title: 'PWA catalog', detail: 'Sellers see the stock signal.' },
    ] as FlowStep[],
    arrivalNote: 'A separate Edge Function keeps the new-arrivals selection current and manages how long items stay visible, with a minimum number of products shown.',
    scriptsTitle: 'Scripts to organize and load the catalog.',
    scriptsIntro: 'Preparing the data was a major part of the work. I renamed and grouped flyers by SKU, brand and catalog, converted JPEG images to WebP, and used PDF filenames and SKUs as references when the original names did not match.',
    scriptsTasks: [
      'Extract prices and names using the SKU database.',
      'Normalize flyer names and assign their brands.',
      'Prepare uploads for names, prices, master pack quantities, discounts and flyers.',
      'Organize WebP images in Cloudinary by brand and catalog.',
    ],
    scriptsNote: 'At first I ran each process from the Python environment. Large scripts were hard to optimize, so splitting the work into smaller tasks proved more manageable. I later connected them to dashboard buttons.',
    adminNoImage: 'The administration panel is described here without screenshots to keep business data private.',
    aiTitle: 'AI-assisted code, decisions led by me.',
    aiBody: 'Agents helped write most of the code. I stayed in contact with the seller, prioritized requirements, assessed what was practical, integrated the pieces and validated the result. Claude also guided my database learning: diagrams, RLS, Edge Functions and PostgreSQL concepts that I initially knew only at a basic level.',
    learningTitle: 'Learning as the product evolved.',
    learningBody: 'An incorrect script once forced me to rebuild the database. That experience pushed me to understand the changes I was making and to break scripts into manageable steps; I did not treat AI-generated code as ready without reviewing it.',
    impactTitle: 'Time savings reported by the team.',
    impactLead: '30 of 42 sellers reported saving time with the tool.',
    impactBody: 'Sellers said searching for and showing products and prices saved them at least an hour; preparing an order took over 80% less time.',
    impactNote: 'These are estimates shared by sellers, not results measured through product analytics. Some of the other sellers have not adopted the PWA yet.',
    scopeTitle: 'Ideas still awaiting approval.',
    scopeBody: 'Promotion or new-product notifications, voice orders and videos on selected product pages remain under consideration; they are not current features.',
    footer: 'Paid freelance · Individual project · PWA in use',
  },
}

function PhoneCapture({ title, detail, alt, src, label, height, hint }: {
  title: string
  detail: string
  alt: string
  src: string
  label: string
  height: number
  hint: string
}) {
  return <figure className="protech-phone-figure">
    <div className="protech-phone-stage">
      <MockFrame className="protech-phone" device="iPhone 17" color="black" height={830} hideNotch>
        <div className="protech-phone__screen" role="region" tabIndex={0} aria-label={label}>
          <img src={src} alt={alt} width={780} height={height} loading="lazy" decoding="async" />
        </div>
      </MockFrame>
    </div>
    <figcaption>
      <strong>{title}</strong>
      <span>{detail}</span>
      <small>{hint}</small>
    </figcaption>
  </figure>
}

function FlowLane({ title, steps }: { title: string; steps: FlowStep[] }) {
  return <div className="protech-flow-lane">
    <h3>{title}</h3>
    <div className="protech-flow-lane__steps" role="list">
      {steps.map((step, index) => <div className="protech-flow-lane__item" role="listitem" key={step.title}>
        <div className="protech-flow-lane__node">
          <strong>{step.title}</strong>
          <span>{step.detail}</span>
        </div>
        {index < steps.length - 1 && <>
          <ArrowRight className="protech-flow-lane__arrow protech-flow-lane__arrow--right" size={18} aria-hidden="true" />
          <ArrowDown className="protech-flow-lane__arrow protech-flow-lane__arrow--down" size={18} aria-hidden="true" />
        </>}
      </div>)}
    </div>
  </div>
}

export function ProtechCase({ locale }: { locale: Locale }) {
  const t = copy[locale]
  const es = locale === 'es'
  const stockSteps: FlowStep[] = t.stockSteps
  const projectIndex = projects.findIndex(project => project.slug === 'protech')
  const previous = projects[(projectIndex - 1 + projects.length) % projects.length]
  const next = projects[(projectIndex + 1) % projects.length]
  const catalogSteps: FlowStep[] = [
    { title: es ? 'Lista de precios y flyers' : 'Price list and flyers', detail: es ? 'Fuentes con nombres incompletos o inconsistentes.' : 'Source files with incomplete or inconsistent names.' },
    { title: 'Scripts Python', detail: es ? 'Extracción por SKU, normalización y preparación de cargas.' : 'SKU-based extraction, normalization and upload preparation.' },
    { title: es ? 'Dashboard de administración' : 'Admin dashboard', detail: es ? 'Lanza los procesos y administra el catálogo.' : 'Runs the processes and manages the catalog.' },
    { title: 'PostgreSQL + Cloudinary', detail: es ? 'Datos estructurados e imágenes WebP.' : 'Structured data and WebP images.' },
  ]

  return <article className="project-case project-case--protech" aria-labelledby="case-title">
    <a className="case-back" href="#projects"><ArrowLeft size={18} aria-hidden="true" />{t.back}</a>
    <div className="protech-filebar"><span>{t.filebar}</span><span>{es ? 'Estudio de caso' : 'Case study'}</span></div>

    <header className="protech-hero">
      <div className="protech-hero__main">
        <h1 id="case-title" tabIndex={-1}>{t.heroTitle}</h1>
        <p className="protech-hero__lead">{t.heroLead}</p>
      </div>
      <dl className="protech-meta">
        <div><dt>{es ? 'Tipo de proyecto' : 'Engagement'}</dt><dd>{t.paidWork}</dd></div>
        <div><dt>{es ? 'Estado' : 'Status'}</dt><dd>{t.inUse}</dd></div>
        <div><dt>{t.roleLabel}</dt><dd>{t.roleValue}</dd></div>
        <div><dt>{t.stackLabel}</dt><dd>React · Vite · TypeScript · Tailwind CSS · Supabase · Python · Cloudinary</dd></div>
      </dl>
    </header>

    <section className="protech-section protech-problem" aria-labelledby="protech-problem-title">
      <h2 id="protech-problem-title">{t.problemTitle}</h2>
      <div>
        <p>{t.problemBody}</p>
        <div className="protech-source-path" aria-label={t.sourceCaption}>
          {t.sourceLabels.map((source, index) => <span key={source}>
            <strong>{source}</strong>
            {index < t.sourceLabels.length - 1 && <ArrowRight size={15} aria-hidden="true" />}
          </span>)}
        </div>
        <small>{t.sourceCaption}</small>
      </div>
    </section>

    <section className="protech-section protech-origin" aria-labelledby="protech-origin-title">
      <div className="protech-origin__copy">
        <h2 id="protech-origin-title">{t.originTitle}</h2>
        <p>{t.originBody}</p>
      </div>
      <dl className="protech-timeline">
        <div><dt>{t.sketchTime}</dt><dd>{t.sketchLabel}</dd></div>
        <div><dt>{t.mvpTime}</dt><dd>{t.mvpLabel}</dd></div>
      </dl>
      <p className="protech-timeline-note">{t.timelineNote}</p>
    </section>

    <section className="protech-section protech-access" aria-labelledby="protech-access-title">
      <div className="protech-section__intro">
        <h2 id="protech-access-title">{t.accessTitle}</h2>
        <p>{t.accessIntro}</p>
      </div>
      <dl className="protech-access-list">
        <div><dt>{t.publicLabel}</dt><dd>{t.publicBody}</dd></div>
        <div><dt>{t.customerLabel}</dt><dd>{t.customerBody}</dd></div>
        <div><dt>{t.sellerLabel}</dt><dd>{t.sellerBody}</dd></div>
        <div><dt>{t.adminLabel}</dt><dd>{t.adminBody}</dd></div>
      </dl>
    </section>

    <section className="protech-section protech-mobile" aria-labelledby="protech-mobile-title">
      <div className="protech-section__intro">
        <h2 id="protech-mobile-title">{t.mobileTitle}</h2>
        <p>{t.mobileIntro}</p>
      </div>
      <div className="protech-phones">
        <PhoneCapture
          title={t.catalogScreenTitle}
          detail={t.catalogScreenBody}
          alt={t.catalogAlt}
          src={sellerCatalogGrid}
          label={t.catalogScreenTitle}
          height={8204}
          hint={t.phoneHint}
        />
        <PhoneCapture
          title={t.orderScreenTitle}
          detail={t.orderScreenBody}
          alt={t.orderAlt}
          src={sellerOrderSearch}
          label={t.orderScreenTitle}
          height={4208}
          hint={t.phoneHint}
        />
      </div>
    </section>

    <section className="protech-section protech-data" aria-labelledby="protech-data-title">
      <div className="protech-section__intro">
        <h2 id="protech-data-title">{t.dataTitle}</h2>
        <p>{t.dataIntro}</p>
      </div>
      <figure className="protech-model">
        <figcaption>{t.modelLabel}</figcaption>
        <div className="protech-model__diagram">
          <div className="protech-model__flyer">
            <span>{t.flyerNode}</span>
            <strong>{t.flyerDetail}</strong>
          </div>
          <div className="protech-model__connector"><ArrowRight size={20} aria-hidden="true" /><span>{es ? 'uno a varios' : 'one to many'}</span></div>
          <div className="protech-model__skus">
            {[t.skuNodeA, t.skuNodeB].map(sku => <div className="protech-model__sku" key={sku}>
              <strong>{sku}</strong><span>{t.ownData}</span>
            </div>)}
            <div className="protech-model__more" aria-hidden="true">···</div>
          </div>
        </div>
        <p>{t.modelNote}</p>
      </figure>
      <div className="protech-postgres">
        <div>
          <h3>{t.postgresTitle}</h3>
          <p>{t.postgresBody}</p>
        </div>
        <aside><strong>{t.rlsLabel}</strong><p>{t.rlsBody}</p></aside>
      </div>
      <div className="protech-automation">
        <FlowLane title={t.stockFlowTitle} steps={stockSteps} />
        <p className="protech-arrival-note">{t.arrivalNote}</p>
      </div>
      <div className="protech-scripts">
        <div>
          <h3>{t.scriptsTitle}</h3>
          <p>{t.scriptsIntro}</p>
          <ul>{t.scriptsTasks.map(task => <li key={task}>{task}</li>)}</ul>
          <p>{t.scriptsNote}</p>
          <small>{t.adminNoImage}</small>
        </div>
        <FlowLane title={es ? 'Carga y publicación del catálogo' : 'Catalog preparation and publishing'} steps={catalogSteps} />
      </div>
    </section>

    <section className="protech-section protech-practice" aria-labelledby="protech-ai-title">
      <div>
        <h2 id="protech-ai-title">{t.aiTitle}</h2>
        <p>{t.aiBody}</p>
      </div>
      <aside>
        <h3>{t.learningTitle}</h3>
        <p>{t.learningBody}</p>
      </aside>
    </section>

    <section className="protech-section protech-impact" aria-labelledby="protech-impact-title">
      <div>
        <h2 id="protech-impact-title">{t.impactTitle}</h2>
        <p>{t.impactNote}</p>
      </div>
      <div className="protech-impact__statement">
        <strong>{t.impactLead}</strong>
        <p>{t.impactBody}</p>
      </div>
    </section>

    <section className="protech-scope" aria-labelledby="protech-scope-title">
      <h2 id="protech-scope-title">{t.scopeTitle}</h2>
      <p>{t.scopeBody}</p>
    </section>
    <nav className="case-navigation" aria-label={es ? 'Navegación entre casos' : 'Case study navigation'}>
      <a className="case-navigation__link case-navigation__link--previous" href={`#projects/${previous.slug}`}>
        <span className="case-navigation__direction"><ArrowLeft size={16} aria-hidden="true" />{es ? 'Caso anterior' : 'Previous case study'}</span>
        <strong>{previous.name}</strong>
      </a>
      <a className="case-navigation__link case-navigation__link--next" href={`#projects/${next.slug}`}>
        <span className="case-navigation__direction">{es ? 'Siguiente caso' : 'Next case study'}<ArrowRight size={16} aria-hidden="true" /></span>
        <strong>{next.name}</strong>
      </a>
    </nav>
    <footer className="protech-footer"><span>{t.footer}</span><a href="#projects">{t.back}<ArrowUpRight size={16} aria-hidden="true" /></a></footer>
  </article>
}
