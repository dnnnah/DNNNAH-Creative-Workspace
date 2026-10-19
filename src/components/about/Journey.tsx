import { useEffect, useRef, useState } from 'react'
import { ArrowDownRight, BriefcaseBusiness, GraduationCap } from 'lucide-react'
import type { Locale } from '../../i18n/messages'
import { aboutCopy } from './content'

type Filter = 'all' | 'experience' | 'education'
export function Journey({ locale }: { locale: Locale }) {
  const t = aboutCopy[locale]
  const [filter, setFilter] = useState<Filter>('all')
  const track = useRef<HTMLDivElement>(null)
  const line = useRef<SVGPathElement>(null)
  const [geometry, setGeometry] = useState({ d: '', width: 1, height: 1 })
  const events = t.events.filter(event => filter === 'all' || event.category === filter)

  useEffect(() => {
    const element = track.current
    if (!element) return
    let frame = 0
    const measure = () => {
      const rect = element.getBoundingClientRect()
      const points = [...element.querySelectorAll<HTMLElement>('.journey-node')].map(node => {
        const box = node.getBoundingClientRect()
        return { x: box.left + box.width / 2 - rect.left, y: box.top + box.height / 2 - rect.top }
      })
      let d = points.length ? `M ${points[0].x} ${points[0].y}` : ''
      points.slice(1).forEach((point, index) => {
        const previous = points[index]
        const dy = point.y - previous.y
        const swing = rect.width < 600 ? 32 : Math.min(rect.width * .09, 100)
        const direction = index % 2 ? -1 : 1
        d += ` C ${previous.x + swing * direction} ${previous.y + dy * .48}, ${point.x - swing * direction} ${point.y - dy * .48}, ${point.x} ${point.y}`
      })
      setGeometry({ d, width: rect.width, height: rect.height })
    }
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    element.querySelectorAll('.journey-event').forEach(node => observer.observe(node))
    frame = requestAnimationFrame(measure)
    return () => { observer.disconnect(); cancelAnimationFrame(frame) }
  }, [filter, locale])

  useEffect(() => {
    const element = track.current
    const path = line.current
    if (!element || !path || !geometry.d) return
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const paint = () => {
      const rect = element.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, (innerHeight * .8 - rect.top) / rect.height))
      path.style.strokeDashoffset = String(motion.matches ? 0 : 1 - progress)
    }
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(paint) }
    paint()
    addEventListener('scroll', schedule, { passive: true })
    addEventListener('resize', schedule)
    motion.addEventListener('change', paint)
    return () => { removeEventListener('scroll', schedule); removeEventListener('resize', schedule); motion.removeEventListener('change', paint); cancelAnimationFrame(frame) }
  }, [geometry])

  return <div className="journey">
    <div className="journey-heading editorial-grid">
      <h3><span className="journey-filename">journey.path</span> {t.journey}</h3>
      <p>{t.journeyIntro}<ArrowDownRight size={36} aria-hidden="true" /></p>
    </div>
    <div className="journey-toolbar">
      <div className="journey-filters" role="group" aria-label={locale === 'es' ? 'Filtrar trayectoria' : 'Filter journey'}>
        {(['all', 'experience', 'education'] as const).map((value, index) => <button type="button" key={value} aria-pressed={filter === value} aria-controls="journey-events" onClick={() => setFilter(value)}>{t.filters[index]}</button>)}
      </div>
      <span className="journey-count" role="status">{events.length} {t.count}</span>
    </div>
    <div className="journey-track" ref={track} id="journey-events">
      <svg className="journey-curve" viewBox={`0 0 ${geometry.width} ${geometry.height}`} preserveAspectRatio="none" aria-hidden="true">
        <path d={geometry.d} className="journey-baseline" />
        <path ref={line} d={geometry.d} className="journey-progress" pathLength="1" />
      </svg>
      <ol className="journey-events">{events.map(event => {
        const education = event.category === 'education'
        const Icon = education ? GraduationCap : BriefcaseBusiness
        return <li className="journey-event" key={event.title}>
          <span className={`journey-node ${education ? 'is-education' : 'is-experience'}`} aria-hidden="true"><Icon size={19} /></span>
          <article className="journey-story">
            <div className="journey-meta"><span>{education ? t.education : t.experience}</span><span>{event.time}</span></div>
            <h4>{event.title}</h4><p className="journey-place">{event.place}</p><p>{event.text}</p>
            <ul className="journey-tags" aria-label={locale === 'es' ? 'Detalles' : 'Details'}>{event.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
          </article>
        </li>
      })}</ol>
    </div>
  </div>
}
