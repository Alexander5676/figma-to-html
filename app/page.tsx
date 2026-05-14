"use client";

import { useEffect, useMemo, useState } from "react";
import Card, { type LaundryItem } from "@/components/Card";
import Header from "@/components/Header";
import { loadFavorites, loadTheme, saveFavorites, saveTheme, type ThemeMode } from "@/utils/storage";

const laundryItems: LaundryItem[] = [
  {
    id: "t-shirts",
    name: "Футболки",
    category: "повседневка",
    frequency: "после 1–2 носок",
    temperature: "30–40°C",
    mode: "хлопок / смешанные ткани",
    hint: "Выворачивайте принты наизнанку и избегайте перегруза барабана, чтобы ткань дольше держала форму.",
  },
  {
    id: "jeans",
    name: "Джинсы",
    category: "повседневка",
    frequency: "после 4–6 носок",
    temperature: "30°C",
    mode: "деликатный / джинсы",
    hint: "Стирайте наизнанку с застёгнутыми молниями: так цвет меньше вымывается, а фурнитура не цепляет ткань.",
  },
  {
    id: "underwear",
    name: "Бельё",
    category: "базовое",
    frequency: "после каждой носки",
    temperature: "40–60°C",
    mode: "хлопок / гигиена",
    hint: "Для деликатных тканей выбирайте мешок для стирки, а для хлопка можно использовать более тёплый цикл.",
  },
  {
    id: "sportswear",
    name: "Спортивная форма",
    category: "спорт",
    frequency: "после тренировки",
    temperature: "30°C",
    mode: "спорт / синтетика",
    hint: "Не добавляйте кондиционер: он может забивать волокна мембранных и быстросохнущих тканей.",
  },
  {
    id: "towels",
    name: "Полотенца",
    category: "дом",
    frequency: "каждые 3–4 использования",
    temperature: "60°C",
    mode: "хлопок",
    hint: "Сушите полностью перед складыванием, чтобы избежать запаха сырости и сохранить пушистость.",
  },
  {
    id: "bed-linen",
    name: "Постельное бельё",
    category: "дом",
    frequency: "раз в 1–2 недели",
    temperature: "40–60°C",
    mode: "постельное / хлопок",
    hint: "Наволочки лучше менять чаще, особенно если вы используете средства для укладки волос или плотный уход для лица.",
  },
  {
    id: "shirts",
    name: "Рубашки",
    category: "базовое",
    frequency: "после 1–2 носок",
    temperature: "30–40°C",
    mode: "рубашки / деликатный",
    hint: "Застёгивайте пуговицы через одну и сушите на плечиках, чтобы упростить глажку.",
  },
  {
    id: "hoodies",
    name: "Худи и свитшоты",
    category: "повседневка",
    frequency: "после 5–7 носок",
    temperature: "30°C",
    mode: "смешанные ткани",
    hint: "Используйте низкие обороты отжима, чтобы манжеты и капюшон не деформировались.",
  },
  {
    id: "socks",
    name: "Носки",
    category: "базовое",
    frequency: "после каждой носки",
    temperature: "40°C",
    mode: "быстрая / хлопок",
    hint: "Сортируйте по цвету и собирайте пары в сетчатый мешок — так они не потеряются в барабане.",
  },
  {
    id: "outerwear",
    name: "Лёгкие куртки",
    category: "спорт",
    frequency: "1–2 раза за сезон",
    temperature: "30°C",
    mode: "деликатный / верхняя одежда",
    hint: "Проверьте ярлык, застегните молнии и выбирайте мягкое средство без отбеливателя.",
  },
];

const categories = ["все", "дом", "спорт", "повседневка", "базовое"] as const;
type CategoryFilter = (typeof categories)[number];

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("все");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedTheme = loadTheme();
    setFavorites(loadFavorites());
    setTheme(savedTheme);
    setIsReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    if (isReady) {
      saveTheme(theme);
    }
  }, [isReady, theme]);

  useEffect(() => {
    if (isReady) {
      saveFavorites(favorites);
    }
  }, [favorites, isReady]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
  }, []);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return laundryItems.filter((item) => {
      const matchesQuery = item.name.toLowerCase().includes(normalizedQuery);
      const matchesCategory = category === "все" || item.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [category, query]);

  const toggleFavorite = (id: string) => {
    setFavorites((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
      <Header theme={theme} favoriteCount={favorites.length} onToggleTheme={toggleTheme} />

      <section className="rounded-[2rem] border border-white/70 bg-white/75 p-4 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-white/10 dark:bg-slate-900/70 dark:shadow-black/20 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-300">Поиск по названию</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Например: джинсы, полотенца, спорт..."
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-sky-950"
            />
          </label>

          <div>
            <p className="mb-2 text-sm font-bold text-slate-600 dark:text-slate-300">Категории</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`rounded-2xl px-4 py-3 text-sm font-bold transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-sky-300 ${
                    category === item
                      ? "bg-slate-950 text-white shadow-lg shadow-slate-300 dark:bg-sky-400 dark:text-slate-950 dark:shadow-sky-950/40"
                      : "bg-slate-100 text-slate-600 hover:bg-sky-100 hover:text-sky-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-live="polite">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">Рекомендации по стирке</h2>
          <p className="rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-slate-500 shadow-sm dark:bg-slate-900/70 dark:text-slate-300">
            Найдено: {filteredItems.length}
          </p>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <Card key={item.id} item={item} isFavorite={favorites.includes(item.id)} onToggleFavorite={toggleFavorite} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-10 text-center shadow-lg dark:border-slate-700 dark:bg-slate-900/70">
            <p className="text-5xl">🧺</p>
            <h3 className="mt-4 text-2xl font-black text-slate-950 dark:text-white">Ничего не найдено</h3>
            <p className="mt-2 text-slate-500 dark:text-slate-400">Попробуйте изменить запрос или выбрать другую категорию.</p>
          </div>
        )}
      </section>
    </main>
  );
}
