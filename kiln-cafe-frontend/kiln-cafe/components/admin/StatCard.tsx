import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  detail: string;
  icon: ReactNode;
  tone?: "default" | "success" | "warning" | "accent";
}

export function StatCard({
  title,
  value,
  detail,
  icon,
  tone = "default",
}: StatCardProps) {
  const toneClasses = {
    default: "bg-white text-forest",
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
    accent: "bg-brass/10 text-brass",
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-charcoal-light">{title}</p>
          <p className="mt-2 font-heading text-2xl font-semibold text-forest">{value}</p>
          <p className="mt-2 text-sm text-charcoal-light">{detail}</p>
        </div>
        <div className={`rounded-full p-3 ${toneClasses[tone]}`}>{icon}</div>
      </div>
    </div>
  );
}
