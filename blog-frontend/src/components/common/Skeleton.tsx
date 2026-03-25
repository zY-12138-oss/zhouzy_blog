import { clsx } from 'clsx'

interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  rounded?: boolean
  circle?: boolean
  lines?: number
}

export function Skeleton({ className, width, height, rounded, circle, lines }: SkeletonProps) {
  if (lines) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className={clsx('skeleton h-4', i === lines - 1 && 'w-3/4', className)} />
        ))}
      </div>
    )
  }
  return (
    <div
      className={clsx('skeleton', circle ? 'rounded-full' : rounded ? 'rounded-lg' : 'rounded', className)}
      style={{ width, height }}
    />
  )
}

export function ArticleCardSkeleton() {
  return (
    <div className="card p-4 space-y-3">
      <Skeleton className="w-full h-48" rounded />
      <Skeleton className="h-5 w-4/5" />
      <Skeleton lines={2} />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16" rounded />
        <Skeleton className="h-5 w-16" rounded />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  )
}

export function Spinner({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={clsx('animate-spin text-primary-500', className)}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
