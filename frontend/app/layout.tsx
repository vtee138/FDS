import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FDS - FPTU Data Science Club',
  description: 'Insights in our eyes - FPTU Data Science Club',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
