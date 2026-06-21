"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { ReactNode } from "react";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  back?: boolean;
  action?: ReactNode;
  icon?: string;
}

export function ScreenHeader({ title, subtitle, back, action, icon }: ScreenHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border-subtle bg-background/80 px-4 py-3 backdrop-blur-xl">
      {back && (
        <button
          onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-text-secondary transition-colors hover:text-text-primary active:scale-95"
        >
          <Icon name="chevron-left" size={20} />
        </button>
      )}
      {icon && (
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-ai/10 text-blue-ai">
          <Icon name={icon} size={18} />
        </span>
      )}
      <div className="flex-1 min-w-0">
        <h1 className="font-tight text-lg font-bold leading-tight text-text-primary truncate">
          {title}
        </h1>
        {subtitle && <p className="text-xs text-text-muted truncate">{subtitle}</p>}
      </div>
      {action}
    </header>
  );
}
