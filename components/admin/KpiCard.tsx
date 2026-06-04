"use client";

import { ReactNode } from "react";

type Props = {
  title: string;
  value: string | number;
  icon: ReactNode;
  gradientFrom: string;
  gradientTo: string;
  iconBgColor: string;
  iconBorderColor: string;
  isLoading?: boolean;
};

export default function KpiCard({
  title,
  value,
  icon,
  gradientFrom,
  gradientTo,
  iconBgColor,
  iconBorderColor,
  isLoading = false,
}: Props) {
  return (
    <div className="relative group">
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500`}></div>
      <div className="relative bg-zinc-900/80 backdrop-blur-md border border-white/5 p-6 rounded-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 ${iconBgColor} rounded-xl border ${iconBorderColor}`}>
            {icon}
          </div>
          <h3 className="text-zinc-400 font-medium">{title}</h3>
        </div>
        {isLoading ? (
          <div className="h-10 w-24 bg-zinc-800/50 animate-pulse rounded"></div>
        ) : (
          <p className="text-4xl font-bold text-white">{value}</p>
        )}
      </div>
    </div>
  );
}
