import type { ReactNode } from "react";

export default function AuthCard({
  eyebrow,
  title,
  description,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="w-full max-w-[440px] fds-card p-6 sm:p-8 rounded-[4px]">
      <p className="fds-eyebrow mb-2">{eyebrow}</p>
      <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#07152F] tracking-[-0.02em] mb-2">
        {title}
      </h1>
      {description ? (
        <p className="fds-body text-sm leading-relaxed mb-6">{description}</p>
      ) : (
        <div className="mb-6" />
      )}
      {children}
      {footer ? (
        <div className="mt-6 pt-4 border-t border-[#E1E8F0] text-sm text-[#64748B]">
          {footer}
        </div>
      ) : null}
    </div>
  );
}
