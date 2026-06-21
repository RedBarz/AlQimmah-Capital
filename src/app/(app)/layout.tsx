import { TabBar } from "@/components/layout/TabBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-md flex-col bg-background noise">
      {/* Ambient hero glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-72 bg-hero-gradient" />
      {/* Subtle side depth */}
      <div className="pointer-events-none fixed inset-y-0 left-1/2 z-0 hidden w-px max-w-md -translate-x-1/2 md:block" style={{ background: "linear-gradient(180deg, transparent, rgba(212,175,55,0.04), transparent)" }} />
      <main className="relative z-10 flex flex-1 flex-col overflow-y-auto pb-2">
        {children}
      </main>
      <TabBar />
    </div>
  );
}
