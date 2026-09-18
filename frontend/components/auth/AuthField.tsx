import type { InputHTMLAttributes } from "react";

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export default function AuthField({
  label,
  error,
  hint,
  id,
  ...props
}: AuthFieldProps) {
  const describedBy = error
    ? `${id}-error`
    : hint
      ? `${id}-hint`
      : undefined;
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-semibold tracking-wide text-[#07152F] uppercase font-mono"
      >
        {label}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        {...props}
        className={`w-full px-3.5 py-2.5 text-sm text-[#07152F] bg-white border rounded-[3px] outline-none transition placeholder:text-[#94A3B8] ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            : "border-[#E1E8F0] focus:border-[#2457A6] focus:ring-2 focus:ring-[#2457A6]/15"
        } ${props.className ?? ""}`}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-[#64748B]">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
