"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";

function Shell({
  title,
  subtitle,
  badge = "Portfolio demo · local-only",
  children,
}: {
  title: string;
  subtitle: string;
  badge?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">{badge}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{subtitle}</p>
        </header>
        {children}
        <footer className="mt-10 border-t border-zinc-200 pt-4 text-xs text-zinc-500 dark:border-zinc-800">
          Honest demo: no multi-tenant backend. State (if any) stays in this browser.
        </footer>
      </div>
    </div>
  );
}

function Button({
  children,
  onClick,
  variant = "primary",
  disabled,
  type = "button",
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition disabled:opacity-50 " +
    className;
  const styles =
    variant === "primary"
      ? "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
      : variant === "secondary"
        ? "bg-white text-zinc-900 ring-1 ring-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700"
        : variant === "danger"
          ? "bg-red-600 text-white hover:bg-red-500"
          : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900";
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}

const inputClass =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950";

function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw != null) setValue(JSON.parse(raw) as T);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, [key]);
  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, ready]);
  return [value, setValue] as const;
}

function uid() {
  return crypto.randomUUID();
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}


export default function Home() {
  const [range, setRange] = useState("7d");
  const series = range === "24h" ? [4, 6, 5, 8, 7, 9, 6, 10, 8, 7, 9, 11] : range === "7d" ? [120, 140, 110, 160, 180, 150, 200] : [800, 920, 880, 1100, 1050, 1200, 1150, 1300];
  const max = Math.max(...series);
  return (
    <Shell title="Analytics Dashboard" subtitle="Traffic snapshot using sample series — wire your own source later." badge="Sample analytics">
      <div className="mb-4 flex gap-2">
        {["24h", "7d", "30d"].map((r) => (
          <Button key={r} variant={range === r ? "primary" : "secondary"} onClick={() => setRange(r)}>{r}</Button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-4">
        {[
          ["Users", range === "24h" ? "420" : range === "7d" ? "3.1k" : "12.4k"],
          ["Sessions", range === "24h" ? "610" : range === "7d" ? "4.8k" : "19k"],
          ["Conv.", "2.8%"],
          ["Revenue", "฿0 (demo)"],
        ].map(([l, v]) => (
          <div key={l} className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="text-xs text-zinc-500">{l}</div>
            <div className="text-2xl font-semibold">{v}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex h-48 items-end gap-1 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        {series.map((v, i) => (
          <div key={i} className="flex-1 rounded-t bg-zinc-900 dark:bg-zinc-100" style={{ height: `${(v / max) * 100}%` }} title={String(v)} />
        ))}
      </div>
    </Shell>
  );
}
