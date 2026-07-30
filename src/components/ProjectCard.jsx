const placeholders = [
  'from-violet-950 via-indigo-950 to-slate-950',
  'from-zinc-900 via-slate-900 to-zinc-950',
  'from-emerald-950 via-teal-950 to-slate-950',
  'from-rose-950 via-pink-950 to-slate-950',
  'from-amber-950 via-orange-950 to-zinc-950',
  'from-blue-950 via-indigo-950 to-zinc-950',
  'from-fuchsia-950 via-pink-950 to-zinc-950',
]

function MediaPreview({ media, index, title }) {
  const gradient = placeholders[index % placeholders.length]
  if (!media) {
    return <div className={`w-full h-full bg-gradient-to-br ${gradient}`} />
  }
  if (media.type === 'video') {
    return (
      <video
        src={media.src} autoPlay muted loop playsInline
        className="w-full h-full object-cover"
        aria-label={title}
      />
    )
  }
  return <img src={media.src} alt={title} className="w-full h-full object-cover" loading="lazy" />
}

export default function ProjectCard({ project, index, onClick, featured }) {
  const label = String(index + 1).padStart(2, '0')

  if (featured) {
    return (
      <article
        onClick={onClick}
        className="
          group relative flex flex-col md:flex-row rounded-2xl overflow-hidden
          bg-[#0e0e0e] border border-white/[0.07]
          hover:border-white/[0.15]
          transition-all duration-400 cursor-pointer
          hover:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_24px_60px_rgba(0,0,0,0.7)]
        "
      >
        {/* Media */}
        <div className="md:w-[58%] aspect-[16/9] md:aspect-auto overflow-hidden bg-zinc-950 flex-shrink-0 relative">
          <div className="w-full h-full transition-transform duration-700 group-hover:scale-[1.04]">
            <MediaPreview media={project.media} index={index} title={project.title} />
          </div>
          <span className="absolute top-4 left-4 text-[10px] font-mono text-white/20 tracking-[0.2em]">{label}</span>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between p-8 md:p-10 flex-1">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight leading-tight">
              {project.title}
            </h3>
            <p className="text-zinc-400 text-sm leading-[1.8]">{project.description}</p>
          </div>
          <div className="mt-8 flex items-end justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.07] text-[11px] text-zinc-500 tracking-wide"
                >
                  {cleanText(tag)}
                </span>
              ))}
            </div>
            <svg
              className="w-5 h-5 text-zinc-700 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0"
              viewBox="0 0 16 16" fill="none" aria-hidden="true"
            >
              <path d="M3 13L13 3M13 3H7M13 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article
      onClick={onClick}
      className="
        group relative flex flex-col rounded-2xl overflow-hidden
        bg-[#0e0e0e] border border-white/[0.07]
        hover:border-white/[0.14]
        transition-all duration-300 cursor-pointer
        hover:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_8px_32px_rgba(0,0,0,0.6)]
        hover:-translate-y-0.5
      "
    >
      {/* Media */}
      <div className="aspect-[16/9] overflow-hidden bg-zinc-950 relative">
        <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.05]">
          <MediaPreview media={project.media} index={index} title={project.title} />
        </div>
        <span className="absolute top-3 left-3 text-[10px] font-mono text-white/15 tracking-[0.2em]">{label}</span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-semibold text-white leading-snug">{project.title}</h3>
          <svg
            className="w-4 h-4 text-zinc-700 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 mt-0.5"
            viewBox="0 0 16 16" fill="none" aria-hidden="true"
          >
            <path d="M3 13L13 3M13 3H7M13 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="text-[13px] text-zinc-500 leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-[11px] text-zinc-500 tracking-wide"
            >
              {cleanText(tag)}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
import { cleanText } from '../i18n'
