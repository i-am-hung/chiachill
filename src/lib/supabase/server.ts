import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export const createSupabaseServerClient = () => {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return (cookieStore as any).getAll().map((ck: any) => ({
            name: ck.name as string,
            value: ck.value,
            options: {
              path: ck.path,
              domain: ck.domain,
              expires: ck.expires,
              httpOnly: ck.httpOnly,
              maxAge: ck.maxAge,
              sameSite: ck.sameSite,
              secure: ck.secure,
            },
          }));
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              // @ts-expect-error – mutating cookies in Server Components isn't allowed; will noop
              cookieStore.set(name, value, options);
            });
          } catch {
            /* ignore – handled by middleware or route handler */
          }
        },
      },
    }
  );
};
