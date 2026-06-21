"use client";

import {
  Home, GitBranch, Brain, Target, Wallet, Briefcase, Rocket, HeartPulse,
  Dumbbell, GraduationCap, Users, Sparkles, TrendingUp, Calendar,
  ListChecks, SlidersHorizontal, ChevronRight, ChevronLeft, Check, X,
  Plus, Bell, ArrowUpRight, ArrowDownRight, Zap, Clock, Flame, Phone,
  BookOpen, ShoppingBag, Settings, User, Menu, Play, Lock, Star,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  home: Home,
  "git-branch": GitBranch,
  brain: Brain,
  target: Target,
  wallet: Wallet,
  briefcase: Briefcase,
  rocket: Rocket,
  "heart-pulse": HeartPulse,
  dumbbell: Dumbbell,
  "graduation-cap": GraduationCap,
  users: Users,
  sparkles: Sparkles,
  "trending-up": TrendingUp,
  calendar: Calendar,
  "list-checks": ListChecks,
  "sliders-horizontal": SlidersHorizontal,
  "chevron-right": ChevronRight,
  "chevron-left": ChevronLeft,
  check: Check,
  x: X,
  plus: Plus,
  bell: Bell,
  "arrow-up-right": ArrowUpRight,
  "arrow-down-right": ArrowDownRight,
  zap: Zap,
  clock: Clock,
  flame: Flame,
  phone: Phone,
  "book-open": BookOpen,
  "shopping-bag": ShoppingBag,
  settings: Settings,
  user: User,
  menu: Menu,
  play: Play,
  lock: Lock,
  star: Star,
};

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, size = 20, className, strokeWidth = 1.75 }: IconProps) {
  const Cmp = map[name] ?? Home;
  return <Cmp size={size} className={className} strokeWidth={strokeWidth} />;
}
