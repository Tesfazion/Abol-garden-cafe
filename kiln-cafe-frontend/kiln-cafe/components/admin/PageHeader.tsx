import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  actions?: ReactNode;
  eyebrow?: string;
}

export function PageHeader({
  title,
  description,
  actions,
  eyebrow,
}: PageHeaderProps) {
  return (
    <div className="border-b border-gray-200 bg-white px-6 py-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          {eyebrow ? (
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brass">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="font-heading text-3xl font-bold text-forest">{title}</h1>
          <p className="mt-1 text-sm text-charcoal-light">{description}</p>
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </div>
  );
}
