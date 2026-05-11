import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gatherly Polls',
  description: 'Create simple polls, share a link, and make group decisions faster.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream text-ink antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
