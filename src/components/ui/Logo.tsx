"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

const sizes = {
  sm: { icon: 24, text: "text-sm" },
  md: { icon: 32, text: "text-base" },
  lg: { icon: 48, text: "text-xl" },
  xl: { icon: 72, text: "text-3xl" },
};

export function Logo({ size = "md", showText = true, className }: LogoProps) {
  const { icon, text } = sizes[size];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* A-peak logomark */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="logoGold" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B8963E" />
            <stop offset="50%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
          <filter id="logoGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {/* Left leg of A */}
        <path
          d="M8 38L24 10L40 38"
          stroke="url(#logoGold)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Inner crossbar */}
        <path
          d="M15 28H33"
          stroke="url(#logoGold)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />
        {/* Peak star */}
        <circle cx="24" cy="10" r="2.5" fill="#FFD700" filter="url(#logoGlow)" />
        {/* Left accent line */}
        <path
          d="M6 42L8 38"
          stroke="url(#logoGold)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
        {/* Right accent line */}
        <path
          d="M40 38L42 42"
          stroke="url(#logoGold)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={cn(
              "font-tight font-bold tracking-widest text-gold-shimmer uppercase",
              text
            )}
          >
            AlQimmah
          </span>
          <span className="text-2xs tracking-[0.3em] text-text-muted uppercase font-medium mt-0.5">
            OS
          </span>
        </div>
      )}
    </div>
  );
}
