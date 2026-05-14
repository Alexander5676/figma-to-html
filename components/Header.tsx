import type { ThemeMode } from "@/utils/storage";

type HeaderProps = {
  theme: ThemeMode;
  favoriteCount: number;
  onToggleTheme: () => void;
};

export default function Header({ theme, favoriteCount, onToggleTheme }: HeaderProps) {
  return (
    <header className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur dark:border-white/10 dark:bg-slate-900/75 dark:shadow-black/30 sm:p-8">
      <nav className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-sky-400 to-cyan-300 text-2xl shadow-lg shadow-sky-200 dark:shadow-sky-950/40">
            🫧
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-sky-500">WashWise</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">умная стирка без backend</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleTheme}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:text-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-sky-400"
        >
          {theme === "dark" ? "☀️ Светлая тема" : "🌙 Тёмная тема"}
        </button>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-bold text-sky-700 dark:bg-sky-500/15 dark:text-sky-200">
            PWA-гид по уходу за одеждой
          </p>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl">
            Когда, как и на каком режиме стирать вещи
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Быстрые подсказки по частоте стирки, температуре и программам. Избранное и тема сохраняются в LocalStorage.
          </p>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-sky-500 to-cyan-400 p-5 text-white shadow-2xl shadow-sky-200 dark:shadow-sky-950/40">
          <p className="text-sm font-bold uppercase tracking-wide text-sky-100">Избранное</p>
          <p className="mt-2 text-5xl font-black">{favoriteCount}</p>
          <p className="mt-3 text-sm leading-6 text-sky-50">Сохранено локально и останется после перезагрузки приложения.</p>
        </div>
      </div>
    </header>
  );
}
