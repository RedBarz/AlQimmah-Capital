import { TabBar } from "@/components/layout/TabBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-md flex-col bg-background">
      {/* Ambient hero glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-64 bg-hero-gradient" />
      <main className="relative z-10 flex flex-1 flex-col overflow-y-auto pb-2">
        {children}
      </main>
      <TabBar />
    </div>
  );
}
