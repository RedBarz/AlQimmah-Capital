"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/data";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 z-30 mt-auto border-t border-border bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-around px-2 pb-[env(safe-area-inset-bottom)] pt-2">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-1 flex-col items-center gap-1 py-1.5"
            >
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300",
                  active
                    ? "bg-gold/10 text-gold shadow-gold-sm"
                    : "text-text-muted group-hover:text-text-secondary"
                )}
              >
                <Icon name={item.icon} size={20} strokeWidth={active ? 2.2 : 1.75} />
              </span>
              <span
                className={cn(
                  "text-2xs font-medium transition-colors",
                  active ? "text-gold" : "text-text-muted"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
