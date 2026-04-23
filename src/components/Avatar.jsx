import { useState } from 'react'

export default function Avatar({ src, name, size = 'md', className = '' }) {
  const [failed, setFailed] = useState(false)

  const sizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-8 h-8 text-xs',
    lg: 'w-12 h-12 text-sm',
  }

  const initial = name?.[0]?.toUpperCase() || '?'
  const cls = `${sizes[size]} rounded-full flex-shrink-0 ${className}`

  if (!src || failed) {
    return (
      <div className={`${cls} bg-accent-pale flex items-center justify-center font-mono font-bold text-accent`}>
        {initial}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={name || ''}
      className={cls}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  )
}
