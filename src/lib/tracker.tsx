"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type DashboardVersion = "pro" | "classic";

export interface Task {
  id: string;
  title: string;
  done: boolean;
  domain: string;
  createdAt: number;
}

export interface ActivityEntry {
  date: string; // YYYY-MM-DD
  level: number; // 0..4 intensité
}

interface AppState {
  dashboardVersion: DashboardVersion;
  tasks: Task[];
  activity: Record<string, number>; // date -> level
  journal: { id: string; text: string; ts: number }[];
}

const DEFAULT_STATE: AppState = {
  dashboardVersion: "pro",
  tasks: [
    { id: "t1", title: "Contacter 5 prospects", done: false, domain: "Business", createdAt: Date.now() },
    { id: "t2", title: "Séance de sport", done: true, domain: "Santé", createdAt: Date.now() },
    { id: "t3", title: "Formation marketing (1h)", done: false, domain: "Apprentissage", createdAt: Date.now() },
  ],
  activity: {},
  journal: [],
};

const KEY = "alqimmah.appstate.v1";

interface AppContextValue {
  state: AppState;
  ready: boolean;
  setDashboardVersion: (v: DashboardVersion) => void;
  addTask: (title: string, domain: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  logActivity: (date: string, level: number) => void;
  addJournal: (text: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(DEFAULT_STATE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...DEFAULT_STATE, ...JSON.parse(raw) });
    } catch {
      /* no-op */
    }
    setReady(true);
  }, []);

  const persist = (s: AppState) => {
    setState(s);
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
    } catch {
      /* no-op */
    }
  };

  const setDashboardVersion = (v: DashboardVersion) => persist({ ...state, dashboardVersion: v });

  const addTask = (title: string, domain: string) => {
    if (!title.trim()) return;
    persist({
      ...state,
      tasks: [{ id: `t${Date.now()}`, title: title.trim(), done: false, domain, createdAt: Date.now() }, ...state.tasks],
    });
  };

  const toggleTask = (id: string) =>
    persist({ ...state, tasks: state.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) });

  const removeTask = (id: string) => persist({ ...state, tasks: state.tasks.filter((t) => t.id !== id) });

  const logActivity = (date: string, level: number) =>
    persist({ ...state, activity: { ...state.activity, [date]: level } });

  const addJournal = (text: string) => {
    if (!text.trim()) return;
    persist({ ...state, journal: [{ id: `j${Date.now()}`, text: text.trim(), ts: Date.now() }, ...state.journal].slice(0, 50) });
  };

  return (
    <AppContext.Provider value={{ state, ready, setDashboardVersion, addTask, toggleTask, removeTask, logActivity, addJournal }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppStateProvider");
  return ctx;
}

// Utilitaires date
export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function lastNDays(n: number): string[] {
  const out: string[] = [];
  const d = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const dd = new Date(d);
    dd.setDate(d.getDate() - i);
    out.push(dd.toISOString().slice(0, 10));
  }
  return out;
}

export function currentStreak(activity: Record<string, number>): number {
  let streak = 0;
  const d = new Date();
  for (let i = 0; i < 400; i++) {
    const key = new Date(d).toISOString().slice(0, 10);
    if ((activity[key] ?? 0) > 0) streak++;
    else if (i > 0) break; // aujourd'hui peut être vide sans casser un streak d'hier
    d.setDate(d.getDate() - 1);
  }
  return streak;
}
