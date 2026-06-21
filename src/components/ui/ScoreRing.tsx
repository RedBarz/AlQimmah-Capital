"use client";

import { cn } from "@/lib/utils";

interface ScoreRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: "gold" | "blue" | "green" | "red";
  label?: string;
  sublabel?: string;
  className?: string;
  animate?: boolean;
}

const colorMap = {
  gold: { stroke: "#D4AF37", glow: "rgba(212,175,55,0.4)", text: "text-gold" },
  blue: { stroke: "#3B82F6", glow: "rgba(59,130,246,0.4)", text: "text-blue-ai" },
  green: { stroke: "#10B981", glow: "rgba(16,185,129,0.4)", text: "text-green-progress" },
  red: { stroke: "#EF4444", glow: "rgba(239,68,68,0.4)", text: "text-red-risk" },
};

export function ScoreRing({
  value,
  size = 120,
  strokeWidth = 6,
  color = "gold",
  label,
  sublabel,
  className,
  animate = true,
}: ScoreRingProps) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(value, 0), 100);
  const offset = circumference - (progress / 100) * circumference;
  const { stroke, glow, text } = colorMap[color];
  const center = size / 2;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="progress-ring">
        <defs>
          <filter id={`glow-${color}`}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.6" />
            <stop offset="100%" stopColor={stroke} />
          </linearGradient>
        </defs>

        {/* Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Glow layer */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={stroke}
          strokeWidth={strokeWidth + 2}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          opacity="0.15"
          filter={`url(#glow-${color})`}
        />

        {/* Progress arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={`url(#grad-${color})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={
            animate
              ? { transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)" }
              : undefined
          }
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-tight font-bold leading-none", text)} style={{ fontSize: size * 0.22 }}>
          {progress}%
        </span>
        {label && (
          <span className="text-text-secondary mt-1 text-center leading-tight" style={{ fontSize: size * 0.09 }}>
            {label}
          </span>
        )}
        {sublabel && (
          <span className="text-text-muted text-center" style={{ fontSize: size * 0.08 }}>
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}
