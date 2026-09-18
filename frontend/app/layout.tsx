import type { Metadata } from 'next';
import { Playfair_Display, Be_Vietnam_Pro, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth/AuthProvider';

export const displayFont = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

export const sansFont = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const monoFont = IBM_Plex_Mono({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FDS - FPTU Data Science Club | Insights in our eyes',
  description: 'Cộng đồng sinh viên yêu dữ liệu tại Đại học FPT. Cùng học hỏi, nghiên cứu và tạo ra giá trị thực tiễn.',
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="vi"
      className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased text-[#07152F]">
        <span className="sr-only" aria-hidden="true">
          FDS Typography Preload
        </span>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
