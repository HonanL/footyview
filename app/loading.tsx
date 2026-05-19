export default function Loading() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col px-5 py-5">
        <header className="rounded-lg border border-white/10 bg-zinc-950 p-5">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-red-400">PSG</p>
          <h1 className="mt-3 break-words text-4xl font-black leading-none">
            Paris Saint-Germain
          </h1>
          <p className="mt-3 text-lg font-semibold text-zinc-400">Chargement...</p>
        </header>

        <section className="mt-5 rounded-lg border border-white/10 bg-zinc-950 p-5">
          <div className="h-5 w-28 animate-pulse rounded bg-zinc-800" />
          <div className="mt-8 h-12 w-full animate-pulse rounded bg-zinc-800" />
          <div className="mt-4 h-12 w-4/5 animate-pulse rounded bg-zinc-800" />
          <div className="mt-6 h-7 w-40 animate-pulse rounded bg-zinc-800" />
          <div className="mt-8 h-14 w-28 animate-pulse rounded bg-zinc-800" />
          <div className="mt-9 h-16 animate-pulse rounded-lg bg-zinc-800" />
        </section>

        <section className="mt-4 rounded-lg border border-white/10 bg-zinc-900 px-5 py-4">
          <div className="flex min-w-0 items-center justify-between gap-3">
            <div className="h-4 w-32 animate-pulse rounded bg-zinc-800" />
            <div className="h-6 w-24 shrink-0 animate-pulse rounded bg-zinc-800" />
          </div>
        </section>
      </div>
    </main>
  );
}
