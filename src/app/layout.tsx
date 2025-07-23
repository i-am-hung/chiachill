import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from 'next/font/google';
import { lexend } from '../fonts';
import './globals.css';
import SupabaseProvider from '../provider/supabase-provider';
import { createSupabaseServerClient } from '../lib/supabase/server';
import HeroUIProviders from '../provider/heroui-provider';

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

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
    <html lang="en" className={`${lexend.variable}`} suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <HeroUIProviders
          themeProps={{
            attribute: 'class',
            defaultTheme: 'light',
            enableSystem: true,
            enableColorScheme: false,
            disableTransitionOnChange: true,
          }}
        >
          <SupabaseProvider initialSession={session}>
            {children}
          </SupabaseProvider>
        </HeroUIProviders>
      </body>
    </html>
  );
}
