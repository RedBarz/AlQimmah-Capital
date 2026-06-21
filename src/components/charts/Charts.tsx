"use client";

import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip,
  PieChart, Pie, Cell, Line, LineChart, CartesianGrid,
} from "recharts";

const colorHex = {
  gold: "#D4AF37",
  "gold-light": "#FFD700",
  blue: "#3B82F6",
  green: "#10B981",
  red: "#EF4444",
};

function ChartTooltip({ active, payload, label, suffix = "" }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-surface-2 px-3 py-2 shadow-card-hover">
      <p className="text-2xs text-text-muted mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-text-primary tabular-nums">
        {typeof payload[0].value === "number"
          ? payload[0].value.toLocaleString("fr-FR")
          : payload[0].value}
        {suffix}
      </p>
    </div>
  );
}

interface AreaProps {
  data: any[];
  dataKey?: string;
  xKey?: string;
  color?: keyof typeof colorHex;
  height?: number;
  suffix?: string;
  showAxis?: boolean;
}

export function AreaSpark({
  data,
  dataKey = "v",
  xKey = "m",
  color = "green",
  height = 80,
  suffix = "",
  showAxis = false,
}: AreaProps) {
  const hex = colorHex[color];
  const gid = `area-${color}-${dataKey}`;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={hex} stopOpacity={0.35} />
            <stop offset="100%" stopColor={hex} stopOpacity={0} />
          </linearGradient>
        </defs>
        {showAxis && (
          <XAxis
            dataKey={xKey}
            tick={{ fill: "#71717A", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
        )}
        <Tooltip content={<ChartTooltip suffix={suffix} />} cursor={{ stroke: hex, strokeOpacity: 0.2 }} />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={hex}
          strokeWidth={2}
          fill={`url(#${gid})`}
          dot={false}
          activeDot={{ r: 4, fill: hex, stroke: "#09090B", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

interface MultiAreaProps {
  series: { name: string; data: any[]; color: keyof typeof colorHex }[];
  height?: number;
  suffix?: string;
}

export function MultiArea({ series, height = 220, suffix = " k€" }: MultiAreaProps) {
  // merge data by year
  const years = series[0].data.map((d) => d.year);
  const merged = years.map((year: string, i: number) => {
    const row: any = { year };
    series.forEach((s) => (row[s.name] = s.data[i].value));
    return row;
  });

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={merged} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          {series.map((s) => (
            <linearGradient key={s.name} id={`m-${s.name}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colorHex[s.color]} stopOpacity={0.3} />
              <stop offset="100%" stopColor={colorHex[s.color]} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" vertical={false} />
        <XAxis dataKey="year" tick={{ fill: "#71717A", fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#71717A", fontSize: 10 }} axisLine={false} tickLine={false} width={40} />
        <Tooltip content={<ChartTooltip suffix={suffix} />} />
        {series.map((s) => (
          <Area
            key={s.name}
            type="monotone"
            dataKey={s.name}
            stroke={colorHex[s.color]}
            strokeWidth={s.color === "gold" || s.color === "gold-light" ? 2.5 : 1.75}
            fill={`url(#m-${s.name})`}
            dot={false}
            activeDot={{ r: 4, fill: colorHex[s.color], stroke: "#09090B", strokeWidth: 2 }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

interface DonutProps {
  data: { name: string; value: number; color: string }[];
  height?: number;
  centerLabel?: string;
  centerValue?: string;
}

export function Donut({ data, height = 180, centerLabel, centerValue }: DonutProps) {
  return (
    <div className="relative" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="62%"
            outerRadius="92%"
            paddingAngle={3}
            stroke="none"
          >
            {data.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip suffix=" €" />} />
        </PieChart>
      </ResponsiveContainer>
      {(centerLabel || centerValue) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {centerValue && (
            <span className="text-xl font-tight font-bold text-text-primary tabular-nums">
              {centerValue}
            </span>
          )}
          {centerLabel && <span className="text-2xs text-text-muted">{centerLabel}</span>}
        </div>
      )}
    </div>
  );
}

interface VisionChartProps {
  data: { year: string; value: number; label: string; type: string }[];
  height?: number;
}

export function VisionChart({ data, height = 260 }: VisionChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 24, right: 12, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="vision-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFD700" stopOpacity={0.45} />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
          </linearGradient>
          <filter id="vision-glow">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" vertical={false} />
        <XAxis dataKey="year" tick={{ fill: "#A1A1AA", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#71717A", fontSize: 10 }} axisLine={false} tickLine={false} width={40} />
        <Tooltip content={<ChartTooltip suffix=" k€" />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#FFD700"
          strokeWidth={3}
          fill="url(#vision-grad)"
          filter="url(#vision-glow)"
          dot={(props: any) => {
            const { cx, cy, payload } = props;
            const isSummit = payload.type === "summit";
            return (
              <circle
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r={isSummit ? 7 : 4}
                fill={isSummit ? "#FFD700" : "#D4AF37"}
                stroke="#09090B"
                strokeWidth={2}
                style={isSummit ? { filter: "drop-shadow(0 0 8px rgba(255,215,0,0.8))" } : undefined}
              />
            );
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
