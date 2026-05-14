export type LaundryItem = {
  id: string;
  name: string;
  category: "дом" | "спорт" | "повседневка" | "базовое";
  frequency: string;
  temperature: string;
  mode: string;
  hint: string;
};

type CardProps = {
  item: LaundryItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
};

const categoryColors: Record<LaundryItem["category"], string> = {
  дом: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200",
  спорт: "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-200",
  повседневка: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-200",
  базовое: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200",
};

export default function Card({ item, isFavorite, onToggleFavorite }: CardProps) {
  return (
    <article className="group rounded-3xl border border-white/70 bg-white/85 p-5 shadow-lg shadow-slate-200/70 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-200/60 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-black/20 dark:hover:shadow-sky-950/40">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${categoryColors[item.category]}`}>
            {item.category}
          </span>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 dark:text-white">{item.name}</h2>
        </div>
        <button
          type="button"
          aria-label={isFavorite ? `Убрать ${item.name} из избранного` : `Добавить ${item.name} в избранное`}
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite(item.id)}
          className={`grid h-11 w-11 place-items-center rounded-2xl text-xl transition duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-sky-300 ${
            isFavorite
              ? "bg-rose-500 text-white shadow-lg shadow-rose-200 dark:shadow-rose-950/40"
              : "bg-slate-100 text-slate-500 hover:bg-rose-50 hover:text-rose-500 dark:bg-slate-800 dark:text-slate-300"
          }`}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="grid gap-3 text-sm sm:grid-cols-3">
        <Info label="Частота" value={item.frequency} />
        <Info label="Температура" value={item.temperature} />
        <Info label="Режим" value={item.mode} />
      </div>

      <p className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600 transition group-hover:bg-sky-50 dark:bg-slate-800/80 dark:text-slate-300 dark:group-hover:bg-slate-800">
        {item.hint}
      </p>
    </article>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/80">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">{label}</p>
      <p className="mt-1 font-bold text-slate-800 dark:text-slate-100">{value}</p>
    </div>
  );
}
