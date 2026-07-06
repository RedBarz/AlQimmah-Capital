"use client";

import { useApp } from "@/lib/tracker";
import { ProDashboard } from "@/components/dashboard/ProDashboard";
import { ClassicDashboard } from "@/components/dashboard/ClassicDashboard";

export default function Dashboard() {
  const { state, ready } = useApp();
  if (!ready) return null;
  return state.dashboardVersion === "classic" ? <ClassicDashboard /> : <ProDashboard />;
}
