import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "insta-check";

// All useInstaCheck() instances share this list so a toggle in one component
// immediately updates every other instance in the same tab. The browser
// "storage" event only fires in *other* tabs, which is why we need this.
const listeners = new Set<(v: boolean) => void>();

function read(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

/** Persists the "insta-check" quiz setting in localStorage, like the theme.
 *  All instances in the tab stay in sync via a shared listener list; other
 *  tabs stay in sync via the native `storage` event. */
export function useInstaCheck(): [boolean, (next: boolean) => void] {
  const [enabled, setEnabled] = useState<boolean>(read);

  useEffect(() => {
    listeners.add(setEnabled);
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setEnabled(e.newValue === "true");
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(setEnabled);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const update = useCallback((next: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
      // ignore storage errors (private mode etc.)
    }
    // Notify every hook instance in this tab.
    listeners.forEach(l => l(next));
  }, []);

  return [enabled, update];
}
