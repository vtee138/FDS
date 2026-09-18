"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import AuthField from "./AuthField";

export default function PasswordField({
  label = "Mật khẩu",
  id = "password",
  error,
  ...props
}: Omit<React.ComponentProps<typeof AuthField>, "type" | "label"> & {
  label?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <AuthField
        label={label}
        id={id}
        type={show ? "text" : "password"}
        autoComplete={id === "password" ? "current-password" : "new-password"}
        error={error}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        aria-label={show ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
        aria-pressed={show}
        className="absolute right-2.5 top-[30px] p-1.5 text-[#64748B] hover:text-[#2457A6] rounded-[3px] transition"
      >
        {show ? <EyeOff size={17} /> : <Eye size={17} />}
      </button>
    </div>
  );
}
