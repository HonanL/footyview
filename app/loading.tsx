function SkeletonCard() {
  return (
    <article className="rounded-lg border border-white/10 bg-zinc-900 p-7">
      <div className="h-7 w-32 animate-pulse rounded bg-zinc-800" />
      <div className="mt-8 h-10 w-4/5 animate-pulse rounded bg-zinc-800" />
      <div className="mt-4 h-7 w-1/2 animate-pulse rounded bg-zinc-800" />
      <div className="mt-10 grid gap-3">
        <div className="h-16 animate-pulse rounded-lg bg-zinc-800" />
        <div className="h-16 animate-pulse rounded-lg bg-zinc-800" />
      </div>
    </article>
  );
}

export default function Loading() {
  return (
    <main className="min-h-screen bg-black p-8 text-white sm:p-12">
      <h1 className="mb-5 text-5xl font-black tracking-wide sm:text-7xl">FootyView</h1>
      <p className="mb-10 text-2xl font-semibold text-zinc-400">Chargement...</p>
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </section>
    </main>
  );
}
