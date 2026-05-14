export const FAVORITES_KEY = "washwise:favorites";
export const THEME_KEY = "washwise:theme";

export type ThemeMode = "light" | "dark";

const isBrowser = () => typeof window !== "undefined";

export function loadFavorites(): string[] {
  if (!isBrowser()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites: string[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function loadTheme(): ThemeMode {
  if (!isBrowser()) {
    return "light";
  }

  const saved = window.localStorage.getItem(THEME_KEY);
  if (saved === "dark" || saved === "light") {
    return saved;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function saveTheme(theme: ThemeMode) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(THEME_KEY, theme);
}
