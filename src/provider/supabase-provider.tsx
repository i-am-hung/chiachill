'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useState, useEffect, createContext, useContext } from 'react';
import type { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

interface Props {
  initialSession: Session | null;
  children: React.ReactNode;
}

interface SupabaseContextType {
  supabase: ReturnType<typeof createBrowserClient>;
  session: Session | null;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(
  undefined
);

export function useSupabase() {
  const ctx = useContext(SupabaseContext);
  if (!ctx) {
    throw new Error('useSupabase must be used within SupabaseProvider');
  }
  return ctx;
}

export default function SupabaseProvider({ children, initialSession }: Props) {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  const [session, setSession] = useState<Session | null>(initialSession);
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      // Trigger a refresh so server components can pick up the new session
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  return (
    <SupabaseContext.Provider value={{ supabase, session }}>
      {children}
    </SupabaseContext.Provider>
  );
}
