import React from 'react'

const ShimmerOverlay = () => (
  <div className="pointer-events-none absolute inset-0 z-10 animate-shimmer" />
)

const Skeleton = () => {
  return (
    <div className="h-full w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
      {[...Array(12)].map((_, index) => (
        <div
          key={index}
          className="m-1 p-2 border border-slate-300 flex flex-col"
        >
          {/* Image placeholder */}
          <div className="relative w-full h-40 overflow-hidden bg-slate-200 dark:bg-white/6">
            <ShimmerOverlay />
          </div>

          <div className="flex">
            {/* Avatar placeholder */}
            <div className="relative h-14 w-14 p-1">
              <div className="relative w-full h-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/6">
                <ShimmerOverlay />
              </div>
            </div>

            {/* Text lines placeholder */}
            <div className="flex-1 flex flex-col mt-2 gap-2">
              <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/6">
                <ShimmerOverlay />
              </div>
              <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/6">
                <ShimmerOverlay />
              </div>
              <div className="relative h-3 w-1/3 overflow-hidden rounded-full bg-slate-200 dark:bg-white/6">
                <ShimmerOverlay />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Skeleton