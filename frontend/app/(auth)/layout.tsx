import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen fds-page flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16">
        {children}
      </main>
    </div>
  );
}
