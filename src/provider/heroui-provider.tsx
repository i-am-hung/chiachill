'use client';

import { HeroUIProvider, ToastProvider } from '@heroui/react';
import type { ThemeProviderProps } from 'next-themes';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface Props {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export default function HeroUIProviders({ children, themeProps }: Props) {
  return (
    <HeroUIProvider>
      <ToastProvider placement="top-center" />
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </HeroUIProvider>
  );
}
