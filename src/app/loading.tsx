/** Instant loading state shown while a route segment streams in. */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="container-site space-y-8 py-24 sm:py-32"
    >
      <span className="sr-only">Loading</span>
      <div aria-hidden="true" className="flex animate-pulse flex-col items-center gap-6">
        <div className="h-3 w-32 bg-surface-raised" />
        <div className="h-10 w-full max-w-2xl bg-surface-raised" />
        <div className="h-4 w-full max-w-md bg-surface-raised" />
        <div className="h-4 w-full max-w-sm bg-surface-raised" />
      </div>
    </div>
  );
}
