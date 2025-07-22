import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import SupabaseProvider from '../provider/supabase-provider';
import { createSupabaseServerClient } from '../lib/supabase/server';
import { ToastProvider, HeroUIProvider } from '@heroui/react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ChiaChill',
  description: 'Debt Settle',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HeroUIProvider>
          <ToastProvider placement="top-center" />
          <SupabaseProvider initialSession={session}>
            {children}
          </SupabaseProvider>
        </HeroUIProvider>
      </body>
    </html>
  );
}
