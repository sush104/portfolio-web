import React, { useMemo } from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  colorName?: string;
}

const COLOR_MAP: Record<string, string> = {
  pink: "bg-pink-100 text-pink-700",
  indigo: "bg-indigo-100 text-indigo-700",
  green: "bg-green-100 text-green-700",
  yellow: "bg-yellow-100 text-yellow-700",
  rose: "bg-rose-100 text-rose-700",
  sky: "bg-sky-100 text-sky-700",
  emerald: "bg-emerald-100 text-emerald-700",
  purple: "bg-purple-100 text-purple-700",
  cyan: "bg-cyan-100 text-cyan-700",
  orange: "bg-orange-100 text-orange-700",
  lime: "bg-lime-100 text-lime-700",
  teal: "bg-teal-100 text-teal-700",
  violet: "bg-violet-100 text-violet-700",
  fuchsia: "bg-fuchsia-100 text-fuchsia-700",
  amber: "bg-amber-100 text-amber-700",
  blue: "bg-blue-100 text-blue-700",
  red: "bg-red-100 text-red-700",
  stone: "bg-stone-100 text-stone-700",
  slate: "bg-slate-100 text-slate-700",
};

const Badge = ({ children, className = "", colorName }: BadgeProps) => {
  const variant = useMemo(() => {
    if (colorName) {
      const key = colorName.toLowerCase();
      if (COLOR_MAP[key]) return COLOR_MAP[key];
    }
  }, [children, colorName]);

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${variant} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
